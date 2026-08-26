import type {
  CandidateSite,
  CityScenario,
  ExistingFacility,
  FacilityKind,
  MissionDefinition,
  PopulationZone,
  RiskMarker,
  RoadEdge,
} from '../../src/domain/types';

/** Small weighted graph shared by the pure engine tests. */
export const TINY_CITY_ROADS: RoadEdge[] = [
  { from: 'A', to: 'B', travelUnits: 2 },
  { from: 'B', to: 'C', travelUnits: 3 },
  { from: 'A', to: 'C', travelUnits: 9 },
  { from: 'A', to: 'E', travelUnits: 2 },
  { from: 'E', to: 'C', travelUnits: 3 },
];

export const tinyCityRoads = TINY_CITY_ROADS;

const candidate = (id: string, nodeId: string, costTokens: 1 | 2 | 3): CandidateSite => ({
  id,
  name: `터 ${id}`,
  nodeId,
  coordinate: { row: 0, column: 0, label: nodeId },
  costTokens,
});

export const TINY_CITY_ZONES: PopulationZone[] = [
  {
    id: 'z1',
    name: 'A 구역',
    nodeId: 'A',
    peopleTokens: 1,
    mobilityBarrier: true,
    existingCoverage: ['library'],
  },
  {
    id: 'z2',
    name: 'C 구역',
    nodeId: 'C',
    peopleTokens: 3,
    mobilityBarrier: false,
    existingCoverage: [],
  },
];

export const TINY_CITY_UNREACHABLE_ZONE: PopulationZone = {
  id: 'z3',
  name: 'D 구역',
  nodeId: 'D',
  peopleTokens: 1,
  mobilityBarrier: false,
  existingCoverage: [],
};

export const TINY_CITY_CANDIDATES: CandidateSite[] = [
  candidate('candidate-b', 'B', 2),
  candidate('candidate-d', 'D', 1),
  candidate('candidate-risk', 'C', 3),
];

export const TINY_CITY_RISK_MARKERS: RiskMarker[] = [
  {
    nodeId: 'C',
    coordinate: { row: 0, column: 2, label: 'C1' },
    kind: 'water-ponding',
    label: '물 고임 표지',
  },
];

export const TINY_CITY_EXISTING_FACILITIES: ExistingFacility[] = [
  {
    id: 'existing-library',
    name: '기존 작은도서관',
    facilityKind: 'library',
    nodeId: 'A',
    coordinate: { row: 0, column: 0, label: 'A1' },
  },
];

export const tinyCity: CityScenario = {
  id: 'mulbit',
  name: '작은 가상 도시',
  rows: 1,
  columns: 4,
  nodes: [
    { row: 0, column: 0, label: 'A' },
    { row: 0, column: 1, label: 'B' },
    { row: 0, column: 2, label: 'C' },
    { row: 0, column: 3, label: 'D' },
  ],
  roads: TINY_CITY_ROADS,
  zones: TINY_CITY_ZONES,
  candidates: TINY_CITY_CANDIDATES,
  riskMarkers: TINY_CITY_RISK_MARKERS,
  existingFacilities: TINY_CITY_EXISTING_FACILITIES,
  virtualDataNotice: '모든 수치는 학습을 위한 가상 단위입니다.',
};

export const tinyCityWithUnreachableZone: CityScenario = {
  ...tinyCity,
  zones: [...tinyCity.zones, TINY_CITY_UNREACHABLE_ZONE],
};

export const tinyMission: MissionDefinition = {
  id: 'bookmaru-library',
  cityId: 'mulbit',
  title: '작은 도서관 미션',
  facilityKinds: ['library'],
  budgetTokens: 3,
  requiredLayers: ['population', 'roads', 'risk', 'cost', 'existing-facilities'],
  conditions: [
    { code: 'WITHIN_BUDGET', label: '예산 안에 놓기', required: true, numericLimit: 3 },
    { code: 'NO_UNREACHABLE_ZONE', label: '모두 도달 가능', required: true, numericLimit: 0 },
  ],
  priorityRules: {
    'access-equity': ['NO_UNREACHABLE_ZONE'],
    safety: ['NO_RISK_SITE'],
    cost: ['COST_WITHIN_PRIORITY_CAP'],
  },
  serviceThreshold: 3,
  learningPrompt: '가상 도시 자료를 근거로 시설 위치를 비교합니다.',
};

export const facilityKindForTinyMission: FacilityKind = 'library';
