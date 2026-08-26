import { expect, test } from '@playwright/test';
import { chooseIntake, fillOpinion, installConsoleGuards, inspectAndOpenResident, selectLayers } from './flow-helpers';

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    const install = () => {
      const style = document.createElement('style');
      style.textContent = '.city-grid { visibility: hidden !important; }';
      document.head.append(style);
    };
    if (document.head) install();
    else document.addEventListener('DOMContentLoaded', install, { once: true });
  });
  installConsoleGuards(page);
  await page.goto('/');
});

test('completes the core activity from the labeled table without activating the grid', async ({ page }) => {
  await chooseIntake(page, 'living-culture-center');
  await selectLayers(page, ['인구', '도로·이동 단위', '가상 위험 표지', '후보지 비용', '기존 시설']);
  await expect(page.locator('.city-grid')).toBeHidden();
  await page.getByRole('tab', { name: '표 보기' }).click();
  await expect(page.locator('[role="grid"]')).toHaveCount(0);
  await expect(page.getByRole('table', { name: /물빛시/ })).toBeVisible();
  await expect(page.getByText(/인구·기존 보장/)).toBeVisible();
  await expect(page.getByRole('columnheader', { name: '도로·이동 단위' })).toBeVisible();
  await expect(page.getByRole('columnheader', { name: '위험 표지' })).toBeVisible();
  await expect(page.getByRole('columnheader', { name: '후보지·비용' })).toBeVisible();
  await expect(page.getByRole('columnheader', { name: '기존 시설' })).toBeVisible();
  await page.getByRole('radio', { name: /느티마당 터.*비용 2단계/ }).check();
  await page.getByRole('button', { name: '자료층 확인' }).click();

  await page.getByRole('button', { name: '시설 배치' }).click();
  await page.getByRole('button', { name: '영향 계산' }).click();
  await inspectAndOpenResident(page);
  await expect(page.getByRole('table', { name: '구역별 주민 관점 비교' })).toBeVisible();
  await expect(page.getByRole('columnheader', { name: '사람 토큰' })).toBeVisible();
  await expect(page.getByRole('columnheader', { name: '도달 여부' })).toBeVisible();
  await page.getByRole('radio', { name: /햇살 북쪽 구역/ }).check();
  await page.getByRole('button', { name: 'A안 저장' }).click();
  await page.getByRole('button', { name: '후보 수정하여 B안 만들기' }).click();
  await page.getByRole('radio', { name: /가운데 광장 터.*물빛 C3/ }).check();
  await page.getByRole('button', { name: '시설 배치' }).click();
  await page.getByRole('button', { name: '영향 계산' }).click();
  await inspectAndOpenResident(page);
  await page.getByRole('radio', { name: /바람 동쪽 구역/ }).check();
  await page.getByRole('button', { name: 'B안 저장' }).click();
  await fillOpinion(page);
  await expect(page.getByLabel('모형과 안전 안내').getByText(/교육용 상대 단위/)).toBeVisible();
});
