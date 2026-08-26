import { STAGE_LABELS, STAGE_ORDER, type StageId } from '../state/sessionTypes';

export function ProgressStepper({ currentStage }: { currentStage: StageId }) {
  return <nav aria-label="학습 단계"><p>현재 단계: {STAGE_LABELS[currentStage]}</p><ol>{STAGE_ORDER.map((stage) => <li key={stage} data-stage={stage} aria-current={stage === currentStage ? 'step' : undefined}><span>{STAGE_LABELS[stage]}</span></li>)}</ol></nav>;
}
