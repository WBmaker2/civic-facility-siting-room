import { describe, expect, it, vi } from 'vitest';
import type { LearningEvidence, SessionState } from '../domain/types';
import { analyzePlacement } from '../engine/analyzePlacement';
import { assessProposal } from '../engine/assessProposal';
import { createProposalSnapshot } from '../engine/proposalComparison';
import { validateOpinion } from '../features/opinion/validateOpinion';
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

const comparisonFixture = () => {
  const mission = MISSIONS['bookmaru-library'];
  const city = CITIES.mulbit;
  const firstPlacement = { slotId: 'library-1', facilityKind: 'library' as const, candidateId: 'mulbit-b2' };
  const secondPlacement = { ...firstPlacement, candidateId: 'mulbit-c3' };
  const firstAnalysis = analyzePlacement(city, mission, [firstPlacement]);
  const secondAnalysis = analyzePlacement(city, mission, [secondPlacement]);
  const firstEvidence: LearningEvidence = { reviewedLayerIds: ['population', 'roads'], inspectedMetricIds: ['average', 'maximum'], selectedUnderservedZoneIds: [firstAnalysis.nearestFacilityAccess.zoneTravel[0]!.zoneId], comparedProposalIds: [] };
  const secondEvidence: LearningEvidence = { ...firstEvidence, selectedUnderservedZoneIds: [secondAnalysis.nearestFacilityAccess.zoneTravel[0]!.zoneId], comparedProposalIds: ['proposal-a', 'proposal-b'] };
  const first = createProposalSnapshot('A안', [firstPlacement], firstAnalysis, assessProposal(mission, 'access-equity', firstAnalysis, firstEvidence));
  const second = createProposalSnapshot('B안', [secondPlacement], secondAnalysis, assessProposal(mission, 'access-equity', secondAnalysis, secondEvidence));
  const state = stateWith({ stage: 'opinion', placements: [secondPlacement], analysis: secondAnalysis, evidence: { reviewedLayerIds: ['population', 'roads'], inspectedMetricIds: ['average', 'maximum'], selectedUnderservedZoneIds: [secondAnalysis.nearestFacilityAccess.zoneTravel[0]!.zoneId], comparedProposalIds: ['proposal-a', 'proposal-b'] }, proposals: [first, second] });
  return { state, first, second, firstPlacement, secondPlacement, secondAnalysis };
};

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
    const fixture = comparisonFixture();
    expect(getGuidedAction({ ...fixture.state, stage: 'resident-view' })).toBe('write-opinion');
  });

  it.each([
    ['reviewedLayerIds', { reviewedLayerIds: ['population', 'population'] }],
    ['inspectedMetricIds', { inspectedMetricIds: ['average', 'average'] }],
    ['selectedUnderservedZoneIds', { selectedUnderservedZoneIds: ['mulbit-north', 'mulbit-north'] }],
    ['comparedProposalIds', { comparedProposalIds: ['proposal-a', 'proposal-a'] }],
  ])('rejects duplicate %s evidence', (_name, evidencePatch) => {
    const fixture = comparisonFixture();
    expect(getGuidedAction({ ...fixture.state, evidence: { ...fixture.state.evidence, ...evidencePatch } } as SessionState)).toBeNull();
  });

  it('rejects forged semantic comparisons, order, labels, IDs, and inherited registry values', () => {
    const fixture = comparisonFixture();
    const forgedAssessment = { ...fixture.first.assessment, missingEvidence: [...fixture.first.assessment.missingEvidence, '위조'] };
    const cases = [
      { proposals: [{ ...fixture.first, assessment: forgedAssessment }, fixture.second] },
      { proposals: [{ ...fixture.first, placements: fixture.second.placements }, fixture.second] },
      { proposals: [fixture.second, fixture.first] },
      { proposals: [{ ...fixture.first, id: 'proposal-b' }, fixture.second] },
      { proposals: [{ ...fixture.first, label: 'B안' }, fixture.second] },
      { cityId: '__proto__' },
      { missionId: '__proto__' },
    ];
    for (const patch of cases) expect(getGuidedAction({ ...fixture.state, ...patch } as SessionState)).toBeNull();
  });

  it('rejects sparse, custom, non-enumerable, symbol, extra, and nested accessor state without getters', () => {
    const base = stateWith({ stage: 'data-room' });
    const sparse = ['population', 'roads'] as string[];
    delete sparse[1];
    const custom = Object.assign(Object.create({ extra: true }), ['population', 'roads']);
    const hidden = ['population', 'roads'];
    Object.defineProperty(hidden, '1', { value: 'roads', enumerable: false });
    const nested = { ...base.evidence } as Record<string, unknown>;
    const getter = vi.fn(() => ['population', 'roads']);
    Object.defineProperty(nested, 'reviewedLayerIds', { enumerable: true, get: getter });
    const cases = [
      { evidence: { ...base.evidence, reviewedLayerIds: sparse } },
      { evidence: { ...base.evidence, reviewedLayerIds: custom } },
      { evidence: { ...base.evidence, reviewedLayerIds: hidden } },
      { evidence: nested },
      Object.assign({ ...base }, { extra: true }),
      Object.assign({ ...base }, { [Symbol('extra')]: true }),
    ];
    for (const candidate of cases) expect(getGuidedAction(candidate as SessionState)).toBeNull();
    expect(getGuidedAction(Object.defineProperty({ ...base }, 'stage', { enumerable: true, get: getter }) as SessionState)).toBeNull();
    expect(getter).toHaveBeenCalledTimes(0);
  });

  it('returns null for completed opinion while incomplete opinion remains guided', () => {
    const fixture = comparisonFixture();
    const zoneId = fixture.first.analysis.nearestFacilityAccess.zoneTravel[0]!.zoneId;
    const draft = { priorityId: 'access-equity' as const, selectedProposalId: 'proposal-a', evidenceMetricIds: ['average', 'maximum', 'risk'] as Array<'average' | 'maximum' | 'risk'>, underservedZoneId: zoneId, rationale: '여러 구역의 이동 부담을 함께 살폈습니다.', counterargument: '다른 구역의 이동이 길어질 수 있습니다.', mitigation: '안내와 보완 시설을 함께 살핍니다.' };
    expect(validateOpinion(draft, [fixture.first, fixture.second]).complete).toBe(true);
    expect(getGuidedAction(fixture.state)).toBe('write-opinion');
    expect(getGuidedAction({ ...fixture.state, opinion: draft })).toBeNull();
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
