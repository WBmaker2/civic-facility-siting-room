import { expect, type Page } from '@playwright/test';

const FORBIDDEN_REQUEST_PATH = /(?:^|\/)(?:analytics(?:\.js)?|maps?\.js?|geocod(?:ing)?|openai|gemini|ai-recommend(?:ation)?|login(?:-callback)?|auth|submit(?:-opinion|mission)?|submission)(?:\/|$|\?)/i;

export function assertLocalhostRequests(requestUrls: readonly string[]): void {
  expect(requestUrls.length, 'at least one browser request should be observed').toBeGreaterThan(0);
  for (const rawUrl of requestUrls) {
    const url = new URL(rawUrl);
    expect(url.hostname, rawUrl).toBe('127.0.0.1');
    expect(`${url.pathname}${url.search}`, rawUrl).not.toMatch(FORBIDDEN_REQUEST_PATH);
  }
}

export function isForbiddenRequestPath(path: string): boolean {
  return FORBIDDEN_REQUEST_PATH.test(path);
}

export function installConsoleGuards(page: Page): void {
  page.on('pageerror', (error) => {
    throw new Error(`pageerror: ${error.message}`);
  });
  page.on('console', (message) => {
    if (message.type() === 'error' || message.type() === 'warning') {
      throw new Error(`console ${message.type()}: ${message.text()}`);
    }
  });
}

export async function chooseIntake(page: Page, mission: string, priority = 'access-equity'): Promise<void> {
  await page.getByRole('combobox', { name: '미션 선택' }).selectOption(mission);
  await page.getByRole('radio', { name: priority === 'access-equity' ? '접근성' : priority === 'safety' ? '안전' : '비용' }).check();
  await page.getByRole('button', { name: '도시 자료실로 이동' }).click();
}

export async function reviewLayers(page: Page, layers: string[] = ['인구', '도로·이동 단위']): Promise<void> {
  for (const layer of layers) await page.getByRole('checkbox', { name: layer }).check();
  await page.getByRole('button', { name: '자료층 확인' }).click();
}

export async function selectLayers(page: Page, layers: string[] = ['인구', '도로·이동 단위']): Promise<void> {
  for (const layer of layers) await page.getByRole('checkbox', { name: layer }).check();
}

export async function placeSingle(page: Page, candidate: RegExp): Promise<void> {
  await page.getByRole('radio', { name: candidate }).check();
  await page.getByRole('button', { name: '시설 배치' }).click();
  await expect(page.getByRole('button', { name: '영향 계산' })).toBeEnabled();
  await page.getByRole('button', { name: '영향 계산' }).click();
  await expect(page.getByRole('region', { name: '영향 분석실' })).toBeVisible();
}

export async function inspectAndOpenResident(page: Page): Promise<void> {
  await page.getByRole('button', { name: '영향 계산' }).click();
  await page.getByRole('button', { name: /평균 이동 단위/ }).click();
  await page.getByRole('button', { name: /가장 긴 이동 단위/ }).click();
  await page.getByRole('button', { name: '주민 관점표로 이동' }).click();
  await expect(page.getByRole('region', { name: '주민 관점표' })).toBeVisible();
}

export async function fillOpinion(page: Page, proposal = 'B안', mitigation = '단계적 안내를 함께 마련하겠습니다.'): Promise<void> {
  await page.getByRole('button', { name: '의견서 작성' }).click();
  await page.getByRole('radio', { name: proposal }).check();
  await page.getByRole('checkbox', { name: '평균 이동 단위' }).check();
  await page.getByRole('checkbox', { name: '가장 긴 이동 단위' }).check();
  await page.getByRole('checkbox', { name: '위험 조건' }).check();
  await page.getByRole('combobox', { name: '더 불편을 살필 구역' }).selectOption({ index: 1 });
  await page.getByLabel('선택안의 근거').fill('접근성과 안전 자료를 함께 비교했습니다.');
  await page.getByLabel('예상되는 반론').fill('다른 구역의 이동 부담이 커질 수 있습니다.');
  await page.getByLabel('보완 방법').fill(mitigation);
  await expect(page.getByRole('button', { name: '의견서 작성' })).toBeEnabled();
  await page.getByRole('button', { name: '의견서 작성' }).click();
  await expect(page.getByRole('heading', { name: '완성한 입지 심의 의견서' })).toBeVisible();
}
