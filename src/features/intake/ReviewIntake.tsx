import { MISSIONS } from '../../domain/missions';
import type { MissionDefinition, PriorityId } from '../../domain/types';
import { PRIVACY_NOTICE, SOCIAL_SAFETY_NOTICE } from '../../content/learnerCopy';
import { cityForId, hasValidIntakeContext, missionForId } from '../../state/sessionReducer';
import { useSession } from '../../state/SessionProvider';

const PRIORITIES: ReadonlyArray<{ id: PriorityId; label: string; tradeoff: string }> = [
  {
    id: 'access-equity',
    label: '접근성',
    tradeoff: '여러 구역이 고르게 이용하기 쉽도록 가장 멀거나 이동이 불편한 구역을 먼저 살핍니다. 대신 비용이 더 들 수 있습니다.',
  },
  {
    id: 'safety',
    label: '안전',
    tradeoff: '가상 위험 표지가 없는 터를 우선합니다. 대신 일부 구역의 이동 단위가 커질 수 있습니다.',
  },
  {
    id: 'cost',
    label: '비용',
    tradeoff: '적은 상대 예산 토큰을 우선합니다. 대신 먼 구역이나 불편한 구역이 생길 수 있습니다.',
  },
];

const MISSION_LIST = Object.values(MISSIONS);

function facilityPurpose(mission: MissionDefinition): string {
  if (mission.id === 'bookmaru-library') return '책과 배움 자료를 이용하는 작은 도서관입니다.';
  if (mission.id === 'health-help-center') return '일상 건강 상담 시설이며 응급 출동 시간을 예측하지 않습니다.';
  if (mission.id === 'living-culture-center') return '주민이 함께 배우고 활동하는 생활 문화센터입니다.';
  return '도서관과 일상 건강 상담 시설을 함께 검토하는 복합 심의입니다.';
}

function MissionCard({ mission, open }: { mission: MissionDefinition; open: boolean }) {
  const city = cityForId(mission.cityId);
  if (city === undefined) return null;
  const isCombined = mission.id === 'combined-review';
  return (
    <details className="mission-card" open={open}>
      <summary>{mission.title}</summary>
      <article className="mission-card-content" aria-labelledby={`mission-${mission.id}`}>
        <h3 id={`mission-${mission.id}`}>{mission.title}</h3>
        <p>배정 도시: <strong>{city.name}</strong></p>
        <p>시설 목적: {facilityPurpose(mission)}</p>
        <p>{isCombined ? '두 시설이 함께 쓰는 공유 예산' : '시설 하나에 쓰는 상대 예산'}: <strong>{mission.budgetTokens}토큰</strong></p>
        {isCombined && (
          <div className="mission-role-note">
            <h4>복합 심의 역할과 순서</h4>
            <div className="mission-role-note-content">
              <p>시설 슬롯 1: 도서관, 시설 슬롯 2: 일상 건강 상담 시설</p>
              <p>한 예산 안에서 도서관과 건강 도움소의 역할을 나누어 맡습니다.</p>
              <p>어느 시설을 우선 설치하고 어느 시설을 나중 설치할지 계획합니다.</p>
            </div>
          </div>
        )}
        <details className="mission-conditions" aria-label={`${mission.title} 공개 조건`}>
          <summary>공개 조건 보기</summary>
          <div className="mission-condition-list">
            <h4>공개 조건</h4>
            {mission.conditions.map((condition) => (
              <p key={condition.code}>{condition.label}{condition.required ? ' (필수)' : ' (참고)'}</p>
            ))}
          </div>
        </details>
        <p>{mission.learningPrompt}</p>
      </article>
    </details>
  );
}

export function ReviewIntake() {
  const { state, dispatch } = useSession();
  const selectedMission = missionForId(state.missionId);
  const selectedCity = selectedMission === undefined ? undefined : cityForId(selectedMission.cityId);
  const canEnterDataRoom = hasValidIntakeContext(state);

  return (
    <section aria-labelledby="stage-heading" data-stage-id="intake" role="region">
      <h2 id="stage-heading">심의 접수</h2>
      <p>권장 시간: <strong>35~45분</strong>. 가상 도시의 자료를 읽고 여러 입지의 장단점을 근거로 비교합니다.</p>
      <p>이 활동의 도시는 <strong>실제 도시가 아닌</strong> 학습용 모형입니다. 숫자는 실제 측정값이 아닙니다.</p>

      <fieldset className="intake-mission-selector">
        <legend>미션 선택</legend>
        <label htmlFor="select-mission">검토할 미션</label>
        <select
          id="select-mission"
          aria-label="미션 선택"
          value={state.missionId ?? ''}
          onChange={(event) => dispatch({ type: 'select-mission', missionId: event.target.value as MissionDefinition['id'] })}
        >
          <option value="">미션을 선택하세요</option>
          {MISSION_LIST.map((mission) => <option key={mission.id} value={mission.id}>{mission.title}</option>)}
        </select>
      </fieldset>

      <div className="mission-list" aria-label="네 가지 미션 안내">
        {MISSION_LIST.map((mission) => <MissionCard key={mission.id} mission={mission} open={selectedMission?.id === mission.id} />)}
      </div>

      {selectedMission && selectedCity && selectedMission.cityId === state.cityId && (
        <aside className="selected-mission-summary" aria-label="선택한 미션 요약">
          <h3>선택한 미션</h3>
          <p>{selectedMission.title} · 배정 도시: {selectedCity.name}</p>
          <p>{facilityPurpose(selectedMission)}</p>
        </aside>
      )}

      <fieldset id="select-priority" className="priority-fieldset">
        <legend>가장 먼저 살필 기준</legend>
        {PRIORITIES.map((priority) => {
          const descriptionId = `priority-help-${priority.id}`;
          return (
            <div className="priority-option" key={priority.id}>
              <label htmlFor={`select-priority-${priority.id}`}>
                <input
                  id={`select-priority-${priority.id}`}
                  name="priority"
                  type="radio"
                  value={priority.id}
                  aria-describedby={descriptionId}
                  checked={state.priorityId === priority.id}
                  onChange={() => dispatch({ type: 'select-priority', priorityId: priority.id })}
                />
                {priority.label}
              </label>
              <p id={descriptionId}>{priority.tradeoff}</p>
            </div>
          );
        })}
      </fieldset>

      <div className="completion-criteria" aria-labelledby="completion-heading">
        <h3 id="completion-heading">완료 조건과 증거</h3>
        <p>다음 자료를 남기면 접수가 끝납니다.</p>
        <div className="completion-criteria-list">
          <p>서로 다른 자료층 두 개 이상을 확인합니다.</p>
          <p>평균 이동 단위와 가장 먼 구역의 결과를 함께 살핍니다.</p>
          <p>누가 더 불편해지는지 구역 자료로 찾습니다.</p>
          <p>선택안과 장점이 다른 대안을 비교합니다.</p>
        </div>
      </div>

      <div className="intake-safety-notices">
        <p>{SOCIAL_SAFETY_NOTICE}</p>
        <p>{PRIVACY_NOTICE}</p>
      </div>
      <button type="button" disabled={!canEnterDataRoom} onClick={() => dispatch({ type: 'go-to-stage', stage: 'data-room' })}>
        도시 자료실로 이동
      </button>
      {!canEnterDataRoom && <p role="status">미션과 우선순위를 모두 선택하면 도시 자료실로 갈 수 있습니다.</p>}
    </section>
  );
}
