import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useEffect } from 'react';
import { CITIES } from '../../domain/cities';
import { MISSIONS } from '../../domain/missions';
import type { FacilityPlacement } from '../../domain/types';
import { buildPlacementSlots, getRemainingBudget, validatePlacements, type PlacementSlotView } from '../../domain/placementRules';
import { SessionProvider, useSession } from '../../state/SessionProvider';
import { FacilityPlacementPanel } from './FacilityPlacementPanel';

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
    const slot: PlacementSlotView = { slotId: 'library-1', facilityKind: 'library', candidateId: null };
    expect(slot.facilityKind).toBe('library');
  });

  it('fails closed for invalid placement rules and does not mutate source data', () => {
    const mission = MISSIONS['combined-review'];
    const city = CITIES.maru;
    const valid: FacilityPlacement[] = [
      { slotId: 'library-1', facilityKind: 'library', candidateId: 'maru-d3' },
      { slotId: 'health-support-1', facilityKind: 'health-support', candidateId: 'maru-a5-slope' },
    ];
    const before = JSON.parse(JSON.stringify(valid));
    expect(validatePlacements(mission, city, valid)).toBe(true);
    expect(getRemainingBudget(mission, city, valid)).toBe(0);
    expect(buildPlacementSlots(mission)).toEqual([
      { slotId: 'library-1', facilityKind: 'library', candidateId: null },
      { slotId: 'health-support-1', facilityKind: 'health-support', candidateId: null },
    ]);
    const invalidCases = [
      { mission, city: CITIES.mulbit, placements: [] },
      { mission, city, placements: [{ ...valid[0]!, slotId: 'culture-center-1' }] },
      { mission, city, placements: [{ ...valid[0]!, facilityKind: 'health-support' }] },
      { mission, city, placements: [valid[0], { ...valid[1]!, slotId: 'library-1' }] },
      { mission, city, placements: [valid[0], { ...valid[1]!, candidateId: 'maru-d3' }] },
      { mission, city, placements: [...valid, { slotId: 'library-2', facilityKind: 'library', candidateId: 'maru-e3' }] },
      { mission, city, placements: [{ ...valid[0]!, candidateId: 'not-a-candidate' }] },
      { mission, city, placements: [null] },
    ] as Array<{ mission: typeof mission; city: typeof city; placements: readonly FacilityPlacement[] }>;
    for (const input of invalidCases) expect(getRemainingBudget(input.mission, input.city, input.placements)).toBe(Number.NEGATIVE_INFINITY);
    expect(valid).toEqual(before);
  });

  it('shows two named slots and keeps their candidates distinct', async () => {
    const user = userEvent.setup();
    renderPlacement('combined-review');
    expect(await screen.findByText('도서관 1곳')).toBeInTheDocument();
    expect(screen.getByText('건강 도움소 1곳')).toBeInTheDocument();
    await user.click(screen.getByRole('radio', { name: /솔마루 터.*B2/ }));
    await user.click(screen.getByRole('button', { name: '도서관 1곳 시설 배치' }));
    expect(await screen.findByText('도서관 배치: B2')).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: /솔마루 터.*B2/ })).toBeDisabled();
    await user.click(screen.getByRole('radio', { name: /동쪽 열린 터.*E3/ }));
    await user.click(screen.getByRole('button', { name: '건강 도움소 1곳 시설 배치' }));
    expect(await screen.findByText('건강 도움소 배치: E3')).toBeInTheDocument();
    expect(screen.getByText('남은 예산 토큰 2')).toBeInTheDocument();
  });

  it('explains and prevents a used or over-budget candidate', async () => {
    const user = userEvent.setup();
    renderPlacement('combined-review');
    await screen.findByRole('radio', { name: /솔마루 터.*B2/ });
    await user.click(screen.getByRole('radio', { name: /솔마루 터.*B2/ }));
    await user.click(screen.getByRole('button', { name: '도서관 1곳 시설 배치' }));
    expect(screen.getByRole('button', { name: '건강 도움소 1곳 시설 배치' })).toBeDisabled();
    expect(screen.getByText(/다른 시설 슬롯에서 이미 사용 중/)).toBeInTheDocument();
  });

  it('prevents an over-budget replacement and explains the reason', async () => {
    const user = userEvent.setup();
    renderPlacement('combined-review');
    await screen.findByRole('radio', { name: /마루 중앙 터.*D3/ });
    await user.click(screen.getByRole('radio', { name: /마루 중앙 터.*D3/ }));
    await user.click(screen.getByRole('button', { name: '도서관 1곳 시설 배치' }));
    await user.click(screen.getByRole('radio', { name: /새길 쉼터 터.*C2/ }));
    await user.click(screen.getByRole('button', { name: '건강 도움소 1곳 시설 배치' }));
    await user.click(screen.getByRole('radio', { name: /넓은 동쪽 터.*E1/ }));
    expect(screen.getByRole('button', { name: '건강 도움소 1곳 시설 배치' })).toBeDisabled();
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

  it('keeps all placement buttons disabled until a candidate is selected', async () => {
    renderPlacement('combined-review');
    await screen.findByText('건강 도움소 1곳');
    screen.getAllByRole('button', { name: /시설 배치/ }).forEach((button) => expect(button).toBeDisabled());
  });

  it('exposes every fixture candidate with coordinate, cost, risk, and road summary', async () => {
    renderPlacement('bookmaru-library');
    await screen.findByRole('radio', { name: /느린 강변 터.*B2/ });
    const city = CITIES.mulbit;
    for (const candidate of city.candidates) {
      const radio = screen.getByRole('radio', { name: new RegExp(`${candidate.name}.*${candidate.coordinate.label}`) });
      expect(radio).toHaveAccessibleDescription(expect.stringContaining(`비용 ${candidate.costTokens}토큰`));
    }
    expect(screen.getByText(/물 고임 관찰 터.*A4/)).toBeInTheDocument();
    expect(screen.getByText(/위험 표지: 비가 오면 물이 고일 수 있는 표지/)).toBeInTheDocument();
    expect(screen.getByText(/연결 도로 없음/)).toBeInTheDocument();
  });

  it('replaces the current slot and refreshes its budget and coordinate text', async () => {
    const user = userEvent.setup();
    renderPlacement('bookmaru-library');
    await screen.findByRole('radio', { name: /가운데 광장 터.*C3/ });
    await user.click(screen.getByRole('radio', { name: /가운데 광장 터.*C3/ }));
    await user.click(screen.getByRole('button', { name: '시설 배치' }));
    expect(screen.getByText('남은 예산 토큰 1')).toBeInTheDocument();
    await user.click(screen.getByRole('radio', { name: /느린 강변 터.*B2/ }));
    await user.click(screen.getByRole('button', { name: '시설 배치' }));
    expect(screen.getByText('책마루 도서관 배치: B2')).toBeInTheDocument();
    expect(screen.getByText('남은 예산 토큰 2')).toBeInTheDocument();
  });
});
