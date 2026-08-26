import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
// @ts-expect-error Vite raw stylesheet import is available in the test runtime.
import motionCss from '../styles/motion.css?raw';
import { useReducedMotion } from './useReducedMotion';
import { GuidedActionButton } from '../navigation/GuidedActionButton';
import { FacilityRange } from '../features/range/FacilityRange';
import { CITIES } from '../domain/cities';
import { MISSIONS } from '../domain/missions';
import { analyzePlacement } from '../engine/analyzePlacement';
import { ImpactAnalysis } from '../features/analysis/ImpactAnalysis';

afterEach(() => { cleanup(); vi.restoreAllMocks(); Reflect.deleteProperty(window, 'matchMedia'); });

function MotionProbe() {
  return <output aria-label="감소 모션 상태">{String(useReducedMotion())}</output>;
}

function mediaMock(matches: boolean) {
  const listeners = new Set<(event: MediaQueryListEvent) => void>();
  let currentMatches = matches;
  const query = {
    get matches() { return currentMatches; },
    media: '(prefers-reduced-motion: reduce)',
    onchange: null,
    addEventListener: (_type: string, listener: (event: MediaQueryListEvent) => void) => listeners.add(listener),
    removeEventListener: (_type: string, listener: (event: MediaQueryListEvent) => void) => listeners.delete(listener),
    dispatch: (next: boolean) => { currentMatches = next; listeners.forEach((listener) => listener({ matches: next } as MediaQueryListEvent)); },
  } as unknown as MediaQueryList & { dispatch: (next: boolean) => void };
  vi.stubGlobal('matchMedia', vi.fn(() => query));
  Object.defineProperty(window, 'matchMedia', { configurable: true, value: vi.fn(() => query) });
  return query;
}

