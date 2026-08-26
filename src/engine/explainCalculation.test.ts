import { describe, expect, it } from 'vitest';
import { explainCalculation } from './explainCalculation';
import { analyzePlacement } from './analyzePlacement';
import { tinyCityWithUnreachableZone, tinyMission } from '../../tests/fixtures/tinyCity';

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
      '기존 시설 중복·공백',
    ]);
    expect(text).toContain('2 × 1 + 3 × 3');
    expect(text).toContain('4 / 5');
    expect(text).toContain('z3');
    expect(text).toContain('A 구역');
    expect(text).toContain('candidate-b');
    expect(text).toContain('2 / 3');
    expect(text).toContain('가상 단위');
  });
});
