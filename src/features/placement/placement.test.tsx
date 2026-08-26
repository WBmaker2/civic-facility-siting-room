import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useEffect } from 'react';
import { CITIES } from '../../domain/cities';
import { MISSIONS } from '../../domain/missions';
import type { FacilityPlacement, FacilityKind } from '../../domain/types';
import { SessionProvider, useSession } from '../../state/SessionProvider';
import { FacilityPlacementPanel, getRemainingBudget, type PlacementSlotView } from './FacilityPlacementPanel';

afterEach(cleanup);

function SeedPlacement({ missionId }: { missionId: 'bookmaru-library' | 'combined-review' }) {
  const { dispatch } = useSession();
  useEffect(() => {
    dispatch({ type: 'select-mission', missionId });
    dispatch({ type: 'select-priority', priorityId: 'access-equity' });
    dispatch({ type: 'toggle-layer', layerId: 'population' });
    dispatch({ type: 'toggle-layer', layerId: 'roads' });
    dispatch({ type: 'go-to-stage', stage: 'data-room' });
    dispatch({ type: 'go-to-stage', stage: 'placement' });
  }, [dispatch, missionId]);
  return null;
}

function renderPlacement(missionId: 'bookmaru-library' | 'combined-review') {
  return render(
    <SessionProvider>
      <SeedPlacement missionId={missionId} />
      <FacilityPlacementPanel />
    </SessionProvider>,
  );
}

describe('FacilityPlacementPanel', () => {
  it('places a facility through candidate selection and a named button', async () => {
    const user = userEvent.setup();
    renderPlacement('bookmaru-library');
    const candidate = await screen.findByRole('radio', { name: /느린 강변 터.*B2/ });
    await user.click(candidate);
    await user.click(screen.getByRole('button', { name: '시설 배치' }));
    expect(await screen.findByText('책마루 도서관 배치: B2')).toBeInTheDocument();
  });

  it('never requires dragging', async () => {
    const { container } = renderPlacement('bookmaru-library');
    await screen.findByRole('radio', { name: /느린 강변 터.*B2/ });
    expect(container.querySelector('[draggable="true"]')).toBeNull();
  });

  it('exports remaining budget from candidate costs', async () => {
    renderPlacement('combined-review');
    expect(await screen.findByText('남은 예산 토큰 4')).toBeInTheDocument();
    const mission = MISSIONS['combined-review'];
    const city = CITIES.maru;
    const library: FacilityPlacement = { slotId: 'library-1', facilityKind: 'library', candidateId: 'maru-d3' };
    const health: FacilityPlacement = { slotId: 'health-support-1', facilityKind: 'health-support', candidateId: 'maru-a5-slope' };
    expect(getRemainingBudget(mission, city, [])).toBe(4);
    expect(getRemainingBudget(mission, city, [library])).toBe(2);
    expect(getRemainingBudget(mission, city, [library, health])).toBe(0);
    expect(getRemainingBudget(mission, city, [{ ...health, candidateId: 'maru-e3' }])).toBe(3);
    expect(getRemainingBudget(mission, city, [{ ...library, candidateId: 'not-a-candidate' }])).toBe(Number.NEGATIVE_INFINITY);
    const slot: PlacementSlotView = { slotId: 'library-1', facilityKind: 'library' as FacilityKind, candidateId: null };
    expect(slot.facilityKind).toBe('library');
  });

  it('shows two named slots and keeps their candidates distinct', async () => {
    const user = userEvent.setup();
    renderPlacement('combined-review');
    expect(await screen.findByText('도서관 1곳')).toBeInTheDocument();
    expect(screen.getByText('건강 도움소 1곳')).toBeInTheDocument();
    await user.click(screen.getByRole('radio', { name: /솔마루 터.*B2/ }));
    await user.click(screen.getAllByRole('button', { name: '시설 배치' })[0]!);
    expect(await screen.findByText('도서관 배치: B2')).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: /솔마루 터.*B2/ })).toBeDisabled();
    await user.click(screen.getByRole('radio', { name: /동쪽 열린 터.*E3/ }));
    await user.click(screen.getAllByRole('button', { name: '시설 배치' })[1]!);
    expect(await screen.findByText('건강 도움소 배치: E3')).toBeInTheDocument();
    expect(screen.getByText('남은 예산 토큰 2')).toBeInTheDocument();
  });

  it('explains and prevents a used or over-budget candidate', async () => {
    const user = userEvent.setup();
    renderPlacement('combined-review');
    await screen.findByRole('radio', { name: /솔마루 터.*B2/ });
    await user.click(screen.getByRole('radio', { name: /솔마루 터.*B2/ }));
    await user.click(screen.getAllByRole('button', { name: '시설 배치' })[0]!);
    expect(screen.getAllByRole('button', { name: '시설 배치' })[1]).toBeDisabled();
    expect(screen.getByText(/다른 시설 슬롯에서 이미 사용 중/)).toBeInTheDocument();
  });

  it('prevents an over-budget replacement and explains the reason', async () => {
    const user = userEvent.setup();
    renderPlacement('combined-review');
    await screen.findByRole('radio', { name: /마루 중앙 터.*D3/ });
    await user.click(screen.getByRole('radio', { name: /마루 중앙 터.*D3/ }));
    await user.click(screen.getAllByRole('button', { name: '시설 배치' })[0]!);
    await user.click(screen.getByRole('radio', { name: /새길 쉼터 터.*C2/ }));
    await user.click(screen.getAllByRole('button', { name: '시설 배치' })[1]!);
    await user.click(screen.getByRole('radio', { name: /넓은 동쪽 터.*E1/ }));
    expect(screen.getAllByRole('button', { name: '시설 배치' })[1]).toBeDisabled();
    expect(screen.getByText(/예산을 .*토큰 초과/)).toBeInTheDocument();
  });

  it('supports selecting a radio and placing with keyboard only', async () => {
    const user = userEvent.setup();
    renderPlacement('bookmaru-library');
    const radio = await screen.findByRole('radio', { name: /느린 강변 터.*B2/ });
    radio.focus();
    await user.keyboard(' ');
    const place = screen.getByRole('button', { name: '시설 배치' });
    place.focus();
    await user.keyboard('{Enter}');
    expect(await screen.findByText('책마루 도서관 배치: B2')).toBeInTheDocument();
  });
});
