import { ProgressStepper } from '../navigation/ProgressStepper';
import { SessionProvider, useSession } from '../state/SessionProvider';
import { STAGE_LABELS } from '../state/sessionTypes';
import { MODEL_LIMIT_NOTICE } from '../content/learnerCopy';
import { ReviewIntake } from '../features/intake/ReviewIntake';
import { CityDataRoom } from '../features/city-data/CityDataRoom';
import { FacilityPlacementPanel } from '../features/placement/FacilityPlacementPanel';
import { ImpactAnalysis } from '../features/analysis/ImpactAnalysis';
import { cityForId, missionForId } from '../state/sessionReducer';

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
  const { state, dispatch } = useSession();
  const city = cityForId(state.cityId);
  const mission = missionForId(state.missionId);
  const stage = state.stage === 'intake'
    ? <ReviewIntake />
      : state.stage === 'data-room'
        ? <CityDataRoom />
        : state.stage === 'placement'
          ? <FacilityPlacementPanel />
          : state.stage === 'analysis' && city !== undefined && mission !== undefined
            ? <ImpactAnalysis
              city={city}
              mission={mission}
              placements={state.placements}
              analysis={state.analysis}
              onAnalysis={(analysis) => dispatch({ type: 'store-analysis', analysis })}
              onInspectMetric={(metricId) => dispatch({ type: 'inspect-metric', metricId })}
            />
            : state.stage === 'analysis'
              ? <section aria-labelledby="impact-analysis-heading" data-stage-id="analysis" role="region">
                <h2 id="impact-analysis-heading">영향 분석실</h2>
                <p role="alert">미션·배정 도시 자료가 올바르지 않아 영향 분석을 열 수 없습니다. 심의 접수에서 다시 선택해 주세요.</p>
                <button type="button" disabled>영향 계산</button>
              </section>
              : <StagePlaceholder />;
  return (
    <main>
      <h1>도시 기능 입지 심의실</h1>
      <p role="note">{MODEL_LIMIT_NOTICE}</p>
      <ProgressStepper currentStage={state.stage} />
      {stage}
    </main>
  );
}

export function App() {
  return <SessionProvider><SessionShell /></SessionProvider>;
}
