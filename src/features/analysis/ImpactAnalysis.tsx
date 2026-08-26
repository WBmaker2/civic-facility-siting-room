import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { MODEL_LIMIT_NOTICE } from '../../content/learnerCopy';
import { analyzePlacement } from '../../engine/analyzePlacement';
import type { CityScenario, FacilityKind, FacilityPlacement, LearningEvidence, MissionDefinition, PlacementAnalysis } from '../../domain/types';
import { validatePlacements } from '../../domain/placementRules';
import { validatePlacementAnalysis } from '../../engine/validatePlacementAnalysis';
import { AccessMetrics, AccessPathTable, EvidenceButton, ZoneNames } from './AccessMetrics';
import { CalculationBasis } from './CalculationBasis';
import type { GuidedActionId } from '../../domain/types';
import { GuidedActionButton } from '../../navigation/GuidedActionButton';
import { useReducedMotion } from '../../accessibility/useReducedMotion';
import { FacilityRange } from '../range/FacilityRange';

export interface ImpactAnalysisProps {
  city: CityScenario;
  mission: MissionDefinition;
  placements: FacilityPlacement[];
  analysis: PlacementAnalysis | null;
  onAnalysis: (analysis: PlacementAnalysis) => void;
  onInspectMetric: (metricId: LearningEvidence['inspectedMetricIds'][number]) => void;
  onOpenResident?: () => void;
  canOpenResident?: boolean;
  currentAction?: GuidedActionId;
}

type TabId = 'selection' | 'results';
const tabOrder: readonly TabId[] = ['selection', 'results'];

const facilityLabels: Record<FacilityKind, string> = {
  library: '도서관',
  'health-support': '건강 도움소',
  'culture-center': '생활문화센터',
};

const isValidImpactContext = (city: unknown, mission: unknown, placements: unknown): boolean => {
  try {
    if (city === null || typeof city !== 'object' || mission === null || typeof mission !== 'object') return false;
    const cityRecord = city as CityScenario;
    const missionRecord = mission as MissionDefinition;
    return Array.isArray(missionRecord.facilityKinds)
      && cityRecord.id === missionRecord.cityId
      && Array.isArray(placements)
      && placements.length === missionRecord.facilityKinds.length
      && validatePlacements(missionRecord, cityRecord, placements);
  } catch {
    return false;
  }
};

function SelectionPanel({ city, mission, placements, reducedMotion }: Pick<ImpactAnalysisProps, 'city' | 'mission' | 'placements'> & { reducedMotion: boolean }) {
  return (
    <div className="impact-selection-panel-content">
      <h3>배치한 시설</h3>
      {placements.length === 0 ? <p>아직 배치한 시설이 없습니다.</p> : (
        <ul>
          {placements.map((placement) => {
            const candidate = city.candidates.find((item) => item.id === placement.candidateId);
            return <li key={placement.slotId}>
              {facilityLabels[placement.facilityKind]}: {candidate?.name ?? '확인할 수 없는 후보'} ({candidate?.coordinate.label ?? '좌표 없음'})
              {candidate !== undefined && <FacilityRange coordinate={candidate.coordinate} radiusUnits={mission.serviceThreshold} reducedMotion={reducedMotion} />}
            </li>;
          })}
        </ul>
      )}
      <p>{mission.title}</p>
    </div>
  );
}

