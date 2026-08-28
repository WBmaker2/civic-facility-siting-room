import { STAGE_DESCRIPTIONS, STAGE_LABELS, STAGE_ORDER, type StageId } from '../state/sessionTypes';

export function ProgressStepper({ currentStage }: { currentStage: StageId }) {
  const currentIndex = STAGE_ORDER.indexOf(currentStage);
  return <nav aria-label="학습 단계"><p>현재 단계: {STAGE_LABELS[currentStage]}</p><ol>{STAGE_ORDER.map((stage, index) => {
    const state = index < currentIndex ? 'complete' : index === currentIndex ? 'current' : index === currentIndex + 1 ? 'next' : 'upcoming';
    return <li key={stage} data-stage={stage} data-state={state} aria-current={stage === currentStage ? 'step' : undefined}><span>{STAGE_LABELS[stage]}</span><small>{STAGE_DESCRIPTIONS[stage]}</small></li>;
  })}</ol></nav>;
}
