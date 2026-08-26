import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';
import axe from 'axe-core';
import { App } from '../../src/app/App';

afterEach(cleanup);

async function assertAccessibleStage(requireAnnouncement = false): Promise<void> {
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
  expect(document.querySelector('form, fieldset, [role="grid"], table')).toBeTruthy();
  if (document.querySelector('[role="grid"]')) expect(document.querySelectorAll('[data-pattern]').length).toBeGreaterThan(0);
}

async function goToLibraryOpinion(): Promise<void> {
  const user = userEvent.setup();
  await user.selectOptions(screen.getByRole('combobox', { name: '미션 선택' }), 'bookmaru-library');
  await user.click(screen.getByRole('radio', { name: '접근성' }));
  await user.click(screen.getByRole('button', { name: '도시 자료실로 이동' }));
  await assertAccessibleStage(false);
  await user.click(screen.getByRole('checkbox', { name: '인구' }));
  await user.click(screen.getByRole('checkbox', { name: '도로·이동 단위' }));
  await user.click(screen.getByRole('button', { name: '자료층 확인' }));
  await assertAccessibleStage(false);
  await user.click(screen.getByRole('radio', { name: /느린 강변 터.*물빛 B2/ }));
  await user.click(screen.getByRole('button', { name: '시설 배치' }));
  await user.click(screen.getByRole('button', { name: '영향 계산' }));
  await assertAccessibleStage(true);
  await user.click(screen.getByRole('button', { name: '영향 계산' }));
  await user.click(screen.getByRole('button', { name: /평균 이동 단위/ }));
  await user.click(screen.getByRole('button', { name: /가장 긴 이동 단위/ }));
  await user.click(screen.getByRole('button', { name: '주민 관점표로 이동' }));
  await assertAccessibleStage(false);
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
  await assertAccessibleStage();
}

describe('six rendered stages accessibility contract', () => {
  it('has a named semantic shell at intake', async () => {
    render(<App />);
    await assertAccessibleStage(false);
    const action = screen.getByRole('button', { name: '업데이트 내역' });
    await userEvent.setup().click(action);
    expect(screen.getByRole('dialog', { name: '업데이트 내역' })).toBeInTheDocument();
  });

  it('runs axe and semantic checks on all six real stages', async () => {
    render(<App />);
    await goToLibraryOpinion();
  });
});