function ConstraintSection({
  analysis,
  city,
  onInspectMetric,
}: {
  analysis: PlacementAnalysis;
  city: CityScenario;
  onInspectMetric: ImpactAnalysisProps['onInspectMetric'];
}) {
  const riskKindLabels: Record<string, string> = { 'water-ponding': '물 고임', 'steep-slope': '급경사' };
  const riskySites = analysis.riskyCandidateIds.map((id) => {
    const site = city.candidates.find((candidate) => candidate.id === id);
    const marker = site === undefined ? undefined : city.riskMarkers.find((item) => item.nodeId === site.nodeId);
    if (site === undefined || marker === undefined) return site?.name ?? id;
    return `${site.name} (${marker.kind} · ${riskKindLabels[marker.kind] ?? marker.kind} · ${marker.label})`;
  });
  const costs = analysis.placements.map((placement) => {
    const site = city.candidates.find((candidate) => candidate.id === placement.candidateId);
    return site === undefined ? placement.candidateId : `${site.name} ${site.costTokens}토큰`;
  });
  return (
    <div className="impact-constraint-grid">
      <section className="impact-constraint" aria-labelledby="risk-heading">
        <h3 id="risk-heading">위험</h3>
        <EvidenceButton metricId="risk" label="위험" value={riskySites.length === 0 ? '적용 없음' : `${riskySites.length}곳`} detail={riskySites.length === 0 ? '위험 표지가 없는 배치입니다.' : `위험 표지가 있는 터: ${riskySites.join(', ')}`} onInspectMetric={onInspectMetric} />
        <p>{riskySites.length === 0 ? '위험 표지 적용 없음' : `위험 표지: ${riskySites.join(', ')}`}</p>
      </section>
      <section className="impact-constraint" aria-labelledby="cost-heading">
        <h3 id="cost-heading">비용</h3>
        <EvidenceButton metricId="cost" label="비용" value={`${analysis.totalCostTokens} / ${analysis.missionContext.budgetTokens} 토큰`} detail={costs.length === 0 ? '비용 자료 없음' : costs.join(', ')} onInspectMetric={onInspectMetric} />
        <p>{costs.length === 0 ? '비용 자료 없음' : `배치 비용: ${costs.join(', ')}`}</p>
      </section>
      <section className="impact-constraint" aria-labelledby="overlap-heading">
        <h3 id="overlap-heading">기존 시설 중복</h3>
        <p>{analysis.overlapZoneIds.length === 0 ? '없음' : `${analysis.overlapZoneIds.length}곳: `}<ZoneNames city={city} ids={analysis.overlapZoneIds} /></p>
      </section>
      <section className="impact-constraint" aria-labelledby="gap-heading">
        <h3 id="gap-heading">서비스 공백</h3>
        <p>{analysis.coverageGapZoneIds.length === 0 ? '없음' : `${analysis.coverageGapZoneIds.length}곳: `}<ZoneNames city={city} ids={analysis.coverageGapZoneIds} /></p>
      </section>
    </div>
  );
}

function FacilityRoleResults({ city, mission, analysis, onInspectMetric }: {
  city: CityScenario;
  mission: MissionDefinition;
  analysis: PlacementAnalysis;
  onInspectMetric: ImpactAnalysisProps['onInspectMetric'];
}) {
  if (analysis.placements.length < 2 || mission.id !== 'combined-review') return null;
  return (
    <section className="impact-role-results" aria-labelledby="facility-role-heading">
      <h3 id="facility-role-heading">시설 역할별 접근 결과</h3>
      {analysis.placements.map((placement) => {
        const metrics = analysis.perFacility[placement.slotId];
        if (metrics === undefined) return null;
        const facilityName = facilityLabels[placement.facilityKind];
        return (
          <div key={placement.slotId} className="impact-role-result">
            <AccessMetrics title={`${facilityName} 개별 접근`} metrics={metrics} city={city} onInspectMetric={onInspectMetric} includeEvidence={false} />
            <AccessPathTable city={city} metrics={metrics} caption={`${facilityName} 개별 접근 경로`} />
          </div>
        );
      })}
      <div className="impact-role-result">
        <AccessMetrics title="가장 가까운 시설 기준" metrics={analysis.nearestFacilityAccess} city={city} onInspectMetric={onInspectMetric} includeEvidence={false} />
        <AccessPathTable city={city} metrics={analysis.nearestFacilityAccess} caption="가장 가까운 시설 기준 접근 경로" />
      </div>
    </section>
  );
}

