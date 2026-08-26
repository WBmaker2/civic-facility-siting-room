import type { CityScenario, LearningEvidence, AccessMetrics as AccessMetricsValue } from '../../domain/types';

export interface AccessMetricsProps {
  title: string;
  metrics: AccessMetricsValue;
  city: CityScenario;
  onInspectMetric: (metricId: LearningEvidence['inspectedMetricIds'][number]) => void;
  includeEvidence?: boolean;
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
}: {
  metricId: LearningEvidence['inspectedMetricIds'][number];
  label: string;
  value: string;
  detail: string;
  onInspectMetric: AccessMetricsProps['onInspectMetric'];
}) {
  return (
    <button
      type="button"
      className="impact-evidence-card"
      aria-label={`${label}: ${value}`}
      aria-describedby={`metric-detail-${metricId}`}
      onFocus={() => onInspectMetric(metricId)}
      onClick={() => onInspectMetric(metricId)}
    >
      <span className="impact-metric-label">{label}</span>
      <strong>{value}</strong>
      <span id={`metric-detail-${metricId}`} className="impact-metric-detail">{detail}</span>
    </button>
  );
}

export function AccessMetrics({ title, metrics, city, onInspectMetric, includeEvidence = true }: AccessMetricsProps) {
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
    />
  );

  return (
    <section className="impact-access-metrics" aria-labelledby={`access-${slug}-heading`}>
      <h3 id={`access-${slug}-heading`}>{title}</h3>
      {includeEvidence && (
        <div className="impact-metric-cards" aria-label={`${title} 핵심 결과`}>
          {card('average', units(metrics.populationWeightedAverage, true), denominator)}
          {card('maximum', units(metrics.longestReachableTravel), `가장 불리한 도달 가능 구역: ${worst}`)}
          {card('unreachable', `${metrics.unreachableZoneIds.length}개 구역`, `별도 표시: ${unreachable}`)}
        </div>
      )}
      <p><strong>평균 이동 단위:</strong> {units(metrics.populationWeightedAverage, true)} · <strong>가장 긴 이동 단위:</strong> {units(metrics.longestReachableTravel)}</p>
      <p><strong>사람 토큰 분모:</strong> {denominator}</p>
      <p><strong>가장 불리한 구역:</strong> {worst}</p>
      {metrics.unreachableZoneIds.length > 0 && (
        <p className="impact-high-visibility" role="note">도달 불가 구역은 평균에서 숨기지 않고 따로 표시했습니다</p>
      )}
    </section>
  );
}

export function ZoneNames({ city, ids }: { city: CityScenario; ids: string[] }) {
  return <>{ids.length === 0 ? '없음' : ids.map((id) => zoneName(city, id)).join(', ')}</>;
}