describe('motion alternatives', () => {
  it('renders a labeled virtual service range in reduced motion mode', () => {
    render(<FacilityRange coordinate={{ row: 1, column: 2, label: 'B2' }} radiusUnits={3} reducedMotion />);
    expect(screen.getByLabelText(/B2.*가상 서비스 범위/)).toBeInTheDocument();
    expect(screen.getByText('서비스 기준: 3 상대 이동 단위')).toBeInTheDocument();
    expect(screen.getByLabelText(/B2.*가상 서비스 범위/)).not.toHaveClass('facility-range--spread');
  });

  it('uses a one-time spread only in normal motion and fails closed for invalid range data', () => {
    const { rerender } = render(<FacilityRange coordinate={{ row: 1, column: 2, label: 'B2' }} radiusUnits={3} reducedMotion={false} />);
    const normalRange = screen.getByLabelText(/B2.*가상 서비스 범위/);
    expect(normalRange).toHaveClass('facility-range--spread');
    expect(normalRange).toHaveTextContent('가상 서비스 범위');
    expect(normalRange).toHaveTextContent('중심 좌표: B2');
    expect(normalRange).toHaveTextContent('서비스 기준: 3 상대 이동 단위');
    expect(normalRange).toHaveTextContent('실제 거리·시간이 아닌 상대 이동 단위');
    rerender(<FacilityRange coordinate={{ row: 1, column: 2, label: 'B2' }} radiusUnits={Number.NaN} reducedMotion={false} />);
    expect(screen.getByRole('alert')).toHaveTextContent(/범위 자료를 표시할 수 없습니다/);
    const coordinate = { row: 1, column: 2, label: '' };
    rerender(<FacilityRange coordinate={coordinate} radiusUnits={3} reducedMotion={false} />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('tracks media-query changes and cleans up the modern listener', async () => {
    const query = mediaMock(false);
    render(<MotionProbe />);
    expect(screen.getByLabelText('감소 모션 상태')).toHaveTextContent('false');
    query.dispatch(true);
    await waitFor(() => expect(screen.getByLabelText('감소 모션 상태')).toHaveTextContent('true'));
    cleanup();
  });

  it('uses the current effect query even when the initial query object differs', () => {
    const initial = { matches: true, addEventListener: vi.fn(), removeEventListener: vi.fn() } as unknown as MediaQueryList;
    const effect = { matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() } as unknown as MediaQueryList;
    const matchMedia = vi.fn().mockReturnValueOnce(initial).mockReturnValueOnce(effect);
    Object.defineProperty(window, 'matchMedia', { configurable: true, value: matchMedia });
    render(<MotionProbe />);
    expect(matchMedia).toHaveBeenCalledTimes(2);
    expect(screen.getByLabelText('감소 모션 상태')).toHaveTextContent('false');
    expect(effect.addEventListener).toHaveBeenCalledTimes(1);
    expect(initial.addEventListener).not.toHaveBeenCalled();
  });

  it('adds and removes the modern listener exactly once', () => {
    const listeners = new Set<(event: MediaQueryListEvent) => void>();
    const addEventListener = vi.fn((_type: string, listener: (event: MediaQueryListEvent) => void) => listeners.add(listener));
    const removeEventListener = vi.fn((_type: string, listener: (event: MediaQueryListEvent) => void) => listeners.delete(listener));
    const query = { matches: false, addEventListener, removeEventListener } as unknown as MediaQueryList;
    Object.defineProperty(window, 'matchMedia', { configurable: true, value: vi.fn(() => query) });
    const view = render(<MotionProbe />);
    expect(addEventListener).toHaveBeenCalledTimes(1);
    expect(listeners.size).toBe(1);
    view.unmount();
    expect(removeEventListener).toHaveBeenCalledTimes(1);
    expect(listeners.size).toBe(0);
  });

  it('does not read a stale matches getter after unmount', () => {
    let current = false;
    let stale: ((event: MediaQueryListEvent) => void) | undefined;
    const listeners = new Set<(event: MediaQueryListEvent) => void>();
    const matches = vi.fn(() => current);
    const query = {
      get matches() { return matches(); },
      addEventListener: vi.fn((_type: string, listener: (event: MediaQueryListEvent) => void) => { stale = listener; listeners.add(listener); }),
      removeEventListener: vi.fn((_type: string, listener: (event: MediaQueryListEvent) => void) => listeners.delete(listener)),
    } as unknown as MediaQueryList;
    Object.defineProperty(window, 'matchMedia', { configurable: true, value: vi.fn(() => query) });
    const view = render(<MotionProbe />);
    expect(matches).toHaveBeenCalled();
    view.unmount();
    matches.mockClear();
    current = true;
    stale?.({ matches: true } as MediaQueryListEvent);
    expect(matches).not.toHaveBeenCalled();
    expect(listeners.size).toBe(0);
  });

  it('fails safe when matchMedia is missing', () => {
    render(<MotionProbe />);
    expect(screen.getByLabelText('감소 모션 상태')).toHaveTextContent('false');
  });

  it('fails safe for a throwing query and ignores a stale callback after cleanup', () => {
    Object.defineProperty(window, 'matchMedia', { configurable: true, value: () => { throw new Error('unavailable'); } });
    render(<MotionProbe />);
    expect(screen.getByLabelText('감소 모션 상태')).toHaveTextContent('false');
    cleanup();
    const query = mediaMock(false);
    render(<MotionProbe />);
    cleanup();
    expect(() => query.dispatch(true)).not.toThrow();
  });

  it('supports the legacy listener fallback and removes it', () => {
    const listeners = new Set<(event: MediaQueryListEvent) => void>();
    const addListener = vi.fn((listener: (event: MediaQueryListEvent) => void) => listeners.add(listener));
    const removeListener = vi.fn((listener: (event: MediaQueryListEvent) => void) => listeners.delete(listener));
    const query = { matches: true, addEventListener: undefined, removeEventListener: undefined, addListener, removeListener } as unknown as MediaQueryList;
    Object.defineProperty(window, 'matchMedia', { configurable: true, value: vi.fn(() => query) });
    render(<MotionProbe />);
    expect(screen.getByLabelText('감소 모션 상태')).toHaveTextContent('true');
    cleanup();
    expect(addListener).toHaveBeenCalledTimes(1);
    expect(removeListener).toHaveBeenCalledTimes(1);
    expect(listeners.size).toBe(0);
  });

  it('pulses only the enabled current action and keeps the accessible name unchanged', () => {
    const onClick = vi.fn();
    render(<>
      <GuidedActionButton actionId="review-layers" currentAction="review-layers" disabled={false} className=" existing  class " onClick={onClick}>자료층 확인</GuidedActionButton>
      <GuidedActionButton actionId="calculate-impact" currentAction="review-layers" disabled={false} onClick={onClick}>영향 계산</GuidedActionButton>
      <GuidedActionButton actionId="write-opinion" currentAction="write-opinion" disabled onClick={onClick}>의견서 작성</GuidedActionButton>
    </>);
    expect(document.querySelectorAll('.gi-pulse')).toHaveLength(1);
    expect(screen.getByRole('button', { name: '자료층 확인' })).toHaveAttribute('data-guided', 'true');
    expect(screen.getByRole('button', { name: '자료층 확인' })).toHaveTextContent('다음 필수 활동');
    expect(screen.getByRole('button', { name: '자료층 확인' })).toHaveClass('existing', 'class', 'gi-pulse');
    expect(screen.getByRole('button', { name: '의견서 작성' })).toHaveAttribute('data-guided', 'true');
    expect(screen.getByRole('button', { name: '의견서 작성' })).toHaveTextContent('다음 필수 활동');
    expect(screen.getByRole('button', { name: '의견서 작성' })).not.toHaveClass('gi-pulse');
    expect(screen.getByRole('button', { name: '영향 계산' })).toBeEnabled();
  });

  it('clicks only the enabled current guided action', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<>
      <GuidedActionButton actionId="review-layers" currentAction="review-layers" disabled={false} onClick={onClick}>자료층 확인</GuidedActionButton>
      <GuidedActionButton actionId="calculate-impact" currentAction="review-layers" disabled={false} onClick={onClick}>영향 계산</GuidedActionButton>
      <GuidedActionButton actionId="write-opinion" currentAction="write-opinion" disabled onClick={onClick}>의견서 작성</GuidedActionButton>
    </>);
    await user.click(screen.getByRole('button', { name: '자료층 확인' }));
    await user.click(screen.getByRole('button', { name: '영향 계산' }));
    await user.click(screen.getByRole('button', { name: '의견서 작성' }));
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it('renders both combined mission ranges once with the shared public threshold', async () => {
    const mission = MISSIONS['combined-review'];
    const placements = [
      { slotId: 'library-1', facilityKind: 'library' as const, candidateId: 'maru-d3' },
      { slotId: 'health-support-1', facilityKind: 'health-support' as const, candidateId: 'maru-c2' },
    ];
    const analysis = analyzePlacement(CITIES.maru, mission, placements);
    render(<ImpactAnalysis city={CITIES.maru} mission={mission} placements={placements} analysis={analysis} onAnalysis={vi.fn()} onInspectMetric={vi.fn()} />);
    const ranges = screen.getAllByLabelText(/가상 서비스 범위/);
    expect(ranges).toHaveLength(2);
    expect(new Set(ranges.map((range) => range.getAttribute('data-coordinate'))).size).toBe(2);
    expect(screen.getAllByText(`서비스 기준: ${mission.serviceThreshold} 상대 이동 단위`)).toHaveLength(2);
  });

  it('keeps exactly one narrow selection panel containing both ranges', async () => {
    const mission = MISSIONS['combined-review'];
    const placements = [
      { slotId: 'library-1', facilityKind: 'library' as const, candidateId: 'maru-d3' },
      { slotId: 'health-support-1', facilityKind: 'health-support' as const, candidateId: 'maru-c2' },
    ];
    const analysis = analyzePlacement(CITIES.maru, mission, placements);
    const query = { matches: true, addEventListener: vi.fn(), removeEventListener: vi.fn() } as unknown as MediaQueryList;
    Object.defineProperty(window, 'matchMedia', { configurable: true, value: vi.fn(() => query) });
    render(<ImpactAnalysis city={CITIES.maru} mission={mission} placements={placements} analysis={analysis} onAnalysis={vi.fn()} onInspectMetric={vi.fn()} />);
    await waitFor(() => expect(document.querySelector('#selection-panel')).toBeInTheDocument());
    expect(document.querySelectorAll('#selection-panel')).toHaveLength(1);
    expect(document.querySelectorAll('#selection-panel .facility-range')).toHaveLength(2);
  });

  it('locks the motion stylesheet contract', () => {
    const normalized = motionCss.replace(/\s+/g, ' ').trim();
    expect(normalized).toContain('.gi-pulse { animation: gi-pulse 2s ease-in-out infinite; }');
    expect(normalized).toContain('@keyframes gi-pulse');
    expect(normalized).toContain('box-shadow:');
    expect(normalized).toContain('outline-color:');
    expect(normalized).not.toContain('transform');
    expect(normalized).toContain('.facility-range--spread { animation: range-spread 700ms ease-out both; }');
    expect(normalized).not.toContain('range-spread 700ms ease-out both infinite');
    expect(normalized).toContain('@media (prefers-reduced-motion: reduce) { .gi-pulse, .facility-range { animation: none; transition: none; }');
    expect(normalized).toContain("[data-guided='true'], .facility-range { outline: 3px solid var(--focus-strong); outline-offset: 3px; }");
  });
});
