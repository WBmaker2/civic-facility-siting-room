import { describe, expect, it } from 'vitest';
import type { SessionState } from '../domain/types';
import { createInitialSession } from '../state/sessionReducer';
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

  it('returns null for unknown, malformed, stale, and completed states', () => {
    expect(getGuidedAction(null as never)).toBeNull();
    expect(getGuidedAction({ stage: 'data-room', evidence: null } as never)).toBeNull();
    expect(getGuidedAction(stateWith({ stage: 'intake' }))).toBeNull();
  });
});
