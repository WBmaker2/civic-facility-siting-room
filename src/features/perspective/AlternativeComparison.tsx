import type { CityScenario, FacilityKind, MissionDefinition, ProposalComparison, ProposalSnapshot } from '../../domain/types';

interface AlternativeComparisonProps {
  city: CityScenario;
  mission: MissionDefinition;
  first: ProposalSnapshot | null;
  second: ProposalSnapshot | null;
  comparison: ProposalComparison | null;
}

const facilityLabels: Record<FacilityKind, string> = {
  library: '도서관',
  'health-support': '건강 도움소',
  'culture-center': '생활문화센터',
};

const metricText = (value: number | null, suffix = ' 이동 단위'): string => value === null ? '계산 불가' : `${value.toFixed(1)}${suffix}`;
const deltaText = (value: number | null, suffix = ' 이동 단위', decimal = false): string => value === null ? '계산 불가' : `${value > 0 ? '+' : ''}${decimal ? value.toFixed(1) : value}${suffix}`;

function ProposalColumn({ title, proposal, city, mission }: { title: string; proposal: ProposalSnapshot; city: CityScenario; mission: MissionDefinition }) {
  return (
    <section className="proposal-column" aria-labelledby={`${proposal.id}-heading`}>
      <h3 id={`${proposal.id}-heading`}>{title}</h3>
      <ul>
        {proposal.placements.map((placement) => {
          const candidate = city.candidates.find((item) => item.id === placement.candidateId);
          return <li key={placement.slotId}>{facilityLabels[placement.facilityKind]}: {candidate?.name ?? '후보 확인 필요'} ({candidate?.coordinate.label ?? '좌표 없음'})</li>;
        })}
      </ul>
      <dl>
        <div><dt>평균 이동</dt><dd>{metricText(proposal.analysis.nearestFacilityAccess.populationWeightedAverage)}</dd></div>
        <div><dt>최대 이동</dt><dd>{metricText(proposal.analysis.nearestFacilityAccess.longestReachableTravel)}</dd></div>
        <div><dt>도달 불가</dt><dd>{proposal.analysis.nearestFacilityAccess.unreachableZoneIds.length}곳</dd></div>
        <div><dt>위험 후보</dt><dd>{proposal.analysis.riskyCandidateIds.length}곳</dd></div>
        <div><dt>비용</dt><dd>{proposal.analysis.totalCostTokens} 토큰</dd></div>
        <div><dt>기존 시설 중복</dt><dd>{proposal.analysis.overlapZoneIds.length}곳</dd></div>
      </dl>
      <h4>공개 조건 결과</h4>
      <ul>{proposal.assessment.conditionResults.map((condition) => <li key={condition.code}>{mission.conditions.find((item) => item.code === condition.code)?.label ?? '공개 조건'}: {condition.passed ? '충족' : '미충족'} — {condition.evidenceText}</li>)}</ul>
    </section>
  );
}

export function AlternativeComparison({ city, mission, first, second, comparison }: AlternativeComparisonProps) {
  return (
    <section aria-labelledby="alternative-comparison-heading" className="alternative-comparison">
      <h2 id="alternative-comparison-heading">A안과 B안 비교</h2>
      {first === null || second === null || comparison === null ? (
        <p>먼저 주민 관점표에서 A안을 저장한 뒤, 후보를 바꾸어 새로 분석하고 B안을 저장해 주세요. 두 안의 장단점을 함께 살펴봅니다.</p>
      ) : (
        <>
          <div className="proposal-columns">
            <ProposalColumn title="A안" proposal={first} city={city} mission={mission} />
            <ProposalColumn title="B안" proposal={second} city={city} mission={mission} />
          </div>
          <section aria-labelledby="comparison-delta-heading" className="comparison-deltas">
            <h3 id="comparison-delta-heading">B안 − A안 변화</h3>
            <ul>
              <li>평균 이동 변화: {deltaText(comparison.averageDelta, ' 이동 단위', true)}</li>
              <li>최대 이동 변화: {deltaText(comparison.maximumDelta)}</li>
              <li>도달 불가 구역 변화: {comparison.newlyUnreachableZoneIds.length}곳 새 미도달, {comparison.newlyReachedZoneIds.length}곳 새 도달</li>
              <li>위험 후보 변화: {deltaText(comparison.riskCountDelta, '곳')}</li>
              <li>비용 변화: {deltaText(comparison.costTokenDelta, ' 토큰')}</li>
              <li>기존 시설 중복 변화: {deltaText(comparison.overlapCountDelta, '곳')}</li>
            </ul>
            <p>새로 도달한 구역: {comparison.newlyReachedZoneIds.length === 0 ? '없음' : comparison.newlyReachedZoneIds.map((id) => city.zones.find((zone) => zone.id === id)?.name ?? id).join(', ')}</p>
            <p>새로 도달하지 못하게 된 구역: {comparison.newlyUnreachableZoneIds.length === 0 ? '없음' : comparison.newlyUnreachableZoneIds.map((id) => city.zones.find((zone) => zone.id === id)?.name ?? id).join(', ')}</p>
            <p>B안에서 더 불편해진 구역: {comparison.moreInconveniencedZoneIds.length === 0 ? '없음' : comparison.moreInconveniencedZoneIds.map((id) => city.zones.find((zone) => zone.id === id)?.name ?? id).join(', ')}</p>
          </section>
          <p className="comparison-sentence-prompt">A안은 ___을 지키지만 ___이 불리하고, B안은 ___을 바꿉니다.</p>
          <p>두 안의 차이를 보고, 더 살펴볼 조건이나 보완 방법을 질문으로 남겨 보세요.</p>
        </>
      )}
    </section>
  );
}
