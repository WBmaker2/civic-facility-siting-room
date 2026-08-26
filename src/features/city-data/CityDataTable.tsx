import type { CityScenario, DataLayerId, GridCoordinate } from '../../domain/types';
import { getCoordinateData, type CoordinateData, type GridMapProps } from './GridMap';

export type CityDataTableProps = GridMapProps;

const active = (layers: readonly DataLayerId[], layer: DataLayerId): boolean => layers.includes(layer);

function layerValue(isActive: boolean, value: string, emptyValue: string): string {
  return isActive ? value : `${value} · ${emptyValue} 자료층이 꺼져 있음`;
}

function coordinateRows(city: CityScenario): GridCoordinate[] {
  return city.nodes.length > 0
    ? city.nodes
    : Array.from({ length: city.rows * city.columns }, (_, index) => ({
      row: Math.floor(index / city.columns),
      column: index % city.columns,
      label: `${String.fromCharCode(65 + (index % city.columns))}${Math.floor(index / city.columns) + 1}`,
    }));
}

function populationText(data: CoordinateData): string {
  if (data.zoneNames.length === 0) return '인구 구역 없음';
  return `${data.zoneNames.join(', ')} · 사람 토큰 ${data.peopleTokens}${data.mobilityBarrier ? ' · 이동이 불편할 수 있는 구역' : ''} · ${data.coverageNames.length > 0 ? `기존 보장: ${data.coverageNames.join(', ')}` : '기존 보장 시설 없음'}`;
}

function roadText(data: CoordinateData): string {
  return data.roadUnits.length > 0
    ? `도로 연결 있음 · 연결 이동 단위 ${data.roadUnits.join(', ')}`
    : '도로 연결 없음';
}

function riskText(data: CoordinateData): string {
  return data.riskKinds.length > 0
    ? data.riskKinds.map((kind, index) => `${kind === 'water-ponding' ? '≋ 빗물 고임' : '⌁ 급경사'} · ${data.riskLabels[index] ?? ''}`).join('; ')
    : '위험 표지 없음';
}

export function CityDataTable({ city, activeLayerIds, selectedCandidateId, onSelectCandidate }: CityDataTableProps) {
  const coordinates = coordinateRows(city);
  return (
    <div className="city-table-wrap">
      <div className="city-table-scroll">
        <table className="city-data-table">
          <caption>{city.name} 도시 자료 비교표 — 지도와 같은 가상 자료를 좌표별로 읽습니다.</caption>
          <thead>
            <tr>
              <th scope="col">좌표</th>
              <th scope="col">인구·기존 보장</th>
              <th scope="col">도로·이동 단위</th>
              <th scope="col">위험 표지</th>
              <th scope="col">후보지·비용</th>
              <th scope="col">기존 시설</th>
            </tr>
          </thead>
          <tbody>
            {coordinates.map((coordinate) => {
              const data = getCoordinateData(city, coordinate);
              const candidates = city.candidates.filter((candidate) => candidate.coordinate.label === coordinate.label);
              return (
                <tr key={coordinate.label} data-coordinate={coordinate.label}>
                  <th scope="row">{coordinate.label}</th>
                  <td>{layerValue(active(activeLayerIds, 'population'), populationText(data), '인구')}</td>
                  <td>{layerValue(active(activeLayerIds, 'roads'), roadText(data), '도로·이동 단위')}</td>
                  <td>
                    <span className={`table-risk${data.riskKinds.length > 0 ? ` pattern-${data.riskKinds[0] === 'water-ponding' ? 'waves' : 'crosshatch'}` : ''}`} data-pattern={data.riskKinds.length > 0 ? (data.riskKinds[0] === 'water-ponding' ? 'waves' : 'crosshatch') : undefined}>
                      {layerValue(active(activeLayerIds, 'risk'), riskText(data), '위험')}
                    </span>
                  </td>
                  <td>
                    {candidates.length > 0 ? candidates.map((candidate) => (
                      <label className="candidate-choice" key={candidate.id}>
                        <input
                          type="radio"
                          name={`${city.id}-candidate`}
                          value={candidate.id}
                          checked={selectedCandidateId === candidate.id}
                          onChange={() => onSelectCandidate(candidate.id)}
                        />
                        <span>{candidate.name} · 비용 {candidate.costTokens}단계</span>
                      </label>
                    )) : <span>후보지 없음</span>}
                  </td>
                  <td>{layerValue(active(activeLayerIds, 'existing-facilities'), data.existingNames.length > 0 ? `기존 시설: ${data.existingNames.join(', ')}` : '기존 시설 없음', '기존 시설')}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="table-note">후보지 라디오를 선택하면 지도 보기와 같은 후보지 ID가 선택됩니다. 꺼진 자료층은 표에 이유를 표시하며, 다른 층의 정보는 색에 의존하지 않습니다.</p>
    </div>
  );
}
