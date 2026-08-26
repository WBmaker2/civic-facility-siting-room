import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { App } from './App';

describe('App', () => {
  it('names the learning room and identifies the fictional model', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: '도시 기능 입지 심의실' })).toBeInTheDocument();
    expect(screen.getByText(/가상 격자 도시/)).toBeInTheDocument();
  });
});
