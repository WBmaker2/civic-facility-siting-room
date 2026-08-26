import { shortestTravelPath } from './shortestPath';
import type {
  AccessMetrics,
  CityScenario,
  FacilityKind,
  FacilityPlacement,
  MissionDefinition,
  PlacementAnalysis,
  PopulationZone,
  ZoneTravelResult,
} from '../domain/types';

const compareZoneTravel = (left: ZoneTravelResult, right: ZoneTravelResult): number =>
  left.zoneId < right.zoneId ? -1 : left.zoneId > right.zoneId ? 1 : 0;

const compareText = (left: string, right: string): number =>
  left < right ? -1 : left > right ? 1 : 0;

const roundToOneDecimal = (value: number): number => Math.round(value * 10) / 10;

const makeAccessMetrics = (zones: PopulationZone[], zoneTravel: ZoneTravelResult[]): AccessMetrics => {
  const orderedTravel = [...zoneTravel].sort(compareZoneTravel);
  const totalPeopleTokens = zones.reduce((sum, zone) => sum + zone.peopleTokens, 0);
  const reachableRows = orderedTravel.filter((row) => row.travelUnits !== null);
  const reachablePeopleTokens = zones.reduce((sum, zone) => {
    const row = orderedTravel.find((candidate) => candidate.zoneId === zone.id);
    return row?.travelUnits === null || row === undefined ? sum : sum + zone.peopleTokens;
  }, 0);
  const weightedTotal = zones.reduce((sum, zone) => {
    const row = orderedTravel.find((candidate) => candidate.zoneId === zone.id);
    return row?.travelUnits === null || row === undefined ? sum : sum + row.travelUnits * zone.peopleTokens;
  }, 0);
  const unreachableZoneIds = orderedTravel
    .filter((row) => row.travelUnits === null)
    .map((row) => row.zoneId)
    .sort();
  const finiteTravel = reachableRows
    .map((row) => row.travelUnits)
    .filter((value): value is number => value !== null);
  const longestReachableTravel = finiteTravel.length === 0 ? null : Math.max(...finiteTravel);
  const worstServedZoneIds = unreachableZoneIds.length > 0
    ? unreachableZoneIds
    : longestReachableTravel === null
      ? []
      : orderedTravel
        .filter((row) => row.travelUnits === longestReachableTravel)
        .map((row) => row.zoneId)
        .sort();

  return {
    populationWeightedAverage: reachablePeopleTokens === 0
      ? null
      : roundToOneDecimal(weightedTotal / reachablePeopleTokens),
    reachablePeopleTokens,
    totalPeopleTokens,
    longestReachableTravel,
    worstServedZoneIds,
    unreachableZoneIds,
    zoneTravel: orderedTravel,
  };
};

const travelFromZone = (
  city: CityScenario,
  zones: PopulationZone[],
  nodeId: string,
): ZoneTravelResult[] => zones.map((zone) => {
  const path = shortestTravelPath(city.roads, zone.nodeId, nodeId);
  return {
    zoneId: zone.id,
    travelUnits: path?.travelUnits ?? null,
    pathNodeIds: path?.nodeIds ?? [],
  };
});

const compareNearest = (
  left: ZoneTravelResult & { candidateId: string },
  right: ZoneTravelResult & { candidateId: string },
): number => {
  if (left.travelUnits === null && right.travelUnits !== null) return 1;
  if (left.travelUnits !== null && right.travelUnits === null) return -1;
  if (left.travelUnits !== right.travelUnits) {
    return (left.travelUnits ?? Number.POSITIVE_INFINITY) - (right.travelUnits ?? Number.POSITIVE_INFINITY);
  }
  const leftPath = left.pathNodeIds.join('\u0000');
  const rightPath = right.pathNodeIds.join('\u0000');
  if (leftPath !== rightPath) return compareText(leftPath, rightPath);
  return compareText(left.candidateId, right.candidateId);
};

