import { expect, test, type Locator, type Page } from '@playwright/test';
import { installConsoleGuards } from './flow-helpers';

// Approved automation boundary: only the native mission and opinion-zone selects
// use selectOption; every other learner interaction below is a real keyboard event.

async function tabUntil(page: Page, target: Locator, limit = 80, direction: 'Tab' | 'Shift+Tab' = 'Tab'): Promise<void> {
  for (let index = 0; index < limit; index += 1) {
    await page.keyboard.press(direction);
    const hidden = await page.evaluate(() => {
      const active = document.activeElement;
      if (active === null) return true;
      const style = getComputedStyle(active);
      return style.display === 'none' || style.visibility === 'hidden' || active.closest('[hidden]') !== null || active.getClientRects().length === 0;
    });
    expect(hidden, 'Tab must never enter a hidden control').toBe(false);
    if (await target.evaluate((element) => element === document.activeElement)) return;
  }
  throw new Error(`Tab order did not reach ${await target.getAttribute('aria-label') ?? await target.textContent()}`);
}

async function pressSpace(page: Page, target: Locator): Promise<void> {
  await tabUntil(page, target);
  await page.keyboard.press('Space');
}

async function pressEnter(page: Page, target: Locator): Promise<void> {
  await tabUntil(page, target);
  await page.keyboard.press('Enter');
}

test('completes the library mission with real Tab and keyboard events', async ({ page }) => {
  installConsoleGuards(page);
  await page.goto('/');

  const mission = page.getByRole('combobox', { name: '미션 선택' });
  await tabUntil(page, mission);
  // Native select automation exception: headless Chromium does not commit ArrowDown reliably.
  await mission.selectOption('bookmaru-library');
  await expect(mission).toHaveValue('bookmaru-library');
  await pressSpace(page, page.getByRole('radio', { name: '접근성' }));
  await pressEnter(page, page.getByRole('button', { name: '도시 자료실로 이동' }));

  for (const label of ['인구', '도로·이동 단위']) await pressSpace(page, page.getByRole('checkbox', { name: label }));
  const mapTab = page.getByRole('tab', { name: '지도 보기' });
  await tabUntil(page, mapTab);
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('#table-tab')).toBeFocused();
  await page.keyboard.press('ArrowLeft');
  await expect(mapTab).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  expect(await page.evaluate(() => document.activeElement?.tagName)).not.toBe('BODY');
  await page.keyboard.press('Tab');
  await expect(mapTab).toBeFocused();
  await page.keyboard.press('Enter');
  const grid = page.getByRole('grid', { name: /가상 격자 지도/ });
  await tabUntil(page, grid);
  await page.keyboard.press('Home');
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('ArrowRight');
  await page.keyboard.press('Enter');
  await pressEnter(page, page.getByRole('button', { name: '자료층 확인' }));

  await pressSpace(page, page.getByRole('radio', { name: /느린 강변 터.*물빛 B2/ }));
  await pressEnter(page, page.getByRole('button', { name: '시설 배치' }));
  const calculate = page.getByRole('button', { name: '영향 계산' });
  await pressEnter(page, calculate);
  await pressEnter(page, calculate);
  for (const label of [/평균 이동 단위/, /가장 긴 이동 단위/]) await pressSpace(page, page.getByRole('button', { name: label }));
  const residentView = page.getByRole('button', { name: '주민 관점표로 이동' });
  await expect(residentView).toBeEnabled();
  await tabUntil(page, residentView, 80, 'Shift+Tab');
  await page.keyboard.press('Enter');
  await pressSpace(page, page.getByRole('radio', { name: /구역/ }).first());
  await pressEnter(page, page.getByRole('button', { name: 'A안 저장' }));
  await pressEnter(page, page.getByRole('button', { name: '후보 수정하여 B안 만들기' }));
  await pressSpace(page, page.getByRole('radio', { name: /가운데 광장 터.*물빛 C3/ }));
  await pressEnter(page, page.getByRole('button', { name: '시설 배치' }));
  await pressEnter(page, calculate);
  await pressEnter(page, calculate);
  for (const label of [/평균 이동 단위/, /가장 긴 이동 단위/]) await pressSpace(page, page.getByRole('button', { name: label }));
  const secondResidentView = page.getByRole('button', { name: '주민 관점표로 이동' });
  await expect(secondResidentView).toBeEnabled();
  await tabUntil(page, secondResidentView, 80, 'Shift+Tab');
  await page.keyboard.press('Enter');
  await page.keyboard.press('Tab');
  const secondZoneRadios = page.getByRole('radio', { name: /구역/ });
  await expect(secondZoneRadios.first()).toBeFocused();
  for (let index = 1; index < await secondZoneRadios.count(); index += 1) await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Space');
  await pressEnter(page, page.getByRole('button', { name: 'B안 저장' }));
  await pressEnter(page, page.getByRole('button', { name: '의견서 작성' }));
  const proposalA = page.getByRole('radio', { name: /A안/ });
  const proposalB = page.getByRole('radio', { name: /B안/ });
  await tabUntil(page, proposalA);
  await page.keyboard.press('ArrowRight');
  await expect(proposalB).toBeFocused();
  await page.keyboard.press('Space');
  for (const label of ['평균 이동 단위', '가장 긴 이동 단위', '위험 조건']) await pressSpace(page, page.getByRole('checkbox', { name: label }));
  const zone = page.getByRole('combobox', { name: '더 불편을 살필 구역' });
  await tabUntil(page, zone);
  // Native select automation exception: this is the only other selectOption in the keyboard flow.
  await zone.selectOption({ index: 1 });
  for (const [label, value] of [['선택안의 근거', '키보드로 공개 자료를 비교한 근거입니다.'], ['예상되는 반론', '다른 구역의 이동 부담도 살펴야 합니다.'], ['보완 방법', '안내를 함께 마련하겠습니다.']] as const) {
    const field = page.getByLabel(label);
    await tabUntil(page, field);
    await page.keyboard.type(value);
  }
  await pressEnter(page, page.getByRole('button', { name: '의견서 작성' }));
  await expect(page.getByText('타당안—절충 확인')).toBeVisible();
  const history = page.getByRole('button', { name: '업데이트 내역' });
  await pressEnter(page, history);
  await expect(page.getByRole('dialog', { name: '업데이트 내역' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(history).toBeFocused();
});
