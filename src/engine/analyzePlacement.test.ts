import { describe, expect, it } from 'vitest';
import type { MissionDefinition } from '../domain/types';
import { analyzePlacement } from './analyzePlacement';
import { tinyCity, tinyCityWithUnreachableZone, tinyMission } from '../../tests/fixtures/tinyCity';

describe('analyzePlacement', () => {
  it('calculates a reachable-only population weighted average and exact paths', async () => {
    const result = analyzePlacement(tinyCity, tinyMission, [
      { slotId: 'library-1', facilityKind: 'library', candidateId: 'candidate-b' },
    ]);

    expect(result.nearestFacilityAccess.populationWeightedAverage).toBe(2.8);
    expect(result.nearestFacilityAccess.reachablePeopleTokens).toBe(4);
    expect(result.nearestFacilityAccess.totalPeopleTokens).toBe(4);
    expect(result.nearestFacilityAccess.longestReachableTravel).toBe(3);
    expect(result.nearestFacilityAccess.worstServedZoneIds).toEqual(['z2']);
    expect(result.nearestFacilityAccess.unreachableZoneIds).toEqual([]);
    expect(result.nearestFacilityAccess.zoneTravel).toEqual([
      { zoneId: 'z1', travelUnits: 2, pathNodeIds: ['A', 'B'] },
      { zoneId: 'z2', travelUnits: 3, pathNodeIds: ['C', 'B'] },
    ]);
    expect(result.perFacility['library-1']?.populationWeightedAverage).toBe(2.8);
  });

  it('keeps a disconnected population token outside the average and lists it separately', () => {
    const result = analyzePlacement(tinyCityWithUnreachableZone, tinyMission, [
      { slotId: 'library-1', facilityKind: 'library', candidateId: 'candidate-b' },
    ]);

    expect(result.nearestFacilityAccess.populationWeightedAverage).toBe(2.8);
    expect(result.nearestFacilityAccess.reachablePeopleTokens).toBe(4);
    expect(result.nearestFacilityAccess.totalPeopleTokens).toBe(5);
    expect(result.nearestFacilityAccess.unreachableZoneIds).toEqual(['z3']);
    expect(result.nearestFacilityAccess.worstServedZoneIds).toEqual(['z3']);
  });

  it('calculates mobility-barrier metrics separately from all residents', () => {
    const result = analyzePlacement(tinyCity, tinyMission, [
      { slotId: 'library-1', facilityKind: 'library', candidateId: 'candidate-b' },
    ]);

    expect(result.mobilityBarrierAccess.populationWeightedAverage).toBe(2);
    expect(result.mobilityBarrierAccess.reachablePeopleTokens).toBe(1);
    expect(result.mobilityBarrierAccess.totalPeopleTokens).toBe(1);
    expect(result.mobilityBarrierAccess.zoneTravel).toEqual([
      { zoneId: 'z1', travelUnits: 2, pathNodeIds: ['A', 'B'] },
    ]);
  });

  it('exposes cost, risk, overlap, and coverage gap as separate metrics', () => {
    const overlapResult = analyzePlacement(tinyCityWithUnreachableZone, tinyMission, [
      { slotId: 'library-1', facilityKind: 'library', candidateId: 'candidate-b' },
    ]);
    expect(overlapResult.overlapZoneIds).toEqual(['z1']);
    expect(overlapResult.coverageGapZoneIds).toEqual(['z3']);

    const result = analyzePlacement(tinyCity, tinyMission, [
      { slotId: 'library-1', facilityKind: 'library', candidateId: 'candidate-risk' },
    ]);

    expect(result.totalCostTokens).toBe(3);
    expect(result.riskyCandidateIds).toEqual(['candidate-risk']);
  });

  it('throws RangeError for an unknown candidate, wrong count, mix, or duplicate site', () => {
    expect(() => analyzePlacement(tinyCity, tinyMission, [])).toThrow(RangeError);
    expect(() => analyzePlacement(tinyCity, tinyMission, [
      { slotId: 'library-1', facilityKind: 'health-support', candidateId: 'candidate-b' },
    ])).toThrow(RangeError);
    expect(() => analyzePlacement(tinyCity, tinyMission, [
      { slotId: 'library-1', facilityKind: 'library', candidateId: 'missing' },
    ])).toThrow(RangeError);

    const dualMission: MissionDefinition = {
      ...tinyMission,
      id: 'combined-review',
      facilityKinds: ['library', 'health-support'],
    };
    expect(() => analyzePlacement(tinyCity, dualMission, [
      { slotId: 'library-1', facilityKind: 'library', candidateId: 'candidate-b' },
      { slotId: 'health-1', facilityKind: 'health-support', candidateId: 'candidate-b' },
    ])).toThrow(RangeError);
    expect(() => analyzePlacement(tinyCity, dualMission, [
      { slotId: 'library-1', facilityKind: 'library', candidateId: 'candidate-b' },
      { slotId: 'health-1', facilityKind: 'library', candidateId: 'candidate-d' },
    ])).toThrow(RangeError);
  });
});
