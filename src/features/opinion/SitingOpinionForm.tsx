import { PRIVACY_NOTICE, SOCIAL_SAFETY_NOTICE } from '../../content/learnerCopy';
import type { CityScenario, OpinionDraft, PriorityId, ProposalSnapshot } from '../../domain/types';
import { validateOpinion, type OpinionErrorKey } from './validateOpinion';

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

export function SitingOpinionForm({ draft, proposals, intakePriorityId, priorityId, city, onChange, onDraftChange, onSubmit, onSave }: SitingOpinionFormProps) {
  const intake = intakePriorityId ?? priorityId ?? null;
  const validation = validateOpinion(draft, proposals);
  const selected = proposals.find((proposal) => proposal.id === draft.selectedProposalId) ?? null;
  const rows = selected?.analysis.nearestFacilityAccess.zoneTravel ?? [];
  const emit = (next: OpinionDraft) => {
    (onChange ?? onDraftChange)?.(next);
  };
  const update = <K extends keyof OpinionDraft>(key: K, value: OpinionDraft[K]) => emit({ ...draft, [key]: value });
  const textField = (key: 'rationale' | 'counterargument' | 'mitigation', label: string, frame: string) => {
    const error = validation.errors[key];
    return (
      <div className="opinion-field">
        <label htmlFor={`opinion-${key}`}>{label}</label>
        <p className="sentence-frame">{frame}</p>
        <textarea id={`opinion-${key}`} value={draft[key]} maxLength={300} minLength={10} aria-invalid={error !== null} aria-describedby={error === null ? undefined : errorId(key)} onChange={(event) => update(key, event.target.value)} />
        {error !== null && <p id={errorId(key)} role="alert">{error}</p>}
      </div>
    );
  };

  return (
    <section aria-labelledby="opinion-form-heading" data-stage-id="opinion" role="region">
      <h2 id="opinion-form-heading">심의 의견서</h2>
      <p>공개된 자료와 두 제안의 차이를 근거로 자신의 의견을 작성합니다. 이 양식은 글의 의미를 자동으로 채점하지 않습니다.</p>
      <p role="note">{PRIVACY_NOTICE}</p>
      <p role="note">{SOCIAL_SAFETY_NOTICE}</p>

      <fieldset>
        <legend>우선 기준</legend>
        {PRIORITIES.map((priority) => <label key={priority.id} htmlFor={`opinion-priority-${priority.id}`}>
          <input id={`opinion-priority-${priority.id}`} type="radio" name="opinion-priority" value={priority.id} checked={draft.priorityId === priority.id} onChange={() => update('priorityId', priority.id)} />
          {priority.label}
        </label>)}
        {intake !== null && <p>심의 접수에서 고른 기준: <strong>{priorityLabel(intake)}</strong></p>}
        {draft.priorityId !== null && draft.priorityId !== intake && <p id="opinion-error-priority" role="alert">심의 접수에서 고른 기준과 같은 기준을 선택해 주세요.</p>}
      </fieldset>

      <fieldset aria-describedby="opinion-error-proposal">
        <legend>선택안</legend>
        {proposals.map((proposal) => <label key={proposal.id} htmlFor={`opinion-proposal-${proposal.id}`}>
          <input id={`opinion-proposal-${proposal.id}`} type="radio" name="opinion-proposal" value={proposal.id} checked={draft.selectedProposalId === proposal.id} onChange={() => update('selectedProposalId', proposal.id)} />
          {proposal.label}
        </label>)}
        {validation.errors.proposal !== null && <p id="opinion-error-proposal" role="alert">{validation.errors.proposal}</p>}
      </fieldset>

      <fieldset aria-describedby="opinion-error-evidence">
        <legend>공개 조건 근거</legend>
        <p>평균과 가장 긴 이동 결과를 함께 보고, 추가 조건을 하나 이상 선택하세요.</p>
        {METRICS.map((metric) => <label key={metric.id} htmlFor={`opinion-metric-${metric.id}`}>
          <input id={`opinion-metric-${metric.id}`} type="checkbox" name="opinion-metric" value={metric.id} checked={draft.evidenceMetricIds.includes(metric.id)} onChange={(event) => {
            const next = event.target.checked ? [...draft.evidenceMetricIds, metric.id] : draft.evidenceMetricIds.filter((item) => item !== metric.id);
            update('evidenceMetricIds', [...new Set(next)]);
          }} />
          {metric.label}
        </label>)}
        {validation.errors.evidence !== null && <p id="opinion-error-evidence" role="alert">{validation.errors.evidence}</p>}
      </fieldset>

      <div className="opinion-field">
        <label htmlFor="opinion-zone">더 불편을 살필 구역</label>
        <select id="opinion-zone" value={draft.underservedZoneId ?? ''} onChange={(event) => update('underservedZoneId', event.target.value || null)}>
          <option value="">구역을 선택하세요</option>
          {rows.map((row) => <option key={row.zoneId} value={row.zoneId}>{city?.zones.find((zone) => zone.id === row.zoneId)?.name ?? row.zoneId}</option>)}
        </select>
        {validation.errors.underservedZone !== null && <p id={errorId('underservedZone')} role="alert">{validation.errors.underservedZone}</p>}
      </div>

      {textField('rationale', '선택안의 근거', '저는 ___ 기준을 우선하여 ___안을 제안합니다.')}
      <div className="opinion-field">
        <p className="sentence-frame">평균 이동 단위는 ___이고, 가장 불리한 ___구역은 ___입니다.</p>
        <p className="sentence-frame">이 선택은 ___에 유리하지만 ___에는 불리할 수 있습니다.</p>
      </div>
      {textField('counterargument', '예상되는 반론', '이에 대한 반론은 ___입니다.')}
      {textField('mitigation', '보완 방법', '이를 보완하기 위해 ___을 함께 제안합니다.')}

      <button type="button" disabled={!validation.complete || draft.priorityId !== intake} onClick={() => { (onSubmit ?? onSave)?.(); }}>의견서 완성</button>
      {!validation.complete && <p role="status">필수 조건과 세 문장 내용을 모두 채우면 의견서를 완성할 수 있습니다.</p>}
    </section>
  );
}
