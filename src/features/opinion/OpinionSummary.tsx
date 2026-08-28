import { MODEL_LIMIT_NOTICE, PRIVACY_NOTICE, SOCIAL_SAFETY_NOTICE } from '../../content/learnerCopy';
import { CITIES } from '../../domain/cities';
import type { CityScenario, MissionDefinition, OpinionDraft, PriorityId, ProposalSnapshot } from '../../domain/types';
import { MISSIONS } from '../../domain/missions';
import { cloneProposalSnapshot } from '../../engine/proposalComparison';
import { sameSerializableValue } from '../../engine/validatePlacementAnalysis';
import { cloneOpinionDraft, cloneOpinionProposals, isOpinionTextWithinLimit, validateOpinion } from './validateOpinion';
import { useEffect, type RefObject } from 'react';

export interface OpinionSummaryProps {
  draft: OpinionDraft;
  proposal?: ProposalSnapshot | null;
  proposals?: ProposalSnapshot[];
  priorityId?: PriorityId | null;
  mission?: MissionDefinition;
  city?: CityScenario;
  onRestart?: () => void;
  summaryHeadingRef?: RefObject<HTMLHeadingElement | null>;
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

export function OpinionSummary({ draft, proposal: explicitProposal = null, proposals = [], priorityId = null, mission, city, onRestart, summaryHeadingRef }: OpinionSummaryProps) {
  useEffect(() => { summaryHeadingRef?.current?.focus(); }, [summaryHeadingRef]);
  const invalid = (message: string) => <section aria-labelledby="opinion-summary-heading"><h2 id="opinion-summary-heading">입지 심의 의견서</h2><p role="alert">{message}</p></section>;
  const safeDraft = cloneOpinionDraft(draft);
  const safeProposals = cloneOpinionProposals(proposals);
  const canonicalCity = (() => { try { const descriptor = city === undefined ? undefined : Object.getOwnPropertyDescriptor(city, 'id'); const rawId = descriptor !== undefined && 'value' in descriptor ? descriptor.value : null; const id: CityScenario['id'] | null = rawId === 'mulbit' || rawId === 'maru' ? rawId : null; return id !== null && city !== undefined && sameSerializableValue(city, CITIES[id]) ? CITIES[id] : null; } catch { return null; } })();
  const canonicalMission = (() => { try { const descriptor = mission === undefined ? undefined : Object.getOwnPropertyDescriptor(mission, 'id'); const id = descriptor !== undefined && 'value' in descriptor ? descriptor.value : null; return typeof id === 'string' && Object.prototype.hasOwnProperty.call(MISSIONS, id) && mission !== undefined && sameSerializableValue(mission, MISSIONS[id as keyof typeof MISSIONS]) ? MISSIONS[id as keyof typeof MISSIONS] : null; } catch { return null; } })();
  const validation = safeDraft !== null && safeProposals !== null ? validateOpinion(safeDraft, safeProposals) : null;
  if (safeDraft === null || safeProposals === null || validation?.complete !== true || canonicalCity === null || canonicalMission === null || !isOpinionTextWithinLimit(safeDraft?.rationale) || !isOpinionTextWithinLimit(safeDraft?.counterargument) || !isOpinionTextWithinLimit(safeDraft?.mitigation)) return invalid('의견서 자료를 표시할 수 없습니다. 선택안·도시·미션 자료를 다시 확인해 주세요.');
  const safeExplicit = explicitProposal === null ? null : (() => { try { return cloneProposalSnapshot(explicitProposal); } catch { return null; } })();
  const listedExplicit = safeExplicit === null ? null : safeProposals.find((item) => item.id === safeExplicit.id && sameSerializableValue(item, safeExplicit)) ?? null;
  const proposal = safeExplicit !== null ? listedExplicit : safeProposals.find((item) => item.id === safeDraft.selectedProposalId) ?? null;
  const effectivePriority = priorityId ?? safeDraft.priorityId;
  if ((explicitProposal !== null && safeExplicit === null) || proposal === null || safeDraft.selectedProposalId !== proposal.id || effectivePriority === null || !PRIORITY_LABELS[effectivePriority] || (priorityId !== null && safeDraft.priorityId !== priorityId) || proposal.analysis.cityId !== canonicalCity.id || proposal.analysis.missionId !== canonicalMission.id) return invalid('선택안과 우선 기준을 확인할 수 없습니다.');
  const zoneName = canonicalCity.zones.find((zone: CityScenario['zones'][number]) => zone.id === safeDraft.underservedZoneId)?.name ?? safeDraft.underservedZoneId ?? '선택한 구역';
  const verdict = proposal.assessment.verdict === 'valid-with-tradeoffs' ? '타당안—절충 확인' : '수정 필요';
  return (
    <section aria-labelledby="opinion-summary-heading" className="opinion-summary">
      <h2 id="opinion-summary-heading" ref={summaryHeadingRef} tabIndex={-1}>완성한 입지 심의 의견서</h2>
      <p role="status" aria-live="polite">의견서가 완성되었습니다. 살펴본 근거와 다음 보완 방법을 확인하세요.</p>
      <p className="opinion-verdict"><strong>{verdict}</strong></p>
      <h3>선택안</h3>
      <p>{proposal.label}</p>
      <h3>우선 기준</h3>
      <p>{PRIORITY_LABELS[effectivePriority]}</p>
      <h3>공개 조건 결과</h3>
      <ul>{proposal.assessment.conditionResults.map((condition) => <li key={condition.code}>{canonicalMission.conditions.find((item) => item.code === condition.code)?.label ?? condition.code}: {condition.passed ? '충족' : '미충족'} — {condition.evidenceText}</li>)}</ul>
      <h3>선택한 근거 수치</h3>
      <ul>{safeDraft.evidenceMetricIds.map((metric) => <li key={metric}>{METRIC_LABELS[metric]}: {metricValue(proposal, metric)}</li>)}</ul>
      <p>평균 이동 단위와 가장 긴 이동 단위를 함께 살폈습니다.</p>
      <h3>더 불편을 살핀 구역</h3>
      <p>{zoneName}</p>
      <h3>선택안의 근거와 절충</h3>
      <p>{safeDraft.rationale}</p>
      <h3>예상되는 반론</h3>
      <p>{safeDraft.counterargument}</p>
      <h3>보완 방법</h3>
      <p>{safeDraft.mitigation}</p>
      {canonicalMission.id === 'combined-review' && <section aria-labelledby="combined-opinion-heading">
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
