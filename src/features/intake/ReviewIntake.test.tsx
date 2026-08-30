import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';
import { App } from '../../app/App';
import { CITIES } from '../../domain/cities';
import { MISSIONS } from '../../domain/missions';

describe('ReviewIntake', () => {
  afterEach(() => cleanup());

  it('shows purpose budget conditions and three priority choices', async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(screen.getByRole('heading', { name: '심의 접수' })).toBeInTheDocument();
    expect(screen.getByText(/완료 조건/)).toBeInTheDocument();
    expect(screen.getAllByRole('radio', { name: /접근성|안전|비용/ })).toHaveLength(3);
    expect(screen.getByText(/35~45분/)).toBeInTheDocument();

    await user.selectOptions(screen.getByRole('combobox', { name: '미션 선택' }), 'health-help-center');
    expect(screen.getAllByText('마루시(가상 도시)').length).toBeGreaterThan(0);
    expect(screen.getAllByText(/일상 건강 상담 시설이며 응급 출동 시간을 예측하지 않습니다/).length).toBeGreaterThan(0);
    expect(screen.getByRole('button', { name: '도시 자료실로 이동' })).toBeDisabled();

    await user.click(screen.getByRole('radio', { name: /접근성/ }));
    expect(screen.getByRole('button', { name: '도시 자료실로 이동' })).toBeEnabled();
  });

  it('keeps the selected mission conditions available in a compact disclosure', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.selectOptions(screen.getByRole('combobox', { name: '미션 선택' }), 'bookmaru-library');
    const conditions = screen.getByRole('group', { name: '책마루 도서관을 놓아 보세요 공개 조건' });
    expect(conditions).toBeInTheDocument();
    expect(conditions).toHaveTextContent('공개 조건 보기');
  });

  it('shows two slots and shared phased budget guidance for the combined mission', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.selectOptions(screen.getByRole('combobox', { name: '미션 선택' }), 'combined-review');

    expect(screen.getAllByText(/도서관.*일상 건강 상담 시설/).length).toBeGreaterThan(0);
    expect(screen.getByText(/공유 예산/)).toBeInTheDocument();
    expect(screen.getByText(/역할을 나누어 맡습니다/)).toBeInTheDocument();
    expect(screen.getByText(/우선 설치.*나중 설치/)).toBeInTheDocument();
  });

  it('shows each mission card with its assigned city, purpose, budget, and every public condition', () => {
    render(<App />);
    const purposes: Record<keyof typeof MISSIONS, string> = {
      'bookmaru-library': '책과 배움 자료를 이용하는 작은 도서관입니다.',
      'health-help-center': '일상 건강 상담 시설이며 응급 출동 시간을 예측하지 않습니다.',
      'living-culture-center': '주민이 함께 배우고 활동하는 생활 문화센터입니다.',
      'combined-review': '도서관과 일상 건강 상담 시설을 함께 검토하는 복합 심의입니다.',
    };

    for (const mission of Object.values(MISSIONS)) {
      const card = screen.getByRole('article', { name: mission.title, hidden: true });
      expect(card).toHaveTextContent(CITIES[mission.cityId].name);
      expect(card).toHaveTextContent(`${mission.budgetTokens}토큰`);
      expect(card).toHaveTextContent(purposes[mission.id]);
      for (const condition of mission.conditions) expect(card).toHaveTextContent(condition.label);
    }
  });

  it('collapses mission details initially and opens the selected mission while preserving article names', async () => {
    const user = userEvent.setup();
    render(<App />);
    const initialDetails = screen.getAllByRole('article', { hidden: true }).map((article) => article.closest('details'));
    expect(initialDetails).toHaveLength(Object.keys(MISSIONS).length);
    expect(initialDetails.every((details) => details?.open === false)).toBe(true);

    await user.selectOptions(screen.getByRole('combobox', { name: '미션 선택' }), 'combined-review');
    const selectedArticle = screen.getByRole('article', { name: MISSIONS['combined-review'].title });
    expect(selectedArticle.closest('details')).toHaveAttribute('open');
    expect(selectedArticle).toHaveAccessibleName(MISSIONS['combined-review'].title);
    const closedDetails = screen.getAllByRole('article', { hidden: true })
      .filter((article) => article !== selectedArticle)
      .map((article) => article.closest('details'));
    expect(closedDetails.every((details) => details?.open === false)).toBe(true);
  });

  it('uses exact priority names, updates checked state, and resets priority on mission reselection', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.selectOptions(screen.getByRole('combobox', { name: '미션 선택' }), 'bookmaru-library');
    const access = screen.getByRole('radio', { name: '접근성' });
    const safety = screen.getByRole('radio', { name: '안전' });
    const cost = screen.getByRole('radio', { name: '비용' });
    expect(access).toBeInTheDocument();
    expect(safety).toBeInTheDocument();
    expect(cost).toBeInTheDocument();

    await user.click(access);
    expect(access).toBeChecked();
    expect(safety).not.toBeChecked();
    expect(cost).not.toBeChecked();
    await user.selectOptions(screen.getByRole('combobox', { name: '미션 선택' }), 'living-culture-center');
    expect(access).not.toBeChecked();
    expect(safety).not.toBeChecked();
    expect(cost).not.toBeChecked();
  });
});
