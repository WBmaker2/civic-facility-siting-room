import { describe, expect, it } from 'vitest';
import { CITIES } from '../domain/cities';
import { MISSIONS } from '../domain/missions';
import { FEEDBACK_PROMPTS } from '../content/learnerCopy';
import type { LearningEvidence, MissionDefinition, PlacementAnalysis } from '../domain/types';
import { analyzePlacement } from './analyzePlacement';
import { assessProposal } from './assessProposal';

const completeEvidence: LearningEvidence = {
  reviewedLayerIds: ['population', 'roads', 'risk', 'cost'],
  inspectedMetricIds: ['average', 'maximum', 'unreachable', 'risk', 'cost'],
  selectedUnderservedZoneIds: ['mulbit-south'],
  comparedProposalIds: ['proposal-b'],
};

const evidenceFor = (cityId: 'mulbit' | 'maru'): LearningEvidence => ({
  ...completeEvidence,
  selectedUnderservedZoneIds: [`${cityId}-north`],
});

const analysisFor = (missionId: keyof typeof MISSIONS, candidateIds: readonly string[]): PlacementAnalysis => {
  const mission = MISSIONS[missionId];
  const city = CITIES[mission.cityId];
  const placements = mission.facilityKinds.map((facilityKind, index) => ({
    slotId: `${facilityKind}-${index + 1}`,
    facilityKind,
    candidateId: candidateIds[index]!,
  }));
  return analyzePlacement(city, mission, placements);
};

