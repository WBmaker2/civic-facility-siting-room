import { ProgressStepper } from '../navigation/ProgressStepper';
import { SessionProvider, useSession } from '../state/SessionProvider';
import { STAGE_LABELS } from '../state/sessionTypes';
import { MODEL_LIMIT_NOTICE } from '../content/learnerCopy';

function StagePlaceholder() {
  const { state } = useSession();
  const label = STAGE_LABELS[state.stage];
  return (
    <section aria-labelledby="stage-heading" data-stage-id={state.stage} role="region">
      <h2 id="stage-heading">{label}</h2>
      <p>현재 단계에서 도시 자료와 입지 조건을 살펴봅니다.</p>
    </section>
  );
}

function SessionShell() {
  const { state } = useSession();
  return (
    <main>
      <h1>도시 기능 입지 심의실</h1>
      <p role="note">{MODEL_LIMIT_NOTICE}</p>
      <ProgressStepper currentStage={state.stage} />
      <StagePlaceholder />
    </main>
  );
}

export function App() {
  return <SessionProvider><SessionShell /></SessionProvider>;
}
