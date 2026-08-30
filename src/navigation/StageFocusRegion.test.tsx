import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { ReactNode } from 'react';
import { StageFocusRegion } from './StageFocusRegion';

describe('StageFocusRegion', () => {
  afterEach(() => vi.restoreAllMocks());

  it('focuses and scrolls the first heading when the learning stage changes', () => {
    const scrollIntoView = vi.fn();
    Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', { configurable: true, value: scrollIntoView });
    const { rerender } = render(
      <StageFocusRegion stage="intake">
        <section><h2>심의 접수</h2></section>
      </StageFocusRegion>,
    );

    expect(screen.getByRole('heading', { name: '심의 접수' })).not.toHaveFocus();
    rerender(
      <StageFocusRegion stage="data-room">
        <section><h2>도시 자료실</h2></section>
      </StageFocusRegion>,
    );

    const heading = screen.getByRole('heading', { name: '도시 자료실' });
    expect(heading).toHaveFocus();
    expect(heading).toHaveAttribute('tabindex', '-1');
    expect(scrollIntoView).toHaveBeenCalledWith(expect.objectContaining({ block: 'start' }));
  });

  it('renders children without changing the initial focus order', () => {
    const child: ReactNode = <section><h2>심의 접수</h2><button type="button">첫 행동</button></section>;
    render(<StageFocusRegion stage="intake">{child}</StageFocusRegion>);
    expect(screen.getByRole('button', { name: '첫 행동' })).toBeInTheDocument();
    expect(document.activeElement).not.toBe(screen.getByRole('heading', { name: '심의 접수' }));
  });
});
