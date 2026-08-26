import { cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useEffect } from 'react';
// @ts-expect-error Vite resolves CSS imports in the test runtime.
import '../../styles/global.css';
// @ts-expect-error Vite resolves CSS imports in the test runtime.
import '../../styles/responsive.css';
import { App } from '../../app/App';
import { CityDataRoom } from './CityDataRoom';
import { CityDataTable } from './CityDataTable';
import { GridMap } from './GridMap';
import { MARU_CITY } from '../../domain/cities/maruCity';
import { MULBIT_CITY } from '../../domain/cities/mulbitCity';
import type { DataLayerId } from '../../domain/types';
import { SessionProvider, useSession } from '../../state/SessionProvider';

async function renderSessionAtDataRoom() {
  const user = userEvent.setup();
  render(<App />);
  await user.selectOptions(screen.getByRole('combobox', { name: '미션 선택' }), 'bookmaru-library');
  await user.click(screen.getByRole('radio', { name: /접근성/ }));
  await user.click(screen.getByRole('button', { name: '도시 자료실로 이동' }));
  return user;
}

describe('CityDataRoom', () => {
  afterEach(() => cleanup());

  it('uses table only for the exact query mode and keeps unknown mode on map without storage', async () => {
    const getItem = vi.spyOn(Storage.prototype, 'getItem');
    const setItem = vi.spyOn(Storage.prototype, 'setItem');
    for (const [query, expected] of [['?view=table', 'table'], ['?view=map', 'map'], ['?view=unknown', 'map']] as const) {
      cleanup();
      window.history.replaceState({}, '', `/${query}`);
      await renderSessionAtDataRoom();
      if (expected === 'table') {
        expect(screen.getByRole('tabpanel', { name: '표 보기' })).toBeInTheDocument();
        expect(screen.queryByRole('grid')).not.toBeInTheDocument();
      } else {
        expect(screen.getByRole('tabpanel', { name: '지도 보기' })).toBeInTheDocument();
        expect(screen.getByRole('grid')).toBeInTheDocument();
      }
    }
    expect(getItem).not.toHaveBeenCalled();
    expect(setItem).not.toHaveBeenCalled();
    window.history.replaceState({}, '', '/');
  });

  it('requires two reviewed layers before data confirmation', async () => {
    const user = await renderSessionAtDataRoom();
    const confirm = screen.getByRole('button', { name: '자료층 확인' });
    expect(confirm).toBeDisabled();

    await user.click(screen.getByRole('checkbox', { name: /인구/ }));
    await user.click(screen.getByRole('checkbox', { name: /도로·이동 단위/ }));
    expect(confirm).toBeEnabled();
    expect(screen.getByRole('status')).toHaveTextContent('5개 중 2개 확인');
  });

  it('keeps reviewed evidence after a layer is unchecked and exposes legend meaning', async () => {
    const user = await renderSessionAtDataRoom();
    const population = screen.getByRole('checkbox', { name: /인구/ });
    const roads = screen.getByRole('checkbox', { name: /도로·이동 단위/ });

    await user.click(population);
    await user.click(roads);
    expect(screen.getByText(/인구가 분포한 구역/)).toBeInTheDocument();
    await user.click(population);

    expect(population).not.toBeChecked();
    expect(screen.getByRole('status')).toHaveTextContent('5개 중 2개 확인');
    expect(screen.getByText(/사람 토큰/)).toBeInTheDocument();
    expect(screen.getByText(/연결선/)).toBeInTheDocument();
  });

  it('exposes all five exact checkbox names and retains reviewed evidence after every toggle', async () => {
    const user = await renderSessionAtDataRoom();
    const labels = ['인구', '도로·이동 단위', '가상 위험 표지', '후보지 비용', '기존 시설'];
    const checkboxes = labels.map((label) => screen.getByRole('checkbox', { name: label }));
    checkboxes.forEach((checkbox) => expect(checkbox).not.toBeChecked());

    for (const checkbox of checkboxes) {
      await user.click(checkbox);
      expect(checkbox).toBeChecked();
    }
    expect(screen.getByRole('status')).toHaveTextContent('5개 중 5개 확인');
    expect(screen.getByRole('button', { name: '자료층 확인' })).toBeEnabled();
    expect(document.querySelectorAll('[data-layer-id]')).toHaveLength(5);

    for (const checkbox of checkboxes) {
      await user.click(checkbox);
      expect(checkbox).not.toBeChecked();
    }
    expect(screen.getByRole('status')).toHaveTextContent('5개 중 5개 확인');
    expect(screen.getByRole('button', { name: '자료층 확인' })).toBeEnabled();
    expect(document.querySelectorAll('[data-layer-id]')).toHaveLength(0);
  });

  it('moves the actual stage region after confirming two layers', async () => {
    const user = await renderSessionAtDataRoom();
    await user.click(screen.getByRole('checkbox', { name: /인구/ }));
    await user.click(screen.getByRole('checkbox', { name: /도로·이동 단위/ }));
    await user.click(screen.getByRole('button', { name: '자료층 확인' }));

    expect(screen.getByRole('region', { name: '후보 배치판' })).toHaveAttribute('data-stage-id', 'placement');
    expect(screen.queryByRole('region', { name: '도시 자료실' })).not.toBeInTheDocument();
  });

  it('fails closed when rendered in the initial SessionProvider without intake context', async () => {
    const user = userEvent.setup();
    render(<SessionProvider><CityDataRoom /></SessionProvider>);

    const confirm = screen.getByRole('button', { name: '자료층 확인' });
    expect(confirm).toBeDisabled();
    expect(screen.getByRole('alert')).toHaveTextContent(/미션.*배정 도시.*우선순위/);
    expect(screen.getByRole('button', { name: '심의 접수로 돌아가기' })).toBeInTheDocument();

    await user.click(screen.getByRole('checkbox', { name: '인구' }));
    await user.click(screen.getByRole('checkbox', { name: '도로·이동 단위' }));
    expect(confirm).toBeDisabled();
  });

  it('fails closed for inherited mission identifiers without showing an undefined city', async () => {
    function InvalidContextHarness() {
      const { dispatch } = useSession();
      useEffect(() => {
        dispatch({ type: 'select-mission', missionId: '__proto__' as 'bookmaru-library' });
      }, [dispatch]);
      return <CityDataRoom />;
    }

    render(<SessionProvider><InvalidContextHarness /></SessionProvider>);
    await waitFor(() => expect(screen.getByRole('alert')).toBeInTheDocument());
    expect(screen.getByRole('button', { name: '자료층 확인' })).toBeDisabled();
    expect(screen.getByRole('alert')).toHaveTextContent(/미션.*배정 도시.*우선순위/);
    expect(screen.queryByText(/undefined의 가상 자료/)).not.toBeInTheDocument();
  });

  it('provides a labeled keyboard grid with a single active descendant', async () => {
    const user = await renderSessionAtDataRoom();
    const grid = screen.getByRole('grid', { name: /물빛시.*격자/ });

    expect(grid).toHaveAttribute('tabindex', '0');
    expect(grid).toHaveAttribute('aria-activedescendant', 'mulbit-cell-a1');
    expect(screen.getByText('현재 좌표: A1')).toBeInTheDocument();
    expect(grid.querySelectorAll('[tabindex="0"]')).toHaveLength(0);

    grid.focus();
    await user.keyboard('{ArrowRight}{ArrowDown}');
    expect(document.activeElement).toBe(grid);
    expect(screen.getByText('현재 좌표: B2')).toBeInTheDocument();
    expect(grid).toHaveAttribute('aria-activedescendant', 'mulbit-cell-b2');
  });

  it('clamps grid movement and supports Home and End within the current row', async () => {
    const user = await renderSessionAtDataRoom();
    const grid = screen.getByRole('grid', { name: /물빛시.*격자/ });
    grid.focus();

    await user.keyboard('{ArrowLeft}{ArrowUp}{End}');
    expect(grid).toHaveAttribute('aria-activedescendant', 'mulbit-cell-e1');
    await user.keyboard('{Home}');
    expect(grid).toHaveAttribute('aria-activedescendant', 'mulbit-cell-a1');
  });

  it('selects a candidate with Enter or Space while focus remains on the grid', async () => {
    const user = await renderSessionAtDataRoom();
    const grid = screen.getByRole('grid', { name: /물빛시.*격자/ });
    grid.focus();
    await user.keyboard('{ArrowRight}{ArrowDown}{Enter}');
    expect(screen.getByText('현재 선택 좌표: B2')).toBeInTheDocument();
    expect(document.activeElement).toBe(grid);

    await user.keyboard('{Space}');
    expect(document.activeElement).toBe(grid);
    expect(grid).toHaveAttribute('aria-activedescendant', 'mulbit-cell-b2');
  });

  it('exposes equivalent table data and candidate radio selection', async () => {
    const user = await renderSessionAtDataRoom();
    await user.click(screen.getByRole('tab', { name: '표 보기' }));

    const table = screen.getByRole('table', { name: /물빛시.*도시 자료/ });
    expect(table.querySelector('caption')).toHaveTextContent(/물빛시/);
    expect(table).toHaveTextContent('A1');
    expect(table).toHaveTextContent('햇살 북쪽 구역');
    expect(table).toHaveTextContent('사람 토큰 5');
    expect(table).toHaveTextContent('도로 연결');
    expect(table).toHaveTextContent('기존 보장 시설 없음');
    expect(table).toHaveTextContent('후보지 없음');

    const candidate = screen.getByRole('radio', { name: /느린 강변 터.*비용 1/ });
    await user.click(candidate);
    expect(candidate).toBeChecked();
    expect(screen.getByText('현재 선택 좌표: B2')).toBeInTheDocument();
  });

  it('uses text, icon, and pattern encoding for a risk cell', async () => {
    const user = await renderSessionAtDataRoom();
    await user.click(screen.getByRole('checkbox', { name: '가상 위험 표지' }));

    const riskCell = screen.getByRole('gridcell', { name: /A4.*빗물 고임/ });
    expect(riskCell).toHaveAttribute('data-pattern', 'waves');
    expect(riskCell).toHaveTextContent('≋');
    expect(riskCell.querySelector('[data-pattern="waves"]')).toBeInTheDocument();
  });

  it('renders only the selected view panel while tabs remain switchable', async () => {
    const user = await renderSessionAtDataRoom();
    expect(screen.getByRole('tabpanel', { name: '지도 보기' })).toBeInTheDocument();
    expect(screen.queryByRole('tabpanel', { name: '표 보기' })).not.toBeInTheDocument();

    await user.click(screen.getByRole('tab', { name: '표 보기' }));
    expect(screen.queryByRole('tabpanel', { name: '지도 보기' })).not.toBeInTheDocument();
    expect(screen.getByRole('tabpanel', { name: '표 보기' })).toBeInTheDocument();
  });

  it('moves and activates tabs with Arrow/Home/End while keeping controls fresh', async () => {
    const user = await renderSessionAtDataRoom();
    const mapTab = screen.getByRole('tab', { name: '지도 보기' });
    const tableTab = screen.getByRole('tab', { name: '표 보기' });
    mapTab.focus();
    await user.keyboard('{ArrowRight}');

    expect(document.activeElement).toBe(tableTab);
    expect(tableTab).toHaveAttribute('aria-selected', 'true');
    expect(tableTab).toHaveAttribute('aria-controls', 'table-panel');
    expect(mapTab).not.toHaveAttribute('aria-controls');
    expect(document.getElementById(tableTab.getAttribute('aria-controls') ?? '')).toBeInTheDocument();
    expect(document.getElementById('map-panel')).not.toBeInTheDocument();

    await user.keyboard('{Home}');
    expect(document.activeElement).toBe(mapTab);
    expect(mapTab).toHaveAttribute('aria-selected', 'true');
    expect(mapTab).toHaveAttribute('aria-controls', 'map-panel');
    expect(tableTab).not.toHaveAttribute('aria-controls');
    expect(document.getElementById('map-panel')).toBeInTheDocument();
    expect(document.getElementById('table-panel')).not.toBeInTheDocument();

    await user.keyboard('{End}');
    expect(document.activeElement).toBe(tableTab);
    expect(tableTab).toHaveAttribute('aria-selected', 'true');
  });

  it('keeps tab activation on the focused tab for all direction keys', async () => {
    const user = await renderSessionAtDataRoom();
    const mapTab = screen.getByRole('tab', { name: '지도 보기' });
    const tableTab = screen.getByRole('tab', { name: '표 보기' });
    mapTab.focus();
    await user.keyboard('{ArrowDown}');
    expect(document.activeElement).toBe(tableTab);
    await user.keyboard('{ArrowUp}');
    expect(document.activeElement).toBe(mapTab);
    expect(mapTab).toHaveAttribute('tabindex', '0');
    expect(tableTab).toHaveAttribute('tabindex', '-1');
  });
});

