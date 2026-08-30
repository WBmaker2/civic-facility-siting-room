import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CITIES } from '../../domain/cities';
import { MISSIONS } from '../../domain/missions';
import { analyzePlacement } from '../../engine/analyzePlacement';
import type { LearningEvidence, ProposalSnapshot, ProposalAssessment } from '../../domain/types';
import { assessProposal } from '../../engine/assessProposal';
import { createProposalSnapshot, compareProposals } from './proposalComparison';
import { ResidentPerspective } from './ResidentPerspective';
import { AlternativeComparison } from './AlternativeComparison';

const placementsA = [{ slotId: 'library-1', facilityKind: 'library' as const, candidateId: 'mulbit-b2' }];
const placementsB = [{ slotId: 'library-1', facilityKind: 'library' as const, candidateId: 'mulbit-d3' }];
const mission = MISSIONS['bookmaru-library'];
const assessment: ProposalAssessment = {
  verdict: 'revise', conditionResults: [], priorityConsistent: false, missingEvidence: [], feedbackPrompts: [],
};
const evidence: LearningEvidence = { reviewedLayerIds: ['population', 'roads'], inspectedMetricIds: ['average', 'maximum'], selectedUnderservedZoneIds: ['mulbit-north'], comparedProposalIds: [] };
const snapshot = (label: 'A안' | 'B안', placements = placementsA): ProposalSnapshot => {
  const analysis = analyzePlacement(CITIES.mulbit, mission, placements);
  return createProposalSnapshot(label, placements, analysis, assessProposal(mission, 'access-equity', analysis, evidence));
};

afterEach(cleanup);

describe('proposal comparison', () => {
  it('shows a next-step message after only the canonical A proposal is saved', () => {
    render(<AlternativeComparison city={CITIES.mulbit} mission={mission} first={snapshot('A안')} second={null} comparison={null} />);
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(screen.getByText(/B안을 저장해 주세요/)).toBeInTheDocument();
  });

  it('freezes an immutable, identified snapshot and isolates source mutations', () => {
    const placements = placementsA.map((placement) => ({ ...placement }));
    const analysis = analyzePlacement(CITIES.mulbit, mission, placements);
    const result = createProposalSnapshot('A안', placements, analysis, assessment);
    placements[0] = { ...placements[0]!, candidateId: 'mulbit-c3' };
    analysis.placements[0]!.candidateId = 'mulbit-c3';
    expect(result.id).toBe('proposal-a');
    expect(result.label).toBe('A안');
    expect(Object.isFrozen(result)).toBe(true);
    expect(result.placements[0]!.candidateId).toBe('mulbit-b2');
    expect(() => createProposalSnapshot('C안' as 'A안', placementsA, analysis, assessment)).toThrow();
  });

  it('calculates B minus A deltas and named zone changes', () => {
    const comparison = compareProposals(snapshot('A안'), snapshot('B안', placementsB));
    expect(comparison).toEqual({
      firstProposalId: 'proposal-a', secondProposalId: 'proposal-b', averageDelta: 0.1, maximumDelta: 1,
      newlyReachedZoneIds: [], newlyUnreachableZoneIds: [], riskCountDelta: 0, costTokenDelta: 2,
      overlapCountDelta: 0, moreInconveniencedZoneIds: ['mulbit-hill', 'mulbit-north', 'mulbit-west'],
    });
    expect(() => compareProposals(snapshot('A안'), snapshot('A안'))).toThrow();
    expect(() => compareProposals(snapshot('B안', placementsB), snapshot('A안'))).toThrow();
  });

  it('rejects accessor snapshots without executing a conditionResults getter', () => {
    const first = snapshot('A안');
    const second = snapshot('B안', placementsB);
    let reads = 0;
    const assessmentWithGetter = { ...first.assessment };
    Object.defineProperty(assessmentWithGetter, 'conditionResults', {
      configurable: true,
      enumerable: true,
      get: () => {
        reads += 1;
        if (reads >= 3) throw new Error('reviewer getter failure');
        return first.assessment.conditionResults;
      },
    });
    const malformed = { ...first, assessment: assessmentWithGetter } as ProposalSnapshot;
    expect(() => compareProposals(malformed, second)).toThrow();
    render(<AlternativeComparison city={CITIES.mulbit} mission={mission} first={malformed} second={second} comparison={null} />);
    expect(reads).toBe(0);
    expect(screen.getByRole('alert')).toHaveTextContent('비교 자료를 표시할 수 없습니다');
  });

  it('reports exact newly reached and newly unreachable zone IDs for a disconnected island alternative', () => {
    const island = [{ slotId: 'library-1', facilityKind: 'library' as const, candidateId: 'mulbit-e5-island' }];
    const comparison = compareProposals(snapshot('A안', island), snapshot('B안', placementsA));
    expect(comparison.newlyReachedZoneIds).toEqual(['mulbit-central', 'mulbit-east', 'mulbit-hill', 'mulbit-north', 'mulbit-south', 'mulbit-west']);
    expect(comparison.newlyUnreachableZoneIds).toEqual([]);
    const first = snapshot('A안', island);
    const second = snapshot('B안', placementsA);
    render(<AlternativeComparison city={CITIES.mulbit} mission={mission} first={first} second={second} comparison={comparison} />);
    expect(screen.getByText(/새로 도달한 구역: 물빛 가운데 구역, 바람 동쪽 구역, 작은 언덕 구역, 햇살 북쪽 구역, 느티나무 남쪽 구역, 노을 서쪽 구역/)).toBeInTheDocument();
    expect(screen.getByText('새로 도달하지 못하게 된 구역: 없음')).toBeInTheDocument();
  });

  it('reports exact newly unreachable IDs and names when the alternative moves onto the island', () => {
    const island = [{ slotId: 'library-1', facilityKind: 'library' as const, candidateId: 'mulbit-e5-island' }];
    const comparison = compareProposals(snapshot('A안', placementsA), snapshot('B안', island));
    expect(comparison.newlyReachedZoneIds).toEqual([]);
    expect(comparison.newlyUnreachableZoneIds).toEqual(['mulbit-central', 'mulbit-east', 'mulbit-hill', 'mulbit-north', 'mulbit-south', 'mulbit-west']);
    render(<AlternativeComparison city={CITIES.mulbit} mission={mission} first={snapshot('A안')} second={snapshot('B안', island)} comparison={comparison} />);
    expect(screen.getByText('새로 도달한 구역: 없음')).toBeInTheDocument();
    expect(screen.getByText('새로 도달하지 못하게 된 구역: 물빛 가운데 구역, 바람 동쪽 구역, 작은 언덕 구역, 햇살 북쪽 구역, 느티나무 남쪽 구역, 노을 서쪽 구역')).toBeInTheDocument();
  });
});

