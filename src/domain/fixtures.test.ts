import { describe, expect, it } from 'vitest';
import { CITIES } from './cities';
import { MISSIONS } from './missions';
import { MODEL_LIMIT_NOTICE } from '../content/learnerCopy';
import { validateCity } from './cities/validateCity';

describe('fictional learning fixtures', () => {
  it('exposes exactly two fictional cities and four missions', () => {
    expect(Object.keys(CITIES).sort()).toEqual(['maru', 'mulbit']);
    expect(Object.keys(MISSIONS).sort()).toEqual([
      'bookmaru-library',
      'combined-review',
      'health-help-center',
      'living-culture-center',
    ]);
  });

  it('validates both 5 by 5 city scenarios', () => {
    for (const city of Object.values(CITIES)) {
      expect(city.rows).toBe(5);
      expect(city.columns).toBe(5);
      expect(city.zones).toHaveLength(6);
      expect(city.candidates.length).toBeGreaterThanOrEqual(5);
      expect(city.existingFacilities.length).toBeGreaterThanOrEqual(1);
      expect(city.virtualDataNotice).toBe(MODEL_LIMIT_NOTICE);
      expect(validateCity(city)).toEqual([]);
    }
  });

  it('covers the named observable fixture cases', () => {
    expect(CITIES.mulbit.candidates.map((site) => site.id)).toEqual(
      expect.arrayContaining(['mulbit-b2', 'mulbit-c3', 'mulbit-c4', 'mulbit-d3', 'mulbit-a4-water', 'mulbit-e5-island']),
    );
    expect(CITIES.maru.candidates.map((site) => site.id)).toEqual(
      expect.arrayContaining(['maru-b2', 'maru-c2', 'maru-d3', 'maru-e3', 'maru-a5-slope', 'maru-e1-premium']),
    );
    expect(CITIES.mulbit.riskMarkers.map((marker) => marker.nodeId)).toContain('mulbit-a4');
    expect(CITIES.maru.riskMarkers.map((marker) => marker.nodeId)).toContain('maru-a5');
    expect(CITIES.mulbit.existingFacilities.some((facility) => facility.facilityKind === 'culture-center')).toBe(true);
    expect(MISSIONS['bookmaru-library'].cityId).toBe('mulbit');
    expect(MISSIONS['health-help-center'].cityId).toBe('maru');
    expect(MISSIONS['living-culture-center'].cityId).toBe('mulbit');
    expect(MISSIONS['combined-review'].cityId).toBe('maru');
  });

  it('keeps identifiers, coordinates, links, costs, and public layers deterministic', () => {
    const layerIds = ['population', 'roads', 'risk', 'cost', 'existing-facilities'];
    for (const city of Object.values(CITIES)) {
      expect(new Set(city.nodes.map((node) => node.label)).size).toBe(city.nodes.length);
      for (const collection of [city.zones, city.candidates, city.existingFacilities]) {
        expect(new Set(collection.map((item) => item.id)).size).toBe(collection.length);
      }
      expect(new Set(city.riskMarkers.map((marker) => marker.nodeId)).size).toBe(city.riskMarkers.length);
      for (const edge of city.roads) {
        expect(Number.isInteger(edge.travelUnits)).toBe(true);
        expect(edge.travelUnits).toBeGreaterThan(0);
        expect(Object.keys(edge)).not.toEqual(expect.arrayContaining(['address', 'locality', 'gps']));
      }
      for (const candidate of city.candidates) {
        expect([1, 2, 3]).toContain(candidate.costTokens);
        expect(Object.keys(candidate)).not.toEqual(expect.arrayContaining(['address', 'locality', 'gps']));
      }
    }
    for (const mission of Object.values(MISSIONS)) {
      expect(mission.requiredLayers).toEqual(layerIds);
      expect(mission.facilityKinds.length).toBeGreaterThanOrEqual(1);
      expect(mission.conditions.length).toBeGreaterThan(0);
    }
    expect(MISSIONS['bookmaru-library']).toMatchObject({ cityId: 'mulbit', facilityKinds: ['library'], budgetTokens: 3, serviceThreshold: 7 });
    expect(MISSIONS['health-help-center']).toMatchObject({ cityId: 'maru', facilityKinds: ['health-support'], budgetTokens: 3, serviceThreshold: 6 });
    expect(MISSIONS['living-culture-center']).toMatchObject({ cityId: 'mulbit', facilityKinds: ['culture-center'], budgetTokens: 3 });
    expect(MISSIONS['combined-review']).toMatchObject({ cityId: 'maru', facilityKinds: ['library', 'health-support'], budgetTokens: 4 });
  });

  it('keeps learner language explicit and non-emergency', () => {
    expect(MISSIONS['health-help-center'].title).toContain('일상 건강 상담 시설');
    expect(MISSIONS['health-help-center'].learningPrompt).toContain('응급');
    expect(MISSIONS['health-help-center'].learningPrompt).toContain('일상 건강 상담 시설');
    expect(MISSIONS['health-help-center'].learningPrompt).toContain('아니라');
    expect(Object.values(MISSIONS).every((mission) => mission.learningPrompt.includes('근거'))).toBe(true);
  });
});
