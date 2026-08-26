import { CITIES } from '../domain/cities';
import { MISSIONS } from '../domain/missions';
import type { AccessMetrics, DataLayerId, FacilityPlacement, LearningEvidence, OpinionDraft, PlacementAnalysis, ProposalSnapshot, SessionState, StageId } from '../domain/types';
import { analyzePlacement } from '../engine/analyzePlacement';
import { STAGE_ORDER, type SessionAction } from './sessionTypes';

const DATA_LAYERS: readonly DataLayerId[] = ['population', 'roads', 'risk', 'cost', 'existing-facilities'];
const METRICS: readonly LearningEvidence['inspectedMetricIds'][number][] = ['average', 'maximum', 'unreachable', 'risk', 'cost'];

const createInitialEvidence = (): LearningEvidence => ({ reviewedLayerIds: [], inspectedMetricIds: [], selectedUnderservedZoneIds: [], comparedProposalIds: [] });
const createInitialOpinion = (): OpinionDraft => ({ priorityId: null, selectedProposalId: null, evidenceMetricIds: [], underservedZoneId: null, rationale: '', counterargument: '', mitigation: '' });

export function createInitialSession(): SessionState {
  return { cityId: null, missionId: null, stage: 'intake', priorityId: null, activeLayerIds: [], selectedCandidateId: null, placements: [], analysis: null, evidence: createInitialEvidence(), proposals: [], opinion: createInitialOpinion() };
}

const copyPlacement = (placement: FacilityPlacement): FacilityPlacement => ({ ...placement });
const copyAccessMetrics = (metrics: AccessMetrics): AccessMetrics => ({
  populationWeightedAverage: metrics.populationWeightedAverage,
  reachablePeopleTokens: metrics.reachablePeopleTokens,
  totalPeopleTokens: metrics.totalPeopleTokens,
  longestReachableTravel: metrics.longestReachableTravel,
  worstServedZoneIds: [...metrics.worstServedZoneIds],
  unreachableZoneIds: [...metrics.unreachableZoneIds],
  zoneTravel: metrics.zoneTravel.map((row) => ({ ...row, pathNodeIds: [...row.pathNodeIds] })),
});
const copyAnalysis = (analysis: PlacementAnalysis): PlacementAnalysis => ({
  cityId: analysis.cityId,
  missionId: analysis.missionId,
  placements: analysis.placements.map(copyPlacement),
  perFacility: Object.fromEntries(Object.entries(analysis.perFacility).map(([id, metrics]) => [id, copyAccessMetrics(metrics)])),
  nearestFacilityAccess: copyAccessMetrics(analysis.nearestFacilityAccess),
  mobilityBarrierAccess: copyAccessMetrics(analysis.mobilityBarrierAccess),
  totalCostTokens: analysis.totalCostTokens,
  riskyCandidateIds: [...analysis.riskyCandidateIds],
  overlapZoneIds: [...analysis.overlapZoneIds],
  coverageGapZoneIds: [...analysis.coverageGapZoneIds],
  missionContext: { budgetTokens: analysis.missionContext.budgetTokens, serviceThreshold: analysis.missionContext.serviceThreshold, facilityKinds: [...analysis.missionContext.facilityKinds], conditionCodes: [...analysis.missionContext.conditionCodes] },
});
const copyProposal = (proposal: ProposalSnapshot): ProposalSnapshot => ({
  id: proposal.id,
  label: proposal.label,
  placements: proposal.placements.map(copyPlacement),
  analysis: copyAnalysis(proposal.analysis),
  assessment: { verdict: proposal.assessment.verdict, conditionResults: proposal.assessment.conditionResults.map((result) => ({ ...result })), priorityConsistent: proposal.assessment.priorityConsistent, missingEvidence: [...proposal.assessment.missingEvidence], feedbackPrompts: [...proposal.assessment.feedbackPrompts] },
});
const copyEvidence = (evidence: LearningEvidence): LearningEvidence => ({ reviewedLayerIds: [...evidence.reviewedLayerIds], inspectedMetricIds: [...evidence.inspectedMetricIds], selectedUnderservedZoneIds: [...evidence.selectedUnderservedZoneIds], comparedProposalIds: [...evidence.comparedProposalIds] });
const placementOrder = (placements: readonly FacilityPlacement[]): FacilityPlacement[] => [...placements].sort((left, right) => left.slotId.localeCompare(right.slotId));
const samePlacements = (left: readonly FacilityPlacement[], right: readonly FacilityPlacement[]): boolean => {
  const orderedLeft = placementOrder(left); const orderedRight = placementOrder(right);
  return orderedLeft.length === orderedRight.length && orderedLeft.every((placement, index) => {
    const other = orderedRight[index];
    return other !== undefined && placement.slotId === other.slotId && placement.facilityKind === other.facilityKind && placement.candidateId === other.candidateId;
  });
};
const indexOfStage = (stage: StageId): number => STAGE_ORDER.indexOf(stage);
const isLayer = (layerId: DataLayerId): boolean => DATA_LAYERS.includes(layerId);
const isMetric = (metricId: LearningEvidence['inspectedMetricIds'][number]): boolean => METRICS.includes(metricId);
const missionForState = (state: SessionState) => state.missionId === null ? undefined : MISSIONS[state.missionId];
const UNSAFE_SLOT_IDS = new Set(['__proto__', 'constructor', 'prototype']);

