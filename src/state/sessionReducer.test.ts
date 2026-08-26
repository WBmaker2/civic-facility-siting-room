import { describe, expect, it } from 'vitest';
import { MISSIONS } from '../domain/missions';
import type { FacilityPlacement, PlacementAnalysis, ProposalSnapshot } from '../domain/types';
import {
  createInitialSession,
  selectOpinionReady,
  sessionReducer,
} from './sessionReducer';
import type { SessionState } from './sessionTypes';

const libraryPlacement: FacilityPlacement = {
  slotId: 'library-1',
  facilityKind: 'library',
  candidateId: 'mulbit-c3',
};

const makeAnalysis = (placements: FacilityPlacement[] = [libraryPlacement]): PlacementAnalysis => ({
  cityId: 'mulbit',
  missionId: 'bookmaru-library',
  placements,
  perFacility: {},
  nearestFacilityAccess: {
    populationWeightedAverage: 3,
    reachablePeopleTokens: 24,
    totalPeopleTokens: 24,
    longestReachableTravel: 7,
    worstServedZoneIds: ['mulbit-hill'],
    unreachableZoneIds: [],
    zoneTravel: [],
  },
  mobilityBarrierAccess: {
    populationWeightedAverage: 3,
    reachablePeopleTokens: 8,
    totalPeopleTokens: 8,
    longestReachableTravel: 4,
    worstServedZoneIds: ['mulbit-south'],
    unreachableZoneIds: [],
    zoneTravel: [],
  },
  totalCostTokens: 2,
  riskyCandidateIds: [],
  overlapZoneIds: [],
  coverageGapZoneIds: [],
  missionContext: {
    budgetTokens: 3,
    serviceThreshold: 7,
    facilityKinds: ['library'],
    conditionCodes: ['WITHIN_BUDGET', 'NO_UNREACHABLE_ZONE', 'WORST_TRAVEL_WITHIN_LIMIT', 'NO_RISK_SITE', 'COST_WITHIN_PRIORITY_CAP'],
  },
});

const proposal = (id: string): ProposalSnapshot => ({
  id,
  label: `안 ${id}`,
  placements: [libraryPlacement],
  analysis: makeAnalysis(),
  assessment: {
    verdict: 'revise',
    conditionResults: [],
    priorityConsistent: false,
    missingEvidence: [],
    feedbackPrompts: [],
  },
});

const atDataRoom = (): SessionState => {
  let state = sessionReducer(createInitialSession(), { type: 'select-mission', missionId: 'bookmaru-library' });
  state = sessionReducer(state, { type: 'select-priority', priorityId: 'access-equity' });
  state = sessionReducer(state, { type: 'toggle-layer', layerId: 'population' });
  state = sessionReducer(state, { type: 'toggle-layer', layerId: 'roads' });
  return state;
};

