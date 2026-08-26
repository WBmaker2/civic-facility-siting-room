import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { createElement } from 'react';
import { CITIES } from '../domain/cities';
import { MISSIONS } from '../domain/missions';
import { analyzePlacement } from '../engine/analyzePlacement';
import { assessProposal } from '../engine/assessProposal';
import { createProposalSnapshot } from '../engine/proposalComparison';
import type { FacilityPlacement, PlacementAnalysis, ProposalSnapshot } from '../domain/types';
import {
  createInitialSession,
  hasValidIntakeContext,
  selectCanAdvance,
  selectOpinionReady,
  sessionReducer,
} from './sessionReducer';
import { useSession } from './SessionProvider';
import type { SessionState } from './sessionTypes';

const libraryPlacement: FacilityPlacement = {
  slotId: 'library-1',
  facilityKind: 'library',
  candidateId: 'mulbit-c3',
};

const makeAnalysis = (placements: FacilityPlacement[] = [libraryPlacement]): PlacementAnalysis => ({
  ...analyzePlacement(CITIES.mulbit, MISSIONS['bookmaru-library'], placements),
});

const reorderRecordKeys = <T>(value: T): T => {
  if (Array.isArray(value)) return value.map(reorderRecordKeys) as T;
  if (value !== null && typeof value === 'object'
    && (Object.getPrototypeOf(value) === Object.prototype || Object.getPrototypeOf(value) === null)) {
    const reordered = Object.fromEntries(Object.entries(value).reverse().map(([key, entry]) => [key, reorderRecordKeys(entry)]));
    return (Object.getPrototypeOf(value) === null ? Object.assign(Object.create(null), reordered) : reordered) as T;
  }
  return value;
};

const proposal = (state: SessionState, label: 'A안' | 'B안', placements: FacilityPlacement[] = [libraryPlacement]): ProposalSnapshot => {
  const analysis = makeAnalysis(placements);
  const evidence = { ...state.evidence, comparedProposalIds: label === 'B안' ? ['proposal-a', 'proposal-b'] : [] };
  return createProposalSnapshot(label, placements, analysis, assessProposal(MISSIONS['bookmaru-library'], state.priorityId ?? 'access-equity', analysis, evidence));
};

const atDataRoom = (): SessionState => {
  let state = sessionReducer(createInitialSession(), { type: 'select-mission', missionId: 'bookmaru-library' });
  state = sessionReducer(state, { type: 'select-priority', priorityId: 'access-equity' });
  state = sessionReducer(state, { type: 'toggle-layer', layerId: 'population' });
  state = sessionReducer(state, { type: 'toggle-layer', layerId: 'roads' });
  return state;
};

