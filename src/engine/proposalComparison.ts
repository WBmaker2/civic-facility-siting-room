import { CITIES } from '../domain/cities';
import { MISSIONS } from '../domain/missions';
import type {
  AccessMetrics,
  FacilityPlacement,
  PlacementAnalysis,
  ProposalAssessment,
  ProposalComparison,
  ProposalSnapshot,
  ZoneTravelResult,
} from '../domain/types';
import { validatePlacementAnalysis } from './validatePlacementAnalysis';

const LABEL_TO_ID = { 'A안': 'proposal-a', 'B안': 'proposal-b' } as const;
const own = (value: object, key: string): boolean => Object.prototype.hasOwnProperty.call(value, key);
const isPlainRecord = (value: object): boolean => {
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
};

const isStrictArray = (value: unknown): value is unknown[] => {
  if (!Array.isArray(value) || Object.getPrototypeOf(value) !== Array.prototype) return false;
  const array = value as unknown[];
  const lengthDescriptor = Object.getOwnPropertyDescriptor(array, 'length');
  if (lengthDescriptor === undefined || !('value' in lengthDescriptor)
    || lengthDescriptor.enumerable || lengthDescriptor.configurable || lengthDescriptor.value !== array.length
    || (!lengthDescriptor.writable && !Object.isFrozen(array))) return false;
  const frozen = Object.isFrozen(array);
  const keys = Reflect.ownKeys(array);
  if (keys.length !== array.length + 1 || keys.some((key) => key !== 'length' && (typeof key !== 'string' || !/^\d+$/.test(key) || Number(key) >= array.length))) return false;
  for (let index = 0; index < array.length; index += 1) {
    const descriptor = Object.getOwnPropertyDescriptor(array, String(index));
    if (descriptor === undefined || !descriptor.enumerable || !('value' in descriptor)
      || (!(descriptor.writable && descriptor.configurable) && !frozen)) return false;
  }
  return true;
};

const cloneValue = (value: unknown, seen = new WeakSet<object>()): unknown => {
  if (value === null || typeof value === 'string' || typeof value === 'boolean') return value;
  if (typeof value === 'number') {
    if (!Number.isFinite(value)) throw new RangeError('Proposal values must be finite.');
    return value;
  }
  if (typeof value !== 'object' || seen.has(value)) throw new TypeError('Proposal values must be plain data.');
  seen.add(value);
  if (Array.isArray(value)) {
    if (!isStrictArray(value)) throw new TypeError('Malformed proposal array.');
    const descriptor = Object.getOwnPropertyDescriptor(value, 'length');
    if (descriptor === undefined || !('value' in descriptor) || descriptor.value !== value.length) throw new TypeError('Malformed proposal array.');
    for (let index = 0; index < value.length; index += 1) {
      const itemDescriptor = Object.getOwnPropertyDescriptor(value, String(index));
      if (itemDescriptor === undefined || !itemDescriptor.enumerable || !('value' in itemDescriptor)) throw new TypeError('Malformed proposal array.');
    }
    const result = value.map((item) => cloneValue(item, seen));
    seen.delete(value);
    return result;
  }
  if (!isPlainRecord(value)) throw new TypeError('Proposal values must be plain records.');
  const result: Record<string, unknown> = Object.create(null) as Record<string, unknown>;
  for (const key of Reflect.ownKeys(value)) {
    if (typeof key !== 'string') throw new TypeError('Proposal values cannot contain symbol keys.');
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    if (descriptor === undefined || !descriptor.enumerable || !('value' in descriptor)) throw new TypeError('Malformed proposal record.');
    result[key] = cloneValue(descriptor.value, seen);
  }
  seen.delete(value);
  return result;
};

const freezeDeep = <T>(value: T, seen = new WeakSet<object>()): T => {
  if (value !== null && typeof value === 'object' && !seen.has(value)) {
    seen.add(value);
    for (const child of Object.values(value)) freezeDeep(child, seen);
    Object.freeze(value);
  }
  return value;
};

const expectedKeys = (value: object, keys: readonly string[]): boolean => {
  const actual = Reflect.ownKeys(value);
  return actual.length === keys.length && actual.every((key) => typeof key === 'string' && keys.includes(key));
};

