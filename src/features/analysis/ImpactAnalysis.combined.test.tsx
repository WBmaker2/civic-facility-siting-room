import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { analyzePlacement } from '../../engine/analyzePlacement';
import { tinyCity, tinyMission } from '../../../tests/fixtures/tinyCity';
import type { FacilityPlacement } from '../../domain/types';
import { ImpactAnalysis } from './ImpactAnalysis';

const mission = { ...tinyMission, id: 'combined-review' as const, title: '복합 심의', facilityKinds: ['library', 'health-support'] as Array<'library' | 'health-support'> };
const placements: FacilityPlacement[] = [
  { slotId: 'library-1', facilityKind: 'library', candidateId: 'candidate-b' },
  { slotId: 'health-support-1', facilityKind: 'health-support', candidateId: 'candidate-d' },
];

describe('ImpactAnalysis combined facility evidence', () => {
  it('keeps each facility role and nearest access actual values and path rows separate', () => {
    const analysis = analyzePlacement(tinyCity, mission, placements);
    render(<ImpactAnalysis city={tinyCity} mission={mission} placements={placements} analysis={analysis} onAnalysis={() => undefined} onInspectMetric={() => undefined} />);

    const roles = screen.getByRole('heading', { name: '시설 역할별 접근 결과' }).closest('section');
    expect(roles).not.toBeNull();
    const library = within(roles!).getByRole('heading', { name: '도서관 개별 접근' }).closest('section');
    const health = within(roles!).getByRole('heading', { name: '건강 도움소 개별 접근' }).closest('section');
    const nearest = within(roles!).getByRole('heading', { name: '가장 가까운 시설 기준' }).closest('section');
    expect(library).not.toBeNull();
    expect(health).not.toBeNull();
    expect(nearest).not.toBeNull();
    expect(library).toHaveTextContent('평균 이동 단위: 2.8 가상 단위');
    expect(library).toHaveTextContent('가장 긴 이동 단위: 3 가상 단위');
    expect(library).toHaveTextContent('도달 4 / 전체 4명 토큰');
    expect(library).toHaveTextContent('가장 불리한 구역: C 구역 (3명 토큰)');
    expect(library).toHaveTextContent('도달 불가 구역: 0개 (없음)');
    expect(health).toHaveTextContent('평균 이동 단위: 계산 불가');
    expect(health).toHaveTextContent('가장 긴 이동 단위: 계산 불가');
    expect(health).toHaveTextContent('도달 0 / 전체 4명 토큰');
    expect(health).toHaveTextContent('가장 불리한 구역: A 구역 (1명 토큰), C 구역 (3명 토큰)');
    expect(health).toHaveTextContent('도달 불가 구역: 2개 — A 구역 (1명 토큰), C 구역 (3명 토큰)');
    expect(nearest).toHaveTextContent('평균 이동 단위: 2.8 가상 단위');
    expect(nearest).toHaveTextContent('가장 긴 이동 단위: 3 가상 단위');
    expect(nearest).toHaveTextContent('도달 4 / 전체 4명 토큰');

    for (const [caption, expectedRows] of [
      ['도서관 개별 접근 경로', ['A 구역A → B2 가상 단위도달 가능', 'C 구역C → B3 가상 단위도달 가능']],
      ['건강 도움소 개별 접근 경로', ['A 구역경로 없음도달 불가도달 불가', 'C 구역경로 없음도달 불가도달 불가']],
      ['가장 가까운 시설 기준 접근 경로', ['A 구역A → B2 가상 단위도달 가능', 'C 구역C → B3 가상 단위도달 가능']],
    ] as const) {
      const disclosure = screen.getByText(`${caption} 확인`);
      disclosure.click();
      const table = screen.getByRole('table', { name: caption });
      expect(table.querySelector('caption')).toHaveTextContent(caption);
      const rows = within(table).getAllByRole('row');
      expect(rows).toHaveLength(expectedRows.length + 1);
      expectedRows.forEach((text, index) => expect(rows[index + 1]).toHaveTextContent(text));
    }
    expect(screen.getByRole('table', { name: '구역별 이동 경로 — 가장 가까운 시설 기준' })).toBeInTheDocument();
  });
});
