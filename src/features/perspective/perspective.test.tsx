import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CITIES } from '../../domain/cities';
import { MISSIONS } from '../../domain/missions';
import { analyzePlacement } from '../../engine/analyzePlacement';
import type { ProposalSnapshot, ProposalAssessment } from '../../domain/types';
import { createProposalSnapshot, compareProposals } from './proposalComparison';
import { ResidentPerspective } from './ResidentPerspective';

const placementsA = [{ slotId: 'library-1', facilityKind: 'library' as const, candidateId: 'mulbit-b2' }];
const placementsB = [{ slotId: 'library-1', facilityKind: 'library' as const, candidateId: 'mulbit-d3' }];
const mission = MISSIONS['bookmaru-library'];
const assessment: ProposalAssessment = {
  verdict: 'revise', conditionResults: [], priorityConsistent: false, missingEvidence: [], feedbackPrompts: [],
};
const snapshot = (label: 'A안' | 'B안', placements = placementsA): ProposalSnapshot => {
  const analysis = analyzePlacement(CITIES.mulbit, mission, placements);
  return createProposalSnapshot(label, placements, analysis, assessment);
};

afterEach(cleanup);

describe('proposal comparison', () => {
  it('freezes an immutable, identified snapshot and isolates source mutations', () => {
    const placements = [...placementsA];
    const analysis = analyzePlacement(CITIES.mulbit, mission, placements);
    const result = createProposalSnapshot('A안', placements, analysis, assessment);
    placements[0]!.candidateId = 'mulbit-c3';
    analysis.placements[0]!.candidateId = 'mulbit-c3';
    expect(result.id).toBe('proposal-a');
    expect(result.label).toBe('A안');
    expect(Object.isFrozen(result)).toBe(true);
    expect(result.placements[0]!.candidateId).toBe('mulbit-b2');
    expect(() => createProposalSnapshot('C안' as 'A안', placementsA, analysis, assessment)).toThrow();
  });

  it('calculates B minus A deltas and named zone changes', () => {
    const comparison = compareProposals(snapshot('A안'), snapshot('B안', placementsB));
    expect(comparison.firstProposalId).toBe('proposal-a');
    expect(comparison.secondProposalId).toBe('proposal-b');
    expect(comparison.averageDelta).toBeTypeOf('number');
    expect(comparison.maximumDelta).toBeTypeOf('number');
    expect(comparison.riskCountDelta).toBeTypeOf('number');
    expect(comparison.costTokenDelta).toBeTypeOf('number');
    expect(comparison.overlapCountDelta).toBeTypeOf('number');
    expect(() => compareProposals(snapshot('A안'), snapshot('A안'))).toThrow();
  });
});

describe('ResidentPerspective', () => {
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
    await user.click(screen.getByRole('radio', { name: /느티나무 남쪽 구역/ }));
    expect(onSelect).toHaveBeenCalledWith('mulbit-south');
  });

  it('orders rows by unreachable, longest travel, then zone ID and exposes every evidence field', () => {
    const analysis = analyzePlacement(CITIES.mulbit, mission, placementsA);
    render(<ResidentPerspective city={CITIES.mulbit} mission={mission} placements={placementsA} analysis={analysis} selectedZoneId={null} onSelectZone={vi.fn()} canSave={false} onSaveA={vi.fn()} onRevise={vi.fn()} />);
    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(CITIES.mulbit.zones.length + 1);
    expect(rows.slice(1).map((row) => row.querySelector('th')?.textContent)).toEqual([
      '햇살 북쪽 구역', '물빛 가운데 구역', '바람 동쪽 구역', '작은 언덕 구역', '느티나무 남쪽 구역', '노을 서쪽 구역',
    ]);
    expect(rows[1]?.querySelectorAll('th,td')).toHaveLength(8);
    for (const heading of ['사람 토큰', '이동 단위', '도달 여부', '기존 혜택', '새 혜택', '불편 이유', '이동 조건']) {
      expect(screen.getByRole('columnheader', { name: heading })).toBeInTheDocument();
    }
    expect(screen.getAllByText('도로 연결과 선택한 위치 때문에 이동이 더 어렵습니다').length).toBeGreaterThan(0);
    expect(screen.getAllByText('추가 이동 조건 표지 없음').length).toBeGreaterThan(0);
  });
});
