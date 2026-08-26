import type { RoadEdge } from '../../src/domain/types';

/** Small weighted graph shared by the pure engine tests. */
export const TINY_CITY_ROADS: RoadEdge[] = [
  { from: 'A', to: 'B', travelUnits: 2 },
  { from: 'B', to: 'C', travelUnits: 3 },
  { from: 'A', to: 'C', travelUnits: 9 },
  { from: 'A', to: 'E', travelUnits: 2 },
  { from: 'E', to: 'C', travelUnits: 3 },
];

export const tinyCityRoads = TINY_CITY_ROADS;
