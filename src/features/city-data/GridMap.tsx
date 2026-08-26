/* eslint-disable react-refresh/only-export-components */
import { useState, type KeyboardEvent } from 'react';
import type { CityScenario, DataLayerId, GridCoordinate, RiskKind } from '../../domain/types';

export interface GridMapProps {
  city: CityScenario;
  activeLayerIds: DataLayerId[];
  selectedCandidateId: string | null;
  onSelectCandidate: (candidateId: string) => void;
}

export interface CoordinateData {
  coordinate: GridCoordinate;
  zoneNames: string[];
  peopleTokens: number;
  mobilityBarrier: boolean;
  coverageNames: string[];
  roadUnits: number[];
  riskKinds: RiskKind[];
  riskLabels: string[];
  candidateIds: string[];
  candidateNames: string[];
  candidateCosts: number[];
  existingNames: string[];
}

const RISK_NAMES: Record<RiskKind, string> = {
  'water-ponding': '빗물 고임',
  'steep-slope': '급경사',
};

const COVERAGE_NAMES: Record<string, string> = {
  library: '도서관',
  'health-support': '보건 지원소',
  'culture-center': '생활문화센터',
};

const hasLayer = (layers: readonly DataLayerId[], layer: DataLayerId): boolean => layers.includes(layer);

export function getCoordinateData(city: CityScenario, coordinate: GridCoordinate): CoordinateData {
  const node = city.nodes.find((item) => item.row === coordinate.row && item.column === coordinate.column);
  const nodeId = node ? `${city.id}-${coordinate.label.toLowerCase()}` : '';
  const zones = city.zones.filter((zone) => zone.nodeId === nodeId);
  const roads = city.roads.filter((edge) => edge.from === nodeId || edge.to === nodeId);
  const risks = city.riskMarkers.filter((risk) => risk.nodeId === nodeId);
  const candidates = city.candidates.filter((candidate) => candidate.nodeId === nodeId);
  const existing = city.existingFacilities.filter((facility) => facility.nodeId === nodeId);
  return {
    coordinate,
    zoneNames: zones.map((zone) => zone.name),
    peopleTokens: zones.reduce((sum, zone) => sum + zone.peopleTokens, 0),
    mobilityBarrier: zones.some((zone) => zone.mobilityBarrier),
    coverageNames: [...new Set(zones.flatMap((zone) => zone.existingCoverage.map((kind) => COVERAGE_NAMES[kind] ?? kind)))],
    roadUnits: roads.map((road) => road.travelUnits),
    riskKinds: risks.map((risk) => risk.kind),
    riskLabels: risks.map((risk) => risk.label),
    candidateIds: candidates.map((candidate) => candidate.id),
    candidateNames: candidates.map((candidate) => candidate.name),
    candidateCosts: candidates.map((candidate) => candidate.costTokens),
    existingNames: existing.map((facility) => facility.name),
  };
}

function riskName(kind: RiskKind): string {
  return RISK_NAMES[kind];
}

function riskPattern(kind: RiskKind): 'waves' | 'crosshatch' {
  return kind === 'water-ponding' ? 'waves' : 'crosshatch';
}

function cellId(city: CityScenario, coordinate: GridCoordinate): string {
  return `${city.id}-cell-${coordinate.label.toLowerCase()}`;
}

function cellLabel(data: CoordinateData, selectedCandidateId: string | null): string {
  const sections = [data.coordinate.label];
  if (data.zoneNames.length > 0) {
    sections.push(`${data.zoneNames.join(', ')}, 사람 토큰 ${data.peopleTokens}${data.mobilityBarrier ? ', 이동이 불편할 수 있는 구역' : ''}`);
    sections.push(data.coverageNames.length > 0 ? `기존 보장: ${data.coverageNames.join(', ')}` : '기존 보장 시설 없음');
  } else {
    sections.push('인구 구역 없음, 기존 보장 시설 없음');
  }
  sections.push(data.roadUnits.length > 0
    ? `도로 연결 있음, 연결 이동 단위 ${data.roadUnits.join(', ')}`
    : '도로 연결 없음');
  if (data.riskKinds.length > 0) {
    sections.push(data.riskKinds.map((kind, index) => `${riskName(kind)}: ${data.riskLabels[index] ?? ''}`).join(', '));
  } else {
    sections.push('위험 표지 없음');
  }
  if (data.candidateNames.length > 0) {
    sections.push(data.candidateNames.map((name, index) => `후보지 ${name}, 비용 ${data.candidateCosts[index]}단계`).join(', '));
    sections.push(selectedCandidateId !== null && data.candidateIds.includes(selectedCandidateId) ? '선택됨' : '선택되지 않음');
  } else {
    sections.push('후보지 없음');
  }
  sections.push(data.existingNames.length > 0 ? `기존 시설 ${data.existingNames.join(', ')}` : '기존 시설 없음');
  return sections.join('. ');
}

function patternFor(data: CoordinateData): string {
  const [firstRisk] = data.riskKinds;
  if (firstRisk) return riskPattern(firstRisk);
  if (data.candidateIds.length > 0 || data.existingNames.length > 0) return 'ring';
  if (data.zoneNames.length > 0) return 'dots';
  if (data.roadUnits.length > 0) return 'lines';
  return 'ring';
}

