import { createGridNodes, coordinateLabel, nodeId } from '../coordinates';
import { buildGridRoads } from '../gridRoadBuilder';
import { MODEL_LIMIT_NOTICE } from '../../content/learnerCopy';
import type { CandidateSite, CityScenario, ExistingFacility, GridCoordinate, PopulationZone, RiskMarker } from '../types';

const prefix = 'maru';
const coordinate = (label: string): GridCoordinate => {
  const column = label.charCodeAt(0) - 65;
  const row = Number(label.slice(1)) - 1;
  return { row, column, label: coordinateLabel(row, column) };
};
const at = (label: string) => nodeId(prefix, coordinate(label).row, coordinate(label).column);
const zones: PopulationZone[] = [
  { id: 'maru-north', name: '솔빛 북쪽 구역', nodeId: at('A1'), peopleTokens: 5, mobilityBarrier: true, existingCoverage: [] },
  { id: 'maru-east', name: '새길 동쪽 구역', nodeId: at('E2'), peopleTokens: 4, mobilityBarrier: false, existingCoverage: [] },
  { id: 'maru-central', name: '마루 가운데 구역', nodeId: at('C3'), peopleTokens: 6, mobilityBarrier: false, existingCoverage: [] },
  { id: 'maru-south', name: '느낌 남쪽 구역', nodeId: at('D4'), peopleTokens: 3, mobilityBarrier: true, existingCoverage: [] },
  { id: 'maru-west', name: '달맞이 서쪽 구역', nodeId: at('A4'), peopleTokens: 4, mobilityBarrier: false, existingCoverage: [] },
  { id: 'maru-hill', name: '바람 언덕 구역', nodeId: at('B5'), peopleTokens: 2, mobilityBarrier: false, existingCoverage: ['library'] },
];
const candidates: CandidateSite[] = [
  { id: 'maru-b2', name: '솔마루 터', nodeId: at('B2'), coordinate: coordinate('B2'), costTokens: 1 },
  { id: 'maru-c2', name: '새길 쉼터 터', nodeId: at('C2'), coordinate: coordinate('C2'), costTokens: 1 },
  { id: 'maru-d3', name: '마루 중앙 터', nodeId: at('D3'), coordinate: coordinate('D3'), costTokens: 2 },
  { id: 'maru-e3', name: '동쪽 열린 터', nodeId: at('E3'), coordinate: coordinate('E3'), costTokens: 1 },
  { id: 'maru-a5-slope', name: '언덕 아래 터', nodeId: at('A5'), coordinate: coordinate('A5'), costTokens: 2 },
  { id: 'maru-e1-premium', name: '넓은 동쪽 터', nodeId: at('E1'), coordinate: coordinate('E1'), costTokens: 3 },
];
const riskMarkers: RiskMarker[] = [
  { nodeId: at('A5'), coordinate: coordinate('A5'), kind: 'steep-slope', label: '경사가 가파른 표지' },
];
const existingFacilities: ExistingFacility[] = [
  { id: 'maru-existing-library', name: '바람 언덕 도서관', facilityKind: 'library', nodeId: at('B5'), coordinate: coordinate('B5') },
];

export const MARU_CITY: CityScenario = {
  id: 'maru', name: '마루시(가상 도시)', rows: 5, columns: 5,
  nodes: createGridNodes(prefix, 5, 5),
  roads: buildGridRoads(prefix, 5, 5, { weightedLinks: { [`${at('B2')}::${at('C2')}`]: 2 } }),
  zones, candidates, riskMarkers, existingFacilities,
  virtualDataNotice: MODEL_LIMIT_NOTICE,
};
export const maruCity = MARU_CITY;
