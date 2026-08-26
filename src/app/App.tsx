import { ProgressStepper } from '../navigation/ProgressStepper';
import { SessionProvider, useSession } from '../state/SessionProvider';
import { STAGE_LABELS } from '../state/sessionTypes';
import { useState } from 'react';
import { MODEL_LIMIT_NOTICE } from '../content/learnerCopy';
import { ReviewIntake } from '../features/intake/ReviewIntake';
import { CityDataRoom } from '../features/city-data/CityDataRoom';
import { FacilityPlacementPanel } from '../features/placement/FacilityPlacementPanel';
import { ImpactAnalysis } from '../features/analysis/ImpactAnalysis';
import { ResidentPerspective } from '../features/perspective/ResidentPerspective';
import { AlternativeComparison } from '../features/perspective/AlternativeComparison';
import { compareProposals, createProposalSnapshot } from '../engine/proposalComparison';
import { assessProposal } from '../engine/assessProposal';
import { cityForId, missionForId } from '../state/sessionReducer';
import { selectOpinionReady, selectStageGate } from '../state/sessionReducer';
import { SitingOpinionForm } from '../features/opinion/SitingOpinionForm';
import { OpinionSummary } from '../features/opinion/OpinionSummary';
import { getGuidedAction } from '../navigation/guidedAction';
import { GuidedActionButton } from '../navigation/GuidedActionButton';

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
  const [opinionSubmitted, setOpinionSubmitted] = useState(false);
  const currentAction = opinionSubmitted ? null : (state.stage === 'opinion' && selectOpinionReady(state) ? 'write-opinion' : getGuidedAction(state));
  const city = cityForId(state.cityId);
  const mission = missionForId(state.missionId);
  const proposalInput = (label: 'A안' | 'B안') => {
    if (state.analysis === null || mission === undefined || state.priorityId === null) return null;
    const evidence = {
      ...state.evidence,
      comparedProposalIds: label === 'B안' ? ['proposal-a', 'proposal-b'] : [],
    };
    return createProposalSnapshot(label, state.placements, state.analysis, assessProposal(mission, state.priorityId, state.analysis, evidence));
  };
  const comparison = state.proposals.length === 2 ? (() => {
    try { return compareProposals(state.proposals[0]!, state.proposals[1]!); } catch { return null; }
  })() : null;
  const stage = state.stage === 'intake'
    ? <ReviewIntake />
      : state.stage === 'data-room'
        ? <CityDataRoom currentAction={currentAction} />
        : state.stage === 'placement'
          ? <FacilityPlacementPanel currentAction={currentAction} />
          : state.stage === 'analysis' && city !== undefined && mission !== undefined
            ? <ImpactAnalysis
              city={city}
              mission={mission}
              placements={state.placements}
              analysis={state.analysis}
              onAnalysis={(analysis) => dispatch({ type: 'store-analysis', analysis })}
              onInspectMetric={(metricId) => dispatch({ type: 'inspect-metric', metricId })}
              onOpenResident={() => dispatch({ type: 'go-to-stage', stage: 'resident-view' })}
              canOpenResident={state.evidence.inspectedMetricIds.includes('average') && state.evidence.inspectedMetricIds.includes('maximum')}
              currentAction={currentAction}
            />
            : state.stage === 'analysis'
              ? <section aria-labelledby="impact-analysis-heading" data-stage-id="analysis" role="region">
                <h2 id="impact-analysis-heading">영향 분석실</h2>
                <p role="alert">미션·배정 도시 자료가 올바르지 않아 영향 분석을 열 수 없습니다. 심의 접수에서 다시 선택해 주세요.</p>
                <GuidedActionButton actionId="calculate-impact" currentAction={currentAction} disabled onClick={() => undefined}>영향 계산</GuidedActionButton>
              </section>
              : state.stage === 'resident-view' && city !== undefined && mission !== undefined
                ? <>
                  <ResidentPerspective
                    city={city}
                    mission={mission}
                    placements={state.placements}
                    analysis={state.analysis}
                    selectedZoneId={state.evidence.selectedUnderservedZoneIds[0] ?? null}
                    onSelectZone={(zoneId) => dispatch({ type: 'select-underserved-zone', zoneId })}
                    canSave={state.evidence.selectedUnderservedZoneIds.length > 0}
                    onSaveA={() => { const proposal = proposalInput('A안'); if (proposal !== null) dispatch({ type: 'save-proposal', proposal }); }}
                    onSaveB={() => { const proposal = proposalInput('B안'); if (proposal !== null) dispatch({ type: 'save-proposal', proposal }); }}
                    hasSavedA={state.proposals.length > 0}
                    hasSavedB={state.proposals.length > 1}
                    savedProposal={state.proposals[0] ?? null}
                    onRevise={() => dispatch({ type: 'go-to-stage', stage: 'placement' })}
                  />
                  <AlternativeComparison city={city} mission={mission} first={state.proposals[0] ?? null} second={state.proposals[1] ?? null} comparison={comparison} />
                </>
                : state.stage === 'opinion' && city !== undefined && mission !== undefined
                  ? <>
                    <SitingOpinionForm
                      draft={state.opinion}
                      proposals={state.proposals}
                      intakePriorityId={state.priorityId}
                      city={city}
                      onChange={(opinion) => { setOpinionSubmitted(false); dispatch({ type: 'set-opinion', opinion }); }}
                      onSubmit={() => setOpinionSubmitted(true)}
                      currentAction={currentAction}
                    />
                    {opinionSubmitted && selectOpinionReady(state) && <OpinionSummary
                      draft={state.opinion}
                      proposals={state.proposals}
                      priorityId={state.priorityId}
                      mission={mission}
                      city={city}
                      onRestart={() => { setOpinionSubmitted(false); dispatch({ type: 'restart-mission' }); }}
                    />}
                  </>
                  : <StagePlaceholder />;
  const opinionAction = state.proposals.length === 2 && state.stage === 'resident-view';
  return (
    <main>
      <h1>도시 기능 입지 심의실</h1>
      <p role="note">{MODEL_LIMIT_NOTICE}</p>
      <ProgressStepper currentStage={state.stage} />
      {stage}
      {opinionAction && <GuidedActionButton actionId="write-opinion" currentAction={currentAction} disabled={!selectStageGate(state, 'resident-view')} onClick={() => { dispatch({ type: 'set-opinion', opinion: { ...state.opinion, priorityId: state.priorityId } }); dispatch({ type: 'go-to-stage', stage: 'opinion' }); }}>의견서 작성</GuidedActionButton>}
    </main>
  );
}

export function App() {
  return <SessionProvider><SessionShell /></SessionProvider>;
}
