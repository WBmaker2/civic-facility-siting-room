import { PRIVACY_NOTICE, SOCIAL_SAFETY_NOTICE, TERM_HELP } from '../../content/learnerCopy';
import { useState } from 'react';
import type { CityScenario, OpinionDraft, PriorityId, ProposalSnapshot } from '../../domain/types';
import { cloneOpinionDraft, cloneOpinionProposals, isOpinionTextWithinLimit, validateOpinion, type OpinionErrorKey } from './validateOpinion';
import type { GuidedActionId } from '../../domain/types';
import { GuidedActionButton } from '../../navigation/GuidedActionButton';

export interface SitingOpinionFormProps {
  draft: OpinionDraft;
  proposals: ProposalSnapshot[];
  intakePriorityId?: PriorityId | null;
  priorityId?: PriorityId | null;
  city?: CityScenario;
  onChange?: (draft: OpinionDraft) => void;
  onDraftChange?: (draft: OpinionDraft) => void;
  onSubmit?: () => void;
  onSave?: () => void;
  currentAction?: GuidedActionId;
}

const PRIORITIES: readonly { id: PriorityId; label: string }[] = [
  { id: 'access-equity', label: '접근성' },
  { id: 'safety', label: '안전' },
  { id: 'cost', label: '비용' },
];
const METRICS = [
  { id: 'average', label: '평균 이동 단위' },
  { id: 'maximum', label: '가장 긴 이동 단위' },
  { id: 'unreachable', label: '도달 불가 구역' },
  { id: 'risk', label: '위험 조건' },
  { id: 'cost', label: '비용 조건' },
] as const;

const priorityLabel = (id: PriorityId | null): string => PRIORITIES.find((priority) => priority.id === id)?.label ?? '선택한 기준';
const errorId = (key: OpinionErrorKey): string => `opinion-error-${key}`;
type TouchedState = Partial<Record<OpinionErrorKey | 'priority', boolean>>;

