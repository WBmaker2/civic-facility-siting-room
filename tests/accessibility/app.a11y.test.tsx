import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';
import axe from 'axe-core';
import { App } from '../../src/app/App';

afterEach(cleanup);

async function assertAccessibleStage(stage: string, requireAnnouncement = false): Promise<void> {
  const results = await axe.run(document.body);
  const blocking = results.violations.filter((item) => item.impact === 'serious' || item.impact === 'critical');
  expect(blocking, JSON.stringify(blocking)).toEqual([]);
  expect(document.querySelectorAll('main')).toHaveLength(1);
  const ids = [...document.querySelectorAll('[id]')].map((item) => item.id);
  expect(new Set(ids).size).toBe(ids.length);
  const headings = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map((item) => Number(item.tagName.slice(1)));
  expect(headings[0]).toBe(1);
  for (let index = 1; index < headings.length; index += 1) expect(headings[index]! - headings[index - 1]!).toBeLessThanOrEqual(1);
  if (requireAnnouncement) expect(document.querySelector('[aria-live]')).toBeTruthy();
  const region = document.querySelector(`[data-stage-id="${stage}"]`);
  expect(region).toBeTruthy();
  if (stage === 'intake') {
    expect(screen.getByRole('combobox', { name: '미션 선택' })).toBeInTheDocument();
    expect(screen.getByRole('group', { name: '가장 먼저 살필 기준' })).toBeInTheDocument();
  } else if (stage === 'data-room') {
    expect(screen.getByRole('grid', { name: /가상 격자 지도/ })).toBeInTheDocument();
    expect(screen.getByRole('tablist', { name: '도시 자료 표현 선택' })).toBeInTheDocument();
    expect(screen.getByRole('group', { name: '확인할 자료층' })).toBeInTheDocument();
    expect(document.querySelectorAll('[data-pattern]').length).toBeGreaterThan(0);
    if (document.querySelectorAll('input[type="checkbox"]:checked').length > 0) {
      const legend = document.querySelector('[aria-label="켜진 자료층 범례"]');
      expect(legend).toBeTruthy();
      expect(legend).toHaveTextContent('●');
      expect(legend).toHaveTextContent('↔');
      expect(legend).toHaveTextContent(/무늬: 사람 토큰/);
    }
  } else if (stage === 'placement') {
    expect(screen.getByRole('group', { name: '후보지 선택' })).toBeInTheDocument();
    expect(screen.getByRole('group', { name: /도서관/ })).toBeInTheDocument();
  } else if (stage === 'analysis') {
    const analysisTabs = screen.queryByRole('tablist', { name: '영향 분석 표현 선택' });
    if (analysisTabs !== null) expect(analysisTabs).toBeInTheDocument();
    expect(screen.getByRole('table', { name: /이동 경로/ })).toBeInTheDocument();
  } else if (stage === 'resident-view') {
    expect(screen.getByRole('table', { name: '구역별 주민 관점 비교' })).toBeInTheDocument();
    expect(screen.getByRole('group', { name: '누가 더 불편한가요?' })).toBeInTheDocument();
  } else if (stage === 'opinion') {
    expect(screen.getByRole('group', { name: '우선 기준' })).toBeInTheDocument();
    expect(screen.getByRole('group', { name: '선택안' })).toBeInTheDocument();
    expect(screen.getByLabelText('선택안의 근거')).toBeInTheDocument();
  }
}

async function goToLibraryOpinion(): Promise<void> {
  const user = userEvent.setup();
  await user.selectOptions(screen.getByRole('combobox', { name: '미션 선택' }), 'bookmaru-library');
  await user.click(screen.getByRole('radio', { name: '접근성' }));
  await user.click(screen.getByRole('button', { name: '도시 자료실로 이동' }));
  await assertAccessibleStage('data-room');
  await user.click(screen.getByRole('checkbox', { name: '인구' }));
  await user.click(screen.getByRole('checkbox', { name: '도로·이동 단위' }));
  await assertAccessibleStage('data-room');
  await user.click(screen.getByRole('button', { name: '자료층 확인' }));
  await assertAccessibleStage('placement');
  await user.click(screen.getByRole('radio', { name: /느린 강변 터.*물빛 B2/ }));
  await user.click(screen.getByRole('button', { name: '시설 배치' }));
  await user.click(screen.getByRole('button', { name: '영향 계산' }));
  await assertAccessibleStage('analysis');
  const calculate = screen.getByRole('button', { name: '영향 계산' });
  await user.click(calculate);
  expect(screen.getByRole('status')).toHaveTextContent('영향 계산이 완료되었습니다. 평균, 가장 긴 이동, 도달 불가, 위험, 비용을 함께 확인하세요.');
  expect(document.activeElement).toBe(calculate);
  await assertAccessibleStage('analysis', true);
  await user.click(screen.getByRole('button', { name: '영향 계산' }));
  await user.click(screen.getByRole('button', { name: /평균 이동 단위/ }));
  await user.click(screen.getByRole('button', { name: /가장 긴 이동 단위/ }));
  await user.click(screen.getByRole('button', { name: '주민 관점표로 이동' }));
  await assertAccessibleStage('resident-view');
  await user.click(screen.getByRole('radio', { name: /햇살 북쪽 구역/ }));
  await user.click(screen.getByRole('button', { name: 'A안 저장' }));
  await user.click(screen.getByRole('button', { name: '후보 수정하여 B안 만들기' }));
  await user.click(screen.getByRole('radio', { name: /가운데 광장 터.*물빛 C3/ }));
  await user.click(screen.getByRole('button', { name: '시설 배치' }));
  await user.click(screen.getByRole('button', { name: '영향 계산' }));
  await user.click(screen.getByRole('button', { name: '영향 계산' }));
  await user.click(screen.getByRole('button', { name: /평균 이동 단위/ }));
  await user.click(screen.getByRole('button', { name: /가장 긴 이동 단위/ }));
  await user.click(screen.getByRole('button', { name: '주민 관점표로 이동' }));
  await user.click(screen.getByRole('radio', { name: /바람 동쪽 구역/ }));
  await user.click(screen.getByRole('button', { name: 'B안 저장' }));
  await user.click(screen.getByRole('button', { name: '의견서 작성' }));
  await assertAccessibleStage('opinion');
}

describe('six rendered stages accessibility contract', () => {
  it('has a named semantic shell at intake', async () => {
    render(<App />);
    await assertAccessibleStage('intake');
    const action = screen.getByRole('button', { name: '업데이트 내역' });
    const user = userEvent.setup();
    await user.click(action);
    const dialog = screen.getByRole('dialog', { name: '업데이트 내역' });
    expect(dialog).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '업데이트 내역 닫기' })).toHaveFocus();
    await user.keyboard('{Escape}');
    await expect(action).toHaveFocus();
  });

  it('runs axe and semantic checks on all six real stages', async () => {
    render(<App />);
    await goToLibraryOpinion();
  });
});
