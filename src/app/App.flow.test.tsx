import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';
import { App } from './App';

afterEach(cleanup);

describe('App learner flow through impact analysis', () => {
  it('keeps analysis entry disabled until placement is complete, then opens the real analysis room', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.selectOptions(screen.getByRole('combobox', { name: '미션 선택' }), 'bookmaru-library');
    await user.click(screen.getByRole('radio', { name: '접근성' }));
    await user.click(screen.getByRole('button', { name: '도시 자료실로 이동' }));
    expect(screen.getByRole('region', { name: '도시 자료실' })).toBeInTheDocument();
    await user.click(screen.getByRole('checkbox', { name: '인구' }));
    await user.click(screen.getByRole('checkbox', { name: '도로·이동 단위' }));
    await user.click(screen.getByRole('button', { name: '자료층 확인' }));
    expect(screen.getByRole('region', { name: '후보 배치판' })).toBeInTheDocument();
    const enterAnalysis = screen.getByRole('button', { name: '영향 분석실로 이동' });
    expect(enterAnalysis).toBeDisabled();
    await user.click(await screen.findByRole('radio', { name: /느린 강변 터.*물빛 B2/ }));
    await user.click(screen.getByRole('button', { name: '시설 배치' }));
    expect(screen.getByRole('button', { name: '영향 분석실로 이동' })).toBeEnabled();
    await user.click(screen.getByRole('button', { name: '영향 분석실로 이동' }));
    expect(screen.getByRole('region', { name: '영향 분석실' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '영향 계산' })).toBeEnabled();
  });
});
