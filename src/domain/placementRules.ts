import type { CandidateSite, CityScenario, FacilityKind, FacilityPlacement, MissionDefinition } from './types';

export interface PlacementSlotView {
  slotId: string;
  facilityKind: FacilityKind;
  candidateId: string | null;
}

const FACILITY_KINDS: readonly FacilityKind[] = ['library', 'health-support', 'culture-center'];

const isPlainRecord = (value: unknown): value is Record<string, unknown> => {
  if (value === null || typeof value !== 'object') return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
};

const isSafeArray = (value: unknown): value is readonly unknown[] => {
  if (!Array.isArray(value) || Object.getPrototypeOf(value) !== Array.prototype) return false;
  const lengthDescriptor = Object.getOwnPropertyDescriptor(value, 'length');
  if (lengthDescriptor === undefined || !('value' in lengthDescriptor) || !Number.isSafeInteger(lengthDescriptor.value)) return false;
  const ownKeys = Reflect.ownKeys(value);
  if (ownKeys.length !== lengthDescriptor.value + 1) return false;
  for (let index = 0; index < lengthDescriptor.value; index += 1) {
    const descriptor = Object.getOwnPropertyDescriptor(value, String(index));
    if (descriptor === undefined || !('value' in descriptor)) return false;
  }
  return ownKeys.every((key) => key === 'length' || (typeof key === 'string' && /^\d+$/.test(key) && Number(key) < lengthDescriptor.value));
};

const hasExactDataKeys = (record: Record<string, unknown>, keys: readonly string[]): boolean => {
  const ownKeys = Reflect.ownKeys(record);
  if (ownKeys.some((key) => typeof key !== 'string')) return false;
  const actual = Object.keys(record).sort();
  const expected = [...keys].sort();
  if (actual.length !== expected.length || actual.some((key, index) => key !== expected[index])) return false;
  return actual.every((key) => {
    const descriptor = Object.getOwnPropertyDescriptor(record, key);
    return descriptor !== undefined && 'value' in descriptor;
  });
};

const isFacilityKind = (value: unknown): value is FacilityKind => typeof value === 'string' && FACILITY_KINDS.includes(value as FacilityKind);
const isFiniteNonNegative = (value: unknown): value is number => typeof value === 'number' && Number.isFinite(value) && value >= 0;

const isMissionShape = (mission: unknown): mission is MissionDefinition => isPlainRecord(mission)
  && typeof mission.cityId === 'string'
  && isSafeArray(mission.facilityKinds)
  && mission.facilityKinds.length > 0
  && mission.facilityKinds.every(isFacilityKind)
  && isFiniteNonNegative(mission.budgetTokens);

const isCandidateShape = (candidate: unknown): candidate is CandidateSite => isPlainRecord(candidate)
  && hasExactDataKeys(candidate, ['id', 'name', 'nodeId', 'coordinate', 'costTokens'])
  && typeof candidate.id === 'string'
  && isFiniteNonNegative(candidate.costTokens);

const isCityShape = (city: unknown): city is CityScenario => isPlainRecord(city)
  && typeof city.id === 'string'
  && isSafeArray(city.candidates)
  && city.candidates.every(isCandidateShape);

const slotDefinitions = (mission: unknown): Array<{ slotId: string; facilityKind: FacilityKind }> => {
  if (!isMissionShape(mission)) return [];
  const counts = new Map<FacilityKind, number>();
  return mission.facilityKinds.map((facilityKind) => {
    const next = (counts.get(facilityKind) ?? 0) + 1;
    counts.set(facilityKind, next);
    return { slotId: `${facilityKind}-${next}`, facilityKind };
  });
};

export function validatePlacements(
  mission: MissionDefinition | unknown,
  city: CityScenario | unknown,
  placements: readonly FacilityPlacement[] | unknown,
): placements is readonly FacilityPlacement[] {
  try {
    return validatePlacementsInternal(mission, city, placements);
  } catch {
    return false;
  }
}

function validatePlacementsInternal(
  mission: MissionDefinition | unknown,
  city: CityScenario | unknown,
  placements: readonly FacilityPlacement[] | unknown,
): placements is readonly FacilityPlacement[] {
  if (!isMissionShape(mission) || !isCityShape(city) || mission.cityId !== city.id || !isSafeArray(placements)) return false;
  const definitions = slotDefinitions(mission);
  if (placements.length > definitions.length) return false;
  const slots = new Map(definitions.map((definition) => [definition.slotId, definition.facilityKind]));
  const candidates = new Map<string, CandidateSite>();
  for (const candidate of city.candidates) {
    if (candidates.has(candidate.id)) return false;
    candidates.set(candidate.id, candidate);
  }
  const usedSlots = new Set<string>();
  const usedCandidates = new Set<string>();
  let totalCost = 0;
  for (const placement of placements) {
    if (!isPlainRecord(placement) || !hasExactDataKeys(placement, ['slotId', 'facilityKind', 'candidateId'])) return false;
    if (typeof placement.slotId !== 'string' || !isFacilityKind(placement.facilityKind) || typeof placement.candidateId !== 'string') return false;
    if (slots.get(placement.slotId) !== placement.facilityKind || usedSlots.has(placement.slotId) || usedCandidates.has(placement.candidateId)) return false;
    const candidate = candidates.get(placement.candidateId);
    if (candidate === undefined || !isFiniteNonNegative(candidate.costTokens)) return false;
    usedSlots.add(placement.slotId);
    usedCandidates.add(placement.candidateId);
    totalCost += candidate.costTokens;
  }
  return totalCost <= mission.budgetTokens;
}

export function buildPlacementSlots(
  mission: MissionDefinition | unknown,
  placements: readonly FacilityPlacement[] | unknown = [],
): PlacementSlotView[] {
  const definitions = slotDefinitions(mission);
  const canReadPlacements = isSafeArray(placements) && placements.every((placement) => isPlainRecord(placement)
    && hasExactDataKeys(placement, ['slotId', 'facilityKind', 'candidateId'])
    && typeof placement.slotId === 'string' && isFacilityKind(placement.facilityKind) && typeof placement.candidateId === 'string');
  if (!canReadPlacements) {
    return definitions.map(({ slotId, facilityKind }) => ({ slotId, facilityKind, candidateId: null }));
  }
  const safePlacements = placements as readonly FacilityPlacement[];
  return definitions.map(({ slotId, facilityKind }) => ({
    slotId,
    facilityKind,
    candidateId: safePlacements.find((placement) => placement.slotId === slotId)?.candidateId ?? null,
  }));
}

export function getRemainingBudget(
  mission: MissionDefinition,
  city: CityScenario,
  placements: readonly FacilityPlacement[],
): number {
  if (!validatePlacements(mission, city, placements)) return Number.NEGATIVE_INFINITY;
  const candidates = new Map(city.candidates.map((candidate) => [candidate.id, candidate]));
  const spent = placements.reduce((sum, placement) => sum + (candidates.get(placement.candidateId)?.costTokens ?? Number.POSITIVE_INFINITY), 0);
  const remaining = mission.budgetTokens - spent;
  return Number.isFinite(remaining) ? remaining : Number.NEGATIVE_INFINITY;
}
