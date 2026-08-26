import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { analyzePlacement } from '../../engine/analyzePlacement';
import { tinyCity, tinyMission } from '../../../tests/fixtures/tinyCity';
import type { FacilityPlacement, PlacementAnalysis } from '../../domain/types';
import { ImpactAnalysis } from './ImpactAnalysis';

const placement: FacilityPlacement = { slotId: 'library-1', facilityKind: 'library', candidateId: 'candidate-b' };
const valid = analyzePlacement(tinyCity, tinyMission, [placement]);
const props = { city: tinyCity, mission: tinyMission, placements: [placement], onAnalysis: () => undefined, onInspectMetric: () => undefined };

afterEach(cleanup);

describe('ImpactAnalysis invalid input boundaries', () => {
  it.each([
    ['null', null],
    ['primitive', 7],
    ['sparse', (() => { const value = [placement]; delete value[0]; return value; })()],
    ['accessor', (() => { const value = [{}] as FacilityPlacement[]; Object.defineProperty(value[0], 'slotId', { get: () => { throw new Error('accessor'); } }); return value; })()],
  ])('fails closed for %s placements', (_label, placements) => {
    render(<ImpactAnalysis {...props} placements={placements as FacilityPlacement[]} analysis={valid} />);
    expect(screen.getByRole('heading', { name: '영향 분석실' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '영향 계산' })).toBeDisabled();
    expect(screen.getByRole('alert')).toHaveTextContent('미션·도시·시설 배치 자료가 올바르지 않아 결과를 표시할 수 없습니다.');
    expect(screen.queryByText(/평균 이동 단위:/)).not.toBeInTheDocument();
    expect(screen.queryByText(/-Infinity/)).not.toBeInTheDocument();
  });

  it('distinguishes not-yet-calculated from stale or fabricated analysis', () => {
    const { rerender } = render(<ImpactAnalysis {...props} analysis={null} />);
    expect(screen.getByRole('alert')).toHaveTextContent('아직 계산 전입니다');
    expect(screen.getByRole('button', { name: '영향 계산' })).toBeEnabled();

    const malformed = { ...valid, placements: null } as unknown as PlacementAnalysis;
    rerender(<ImpactAnalysis {...props} analysis={malformed} />);
    expect(screen.getByRole('alert')).toHaveTextContent('현재 배치와 일치하는 새 분석이 아닙니다');
    expect(screen.queryByText(/평균 이동 단위:/)).not.toBeInTheDocument();

    const fabricated = { ...valid, nearestFacilityAccess: { ...valid.nearestFacilityAccess, populationWeightedAverage: 999 } };
    rerender(<ImpactAnalysis {...props} analysis={fabricated} />);
    expect(screen.getByRole('alert')).toHaveTextContent('현재 배치와 일치하는 새 분석이 아닙니다');
    expect(screen.queryByText('999')).not.toBeInTheDocument();

    const missingFacility = { ...valid, perFacility: {} };
    rerender(<ImpactAnalysis {...props} analysis={missingFacility} />);
    expect(screen.getByRole('alert')).toHaveTextContent('현재 배치와 일치하는 새 분석이 아닙니다');
  });

  it('fails closed for a wrong mission context without rendering a coordinate or fake result', () => {
    const wrongMission = { ...tinyMission, cityId: 'maru' as const };
    render(<ImpactAnalysis {...props} mission={wrongMission} analysis={valid} />);
    expect(screen.getByRole('button', { name: '영향 계산' })).toBeDisabled();
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.queryByText(/현재 선택 좌표/)).not.toBeInTheDocument();
    expect(screen.queryByText(/가상 단위/)).not.toBeInTheDocument();
  });
});
