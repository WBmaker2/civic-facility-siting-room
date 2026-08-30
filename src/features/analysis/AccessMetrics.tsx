import type { CityScenario, GuidedActionId, LearningEvidence, AccessMetrics as AccessMetricsValue } from '../../domain/types';

export interface AccessMetricsProps {
  title: string;
  metrics: AccessMetricsValue;
  city: CityScenario;
  onInspectMetric: (metricId: LearningEvidence['inspectedMetricIds'][number]) => void;
  includeEvidence?: boolean;
  currentAction?: GuidedActionId;
}

const metricLabel: Record<string, string> = {
  average: '평균 이동 단위',
  maximum: '가장 긴 이동 단위',
  unreachable: '도달 불가',
};

const zoneName = (city: CityScenario, id: string): string => city.zones.find((zone) => zone.id === id)?.name ?? id;
const zoneDetail = (city: CityScenario, id: string): string => {
  const zone = city.zones.find((item) => item.id === id);
  return zone === undefined ? id : `${zone.name} (${zone.peopleTokens}명 토큰)`;
};

const units = (value: number | null, oneDecimal = false): string => value === null ? '계산 불가' : `${oneDecimal ? value.toFixed(1) : value} 가상 단위`;
const headingSlug = (title: string): string => title === '전체 주민 접근' ? 'overall' : title === '이동이 어려운 구역' ? 'mobility' : title.includes('개별') ? `facility-${title.includes('도서관') ? 'library' : 'health'}` : 'nearest';

export function EvidenceButton({
  metricId,
  label,
  value,
  detail,
  onInspectMetric,
  guided = false,
}: {
  metricId: LearningEvidence['inspectedMetricIds'][number];
  label: string;
  value: string;
  detail: string;
  onInspectMetric: AccessMetricsProps['onInspectMetric'];
  guided?: boolean;
}) {
  return (
    <button
      type="button"
      className={`impact-evidence-card${guided ? ' gi-pulse' : ''}`}
      aria-label={`${label}: ${value}`}
      aria-describedby={`metric-detail-${metricId}`}
      onFocus={() => onInspectMetric(metricId)}
      onClick={() => onInspectMetric(metricId)}
      data-guided={guided ? 'true' : undefined}
    >
      <span className="impact-metric-label">{label}</span>
      <strong>{value}</strong>
      <span id={`metric-detail-${metricId}`} className="impact-metric-detail">{detail}</span>
      {guided && <span className="guided-metric-badge" aria-hidden="true">먼저 확인</span>}
    </button>
  );
}

export function AccessMetrics({ title, metrics, city, onInspectMetric, includeEvidence = true, currentAction = null }: AccessMetricsProps) {
  const slug = headingSlug(title);
  const worst = metrics.worstServedZoneIds.length === 0
    ? '없음'
    : metrics.worstServedZoneIds.map((id) => zoneDetail(city, id)).join(', ');
  const unreachable = metrics.unreachableZoneIds.length === 0
    ? '없음'
    : metrics.unreachableZoneIds.map((id) => zoneDetail(city, id)).join(', ');
  const denominator = `도달 ${metrics.reachablePeopleTokens} / 전체 ${metrics.totalPeopleTokens}명 토큰`;
  const card = (metricId: 'average' | 'maximum' | 'unreachable', value: string, detail: string) => (
    <EvidenceButton
      key={metricId}
      metricId={metricId}
      label={metricLabel[metricId] ?? metricId}
      value={value}
      detail={detail}
      onInspectMetric={onInspectMetric}
      guided={currentAction === 'inspect-impact-metrics' && (metricId === 'average' || metricId === 'maximum')}
    />
  );

  return (
    <section className="impact-access-metrics" aria-labelledby={`access-${slug}-heading`}>
      <h3 id={`access-${slug}-heading`}>{title}</h3>
      {includeEvidence && (
        <div className="impact-metric-cards metric-summary" aria-label={`${title} 핵심 결과`}>
          {card('average', units(metrics.populationWeightedAverage, true), denominator)}
          {card('maximum', units(metrics.longestReachableTravel), `가장 불리한 도달 가능 구역: ${worst}`)}
          {card('unreachable', `${metrics.unreachableZoneIds.length}개 구역`, `별도 표시: ${unreachable}`)}
        </div>
      )}
      <details className="metric-details" aria-label={`${title} 자세히 보기`}>
        <summary>이 결과를 자세히 읽기</summary>
        <div className="metric-details-content">
          <p><strong>평균 이동 단위:</strong> {units(metrics.populationWeightedAverage, true)} · <strong>가장 긴 이동 단위:</strong> {units(metrics.longestReachableTravel)}</p>
          <p><strong>사람 토큰 분모:</strong> {denominator}</p>
          <p><strong>가장 불리한 구역:</strong> {worst}</p>
          <p><strong>도달 불가 구역:</strong> {metrics.unreachableZoneIds.length}개{metrics.unreachableZoneIds.length > 0 ? ` — ${unreachable}` : ' (없음)'}</p>
        </div>
      </details>
      {metrics.unreachableZoneIds.length > 0 && (
        <p className="impact-high-visibility" role="note">도달 불가 구역은 평균에서 숨기지 않고 따로 표시했습니다</p>
      )}
    </section>
  );
}

export function AccessPathTable({ city, metrics, caption }: { city: CityScenario; metrics: AccessMetricsValue; caption: string }) {
  return (
    <details className="impact-path-disclosure">
      <summary>{caption} 확인</summary>
      <div className="impact-table-scroll">
        <table className="impact-path-table">
          <caption>{caption}</caption>
          <thead><tr><th scope="col">구역</th><th scope="col">노드 경로</th><th scope="col">이동 단위</th><th scope="col">도달 상태</th></tr></thead>
          <tbody>{metrics.zoneTravel.map((row) => (
            <tr key={row.zoneId}>
              <th scope="row">{zoneName(city, row.zoneId)}</th>
              <td>{row.pathNodeIds.length === 0 ? '경로 없음' : row.pathNodeIds.join(' → ')}</td>
              <td>{row.travelUnits === null ? '도달 불가' : `${row.travelUnits} 가상 단위`}</td>
              <td>{row.travelUnits === null ? '도달 불가' : '도달 가능'}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </details>
  );
}

export function ZoneNames({ city, ids }: { city: CityScenario; ids: string[] }) {
  return <>{ids.length === 0 ? '없음' : ids.map((id) => zoneName(city, id)).join(', ')}</>;
}
