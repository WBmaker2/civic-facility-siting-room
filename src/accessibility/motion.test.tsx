import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
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
    expect(screen.getByText('반경: 3 이동 단위')).toBeInTheDocument();
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

  it('pulses only the enabled current action and keeps the accessible name unchanged', () => {
    const onClick = vi.fn();
    render(<>
      <GuidedActionButton actionId="review-layers" currentAction="review-layers" disabled={false} onClick={onClick}>자료층 확인</GuidedActionButton>
      <GuidedActionButton actionId="calculate-impact" currentAction="review-layers" disabled={false} onClick={onClick}>영향 계산</GuidedActionButton>
      <GuidedActionButton actionId="write-opinion" currentAction="write-opinion" disabled onClick={onClick}>의견서 작성</GuidedActionButton>
    </>);
    expect(document.querySelectorAll('.gi-pulse')).toHaveLength(1);
    expect(screen.getByRole('button', { name: '자료층 확인' })).toHaveAttribute('data-guided', 'true');
    expect(screen.getByRole('button', { name: '자료층 확인' })).toHaveTextContent('다음 필수 활동');
    expect(screen.getByRole('button', { name: '의견서 작성' })).toHaveAttribute('data-guided', 'true');
    expect(screen.getByRole('button', { name: '의견서 작성' })).toHaveTextContent('다음 필수 활동');
    expect(screen.getByRole('button', { name: '의견서 작성' })).not.toHaveClass('gi-pulse');
    expect(screen.getByRole('button', { name: '영향 계산' })).toBeEnabled();
  });
});
