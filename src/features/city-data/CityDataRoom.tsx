import { useRef, useState, type KeyboardEvent } from 'react';
import type { DataLayerId } from '../../domain/types';
import { PRIVACY_NOTICE } from '../../content/learnerCopy';
import { cityForId, hasValidIntakeContext } from '../../state/sessionReducer';
import { useSession } from '../../state/SessionProvider';
import { LayerLegend } from './LayerLegend';
import { CityDataTable } from './CityDataTable';
import { GridMap } from './GridMap';

const LAYERS: ReadonlyArray<{ id: DataLayerId; label: string; prompt: string }> = [
  { id: 'population', label: '인구', prompt: '사람 토큰이 있는 구역을 봅니다.' },
  { id: 'roads', label: '도로·이동 단위', prompt: '도로 연결과 상대 이동 단위를 봅니다.' },
  { id: 'risk', label: '가상 위험 표지', prompt: '빗물 고임·급경사 등 가상 위험 표지를 봅니다.' },
  { id: 'cost', label: '후보지 비용', prompt: '후보지별 1~3단계 상대 예산 토큰을 봅니다.' },
  { id: 'existing-facilities', label: '기존 시설', prompt: '이미 있는 시설과 서비스 공백을 봅니다.' },
];

export function CityDataRoom() {
  const { state, dispatch } = useSession();
  const city = cityForId(state.cityId);
  const [viewMode, setViewMode] = useState<'map' | 'table'>('map');
  const tabRefs = useRef<Record<'map' | 'table', HTMLButtonElement | null>>({ map: null, table: null });
  const reviewedCount = new Set(state.evidence.reviewedLayerIds).size;
  const validReviewContext = hasValidIntakeContext(state);
  const canConfirm = validReviewContext && reviewedCount >= 2;
  const selectedCoordinate = state.selectedCandidateId
    ? city?.candidates.find((candidate) => candidate.id === state.selectedCandidateId)?.coordinate.label ?? '선택 없음'
    : '선택 없음';
  const tabOrder: Array<'map' | 'table'> = ['map', 'table'];
  const activateTab = (nextMode: 'map' | 'table') => {
    setViewMode(nextMode);
    tabRefs.current[nextMode]?.focus();
  };
  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, currentMode: 'map' | 'table') => {
    const currentIndex = tabOrder.indexOf(currentMode);
    let nextIndex = currentIndex;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (currentIndex + 1) % tabOrder.length;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (currentIndex + tabOrder.length - 1) % tabOrder.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = tabOrder.length - 1;
    if (nextIndex !== currentIndex || event.key === 'Home' || event.key === 'End') {
      event.preventDefault();
      activateTab(tabOrder[nextIndex] ?? currentMode);
    }
  };

  return (
    <section aria-labelledby="stage-heading" data-stage-id="data-room" role="region">
      <h2 id="stage-heading">도시 자료실</h2>
      <p>{city ? `${city.name}의 가상 자료를 확인합니다.` : '먼저 미션을 선택해 배정 도시를 정합니다.'}</p>
      <p>이 자료는 실제 도시가 아닌 가상 격자 모형이며, 색 하나만으로 의미를 판단하지 않습니다.</p>

      <fieldset>
        <legend>확인할 자료층</legend>
        {LAYERS.map((layer) => (
          <label key={layer.id} htmlFor={`layer-${layer.id}`}>
            <input
              id={`layer-${layer.id}`}
              aria-label={layer.label}
              type="checkbox"
              checked={state.activeLayerIds.includes(layer.id)}
              onChange={() => dispatch({ type: 'toggle-layer', layerId: layer.id })}
            />
            {layer.label}
            <span> — {layer.prompt}</span>
          </label>
        ))}
      </fieldset>

      <p role="status" aria-live="polite">5개 중 {reviewedCount}개 확인</p>
      <LayerLegend activeLayerIds={state.activeLayerIds} />

      {city && (
        <div className="city-data-views">
          <p className="selected-coordinate" aria-live="polite">{`현재 선택 좌표: ${selectedCoordinate}`}</p>
          <div className="view-tabs" role="tablist" aria-label="도시 자료 표현 선택">
            <button
              id="map-tab"
              ref={(element) => { tabRefs.current.map = element; }}
              type="button"
              role="tab"
              aria-selected={viewMode === 'map'}
              aria-controls={viewMode === 'map' ? 'map-panel' : undefined}
              tabIndex={viewMode === 'map' ? 0 : -1}
              onClick={() => setViewMode('map')}
              onKeyDown={(event) => handleTabKeyDown(event, 'map')}
            >지도 보기</button>
            <button
              id="table-tab"
              ref={(element) => { tabRefs.current.table = element; }}
              type="button"
              role="tab"
              aria-selected={viewMode === 'table'}
              aria-controls={viewMode === 'table' ? 'table-panel' : undefined}
              tabIndex={viewMode === 'table' ? 0 : -1}
              onClick={() => setViewMode('table')}
              onKeyDown={(event) => handleTabKeyDown(event, 'table')}
            >표 보기</button>
          </div>
          {viewMode === 'map' ? (
            <div id="map-panel" role="tabpanel" aria-labelledby="map-tab" aria-label="지도 보기">
              <GridMap
                city={city}
                activeLayerIds={state.activeLayerIds}
                selectedCandidateId={state.selectedCandidateId}
                onSelectCandidate={(candidateId) => dispatch({ type: 'select-candidate', candidateId })}
              />
            </div>
          ) : (
            <div id="table-panel" role="tabpanel" aria-labelledby="table-tab" aria-label="표 보기">
              <CityDataTable
                city={city}
                activeLayerIds={state.activeLayerIds}
                selectedCandidateId={state.selectedCandidateId}
                onSelectCandidate={(candidateId) => dispatch({ type: 'select-candidate', candidateId })}
              />
            </div>
          )}
        </div>
      )}

      <button type="button" disabled={!canConfirm} onClick={() => dispatch({ type: 'go-to-stage', stage: 'placement' })}>
        자료층 확인
      </button>
      {!validReviewContext && (
        <div role="alert">
          <p>미션·배정 도시·우선순위가 확인되지 않아 자료층을 확정할 수 없습니다. 심의 접수에서 다시 선택해 주세요.</p>
          <button type="button" onClick={() => dispatch({ type: 'go-to-stage', stage: 'intake' })}>심의 접수로 돌아가기</button>
        </div>
      )}
      {validReviewContext && !canConfirm && <p>서로 다른 자료층을 두 개 이상 켠 뒤 확인해 주세요.</p>}
      <p>{PRIVACY_NOTICE}</p>
    </section>
  );
}
