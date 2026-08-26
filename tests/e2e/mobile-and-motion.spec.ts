import { expect, test } from '@playwright/test';
import { chooseIntake, installConsoleGuards, selectLayers } from './flow-helpers';

test.use({ viewport: { width: 375, height: 812 } });

test('keeps mobile map, table, results, focus, and reduced motion usable', async ({ page }) => {
  installConsoleGuards(page);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await chooseIntake(page, 'bookmaru-library');
  await selectLayers(page);

  expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBe(0);
  await expect(page.locator('[role="grid"]')).toBeVisible();
  await page.getByRole('gridcell', { name: /느린 강변 터/ }).click();
  await expect(page.getByText('현재 선택 좌표: B2')).toBeVisible();
  await page.getByRole('tab', { name: '표 보기' }).click();
  await expect(page.getByRole('tabpanel', { name: '표 보기' })).toBeVisible();
  await page.getByRole('tab', { name: '지도 보기' }).click();
  await expect(page.getByRole('tabpanel', { name: '지도 보기' })).toBeVisible();

  const layerAction = page.getByRole('button', { name: '자료층 확인' });
  await layerAction.focus();
  await expect(layerAction).toBeFocused();
  await expect(layerAction).toHaveCSS('outline-width', '3px');
  await page.getByRole('tab', { name: '지도 보기' }).focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('#table-tab')).toBeFocused();
  await expect(page.locator('#map-panel')).toHaveCount(0);

  await page.getByRole('tab', { name: '지도 보기' }).click();
  await expect(page.getByRole('tabpanel', { name: '지도 보기' })).toBeVisible();
  await page.getByRole('button', { name: '자료층 확인' }).click();
  await page.getByRole('button', { name: '시설 배치' }).click();
  await page.getByRole('button', { name: '영향 계산' }).click();
  await expect(page.getByRole('tab', { name: '결과표' })).toBeVisible();
  await page.getByRole('tab', { name: '선택 위치' }).click();
  await expect(page.getByRole('tabpanel', { name: '선택 위치' })).toBeVisible();
  await page.getByRole('tab', { name: '결과표' }).click();
  await expect(page.getByRole('tabpanel', { name: '결과표' })).toBeVisible();

  // Playwright cannot change browser chrome zoom; doubling the root text scale exercises the same reflow contract.
  await page.evaluate(() => { document.documentElement.style.fontSize = '200%'; });
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBe(0);
  await expect(page.getByText('현재 선택 좌표: B2')).toBeVisible();
  const animations = await page.locator('.gi-pulse, .facility-range').evaluateAll((elements) => elements.map((element) => {
    const style = getComputedStyle(element);
    return { name: style.animationName, duration: style.animationDuration };
  }));
  expect(animations.every((item) => item.name === 'none' || item.duration === '0s')).toBe(true);
});