function moveCoordinate(
  current: GridCoordinate,
  key: string,
  rows: number,
  columns: number,
): GridCoordinate {
  if (key === 'Home') return { ...current, column: 0 };
  if (key === 'End') return { ...current, column: columns - 1 };
  const delta = key === 'ArrowUp' ? { row: -1, column: 0 }
    : key === 'ArrowDown' ? { row: 1, column: 0 }
      : key === 'ArrowLeft' ? { row: 0, column: -1 }
        : key === 'ArrowRight' ? { row: 0, column: 1 } : null;
  if (delta === null) return current;
  return {
    row: Math.min(rows - 1, Math.max(0, current.row + delta.row)),
    column: Math.min(columns - 1, Math.max(0, current.column + delta.column)),
    label: current.label,
  };
}

export function GridMap({ city, activeLayerIds, selectedCandidateId, onSelectCandidate }: GridMapProps) {
  const [activeCoordinateState, setActiveCoordinate] = useState<GridCoordinate>(() => city.nodes[0] ?? { row: 0, column: 0, label: 'A1' });
  const activeCoordinate = city.nodes.find((item) => item.label === activeCoordinateState.label)
    ?? city.nodes[0]
    ?? { row: 0, column: 0, label: 'A1' };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) {
      event.preventDefault();
      const next = moveCoordinate(activeCoordinate, event.key, city.rows, city.columns);
      const node = city.nodes.find((item) => item.row === next.row && item.column === next.column);
      if (node) setActiveCoordinate(node);
      return;
    }
    if (event.key === 'Enter' || event.key === ' ' || event.key === 'Spacebar') {
      const candidate = city.candidates.find((item) => item.coordinate.label === activeCoordinate.label);
      if (candidate) {
        event.preventDefault();
        onSelectCandidate(candidate.id);
      }
    }
  };

  return (
    <div className="grid-map-wrap">
      <p className="grid-coordinate-status" aria-live="polite">현재 좌표: {activeCoordinate.label}</p>
      <div
        className="city-grid"
        role="grid"
        tabIndex={0}
        aria-label={`${city.name} 가상 격자 지도`}
        aria-rowcount={city.rows}
        aria-colcount={city.columns}
        aria-activedescendant={cellId(city, activeCoordinate)}
        onKeyDown={handleKeyDown}
      >
        {Array.from({ length: city.rows }, (_, row) => (
          <div className="grid-row" role="row" aria-rowindex={row + 1} key={`row-${row}`} style={{ gridTemplateColumns: `repeat(${city.columns}, minmax(8rem, 1fr))` }}>
            {Array.from({ length: city.columns }, (_, column) => {
              const coordinate = city.nodes.find((node) => node.row === row && node.column === column)
                ?? { row, column, label: `${String.fromCharCode(65 + column)}${row + 1}` };
              const data = getCoordinateData(city, coordinate);
              const label = cellLabel(data, selectedCandidateId);
              const isActive = coordinate.label === activeCoordinate.label;
              const isSelected = data.candidateIds.includes(selectedCandidateId ?? '');
              return (
                <div
                  className={`grid-cell${isActive ? ' is-active' : ''}${isSelected ? ' is-selected' : ''}`}
                  id={cellId(city, coordinate)}
                  role="gridcell"
                  aria-rowindex={row + 1}
                  aria-colindex={column + 1}
                  aria-label={label}
                  aria-selected={isSelected}
                  data-coordinate={coordinate.label}
                  data-pattern={patternFor(data)}
                  key={coordinate.label}
                  onClick={() => {
                    const candidate = city.candidates.find((item) => item.coordinate.label === coordinate.label);
                    if (candidate) onSelectCandidate(candidate.id);
                  }}
                >
                  <strong>{coordinate.label}</strong>
                  {hasLayer(activeLayerIds, 'population') && data.zoneNames.length > 0 && <span className="grid-marker pattern-dots" data-pattern="dots">● {data.peopleTokens}</span>}
                  {hasLayer(activeLayerIds, 'roads') && <span className="grid-marker pattern-lines" data-pattern="lines">↔ {data.roadUnits.length > 0 ? data.roadUnits.join('/') : '연결 없음'}</span>}
                  {hasLayer(activeLayerIds, 'risk') && data.riskKinds.map((kind, index) => <span className={`grid-marker pattern-${riskPattern(kind)}`} data-pattern={riskPattern(kind)} key={`${kind}-${index}`}>{kind === 'water-ponding' ? '≋' : '⌁'} {riskName(kind)}</span>)}
                  {hasLayer(activeLayerIds, 'cost') && data.candidateNames.map((name, index) => <span className="grid-marker pattern-ring" data-pattern="ring" key={`${name}-${index}`}>▣ {name} · 비용 {data.candidateCosts[index]}</span>)}
                  {hasLayer(activeLayerIds, 'existing-facilities') && data.existingNames.map((name) => <span className="grid-marker pattern-ring" data-pattern="ring" key={name}>⌂ {name}</span>)}
                  {isSelected && <span className="grid-marker selected-marker">✓ 선택됨</span>}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <p className="grid-help">화살표로 칸을 옮기고, 후보지가 있는 칸에서 Enter 또는 Space를 누르면 선택합니다.</p>
    </div>
  );
}

export { COVERAGE_NAMES, RISK_NAMES };