function ResultsPanel({ city, mission, analysis, placements, onInspectMetric }: {
  city: CityScenario;
  mission: MissionDefinition;
  analysis: PlacementAnalysis | null;
  placements: FacilityPlacement[];
  onInspectMetric: ImpactAnalysisProps['onInspectMetric'];
}) {
  const displayAnalysis = analysis !== null
    && validatePlacementAnalysis(city, mission, placements, analysis)
    ? analysis
    : null;
  if (analysis === null) return <p role="alert">아직 계산 전입니다. 시설 배치가 완성되면 영향 계산을 눌러 주세요.</p>;
  if (displayAnalysis === null) return <p role="alert">현재 배치와 일치하는 새 분석이 아닙니다. 영향 계산을 다시 눌러 주세요.</p>;
  return (
    <>
      <AccessMetrics title="전체 주민 접근" metrics={displayAnalysis.nearestFacilityAccess} city={city} onInspectMetric={onInspectMetric} />
      {displayAnalysis.mobilityBarrierAccess.zoneTravel.length > 0 && <AccessMetrics title="이동이 어려운 구역" metrics={displayAnalysis.mobilityBarrierAccess} city={city} onInspectMetric={onInspectMetric} includeEvidence={false} />}
      <ConstraintSection analysis={displayAnalysis} city={city} onInspectMetric={onInspectMetric} />
      <FacilityRoleResults city={city} mission={mission} analysis={displayAnalysis} onInspectMetric={onInspectMetric} />
      <CalculationBasis city={city} analysis={displayAnalysis} />
      <p className="model-limit-notice" role="note">{MODEL_LIMIT_NOTICE}</p>
    </>
  );
}

function useNarrowLayout() {
  const [isNarrow, setIsNarrow] = useState(false);
  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return undefined;
    const query = window.matchMedia('(max-width: 600px)');
    const update = () => setIsNarrow(query.matches);
    update();
    query.addEventListener?.('change', update);
    return () => query.removeEventListener?.('change', update);
  }, []);
  return isNarrow;
}