describe('assessProposal', () => {
  it.each([
    ['bookmaru-library', ['mulbit-b2']],
    ['bookmaru-library', ['mulbit-c3']],
    ['health-help-center', ['maru-c2']],
    ['health-help-center', ['maru-d3']],
    ['living-culture-center', ['mulbit-c4']],
    ['living-culture-center', ['mulbit-d3']],
    ['combined-review', ['maru-b2', 'maru-d3']],
    ['combined-review', ['maru-c2', 'maru-e3']],
  ] as const)('%s accepts %s as a public-rule proposal', (missionId, candidateIds) => {
    const mission = MISSIONS[missionId];
    const assessment = assessProposal(mission, 'access-equity', analysisFor(missionId, candidateIds), evidenceFor(mission.cityId));

    expect(assessment.verdict).toBe('valid-with-tradeoffs');
    expect(assessment.priorityConsistent).toBe(true);
    expect(assessment.missingEvidence).toEqual([]);
    expect(assessment.feedbackPrompts).toContain(FEEDBACK_PROMPTS.tradeoffMissing);
  });

  it.each([
    ['bookmaru-library', ['mulbit-b2'], ['mulbit-c3'], '배치 비용 1토큰 / 공개 한도 3토큰입니다.', '배치 비용 2토큰 / 공개 한도 3토큰입니다.'],
    ['health-help-center', ['maru-c2'], ['maru-d3'], '이동이 불편한 구역의 가장 긴 이동 단위 3 / 공개 한도 6입니다.', '이동이 불편한 구역의 가장 긴 이동 단위 5 / 공개 한도 6입니다.'],
    ['living-culture-center', ['mulbit-c4'], ['mulbit-d3'], '비용 2토큰 / 우선 기준 공개 한도 2토큰입니다.', '비용 3토큰 / 우선 기준 공개 한도 2토큰입니다.'],
    ['combined-review', ['maru-b2', 'maru-d3'], ['maru-c2', 'maru-e3'], '가장 긴 이동 단위 3 / 공개 한도 7입니다.', '가장 긴 이동 단위 4 / 공개 한도 7입니다.'],
  ] as const)('keeps named %s proposals visibly different in public metric evidence', (missionId, firstIds, secondIds, firstEvidence, secondEvidence) => {
    const mission = MISSIONS[missionId];
    const first = assessProposal(mission, 'access-equity', analysisFor(missionId, firstIds), evidenceFor(mission.cityId));
    const second = assessProposal(mission, 'access-equity', analysisFor(missionId, secondIds), evidenceFor(mission.cityId));
    const findEvidence = (assessment: typeof first, code: string): string => assessment.conditionResults.find((result) => result.code === code)?.evidenceText ?? '';
    const code = missionId === 'health-help-center' ? 'MOBILITY_BARRIER_TRAVEL_WITHIN_LIMIT' : missionId === 'combined-review' ? 'WORST_TRAVEL_WITHIN_LIMIT' : missionId === 'living-culture-center' ? 'COST_WITHIN_PRIORITY_CAP' : 'WITHIN_BUDGET';
    expect(findEvidence(first, code)).toBe(firstEvidence);
    expect(findEvidence(second, code)).toBe(secondEvidence);
  });

  it('accepts mission context arrays in a different order without mutating them', () => {
    const mission = MISSIONS['combined-review'];
    const analysis = analysisFor('combined-review', ['maru-b2', 'maru-d3']);
    const originalKinds = [...analysis.missionContext.facilityKinds];
    const originalCodes = [...analysis.missionContext.conditionCodes];
    const reordered = {
      ...analysis,
      missionContext: {
        ...analysis.missionContext,
        facilityKinds: [...analysis.missionContext.facilityKinds].reverse(),
        conditionCodes: [...analysis.missionContext.conditionCodes].reverse(),
      },
    };
    const assessment = assessProposal(mission, 'access-equity', reordered, completeEvidence);
    expect(assessment.verdict).toBe('valid-with-tradeoffs');
    expect(assessment.priorityConsistent).toBe(true);
    expect(analysis.missionContext.facilityKinds).toEqual(originalKinds);
    expect(analysis.missionContext.conditionCodes).toEqual(originalCodes);
  });

  it.each([
    ['missing', (codes: readonly string[]) => codes.slice(0, -1)],
    ['duplicated', (codes: readonly string[]) => [...codes.slice(0, -1), codes.at(-1), codes.at(-1)]],
    ['altered', (codes: readonly string[]) => codes.map((code, index) => index === 0 ? `${code}-tampered` : code)],
  ] as const)('rejects %s mission context condition provenance', (_label, changeCodes) => {
    const analysis = analysisFor('combined-review', ['maru-b2', 'maru-d3']);
    const changed = {
      ...analysis,
      missionContext: { ...analysis.missionContext, conditionCodes: changeCodes(analysis.missionContext.conditionCodes) },
    } as PlacementAnalysis;
    expect(assessProposal(MISSIONS['combined-review'], 'access-equity', changed, completeEvidence).verdict).toBe('revise');
  });

  it('fails closed when required facility mix has a null public limit', () => {
    const mission: MissionDefinition = {
      ...MISSIONS['combined-review'],
      conditions: MISSIONS['combined-review'].conditions.map((condition) => condition.code === 'REQUIRED_FACILITY_MIX'
        ? { ...condition, numericLimit: null }
        : condition),
    };
    const assessment = assessProposal(mission, 'access-equity', analysisFor('combined-review', ['maru-b2', 'maru-d3']), completeEvidence);
    expect(assessment.conditionResults.find((result) => result.code === 'REQUIRED_FACILITY_MIX')?.passed).toBe(false);
    expect(assessment.verdict).toBe('revise');
  });

  it.each([
    ['bookmaru-library', 'WITHIN_BUDGET', ['mulbit-b2']],
    ['bookmaru-library', 'NO_UNREACHABLE_ZONE', ['mulbit-b2']],
    ['bookmaru-library', 'WORST_TRAVEL_WITHIN_LIMIT', ['mulbit-b2']],
    ['bookmaru-library', 'NO_RISK_SITE', ['mulbit-b2']],
    ['bookmaru-library', 'COST_WITHIN_PRIORITY_CAP', ['mulbit-b2']],
    ['health-help-center', 'MOBILITY_BARRIER_TRAVEL_WITHIN_LIMIT', ['maru-c2']],
    ['living-culture-center', 'COVERAGE_GAP_WITHIN_LIMIT', ['mulbit-c4']],
    ['combined-review', 'DISTINCT_CANDIDATE_SITES', ['maru-b2', 'maru-d3']],
    ['combined-review', 'REQUIRED_FACILITY_MIX', ['maru-b2', 'maru-d3']],
  ] as const)('does not pass %s when %s numericLimit is null', (missionId, code, candidateIds) => {
    const source = MISSIONS[missionId];
    const mission: MissionDefinition = {
      ...source,
      conditions: source.conditions.map((condition) => condition.code === code
        ? { ...condition, numericLimit: null }
        : condition),
    };
    const result = assessProposal(mission, 'access-equity', analysisFor(missionId, candidateIds), completeEvidence)
      .conditionResults.find((condition) => condition.code === code);
    expect(result?.passed).toBe(false);
  });

  it.each([
    ['duplicate priority codes', (codes: readonly string[]) => [codes[0], codes[0]]],
    ['unknown priority code', (codes: readonly string[]) => [...codes, 'NOT_A_CONDITION']],
    ['empty priority rule', () => []],
  ] as const)('fails closed for a %s', (_label, changeCodes) => {
    const source = MISSIONS['bookmaru-library'];
    const mission: MissionDefinition = {
      ...source,
      priorityRules: { ...source.priorityRules, 'access-equity': changeCodes(source.priorityRules['access-equity']) as MissionDefinition['priorityRules']['access-equity'] },
    };
    const assessment = assessProposal(mission, 'access-equity', analysisFor('bookmaru-library', ['mulbit-b2']), completeEvidence);
    expect(assessment.priorityConsistent).toBe(false);
    expect(assessment.verdict).toBe('revise');
  });

  it('fails closed for a PriorityId value outside the runtime type', () => {
    const assessment = assessProposal(MISSIONS['bookmaru-library'], 'not-a-priority' as unknown as 'access-equity', analysisFor('bookmaru-library', ['mulbit-b2']), completeEvidence);
    expect(assessment.priorityConsistent).toBe(false);
    expect(assessment.verdict).toBe('revise');
  });

  it('rejects average-only, underserved-missing, and alternative-missing evidence', () => {
    const evidence: LearningEvidence = {
      ...completeEvidence,
      inspectedMetricIds: ['average'],
      selectedUnderservedZoneIds: [],
      comparedProposalIds: [],
    };
    const assessment = assessProposal(
      MISSIONS['bookmaru-library'],
      'access-equity',
      analysisFor('bookmaru-library', ['mulbit-b2']),
      evidence,
    );

    expect(assessment.verdict).toBe('revise');
    expect(assessment.missingEvidence).toEqual(expect.arrayContaining([
      FEEDBACK_PROMPTS.averageMissing,
      FEEDBACK_PROMPTS.underservedMissing,
      FEEDBACK_PROMPTS.alternativeMissing,
    ]));
  });

  it('requires at least two reviewed layers and both public access metrics', () => {
    const evidence: LearningEvidence = {
      ...completeEvidence,
      reviewedLayerIds: ['population'],
      inspectedMetricIds: ['maximum'],
    };
    const assessment = assessProposal(
      MISSIONS['bookmaru-library'],
      'access-equity',
      analysisFor('bookmaru-library', ['mulbit-b2']),
      evidence,
    );

    expect(assessment.verdict).toBe('revise');
    expect(assessment.missingEvidence.join(' ')).toContain('자료층');
    expect(assessment.missingEvidence).toContain(FEEDBACK_PROMPTS.averageMissing);
  });

  it.each([
    ['mulbit-a4-water', 'NO_RISK_SITE'],
    ['mulbit-e5-island', 'NO_UNREACHABLE_ZONE'],
  ] as const)('identifies the specific failed condition for %s', (candidateId, code) => {
    const assessment = assessProposal(
      MISSIONS['bookmaru-library'],
      code === 'NO_RISK_SITE' ? 'safety' : 'access-equity',
      analysisFor('bookmaru-library', [candidateId]),
      completeEvidence,
    );
    const result = assessment.conditionResults.find((condition) => condition.code === code);
    expect(result?.passed).toBe(false);
    expect(assessment.verdict).toBe('revise');
  });

  it('identifies an over-budget condition without hiding other public results', () => {
    const assessment = assessProposal(
      MISSIONS['combined-review'],
      'cost',
      analysisFor('combined-review', ['maru-e1-premium', 'maru-d3']),
      completeEvidence,
    );
    expect(assessment.conditionResults.find((result) => result.code === 'WITHIN_BUDGET')?.passed).toBe(false);
    expect(assessment.priorityConsistent).toBe(false);
    expect(assessment.verdict).toBe('revise');
  });

  it('uses only selected priority public condition codes', () => {
    const assessment = assessProposal(
      MISSIONS['bookmaru-library'],
      'cost',
      analysisFor('bookmaru-library', ['mulbit-d3']),
      completeEvidence,
    );
    expect(assessment.priorityConsistent).toBe(false);
    expect(assessment.conditionResults.find((result) => result.code === 'COST_WITHIN_PRIORITY_CAP')?.passed).toBe(false);
  });

  it('has no opaque ranking fields in its own keys or serialized output', () => {
    const assessment = assessProposal(
      MISSIONS['bookmaru-library'],
      'access-equity',
      analysisFor('bookmaru-library', ['mulbit-b2']),
      completeEvidence,
    );
    expect(Object.keys(assessment)).not.toEqual(expect.arrayContaining(['score', 'rank', 'winner', 'optimum']));
    expect(JSON.stringify(assessment)).not.toMatch(/\b(score|rank|winner|optimum)\b/i);
  });

  it('fails safely when analysis belongs to another mission or has incomplete context', () => {
    const analysis = analysisFor('bookmaru-library', ['mulbit-b2']);
    const mismatched = { ...analysis, missionId: 'health-help-center' as const };
    const incomplete = { ...analysis, missionContext: undefined } as unknown as PlacementAnalysis;
    expect(assessProposal(MISSIONS['bookmaru-library'], 'access-equity', mismatched, completeEvidence).verdict).toBe('revise');
    expect(assessProposal(MISSIONS['bookmaru-library'], 'access-equity', incomplete, completeEvidence).verdict).toBe('revise');
  });
});
