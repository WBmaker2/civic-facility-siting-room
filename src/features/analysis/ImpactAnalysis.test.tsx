import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { analyzePlacement } from '../../engine/analyzePlacement';
import { explainCalculation } from '../../engine/explainCalculation';
import { tinyCity, tinyCityWithUnreachableZone, tinyMission } from '../../../tests/fixtures/tinyCity';
import type { PlacementAnalysis } from '../../domain/types';
import { ImpactAnalysis } from './ImpactAnalysis';

const placement = { slotId: 'library-1', facilityKind: 'library' as const, candidateId: 'candidate-b' };
const analysisFor = (city = tinyCity): PlacementAnalysis => analyzePlacement(city, tinyMission, [placement]);

afterEach(() => {
  cleanup();
  Reflect.deleteProperty(window, 'matchMedia');
});

describe('ImpactAnalysis', () => {
  it('locks resident view until both travel result cards are checked and describes why', () => {
    const analysis = analysisFor();
    const { rerender } = render(<ImpactAnalysis city={tinyCity} mission={tinyMission} placements={[placement]} analysis={analysis} onAnalysis={vi.fn()} onInspectMetric={vi.fn()} currentAction="inspect-impact-metrics" />);
    const resident = screen.getByRole('button', { name: '주민 관점표로 이동' });
    expect(resident).toBeDisabled();
    expect(resident).toHaveAttribute('aria-describedby', 'resident-view-help');
    expect(screen.getByText('두 결과 카드를 눌러 확인하세요.')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /평균 이동 단위/ })[0]).toHaveAttribute('data-guided', 'true');
    expect(screen.getAllByRole('button', { name: /가장 긴 이동 단위/ })[0]).toHaveAttribute('data-guided', 'true');
    expect(screen.getAllByRole('button', { name: /평균 이동 단위/ })[0]).toHaveClass('gi-pulse');
    expect(screen.getAllByRole('button', { name: /가장 긴 이동 단위/ })[0]).toHaveClass('gi-pulse');
    rerender(<ImpactAnalysis city={tinyCity} mission={tinyMission} placements={[placement]} analysis={analysis} onAnalysis={vi.fn()} onInspectMetric={vi.fn()} canOpenResident currentAction={null} />);
    expect(screen.getByRole('button', { name: '주민 관점표로 이동' })).toBeEnabled();
  });

  it('shows one plain empty result for each zero-count constraint', () => {
    const city = { ...tinyCity, zones: tinyCity.zones.map((zone) => ({ ...zone, existingCoverage: [] })), existingFacilities: [] };
    const analysis = analysisFor(city);
    render(<ImpactAnalysis city={city} mission={tinyMission} placements={[placement]} analysis={analysis} onAnalysis={vi.fn()} onInspectMetric={vi.fn()} />);
    const overlap = screen.getByRole('heading', { name: '기존 시설 중복' }).closest('section');
    const gap = screen.getByRole('heading', { name: '서비스 공백' }).closest('section');
    expect(within(overlap!).getByText('없음')).toBeInTheDocument();
    expect(within(overlap!).queryByText(/없음없음/)).not.toBeInTheDocument();
    expect(within(gap!).getByText('없음')).toBeInTheDocument();
    expect(within(gap!).queryByText(/없음없음/)).not.toBeInTheDocument();
  });

  it('shows exact access evidence, named zones, separate constraints, and calculation basis', () => {
    const analysis = analysisFor(tinyCityWithUnreachableZone);
    render(<ImpactAnalysis city={tinyCityWithUnreachableZone} mission={tinyMission} placements={[placement]} analysis={analysis} onAnalysis={vi.fn()} onInspectMetric={vi.fn()} />);
    expect(screen.getByRole('heading', { name: '영향 분석실' })).toBeInTheDocument();
    const overall = screen.getByRole('heading', { name: '전체 주민 접근' }).closest('section');
    expect(overall).not.toBeNull();
    expect(within(overall!).getByRole('group', { name: '전체 주민 접근 자세히 보기' })).toBeInTheDocument();
    expect(within(overall!).getByRole('button', { name: '평균 이동 단위: 2.8 가상 단위' })).toBeInTheDocument();
    expect(within(overall!).getByRole('button', { name: '가장 긴 이동 단위: 3 가상 단위' })).toBeInTheDocument();
    expect(within(overall!).getByText('사람 토큰 분모:').parentElement).toHaveTextContent('도달 4 / 전체 5명 토큰');
    expect(screen.getByText(/\(2 × 1 \+ 3 × 3\) ÷ 4명 토큰 = 2.8/)).toBeInTheDocument();
    expect(screen.getByText(/도달 불가 구역은 평균에서 숨기지 않고 따로 표시했습니다/)).toBeInTheDocument();
    expect(within(overall!).getByText('가장 불리한 구역:').parentElement).toHaveTextContent('D 구역 (1명 토큰)');
    expect(screen.queryByText('z3')).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '위험' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '비용' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '기존 시설 중복' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '서비스 공백' })).toBeInTheDocument();
    expect(screen.getAllByText(/교육용 상대 단위로 계산했습니다/)).toHaveLength(2);
    expect(screen.queryByText(/최적 위치|정답 위치|candidate rank|score|종합점수/i)).not.toBeInTheDocument();
    expect(screen.getByRole('definition', { name: '평균 이동 단위' })).toBeInTheDocument();
    screen.getByText('구역별 이동 경로 확인').click();
    const pathTable = screen.getByRole('table', { name: /구역별 이동 경로/ });
    expect(pathTable).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: '구역' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: '노드 경로' })).toBeInTheDocument();
    const pathRows = within(pathTable).getAllByRole('row');
    expect(pathRows).toHaveLength(4);
    expect(pathRows[1]).toHaveTextContent('A 구역A → B2 가상 단위도달 가능');
    expect(pathRows[2]).toHaveTextContent('C 구역C → B3 가상 단위도달 가능');
    expect(pathRows[3]).toHaveTextContent('D 구역경로 없음도달 불가도달 불가');
  });

  it('uses mobilityBarrierAccess for health missions and records evidence on focus and click once', async () => {
    const city = { ...tinyCity, zones: tinyCity.zones.map((zone) => ({ ...zone, name: zone.id === 'z1' ? '이동 어려움 구역' : zone.name })) };
    const mission = { ...tinyMission, id: 'health-help-center' as const, title: '건강 도움소', facilityKinds: ['health-support' as const] };
    const healthPlacement = { slotId: 'health-support-1', facilityKind: 'health-support' as const, candidateId: 'candidate-b' };
    const analysis = analyzePlacement(city, mission, [healthPlacement]);
    const onInspectMetric = vi.fn();
    render(<ImpactAnalysis city={city} mission={mission} placements={[healthPlacement]} analysis={analysis} onAnalysis={vi.fn()} onInspectMetric={onInspectMetric} />);
    const average = screen.getAllByRole('button', { name: /평균 이동 단위/ })[0]!;
    fireEvent.focus(average);
    expect(onInspectMetric).toHaveBeenCalledWith('average');
    fireEvent.click(average);
    expect(onInspectMetric).toHaveBeenCalledWith('average');
    expect(onInspectMetric).toHaveBeenCalledTimes(2);
    const mobility = screen.getByRole('heading', { name: '이동이 어려운 구역' }).closest('section');
    expect(mobility).not.toBeNull();
    expect(mobility).toHaveTextContent('평균 이동 단위: 2.0 가상 단위');
    expect(mobility).toHaveTextContent('가장 긴 이동 단위: 2 가상 단위');
    expect(mobility).toHaveTextContent('도달 1 / 전체 1명 토큰');
    expect(mobility).toHaveTextContent('사람 토큰 분모');
  });

  it('calls analyzePlacement through the calculate action only when placements are complete', async () => {
    const onAnalysis = vi.fn();
    render(<ImpactAnalysis city={tinyCity} mission={tinyMission} placements={[placement]} analysis={null} onAnalysis={onAnalysis} onInspectMetric={vi.fn()} />);
    const calculate = screen.getByRole('button', { name: '영향 계산' });
    expect(calculate).toBeEnabled();
    await userEvent.click(calculate);
    expect(onAnalysis).toHaveBeenCalledTimes(1);
    expect(onAnalysis.mock.calls[0]?.[0]).toEqual(analysisFor());
    expect(screen.getByRole('status')).toHaveTextContent('영향 계산이 완료되었습니다. 평균, 가장 긴 이동, 도달 불가, 위험, 비용을 함께 확인하세요.');
  });

  it('shows risk kind and label separately from exact per-site cost and budget', () => {
    const riskyPlacement = { ...placement, candidateId: 'candidate-risk' };
    const analysis = analyzePlacement(tinyCity, tinyMission, [riskyPlacement]);
    render(<ImpactAnalysis city={tinyCity} mission={tinyMission} placements={[riskyPlacement]} analysis={analysis} onAnalysis={vi.fn()} onInspectMetric={vi.fn()} />);
    const risk = screen.getByRole('heading', { name: '위험' }).closest('section');
    const cost = screen.getByRole('heading', { name: '비용' }).closest('section');
    expect(risk).not.toBeNull();
    expect(cost).not.toBeNull();
    expect(within(risk!).getByRole('button', { name: '위험: 1곳' })).toBeInTheDocument();
    expect(risk).toHaveTextContent('water-ponding · 물 고임 · 물 고임 표지');
    expect(within(cost!).getByRole('button', { name: '비용: 3 / 3 토큰' })).toBeInTheDocument();
    expect(cost).toHaveTextContent('터 candidate-risk 3토큰');
    expect(screen.getByRole('definition', { name: '예산' })).toHaveTextContent('3 / 3 토큰');
  });

  it('routes each evidence card focus and click to its exact metric once per gesture', () => {
    const riskyPlacement = { ...placement, candidateId: 'candidate-risk' };
    const analysis = analyzePlacement(tinyCity, tinyMission, [riskyPlacement]);
    const onInspectMetric = vi.fn();
    render(<ImpactAnalysis city={tinyCity} mission={tinyMission} placements={[riskyPlacement]} analysis={analysis} onAnalysis={vi.fn()} onInspectMetric={onInspectMetric} />);
    const overall = screen.getByRole('heading', { name: '전체 주민 접근' }).closest('section');
    const risk = screen.getByRole('heading', { name: '위험' }).closest('section');
    const cost = screen.getByRole('heading', { name: '비용' }).closest('section');
    const cards = [
      [within(overall!).getByRole('button', { name: '평균 이동 단위: 1.3 가상 단위' }), 'average'],
      [within(overall!).getByRole('button', { name: '가장 긴 이동 단위: 5 가상 단위' }), 'maximum'],
      [within(overall!).getByRole('button', { name: '도달 불가: 0개 구역' }), 'unreachable'],
      [within(risk!).getByRole('button', { name: '위험: 1곳' }), 'risk'],
      [within(cost!).getByRole('button', { name: '비용: 3 / 3 토큰' }), 'cost'],
    ] as const;
    for (const [button, metricId] of cards) {
      fireEvent.focus(button);
      expect(onInspectMetric).toHaveBeenLastCalledWith(metricId);
      fireEvent.click(button);
      expect(onInspectMetric).toHaveBeenLastCalledWith(metricId);
    }
    expect(onInspectMetric).toHaveBeenCalledTimes(10);
    expect(onInspectMetric.mock.calls.map(([metricId]) => metricId)).toEqual([
      'average', 'average', 'maximum', 'maximum', 'unreachable', 'unreachable', 'risk', 'risk', 'cost', 'cost',
    ]);
    const ids = [...document.querySelectorAll('[id^="metric-detail-"]')].map((node) => node.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('renders selection and results tabs with coordinates on narrow layouts', () => {
    Object.defineProperty(window, 'matchMedia', { configurable: true, value: (query: string) => ({ matches: query.includes('max-width: 600px'), media: query, onchange: null, addEventListener: vi.fn(), removeEventListener: vi.fn(), addListener: vi.fn(), removeListener: vi.fn(), dispatchEvent: vi.fn() }) });
    render(<ImpactAnalysis city={tinyCity} mission={tinyMission} placements={[placement]} analysis={analysisFor()} onAnalysis={vi.fn()} onInspectMetric={vi.fn()} />);
    expect(screen.getByRole('tab', { name: '선택 위치' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: '결과표' })).toBeInTheDocument();
    expect(screen.getAllByText('현재 선택 좌표: B')).toHaveLength(1);
  });

  it('renders every calculation row and keeps per-facility and nearest roles separate for combined review', () => {
    const mission = { ...tinyMission, id: 'combined-review' as const, facilityKinds: ['library', 'health-support'] as Array<'library' | 'health-support'> };
    const placements = [placement, { slotId: 'health-support-1', facilityKind: 'health-support' as const, candidateId: 'candidate-d' }];
    const analysis = analyzePlacement(tinyCity, mission, placements);
    render(<ImpactAnalysis city={tinyCity} mission={mission} placements={placements} analysis={analysis} onAnalysis={vi.fn()} onInspectMetric={vi.fn()} />);
    for (const row of explainCalculation(analysis, tinyCity)) expect(screen.getByRole('definition', { name: row.label })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /도서관.*개별 접근/ })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /건강 도움소.*개별 접근/ })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '가장 가까운 시설 기준' })).toBeInTheDocument();
  });
});