const validateAssessment = (assessment: unknown): assessment is ProposalAssessment => {
  try {
    if (assessment === null || typeof assessment !== 'object' || !isPlainRecord(assessment)
      || !expectedKeys(assessment, ['verdict', 'conditionResults', 'priorityConsistent', 'missingEvidence', 'feedbackPrompts'])) return false;
    const record = assessment as unknown as Record<string, unknown>;
    if (record.verdict !== 'valid-with-tradeoffs' && record.verdict !== 'revise') return false;
    if (typeof record.priorityConsistent !== 'boolean' || !isStrictArray(record.conditionResults)
      || !isStrictArray(record.missingEvidence) || !isStrictArray(record.feedbackPrompts)) return false;
    const strings = [...record.missingEvidence, ...record.feedbackPrompts];
    if (!strings.every((item) => typeof item === 'string')) return false;
    return record.conditionResults.every((item) => {
      if (item === null || typeof item !== 'object' || !isPlainRecord(item)) return false;
      const row = item as Record<string, unknown>;
      return expectedKeys(row, ['code', 'passed', 'evidenceText'])
        && typeof row.code === 'string' && typeof row.passed === 'boolean' && typeof row.evidenceText === 'string';
    });
  } catch {
    return false;
  }
};

const validateSnapshot = (snapshot: unknown): snapshot is ProposalSnapshot => {
  try {
    if (snapshot === null || typeof snapshot !== 'object' || !isPlainRecord(snapshot)
      || !expectedKeys(snapshot, ['id', 'label', 'placements', 'analysis', 'assessment'])) return false;
    const record = snapshot as unknown as Record<string, unknown>;
    if (record.id !== 'proposal-a' && record.id !== 'proposal-b') return false;
    if ((record.id === 'proposal-a' && record.label !== 'A안') || (record.id === 'proposal-b' && record.label !== 'B안')) return false;
    if (!isStrictArray(record.placements) || !validateAssessment(record.assessment)) return false;
    const analysis = record.analysis as PlacementAnalysis;
    if (analysis === null || typeof analysis !== 'object') return false;
    const city = typeof analysis.cityId === 'string' && own(CITIES, analysis.cityId) ? CITIES[analysis.cityId as keyof typeof CITIES] : undefined;
    const mission = typeof analysis.missionId === 'string' && own(MISSIONS, analysis.missionId) ? MISSIONS[analysis.missionId as keyof typeof MISSIONS] : undefined;
    return city !== undefined && mission !== undefined && validatePlacementAnalysis(city, mission, record.placements, analysis);
  } catch {
    return false;
  }
};

export function createProposalSnapshot(
  label: string,
  placements: FacilityPlacement[],
  analysis: PlacementAnalysis,
  assessment: ProposalAssessment,
): ProposalSnapshot {
  if (label !== 'A안' && label !== 'B안') throw new RangeError('Proposal label must be A안 or B안.');
  if (!isStrictArray(placements) || !validateAssessment(assessment)) throw new TypeError('Malformed proposal input.');
  const city = analysis !== null && typeof analysis === 'object' && typeof analysis.cityId === 'string' && own(CITIES, analysis.cityId)
    ? CITIES[analysis.cityId as keyof typeof CITIES] : undefined;
  const mission = analysis !== null && typeof analysis === 'object' && typeof analysis.missionId === 'string' && own(MISSIONS, analysis.missionId)
    ? MISSIONS[analysis.missionId as keyof typeof MISSIONS] : undefined;
  if (city === undefined || mission === undefined || !validatePlacementAnalysis(city, mission, placements, analysis)) throw new TypeError('Analysis does not match the proposal.');
  const proposal: ProposalSnapshot = {
    id: LABEL_TO_ID[label as 'A안' | 'B안'],
    label,
    placements: cloneValue(placements) as FacilityPlacement[],
    analysis: cloneValue(analysis) as PlacementAnalysis,
    assessment: cloneValue(assessment) as ProposalAssessment,
  };
  return freezeDeep(proposal);
}