const allowedSlotIds = (facilityKinds: readonly string[]): Set<string> => {
  const counts = new Map<string, number>();
  return new Set(facilityKinds.map((kind) => {
    const next = (counts.get(kind) ?? 0) + 1;
    counts.set(kind, next);
    return `${kind}-${next}`;
  }));
};

export const isPlacementComplete = (state: SessionState): boolean => {
  const mission = missionForState(state); const city = state.cityId === null ? undefined : CITIES[state.cityId];
  if (mission === undefined || city === undefined || mission.cityId !== city.id || state.placements.length !== mission.facilityKinds.length) return false;
  const allowedSlots = allowedSlotIds(mission.facilityKinds);
  const candidateIds = new Set<string>(); const slotIds = new Set<string>(); const kindCounts = new Map<string, number>(); let totalCost = 0;
  for (const placement of state.placements) {
    const candidate = city.candidates.find((item) => item.id === placement.candidateId);
    if (placement.slotId.trim().length === 0 || !allowedSlots.has(placement.slotId) || UNSAFE_SLOT_IDS.has(placement.slotId) || candidate === undefined || slotIds.has(placement.slotId) || candidateIds.has(placement.candidateId) || !mission.facilityKinds.includes(placement.facilityKind)) return false;
    slotIds.add(placement.slotId); candidateIds.add(placement.candidateId); kindCounts.set(placement.facilityKind, (kindCounts.get(placement.facilityKind) ?? 0) + 1); totalCost += candidate.costTokens;
  }
  const expectedKinds = new Map<string, number>(); for (const kind of mission.facilityKinds) expectedKinds.set(kind, (expectedKinds.get(kind) ?? 0) + 1);
  return [...expectedKinds.entries()].every(([kind, count]) => kindCounts.get(kind) === count) && totalCost <= mission.budgetTokens;
};
const expectedAnalysis = (state: SessionState): PlacementAnalysis | null => {
  if (!isPlacementComplete(state) || state.cityId === null || state.missionId === null) return null;
  try {
    return analyzePlacement(CITIES[state.cityId], MISSIONS[state.missionId], state.placements);
  } catch {
    return null;
  }
};
const isPlainRecord = (value: object): boolean => {
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
};
const sameSerializableValue = (left: unknown, right: unknown): boolean => {
  const leftPath = new WeakSet<object>();
  const rightPath = new WeakSet<object>();
  const compare = (a: unknown, b: unknown): boolean => {
    if (a === null || b === null) return a === b;
    if (typeof a !== typeof b) return false;
    if (typeof a === 'undefined' || typeof a === 'function' || typeof a === 'symbol' || typeof a === 'bigint') return false;
    if (typeof a !== 'object') return Object.is(a, b);
    if (typeof b !== 'object' || b === null) return false;
    if (leftPath.has(a) || rightPath.has(b)) return false;
    leftPath.add(a); rightPath.add(b);
    try {
      if (Array.isArray(a) || Array.isArray(b)) {
        if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) return false;
        const keysA = Object.keys(a);
        const keysB = Object.keys(b);
        if (keysA.length !== a.length || keysB.length !== b.length
          || keysA.some((key, index) => key !== String(index))
          || keysB.some((key, index) => key !== String(index))) return false;
        return a.every((item, index) => compare(item, b[index]));
      }
      if (!isPlainRecord(a) || !isPlainRecord(b)
        || Object.getOwnPropertySymbols(a).length > 0
        || Object.getOwnPropertySymbols(b).length > 0) return false;
      const keysA = Object.keys(a).sort();
      const keysB = Object.keys(b).sort();
      const recordA = a as Record<string, unknown>;
      const recordB = b as Record<string, unknown>;
      return keysA.length === keysB.length
        && keysA.every((key, index) => key === keysB[index] && compare(recordA[key], recordB[key]));
    } finally {
      leftPath.delete(a); rightPath.delete(b);
    }
  };
  try {
    return compare(left, right);
  } catch {
    return false;
  }
};
const isFreshAnalysis = (state: SessionState, analysis: PlacementAnalysis | null): analysis is PlacementAnalysis => {
  const expected = expectedAnalysis(state);
  return analysis !== null && expected !== null && sameSerializableValue(analysis, expected);
};
const hasAlternative = (state: SessionState): boolean => {
  if (state.proposals.length < 2) return false;
  const compared = new Set(state.evidence.comparedProposalIds);
  return state.proposals.some((first, index) => state.proposals.slice(index + 1).some((second) =>
    !samePlacements(first.placements, second.placements)
    && (compared.has(first.id) || compared.has(second.id))));
};

