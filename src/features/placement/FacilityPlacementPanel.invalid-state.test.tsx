import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { CITIES } from '../../domain/cities';
import type { FacilityPlacement, SessionState } from '../../domain/types';
import { createInitialSession, sessionReducer } from '../../state/sessionReducer';
import { useSession } from '../../state/SessionProvider';
import type { SessionDispatch } from '../../state/sessionTypes';
import { FacilityPlacementPanel } from './FacilityPlacementPanel';

vi.mock('../../state/SessionProvider', () => ({ useSession: vi.fn() }));

const mockedUseSession = vi.mocked(useSession);

const baseState = (): SessionState => sessionReducer(createInitialSession(), { type: 'select-mission', missionId: 'bookmaru-library' });

describe('FacilityPlacementPanel malformed state', () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('fails closed without buttons, -Infinity, or a thrown render for damaged placements', () => {
    const accessor = {} as { slotId: string; facilityKind: string; candidateId: string };
    Object.defineProperties(accessor, {
      slotId: { get: () => { throw new Error('accessor should not be read'); } },
      facilityKind: { value: 'library' },
      candidateId: { value: CITIES.mulbit.candidates[0]!.id },
    });
    const malformedPlacements = [
      [null],
      [7],
      [accessor],
      [{ slotId: 'library-1', facilityKind: 'library', candidateId: 'not-a-candidate' }],
    ] as unknown as FacilityPlacement[][];

    for (const placements of malformedPlacements) {
      const state = { ...baseState(), placements };
      mockedUseSession.mockReturnValue({ state, dispatch: vi.fn() as unknown as SessionDispatch });
      expect(() => render(<FacilityPlacementPanel />)).not.toThrow();
      expect(screen.getByRole('alert')).toHaveTextContent(/올바르지 않아/);
      expect(screen.queryByText(/-Infinity/)).not.toBeInTheDocument();
      expect(screen.queryAllByRole('button')).toHaveLength(0);
      cleanup();
    }
  });
});
