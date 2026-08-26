import { MISSIONS } from '../../domain/missions';
import type { OpinionDraft, ProposalSnapshot, PriorityId } from '../../domain/types';
import { cloneProposalSnapshot, compareProposals } from '../../engine/proposalComparison';

export type OpinionErrorKey = 'proposal' | 'evidence' | 'underservedZone' | 'rationale' | 'counterargument' | 'mitigation';
export interface OpinionValidation { complete: boolean; errors: Record<OpinionErrorKey, string | null> }

const PRIORITIES: readonly PriorityId[] = ['access-equity', 'safety', 'cost'];
const METRICS = ['average', 'maximum', 'unreachable', 'risk', 'cost'] as const;
type OpinionMetric = (typeof METRICS)[number];
const errorKeys: readonly OpinionErrorKey[] = ['proposal', 'evidence', 'underservedZone', 'rationale', 'counterargument', 'mitigation'];

const isRecord = (value: unknown): value is Record<string, unknown> => {
  try { return value !== null && typeof value === 'object' && (Object.getPrototypeOf(value) === Object.prototype || Object.getPrototypeOf(value) === null); } catch { return false; }
};
const dataValue = (value: object, key: string): unknown => {
  const descriptor = Object.getOwnPropertyDescriptor(value, key);
  return descriptor !== undefined && 'value' in descriptor ? descriptor.value : undefined;
};
const exactDataRecord = (value: unknown, keys: readonly string[]): value is Record<string, unknown> => {
  if (!isRecord(value)) return false;
  try {
    const ownKeys = Reflect.ownKeys(value);
    return ownKeys.length === keys.length && ownKeys.every((key) => {
      if (typeof key !== 'string' || !keys.includes(key)) return false;
      const descriptor = Object.getOwnPropertyDescriptor(value, key);
      return descriptor !== undefined && descriptor.enumerable && 'value' in descriptor;
    });
  } catch { return false; }
};

/** Dense, ordinary arrays containing data properties only; frozen arrays remain valid. */
export const isStrictDenseArray = (value: unknown): value is unknown[] => {
  try {
    if (!Array.isArray(value) || Object.getPrototypeOf(value) !== Array.prototype) return false;
    const array = value as unknown[];
    const length = Object.getOwnPropertyDescriptor(array, 'length');
    if (length === undefined || !('value' in length) || length.enumerable || length.configurable || !Number.isSafeInteger(length.value) || length.value < 0) return false;
    const keys = Reflect.ownKeys(array);
    if (keys.length !== length.value + 1 || keys.some((key) => key !== 'length' && (typeof key !== 'string' || !/^\d+$/.test(key) || Number(key) >= length.value))) return false;
    for (let index = 0; index < length.value; index += 1) {
      const descriptor = Object.getOwnPropertyDescriptor(array, String(index));
      if (descriptor === undefined || !descriptor.enumerable || !('value' in descriptor)) return false;
    }
    return true;
  } catch { return false; }
};

const isMetric = (value: unknown): value is OpinionMetric => typeof value === 'string' && METRICS.includes(value as OpinionMetric);
const isPriority = (value: unknown): value is PriorityId => typeof value === 'string' && PRIORITIES.includes(value as PriorityId);
export const isOpinionTextWithinLimit = (value: unknown): value is string => typeof value === 'string' && Array.from(value.trim()).length <= 300;

/** Clones a draft only after verifying exact enumerable data descriptors. Empty values are valid while editing. */
export function cloneOpinionDraft(value: unknown): OpinionDraft | null {
  try {
    if (!exactDataRecord(value, ['priorityId', 'selectedProposalId', 'evidenceMetricIds', 'underservedZoneId', 'rationale', 'counterargument', 'mitigation'])) return null;
    const priority = dataValue(value, 'priorityId');
    const selected = dataValue(value, 'selectedProposalId');
    const metrics = dataValue(value, 'evidenceMetricIds');
    const zone = dataValue(value, 'underservedZoneId');
    const rationale = dataValue(value, 'rationale');
    const counterargument = dataValue(value, 'counterargument');
    const mitigation = dataValue(value, 'mitigation');
    if ((priority !== null && !isPriority(priority)) || (selected !== null && typeof selected !== 'string') || (zone !== null && typeof zone !== 'string')
      || !isStrictDenseArray(metrics) || new Set(metrics).size !== metrics.length || !metrics.every(isMetric)
      || typeof rationale !== 'string' || typeof counterargument !== 'string' || typeof mitigation !== 'string') return null;
    return { priorityId: priority as PriorityId | null, selectedProposalId: selected as string | null, evidenceMetricIds: [...metrics] as OpinionDraft['evidenceMetricIds'], underservedZoneId: zone as string | null, rationale, counterargument, mitigation };
  } catch { return null; }
}

