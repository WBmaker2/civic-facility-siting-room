import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createInitialSession } from '../../state/sessionReducer';
import type { SessionState } from '../../state/sessionTypes';

const sessionHarness = vi.hoisted(() => ({
  state: undefined as SessionState | undefined,
  dispatch: vi.fn(),
}));

vi.mock('../../state/SessionProvider', () => ({
  useSession: () => ({ state: sessionHarness.state!, dispatch: sessionHarness.dispatch }),
}));

import { ReviewIntake } from './ReviewIntake';

const inheritedIds = ['__proto__', 'constructor', 'toString', 'unknown'];

describe('ReviewIntake invalid registry state', () => {
  beforeEach(() => {
    sessionHarness.dispatch.mockClear();
  });
  afterEach(() => cleanup());

  it.each(inheritedIds)('does not render a selected summary for malformed mission id %s', (identifier) => {
    sessionHarness.state = {
      ...createInitialSession(),
      missionId: identifier as SessionState['missionId'],
      cityId: 'mulbit',
      priorityId: 'cost',
    };
    render(<ReviewIntake />);

    const button = screen.getByRole('button', { name: '도시 자료실로 이동' });
    expect(button).toBeDisabled();
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.queryByRole('complementary', { name: '선택한 미션 요약' })).not.toBeInTheDocument();
    expect(screen.queryByText(/undefined.*도시/)).not.toBeInTheDocument();
    fireEvent.click(button);
    expect(sessionHarness.dispatch).not.toHaveBeenCalled();
  });

  it.each(inheritedIds)('does not render a selected summary for malformed city id %s', (identifier) => {
    sessionHarness.state = {
      ...createInitialSession(),
      missionId: 'bookmaru-library',
      cityId: identifier as SessionState['cityId'],
      priorityId: 'cost',
    };
    render(<ReviewIntake />);

    const button = screen.getByRole('button', { name: '도시 자료실로 이동' });
    expect(button).toBeDisabled();
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.queryByRole('complementary', { name: '선택한 미션 요약' })).not.toBeInTheDocument();
    expect(screen.queryByText(/undefined.*도시/)).not.toBeInTheDocument();
    fireEvent.click(button);
    expect(sessionHarness.dispatch).not.toHaveBeenCalled();
  });
});