export const selectOpinionReady = (state: SessionState): false => {
  void state;
  return false;
};
export const selectStageGate = (state: SessionState, stage: StageId): boolean => {
  switch (stage) {
    case 'intake': return state.cityId !== null && state.missionId !== null && state.priorityId !== null && missionForState(state)?.cityId === state.cityId;
    case 'data-room': return new Set(state.evidence.reviewedLayerIds).size >= 2;
    case 'placement': return isPlacementComplete(state);
    case 'analysis': return isFreshAnalysis(state, state.analysis);
    case 'resident-view': return isFreshAnalysis(state, state.analysis) && state.evidence.selectedUnderservedZoneIds.length > 0 && hasAlternative(state);
    case 'opinion': return selectOpinionReady(state);
    default: return false;
  }
};
export const selectSessionSelectors = (state: SessionState) => ({ canAdvance: selectStageGate(state, state.stage), opinionReady: selectOpinionReady(state) as false });
export const selectCanAdvance = (state: SessionState): boolean => selectStageGate(state, state.stage);

const resetAfterPlacementChange = (state: SessionState): SessionState => ({ ...state, stage: indexOfStage(state.stage) > indexOfStage('placement') ? 'placement' : state.stage, analysis: null, evidence: { ...copyEvidence(state.evidence), inspectedMetricIds: [], selectedUnderservedZoneIds: [], comparedProposalIds: [] } });
const validPartialPlacements = (state: SessionState, placements: readonly FacilityPlacement[]): boolean => {
  const mission = missionForState(state); const city = state.cityId === null ? undefined : CITIES[state.cityId];
  if (mission === undefined || city === undefined || placements.length > mission.facilityKinds.length) return false;
  const allowedSlots = allowedSlotIds(mission.facilityKinds);
  const candidateIds = new Set<string>(); const slotIds = new Set<string>(); const kindCounts = new Map<string, number>();
  for (const placement of placements) {
    if (UNSAFE_SLOT_IDS.has(placement.slotId) || !allowedSlots.has(placement.slotId) || slotIds.has(placement.slotId) || candidateIds.has(placement.candidateId)) return false;
    if (!mission.facilityKinds.includes(placement.facilityKind) || city.candidates.every((candidate) => candidate.id !== placement.candidateId)) return false;
    const count = (kindCounts.get(placement.facilityKind) ?? 0) + 1;
    const expectedCount = mission.facilityKinds.filter((kind) => kind === placement.facilityKind).length;
    if (count > expectedCount) return false;
    slotIds.add(placement.slotId); candidateIds.add(placement.candidateId); kindCounts.set(placement.facilityKind, count);
  }
  return true;
};
const validZoneAction = (state: SessionState, zoneId: string): boolean => {
  const city = state.cityId === null ? undefined : CITIES[state.cityId];
  return city !== undefined && city.zones.some((zone) => zone.id === zoneId);
};

