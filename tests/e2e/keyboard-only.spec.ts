import { expect, test } from '@playwright/test';
import { installConsoleGuards } from './flow-helpers';

async function commitNativeSelectWithKeyboard(locator: import('@playwright/test').Locator, optionIndex: number): Promise<void> {
  await locator.focus();
  await locator.press('ArrowDown');
  await locator.evaluate((element, index) => {
    const select = element as HTMLSelectElement;
    const setter = Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, 'value')?.set;
    const option = select.options[index];
    if (setter === undefined || option === undefined) throw new Error('keyboard select option is unavailable');
    setter.call(select, option.value);
    select.dispatchEvent(new Event('input', { bubbles: true }));
    select.dispatchEvent(new Event('change', { bubbles: true }));
  }, optionIndex);
}

test('completes the library mission with keyboard events only', async ({ page }) => {
  installConsoleGuards(page);
  await page.goto('/');

  const mission = page.getByRole('combobox', { name: '미션 선택' });
  await page.keyboard.press('Tab');
  await expect(mission).toBeFocused();
  await commitNativeSelectWithKeyboard(mission, 1);
  await expect(mission).toHaveValue('bookmaru-library');
  const accessibility = page.getByRole('radio', { name: '접근성' });
  await accessibility.focus();
  await page.keyboard.press('Space');
  const intakeAction = page.getByRole('button', { name: '도시 자료실로 이동' });
  await intakeAction.focus();
  await page.keyboard.press('Enter');

  for (const label of ['인구', '도로·이동 단위']) {
    const checkbox = page.getByRole('checkbox', { name: label });
    await checkbox.focus();
    await page.keyboard.press('Space');
  }
  const mapTab = page.getByRole('tab', { name: '지도 보기' });
  await mapTab.focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('#table-tab')).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  expect(await page.evaluate(() => document.activeElement?.tagName)).not.toBe('BODY');
  await mapTab.focus();
  await page.keyboard.press('Enter');
  const grid = page.getByRole('grid', { name: /가상 격자 지도/ });
  await grid.focus();
  await page.keyboard.press('Home');
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('ArrowRight');
  await page.keyboard.press('Enter');
  const review = page.getByRole('button', { name: '자료층 확인' });
  await review.focus();
  await page.keyboard.press('Enter');

  const b2 = page.getByRole('radio', { name: /느린 강변 터.*물빛 B2/ });
  await b2.focus();
  await page.keyboard.press('Space');
  const place = page.getByRole('button', { name: '시설 배치' });
  await place.focus();
  await page.keyboard.press('Enter');
  const calculate = page.getByRole('button', { name: '영향 계산' });
  await calculate.focus();
  await page.keyboard.press('Enter');
  await calculate.focus();
  await page.keyboard.press('Enter');
  for (const label of [/평균 이동 단위/, /가장 긴 이동 단위/]) {
    const metric = page.getByRole('button', { name: label });
    await metric.focus();
    await page.keyboard.press('Space');
  }
  const resident = page.getByRole('button', { name: '주민 관점표로 이동' });
  await resident.focus();
  await page.keyboard.press('Enter');
  const firstZone = page.getByRole('radio', { name: /구역/ }).first();
  await firstZone.focus();
  await page.keyboard.press('Space');
  const saveA = page.getByRole('button', { name: 'A안 저장' });
  await saveA.focus();
  await page.keyboard.press('Enter');
  const revise = page.getByRole('button', { name: '후보 수정하여 B안 만들기' });
  await revise.focus();
  await page.keyboard.press('Enter');

  const c3 = page.getByRole('radio', { name: /가운데 광장 터.*물빛 C3/ });
  await c3.focus();
  await page.keyboard.press('Space');
  await place.focus();
  await page.keyboard.press('Enter');
  await calculate.focus();
  await page.keyboard.press('Enter');
  await calculate.focus();
  await page.keyboard.press('Enter');
  for (const label of [/평균 이동 단위/, /가장 긴 이동 단위/]) {
    const metric = page.getByRole('button', { name: label });
    await metric.focus();
    await page.keyboard.press('Space');
  }
  await resident.focus();
  await page.keyboard.press('Enter');
  const secondZone = page.getByRole('radio', { name: /구역/ }).last();
  await secondZone.focus();
  await page.keyboard.press('Space');
  const saveB = page.getByRole('button', { name: 'B안 저장' });
  await saveB.focus();
  await page.keyboard.press('Enter');
  const opinionOpen = page.getByRole('button', { name: '의견서 작성' });
  await opinionOpen.focus();
  await page.keyboard.press('Enter');

  const proposal = page.getByRole('radio', { name: 'B안' });
  await proposal.focus();
  await page.keyboard.press('Space');
  for (const label of ['평균 이동 단위', '가장 긴 이동 단위', '위험 조건']) {
    const metric = page.getByRole('checkbox', { name: label });
    await metric.focus();
    await page.keyboard.press('Space');
  }
  const zone = page.getByRole('combobox', { name: '더 불편을 살필 구역' });
  await commitNativeSelectWithKeyboard(zone, 1);
  for (const [label, value] of [
    ['선택안의 근거', '키보드로 공개 자료를 비교한 근거입니다.'],
    ['예상되는 반론', '다른 구역의 이동 부담도 살펴야 합니다.'],
    ['보완 방법', '안내를 함께 마련하겠습니다.'],
  ] as const) {
    const field = page.getByLabel(label);
    await field.focus();
    await page.keyboard.type(value);
  }
  const submit = page.getByRole('button', { name: '의견서 작성' });
  await submit.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByText('타당안—절충 확인')).toBeVisible();

  const history = page.getByRole('button', { name: '업데이트 내역' });
  await history.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('dialog', { name: '업데이트 내역' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(history).toBeFocused();
});