const validatePlacements = (
  city: CityScenario,
  mission: MissionDefinition,
  placements: FacilityPlacement[],
): Map<string, { placement: FacilityPlacement; nodeId: string; costTokens: number }> => {
  if (city.id !== mission.cityId) throw new RangeError('Mission and city do not match.');
  if (placements.length !== mission.facilityKinds.length) {
    throw new RangeError('Placement count must match the mission facility slots.');
  }
  const candidatesById = new Map(city.candidates.map((candidate) => [candidate.id, candidate]));
  const usedCandidateIds = new Set<string>();
  const usedSlotIds = new Set<string>();
  const actualKinds = new Map<FacilityKind, number>();
  for (const placement of placements) {
    const candidate = candidatesById.get(placement.candidateId);
    if (candidate === undefined) throw new RangeError(`Unknown candidate: ${placement.candidateId}`);
    if (usedCandidateIds.has(placement.candidateId)) throw new RangeError('Candidate sites must be distinct.');
    if (usedSlotIds.has(placement.slotId)) throw new RangeError('Facility slot IDs must be distinct.');
    if (!mission.facilityKinds.includes(placement.facilityKind)) throw new RangeError('Wrong facility mix.');
    usedCandidateIds.add(placement.candidateId);
    usedSlotIds.add(placement.slotId);
    actualKinds.set(placement.facilityKind, (actualKinds.get(placement.facilityKind) ?? 0) + 1);
  }
  const expectedKinds = new Map<FacilityKind, number>();
  for (const kind of mission.facilityKinds) expectedKinds.set(kind, (expectedKinds.get(kind) ?? 0) + 1);
  for (const [kind, count] of expectedKinds) {
    if (actualKinds.get(kind) !== count) throw new RangeError('Wrong facility mix.');
  }
  for (const [kind, count] of actualKinds) {
    if (expectedKinds.get(kind) !== count) throw new RangeError('Wrong facility mix.');
  }
  return new Map(placements.map((placement) => {
    const candidate = candidatesById.get(placement.candidateId)!;
    return [placement.slotId, { placement, nodeId: candidate.nodeId, costTokens: candidate.costTokens }];
  }));
};

const findExistingCoverage = (
  city: CityScenario,
  zone: PopulationZone,
  kind: FacilityKind,
  threshold: number,
): boolean => {
  if (zone.existingCoverage.includes(kind)) return true;
  return city.existingFacilities
    .filter((facility) => facility.facilityKind === kind)
    .some((facility) => {
      const path = shortestTravelPath(city.roads, zone.nodeId, facility.nodeId);
      return path !== null && path.travelUnits <= threshold;
    });
};

export function analyzePlacement(
  city: CityScenario,
  mission: MissionDefinition,
  placements: FacilityPlacement[],
): PlacementAnalysis {
  const validated = validatePlacements(city, mission, placements);
  const orderedPlacements = [...placements].sort((left, right) => compareText(left.slotId, right.slotId));
  const perFacility: Record<string, AccessMetrics> = {};
  for (const placement of orderedPlacements) {
    const details = validated.get(placement.slotId)!;
    perFacility[placement.slotId] = makeAccessMetrics(
      city.zones,
      travelFromZone(city, city.zones, details.nodeId),
    );
  }

  const nearestTravel = city.zones.map((zone) => {
    const options = orderedPlacements.map((placement) => {
      const row = perFacility[placement.slotId]!.zoneTravel.find((travel) => travel.zoneId === zone.id)!;
      return { ...row, candidateId: placement.candidateId };
    });
    const best = [...options].sort(compareNearest)[0]!;
    return { zoneId: best.zoneId, travelUnits: best.travelUnits, pathNodeIds: best.pathNodeIds };
  });
  const nearestFacilityAccess = makeAccessMetrics(city.zones, nearestTravel);
  const mobilityZones = city.zones.filter((zone) => zone.mobilityBarrier);
  const mobilityBarrierAccess = makeAccessMetrics(
    mobilityZones,
    nearestTravel.filter((travel) => mobilityZones.some((zone) => zone.id === travel.zoneId)),
  );

  const candidatesById = new Map(city.candidates.map((candidate) => [candidate.id, candidate]));
  const totalCostTokens = orderedPlacements.reduce((sum, placement) =>
    sum + candidatesById.get(placement.candidateId)!.costTokens, 0);
  const riskyCandidateIds = orderedPlacements
    .filter((placement) => city.riskMarkers.some((marker) => marker.nodeId === candidatesById.get(placement.candidateId)!.nodeId))
    .map((placement) => placement.candidateId)
    .sort();

  const matchingPlacements = orderedPlacements.filter((placement) => mission.facilityKinds.includes(placement.facilityKind));
  const coveredByNew = (zone: PopulationZone, kind: FacilityKind): boolean => matchingPlacements
    .filter((placement) => placement.facilityKind === kind)
    .some((placement) => perFacility[placement.slotId]!.zoneTravel
      .find((travel) => travel.zoneId === zone.id)!.travelUnits !== null
      && perFacility[placement.slotId]!.zoneTravel.find((travel) => travel.zoneId === zone.id)!.travelUnits! <= mission.serviceThreshold);
  const overlapZoneIds = city.zones
    .filter((zone) => mission.facilityKinds.some((kind) => findExistingCoverage(city, zone, kind, mission.serviceThreshold) && coveredByNew(zone, kind)))
    .map((zone) => zone.id)
    .sort();
  const coverageGapZoneIds = city.zones
    .filter((zone) => mission.facilityKinds.every((kind) => !findExistingCoverage(city, zone, kind, mission.serviceThreshold) && !coveredByNew(zone, kind)))
    .map((zone) => zone.id)
    .sort();

  return {
    cityId: city.id,
    missionId: mission.id,
    placements: orderedPlacements,
    perFacility,
    nearestFacilityAccess,
    mobilityBarrierAccess,
    totalCostTokens,
    riskyCandidateIds,
    overlapZoneIds,
    coverageGapZoneIds,
  };
}
