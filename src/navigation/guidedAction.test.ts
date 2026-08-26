import { describe, expect, it } from 'vitest';
import type { LearningEvidence, SessionState } from '../domain/types';
import { analyzePlacement } from '../engine/analyzePlacement';
import { assessProposal } from '../engine/assessProposal';
import { createProposalSnapshot } from '../engine/proposalComparison';
import { createInitialSession } from '../state/sessionReducer';
import { CITIES } from '../domain/cities';
import { MISSIONS } from '../domain/missions';
import { getGuidedAction } from './guidedAction';

const stateWith = (patch: Partial<SessionState>): SessionState => ({
  ...createInitialSession(),
  cityId: 'mulbit',
  missionId: 'bookmaru-library',
  priorityId: 'access-equity',
  ...patch,
});

describe('getGuidedAction', () => {
  it('guides a data-room learner to review layers', () => {
    expect(getGuidedAction(stateWith({ stage: 'data-room' }))).toBe('review-layers');
  });

  it('guides a valid placement without a fresh analysis to calculate impact', () => {
    expect(getGuidedAction(stateWith({ stage: 'placement', placements: [{ slotId: 'library-1', facilityKind: 'library', candidateId: 'mulbit-b2' }] }))).toBe('calculate-impact');
  });

  it('returns null for fresh analysis and calculate-impact for a stale deterministic analysis', () => {
    const mission = MISSIONS['bookmaru-library'];
    const city = CITIES.mulbit;
    const placement = { slotId: 'library-1', facilityKind: 'library' as const, candidateId: 'mulbit-b2' };
    const stalePlacement = { ...placement, candidateId: 'mulbit-c3' };
    const fresh = analyzePlacement(city, mission, [placement]);
    const stale = analyzePlacement(city, mission, [stalePlacement]);
    expect(getGuidedAction(stateWith({ stage: 'analysis', placements: [placement], analysis: fresh }))).toBeNull();
    expect(getGuidedAction(stateWith({ stage: 'analysis', placements: [placement], analysis: stale }))).toBe('calculate-impact');
  });

  it('guides a strict, distinct A/B comparison to opinion writing', () => {
    const mission = MISSIONS['bookmaru-library'];
    const city = CITIES.mulbit;
    const firstPlacement = { slotId: 'library-1', facilityKind: 'library' as const, candidateId: 'mulbit-b2' };
    const secondPlacement = { ...firstPlacement, candidateId: 'mulbit-c3' };
    const firstAnalysis = analyzePlacement(city, mission, [firstPlacement]);
    const secondAnalysis = analyzePlacement(city, mission, [secondPlacement]);
    const firstEvidence: LearningEvidence = { reviewedLayerIds: ['population', 'roads'], inspectedMetricIds: ['average', 'maximum'], selectedUnderservedZoneIds: ['z1'], comparedProposalIds: [] };
    const secondEvidence: LearningEvidence = { ...firstEvidence, comparedProposalIds: ['proposal-a', 'proposal-b'] };
    const first = createProposalSnapshot('A안', [firstPlacement], firstAnalysis, assessProposal(mission, 'access-equity', firstAnalysis, firstEvidence));
    const second = createProposalSnapshot('B안', [secondPlacement], secondAnalysis, assessProposal(mission, 'access-equity', secondAnalysis, secondEvidence));
    expect(getGuidedAction(stateWith({
      stage: 'resident-view', placements: [secondPlacement], analysis: secondAnalysis,
      evidence: { reviewedLayerIds: ['population', 'roads'], inspectedMetricIds: ['average', 'maximum'], selectedUnderservedZoneIds: ['mulbit-north'], comparedProposalIds: ['proposal-a', 'proposal-b'] },
      proposals: [first, second],
    }))).toBe('write-opinion');
  });

  it('returns null for unknown, malformed, stale, and completed states', () => {
    expect(getGuidedAction(null as never)).toBeNull();
    expect(getGuidedAction({ stage: 'data-room', evidence: null } as never)).toBeNull();
    expect(getGuidedAction(stateWith({ stage: 'intake' }))).toBeNull();
  });

  it('does not execute a state getter while rejecting accessor-shaped state', () => {
    const state = createInitialSession() as unknown as Record<string, unknown>;
    let reads = 0;
    Object.defineProperty(state, 'stage', { enumerable: true, get: () => { reads += 1; return 'data-room'; } });
    expect(getGuidedAction(state as unknown as SessionState)).toBeNull();
    expect(reads).toBe(0);
  });
});
