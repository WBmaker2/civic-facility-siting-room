import { act, cleanup, createEvent, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { analyzePlacement } from '../../engine/analyzePlacement';
import { tinyCity, tinyMission } from '../../../tests/fixtures/tinyCity';
import { ImpactAnalysis } from './ImpactAnalysis';

const placement = { slotId: 'library-1', facilityKind: 'library' as const, candidateId: 'candidate-b' };
const analysis = analyzePlacement(tinyCity, tinyMission, [placement]);

afterEach(() => {
  cleanup();
  Reflect.deleteProperty(window, 'matchMedia');
});

function setupMedia(matches = true) {
  const listeners = new Set<(event: MediaQueryListEvent) => void>();
  const media = {
    matches,
    media: '(max-width: 600px)',
    onchange: null,
    addEventListener: vi.fn((_type: string, listener: (event: MediaQueryListEvent) => void) => listeners.add(listener)),
    removeEventListener: vi.fn((_type: string, listener: (event: MediaQueryListEvent) => void) => listeners.delete(listener)),
    addListener: vi.fn(), removeListener: vi.fn(), dispatchEvent: vi.fn(),
  } as unknown as MediaQueryList;
  Object.defineProperty(window, 'matchMedia', { configurable: true, value: vi.fn(() => media) });
  return { media, listeners };
}

function renderAnalysis() {
  return render(<ImpactAnalysis city={tinyCity} mission={tinyMission} placements={[placement]} analysis={analysis} onAnalysis={vi.fn()} onInspectMetric={vi.fn()} />);
}

describe('ImpactAnalysis responsive semantics', () => {
  it('supports all tab navigation keys, focus, selection, and prevents only navigation keys', () => {
    setupMedia();
    renderAnalysis();
    const selection = screen.getByRole('tab', { name: '선택 위치' });
    const results = screen.getByRole('tab', { name: '결과표' });
    expect(selection).toHaveAttribute('aria-controls', 'selection-panel');
    expect(results).toHaveAttribute('aria-controls', 'results-panel');
    expect(results).toHaveAttribute('tabindex', '0');
    expect(selection).toHaveAttribute('tabindex', '-1');

    const navigate = (current: HTMLElement, key: string, expected: string) => {
      const event = createEvent.keyDown(current, { key });
      vi.spyOn(event, 'preventDefault');
      fireEvent(current, event);
      expect(event.preventDefault).toHaveBeenCalledTimes(1);
      expect(screen.getByRole('tab', { name: expected })).toHaveAttribute('aria-selected', 'true');
      expect(document.activeElement).toBe(screen.getByRole('tab', { name: expected }));
    };
    navigate(results, 'ArrowLeft', '선택 위치');
    navigate(selection, 'ArrowDown', '결과표');
    navigate(results, 'ArrowUp', '선택 위치');
    navigate(selection, 'ArrowRight', '결과표');
    navigate(results, 'Home', '선택 위치');
    navigate(selection, 'End', '결과표');

    const unrelated = createEvent.keyDown(screen.getByRole('tab', { name: '결과표' }), { key: 'Tab' });
    vi.spyOn(unrelated, 'preventDefault');
    fireEvent(screen.getByRole('tab', { name: '결과표' }), unrelated);
    expect(unrelated.preventDefault).not.toHaveBeenCalled();
    expect(screen.getByRole('tabpanel', { name: '결과표' })).toHaveAttribute('aria-labelledby', 'results-tab');
  });

  it('switches from mobile tabpanels to simultaneous desktop sections and cleans the media listener', () => {
    const { media, listeners } = setupMedia(true);
    const view = renderAnalysis();
    expect(screen.getByRole('tablist')).toBeInTheDocument();
    expect(screen.getByRole('tabpanel', { name: '결과표' })).toBeInTheDocument();
    expect(listeners.size).toBe(2);

    Object.defineProperty(media, 'matches', { configurable: true, value: false });
    act(() => {
      for (const listener of listeners) listener(new Event('change') as MediaQueryListEvent);
    });
    expect(screen.queryByRole('tablist')).not.toBeInTheDocument();
    expect(screen.getByRole('region', { name: '선택 위치' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: '결과표' })).toBeInTheDocument();

    view.unmount();
    expect(media.removeEventListener).toHaveBeenCalledTimes(2);
    expect(listeners.size).toBe(0);
  });
});
