import { expect, test } from '@playwright/test';
import {
  chooseIntake,
  fillOpinion,
  installConsoleGuards,
  inspectAndOpenResident,
  placeSingle,
  reviewLayers,
} from './flow-helpers';

test.beforeEach(async ({ page }) => {
  installConsoleGuards(page);
  await page.goto('/');
});

test('completes the library mission through a balanced opinion', async ({ page }) => {
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
  await expect(page.getByRole('heading', { name: 'A안과 B안 비교' })).toBeVisible();
  await fillOpinion(page);
  await expect(page.getByText(/타당안—절충 확인|수정 필요/)).toBeVisible();
  await expect(page.getByLabel('모형과 안전 안내').getByText(/실제 도시계획을 대신하거나 응급 서비스 성능을 예측하지 않습니다/)).toBeVisible();
});

test('completes combined mission with shared budget and a phased second pair', async ({ page }) => {
  await chooseIntake(page, 'combined-review', 'safety');
  await reviewLayers(page, ['인구', '도로·이동 단위', '가상 위험 표지', '후보지 비용', '기존 시설']);

  await page.getByRole('radio', { name: /솔마루 터.*마루 B2/ }).check();
  await page.getByRole('button', { name: '도서관 1곳 시설 배치' }).click();
  await page.getByRole('radio', { name: /마루 중앙 터.*마루 D3/ }).check();
  await page.getByRole('button', { name: '건강 도움소 1곳 시설 배치' }).click();
  await page.getByRole('button', { name: '영향 계산' }).click();
  await inspectAndOpenResident(page);
  await page.getByRole('radio', { name: /솔빛 북쪽 구역/ }).check();
  await page.getByRole('button', { name: 'A안 저장' }).click();
  await page.getByRole('button', { name: '후보 수정하여 B안 만들기' }).click();

  await page.getByRole('radio', { name: /새길 쉼터 터.*마루 C2/ }).check();
  await page.getByRole('button', { name: '도서관 1곳 시설 배치' }).click();
  await page.getByRole('radio', { name: /동쪽 열린 터.*마루 E3/ }).check();
  await page.getByRole('button', { name: '건강 도움소 1곳 시설 배치' }).click();
  await page.getByRole('button', { name: '영향 계산' }).click();
  await inspectAndOpenResident(page);
  await page.getByRole('radio', { name: /새길 동쪽 구역/ }).check();
  await page.getByRole('button', { name: 'B안 저장' }).click();
  await expect(page.getByRole('heading', { name: 'A안과 B안 비교' })).toBeVisible();
  await fillOpinion(page);
  await expect(page.getByText(/단계적으로 설치/)).toBeVisible();
  await expect(page.getByText(/타당안—절충 확인|수정 필요/)).toBeVisible();
});
