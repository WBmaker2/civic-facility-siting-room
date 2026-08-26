import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { App } from './App';

describe('App', () => {
  afterEach(() => cleanup());
  it('names the learning room and identifies the fictional model', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: '도시 기능 입지 심의실' })).toBeInTheDocument();
    expect(screen.getByText(/가상 격자 도시/)).toBeInTheDocument();
  });

  it('shows one current stage region and a non-clickable ordered stepper', () => {
    render(<App />);
    expect(screen.getByRole('region', { name: '심의 접수' })).toHaveAttribute('data-stage-id', 'intake');
    expect(screen.getByRole('heading', { name: '심의 접수' })).toBeInTheDocument();
    expect(screen.getByText('현재 단계: 심의 접수')).toBeInTheDocument();
    expect(screen.getByRole('list').querySelectorAll('button')).toHaveLength(0);
    expect(screen.getByRole('list').querySelector('[aria-current="step"]')).toHaveTextContent('심의 접수');
  });
});