const uniqueZoneRows = (metrics: AccessMetrics): Map<string, ZoneTravelResult> => {
  const rows = metrics.zoneTravel;
  if (!isStrictArray(rows)) throw new TypeError('Malformed zone travel rows.');
  const result = new Map<string, ZoneTravelResult>();
  for (const row of rows) {
    if (row === null || typeof row !== 'object' || typeof row.zoneId !== 'string' || result.has(row.zoneId)) throw new TypeError('Missing or duplicate zone row.');
    if (row.travelUnits !== null && (typeof row.travelUnits !== 'number' || !Number.isFinite(row.travelUnits))) throw new TypeError('Malformed travel value.');
    result.set(row.zoneId, row);
  }
  return result;
};

const delta = (second: number | null, first: number | null): number | null => second === null || first === null ? null : Math.round((second - first) * 10) / 10;

export function compareProposals(first: ProposalSnapshot, second: ProposalSnapshot): ProposalComparison {
  if (!validateSnapshot(first) || !validateSnapshot(second)) throw new TypeError('Cannot compare a malformed proposal.');
  if (first.id === second.id || first.label === second.label) throw new RangeError('Proposal IDs and labels must be distinct.');
  if ((first.id !== 'proposal-a' || second.id !== 'proposal-b') || (first.label !== 'A안' || second.label !== 'B안')) throw new RangeError('Proposals must be compared in A then B order.');
  if (first.analysis.cityId !== second.analysis.cityId || first.analysis.missionId !== second.analysis.missionId) throw new RangeError('Proposals must share a mission context.');
  const firstPlacements = new Set(first.placements.map((placement) => `${placement.slotId}:${placement.facilityKind}:${placement.candidateId}`));
  const secondPlacements = new Set(second.placements.map((placement) => `${placement.slotId}:${placement.facilityKind}:${placement.candidateId}`));
  if (firstPlacements.size === secondPlacements.size && [...firstPlacements].every((item) => secondPlacements.has(item))) throw new RangeError('An alternative must change the placement.');
  const firstRows = uniqueZoneRows(first.analysis.nearestFacilityAccess);
  const secondRows = uniqueZoneRows(second.analysis.nearestFacilityAccess);
  if (firstRows.size !== secondRows.size || [...firstRows.keys()].some((id) => !secondRows.has(id))) throw new TypeError('Proposal zone rows do not match.');
  const newlyReachedZoneIds: string[] = [];
  const newlyUnreachableZoneIds: string[] = [];
  const moreInconveniencedZoneIds: string[] = [];
  for (const [zoneId, firstRow] of firstRows) {
    const secondRow = secondRows.get(zoneId)!;
    if (firstRow.travelUnits === null && secondRow.travelUnits !== null) newlyReachedZoneIds.push(zoneId);
    if (firstRow.travelUnits !== null && secondRow.travelUnits === null) newlyUnreachableZoneIds.push(zoneId);
    if ((firstRow.travelUnits !== null && secondRow.travelUnits === null)
      || (firstRow.travelUnits !== null && secondRow.travelUnits !== null && secondRow.travelUnits > firstRow.travelUnits)) moreInconveniencedZoneIds.push(zoneId);
  }
  return {
    firstProposalId: first.id,
    secondProposalId: second.id,
    averageDelta: delta(second.analysis.nearestFacilityAccess.populationWeightedAverage, first.analysis.nearestFacilityAccess.populationWeightedAverage),
    maximumDelta: delta(second.analysis.nearestFacilityAccess.longestReachableTravel, first.analysis.nearestFacilityAccess.longestReachableTravel),
    newlyReachedZoneIds: newlyReachedZoneIds.sort(),
    newlyUnreachableZoneIds: newlyUnreachableZoneIds.sort(),
    riskCountDelta: second.analysis.riskyCandidateIds.length - first.analysis.riskyCandidateIds.length,
    costTokenDelta: second.analysis.totalCostTokens - first.analysis.totalCostTokens,
    overlapCountDelta: second.analysis.overlapZoneIds.length - first.analysis.overlapZoneIds.length,
    moreInconveniencedZoneIds: moreInconveniencedZoneIds.sort(),
  };
}
