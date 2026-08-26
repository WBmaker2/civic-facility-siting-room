import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';
import { App } from '../../app/App';

describe('ReviewIntake', () => {
  afterEach(() => cleanup());

  it('shows purpose budget conditions and three priority choices', async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(screen.getByRole('heading', { name: '심의 접수' })).toBeInTheDocument();
    expect(screen.getByText(/완료 조건/)).toBeInTheDocument();
    expect(screen.getAllByRole('radio', { name: /접근성|안전|비용/ })).toHaveLength(3);
    expect(screen.getByText(/35~45분/)).toBeInTheDocument();

    await user.selectOptions(screen.getByRole('combobox', { name: '미션 선택' }), 'health-help-center');
    expect(screen.getAllByText('마루시(가상 도시)').length).toBeGreaterThan(0);
    expect(screen.getAllByText(/일상 건강 상담 시설이며 응급 출동 시간을 예측하지 않습니다/).length).toBeGreaterThan(0);
    expect(screen.getByRole('button', { name: '도시 자료실로 이동' })).toBeDisabled();

    await user.click(screen.getByRole('radio', { name: /접근성/ }));
    expect(screen.getByRole('button', { name: '도시 자료실로 이동' })).toBeEnabled();
  });

  it('shows two slots and shared phased budget guidance for the combined mission', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.selectOptions(screen.getByRole('combobox', { name: '미션 선택' }), 'combined-review');

    expect(screen.getAllByText(/도서관.*일상 건강 상담 시설/).length).toBeGreaterThan(0);
    expect(screen.getByText(/공유 예산/)).toBeInTheDocument();
    expect(screen.getByText(/역할을 나누어 맡습니다/)).toBeInTheDocument();
    expect(screen.getByText(/우선 설치.*나중 설치/)).toBeInTheDocument();
  });
});
