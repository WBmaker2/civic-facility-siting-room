import { describe, expect, it } from 'vitest';
import { explainCalculation } from './explainCalculation';
import { analyzePlacement } from './analyzePlacement';
import { tinyCity, tinyCityWithUnreachableZone, tinyMission } from '../../tests/fixtures/tinyCity';

describe('explainCalculation', () => {
  it('discloses formulas, denominators, names, and virtual-unit boundary in Korean', () => {
    const analysis = analyzePlacement(tinyCityWithUnreachableZone, tinyMission, [
      { slotId: 'library-1', facilityKind: 'library', candidateId: 'candidate-b' },
    ]);
    const rows = explainCalculation(analysis, tinyCityWithUnreachableZone);
    const text = rows.map((row) => `${row.label} ${row.value} ${row.explanation}`).join('\n');

    expect(rows.map((row) => row.label)).toEqual([
      '평균 이동 단위',
      '가장 긴 이동 단위',
      '도달 불가',
      '이동이 어려운 구역',
      '위험 표지',
      '예산',
    ]);
    expect(text).toContain('2 × 1 + 3 × 3');
    expect(text).toContain('4 / 5');
    expect(text).toContain('z3');
    expect(text).toContain('candidate-b');
    expect(text).toContain('2 / 3');
    expect(text).toContain('가상 단위');
  });

  it('uses the actual budget from mission context even when mission ID is unchanged', () => {
    const analysis = analyzePlacement(tinyCity, { ...tinyMission, budgetTokens: 9 }, [
      { slotId: 'library-1', facilityKind: 'library', candidateId: 'candidate-b' },
    ]);
    const budget = explainCalculation(analysis, tinyCity).find((row) => row.label === '예산');
    expect(budget?.value).toBe('2 / 9 토큰');
    expect(budget?.explanation).toContain('예산 9 토큰');
  });

  it('includes conditional rows only when the analysis has the relevant zones or condition', () => {
    const noMobilityCity = {
      ...tinyCity,
      zones: tinyCity.zones.map((zone) => ({ ...zone, mobilityBarrier: false })),
    };
    const noConditionalRows = explainCalculation(
      analyzePlacement(noMobilityCity, tinyMission, [
        { slotId: 'library-1', facilityKind: 'library', candidateId: 'candidate-b' },
      ]),
      noMobilityCity,
    );
    expect(noConditionalRows.map((row) => row.label)).not.toContain('이동이 어려운 구역');
    expect(noConditionalRows.map((row) => row.label)).not.toContain('기존 시설 중복·공백');

    const coverageMission = { ...tinyMission, conditions: [
      ...tinyMission.conditions,
      { code: 'COVERAGE_GAP_WITHIN_LIMIT' as const, label: '공백 한 곳 이하', required: true, numericLimit: 1 },
    ], serviceThreshold: 4 };
    const coverageAnalysis = analyzePlacement(tinyCityWithUnreachableZone, coverageMission, [
      { slotId: 'library-1', facilityKind: 'library', candidateId: 'candidate-risk' },
    ]);
    const rows = explainCalculation(coverageAnalysis, tinyCityWithUnreachableZone);
    const text = rows.map((row) => `${row.label} ${row.value} ${row.explanation}`).join('\n');
    expect(rows.map((row) => row.label)).toContain('이동이 어려운 구역');
    expect(rows.map((row) => row.label)).toContain('기존 시설 중복·공백');
    expect(text).toContain('water-ponding');
    expect(text).toContain('물 고임 표지');
    expect(text).toContain('4');
    expect(text).toContain('library');
    expect(text).toContain('기존 시설');
    expect(text).toContain('새 시설');
  });
});
