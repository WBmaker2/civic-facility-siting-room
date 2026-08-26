import { expect, test } from '@playwright/test';
import { chooseIntake, installConsoleGuards, inspectAndOpenResident, placeSingle, reviewLayers } from './flow-helpers';

test('resets learner input on reload and remains localhost-only', async ({ page }) => {
  installConsoleGuards(page);
  const requests: string[] = [];
  page.on('request', (request) => requests.push(request.url()));
  await page.goto('/');
  await chooseIntake(page, 'bookmaru-library');
  await reviewLayers(page);
  await placeSingle(page, /느린 강변 터.*물빛 B2/);
  await inspectAndOpenResident(page);
  await page.getByRole('radio', { name: /햇살 북쪽 구역/ }).check();
  await page.getByRole('button', { name: 'A안 저장' }).click();
  await page.getByRole('button', { name: '후보 수정하여 B안 만들기' }).click();
  await page.getByRole('radio', { name: /가운데 광장 터.*물빛 C3/ }).check();
  await page.getByRole('button', { name: '시설 배치' }).click();
  await page.getByRole('button', { name: '영향 계산' }).click();
  await inspectAndOpenResident(page);
  await page.getByRole('radio', { name: /바람 동쪽 구역/ }).check();
  await page.getByRole('button', { name: 'B안 저장' }).click();
  await page.getByRole('button', { name: '의견서 작성' }).click();
  await page.getByRole('radio', { name: 'A안' }).check();
  await page.getByLabel('선택안의 근거').fill('DISTINCTIVE_LEARNER_TEXT_2026');
  await expect(page.getByLabel('선택안의 근거')).toHaveValue('DISTINCTIVE_LEARNER_TEXT_2026');
  await page.reload();
  await expect(page.getByRole('combobox', { name: '미션 선택' })).toHaveValue('');
  await expect(page.getByText('DISTINCTIVE_LEARNER_TEXT_2026')).toHaveCount(0);
  await expect(page.getByRole('radio', { name: /느린 강변 터.*물빛 B2/ })).toHaveCount(0);

  const forbidden = /analytics|\/(?:maps?|geocod(?:ing)?|openai|gemini|ai|login|auth|submit(?:mission)?)(?:\/|$)|submission/i;
  for (const rawUrl of requests) {
    const url = new URL(rawUrl);
    expect(url.hostname, rawUrl).toBe('127.0.0.1');
    expect(`${url.pathname}${url.search}`, rawUrl).not.toMatch(forbidden);
  }
});
