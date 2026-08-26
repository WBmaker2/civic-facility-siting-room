import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
// @ts-expect-error Vite raw stylesheet import is available in the test runtime.
import motionCss from '../styles/motion.css?raw';
import { useReducedMotion } from './useReducedMotion';
import { GuidedActionButton } from '../navigation/GuidedActionButton';
import { FacilityRange } from '../features/range/FacilityRange';

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
    expect(screen.getByLabelText(/B2.*가상 서비스 범위/)).toHaveClass('facility-range--spread');
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

  it('locks the motion stylesheet contract', () => {
    expect(motionCss).toMatch(/gi-pulse[\s\S]*2s/);
    expect(motionCss).toMatch(/box-shadow/);
    expect(motionCss).toMatch(/outline/);
    expect(motionCss).not.toMatch(/transform/);
    expect(motionCss).toMatch(/prefers-reduced-motion: reduce/);
    expect(motionCss).toMatch(/animation:\s*none/);
    expect(motionCss).toMatch(/transition:\s*none/);
    expect(motionCss).toMatch(/outline:\s*3px solid var\(--focus-strong\)/);
    expect(motionCss).toMatch(/outline-offset:\s*3px/);
  });
});
