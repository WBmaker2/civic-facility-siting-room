import { FEEDBACK_PROMPTS } from '../content/learnerCopy';
import type {
  ConditionResult,
  LearningEvidence,
  MissionCondition,
  MissionDefinition,
  PlacementAnalysis,
  PriorityId,
  ProposalAssessment,
} from '../domain/types';

const EVIDENCE_GATES = {
  minimumLayers: 2,
  requiredMetrics: ['average', 'maximum'] as const,
  minimumUnderservedZones: 1,
  minimumComparedProposals: 1,
} as const;

const PRIORITIES: readonly PriorityId[] = ['access-equity', 'safety', 'cost'];

const sameItems = (left: readonly string[], right: readonly string[]): boolean =>
  left.length === right.length && left.every((item, index) => item === right[index]);

const hasMissionContext = (mission: MissionDefinition, analysis: PlacementAnalysis): boolean => {
  const context = analysis.missionContext;
  return analysis.cityId === mission.cityId
    && analysis.missionId === mission.id
    && context !== undefined
    && context.budgetTokens === mission.budgetTokens
    && context.serviceThreshold === mission.serviceThreshold
    && sameItems(context.facilityKinds, mission.facilityKinds)
    && sameItems(context.conditionCodes, mission.conditions.map((condition) => condition.code));
};

const formatLimit = (limit: number | null): string => limit === null ? '공개 제한 없음' : `${limit}`;

const evaluateCondition = (
  condition: MissionCondition,
  mission: MissionDefinition,
  analysis: PlacementAnalysis,
  contextValid: boolean,
): { passed: boolean; evidenceText: string } => {
  if (!contextValid) {
    return { passed: false, evidenceText: '분석의 도시·미션·공개 규칙이 선택한 미션과 일치하지 않아 다시 계산해야 합니다.' };
  }
  const limit = condition.numericLimit;
  const access = analysis.nearestFacilityAccess;
  const passedByLimit = (value: number | null): boolean => value !== null && limit !== null && value <= limit;
  switch (condition.code) {
    case 'WITHIN_BUDGET': {
      const passed = limit !== null && analysis.totalCostTokens <= limit;
      return { passed, evidenceText: `배치 비용 ${analysis.totalCostTokens}토큰 / 공개 한도 ${formatLimit(limit)}토큰입니다.` };
    }
    case 'NO_UNREACHABLE_ZONE': {
      const passed = limit !== null && analysis.nearestFacilityAccess.unreachableZoneIds.length <= limit;
      return { passed, evidenceText: `도달 불가 구역 ${analysis.nearestFacilityAccess.unreachableZoneIds.length}곳 / 공개 한도 ${formatLimit(limit)}곳입니다.` };
    }
    case 'WORST_TRAVEL_WITHIN_LIMIT': {
      const value = access.longestReachableTravel;
      const passed = passedByLimit(value);
      return { passed, evidenceText: `가장 긴 이동 단위 ${value === null ? '계산 불가' : value} / 공개 한도 ${formatLimit(limit)}입니다.` };
    }
    case 'MOBILITY_BARRIER_TRAVEL_WITHIN_LIMIT': {
      const value = analysis.mobilityBarrierAccess.longestReachableTravel;
      const passed = passedByLimit(value);
      return { passed, evidenceText: `이동이 불편한 구역의 가장 긴 이동 단위 ${value === null ? '계산 불가' : value} / 공개 한도 ${formatLimit(limit)}입니다.` };
    }
    case 'NO_RISK_SITE': {
      const passed = limit !== null && analysis.riskyCandidateIds.length <= limit;
      return { passed, evidenceText: `위험 표지가 있는 선택 터 ${analysis.riskyCandidateIds.length}곳 / 공개 한도 ${formatLimit(limit)}곳입니다.` };
    }
    case 'COST_WITHIN_PRIORITY_CAP': {
      const passed = limit !== null && analysis.totalCostTokens <= limit;
      return { passed, evidenceText: `비용 ${analysis.totalCostTokens}토큰 / 우선 기준 공개 한도 ${formatLimit(limit)}토큰입니다.` };
    }
    case 'COVERAGE_GAP_WITHIN_LIMIT': {
      const passed = limit !== null && analysis.coverageGapZoneIds.length <= limit;
      return { passed, evidenceText: `문화시설 소외 구역 ${analysis.coverageGapZoneIds.length}곳 / 공개 한도 ${formatLimit(limit)}곳입니다.` };
    }
    case 'DISTINCT_CANDIDATE_SITES': {
      const uniqueSites = new Set(analysis.placements.map((placement) => placement.candidateId)).size;
      const passed = limit !== null && uniqueSites === analysis.placements.length && uniqueSites === limit;
      return { passed, evidenceText: `서로 다른 선택 터 ${uniqueSites}곳 / 공개 기준 ${formatLimit(limit)}곳입니다.` };
    }
    case 'REQUIRED_FACILITY_MIX': {
      const actual = analysis.placements.map((placement) => placement.facilityKind).sort();
      const expected = [...mission.facilityKinds].sort();
      const passed = sameItems(actual, expected) && (limit === null || actual.length === limit);
      return { passed, evidenceText: `배치 시설 ${actual.join('·') || '없음'} / 공개 기준 ${expected.join('·')}입니다.` };
    }
    default: {
      return { passed: false, evidenceText: '이 조건의 공개 판정 규칙을 확인할 수 없습니다.' };
    }
  }
};

