import { createGridNodes, coordinateLabel, nodeId } from '../coordinates';
import { buildGridRoads } from '../gridRoadBuilder';
import { MODEL_LIMIT_NOTICE } from '../../content/learnerCopy';
import type { CandidateSite, CityScenario, ExistingFacility, GridCoordinate, PopulationZone, RiskMarker } from '../types';

const prefix = 'mulbit';
const coordinate = (label: string): GridCoordinate => {
  const column = label.charCodeAt(0) - 65;
  const row = Number(label.slice(1)) - 1;
  return { row, column, label: coordinateLabel(row, column) };
};
const at = (label: string) => nodeId(prefix, coordinate(label).row, coordinate(label).column);
const zones: PopulationZone[] = [
  { id: 'mulbit-north', name: '햇살 북쪽 구역', nodeId: at('A1'), peopleTokens: 5, mobilityBarrier: true, existingCoverage: [] },
  { id: 'mulbit-east', name: '바람 동쪽 구역', nodeId: at('E2'), peopleTokens: 4, mobilityBarrier: false, existingCoverage: [] },
  { id: 'mulbit-central', name: '물빛 가운데 구역', nodeId: at('C3'), peopleTokens: 6, mobilityBarrier: false, existingCoverage: [] },
  { id: 'mulbit-south', name: '느티나무 남쪽 구역', nodeId: at('D4'), peopleTokens: 3, mobilityBarrier: true, existingCoverage: ['culture-center'] },
  { id: 'mulbit-west', name: '노을 서쪽 구역', nodeId: at('A4'), peopleTokens: 4, mobilityBarrier: false, existingCoverage: [] },
  { id: 'mulbit-hill', name: '작은 언덕 구역', nodeId: at('B5'), peopleTokens: 2, mobilityBarrier: false, existingCoverage: [] },
];
const candidates: CandidateSite[] = [
  { id: 'mulbit-b2', name: '느린 강변 터', nodeId: at('B2'), coordinate: coordinate('B2'), costTokens: 1 },
  { id: 'mulbit-c3', name: '가운데 광장 터', nodeId: at('C3'), coordinate: coordinate('C3'), costTokens: 2 },
  { id: 'mulbit-c4', name: '느티마당 터', nodeId: at('C4'), coordinate: coordinate('C4'), costTokens: 2 },
  { id: 'mulbit-d3', name: '푸른길 터', nodeId: at('D3'), coordinate: coordinate('D3'), costTokens: 3 },
  { id: 'mulbit-a4-water', name: '물 고임 관찰 터', nodeId: at('A4'), coordinate: coordinate('A4'), costTokens: 1 },
  { id: 'mulbit-e5-island', name: '섬 끝 터', nodeId: at('E5'), coordinate: coordinate('E5'), costTokens: 2 },
];
const riskMarkers: RiskMarker[] = [
  { nodeId: at('A4'), coordinate: coordinate('A4'), kind: 'water-ponding', label: '비가 오면 물이 고일 수 있는 표지' },
];
const existingFacilities: ExistingFacility[] = [
  { id: 'mulbit-existing-culture', name: '느티마당 문화센터', facilityKind: 'culture-center', nodeId: at('D4'), coordinate: coordinate('D4') },
  { id: 'mulbit-existing-library', name: '햇살 작은도서관', facilityKind: 'library', nodeId: at('A1'), coordinate: coordinate('A1') },
];
const island = at('E5');
const neighbors = [at('D5'), at('E4')];
const roads = buildGridRoads(prefix, 5, 5, { blockedLinks: neighbors.map((neighbor) => [island, neighbor].sort().join('::')) });

export const MULBIT_CITY: CityScenario = {
  id: 'mulbit', name: '물빛시(가상 도시)', rows: 5, columns: 5,
  nodes: createGridNodes(prefix, 5, 5), roads, zones, candidates, riskMarkers, existingFacilities,
  virtualDataNotice: MODEL_LIMIT_NOTICE,
};
export const mulbitCity = MULBIT_CITY;
