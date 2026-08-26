import type { DataLayerId, GuidedActionId, LearningEvidence, SessionState } from '../domain/types';
import { validatePlacementAnalysis } from '../engine/validatePlacementAnalysis';
import { cityForId, isPlacementComplete, missionForId, selectOpinionReady } from '../state/sessionReducer';

const isStringArray = (value: unknown): value is string[] => Array.isArray(value) && value.every((item) => typeof item === 'string');
const DATA_LAYERS: readonly DataLayerId[] = ['population', 'roads', 'risk', 'cost', 'existing-facilities'];
const METRICS: readonly LearningEvidence['inspectedMetricIds'][number][] = ['average', 'maximum', 'unreachable', 'risk', 'cost'];
const isDataLayerArray = (value: unknown): value is DataLayerId[] => isStringArray(value) && value.every((item) => DATA_LAYERS.includes(item as DataLayerId));
const isMetricArray = (value: unknown): value is LearningEvidence['inspectedMetricIds'] => isStringArray(value) && value.every((item) => METRICS.includes(item as LearningEvidence['inspectedMetricIds'][number]));

const hasDistinctAlternative = (state: SessionState): boolean => {
  if (!Array.isArray(state.proposals) || state.proposals.length !== 2 || !Array.isArray(state.evidence.comparedProposalIds)) return false;
  const [first, second] = state.proposals;
  if (first?.id !== 'proposal-a' || second?.id !== 'proposal-b') return false;
  if (state.evidence.comparedProposalIds.length !== 2 || state.evidence.comparedProposalIds[0] !== 'proposal-a' || state.evidence.comparedProposalIds[1] !== 'proposal-b') return false;
  if (!Array.isArray(first.placements) || !Array.isArray(second.placements) || first.placements.length !== second.placements.length) return false;
  return first.placements.some((placement) => second.placements.find((other) => other.slotId === placement.slotId && other.facilityKind === placement.facilityKind && other.candidateId === placement.candidateId) === undefined);
};

const hasFreshAnalysis = (state: SessionState): boolean => state.cityId !== null && state.missionId !== null
  && validatePlacementAnalysis(cityForId(state.cityId), missionForId(state.missionId), state.placements, state.analysis);

export function getGuidedAction(state: SessionState): GuidedActionId {
  try {
    if (state === null || typeof state !== 'object') return null;
    if (selectOpinionReady(state)) return null;

    if (state.stage === 'data-room') {
      const reviewed = state.evidence?.reviewedLayerIds;
      return isDataLayerArray(reviewed) && new Set(reviewed).size < 2 ? 'review-layers' : null;
    }

    if ((state.stage === 'placement' || state.stage === 'analysis') && isPlacementComplete(state)) {
      return hasFreshAnalysis(state) ? null : 'calculate-impact';
    }

    if (state.stage === 'resident-view' || state.stage === 'opinion') {
      const metrics = state.evidence?.inspectedMetricIds;
      const zones = state.evidence?.selectedUnderservedZoneIds;
      const analysis = state.analysis;
      if (!isMetricArray(metrics) || !metrics.includes('average') || !metrics.includes('maximum') || !isStringArray(zones)
        || zones.length === 0 || !hasFreshAnalysis(state) || analysis === null
        || !analysis.nearestFacilityAccess.zoneTravel.some((row) => zones.includes(row.zoneId)) || !hasDistinctAlternative(state)) return null;
      return 'write-opinion';
    }
    return null;
  } catch {
    return null;
  }
}
