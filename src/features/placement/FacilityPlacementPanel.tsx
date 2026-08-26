import type { FacilityKind, FacilityPlacement, MissionDefinition, CityScenario } from '../../domain/types';
import { cityForId, missionForId } from '../../state/sessionReducer';
import { useSession } from '../../state/SessionProvider';
import { CandidateBoard } from './CandidateBoard';

export interface PlacementSlotView {
  slotId: string;
  facilityKind: FacilityKind;
  candidateId: string | null;
}

const facilityLabels: Record<FacilityKind, string> = {
  library: '도서관',
  'health-support': '건강 도움소',
  'culture-center': '생활문화센터',
};

const facilityDisplayName = (mission: MissionDefinition, kind: FacilityKind): string => {
  if (mission.id === 'bookmaru-library' && kind === 'library') return '책마루 도서관';
  return facilityLabels[kind];
};

const slotViews = (mission: MissionDefinition, placements: readonly FacilityPlacement[]): PlacementSlotView[] => {
  const counts = new Map<FacilityKind, number>();
  return mission.facilityKinds.map((facilityKind) => {
    const number = (counts.get(facilityKind) ?? 0) + 1;
    counts.set(facilityKind, number);
    const slotId = `${facilityKind}-${number}`;
    return { slotId, facilityKind, candidateId: placements.find((placement) => placement.slotId === slotId)?.candidateId ?? null };
  });
};

export function getRemainingBudget(
  mission: MissionDefinition,
  city: CityScenario,
  placements: readonly FacilityPlacement[],
): number {
  const totalCost = placements.reduce((total, placement) => {
    const candidate = city.candidates.find((item) => item.id === placement.candidateId);
    return total + (candidate?.costTokens ?? Number.POSITIVE_INFINITY);
  }, 0);
  return mission.budgetTokens - totalCost;
}

const labelForSlot = (slot: PlacementSlotView): string => `${facilityLabels[slot.facilityKind]} ${slot.slotId.split('-').pop() ?? ''}곳`;

export function FacilityPlacementPanel() {
  const { state, dispatch } = useSession();
  const mission = missionForId(state.missionId);
  const city = cityForId(state.cityId);

  if (mission === undefined || city === undefined || mission.cityId !== city.id) {
    return (
      <section aria-labelledby="placement-heading" data-stage-id="placement" role="region">
        <h2 id="placement-heading">후보 배치판</h2>
        <p role="alert">미션과 가상 도시 자료를 확인할 수 없어 시설을 배치할 수 없습니다. 심의 접수에서 다시 선택해 주세요.</p>
      </section>
    );
  }

  const slots = slotViews(mission, state.placements);
  const placedCandidateIds = new Set(state.placements.map((placement) => placement.candidateId));
  const selectedCandidate = city.candidates.find((candidate) => candidate.id === state.selectedCandidateId);
  const remainingBudget = getRemainingBudget(mission, city, state.placements);
  const candidateReasons = new Map<string, string>();
  for (const candidate of city.candidates) {
    if (placedCandidateIds.has(candidate.id)) candidateReasons.set(candidate.id, '다른 시설 슬롯에서 이미 사용한 후보입니다.');
  }
  const disabledCandidateIds = placedCandidateIds;

  const placementForSlot = (slot: PlacementSlotView): FacilityPlacement | null => {
    if (selectedCandidate === undefined) return null;
    return { slotId: slot.slotId, facilityKind: slot.facilityKind, candidateId: selectedCandidate.id };
  };
  const reasonFor = (slot: PlacementSlotView): string => {
    if (state.selectedCandidateId === null) return '후보지를 먼저 선택해 주세요.';
    if (selectedCandidate === undefined) return '선택한 후보를 찾을 수 없습니다.';
    const current = state.placements.find((placement) => placement.slotId === slot.slotId);
    const usedByOtherSlot = state.placements.some((placement) => placement.candidateId === selectedCandidate.id && placement.slotId !== slot.slotId);
    if (usedByOtherSlot) return '이 후보는 다른 시설 슬롯에서 이미 사용 중이므로 배치할 수 없습니다.';
    const next = placementForSlot(slot);
    if (next === null) return '후보지를 먼저 선택해 주세요.';
    const nextPlacements = [...state.placements.filter((placement) => placement.slotId !== slot.slotId), next];
    const nextRemaining = getRemainingBudget(mission, city, nextPlacements);
    if (nextRemaining < 0) return `예산을 ${Math.abs(nextRemaining)}토큰 초과하여 배치할 수 없습니다.`;
    if (current?.candidateId === selectedCandidate.id) return '현재 배치와 같습니다.';
    return '이 후보를 이 시설 슬롯에 배치할 수 있습니다.';
  };

  const canPlace = (slot: PlacementSlotView): boolean => {
    if (selectedCandidate === undefined) return false;
    if (state.placements.some((placement) => placement.candidateId === selectedCandidate.id && placement.slotId !== slot.slotId)) return false;
    const next = placementForSlot(slot);
    if (next === null) return false;
    return getRemainingBudget(mission, city, [...state.placements.filter((placement) => placement.slotId !== slot.slotId), next]) >= 0;
  };

  return (
    <section aria-labelledby="placement-heading" data-stage-id="placement" role="region">
      <h2 id="placement-heading">후보 배치판</h2>
      <p>{mission.title}</p>
      <p role="status" aria-live="polite">남은 예산 토큰 {remainingBudget}</p>
      <CandidateBoard
        city={city}
        selectedCandidateId={state.selectedCandidateId}
        disabledCandidateIds={disabledCandidateIds}
        candidateReasons={candidateReasons}
        onSelectCandidate={(candidateId) => dispatch({ type: 'select-candidate', candidateId })}
      />
      <div className="placement-slots" aria-label="시설 배치 슬롯">
        {slots.map((slot) => {
          const currentCandidate = slot.candidateId === null ? undefined : city.candidates.find((candidate) => candidate.id === slot.candidateId);
          const slotLabel = labelForSlot(slot);
          return (
            <fieldset className="placement-slot" key={slot.slotId}>
              <legend>{slotLabel}</legend>
              <p>{slot.candidateId && currentCandidate
                ? `${facilityDisplayName(mission, slot.facilityKind)} 배치: ${currentCandidate.coordinate.label}`
                : `${facilityLabels[slot.facilityKind]}을(를) 놓을 후보를 선택하세요.`}</p>
              <button
                type="button"
                className="placement-action"
                disabled={!canPlace(slot)}
                aria-describedby={`placement-reason-${slot.slotId}`}
                onClick={() => {
                  const placement = placementForSlot(slot);
                  if (placement !== null && canPlace(slot)) dispatch({ type: 'place-facility', placement });
                }}
              >시설 배치</button>
              <p id={`placement-reason-${slot.slotId}`} role="status" aria-live="polite">{reasonFor(slot)}</p>
            </fieldset>
          );
        })}
      </div>
      <p>각 수치는 실제 도시가 아닌 가상 격자 모형의 상대 단위입니다. 후보지를 바꾸면 영향 분석을 다시 확인해야 합니다.</p>
    </section>
  );
}
