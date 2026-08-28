import type { DataLayerId, FacilityKind, FacilityPlacement, GuidedActionId, LearningEvidence, MissionDefinition, SessionState } from '../domain/types';
import { assessProposal } from '../engine/assessProposal';
import { cloneProposalSnapshot, cloneStrictSerializable, compareProposals } from '../engine/proposalComparison';
import { sameSerializableValue, validatePlacementAnalysis } from '../engine/validatePlacementAnalysis';
import { CITIES } from '../domain/cities';
import { MISSIONS } from '../domain/missions';
import { cityForId, isPlacementComplete, missionForId, selectOpinionReady } from '../state/sessionReducer';
import { cloneOpinionDraft, isOpinionTextWithinLimit } from '../features/opinion/validateOpinion';

const ROOT_KEYS = ['cityId', 'missionId', 'stage', 'priorityId', 'activeLayerIds', 'selectedCandidateId', 'placements', 'analysis', 'evidence', 'proposals', 'opinion'] as const;
const EVIDENCE_KEYS = ['reviewedLayerIds', 'inspectedMetricIds', 'selectedUnderservedZoneIds', 'comparedProposalIds'] as const;
const PLACEMENT_KEYS = ['slotId', 'facilityKind', 'candidateId'] as const;
const STAGES = ['intake', 'data-room', 'placement', 'analysis', 'resident-view', 'opinion'] as const;
const DATA_LAYERS: readonly DataLayerId[] = ['population', 'roads', 'risk', 'cost', 'existing-facilities'];
const FACILITIES: readonly FacilityKind[] = ['library', 'health-support', 'culture-center'];
const METRICS: readonly LearningEvidence['inspectedMetricIds'][number][] = ['average', 'maximum', 'unreachable', 'risk', 'cost'];
const PROPOSAL_IDS = ['proposal-a', 'proposal-b'] as const;

const isRecord = (value: unknown): value is Record<string, unknown> => {
  if (value === null || typeof value !== 'object') return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
};

const hasExactKeys = (value: unknown, keys: readonly string[]): value is Record<string, unknown> => {
  if (!isRecord(value)) return false;
  const ownKeys = Reflect.ownKeys(value);
  return ownKeys.length === keys.length && ownKeys.every((key) => typeof key === 'string' && keys.includes(key)
    && Object.getOwnPropertyDescriptor(value, key)?.enumerable === true
    && Object.getOwnPropertyDescriptor(value, key) !== undefined
    && 'value' in Object.getOwnPropertyDescriptor(value, key)!);
};

const isDenseArray = (value: unknown): value is unknown[] => Array.isArray(value)
  && Object.getPrototypeOf(value) === Array.prototype
  && Reflect.ownKeys(value).length === value.length + 1
  && Array.from({ length: value.length }, (_, index) => Object.getOwnPropertyDescriptor(value, String(index))).every((descriptor) => descriptor?.enumerable === true && descriptor !== undefined && 'value' in descriptor);

const isUnique = (values: readonly string[]): boolean => new Set(values).size === values.length;
const isKnownStringArray = (value: unknown, values: readonly string[], unique = true): value is string[] => {
  if (!isDenseArray(value) || !value.every((item) => typeof item === 'string' && values.includes(item))) return false;
  return !unique || isUnique(value as string[]);
};
const isKnownId = (value: unknown, registry: object): value is string => typeof value === 'string' && Object.prototype.hasOwnProperty.call(registry, value);

const validPlacementShape = (value: unknown): value is FacilityPlacement => hasExactKeys(value, PLACEMENT_KEYS)
  && typeof value.slotId === 'string' && value.slotId.length > 0 && typeof value.facilityKind === 'string' && FACILITIES.includes(value.facilityKind as FacilityKind)
  && typeof value.candidateId === 'string' && value.candidateId.length > 0;

const validatePlacementsPartial = (mission: MissionDefinition, city: NonNullable<ReturnType<typeof cityForId>>, placements: SessionState['placements']): boolean => {
  try {
    const counts = new Map<FacilityKind, number>();
    const slots = new Map<string, FacilityKind>();
    mission.facilityKinds.forEach((kind) => { const count = (counts.get(kind) ?? 0) + 1; counts.set(kind, count); slots.set(`${kind}-${count}`, kind); });
    return placements.length <= mission.facilityKinds.length && placements.every((placement) => slots.get(placement.slotId) === placement.facilityKind
      && city.candidates.some((candidate) => candidate.id === placement.candidateId));
  } catch { return false; }
};

const validPlacements = (state: SessionState): boolean => {
  const placements = state.placements as FacilityPlacement[];
  if (!isDenseArray(placements) || !placements.every(validPlacementShape)) return false;
  if (!isUnique(placements.map((placement) => placement.slotId)) || !isUnique(placements.map((placement) => placement.candidateId))) return false;
  const city = cityForId(state.cityId);
  const mission = missionForId(state.missionId);
  return city !== undefined && mission !== undefined ? validatePlacementsPartial(mission, city, placements) : placements.length === 0;
};

const validAnalysisShape = (analysis: unknown): boolean => {
  if (analysis === null || !isRecord(analysis) || !isKnownId(analysis.cityId, CITIES) || !isKnownId(analysis.missionId, MISSIONS)) return false;
  const city = cityForId(analysis.cityId);
  const mission = missionForId(analysis.missionId);
  return city !== undefined && mission !== undefined && validatePlacementAnalysis(city, mission, analysis.placements, analysis);
};

