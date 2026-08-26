import type { OpinionDraft, ProposalSnapshot, PriorityId } from '../../domain/types';

export type OpinionErrorKey = 'proposal' | 'evidence' | 'underservedZone' | 'rationale' | 'counterargument' | 'mitigation';
export interface OpinionValidation {
  complete: boolean;
  errors: Record<OpinionErrorKey, string | null>;
}

const PRIORITIES: readonly PriorityId[] = ['access-equity', 'safety', 'cost'];
const METRICS = ['average', 'maximum', 'unreachable', 'risk', 'cost'] as const;
type OpinionMetric = (typeof METRICS)[number];

const isRecord = (value: unknown): value is Record<string, unknown> => {
  try {
    return value !== null && typeof value === 'object'
      && (Object.getPrototypeOf(value) === Object.prototype || Object.getPrototypeOf(value) === null);
  } catch { return false; }
};

const hasExactKeys = (value: object, keys: readonly string[]): boolean => {
  try {
    const ownKeys = Reflect.ownKeys(value);
    return ownKeys.length === keys.length && ownKeys.every((key) => typeof key === 'string' && keys.includes(key));
  } catch { return false; }
};

const valueOf = (value: object, key: string): unknown => {
  const descriptor = Object.getOwnPropertyDescriptor(value, key);
  return descriptor !== undefined && 'value' in descriptor ? descriptor.value : undefined;
};