describe('sessionReducer', () => {
  it('starts with a fresh intake session', () => {
    const first = createInitialSession();
    const second = createInitialSession();
    expect(first.stage).toBe('intake');
    expect(first).toEqual(second);
    expect(first).not.toBe(second);
    expect(first.evidence).not.toBe(second.evidence);
    expect(first.opinion).not.toBe(second.opinion);
  });

  it('assigns the mission city and resets every mission-dependent field on re-selection', () => {
    let state = atDataRoom();
    state = sessionReducer(state, { type: 'select-candidate', candidateId: 'mulbit-c3' });
    state = sessionReducer(state, { type: 'place-facility', placement: libraryPlacement });
    state = sessionReducer(state, { type: 'store-analysis', analysis: makeAnalysis() });
    state = sessionReducer(state, { type: 'inspect-metric', metricId: 'average' });
    state = sessionReducer(state, { type: 'set-opinion', opinion: { ...state.opinion, rationale: '기록' } });
    const reset = sessionReducer(state, { type: 'select-mission', missionId: 'combined-review' });
    expect(reset.cityId).toBe(MISSIONS['combined-review'].cityId);
    expect(reset.missionId).toBe('combined-review');
    expect(reset.stage).toBe('intake');
    expect(reset.priorityId).toBeNull();
    expect(reset.activeLayerIds).toEqual([]);
    expect(reset.placements).toEqual([]);
    expect(reset.analysis).toBeNull();
    expect(reset.proposals).toEqual([]);
    expect(reset.evidence).toEqual({ reviewedLayerIds: [], inspectedMetricIds: [], selectedUnderservedZoneIds: [], comparedProposalIds: [] });
    expect(reset.opinion.rationale).toBe('');
  });

  it('rejects forward stage skipping and only advances after each gate', () => {
    let state = createInitialSession();
    expect(sessionReducer(state, { type: 'go-to-stage', stage: 'placement' })).toBe(state);
    state = sessionReducer(state, { type: 'select-mission', missionId: 'bookmaru-library' });
    state = sessionReducer(state, { type: 'select-priority', priorityId: 'cost' });
    expect(sessionReducer(state, { type: 'go-to-stage', stage: 'data-room' })).toBe(state);
    state = sessionReducer(state, { type: 'toggle-layer', layerId: 'population' });
    state = sessionReducer(state, { type: 'toggle-layer', layerId: 'roads' });
    state = sessionReducer(state, { type: 'go-to-stage', stage: 'data-room' });
    expect(state.stage).toBe('data-room');
    state = sessionReducer(state, { type: 'go-to-stage', stage: 'placement' });
    expect(state.stage).toBe('data-room');
  });

  it('allows one-stage backward movement while preserving learner evidence', () => {
    let state = atDataRoom();
    state = sessionReducer(state, { type: 'go-to-stage', stage: 'data-room' });
    const back = sessionReducer(state, { type: 'go-to-stage', stage: 'intake' });
    expect(back.stage).toBe('intake');
    expect(back.activeLayerIds).toEqual(['population', 'roads']);
    expect(back.priorityId).toBe('access-equity');
    expect(sessionReducer(back, { type: 'go-to-stage', stage: 'placement' })).toBe(back);
  });

  it('toggles active layers but accumulates unique reviewed layers', () => {
    let state = createInitialSession();
    state = sessionReducer(state, { type: 'toggle-layer', layerId: 'population' });
    state = sessionReducer(state, { type: 'toggle-layer', layerId: 'population' });
    state = sessionReducer(state, { type: 'toggle-layer', layerId: 'roads' });
    state = sessionReducer(state, { type: 'toggle-layer', layerId: 'roads' });
    expect(state.activeLayerIds).toEqual([]);
    expect(state.evidence.reviewedLayerIds).toEqual(['population', 'roads']);
  });

  it('replaces a slot immutably and invalidates analysis details while retaining prior snapshots', () => {
    let state = atDataRoom();
    state = sessionReducer(state, { type: 'place-facility', placement: libraryPlacement });
    state = sessionReducer(state, { type: 'store-analysis', analysis: makeAnalysis() });
    state = sessionReducer(state, { type: 'save-proposal', proposal: proposal('a') });
    state = sessionReducer(state, { type: 'inspect-metric', metricId: 'average' });
    const before = state.placements;
    const changed = sessionReducer(state, { type: 'place-facility', placement: { ...libraryPlacement, candidateId: 'mulbit-b2' } });
    expect(changed.placements).toEqual([{ ...libraryPlacement, candidateId: 'mulbit-b2' }]);
    expect(changed.placements).not.toBe(before);
    expect(changed.analysis).toBeNull();
    expect(changed.proposals).toHaveLength(1);
    expect(changed.evidence.inspectedMetricIds).toEqual([]);
    expect(changed.evidence.comparedProposalIds).toEqual([]);
  });

  it('stores only analysis that matches the current mission, city, and placements', () => {
    let state = atDataRoom();
    state = sessionReducer(state, { type: 'place-facility', placement: libraryPlacement });
    const fresh = makeAnalysis();
    const stored = sessionReducer(state, { type: 'store-analysis', analysis: fresh });
    expect(stored.analysis).toEqual(fresh);
    expect(stored.analysis).not.toBe(fresh);
    const stale = sessionReducer(stored, { type: 'store-analysis', analysis: { ...fresh, cityId: 'maru' } });
    expect(stale).toBe(stored);
  });

  it('restarts with no learner writing or choices and keeps opinionReady typed false', () => {
    let state = atDataRoom();
    state = sessionReducer(state, { type: 'set-opinion', opinion: { ...state.opinion, rationale: '비공개 기록' } });
    const restarted = sessionReducer(state, { type: 'restart-mission' });
    expect(restarted).toEqual(createInitialSession());
    expect(restarted).not.toBe(state);
    expect(selectOpinionReady(restarted)).toBe(false);
  });

});
