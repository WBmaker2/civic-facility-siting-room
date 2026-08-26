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

  it('completes the resident A revision B comparison loop without a winner', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.selectOptions(screen.getByRole('combobox', { name: '미션 선택' }), 'bookmaru-library');
    await user.click(screen.getByRole('radio', { name: '접근성' }));
    await user.click(screen.getByRole('button', { name: '도시 자료실로 이동' }));
    await user.click(screen.getByRole('checkbox', { name: '인구' }));
    await user.click(screen.getByRole('checkbox', { name: '도로·이동 단위' }));
    await user.click(screen.getByRole('button', { name: '자료층 확인' }));
    await user.click(screen.getByRole('radio', { name: /느린 강변 터.*물빛 B2/ }));
    await user.click(screen.getByRole('button', { name: '시설 배치' }));
    await user.click(screen.getByRole('button', { name: '영향 분석실로 이동' }));
    await user.click(screen.getByRole('button', { name: '영향 계산' }));
    await user.click(screen.getByRole('button', { name: /평균 이동 단위/ }));
    await user.click(screen.getByRole('button', { name: /가장 긴 이동 단위/ }));
    await user.click(screen.getByRole('button', { name: '주민 관점표로 이동' }));
    await user.click(screen.getByRole('radio', { name: /햇살 북쪽 구역/ }));
    await user.click(screen.getByRole('button', { name: 'A안 저장' }));
    expect(screen.getByRole('button', { name: '후보 수정하여 B안 만들기' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: '후보 수정하여 B안 만들기' }));
    await user.click(screen.getByRole('radio', { name: /가운데 광장 터.*물빛 C3/ }));
    await user.click(screen.getByRole('button', { name: '시설 배치' }));
    await user.click(screen.getByRole('button', { name: '영향 분석실로 이동' }));
    await user.click(screen.getByRole('button', { name: '영향 계산' }));
    await user.click(screen.getByRole('button', { name: /평균 이동 단위/ }));
    await user.click(screen.getByRole('button', { name: /가장 긴 이동 단위/ }));
    await user.click(screen.getByRole('button', { name: '주민 관점표로 이동' }));
    await user.click(screen.getByRole('radio', { name: /바람 동쪽 구역/ }));
    await user.click(screen.getByRole('button', { name: 'B안 저장' }));
    expect(screen.getByRole('heading', { name: 'A안과 B안 비교' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'A안 저장' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'B안 저장' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: '후보 수정하여 B안 만들기' })).not.toBeInTheDocument();
    expect(screen.getByText('도서관: 느린 강변 터 (B2)')).toBeInTheDocument();
    expect(screen.getByText('2.7 이동 단위')).toBeInTheDocument();
    expect(screen.getByText('예산 토큰 3개 안에 놓기: 충족 — 배치 비용 1토큰 / 공개 한도 3토큰입니다.')).toBeInTheDocument();
    expect(screen.getByText('A안은 ___을 지키지만 ___이 불리하고, B안은 ___을 바꿉니다.')).toBeInTheDocument();
    expect(screen.queryByText(/승자|최적|정답|순위|점수/)).not.toBeInTheDocument();
  });
});