/** Dense arrays with data properties only. This deliberately does not invoke accessors. */
export const isStrictDenseArray = (value: unknown): value is unknown[] => {
  try {
    if (!Array.isArray(value) || Object.getPrototypeOf(value) !== Array.prototype) return false;
    const array = value as unknown[];
    const length = Object.getOwnPropertyDescriptor(array, 'length');
    if (length === undefined || !('value' in length) || length.enumerable || length.configurable
      || !Number.isSafeInteger(length.value) || length.value < 0) return false;
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

const validDraftShape = (value: unknown): value is OpinionDraft => {
  if (!isRecord(value) || !hasExactKeys(value, ['priorityId', 'selectedProposalId', 'evidenceMetricIds', 'underservedZoneId', 'rationale', 'counterargument', 'mitigation'])) return false;
  const priority = valueOf(value, 'priorityId');
  const selected = valueOf(value, 'selectedProposalId');
  const metrics = valueOf(value, 'evidenceMetricIds');
  return (priority === null || isPriority(priority))
    && (selected === null || typeof selected === 'string')
    && isStrictDenseArray(metrics)
    && new Set(metrics).size === metrics.length
    && metrics.every(isMetric)
    && (valueOf(value, 'underservedZoneId') === null || typeof valueOf(value, 'underservedZoneId') === 'string')
    && typeof valueOf(value, 'rationale') === 'string'
    && typeof valueOf(value, 'counterargument') === 'string'
    && typeof valueOf(value, 'mitigation') === 'string';
};

const validProposalShape = (value: unknown): value is ProposalSnapshot => {
  if (!isRecord(value) || !hasExactKeys(value, ['id', 'label', 'placements', 'analysis', 'assessment'])) return false;
  const id = valueOf(value, 'id');
  const label = valueOf(value, 'label');
  const placements = valueOf(value, 'placements');
  const analysis = valueOf(value, 'analysis');
  if ((id !== 'proposal-a' && id !== 'proposal-b') || (id === 'proposal-a' && label !== 'A안') || (id === 'proposal-b' && label !== 'B안')
    || !isStrictDenseArray(placements) || !isRecord(analysis) || !isRecord(valueOf(value, 'assessment'))
    || !hasExactKeys(valueOf(value, 'assessment') as object, ['verdict', 'conditionResults', 'priorityConsistent', 'missingEvidence', 'feedbackPrompts'])) return false;
  if (!(placements as unknown[]).every((placement) => isRecord(placement)
    && hasExactKeys(placement, ['slotId', 'facilityKind', 'candidateId'])
    && typeof valueOf(placement, 'slotId') === 'string' && typeof valueOf(placement, 'facilityKind') === 'string' && typeof valueOf(placement, 'candidateId') === 'string')) return false;
  const access = valueOf(analysis, 'nearestFacilityAccess');
  if (!isRecord(access) || !isStrictDenseArray(valueOf(access, 'zoneTravel'))) return false;
  return (valueOf(analysis, 'cityId') === 'mulbit' || valueOf(analysis, 'cityId') === 'maru')
    && typeof valueOf(analysis, 'missionId') === 'string'
    && (valueOf(valueOf(value, 'assessment') as object, 'verdict') === 'valid-with-tradeoffs' || valueOf(valueOf(value, 'assessment') as object, 'verdict') === 'revise')
    && (valueOf(access, 'zoneTravel') as unknown[]).every((row) => isRecord(row) && typeof valueOf(row, 'zoneId') === 'string');
};

const distinctPlacements = (first: ProposalSnapshot, second: ProposalSnapshot): boolean => {
  try {
    if (first.placements.length !== second.placements.length) return true;
    return first.placements.some((placement) => !second.placements.some((other) => placement.slotId === other.slotId && placement.facilityKind === other.facilityKind && placement.candidateId === other.candidateId));
  } catch { return false; }
};

const textLength = (value: unknown): number => typeof value === 'string' ? Array.from(value.trim()).length : 0;
const emptyErrors = (): Record<OpinionErrorKey, string | null> => ({ proposal: null, evidence: null, underservedZone: null, rationale: null, counterargument: null, mitigation: null });

/** Structural completion only; the learner's prose is never interpreted or scored. */
export function validateOpinion(draft: OpinionDraft, proposals: ProposalSnapshot[]): OpinionValidation {
  const errors = emptyErrors();
  try {
    if (!validDraftShape(draft)) {
      errors.proposal = '의견서 선택 정보를 확인해 주세요.';
      errors.evidence = '근거 자료를 선택해 주세요.';
      errors.underservedZone = '불편을 살필 구역을 선택해 주세요.';
      errors.rationale = '선택안의 근거를 10~300자로 작성해 주세요.';
      errors.counterargument = '예상되는 반론을 10~300자로 작성해 주세요.';
      errors.mitigation = '보완 방법을 10~300자로 작성해 주세요.';
      return { complete: false, errors };
    }
    if (!isStrictDenseArray(proposals) || proposals.length !== 2 || !proposals.every(validProposalShape)
      || proposals[0]?.id !== 'proposal-a' || proposals[1]?.id !== 'proposal-b' || !distinctPlacements(proposals[0], proposals[1])) {
      errors.proposal = '서로 다른 A안과 B안을 비교한 뒤 선택해 주세요.';
    } else {
      const selected = proposals.find((proposal) => proposal.id === draft.selectedProposalId);
      if (selected === undefined) errors.proposal = '저장된 제안 중 하나를 선택해 주세요.';
      if (draft.priorityId === null) errors.proposal = errors.proposal ?? '우선 기준을 선택해 주세요.';
      if (!draft.evidenceMetricIds.includes('average') || !draft.evidenceMetricIds.includes('maximum')
        || !draft.evidenceMetricIds.some((metric) => metric !== 'average' && metric !== 'maximum')) {
        errors.evidence = '평균과 최대 이동, 그리고 추가 조건 하나 이상을 근거로 선택해 주세요.';
      }
      if (selected !== undefined) {
        const access = valueOf(selected.analysis, 'nearestFacilityAccess') as object;
        const rows = valueOf(access, 'zoneTravel') as unknown[];
        const zoneIds = new Set(rows.map((row) => valueOf(row as object, 'zoneId')));
        if (draft.underservedZoneId === null || !zoneIds.has(draft.underservedZoneId)) errors.underservedZone = '선택안 분석에 있는 불편 구역을 선택해 주세요.';
      }
    }
    (['rationale', 'counterargument', 'mitigation'] as const).forEach((key) => {
      const length = textLength(draft[key]);
      if (length < 10 || length > 300) errors[key] = '공백을 제외하고 10~300자의 내용을 작성해 주세요.';
    });
  } catch {
    return { complete: false, errors: { ...emptyErrors(), proposal: '의견서 자료를 확인할 수 없습니다.' } };
  }
  return { complete: Object.values(errors).every((error) => error === null), errors };
}