const ALL_LAYERS: DataLayerId[] = ['population', 'roads', 'risk', 'cost', 'existing-facilities'];

describe('GridMap and CityDataTable contracts', () => {
  afterEach(() => cleanup());

  it('dispatches B2 Enter and Space once each, but ignores empty and unrelated keys', () => {
    const onSelect = vi.fn();
    render(<GridMap city={MULBIT_CITY} activeLayerIds={ALL_LAYERS} selectedCandidateId={null} onSelectCandidate={onSelect} />);
    const grid = screen.getByRole('grid');
    grid.focus();
    fireEvent.keyDown(grid, { key: 'ArrowRight' });
    fireEvent.keyDown(grid, { key: 'ArrowDown' });
    const enter = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true });
    grid.dispatchEvent(enter);
    expect(enter.defaultPrevented).toBe(true);
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenLastCalledWith('mulbit-b2');
    const space = new KeyboardEvent('keydown', { key: ' ', bubbles: true, cancelable: true });
    grid.dispatchEvent(space);
    expect(space.defaultPrevented).toBe(true);
    expect(onSelect).toHaveBeenCalledTimes(2);

    fireEvent.keyDown(grid, { key: 'ArrowLeft' });
    const empty = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true });
    grid.dispatchEvent(empty);
    expect(empty.defaultPrevented).toBe(false);
    expect(onSelect).toHaveBeenCalledTimes(2);
    const unrelated = new KeyboardEvent('keydown', { key: 'x', bubbles: true, cancelable: true });
    grid.dispatchEvent(unrelated);
    expect(unrelated.defaultPrevented).toBe(false);
    expect(onSelect).toHaveBeenCalledTimes(2);
    expect(document.activeElement).toBe(grid);
  });

  it('prevents ArrowLeft, but leaves Tab alone without changing grid state', async () => {
    const user = userEvent.setup();
    render(<GridMap city={MULBIT_CITY} activeLayerIds={ALL_LAYERS} selectedCandidateId={null} onSelectCandidate={vi.fn()} />);
    const grid = screen.getByRole('grid');
    grid.focus();
    await user.keyboard('{ArrowRight}');
    const before = grid.getAttribute('aria-activedescendant');
    const left = new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true, cancelable: true });
    grid.dispatchEvent(left);
    expect(left.defaultPrevented).toBe(true);
    await waitFor(() => expect(grid).toHaveAttribute('aria-activedescendant', 'mulbit-cell-a1'));
    const afterLeft = grid.getAttribute('aria-activedescendant');
    const tab = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true });
    grid.dispatchEvent(tab);
    expect(tab.defaultPrevented).toBe(false);
    expect(grid.getAttribute('aria-activedescendant')).toBe(afterLeft);
    expect(afterLeft).not.toBe(before);
    expect(document.activeElement).toBe(grid);
  });

  it('does not mutate layer arrays during interaction or prop changes', () => {
    const original = [...ALL_LAYERS];
    const nextLayers = [...ALL_LAYERS].reverse();
    const { rerender } = render(<GridMap city={MULBIT_CITY} activeLayerIds={original} selectedCandidateId={null} onSelectCandidate={vi.fn()} />);
    const grid = screen.getByRole('grid');
    fireEvent.keyDown(grid, { key: 'ArrowDown' });
    rerender(<GridMap city={MULBIT_CITY} activeLayerIds={nextLayers} selectedCandidateId="mulbit-b2" onSelectCandidate={vi.fn()} />);
    fireEvent.keyDown(grid, { key: 'ArrowRight' });
    expect(original).toEqual(ALL_LAYERS);
    expect(nextLayers).toEqual([...ALL_LAYERS].reverse());
  });

  it('clamps all four directions and reports row/column indices and a real unique active cell', () => {
    const user = userEvent.setup();
    render(<GridMap city={MULBIT_CITY} activeLayerIds={ALL_LAYERS} selectedCandidateId={null} onSelectCandidate={vi.fn()} />);
    const grid = screen.getByRole('grid');
    grid.focus();
    return user.keyboard('{ArrowLeft}{ArrowUp}{End}{ArrowDown}{ArrowDown}{ArrowDown}{ArrowDown}{ArrowDown}{ArrowRight}{Home}{ArrowUp}{ArrowUp}{ArrowUp}{ArrowUp}{ArrowUp}').then(() => {
      expect(grid).toHaveAttribute('aria-activedescendant', 'mulbit-cell-a1');
      const activeId = grid.getAttribute('aria-activedescendant');
      expect(activeId).toBeTruthy();
      expect(document.querySelectorAll(`#${activeId}`)).toHaveLength(1);
      const b2 = screen.getByRole('gridcell', { name: /B2/ });
      expect(b2).toHaveAttribute('aria-rowindex', '2');
      expect(b2).toHaveAttribute('aria-colindex', '2');
      expect(new Set([...grid.querySelectorAll('[role="gridcell"]')].map((cell) => cell.id)).size).toBe(25);
    });
  });

  it('uses city-prefixed active IDs after city rerender and preserves selected state labels', () => {
    const { rerender } = render(<GridMap city={MULBIT_CITY} activeLayerIds={ALL_LAYERS} selectedCandidateId={null} onSelectCandidate={vi.fn()} />);
    const grid = screen.getByRole('grid');
    rerender(<GridMap city={MARU_CITY} activeLayerIds={ALL_LAYERS} selectedCandidateId="maru-b2" onSelectCandidate={vi.fn()} />);
    const activeId = grid.getAttribute('aria-activedescendant');
    expect(activeId).toMatch(/^maru-cell-/);
    expect(activeId && document.getElementById(activeId)).toBeTruthy();
    const selected = screen.getByRole('gridcell', { name: /B2.*선택됨/ });
    expect(selected).toHaveAttribute('aria-selected', 'true');
  });

  it('provides fixture-driven full table text and checked radio selection', () => {
    render(<CityDataTable city={MULBIT_CITY} activeLayerIds={ALL_LAYERS} selectedCandidateId="mulbit-b2" onSelectCandidate={vi.fn()} />);
    const table = screen.getByRole('table');
    expect(table.querySelector('caption')).toHaveTextContent('물빛시(가상 도시)');
    expect([...table.querySelectorAll('thead th')].map((cell) => cell.textContent)).toEqual(['좌표', '인구·기존 보장', '도로·이동 단위', '위험 표지', '후보지·비용', '기존 시설']);
    expect(table.querySelectorAll('tbody tr')).toHaveLength(MULBIT_CITY.nodes.length);
    for (const node of MULBIT_CITY.nodes) {
      const row = table.querySelector(`tbody tr[data-coordinate="${node.label}"]`);
      expect(row).toBeInTheDocument();
      const cells = row?.querySelectorAll(':scope > th, :scope > td');
      expect(cells).toHaveLength(6);
      expect(cells?.[0]).toHaveTextContent(node.label);
      expect(cells?.[1]).toHaveTextContent(/인구|사람 토큰/);
      expect(cells?.[2]).toHaveTextContent(/도로 연결/);
      expect(cells?.[3]).toHaveTextContent(/위험 표지|빗물 고임/);
      expect(cells?.[4]).toHaveTextContent(/후보지 없음|비용/);
      expect(cells?.[5]).toHaveTextContent(/기존 시설/);
    }
    const a1 = screen.getByRole('row', { name: /A1/ });
    expect(a1).toHaveTextContent('햇살 북쪽 구역');
    expect(a1).toHaveTextContent('사람 토큰 5');
    expect(a1).toHaveTextContent('이동이 불편할 수 있는 구역');
    const d4 = screen.getByRole('row', { name: /D4/ });
    expect(d4).toHaveTextContent('D4');
    expect(d4).toHaveTextContent('느티마당 문화센터');
    expect(d4).toHaveTextContent('기존 보장: 생활문화센터');
    expect(d4).toHaveTextContent('도로 연결 있음');
    const waterRisk = screen.getByRole('row', { name: /A4/ });
    expect(waterRisk).toHaveTextContent('빗물 고임');
    expect(waterRisk).toHaveTextContent('비가 오면 물이 고일 수 있는 표지');
    for (const candidate of MULBIT_CITY.candidates) {
      const row = screen.getByRole('row', { name: new RegExp(candidate.coordinate.label) });
      expect(row).toHaveTextContent(candidate.name);
      expect(row).toHaveTextContent(`비용 ${candidate.costTokens}단계`);
      expect(within(row).getByRole('radio', { name: new RegExp(candidate.name) })).toBeInTheDocument();
    }
    expect(within(screen.getByRole('row', { name: /B2/ })).getByRole('radio')).toBeChecked();
    cleanup();
    render(<CityDataTable city={MARU_CITY} activeLayerIds={ALL_LAYERS} selectedCandidateId={null} onSelectCandidate={vi.fn()} />);
    const maruRisk = screen.getByRole('row', { name: /A5/ });
    expect(maruRisk).toHaveTextContent('급경사');
    expect(maruRisk).toHaveTextContent('경사가 가파른 표지');
  });

  it('passes the same candidate ID through map and table callbacks', () => {
    const mapSelect = vi.fn();
    const tableSelect = vi.fn();
    const { unmount } = render(<GridMap city={MULBIT_CITY} activeLayerIds={ALL_LAYERS} selectedCandidateId={null} onSelectCandidate={mapSelect} />);
    fireEvent.click(screen.getByRole('gridcell', { name: /B2/ }));
    expect(mapSelect).toHaveBeenCalledWith('mulbit-b2');
    unmount();
    render(<CityDataTable city={MULBIT_CITY} activeLayerIds={ALL_LAYERS} selectedCandidateId={null} onSelectCandidate={tableSelect} />);
    fireEvent.click(screen.getByRole('radio', { name: /느린 강변 터/ }));
    expect(tableSelect).toHaveBeenCalledWith('mulbit-b2');
  });

  it('renders every required pattern and icon in the two city fixtures', () => {
    render(<GridMap city={MULBIT_CITY} activeLayerIds={ALL_LAYERS} selectedCandidateId={null} onSelectCandidate={vi.fn()} />);
    const dots = screen.getByRole('gridcell', { name: /A1/ }).querySelector('[data-pattern="dots"]');
    expect(dots).toHaveTextContent('●');
    expect(dots).toHaveClass('pattern-dots');
    const lines = screen.getByRole('gridcell', { name: /A1/ }).querySelector('[data-pattern="lines"]');
    expect(lines).toHaveTextContent('↔');
    expect(lines).toHaveClass('pattern-lines');
    expect(screen.getByRole('gridcell', { name: /A4.*빗물 고임/ })).toHaveAttribute('data-pattern', 'waves');
    const waves = screen.getByRole('gridcell', { name: /A4.*빗물 고임/ }).querySelector('[data-pattern="waves"]');
    expect(waves).toHaveTextContent('≋');
    expect(waves).toHaveClass('pattern-waves');
    const ring = screen.getByRole('gridcell', { name: /B2/ }).querySelector('[data-pattern="ring"]');
    expect(ring).toHaveClass('pattern-ring');
    cleanup();
    render(<GridMap city={MARU_CITY} activeLayerIds={ALL_LAYERS} selectedCandidateId={null} onSelectCandidate={vi.fn()} />);
    const slope = screen.getByRole('gridcell', { name: /A5.*급경사/ });
    expect(slope).toHaveAttribute('data-pattern', 'crosshatch');
    const crosshatch = slope.querySelector('[data-pattern="crosshatch"]');
    expect(crosshatch).toHaveTextContent('⌁');
    expect(crosshatch).toHaveClass('pattern-crosshatch');
  });

  it('keeps the CSS contracts explicit for targets, focus, overflow, and mobile rule', () => {
    const button = document.createElement('button');
    const input = document.createElement('input');
    const select = document.createElement('select');
    const grid = document.createElement('div');
    grid.className = 'city-grid';
    const table = document.createElement('div');
    table.className = 'city-table-scroll';
    document.body.append(button, input, select, grid, table);
    expect(getComputedStyle(button).minHeight).toBe('44px');
    expect(getComputedStyle(input).minHeight).toBe('44px');
    expect(getComputedStyle(select).minHeight).toBe('44px');
    expect(getComputedStyle(document.body).overflowX).not.toBe('hidden');
    expect(getComputedStyle(grid).overflow).toBe('auto');
    expect(getComputedStyle(table).overflowX).toBe('auto');
    const mediaRule = [...document.styleSheets].flatMap((sheet) => [...sheet.cssRules]).find((rule) => rule.cssText.includes('max-width: 600px'));
    expect(mediaRule).toBeDefined();
    const focusRule = [...document.styleSheets].flatMap((sheet) => [...sheet.cssRules]).find((rule) => rule.cssText.includes(':focus-visible'));
    expect(focusRule?.cssText).toMatch(/:focus-visible/);
    expect(focusRule?.cssText).toMatch(/outline:\s*4px solid var\(--color-focus\)/);
    expect(focusRule?.cssText).toMatch(/outline-offset:\s*3px/);
  });
});