export function SitingOpinionForm({ draft, proposals, intakePriorityId, priorityId, city, onChange, onDraftChange, onSubmit, onSave, currentAction = null }: SitingOpinionFormProps) {
  const [touched, setTouched] = useState<TouchedState>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const intake = intakePriorityId ?? priorityId ?? null;
  const safeDraft = cloneOpinionDraft(draft);
  const safeProposals = cloneOpinionProposals(proposals);
  if (safeDraft === null || safeProposals === null || !isOpinionTextWithinLimit(safeDraft?.rationale) || !isOpinionTextWithinLimit(safeDraft?.counterargument) || !isOpinionTextWithinLimit(safeDraft?.mitigation)) {
    return <section aria-labelledby="opinion-form-heading" data-stage-id="opinion" role="region"><h2 id="opinion-form-heading">심의 의견서</h2><p role="alert">의견서 자료를 표시할 수 없습니다. 앞 단계의 두 제안과 작성 자료를 다시 확인해 주세요.</p></section>;
  }
  const validation = validateOpinion(safeDraft, safeProposals);
  const selected = safeProposals.find((proposal) => proposal.id === safeDraft.selectedProposalId) ?? null;
  const rows = selected?.analysis.nearestFacilityAccess.zoneTravel ?? [];
  const emit = (next: OpinionDraft) => {
    (onChange ?? onDraftChange)?.(next);
  };
  const update = <K extends keyof OpinionDraft>(key: K, value: OpinionDraft[K]) => emit({ ...safeDraft, [key]: value });
  const showError = (key: OpinionErrorKey): boolean => submitAttempted || touched[key] === true;
  const showPriorityError = (): boolean => submitAttempted || touched.priority === true;
  const touch = (key: OpinionErrorKey) => setTouched((previous) => ({ ...previous, [key]: true }));
  const handleSubmit = () => {
    setSubmitAttempted(true);
    if (validation.complete && safeDraft.priorityId === intake) (onSubmit ?? onSave)?.();
  };
  const textField = (key: 'rationale' | 'counterargument' | 'mitigation', label: string, frame: string) => {
    const error = validation.errors[key];
    const errorVisible = error !== null && showError(key);
    return (
      <div className="opinion-field">
        <label htmlFor={`opinion-${key}`}>{label}</label>
        <p className="sentence-frame">{frame}</p>
        <textarea className="opinion-textarea" id={`opinion-${key}`} value={safeDraft[key]} maxLength={300} minLength={10} aria-invalid={errorVisible ? true : undefined} aria-describedby={errorVisible ? errorId(key) : undefined} onChange={(event) => update(key, event.target.value)} onBlur={() => touch(key)} />
        <p className="sentence-frame-help">문장 틀: 밑줄은 생각을 넣을 자리입니다. 짧은 예: 자료에서 본 이동 부담을 근거로 씁니다.</p>
        {errorVisible && <p id={errorId(key)} role="alert">{error}</p>}
      </div>
    );
  };

  return (
    <section aria-labelledby="opinion-form-heading" data-stage-id="opinion" role="region">
      <h2 id="opinion-form-heading">심의 의견서</h2>
      <p>공개된 자료와 두 제안의 차이를 근거로 자신의 의견을 작성합니다. 이 양식은 글의 의미를 자동으로 채점하지 않습니다.</p>
      <p role="note">{PRIVACY_NOTICE}</p>
      <p role="note">{SOCIAL_SAFETY_NOTICE}</p>

      <form aria-label="심의 의견서 작성" onSubmit={(event) => { event.preventDefault(); handleSubmit(); }}>
        <fieldset aria-describedby={safeDraft.priorityId !== null && safeDraft.priorityId !== intake && showPriorityError() ? 'opinion-error-priority' : undefined} aria-invalid={safeDraft.priorityId !== null && safeDraft.priorityId !== intake && showPriorityError() ? true : undefined}>
        <legend>우선 기준</legend>
        {PRIORITIES.map((priority) => <label key={priority.id} htmlFor={`opinion-priority-${priority.id}`}>
          <input id={`opinion-priority-${priority.id}`} type="radio" name="opinion-priority" value={priority.id} checked={safeDraft.priorityId === priority.id} onChange={() => { setTouched((previous) => ({ ...previous, priority: true })); update('priorityId', priority.id); }} />
          {priority.label}
        </label>)}
        {intake !== null && <p>심의 접수에서 고른 기준: <strong>{priorityLabel(intake)}</strong></p>}
        {safeDraft.priorityId !== null && safeDraft.priorityId !== intake && showPriorityError() && <p id="opinion-error-priority" role="alert">심의 접수에서 고른 기준과 같은 기준을 선택해 주세요.</p>}
        </fieldset>

        <fieldset aria-describedby={validation.errors.proposal !== null && showError('proposal') ? 'opinion-error-proposal' : undefined} aria-invalid={validation.errors.proposal !== null && showError('proposal') ? true : undefined}>
        <legend>선택안</legend>
        {safeProposals.map((proposal) => <label key={proposal.id} htmlFor={`opinion-proposal-${proposal.id}`}>
          <input id={`opinion-proposal-${proposal.id}`} type="radio" name="opinion-proposal" value={proposal.id} checked={safeDraft.selectedProposalId === proposal.id} onChange={() => update('selectedProposalId', proposal.id)} />
          {proposal.label}
        </label>)}
        {validation.errors.proposal !== null && showError('proposal') && <p id="opinion-error-proposal" role="alert">{validation.errors.proposal}</p>}
        </fieldset>

        <fieldset aria-describedby={validation.errors.evidence !== null && showError('evidence') ? 'opinion-error-evidence' : undefined} aria-invalid={validation.errors.evidence !== null && showError('evidence') ? true : undefined}>
        <legend>공개 조건 근거</legend>
        <p>평균과 가장 긴 이동 결과를 함께 보고, 추가 조건을 하나 이상 선택하세요.</p>
        {METRICS.map((metric) => <label key={metric.id} htmlFor={`opinion-metric-${metric.id}`}>
          <input id={`opinion-metric-${metric.id}`} type="checkbox" name="opinion-metric" value={metric.id} checked={safeDraft.evidenceMetricIds.includes(metric.id)} onChange={(event) => {
            const next = event.target.checked ? [...safeDraft.evidenceMetricIds, metric.id] : safeDraft.evidenceMetricIds.filter((item) => item !== metric.id);
            update('evidenceMetricIds', [...new Set(next)]);
          }} />
          {metric.label}
        </label>)}
        {validation.errors.evidence !== null && showError('evidence') && <p id="opinion-error-evidence" role="alert">{validation.errors.evidence}</p>}
        </fieldset>

      <div className="opinion-field">
        <label htmlFor="opinion-zone">더 불편을 살필 구역</label>
        <select id="opinion-zone" value={safeDraft.underservedZoneId ?? ''} aria-invalid={validation.errors.underservedZone !== null && showError('underservedZone') ? true : undefined} aria-describedby={validation.errors.underservedZone !== null && showError('underservedZone') ? errorId('underservedZone') : undefined} onChange={(event) => update('underservedZoneId', event.target.value || null)}>
          <option value="">구역을 선택하세요</option>
          {rows.map((row) => <option key={row.zoneId} value={row.zoneId}>{city?.zones.find((zone) => zone.id === row.zoneId)?.name ?? row.zoneId}</option>)}
        </select>
        {validation.errors.underservedZone !== null && showError('underservedZone') && <p id={errorId('underservedZone')} role="alert">{validation.errors.underservedZone}</p>}
      </div>

      {textField('rationale', '선택안의 근거', '저는 ___ 기준을 우선하여 ___안을 제안합니다.')}
      <div className="opinion-field">
        <p className="sentence-frame">평균 이동 단위는 ___이고, 가장 불리한 ___구역은 ___입니다.</p>
        <p className="sentence-frame">이 선택은 ___에 유리하지만 ___에는 불리할 수 있습니다.</p>
      </div>
      <p className="opinion-term-help"><strong>용어 도움말</strong> · {TERM_HELP.virtualUnit} {TERM_HELP.token} {TERM_HELP.tradeoff}</p>
      {textField('counterargument', '예상되는 반론', '이에 대한 반론은 ___입니다.')}
      {textField('mitigation', '보완 방법', '이를 보완하기 위해 ___을 함께 제안합니다.')}

      <GuidedActionButton actionId="write-opinion" currentAction={currentAction} disabled={safeDraft.priorityId !== intake} onClick={handleSubmit}>의견서 작성</GuidedActionButton>
        {!validation.complete && <p role="status">필수 조건과 세 문장 내용을 모두 채우면 의견서를 완성할 수 있습니다.</p>}
      </form>
    </section>
  );
}
