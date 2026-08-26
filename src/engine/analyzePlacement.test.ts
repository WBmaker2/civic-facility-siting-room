import { describe, expect, it } from 'vitest';
import type { MissionDefinition } from '../domain/types';
import { analyzePlacement } from './analyzePlacement';
import { COMBINED_MISSION } from '../domain/missions/combinedMission';
import { MARU_CITY } from '../domain/cities/maruCity';
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
    expect(result.nearestFacilityAccess.zoneTravel.find((row) => row.zoneId === 'z3')).toEqual({
      zoneId: 'z3', travelUnits: null, pathNodeIds: [],
    });
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

  it.each(['', '   ', '__proto__', 'constructor', 'prototype'])('rejects unsafe slot ID %s', (slotId) => {
    expect(() => analyzePlacement(tinyCity, tinyMission, [
      { slotId, facilityKind: 'library', candidateId: 'candidate-b' },
    ])).toThrow(RangeError);
  });

  it('builds perFacility with a null prototype', () => {
    const result = analyzePlacement(tinyCity, tinyMission, [
      { slotId: 'library-1', facilityKind: 'library', candidateId: 'candidate-b' },
    ]);
    expect(Object.getPrototypeOf(result.perFacility)).toBeNull();
  });

  it('rejects duplicate slot IDs even when candidate sites differ', () => {
    const dualMission: MissionDefinition = {
      ...tinyMission,
      id: 'combined-review',
      facilityKinds: ['library', 'health-support'],
    };
    expect(() => analyzePlacement(tinyCity, dualMission, [
      { slotId: 'same-slot', facilityKind: 'library', candidateId: 'candidate-b' },
      { slotId: 'same-slot', facilityKind: 'health-support', candidateId: 'candidate-d' },
    ])).toThrow(RangeError);
  });

  it('handles zero-token and fully disconnected populations without inventing travel', () => {
    const zeroTokenCity = {
      ...tinyCity,
      zones: tinyCity.zones.map((zone) => zone.id === 'z2' ? { ...zone, peopleTokens: 0 } : zone),
    };
    const zeroToken = analyzePlacement(zeroTokenCity, tinyMission, [
      { slotId: 'library-1', facilityKind: 'library', candidateId: 'candidate-b' },
    ]);
    expect(zeroToken.nearestFacilityAccess.populationWeightedAverage).toBe(2);
    expect(zeroToken.nearestFacilityAccess.reachablePeopleTokens).toBe(1);
    expect(zeroToken.nearestFacilityAccess.totalPeopleTokens).toBe(1);

    const disconnectedCity = { ...tinyCity, roads: [] };
    const disconnected = analyzePlacement(disconnectedCity, tinyMission, [
      { slotId: 'library-1', facilityKind: 'library', candidateId: 'candidate-b' },
    ]);
    expect(disconnected.nearestFacilityAccess.populationWeightedAverage).toBeNull();
    expect(disconnected.nearestFacilityAccess.longestReachableTravel).toBeNull();
    expect(disconnected.nearestFacilityAccess.worstServedZoneIds).toEqual(['z1', 'z2']);
    expect(disconnected.nearestFacilityAccess.zoneTravel.every((row) => row.travelUnits === null && row.pathNodeIds.length === 0)).toBe(true);
  });

  it('preserves exact mission-specific context and computes both facility roles', () => {
    const result = analyzePlacement(MARU_CITY, COMBINED_MISSION, [
      { slotId: 'health-1', facilityKind: 'health-support', candidateId: 'maru-d3' },
      { slotId: 'library-1', facilityKind: 'library', candidateId: 'maru-b2' },
    ]);

    expect(result.missionContext).toEqual({
      budgetTokens: 4,
      serviceThreshold: 7,
      facilityKinds: ['library', 'health-support'],
      conditionCodes: ['WITHIN_BUDGET', 'DISTINCT_CANDIDATE_SITES', 'REQUIRED_FACILITY_MIX', 'NO_UNREACHABLE_ZONE', 'WORST_TRAVEL_WITHIN_LIMIT', 'NO_RISK_SITE', 'COST_WITHIN_PRIORITY_CAP'],
    });
    expect(result.perFacility['health-1']?.zoneTravel).toHaveLength(6);
    expect(result.perFacility['library-1']?.zoneTravel).toHaveLength(6);
    expect(result.perFacility['health-1']?.zoneTravel).toEqual([
      { zoneId: 'maru-central', travelUnits: 1, pathNodeIds: ['maru-c3', 'maru-d3'] },
      { zoneId: 'maru-east', travelUnits: 2, pathNodeIds: ['maru-e2', 'maru-d2', 'maru-d3'] },
      { zoneId: 'maru-hill', travelUnits: 4, pathNodeIds: ['maru-b5', 'maru-b4', 'maru-b3', 'maru-c3', 'maru-d3'] },
      { zoneId: 'maru-north', travelUnits: 5, pathNodeIds: ['maru-a1', 'maru-a2', 'maru-a3', 'maru-b3', 'maru-c3', 'maru-d3'] },
      { zoneId: 'maru-south', travelUnits: 1, pathNodeIds: ['maru-d4', 'maru-d3'] },
      { zoneId: 'maru-west', travelUnits: 4, pathNodeIds: ['maru-a4', 'maru-a3', 'maru-b3', 'maru-c3', 'maru-d3'] },
    ]);
    expect(result.perFacility['library-1']?.zoneTravel).toEqual([
      { zoneId: 'maru-central', travelUnits: 2, pathNodeIds: ['maru-c3', 'maru-b3', 'maru-b2'] },
      { zoneId: 'maru-east', travelUnits: 4, pathNodeIds: ['maru-e2', 'maru-d2', 'maru-c2', 'maru-b2'] },
      { zoneId: 'maru-hill', travelUnits: 3, pathNodeIds: ['maru-b5', 'maru-b4', 'maru-b3', 'maru-b2'] },
      { zoneId: 'maru-north', travelUnits: 2, pathNodeIds: ['maru-a1', 'maru-a2', 'maru-b2'] },
      { zoneId: 'maru-south', travelUnits: 4, pathNodeIds: ['maru-d4', 'maru-c4', 'maru-b4', 'maru-b3', 'maru-b2'] },
      { zoneId: 'maru-west', travelUnits: 3, pathNodeIds: ['maru-a4', 'maru-a3', 'maru-a2', 'maru-b2'] },
    ]);
    expect(result.nearestFacilityAccess.zoneTravel).toHaveLength(6);
    expect(result.nearestFacilityAccess.populationWeightedAverage).toBe(1.9);
    expect(result.nearestFacilityAccess.zoneTravel).toEqual([
      { zoneId: 'maru-central', travelUnits: 1, pathNodeIds: ['maru-c3', 'maru-d3'] },
      { zoneId: 'maru-east', travelUnits: 2, pathNodeIds: ['maru-e2', 'maru-d2', 'maru-d3'] },
      { zoneId: 'maru-hill', travelUnits: 3, pathNodeIds: ['maru-b5', 'maru-b4', 'maru-b3', 'maru-b2'] },
      { zoneId: 'maru-north', travelUnits: 2, pathNodeIds: ['maru-a1', 'maru-a2', 'maru-b2'] },
      { zoneId: 'maru-south', travelUnits: 1, pathNodeIds: ['maru-d4', 'maru-d3'] },
      { zoneId: 'maru-west', travelUnits: 3, pathNodeIds: ['maru-a4', 'maru-a3', 'maru-a2', 'maru-b2'] },
    ]);
    expect(result.nearestFacilityAccess.worstServedZoneIds).toEqual(['maru-hill', 'maru-west']);
  });
});