describe('ResidentPerspective', () => {
  it('uses different reasons for different travel units and names the worst zone', () => {
    const city = { ...CITIES.mulbit, zones: CITIES.mulbit.zones.slice(0, 2) };
    const placements = [placementsA[0]!];
    const analysis = analyzePlacement(city, mission, placements);
    render(<ResidentPerspective city={city} mission={mission} placements={placements} analysis={analysis} selectedZoneId={null} onSelectZone={vi.fn()} canSave={false} onSaveA={vi.fn()} onRevise={vi.fn()} />);
    const rows = screen.getAllByRole('row').slice(1);
    expect(rows[0]).toHaveTextContent(/가장 불리한 구역/);
    expect(rows[0]?.querySelectorAll('td')[5]).not.toHaveTextContent(rows[1]?.querySelectorAll('td')[5]?.textContent ?? '');
  });

  it('requires a named zone and asks who is more inconvenienced', async () => {
    const user = userEvent.setup();
    const analysis = analyzePlacement(CITIES.mulbit, mission, placementsA);
    const onSelect = vi.fn<(zoneId: string) => void>();
    render(<ResidentPerspective city={CITIES.mulbit} mission={mission} placements={placementsA} analysis={analysis} selectedZoneId={null} onSelectZone={onSelect} canSave={false} onSaveA={() => undefined} onRevise={() => undefined} />);
    expect(screen.getByRole('heading', { name: '주민 관점표' })).toBeInTheDocument();
    expect(screen.getByText('누가 더 불편한가요?')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'A안 저장' })).toBeDisabled();
    expect(screen.getByText('사람 토큰')).toBeInTheDocument();
    expect(screen.getAllByText('이동 조건을 함께 살펴야 합니다').length).toBeGreaterThan(0);
    expect(screen.getByRole('table', { name: '구역별 주민 관점 비교' })).toHaveAttribute('aria-describedby', 'perspective-table-help');
    expect(document.querySelector('.perspective-table-wrap')).toHaveAttribute('data-sticky-column', 'true');
    await user.click(screen.getByRole('radio', { name: /느티나무 남쪽 구역/ }));
    expect(onSelect).toHaveBeenCalledWith('mulbit-south');
  });

  it('orders rows by unreachable, longest travel, then zone ID and exposes every evidence field', () => {
    const analysis = analyzePlacement(CITIES.mulbit, mission, placementsA);
    render(<ResidentPerspective city={CITIES.mulbit} mission={mission} placements={placementsA} analysis={analysis} selectedZoneId={null} onSelectZone={vi.fn()} canSave={false} onSaveA={vi.fn()} onRevise={vi.fn()} />);
    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(CITIES.mulbit.zones.length + 1);
    expect(rows.slice(1).map((row) => [...row.querySelectorAll('th,td')].map((cell) => cell.textContent))).toEqual([
      ['느티나무 남쪽 구역', '3 사람 토큰', '4 이동 단위', '도달 가능', '도서관', '도서관: 기준 안', '느티나무 남쪽 구역에서는 가장 긴 4 이동 단위가 필요해 가장 불리한 구역입니다.', '이동 조건을 함께 살펴야 합니다'],
      ['물빛 가운데 구역', '6 사람 토큰', '2 이동 단위', '도달 가능', '도서관', '도서관: 기준 안', '물빛 가운데 구역에서는 2 이동 단위가 필요해 이동 부담을 더 살펴야 합니다.', '추가 이동 조건 표지 없음'],
      ['바람 동쪽 구역', '4 사람 토큰', '3 이동 단위', '도달 가능', '도서관', '도서관: 기준 안', '바람 동쪽 구역에서는 3 이동 단위가 필요해 이동 부담을 더 살펴야 합니다.', '추가 이동 조건 표지 없음'],
      ['작은 언덕 구역', '2 사람 토큰', '3 이동 단위', '도달 가능', '도서관', '도서관: 기준 안', '작은 언덕 구역에서는 3 이동 단위가 필요해 이동 부담을 더 살펴야 합니다.', '추가 이동 조건 표지 없음'],
      ['햇살 북쪽 구역', '5 사람 토큰', '2 이동 단위', '도달 가능', '도서관', '도서관: 기준 안', '햇살 북쪽 구역에서는 2 이동 단위가 필요해 이동 부담을 더 살펴야 합니다.', '이동 조건을 함께 살펴야 합니다'],
      ['노을 서쪽 구역', '4 사람 토큰', '3 이동 단위', '도달 가능', '도서관', '도서관: 기준 안', '노을 서쪽 구역에서는 3 이동 단위가 필요해 이동 부담을 더 살펴야 합니다.', '추가 이동 조건 표지 없음'],
    ]);
    for (const heading of ['사람 토큰', '이동 단위', '도달 여부', '기존 혜택', '새 혜택', '불편 이유', '이동 조건']) {
      expect(screen.getByRole('columnheader', { name: heading })).toBeInTheDocument();
    }
    expect(screen.getAllByText(/이동 단위가 필요해 이동 부담을 더 살펴야 합니다/).length).toBeGreaterThan(0);
    expect(screen.getAllByText('추가 이동 조건 표지 없음').length).toBeGreaterThan(0);
  });

  it('filters unrelated existing coverage for the selected mission', () => {
    const healthMission = MISSIONS['health-help-center'];
    const healthPlacement = [{ slotId: 'health-support-1', facilityKind: 'health-support' as const, candidateId: 'maru-b2' }];
    const analysis = analyzePlacement(CITIES.maru, healthMission, healthPlacement);
    render(<ResidentPerspective city={CITIES.maru} mission={healthMission} placements={healthPlacement} analysis={analysis} selectedZoneId={null} onSelectZone={vi.fn()} canSave={false} onSaveA={vi.fn()} onRevise={vi.fn()} />);
    const hillRow = screen.getAllByRole('row').find((row) => row.textContent?.includes('바람 언덕 구역'));
    expect(hillRow?.querySelectorAll('th,td')[4]?.textContent).toBe('기존 혜택 없음');
  });

  it('fails closed for malformed comparison props while rendering valid comparison', () => {
    const first = snapshot('A안');
    const second = snapshot('B안', placementsB);
    const comparison = compareProposals(first, second);
    expect(() => render(<AlternativeComparison city={{} as never} mission={{} as never} first={first} second={second} comparison={comparison} />)).not.toThrow();
    expect(screen.getByRole('alert')).toHaveTextContent('비교 자료를 표시할 수 없습니다');
    cleanup();
    for (const malformed of [
      { city: {} as never }, { mission: {} as never }, { first: {} as never }, { second: {} as never }, { comparison: {} as never },
      { city: { ...CITIES.maru, candidates: [null] } as never },
      { city: { ...CITIES.maru, zones: [null] } as never },
      { city: { ...CITIES.maru, roads: [null] } as never },
      { mission: { ...mission, conditions: [null] } as never },
      { mission: { ...mission, facilityKinds: [null] } as never },
    ]) {
      expect(() => render(<AlternativeComparison city={malformed.city ?? CITIES.mulbit} mission={malformed.mission ?? mission} first={malformed.first ?? first} second={malformed.second ?? second} comparison={malformed.comparison ?? comparison} />)).not.toThrow();
      expect(screen.getByRole('alert')).toHaveTextContent('비교 자료를 표시할 수 없습니다');
      cleanup();
    }
    render(<AlternativeComparison city={CITIES.mulbit} mission={mission} first={first} second={second} comparison={comparison} />);
    expect(screen.getByRole('heading', { name: 'A안과 B안 비교' })).toBeInTheDocument();
    expect(screen.getByRole('group', { name: 'A안 공개 조건 결과' })).toBeInTheDocument();
    expect(screen.getByRole('group', { name: 'B안 공개 조건 결과' })).toBeInTheDocument();
    expect(screen.getAllByText(/예산 토큰 3개 안에 놓기/).length).toBeGreaterThan(0);
    expect(screen.getByText('도서관: 느린 강변 터 (B2)')).toBeInTheDocument();
    expect(screen.getByText('도서관: 푸른길 터 (D3)')).toBeInTheDocument();
    const columns = [...document.querySelectorAll('.proposal-column')];
    expect(columns.map((column) => [...column.querySelectorAll('dl > div')].map((row) => [row.querySelector('dt')?.textContent, row.querySelector('dd')?.textContent]))).toEqual([
      [['평균 이동', '2.7 이동 단위'], ['최대 이동', '4.0 이동 단위'], ['도달 불가', '0곳'], ['위험 후보', '0곳'], ['비용', '1 토큰'], ['기존 시설 중복', '6곳']],
      [['평균 이동', '2.8 이동 단위'], ['최대 이동', '5.0 이동 단위'], ['도달 불가', '0곳'], ['위험 후보', '0곳'], ['비용', '3 토큰'], ['기존 시설 중복', '6곳']],
    ]);
    expect(screen.getByText('예산 토큰 3개 안에 놓기: 충족 — 배치 비용 1토큰 / 공개 한도 3토큰입니다.')).toBeInTheDocument();
    expect(screen.getByText('예산 토큰 3개 안에 놓기: 충족 — 배치 비용 3토큰 / 공개 한도 3토큰입니다.')).toBeInTheDocument();
    expect(screen.getAllByText('도달 불가 구역 없이 놓기: 충족 — 도달 불가 구역 0곳 / 공개 한도 0곳입니다.')).toHaveLength(2);
    expect(screen.getByText('가장 먼 구역 이동 단위 7 이하: 충족 — 가장 긴 이동 단위 4 / 공개 한도 7입니다.')).toBeInTheDocument();
    expect(screen.getByText('가장 먼 구역 이동 단위 7 이하: 충족 — 가장 긴 이동 단위 5 / 공개 한도 7입니다.')).toBeInTheDocument();
    expect(screen.getAllByText('위험 표지가 없는 터 선택하기: 충족 — 위험 표지가 있는 선택 터 0곳 / 공개 한도 0곳입니다.')).toHaveLength(2);
    expect(screen.getByText('비용 우선 기준은 2토큰 이하: 충족 — 비용 1토큰 / 우선 기준 공개 한도 2토큰입니다.')).toBeInTheDocument();
    expect(screen.getByText('비용 우선 기준은 2토큰 이하: 미충족 — 비용 3토큰 / 우선 기준 공개 한도 2토큰입니다.')).toBeInTheDocument();
    expect(screen.getByText(/평균 이동 변화: \+0\.1 이동 단위/)).toBeInTheDocument();
    expect(screen.getByText(/최대 이동 변화: \+1 이동 단위/)).toBeInTheDocument();
    expect(screen.getByText(/위험 후보 변화: 0곳/)).toBeInTheDocument();
    expect(screen.getByText(/비용 변화: \+2 토큰/)).toBeInTheDocument();
    expect(screen.getByText(/기존 시설 중복 변화: 0곳/)).toBeInTheDocument();
    expect(screen.getByText(/B안에서 더 불편해진 구역: 작은 언덕 구역, 햇살 북쪽 구역, 노을 서쪽 구역/)).toBeInTheDocument();
  });

  it('rejects non-standard arrays and malformed assessment arrays at the snapshot boundary', () => {
    const analysis = analyzePlacement(CITIES.mulbit, mission, placementsA);
    const malformed = Object.assign([], { '01': placementsA[0] });
    expect(() => createProposalSnapshot('A안', malformed as never, analysis, assessment)).toThrow();
    const accessor = [...placementsA];
    Object.defineProperty(accessor, '0', { configurable: true, enumerable: true, get: () => placementsA[0] });
    expect(() => createProposalSnapshot('A안', accessor, analysis, assessment)).toThrow();
    const forgedAssessment = { ...assessment, missingEvidence: Object.assign([], { extra: '위조' }) };
    expect(() => createProposalSnapshot('A안', placementsA, analysis, forgedAssessment)).toThrow();
  });
});
