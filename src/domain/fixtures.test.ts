import { describe, expect, it } from 'vitest';
import { CITIES } from './cities';
import { MISSIONS } from './missions';
import { MODEL_LIMIT_NOTICE } from '../content/learnerCopy';
import { validateCity } from './cities/validateCity';
import type { CityScenario } from './types';

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

  it('locks every mission condition and priority rule contract', () => {
    const expected = {
      'bookmaru-library': {
        cityId: 'mulbit', facilityKinds: ['library'], budgetTokens: 3, serviceThreshold: 7,
        conditions: [['WITHIN_BUDGET', true, 3], ['NO_UNREACHABLE_ZONE', true, 0], ['WORST_TRAVEL_WITHIN_LIMIT', true, 7], ['NO_RISK_SITE', false, 0], ['COST_WITHIN_PRIORITY_CAP', false, 2]],
        priorityRules: { 'access-equity': ['NO_UNREACHABLE_ZONE', 'WORST_TRAVEL_WITHIN_LIMIT'], safety: ['NO_RISK_SITE'], cost: ['COST_WITHIN_PRIORITY_CAP'] },
      },
      'health-help-center': {
        cityId: 'maru', facilityKinds: ['health-support'], budgetTokens: 3, serviceThreshold: 6,
        conditions: [['WITHIN_BUDGET', true, 3], ['NO_UNREACHABLE_ZONE', true, 0], ['MOBILITY_BARRIER_TRAVEL_WITHIN_LIMIT', true, 6], ['NO_RISK_SITE', true, 0], ['COST_WITHIN_PRIORITY_CAP', false, 2]],
        priorityRules: { 'access-equity': ['NO_UNREACHABLE_ZONE', 'MOBILITY_BARRIER_TRAVEL_WITHIN_LIMIT'], safety: ['NO_RISK_SITE'], cost: ['COST_WITHIN_PRIORITY_CAP'] },
      },
      'living-culture-center': {
        cityId: 'mulbit', facilityKinds: ['culture-center'], budgetTokens: 3, serviceThreshold: 7,
        conditions: [['WITHIN_BUDGET', true, 3], ['NO_UNREACHABLE_ZONE', true, 0], ['COVERAGE_GAP_WITHIN_LIMIT', true, 1], ['NO_RISK_SITE', false, 0], ['COST_WITHIN_PRIORITY_CAP', false, 2]],
        priorityRules: { 'access-equity': ['NO_UNREACHABLE_ZONE', 'COVERAGE_GAP_WITHIN_LIMIT'], safety: ['NO_RISK_SITE'], cost: ['COST_WITHIN_PRIORITY_CAP'] },
      },
      'combined-review': {
        cityId: 'maru', facilityKinds: ['library', 'health-support'], budgetTokens: 4, serviceThreshold: 7,
        conditions: [['WITHIN_BUDGET', true, 4], ['DISTINCT_CANDIDATE_SITES', true, 2], ['REQUIRED_FACILITY_MIX', true, 2], ['NO_UNREACHABLE_ZONE', true, 0], ['WORST_TRAVEL_WITHIN_LIMIT', false, 7], ['NO_RISK_SITE', false, 0], ['COST_WITHIN_PRIORITY_CAP', false, 3]],
        priorityRules: { 'access-equity': ['NO_UNREACHABLE_ZONE', 'WORST_TRAVEL_WITHIN_LIMIT'], safety: ['NO_RISK_SITE'], cost: ['COST_WITHIN_PRIORITY_CAP'] },
      },
    } as const;
    for (const [id, contract] of Object.entries(expected)) {
      const mission = MISSIONS[id as keyof typeof MISSIONS];
      expect(mission).toMatchObject({ cityId: contract.cityId, facilityKinds: contract.facilityKinds, budgetTokens: contract.budgetTokens, serviceThreshold: contract.serviceThreshold });
      expect(mission.conditions.map(({ code, required, numericLimit }) => [code, required, numericLimit])).toEqual(contract.conditions);
      expect(mission.priorityRules).toEqual(contract.priorityRules);
    }
  });

  it('locks named valid placements and observable edge fixtures', () => {
    const site = (cityId: 'mulbit' | 'maru', candidateId: string) => CITIES[cityId].candidates.find((candidate) => candidate.id === candidateId);
    const assertDistinct = (ids: string[]) => expect(new Set(ids).size).toBe(ids.length);
    expect(site('mulbit', 'mulbit-b2')).toBeDefined();
    expect(site('mulbit', 'mulbit-c3')).toBeDefined();
    expect(site('maru', 'maru-c2')).toBeDefined();
    expect(site('maru', 'maru-d3')).toBeDefined();
    expect(site('mulbit', 'mulbit-c4')).toBeDefined();
    expect(site('mulbit', 'mulbit-d3')).toBeDefined();
    expect(site('maru', 'maru-b2')).toBeDefined();
    expect(site('maru', 'maru-e3')).toBeDefined();
    assertDistinct(['maru-b2', 'maru-d3']);
    assertDistinct(['maru-c2', 'maru-e3']);
    expect(site('mulbit', 'mulbit-a4-water')?.costTokens).toBe(1);
    expect(site('maru', 'maru-a5-slope')?.costTokens).toBe(2);
    expect(site('maru', 'maru-e1-premium')?.costTokens).toBe(3);
    expect(site('maru', 'maru-d3')?.costTokens).toBe(2);
    expect(CITIES.maru.riskMarkers.some((marker) => marker.nodeId === site('maru', 'maru-a5-slope')?.nodeId)).toBe(true);
    expect(CITIES.mulbit.riskMarkers.some((marker) => marker.nodeId === site('mulbit', 'mulbit-a4-water')?.nodeId)).toBe(true);
    expect(CITIES.mulbit.roads.some((edge) => edge.from === site('mulbit', 'mulbit-e5-island')?.nodeId || edge.to === site('mulbit', 'mulbit-e5-island')?.nodeId)).toBe(false);
    expect((site('maru', 'maru-e1-premium')?.costTokens ?? 0) + (site('maru', 'maru-d3')?.costTokens ?? 0)).toBeGreaterThan(MISSIONS['combined-review'].budgetTokens);
  });

  it('rejects malformed city shape, identifiers, coordinates, and references', () => {
    const base = CITIES.mulbit;
    const malformed = (change: (city: CityScenario) => CityScenario, expected: string) => {
      expect(validateCity(change(base))).toEqual(expect.arrayContaining([expect.stringContaining(expected)]));
    };
    malformed((city) => ({ ...city, rows: 4 }), '5 by 5');
    malformed((city) => ({ ...city, nodes: city.nodes.slice(0, -1) }), 'node count');
    malformed((city) => ({ ...city, nodes: [{ ...city.nodes[0]!, row: 1, column: 1 }, ...city.nodes.slice(1)] }), 'duplicate grid coordinate');
    malformed((city) => ({ ...city, nodes: [{ ...city.nodes[0]!, label: 'wrong' }, ...city.nodes.slice(1)] }), 'node label');
    malformed((city) => ({ ...city, zones: city.zones.slice(0, 5) }), 'exactly six');
    malformed((city) => ({ ...city, candidates: city.candidates.slice(0, 4) }), 'at least five');
    malformed((city) => ({ ...city, riskMarkers: [] }), 'at least one risk');
    malformed((city) => ({ ...city, existingFacilities: [] }), 'at least one existing');
    malformed((city) => ({ ...city, zones: [{ ...city.zones[0]!, id: city.zones[1]!.id }, ...city.zones.slice(1)] }), 'duplicate zone');
    malformed((city) => ({ ...city, candidates: [{ ...city.candidates[0]!, id: city.candidates[1]!.id }, ...city.candidates.slice(1)] }), 'duplicate candidate');
    malformed((city) => ({ ...city, riskMarkers: [{ ...city.riskMarkers[0]!, nodeId: city.riskMarkers[0]!.nodeId }, ...city.riskMarkers] }), 'duplicate risk marker');
    malformed((city) => ({ ...city, existingFacilities: [{ ...city.existingFacilities[0]!, id: city.existingFacilities[0]!.id }, ...city.existingFacilities] }), 'duplicate existing facility');
    malformed((city) => ({ ...city, roads: [...city.roads, { from: 'mulbit-z9', to: 'mulbit-a1', travelUnits: 1 }] }), 'road endpoint missing');
    malformed((city) => ({ ...city, candidates: [{ ...city.candidates[0]!, nodeId: 'mulbit-a1' }, ...city.candidates.slice(1)] }), 'candidate node does not match');
    malformed((city) => ({ ...city, riskMarkers: [{ ...city.riskMarkers[0]!, nodeId: 'mulbit-a1' }] }), 'risk marker node does not match');
    malformed((city) => ({ ...city, existingFacilities: [{ ...city.existingFacilities[0]!, nodeId: 'mulbit-a1' }, ...city.existingFacilities.slice(1)] }), 'facility node does not match');
  });
});