const atPlacement = (): SessionState => {
  let state = atDataRoom();
  state = sessionReducer(state, { type: 'go-to-stage', stage: 'data-room' });
  state = sessionReducer(state, { type: 'go-to-stage', stage: 'placement' });
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
    state = sessionReducer(state, { type: 'go-to-stage', stage: 'data-room' });
    expect(state.stage).toBe('data-room');
    state = sessionReducer(state, { type: 'toggle-layer', layerId: 'population' });
    state = sessionReducer(state, { type: 'toggle-layer', layerId: 'roads' });
    state = sessionReducer(state, { type: 'go-to-stage', stage: 'placement' });
    expect(state.stage).toBe('placement');
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

  it('rejects a mission-less data-room from advancing even when two layers were reviewed', () => {
    const invalidDataRoom: SessionState = {
      ...createInitialSession(),
      stage: 'data-room',
      activeLayerIds: ['population', 'roads'],
      evidence: {
        reviewedLayerIds: ['population', 'roads'],
        inspectedMetricIds: [],
        selectedUnderservedZoneIds: [],
        comparedProposalIds: [],
      },
    };

    expect(sessionReducer(invalidDataRoom, { type: 'go-to-stage', stage: 'placement' })).toBe(invalidDataRoom);
    expect(selectCanAdvance(invalidDataRoom)).toBe(false);
  });

  it('rejects inherited registry identifiers in context, transitions, and mission selection', () => {
    const inheritedIds = ['__proto__', 'constructor', 'toString'];
    for (const identifier of inheritedIds) {
      const invalidMission = { ...atDataRoom(), missionId: identifier as SessionState['missionId'] };
      const invalidCity = { ...atDataRoom(), cityId: identifier as SessionState['cityId'] };
      expect(hasValidIntakeContext(invalidMission)).toBe(false);
      expect(hasValidIntakeContext(invalidCity)).toBe(false);
      expect(sessionReducer(invalidMission, { type: 'go-to-stage', stage: 'placement' })).toBe(invalidMission);
      expect(sessionReducer(invalidCity, { type: 'go-to-stage', stage: 'placement' })).toBe(invalidCity);
      const initial = createInitialSession();
      expect(sessionReducer(initial, { type: 'select-mission', missionId: identifier as 'bookmaru-library' })).toBe(initial);
    }
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

  it('records each inspected metric once and preserves state identity for duplicate evidence', () => {
    let state = createInitialSession();
    for (const metricId of ['average', 'maximum', 'unreachable', 'risk', 'cost'] as const) {
      const inspected = sessionReducer(state, { type: 'inspect-metric', metricId });
      expect(inspected.evidence.inspectedMetricIds).toContain(metricId);
      state = inspected;
      const duplicate = sessionReducer(state, { type: 'inspect-metric', metricId });
      expect(duplicate).toBe(state);
      expect(duplicate.evidence.inspectedMetricIds.filter((item) => item === metricId)).toHaveLength(1);
    }
  });

  it('replaces a slot immutably and invalidates analysis details while retaining prior snapshots', () => {
    let state = atDataRoom();
    state = sessionReducer(state, { type: 'place-facility', placement: libraryPlacement });
    state = sessionReducer(state, { type: 'store-analysis', analysis: makeAnalysis() });
    state = sessionReducer(state, { type: 'inspect-metric', metricId: 'average' });
    state = sessionReducer(state, { type: 'inspect-metric', metricId: 'maximum' });
    state = sessionReducer(state, { type: 'select-underserved-zone', zoneId: 'mulbit-north' });
    state = sessionReducer(state, { type: 'save-proposal', proposal: proposal(state, 'A안') });
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
    expect(JSON.parse(JSON.stringify(restarted))).toEqual(restarted);
  });

  it('exposes the current-stage gate through selectCanAdvance and throws outside its provider', () => {
    let state = sessionReducer(createInitialSession(), { type: 'select-mission', missionId: 'bookmaru-library' });
    expect(selectCanAdvance(state)).toBe(false);
    state = sessionReducer(state, { type: 'select-priority', priorityId: 'cost' });
    expect(selectCanAdvance(state)).toBe(true);
    function MissingProvider() {
      useSession();
      return null;
    }
    expect(() => render(createElement(MissingProvider))).toThrow('SessionProvider 안에서만');
  });

  it('uses the current stage gate for each of the five forward transitions', () => {
    let state = sessionReducer(createInitialSession(), { type: 'select-mission', missionId: 'bookmaru-library' });
    expect(sessionReducer(state, { type: 'go-to-stage', stage: 'data-room' })).toBe(state);
    state = sessionReducer(state, { type: 'select-priority', priorityId: 'access-equity' });
    state = sessionReducer(state, { type: 'go-to-stage', stage: 'data-room' });
    expect(state.stage).toBe('data-room');
    expect(sessionReducer(state, { type: 'go-to-stage', stage: 'placement' })).toBe(state);
    state = sessionReducer(state, { type: 'toggle-layer', layerId: 'population' });
    state = sessionReducer(state, { type: 'toggle-layer', layerId: 'roads' });
    state = sessionReducer(state, { type: 'go-to-stage', stage: 'placement' });
    expect(state.stage).toBe('placement');
    state = sessionReducer(state, { type: 'place-facility', placement: libraryPlacement });
    state = sessionReducer(state, { type: 'go-to-stage', stage: 'analysis' });
    expect(state.stage).toBe('analysis');
    state = sessionReducer(state, { type: 'store-analysis', analysis: makeAnalysis() });
    state = sessionReducer(state, { type: 'inspect-metric', metricId: 'average' });
    expect(sessionReducer(state, { type: 'go-to-stage', stage: 'resident-view' }).stage).toBe('analysis');
    state = sessionReducer(state, { type: 'inspect-metric', metricId: 'maximum' });
    state = sessionReducer(state, { type: 'go-to-stage', stage: 'resident-view' });
    expect(state.stage).toBe('resident-view');
    state = sessionReducer(state, { type: 'select-underserved-zone', zoneId: 'mulbit-north' });
    state = sessionReducer(state, { type: 'save-proposal', proposal: proposal(state, 'A안') });
    state = sessionReducer(state, { type: 'go-to-stage', stage: 'placement' });
    state = sessionReducer(state, { type: 'place-facility', placement: { ...libraryPlacement, candidateId: 'mulbit-b2' } });
    state = sessionReducer(state, { type: 'store-analysis', analysis: makeAnalysis([{ ...libraryPlacement, candidateId: 'mulbit-b2' }]) });
    state = sessionReducer(state, { type: 'inspect-metric', metricId: 'average' });
    state = sessionReducer(state, { type: 'inspect-metric', metricId: 'maximum' });
    state = sessionReducer(state, { type: 'select-underserved-zone', zoneId: 'mulbit-north' });
    const bInput = proposal(state, 'B안', [{ ...libraryPlacement, candidateId: 'mulbit-b2' }]);
    expect(sessionReducer(state, { type: 'save-proposal', proposal: { ...bInput, id: 'proposal-a' } })).toBe(state);
    expect(sessionReducer(state, { type: 'save-proposal', proposal: { ...bInput, label: 'A안' } })).toBe(state);
    expect(sessionReducer(state, { type: 'save-proposal', proposal: { ...bInput, placements: [{ ...bInput.placements[0]!, candidateId: 'mulbit-c3' }] } })).toBe(state);
    state = sessionReducer(state, { type: 'save-proposal', proposal: bInput });
    expect(sessionReducer(state, { type: 'save-proposal', proposal: bInput })).toBe(state);
    state = sessionReducer(state, { type: 'go-to-stage', stage: 'analysis' });
    state = sessionReducer(state, { type: 'select-underserved-zone', zoneId: 'mulbit-north' });
    state = sessionReducer(state, { type: 'go-to-stage', stage: 'resident-view' });
    expect(sessionReducer(state, { type: 'go-to-stage', stage: 'opinion' }).stage).toBe('opinion');
  });

  it('rejects fabricated, incomplete, or non-deterministic analysis before storing it', () => {
    let state = atPlacement();
    state = sessionReducer(state, { type: 'place-facility', placement: libraryPlacement });
    const valid = makeAnalysis();
    expect(sessionReducer(state, { type: 'store-analysis', analysis: { ...valid, perFacility: {} } })).toBe(state);
    expect(sessionReducer(state, { type: 'store-analysis', analysis: { ...valid, nearestFacilityAccess: { ...valid.nearestFacilityAccess, populationWeightedAverage: 999 } } })).toBe(state);
    expect(sessionReducer(state, { type: 'store-analysis', analysis: { ...valid, totalCostTokens: 999 } })).toBe(state);
    expect(sessionReducer(state, { type: 'store-analysis', analysis: { ...valid, nearestFacilityAccess: { ...valid.nearestFacilityAccess, zoneTravel: [] } } })).toBe(state);
    const combined = sessionReducer(atDataRoom(), { type: 'select-mission', missionId: 'combined-review' });
    expect(sessionReducer(combined, { type: 'store-analysis', analysis: valid })).toBe(combined);
  });

  it('rebuilds proposal assessment from current evidence and rejects forged snapshots', () => {
    let state = atPlacement();
    state = sessionReducer(state, { type: 'place-facility', placement: libraryPlacement });
    state = sessionReducer(state, { type: 'store-analysis', analysis: makeAnalysis() });
    state = sessionReducer(state, { type: 'inspect-metric', metricId: 'average' });
    state = sessionReducer(state, { type: 'inspect-metric', metricId: 'maximum' });
    state = sessionReducer(state, { type: 'select-underserved-zone', zoneId: 'mulbit-north' });
    const evidence = { ...state.evidence, comparedProposalIds: [] };
    const expected = createProposalSnapshot('A안', state.placements, state.analysis!, assessProposal(MISSIONS['bookmaru-library'], 'access-equity', state.analysis!, evidence));
    const forged = { ...expected, assessment: { ...expected.assessment, conditionResults: [] } };
    expect(sessionReducer(state, { type: 'save-proposal', proposal: forged })).toBe(state);
    const accepted = sessionReducer(state, { type: 'save-proposal', proposal: expected });
    expect(accepted.proposals).toHaveLength(1);
    expect(Object.isFrozen(accepted.proposals[0])).toBe(true);
    expect(sessionReducer(state, { type: 'save-proposal', proposal: null as never })).toBe(state);
  });

  it('rejects invalid intermediate placements but allows valid slot replacement', () => {
    let state = sessionReducer(createInitialSession(), { type: 'select-mission', missionId: 'combined-review' });
    const library: FacilityPlacement = { slotId: 'library-1', facilityKind: 'library', candidateId: 'maru-c2' };
    const health: FacilityPlacement = { slotId: 'health-support-1', facilityKind: 'health-support', candidateId: 'maru-d3' };
    expect(sessionReducer(state, { type: 'place-facility', placement: { ...library, slotId: '__proto__' } })).toBe(state);
    expect(sessionReducer(state, { type: 'place-facility', placement: { ...library, slotId: 'unknown-1' } })).toBe(state);
    state = sessionReducer(state, { type: 'place-facility', placement: library });
    expect(sessionReducer(state, { type: 'place-facility', placement: { ...health, slotId: 'library-1', candidateId: 'maru-d3' } })).toBe(state);
    state = sessionReducer(state, { type: 'place-facility', placement: health });
    expect(sessionReducer(state, { type: 'place-facility', placement: { ...health, slotId: 'health-support-2' } })).toBe(state);
    expect(sessionReducer(state, { type: 'place-facility', placement: { ...library, candidateId: 'maru-d3' } })).toBe(state);
  });

  it('preserves state identity and fresh analysis when a placement would exceed budget', () => {
    let state = createInitialSession();
    state = sessionReducer(state, { type: 'select-mission', missionId: 'combined-review' });
    state = sessionReducer(state, { type: 'select-priority', priorityId: 'cost' });
    state = sessionReducer(state, { type: 'toggle-layer', layerId: 'population' });
    state = sessionReducer(state, { type: 'toggle-layer', layerId: 'roads' });
    state = sessionReducer(state, { type: 'go-to-stage', stage: 'data-room' });
    state = sessionReducer(state, { type: 'go-to-stage', stage: 'placement' });
    state = sessionReducer(state, { type: 'place-facility', placement: { slotId: 'library-1', facilityKind: 'library', candidateId: 'maru-d3' } });
    state = sessionReducer(state, { type: 'place-facility', placement: { slotId: 'health-support-1', facilityKind: 'health-support', candidateId: 'maru-c2' } });
    const analysis = analyzePlacement(CITIES.maru, MISSIONS['combined-review'], state.placements);
    state = sessionReducer(state, { type: 'store-analysis', analysis });
    const rejected = sessionReducer(state, { type: 'place-facility', placement: { slotId: 'health-support-1', facilityKind: 'health-support', candidateId: 'maru-e1-premium' } });
    expect(rejected).toBe(state);
    expect(rejected.analysis).toBe(state.analysis);
  });

  it('fails closed for malformed placement input without throwing', () => {
    const state = atPlacement();
    const malformed = sessionReducer(state, {
      type: 'place-facility',
      placement: { slotId: 'library-1', facilityKind: 'library', candidateId: 'not-a-candidate' },
    });
    expect(malformed).toBe(state);
    const accessor = {} as { slotId: string; facilityKind: string; candidateId: string };
    Object.defineProperties(accessor, {
      slotId: { get: () => { throw new Error('malformed accessor'); } },
      facilityKind: { value: 'library' },
      candidateId: { value: 'mulbit-c3' },
    });
    expect(sessionReducer(state, { type: 'place-facility', placement: accessor as FacilityPlacement })).toBe(state);
  });

  it('accepts only an own-key candidate from the assigned city and preserves identity otherwise', () => {
    let state = atPlacement();
    state = sessionReducer(state, { type: 'place-facility', placement: libraryPlacement });
    state = sessionReducer(state, { type: 'store-analysis', analysis: makeAnalysis() });
    state = sessionReducer(state, { type: 'inspect-metric', metricId: 'average' });
    const originalEvidence = state.evidence;
    for (const candidateId of ['maru-b2', 'not-a-candidate', null, 42]) {
      const rejected = sessionReducer(state, { type: 'select-candidate', candidateId: candidateId as string });
      expect(rejected).toBe(state);
      expect(rejected.analysis).toBe(state.analysis);
      expect(rejected.evidence).toBe(originalEvidence);
    }
    const selected = sessionReducer(state, { type: 'select-candidate', candidateId: 'mulbit-c3' });
    expect(selected.selectedCandidateId).toBe('mulbit-c3');
    expect(sessionReducer(selected, { type: 'select-candidate', candidateId: 'mulbit-c3' })).toBe(selected);
  });

  it('only selects an underserved zone present in a fresh analysis row', () => {
    let state = atPlacement();
    expect(sessionReducer(state, { type: 'select-underserved-zone', zoneId: 'mulbit-north' })).toBe(state);
    state = sessionReducer(state, { type: 'place-facility', placement: libraryPlacement });
    const analysis = makeAnalysis();
    state = sessionReducer(state, { type: 'store-analysis', analysis });
    const missingRow = { ...state, analysis: { ...analysis, nearestFacilityAccess: { ...analysis.nearestFacilityAccess, zoneTravel: [] } } };
    expect(sessionReducer(missingRow, { type: 'select-underserved-zone', zoneId: 'mulbit-north' })).toBe(missingRow);
    expect(sessionReducer(state, { type: 'select-underserved-zone', zoneId: 'not-a-zone' })).toBe(state);
    expect(sessionReducer(state, { type: 'select-underserved-zone', zoneId: 'mulbit-north' }).evidence.selectedUnderservedZoneIds).toEqual(['mulbit-north']);
  });

  it('accepts verified analyses when record insertion order differs, but rejects contract changes', () => {
    let state = atPlacement();
    state = sessionReducer(state, { type: 'place-facility', placement: libraryPlacement });
    const valid = makeAnalysis();
    const reordered = reorderRecordKeys(valid);
    const storedReordered = sessionReducer(state, { type: 'store-analysis', analysis: reordered });
    expect(storedReordered.analysis).toEqual(valid);

    const combinedPlacements: FacilityPlacement[] = [
      { slotId: 'library-1', facilityKind: 'library', candidateId: 'maru-b2' },
      { slotId: 'health-support-1', facilityKind: 'health-support', candidateId: 'maru-e3' },
    ];
    let combined = sessionReducer(createInitialSession(), { type: 'select-mission', missionId: 'combined-review' });
    combined = sessionReducer(combined, { type: 'place-facility', placement: combinedPlacements[0]! });
    combined = sessionReducer(combined, { type: 'place-facility', placement: combinedPlacements[1]! });
    const combinedAnalysis = analyzePlacement(CITIES.maru, MISSIONS['combined-review'], combinedPlacements);
    const reorderedCombined = reorderRecordKeys(combinedAnalysis);
    expect(Object.keys(reorderedCombined.perFacility)).toEqual(Object.keys(combinedAnalysis.perFacility).reverse());
    expect(Object.keys(reorderedCombined.perFacility['library-1']!)).toEqual(Object.keys(combinedAnalysis.perFacility['library-1']!).reverse());
    const storedCombined = sessionReducer(combined, { type: 'store-analysis', analysis: reorderedCombined });
    expect(storedCombined.analysis).toEqual(combinedAnalysis);

    const missingKey = { ...valid };
    delete (missingKey as unknown as Record<string, unknown>).totalCostTokens;
    const extraKey = { ...valid, unexpected: true } as PlacementAnalysis;
    const changedValue = { ...valid, totalCostTokens: valid.totalCostTokens + 1 };
    const dateValue = { ...valid, totalCostTokens: new Date() } as unknown as PlacementAnalysis;
    const functionValue = { ...valid, totalCostTokens: (() => 2) } as unknown as PlacementAnalysis;
    const symbolValue = { ...valid, totalCostTokens: Symbol('cost') } as unknown as PlacementAnalysis;
    const undefinedValue = { ...valid, totalCostTokens: undefined } as unknown as PlacementAnalysis;
    expect(sessionReducer(state, { type: 'store-analysis', analysis: missingKey })).toBe(state);
    expect(sessionReducer(state, { type: 'store-analysis', analysis: extraKey })).toBe(state);
    expect(sessionReducer(state, { type: 'store-analysis', analysis: changedValue })).toBe(state);
    expect(sessionReducer(state, { type: 'store-analysis', analysis: dateValue })).toBe(state);
    expect(sessionReducer(state, { type: 'store-analysis', analysis: functionValue })).toBe(state);
    expect(sessionReducer(state, { type: 'store-analysis', analysis: symbolValue })).toBe(state);
    expect(sessionReducer(state, { type: 'store-analysis', analysis: undefinedValue })).toBe(state);
  });

  it('rejects non-standard arrays while accepting frozen and ordinary dense arrays', () => {
    let state = atPlacement();
    state = sessionReducer(state, { type: 'place-facility', placement: libraryPlacement });
    const valid = makeAnalysis();
    const symbolNested = [...valid.nearestFacilityAccess.zoneTravel];
    Object.defineProperty(symbolNested, Symbol('extra'), { value: true, enumerable: true });
    const symbolPlacement = [...valid.placements];
    Object.defineProperty(symbolPlacement, Symbol('extra'), { value: true, enumerable: true });
    const extraKey = [...valid.nearestFacilityAccess.zoneTravel] as typeof valid.nearestFacilityAccess.zoneTravel & { extra?: boolean };
    extraKey.extra = true;
    const everyKey = [...valid.nearestFacilityAccess.zoneTravel] as typeof valid.nearestFacilityAccess.zoneTravel & { every?: unknown };
    Object.defineProperty(everyKey, 'every', { value: () => true, enumerable: true });
    const customPrototype = [...valid.nearestFacilityAccess.zoneTravel];
    Object.setPrototypeOf(customPrototype, { custom: true });
    const sparse = [...valid.nearestFacilityAccess.zoneTravel];
    delete sparse[0];
    const accessor = [...valid.nearestFacilityAccess.zoneTravel];
    Object.defineProperty(accessor, '0', { configurable: true, enumerable: true, get: () => valid.nearestFacilityAccess.zoneTravel[0] });
    const accessorRecord = { ...valid };
    Object.defineProperty(accessorRecord, 'totalCostTokens', { configurable: true, enumerable: true, get: () => valid.totalCostTokens });
    const attempts = [
      { ...valid, nearestFacilityAccess: { ...valid.nearestFacilityAccess, zoneTravel: symbolNested } },
      { ...valid, placements: symbolPlacement },
      { ...valid, nearestFacilityAccess: { ...valid.nearestFacilityAccess, zoneTravel: extraKey } },
      { ...valid, nearestFacilityAccess: { ...valid.nearestFacilityAccess, zoneTravel: everyKey } },
      { ...valid, nearestFacilityAccess: { ...valid.nearestFacilityAccess, zoneTravel: customPrototype } },
      { ...valid, nearestFacilityAccess: { ...valid.nearestFacilityAccess, zoneTravel: sparse } },
      { ...valid, nearestFacilityAccess: { ...valid.nearestFacilityAccess, zoneTravel: accessor } },
      accessorRecord,
    ] as PlacementAnalysis[];
    for (const [index, analysis] of attempts.entries()) expect(sessionReducer(state, { type: 'store-analysis', analysis }), `attempt ${index}`).toBe(state);
    const frozen = { ...valid, placements: Object.freeze([...valid.placements]), nearestFacilityAccess: { ...valid.nearestFacilityAccess, zoneTravel: Object.freeze([...valid.nearestFacilityAccess.zoneTravel]) } } as unknown as PlacementAnalysis;
    expect(sessionReducer(state, { type: 'store-analysis', analysis: frozen })).not.toBe(state);

    const nonEnumerableTopLevel = { ...valid };
    Object.defineProperty(nonEnumerableTopLevel, 'totalCostTokens', { value: valid.totalCostTokens, enumerable: false });
    const nonEnumerableNested = { ...valid, nearestFacilityAccess: { ...valid.nearestFacilityAccess } };
    Object.defineProperty(nonEnumerableNested.nearestFacilityAccess, 'populationWeightedAverage', { value: valid.nearestFacilityAccess.populationWeightedAverage, enumerable: false });
    const nonEnumerablePlacement = { ...valid, placements: [{ ...libraryPlacement }] };
    Object.defineProperty(nonEnumerablePlacement.placements[0]!, 'candidateId', { value: libraryPlacement.candidateId, enumerable: false });
    const nonEnumerableIndex = { ...valid, nearestFacilityAccess: { ...valid.nearestFacilityAccess, zoneTravel: [...valid.nearestFacilityAccess.zoneTravel] } };
    Object.defineProperty(nonEnumerableIndex.nearestFacilityAccess.zoneTravel, '0', { value: valid.nearestFacilityAccess.zoneTravel[0], enumerable: false });
    for (const malformed of [nonEnumerableTopLevel, nonEnumerableNested, nonEnumerablePlacement, nonEnumerableIndex]) {
      expect(sessionReducer(state, { type: 'store-analysis', analysis: malformed as PlacementAnalysis })).toBe(state);
    }
  });

});
