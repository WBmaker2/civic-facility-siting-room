import { expect, test } from '@playwright/test';
import { chooseIntake, installConsoleGuards, selectLayers } from './flow-helpers';

test.use({ viewport: { width: 375, height: 812 } });

async function expectVisibleTarget(page: import('@playwright/test').Page, target: import('@playwright/test').Locator): Promise<void> {
  await target.scrollIntoViewIfNeeded();
  const box = await target.boundingBox();
  expect(box).not.toBeNull();
  expect(box!.width).toBeGreaterThanOrEqual(44);
  expect(box!.height).toBeGreaterThanOrEqual(44);
  expect(box!.x).toBeGreaterThanOrEqual(0);
  expect(box!.y).toBeGreaterThanOrEqual(0);
  expect(box!.x + box!.width).toBeLessThanOrEqual(375);
  expect(box!.y + box!.height).toBeLessThanOrEqual(812);
  await target.focus();
  expect(await target.evaluate((element) => Number.parseFloat(getComputedStyle(element).outlineWidth))).toBeGreaterThanOrEqual(3);
}

test('keeps mobile map, table, results, focus, and reduced motion usable', async ({ page }) => {
  installConsoleGuards(page);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await chooseIntake(page, 'bookmaru-library');
  await selectLayers(page);
  expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBe(0);
  await expect(page.locator('[role="grid"]')).toBeVisible();
  expect(await page.locator('.city-grid').evaluate((element) => ({ scroll: element.scrollWidth, client: element.clientWidth, overflow: getComputedStyle(element).overflowX }))).toMatchObject({ overflow: 'auto' });
  expect(await page.locator('.city-grid').evaluate((element) => element.scrollWidth > element.clientWidth)).toBe(true);
  expect(await page.locator('.city-data-views').evaluate((element) => getComputedStyle(element).overflow)).not.toBe('hidden');
  await page.getByRole('gridcell', { name: /B2.*후보지 있음/ }).click();
  await expect(page.getByText('현재 선택 좌표: B2')).toBeVisible();
  await page.getByRole('tab', { name: '표 보기' }).click();
  await expect(page.getByRole('tabpanel', { name: '표 보기' })).toBeVisible();
  expect(await page.locator('.city-table-scroll').evaluate((element) => element.scrollWidth > element.clientWidth)).toBe(true);
  await page.getByRole('tab', { name: '지도 보기' }).click();
  await expect(page.getByRole('tabpanel', { name: '지도 보기' })).toBeVisible();

  const layerAction = page.getByRole('button', { name: '자료층 확인' });
  await layerAction.focus();
  await expect(layerAction).toBeFocused();
  await expect(layerAction).toHaveCSS('outline-width', '3px');
  const targetSizes = await page.locator('button:visible, input:visible, select:visible, textarea:visible').evaluateAll((elements) => elements.map((element) => {
    const box = element.getBoundingClientRect();
    return { tag: element.tagName, width: box.width, height: box.height };
  }));
  expect(targetSizes.length).toBeGreaterThan(0);
  expect(targetSizes.every((target) => target.width >= 44 && target.height >= 44)).toBe(true);
  await page.getByRole('tab', { name: '지도 보기' }).focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('#table-tab')).toBeFocused();
  await expect(page.locator('#map-panel')).toHaveCount(0);

  await page.getByRole('tab', { name: '지도 보기' }).click();
  await expect(page.getByRole('tabpanel', { name: '지도 보기' })).toBeVisible();
  await page.getByRole('button', { name: '자료층 확인' }).click();
  await page.getByRole('button', { name: '시설 배치' }).click();
  const guidedPulse = page.locator('button.gi-pulse');
  await expect(guidedPulse).toHaveCount(1);
  await expect(guidedPulse).toBeEnabled();
  await expect(guidedPulse).toHaveCSS('animation-name', 'none');
  await expect(guidedPulse).toHaveCSS('animation-duration', '0s');
  const calculate = page.getByRole('button', { name: '영향 계산' });
  await expectVisibleTarget(page, calculate);
  await calculate.click();
  await expect(page.getByRole('tab', { name: '결과표' })).toBeVisible();
  const ranges = page.locator('.facility-range');
  await expect(ranges).toHaveCount(1);
  await expect(ranges.first()).toHaveCSS('animation-name', 'none');
  await expect(ranges.first()).toHaveCSS('animation-duration', '0s');
  const selectionTab = page.getByRole('tab', { name: '선택 위치' });
  const resultsTab = page.getByRole('tab', { name: '결과표' });
  await expectVisibleTarget(page, selectionTab);
  await selectionTab.click();
  await expect(page.getByRole('tabpanel', { name: '선택 위치' })).toBeVisible();
  await expectVisibleTarget(page, resultsTab);
  await resultsTab.click();
  await expect(page.getByRole('tabpanel', { name: '결과표' })).toBeVisible();

  for (const label of [/평균 이동 단위/, /가장 긴 이동 단위/]) await page.getByRole('button', { name: label }).click();
  await page.getByRole('button', { name: '주민 관점표로 이동' }).click();
  await page.getByRole('radio', { name: /구역/ }).first().click();
  await page.getByRole('button', { name: 'A안 저장' }).click();
  await page.getByRole('button', { name: '후보 수정하여 B안 만들기' }).click();
  await page.getByRole('radio', { name: /가운데 광장 터.*물빛 C3/ }).click();
  await page.getByRole('button', { name: '시설 배치' }).click();
  await page.getByRole('button', { name: '영향 계산' }).click();
  for (const label of [/평균 이동 단위/, /가장 긴 이동 단위/]) await page.getByRole('button', { name: label }).click();
  await page.getByRole('button', { name: '주민 관점표로 이동' }).click();
  await page.getByRole('radio', { name: /구역/ }).last().click();
  await page.getByRole('button', { name: 'B안 저장' }).click();
  await page.getByRole('button', { name: '의견서 작성' }).click();
  const opinionProposal = page.getByRole('radio', { name: /B안/ });
  const opinionZone = page.getByRole('combobox', { name: '더 불편을 살필 구역' });
  const opinionSubmit = page.getByRole('button', { name: '의견서 작성' });
  for (const target of [opinionProposal, opinionZone, page.getByLabel('선택안의 근거'), page.getByLabel('예상되는 반론'), page.getByLabel('보완 방법'), opinionSubmit]) {
    await expectVisibleTarget(page, target);
  }

  const history = page.getByRole('button', { name: '업데이트 내역' });
  await expectVisibleTarget(page, history);
  const historyBox = await history.boundingBox();
  const stageBoxes = await page.locator('main [data-stage-id]:visible').evaluateAll((elements) => elements.map((element) => {
    const box = element.getBoundingClientRect();
    return { left: box.left, right: box.right, top: box.top, bottom: box.bottom };
  }));
  expect(historyBox).not.toBeNull();
  expect(stageBoxes.some((box) => historyBox!.x < box.right && historyBox!.x + historyBox!.width > box.left && historyBox!.y < box.bottom && historyBox!.y + historyBox!.height > box.top)).toBe(false);
  await history.click();
  const closeHistory = page.getByRole('button', { name: '업데이트 내역 닫기' });
  await expectVisibleTarget(page, closeHistory);
  await page.keyboard.press('Escape');
  await expect(history).toBeFocused();

  // Playwright cannot change browser chrome zoom; doubling the root text scale exercises the same reflow contract.
  await page.evaluate(() => { document.documentElement.style.fontSize = '200%'; });
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBe(0);
  expect(await page.locator('.opinion-field').first().evaluate((element) => getComputedStyle(element).overflow)).not.toBe('hidden');
  for (const target of [opinionProposal, opinionZone, page.getByLabel('선택안의 근거'), page.getByLabel('예상되는 반론'), page.getByLabel('보완 방법'), opinionSubmit]) {
    await expectVisibleTarget(page, target);
  }
  const zoomHistory = page.getByRole('button', { name: '업데이트 내역' });
  await expectVisibleTarget(page, zoomHistory);
  await zoomHistory.click();
  const zoomCloseHistory = page.getByRole('button', { name: '업데이트 내역 닫기' });
  await expectVisibleTarget(page, zoomCloseHistory);
  await page.keyboard.press('Escape');
  await expect(zoomHistory).toBeFocused();
});