const buildMissingEvidence = (evidence: LearningEvidence): string[] => {
  const missing: string[] = [];
  if (new Set(evidence.reviewedLayerIds).size < EVIDENCE_GATES.minimumLayers) {
    missing.push(`자료층을 ${EVIDENCE_GATES.minimumLayers}개 이상 확인하세요.`);
  }
  const metrics = new Set(evidence.inspectedMetricIds);
  if (!metrics.has('average') || !metrics.has('maximum')) {
    missing.push(FEEDBACK_PROMPTS.averageMissing);
    if (!metrics.has('average')) missing.push('평균 이동 단위를 확인하세요.');
    if (!metrics.has('maximum')) missing.push('가장 긴 이동 단위를 확인하세요.');
  }
  if (new Set(evidence.selectedUnderservedZoneIds).size < EVIDENCE_GATES.minimumUnderservedZones) {
    missing.push(FEEDBACK_PROMPTS.underservedMissing);
  }
  if (new Set(evidence.comparedProposalIds).size < EVIDENCE_GATES.minimumComparedProposals) {
    missing.push(FEEDBACK_PROMPTS.alternativeMissing);
  }
  return missing;
};

export function assessProposal(
  mission: MissionDefinition,
  priorityId: PriorityId,
  analysis: PlacementAnalysis,
  evidence: LearningEvidence,
): ProposalAssessment {
  const contextValid = hasMissionContext(mission, analysis);
  const conditionResults: ConditionResult[] = mission.conditions.map((condition) => {
    const evaluation = evaluateCondition(condition, mission, analysis, contextValid);
    return { code: condition.code, passed: evaluation.passed, evidenceText: evaluation.evidenceText };
  });
  const resultByCode = new Map(conditionResults.map((result) => [result.code, result]));
  const selectedCodes = PRIORITIES.includes(priorityId) ? mission.priorityRules[priorityId] : undefined;
  const priorityConsistent = contextValid
    && selectedCodes !== undefined
    && selectedCodes.length > 0
    && selectedCodes.every((code) => resultByCode.get(code)?.passed === true);
  const missingEvidence = buildMissingEvidence(evidence);
  if (!contextValid) missingEvidence.unshift('선택한 미션과 같은 도시·미션으로 영향 결과를 다시 계산하세요.');
  const feedbackPrompts = [...missingEvidence];
  if (!feedbackPrompts.includes(FEEDBACK_PROMPTS.tradeoffMissing)) feedbackPrompts.push(FEEDBACK_PROMPTS.tradeoffMissing);
  const requiredConditionsPass = conditionResults
    .filter((result) => mission.conditions.find((condition) => condition.code === result.code)?.required)
    .every((result) => result.passed);
  const evidenceComplete = buildMissingEvidence(evidence).length === 0;
  return {
    verdict: requiredConditionsPass && priorityConsistent && evidenceComplete ? 'valid-with-tradeoffs' : 'revise',
    conditionResults,
    priorityConsistent,
    missingEvidence,
    feedbackPrompts,
  };
}