export function ImpactAnalysis({ city, mission, placements, analysis, onAnalysis, onInspectMetric, onOpenResident = () => undefined, canOpenResident = false, currentAction = null }: ImpactAnalysisProps) {
  const [activeTab, setActiveTab] = useState<TabId>('results');
  const [announcement, setAnnouncement] = useState('');
  const [error, setError] = useState('');
  const isNarrow = useNarrowLayout();
  const reducedMotion = useReducedMotion();
  const tabRefs = useRef<Record<TabId, HTMLButtonElement | null>>({ selection: null, results: null });
  const cityRecord = city !== null && typeof city === 'object' ? city as CityScenario : null;
  const missionRecord = mission !== null && typeof mission === 'object' ? mission as MissionDefinition : null;
  const validContext = isValidImpactContext(city, mission, placements);
  if (!validContext || cityRecord === null || missionRecord === null) {
    return (
      <section aria-labelledby="impact-analysis-heading" data-stage-id="analysis" role="region">
        <h2 id="impact-analysis-heading">영향 분석실</h2>
        <p role="alert">미션·도시·시설 배치 자료가 올바르지 않아 결과를 표시할 수 없습니다. 심의 접수에서 다시 확인해 주세요.</p>
        <GuidedActionButton actionId="calculate-impact" currentAction={currentAction} disabled onClick={() => undefined}>영향 계산</GuidedActionButton>
      </section>
    );
  }
  const safePlacements = placements;

  const calculate = () => {
    if (!validContext) {
      setError('미션·도시·시설 배치 자료가 올바르지 않아 영향 계산을 할 수 없습니다.');
      return;
    }
    try {
      const result = analyzePlacement(city, mission, placements);
      onAnalysis(result);
      setError('');
      setAnnouncement('영향 계산이 완료되었습니다. 평균, 가장 긴 이동, 도달 불가, 위험, 비용을 함께 확인하세요.');
    } catch {
      setError('영향 계산을 완료하지 못했습니다. 배치 자료를 다시 확인해 주세요.');
    }
  };
  const activateTab = (tab: TabId) => {
    setActiveTab(tab);
    tabRefs.current[tab]?.focus();
  };
  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, current: TabId) => {
    const index = tabOrder.indexOf(current);
    let next = index;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % tabOrder.length;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index + tabOrder.length - 1) % tabOrder.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabOrder.length - 1;
    if (next !== index || event.key === 'Home' || event.key === 'End') {
      event.preventDefault();
      activateTab(tabOrder[next] ?? current);
    }
  };

  return (
    <section aria-labelledby="impact-analysis-heading" data-stage-id="analysis" role="region">
      <h2 id="impact-analysis-heading">영향 분석실</h2>
      <p>{missionRecord.title}</p>
      <p className="model-limit-notice" role="note">{MODEL_LIMIT_NOTICE}</p>
      {!validContext && <p role="alert">미션·도시·시설 배치 자료가 올바르지 않아 결과를 표시할 수 없습니다. 심의 접수에서 다시 확인해 주세요.</p>}
      <GuidedActionButton actionId="calculate-impact" currentAction={currentAction} disabled={!validContext} onClick={calculate} className="impact-calculate-action">영향 계산</GuidedActionButton>
      <button
        type="button"
        className="resident-view-action"
        disabled={!canOpenResident || analysis === null || !validatePlacementAnalysis(city, mission, placements, analysis)}
        onClick={onOpenResident}
      >주민 관점표로 이동</button>
      {error && <p role="alert">{error}</p>}
      <p role="status" aria-live="polite">{announcement}</p>
      <p className="selected-coordinate">현재 선택 좌표: {safePlacements.map((placement) => cityRecord.candidates.find((candidate) => candidate.id === placement.candidateId)?.coordinate.label ?? '선택 없음').join(', ') || '선택 없음'}</p>

      {isNarrow && (
        <div className="impact-tabs" role="tablist" aria-label="영향 분석 표현 선택">
          <button id="selection-tab" ref={(element) => { tabRefs.current.selection = element; }} type="button" role="tab" aria-selected={activeTab === 'selection'} aria-controls="selection-panel" tabIndex={activeTab === 'selection' ? 0 : -1} onClick={() => setActiveTab('selection')} onKeyDown={(event) => onTabKeyDown(event, 'selection')}>선택 위치</button>
          <button id="results-tab" ref={(element) => { tabRefs.current.results = element; }} type="button" role="tab" aria-selected={activeTab === 'results'} aria-controls="results-panel" tabIndex={activeTab === 'results' ? 0 : -1} onClick={() => setActiveTab('results')} onKeyDown={(event) => onTabKeyDown(event, 'results')}>결과표</button>
        </div>
      )}

      <div className="impact-panels">
        {isNarrow ? (
          <div id="selection-panel" role="tabpanel" aria-labelledby="selection-tab" hidden={activeTab !== 'selection'}>
            <SelectionPanel city={cityRecord} mission={missionRecord} placements={safePlacements} reducedMotion={reducedMotion} />
          </div>
        ) : (
          <section className="impact-selection-panel" aria-labelledby="selection-heading">
            <h3 id="selection-heading">선택 위치</h3>
            <SelectionPanel city={city} mission={mission} placements={placements} reducedMotion={reducedMotion} />
          </section>
        )}
        {isNarrow ? (
          <div id="results-panel" role="tabpanel" aria-labelledby="results-tab" hidden={activeTab !== 'results'}>
            <ResultsPanel city={cityRecord} mission={missionRecord} analysis={analysis} placements={safePlacements} onInspectMetric={onInspectMetric} />
          </div>
        ) : (
          <section className="impact-results-panel" aria-labelledby="results-heading">
            <h3 id="results-heading">결과표</h3>
            <ResultsPanel city={cityRecord} mission={missionRecord} analysis={analysis} placements={safePlacements} onInspectMetric={onInspectMetric} />
          </section>
        )}
      </div>
    </section>
  );
}
