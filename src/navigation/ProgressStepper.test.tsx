import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ProgressStepper } from './ProgressStepper';

describe('ProgressStepper', () => {
  it('explains the current, completed, and next steps in child-friendly language', () => {
    render(<ProgressStepper currentStage="analysis" />);
    expect(screen.getByRole('status')).toHaveTextContent('현재 단계: 영향 분석실');
    expect(document.querySelector('[data-stage="intake"]')).toHaveAttribute('data-state', 'complete');
    expect(document.querySelector('[data-stage="analysis"]')).toHaveAttribute('data-state', 'current');
    expect(document.querySelector('[data-stage="resident-view"]')).toHaveAttribute('data-state', 'next');
    expect(screen.getByText('평균과 가장 긴 이동 결과 확인하기')).toBeInTheDocument();
    expect(screen.getByText('어느 구역이 더 불편한지 살펴보기')).toBeInTheDocument();
  });
});
