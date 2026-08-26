import { describe, expect, it } from 'vitest';
import { CITIES } from '../domain/cities';
import { MISSIONS } from '../domain/missions';
import type { FacilityPlacement, PlacementAnalysis } from '../domain/types';
import { analyzePlacement } from './analyzePlacement';
import { validatePlacementAnalysis } from './validatePlacementAnalysis';

const placement: FacilityPlacement = {
  slotId: 'library-1', facilityKind: 'library', candidateId: 'mulbit-c3',
};

const reorder = <T>(value: T): T => {
  if (Array.isArray(value)) return value.map(reorder) as T;
  if (value !== null && typeof value === 'object' && (Object.getPrototypeOf(value) === Object.prototype || Object.getPrototypeOf(value) === null)) {
    const entries = Object.entries(value).reverse().map(([key, item]) => [key, reorder(item)]);
    const copy = Object.getPrototypeOf(value) === null ? Object.create(null) : {};
    for (const [key, item] of entries) copy[key] = item;
    return copy as T;
  }
  return value;
};

describe('validatePlacementAnalysis', () => {
  it('accepts a frozen analysis with different object insertion order without mutating inputs', () => {
    const city = CITIES.mulbit;
    const mission = MISSIONS['bookmaru-library'];
    const placements = Object.freeze([placement]);
    const expected = analyzePlacement(city, mission, [...placements]);
    const reordered = reorder(expected);
    const before = JSON.stringify(placements);
    expect(validatePlacementAnalysis(city, mission, placements, reordered)).toBe(true);
    expect(JSON.stringify(placements)).toBe(before);
  });

  it.each([
    ['null placements', null],
    ['primitive placements', 42],
    ['sparse placements', (() => { const value = [placement]; delete value[0]; return value; })()],
  ])('rejects %s without throwing', (_label, placements) => {
    const analysis = analyzePlacement(CITIES.mulbit, MISSIONS['bookmaru-library'], [placement]);
    expect(() => validatePlacementAnalysis(CITIES.mulbit, MISSIONS['bookmaru-library'], placements, analysis)).not.toThrow();
    expect(validatePlacementAnalysis(CITIES.mulbit, MISSIONS['bookmaru-library'], placements, analysis)).toBe(false);
  });

  it('rejects accessor placements and extra non-enumerable analysis fields', () => {
    const analysis = analyzePlacement(CITIES.mulbit, MISSIONS['bookmaru-library'], [placement]);
    const accessor = {} as FacilityPlacement;
    Object.defineProperties(accessor, {
      slotId: { get: () => { throw new Error('accessor'); } },
      facilityKind: { value: 'library' },
      candidateId: { value: 'mulbit-c3' },
    });
    expect(validatePlacementAnalysis(CITIES.mulbit, MISSIONS['bookmaru-library'], [accessor], analysis)).toBe(false);
    const extra = { ...analysis } as PlacementAnalysis & { extra?: boolean };
    Object.defineProperty(extra, 'extra', { value: true });
    expect(validatePlacementAnalysis(CITIES.mulbit, MISSIONS['bookmaru-library'], [placement], extra)).toBe(false);
  });
});
