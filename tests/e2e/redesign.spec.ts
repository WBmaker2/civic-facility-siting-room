import { expect, test } from '@playwright/test';

test.describe('education redesign contracts', () => {
  test('moves focus to the new stage and keeps the update control in flow', async ({ page }) => {
    await page.goto('./');
    await expect(page.getByRole('heading', { name: '심의 접수' })).toBeVisible();
    const trigger = page.getByRole('button', { name: '업데이트 내역' });
    const initialTriggerBox = await trigger.boundingBox();
    expect(initialTriggerBox).not.toBeNull();
    if (initialTriggerBox) expect(initialTriggerBox.y).toBeGreaterThanOrEqual(0);
    await page.getByRole('combobox', { name: '미션 선택' }).selectOption('bookmaru-library');
    await page.getByRole('radio', { name: '접근성' }).check();
    await page.getByRole('button', { name: '도시 자료실로 이동' }).click();
    await expect(page.getByRole('heading', { name: '도시 자료실' })).toBeFocused();

    const headingBox = await page.getByRole('heading', { name: '도시 자료실' }).boundingBox();
    const triggerBox = await trigger.boundingBox();
    expect(headingBox).not.toBeNull();
    expect(triggerBox).not.toBeNull();
    expect(await trigger.evaluate((element) => getComputedStyle(element).position)).toBe('static');
  });

  test('keeps the resident table as the only horizontal overflow on a narrow screen', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('./');
    await page.getByRole('combobox', { name: '미션 선택' }).selectOption('bookmaru-library');
    await page.getByRole('radio', { name: '접근성' }).check();
    await page.getByRole('button', { name: '도시 자료실로 이동' }).click();
    await page.getByRole('checkbox', { name: '인구' }).check();
    await page.getByRole('checkbox', { name: '도로·이동 단위' }).check();
    await page.getByRole('button', { name: '자료층 확인' }).click();
    await page.getByRole('radio', { name: /느린 강변 터.*B2/ }).check();
    await page.getByRole('button', { name: /도서관 1곳 시설 배치/ }).click();
    await page.getByRole('button', { name: '영향 계산' }).click();
    await page.getByRole('button', { name: /평균 이동 단위:/ }).click();
    await page.getByRole('button', { name: /가장 긴 이동 단위:/ }).click();
    await page.getByRole('button', { name: '주민 관점표로 이동' }).click();
    await page.getByRole('radio', { name: /느티나무 남쪽 구역/ }).check();
    await expect(page.locator('.perspective-table-wrap')).toHaveAttribute('data-sticky-column', 'true');
    await expect(page.locator('.perspective-table tbody th').first()).toHaveCSS('position', 'sticky');
    const overflow = await page.evaluate(() => ({ document: document.documentElement.scrollWidth - document.documentElement.clientWidth, table: document.querySelector('.perspective-table')?.scrollWidth ?? 0, wrapper: document.querySelector('.perspective-table-wrap')?.clientWidth ?? 0 }));
    expect(overflow.document).toBe(0);
    expect(overflow.table).toBeGreaterThan(overflow.wrapper);
  });

  test('keeps text-zoom overflow inside data visualizations', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('./');
    await page.getByRole('combobox', { name: '미션 선택' }).selectOption('bookmaru-library');
    await page.getByRole('radio', { name: '접근성' }).check();
    await page.getByRole('button', { name: '도시 자료실로 이동' }).click();
    const overflow = await page.evaluate(() => {
      document.documentElement.style.fontSize = '200%';
      return { document: document.documentElement.scrollWidth, viewport: document.documentElement.clientWidth, map: document.querySelector('.city-grid')?.scrollWidth ?? 0 };
    });
    expect(overflow.document).toBe(overflow.viewport);
    expect(overflow.map).toBeGreaterThan(overflow.viewport);
  });

  test('offers a keyboard skip link and stable pointer feedback', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('./');

    const skipLink = page.getByRole('link', { name: '본문으로 건너뛰기' });
    await page.keyboard.press('Tab');
    await expect(skipLink).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/#learning-stage$/);

    const trigger = page.getByRole('button', { name: '업데이트 내역' });
    const before = await trigger.evaluate((element) => {
      const style = getComputedStyle(element);
      return { background: style.backgroundColor, width: element.getBoundingClientRect().width };
    });
    await trigger.hover();
    await expect.poll(
      () => trigger.evaluate((element) => getComputedStyle(element).backgroundColor),
      { timeout: 1000 },
    ).not.toBe(before.background);
    const hoverWidth = await trigger.evaluate((element) => element.getBoundingClientRect().width);
    expect(hoverWidth).toBe(before.width);

    const box = await trigger.boundingBox();
    expect(box).not.toBeNull();
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await page.mouse.down();
      const pressedTransform = await trigger.evaluate((element) => getComputedStyle(element).transform);
      await page.mouse.up();
      expect(pressedTransform).not.toBe('none');
    }
  });
});