const validAssessment = (proposal: ProposalSnapshot): boolean => {
  const assessment = proposal.assessment;
  const mission = MISSIONS[proposal.analysis.missionId as keyof typeof MISSIONS];
  if (mission === undefined || !isRecord(assessment) || !exactDataRecord(assessment, ['verdict', 'conditionResults', 'priorityConsistent', 'missingEvidence', 'feedbackPrompts'])) return false;
  const results = dataValue(assessment, 'conditionResults');
  const missing = dataValue(assessment, 'missingEvidence');
  const feedback = dataValue(assessment, 'feedbackPrompts');
  if (dataValue(assessment, 'verdict') !== 'valid-with-tradeoffs' && dataValue(assessment, 'verdict') !== 'revise') return false;
  if (typeof dataValue(assessment, 'priorityConsistent') !== 'boolean' || !isStrictDenseArray(results) || !isStrictDenseArray(missing) || !isStrictDenseArray(feedback)
    || !missing.every((item) => typeof item === 'string') || !feedback.every((item) => typeof item === 'string') || results.length !== mission.conditions.length) return false;
  const codes = new Set<string>();
  return results.every((result) => {
    if (!isRecord(result) || !exactDataRecord(result, ['code', 'passed', 'evidenceText'])) return false;
    const code = dataValue(result, 'code');
    if (typeof code !== 'string' || codes.has(code) || !mission.conditions.some((condition) => condition.code === code)) return false;
    codes.add(code);
    return typeof dataValue(result, 'passed') === 'boolean' && typeof dataValue(result, 'evidenceText') === 'string';
  });
};

/** Strictly clones once; all later checks use only detached snapshots. */
export function cloneOpinionProposals(value: unknown): ProposalSnapshot[] | null {
  try {
    if (!isStrictDenseArray(value) || value.length !== 2) return null;
    const cloned = value.map((proposal) => cloneProposalSnapshot(proposal as ProposalSnapshot));
    if (cloned[0]?.id !== 'proposal-a' || cloned[1]?.id !== 'proposal-b' || !validAssessment(cloned[0]) || !validAssessment(cloned[1])) return null;
    compareProposals(cloned[0], cloned[1]);
    return cloned;
  } catch { return null; }
}

const emptyErrors = (): Record<OpinionErrorKey, string | null> => Object.fromEntries(errorKeys.map((key) => [key, null])) as Record<OpinionErrorKey, string | null>;
const textLength = (value: string): number => Array.from(value.trim()).length;

export function validateOpinion(draft: OpinionDraft, proposals: ProposalSnapshot[]): OpinionValidation {
  const errors = emptyErrors();
  const clonedDraft = cloneOpinionDraft(draft);
  const clonedProposals = cloneOpinionProposals(proposals);
  if (clonedDraft === null) return { complete: false, errors: { ...errors, proposal: '의견서 선택 정보를 확인해 주세요.' } };
  if (clonedProposals === null) return { complete: false, errors: { ...errors, proposal: '서로 다른 A안과 B안을 비교한 뒤 선택해 주세요.' } };
  const selected = clonedProposals.find((proposal) => proposal.id === clonedDraft.selectedProposalId);
  if (selected === undefined || clonedDraft.priorityId === null) errors.proposal = selected === undefined ? '저장된 제안 중 하나를 선택해 주세요.' : '우선 기준을 선택해 주세요.';
  if (!clonedDraft.evidenceMetricIds.includes('average') || !clonedDraft.evidenceMetricIds.includes('maximum') || !clonedDraft.evidenceMetricIds.some((metric) => metric !== 'average' && metric !== 'maximum')) errors.evidence = '평균과 최대 이동, 그리고 추가 조건 하나 이상을 근거로 선택해 주세요.';
  if (selected !== undefined) {
    const zoneIds = new Set(selected.analysis.nearestFacilityAccess.zoneTravel.map((row) => row.zoneId));
    if (clonedDraft.underservedZoneId === null || !zoneIds.has(clonedDraft.underservedZoneId)) errors.underservedZone = '선택안 분석에 있는 불편 구역을 선택해 주세요.';
  }
  (['rationale', 'counterargument', 'mitigation'] as const).forEach((key) => { const length = textLength(clonedDraft[key]); if (length < 10 || length > 300) errors[key] = '공백을 제외하고 10~300자의 내용을 작성해 주세요.'; });
  return { complete: Object.values(errors).every((error) => error === null), errors };
}
