import { explainCalculation, type CalculationRow } from '../../engine/explainCalculation';
import type { CityScenario, PlacementAnalysis } from '../../domain/types';

export interface CalculationBasisProps {
  city: CityScenario;
  analysis: PlacementAnalysis;
}

const zoneName = (city: CityScenario, id: string): string => city.zones.find((zone) => zone.id === id)?.name ?? id;
const formatTravel = (units: number | null): string => units === null ? '도달 불가' : `${units} 가상 단위`;
const learnerExplanation = (explanation: string, city: CityScenario): string => city.zones.reduce(
  (text, zone) => text.replaceAll(zone.id, zone.name), explanation,
);

function CalculationDefinitions({ rows, city }: { rows: CalculationRow[]; city: CityScenario }) {
  return (
    <dl className="calculation-definitions">
      {rows.map((row, index) => {
        const id = `calculation-label-${index}`;
        return (
          <div className="calculation-row" key={`${row.label}-${index}`}>
            <dt id={id}>{row.label}</dt>
            <dd role="definition" aria-labelledby={id}>
              <strong>{row.value}</strong>
              <span>{learnerExplanation(row.explanation, city)}</span>
            </dd>
          </div>
        );
      })}
    </dl>
  );
}

function PathTable({ city, analysis }: CalculationBasisProps) {
  const rows = analysis.nearestFacilityAccess.zoneTravel;
  return (
    <details className="impact-path-disclosure">
      <summary>구역별 이동 경로 확인</summary>
      <div className="impact-table-scroll">
        <table className="impact-path-table">
          <caption>구역별 이동 경로 — 가장 가까운 시설 기준</caption>
          <thead>
            <tr><th scope="col">구역</th><th scope="col">노드 경로</th><th scope="col">이동 단위</th><th scope="col">도달 상태</th></tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.zoneId}>
                <th scope="row">{zoneName(city, row.zoneId)}</th>
                <td>{row.pathNodeIds.length === 0 ? '경로 없음' : row.pathNodeIds.join(' → ')}</td>
                <td>{formatTravel(row.travelUnits)}</td>
                <td>{row.travelUnits === null ? '도달 불가' : '도달 가능'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </details>
  );
}

export function CalculationBasis({ city, analysis }: CalculationBasisProps) {
  const rows = explainCalculation(analysis, city);
  return (
    <section className="calculation-basis" aria-labelledby="calculation-basis-heading">
      <h3 id="calculation-basis-heading">계산 근거</h3>
      <CalculationDefinitions rows={rows} city={city} />
      <PathTable city={city} analysis={analysis} />
    </section>
  );
}