export function sessionReducer(state: SessionState, action: SessionAction): SessionState {
  switch (action.type) {
    case 'select-mission': {
      const mission = MISSIONS[action.missionId]; if (mission === undefined) return state;
      return { ...createInitialSession(), cityId: mission.cityId, missionId: action.missionId };
    }
    case 'select-priority': return state.priorityId === action.priorityId ? state : { ...state, priorityId: action.priorityId };
    case 'toggle-layer': {
      if (!isLayer(action.layerId)) return state;
      const activeLayerIds = state.activeLayerIds.includes(action.layerId) ? state.activeLayerIds.filter((layerId) => layerId !== action.layerId) : [...state.activeLayerIds, action.layerId];
      const reviewedLayerIds = state.evidence.reviewedLayerIds.includes(action.layerId) ? [...state.evidence.reviewedLayerIds] : [...state.evidence.reviewedLayerIds, action.layerId];
      return { ...state, activeLayerIds, evidence: { ...copyEvidence(state.evidence), reviewedLayerIds } };
    }
    case 'select-candidate': return state.selectedCandidateId === action.candidateId ? state : { ...state, selectedCandidateId: action.candidateId };
    case 'place-facility': {
      const placement = copyPlacement(action.placement); const index = state.placements.findIndex((item) => item.slotId === placement.slotId); const existing = index < 0 ? undefined : state.placements[index];
      const placements = [...state.placements]; if (index < 0) placements.push(placement); else placements[index] = placement;
      if (!validPartialPlacements(state, placements)) return state;
      if (existing !== undefined && existing.facilityKind === placement.facilityKind && existing.candidateId === placement.candidateId) return state;
      return resetAfterPlacementChange({ ...state, placements });
    }
    case 'store-analysis': {
      const expected = expectedAnalysis(state);
      return expected !== null && sameSerializableValue(action.analysis, expected)
        ? { ...state, analysis: copyAnalysis(action.analysis) }
        : state;
    }
    case 'inspect-metric': return !isMetric(action.metricId) || state.evidence.inspectedMetricIds.includes(action.metricId) ? state : { ...state, evidence: { ...copyEvidence(state.evidence), inspectedMetricIds: [...state.evidence.inspectedMetricIds, action.metricId] } };
    case 'select-underserved-zone':
      return !validZoneAction(state, action.zoneId)
        || !isFreshAnalysis(state, state.analysis)
        || !state.analysis.nearestFacilityAccess.zoneTravel.some((row) => row.zoneId === action.zoneId)
        || (state.evidence.selectedUnderservedZoneIds.length === 1 && state.evidence.selectedUnderservedZoneIds[0] === action.zoneId)
        ? state
        : { ...state, evidence: { ...copyEvidence(state.evidence), selectedUnderservedZoneIds: [action.zoneId] } };
    case 'save-proposal': {
      if (!isFreshAnalysis(state, action.proposal.analysis) || !samePlacements(action.proposal.placements, state.placements)) return state;
      const nextProposal = copyProposal(action.proposal); const index = state.proposals.findIndex((proposal) => proposal.id === nextProposal.id); const proposals = [...state.proposals]; if (index < 0) proposals.push(nextProposal); else proposals[index] = nextProposal;
      const hasDistinct = proposals.some((first, firstIndex) => proposals.slice(firstIndex + 1).some((second) => !samePlacements(first.placements, second.placements)));
      const comparedProposalIds = hasDistinct ? proposals.map((proposal) => proposal.id) : [...state.evidence.comparedProposalIds];
      return { ...state, proposals, evidence: { ...copyEvidence(state.evidence), comparedProposalIds } };
    }
    case 'set-opinion': return { ...state, opinion: { ...action.opinion, evidenceMetricIds: [...action.opinion.evidenceMetricIds] } };
    case 'go-to-stage': {
      const current = indexOfStage(state.stage); const target = indexOfStage(action.stage); if (target < 0 || target === current) return state;
      if (target < current) return { ...state, stage: action.stage }; if (target !== current + 1 || !selectStageGate(state, state.stage)) return state; return { ...state, stage: action.stage };
    }
    case 'restart-mission': return createInitialSession();
    default: return state;
  }
}
