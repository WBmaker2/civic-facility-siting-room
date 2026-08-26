import { MODEL_LIMIT_NOTICE, PRIVACY_NOTICE, SOCIAL_SAFETY_NOTICE } from '../../content/learnerCopy';
import type { CityScenario, MissionDefinition, OpinionDraft, PriorityId, ProposalSnapshot } from '../../domain/types';

export interface OpinionSummaryProps {
  draft: OpinionDraft;
  proposal?: ProposalSnapshot | null;
  proposals?: ProposalSnapshot[];
  priorityId?: PriorityId | null;
  mission?: MissionDefinition;
  city?: CityScenario;
  onRestart?: () => void;
}

const PRIORITY_LABELS: Record<PriorityId, string> = { 'access-equity': '접근성', safety: '안전', cost: '비용' };
const METRIC_LABELS = { average: '평균 이동 단위', maximum: '가장 긴 이동 단위', unreachable: '도달 불가 구역', risk: '위험 조건', cost: '비용 조건' } as const;
const metricValue = (proposal: ProposalSnapshot, metric: OpinionDraft['evidenceMetricIds'][number]): string => {
  const access = proposal.analysis.nearestFacilityAccess;
  if (metric === 'average') return access.populationWeightedAverage === null ? '계산 불가' : `${access.populationWeightedAverage.toFixed(1)} 이동 단위`;
  if (metric === 'maximum') return access.longestReachableTravel === null ? '계산 불가' : `${access.longestReachableTravel} 이동 단위`;
  if (metric === 'unreachable') return `${access.unreachableZoneIds.length}곳`;
  if (metric === 'risk') return `${proposal.analysis.riskyCandidateIds.length}곳`;
  return `${proposal.analysis.totalCostTokens} 토큰`;
};

export function OpinionSummary({ draft, proposal: explicitProposal = null, proposals = [], priorityId = null, mission, city, onRestart }: OpinionSummaryProps) {
  const proposal = explicitProposal ?? proposals.find((item) => item.id === draft.selectedProposalId) ?? null;
  if (proposal === null) return <section aria-labelledby="opinion-summary-heading"><h2 id="opinion-summary-heading">입지 심의 의견서</h2><p role="alert">선택한 제안의 공개 자료를 찾을 수 없습니다.</p></section>;
  const zoneName = city?.zones.find((zone) => zone.id === draft.underservedZoneId)?.name ?? draft.underservedZoneId ?? '선택한 구역';
  const verdict = proposal.assessment.verdict === 'valid-with-tradeoffs' ? '타당안—절충 확인' : '수정 필요';
  return (
    <section aria-labelledby="opinion-summary-heading" className="opinion-summary">
      <h2 id="opinion-summary-heading">완성한 입지 심의 의견서</h2>
      <p className="opinion-verdict"><strong>{verdict}</strong></p>
      <h3>선택안</h3>
      <p>{proposal.label}</p>
      <h3>우선 기준</h3>
      <p>{PRIORITY_LABELS[priorityId ?? draft.priorityId ?? 'cost']}</p>
      <h3>공개 조건 결과</h3>
      <ul>{proposal.assessment.conditionResults.map((condition) => <li key={condition.code}>{condition.passed ? '충족' : '미충족'} — {condition.evidenceText}</li>)}</ul>
      <h3>선택한 근거 수치</h3>
      <ul>{draft.evidenceMetricIds.map((metric) => <li key={metric}>{METRIC_LABELS[metric]}: {metricValue(proposal, metric)}</li>)}</ul>
      <p>평균 이동 단위와 가장 긴 이동 단위를 함께 살폈습니다.</p>
      <h3>더 불편을 살핀 구역</h3>
      <p>{zoneName}</p>
      <h3>선택안의 근거와 절충</h3>
      <p>{draft.rationale}</p>
      <h3>예상되는 반론</h3>
      <p>{draft.counterargument}</p>
      <h3>보완 방법</h3>
      <p>{draft.mitigation}</p>
      {mission?.id === 'combined-review' && <section aria-labelledby="combined-opinion-heading">
        <h3 id="combined-opinion-heading">복합 심의 역할 분담</h3>
        <p>도서관은 책과 배움 자료를, 건강 도움소는 일상 건강 상담을 맡도록 역할을 나눕니다.</p>
        <p>예산과 이용 조건을 확인하여 한 시설을 먼저 설치하고 다른 시설은 단계적으로 설치합니다.</p>
      </section>}
      <aside aria-label="모형과 안전 안내">
        <p role="note">{MODEL_LIMIT_NOTICE}</p>
        <p role="note">{PRIVACY_NOTICE}</p>
        <p role="note">{SOCIAL_SAFETY_NOTICE}</p>
      </aside>
      <div className="opinion-summary-actions">
        <button type="button" onClick={() => window.print()}>브라우저에서 인쇄</button>
        {onRestart !== undefined && <button type="button" onClick={onRestart}>처음부터 다시 시작</button>}
      </div>
    </section>
  );
}
