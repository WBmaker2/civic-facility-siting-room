import { expect, test } from '@playwright/test';
import { assertLocalhostRequests, chooseIntake, installConsoleGuards, inspectAndOpenResident, isForbiddenRequestPath, placeSingle, reviewLayers } from './flow-helpers';

test('rejects known analytics, map, AI, login, and submission request variants', () => {
  for (const path of ['/map', '/maps', '/maps/tiles', '/map.js', '/maps.js', '/geocode', '/geocoding/search', '/ai', '/ai-helper', '/ai-recommend', '/ai-recommendation', '/analytics', '/analytics.js', '/openai/chat', '/gemini', '/auth/session', '/login', '/login/foo', '/login-callback', '/submit', '/submit/foo', '/submit-opinion', '/submission']) {
    expect(isForbiddenRequestPath(path), path).toBe(true);
  }
  for (const path of ['/src/main.tsx', '/@vite/client', '/assets/index.js', '/favicon.ico']) {
    expect(isForbiddenRequestPath(path), path).toBe(false);
  }
  expect(() => assertLocalhostRequests(['https://evil.example/ok'])).toThrow();
  expect(() => assertLocalhostRequests(['http://127.0.0.1:5173/maps.js'])).toThrow();
});

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

  assertLocalhostRequests(requests);
});