const cloneProposals = (value: unknown): SessionState['proposals'] | null => {
  if (!isDenseArray(value) || value.length > 2) return null;
  try {
    const proposals = value.map((proposal) => cloneProposalSnapshot(proposal as never));
    if (proposals.some((proposal, index) => proposal.id !== PROPOSAL_IDS[index])) return null;
    if (proposals.length === 2) compareProposals(proposals[0]!, proposals[1]!);
    return proposals;
  } catch { return null; }
};

const deterministicAssessments = (state: SessionState): boolean => {
  if (state.priorityId === null || state.proposals.length === 0 || state.proposals.length > 2) return false;
  const priorityId = state.priorityId;
  return state.proposals.every((proposal, index) => {
    const mission = missionForId(proposal.analysis.missionId);
    const firstZone = proposal.analysis.nearestFacilityAccess.zoneTravel[0]?.zoneId;
    if (mission === undefined || firstZone === undefined) return false;
    const evidence: LearningEvidence = {
      reviewedLayerIds: ['population', 'roads'],
      inspectedMetricIds: ['average', 'maximum'],
      selectedUnderservedZoneIds: [firstZone],
      comparedProposalIds: index === 0 ? [] : ['proposal-a', 'proposal-b'],
    };
    try { return sameSerializableValue(assessProposal(mission, priorityId, proposal.analysis, evidence), proposal.assessment); } catch { return false; }
  });
};

const sanitizeState = (input: SessionState): SessionState | null => {
  try {
    const state = cloneStrictSerializable<SessionState>(input);
    if (!hasExactKeys(state, ROOT_KEYS) || !STAGES.includes(state.stage)) return null;
    if ((state.cityId !== null && !isKnownId(state.cityId, CITIES)) || (state.missionId !== null && !isKnownId(state.missionId, MISSIONS))
      || (state.priorityId !== null && !['access-equity', 'safety', 'cost'].includes(state.priorityId))) return null;
    if ((state.cityId === null) !== (state.missionId === null)) return null;
    if (state.cityId !== null && state.missionId !== null && missionForId(state.missionId)?.cityId !== state.cityId) return null;
    if (!hasExactKeys(state.evidence, EVIDENCE_KEYS)
      || !isKnownStringArray(state.activeLayerIds, DATA_LAYERS)
      || !isKnownStringArray(state.evidence.reviewedLayerIds, DATA_LAYERS)
      || !isKnownStringArray(state.evidence.inspectedMetricIds, METRICS)
      || !isKnownStringArray(state.evidence.selectedUnderservedZoneIds, state.cityId === null ? [] : (cityForId(state.cityId)?.zones.map((zone) => zone.id) ?? []))
      || !isKnownStringArray(state.evidence.comparedProposalIds, PROPOSAL_IDS)) return null;
    if (state.selectedCandidateId !== null && (state.cityId === null || cityForId(state.cityId)?.candidates.every((candidate) => candidate.id !== state.selectedCandidateId))) return null;
    if (!validPlacements(state)) return null;
    if (state.analysis !== null && !validAnalysisShape(state.analysis)) return null;
    const opinion = cloneOpinionDraft(state.opinion);
    if (opinion === null || !isOpinionTextWithinLimit(opinion.rationale) || !isOpinionTextWithinLimit(opinion.counterargument) || !isOpinionTextWithinLimit(opinion.mitigation)) return null;
    const proposals = cloneProposals(state.proposals);
    if (proposals === null) return null;
    state.proposals = proposals;
    state.opinion = opinion;
    if (state.proposals.length > 0 && !deterministicAssessments(state)) return null;
    return state;
  } catch { return null; }
};

const hasFreshAnalysis = (state: SessionState): boolean => state.cityId !== null && state.missionId !== null
  && validatePlacementAnalysis(cityForId(state.cityId), missionForId(state.missionId), state.placements, state.analysis);

const hasStrictAlternative = (state: SessionState): boolean => state.proposals.length === 2
  && state.evidence.comparedProposalIds.length === 2
  && state.evidence.comparedProposalIds[0] === 'proposal-a'
  && state.evidence.comparedProposalIds[1] === 'proposal-b'
  && deterministicAssessments(state);

export function getGuidedAction(input: SessionState): GuidedActionId {
  try {
    if (input === null || typeof input !== 'object') return null;
    const state = sanitizeState(input);
    if (state === null || selectOpinionReady(state)) return null;
    if (state.stage === 'data-room') return new Set(state.evidence.reviewedLayerIds).size < 2 ? 'review-layers' : null;
    if ((state.stage === 'placement' || state.stage === 'analysis') && isPlacementComplete(state)) {
      if (!hasFreshAnalysis(state)) return 'calculate-impact';
      if (state.stage === 'placement') return null;
      const hasAverage = state.evidence.inspectedMetricIds.includes('average');
      const hasMaximum = state.evidence.inspectedMetricIds.includes('maximum');
      return hasAverage && hasMaximum ? null : 'inspect-impact-metrics';
    }
    if (state.stage === 'resident-view' || state.stage === 'opinion') {
      const hasMetrics = state.evidence.inspectedMetricIds.includes('average') && state.evidence.inspectedMetricIds.includes('maximum');
      const hasZone = hasFreshAnalysis(state) && state.analysis !== null && state.evidence.selectedUnderservedZoneIds.some((zoneId) => state.analysis!.nearestFacilityAccess.zoneTravel.some((row) => row.zoneId === zoneId));
      return hasMetrics && hasZone && hasStrictAlternative(state) ? 'write-opinion' : null;
    }
    return null;
  } catch { return null; }
}
