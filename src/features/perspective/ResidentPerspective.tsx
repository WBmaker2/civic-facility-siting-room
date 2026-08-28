import { MODEL_LIMIT_NOTICE, SOCIAL_SAFETY_NOTICE } from '../../content/learnerCopy';
import type { CityScenario, FacilityPlacement, MissionDefinition, PlacementAnalysis, ProposalSnapshot } from '../../domain/types';
import { validatePlacementAnalysis } from '../../engine/validatePlacementAnalysis';
import { shortestTravelPath } from '../../engine/shortestPath';

export interface ResidentPerspectiveProps {
  city: CityScenario;
  mission: MissionDefinition;
  placements: FacilityPlacement[];
  analysis: PlacementAnalysis | null;
  selectedZoneId: string | null;
  onSelectZone: (zoneId: string) => void;
  canSave: boolean;
  onSaveA: () => void;
  onSaveB?: () => void;
  onRevise: () => void;
  hasSavedA?: boolean;
  hasSavedB?: boolean;
  savedProposal?: ProposalSnapshot | null;
}

const facilityLabels = {
  library: '도서관',
  'health-support': '건강 도움소',
  'culture-center': '생활문화센터',
} as const;

const existingBenefit = (city: CityScenario, mission: MissionDefinition, zoneId: string): string => {
  const zone = city.zones.find((item) => item.id === zoneId);
  if (zone === undefined) return '기존 혜택 없음';
  const coveredKinds = new Set(zone.existingCoverage.filter((kind) => mission.facilityKinds.includes(kind)));
  for (const facility of city.existingFacilities) {
    const path = shortestTravelPath(city.roads, zone.nodeId, facility.nodeId);
    if (mission.facilityKinds.includes(facility.facilityKind) && path !== null && path.travelUnits <= mission.serviceThreshold) coveredKinds.add(facility.facilityKind);
  }
  return coveredKinds.size === 0 ? '기존 혜택 없음' : [...coveredKinds].map((kind) => facilityLabels[kind]).join(', ');
};

const newBenefit = (city: CityScenario, mission: MissionDefinition, analysis: PlacementAnalysis, zoneId: string): string => {
  const options = analysis.placements.filter((placement) => mission.facilityKinds.includes(placement.facilityKind));
  const reachedFor = (placement: FacilityPlacement): boolean => {
    const row = analysis.perFacility[placement.slotId]?.zoneTravel.find((travel) => travel.zoneId === zoneId);
    return row?.travelUnits !== null && row?.travelUnits !== undefined && row.travelUnits <= mission.serviceThreshold;
  };
  return options.length === 0
    ? '선택 시설의 새 혜택이 기준 안에 닿지 않음'
    : options.map((placement) => `${facilityLabels[placement.facilityKind]}: ${reachedFor(placement) ? '기준 안' : '기준 밖'}`).join(', ');
};

const inconvenienceReason = (zoneName: string, travel: number | null, longestTravel: number | null): string => {
  if (travel === null) return `${zoneName}에서는 도로가 연결되지 않아 도달할 수 없습니다.`;
  if (longestTravel !== null && travel === longestTravel) return `${zoneName}에서는 가장 긴 ${travel} 이동 단위가 필요해 가장 불리한 구역입니다.`;
  if (travel <= 1) return `${zoneName}에서는 ${travel} 이동 단위로 비교적 가깝습니다.`;
  return `${zoneName}에서는 ${travel} 이동 단위가 필요해 이동 부담을 더 살펴야 합니다.`;
};

export function ResidentPerspective({ city, mission, placements, analysis, selectedZoneId, onSelectZone, canSave, onSaveA, onSaveB, onRevise, hasSavedA = false, hasSavedB = false, savedProposal = null }: ResidentPerspectiveProps) {
  const valid = analysis !== null && validatePlacementAnalysis(city, mission, placements, analysis);
  if (!valid || analysis === null) {
    return (
      <section aria-labelledby="resident-perspective-heading" data-stage-id="resident-view" role="region">
        <h2 id="resident-perspective-heading">주민 관점표</h2>
        <p role="alert">현재 배치와 일치하는 새 분석이 없어 주민 관점표를 표시할 수 없습니다. 영향 분석을 다시 계산해 주세요.</p>
      </section>
    );
  }

  const byZoneId = new Map(analysis.nearestFacilityAccess.zoneTravel.map((row) => [row.zoneId, row]));
  const isDifferentFromA = savedProposal !== null && savedProposal.placements.length === placements.length
    && placements.some((placement) => savedProposal.placements.find((saved) => saved.slotId === placement.slotId && saved.facilityKind === placement.facilityKind && saved.candidateId === placement.candidateId) === undefined);
  const finiteTravel = [...byZoneId.values()]
    .map((row) => row.travelUnits)
    .filter((travel): travel is number => travel !== null);
  const longestTravel = finiteTravel.length === 0 ? null : Math.max(...finiteTravel);
  const rows = [...city.zones].sort((left, right) => {
    const leftTravel = byZoneId.get(left.id)?.travelUnits ?? null;
    const rightTravel = byZoneId.get(right.id)?.travelUnits ?? null;
    const leftGroup = leftTravel === null ? 0 : leftTravel === longestTravel ? 1 : 2;
    const rightGroup = rightTravel === null ? 0 : rightTravel === longestTravel ? 1 : 2;
    return leftGroup === rightGroup ? left.id.localeCompare(right.id) : leftGroup - rightGroup;
  });

  return (
    <section aria-labelledby="resident-perspective-heading" data-stage-id="resident-view" role="region">
      <h2 id="resident-perspective-heading">주민 관점표</h2>
      <p>구역마다 혜택과 이동 부담이 어떻게 달라지는지 확인합니다.</p>
      <p role="note">{SOCIAL_SAFETY_NOTICE}</p>
      <p className="model-limit-notice" role="note">{MODEL_LIMIT_NOTICE}</p>
      <fieldset className="resident-zone-choice">
        <legend>누가 더 불편한가요?</legend>
        <p>표를 살펴보고 한 구역을 선택해 근거로 남겨 주세요.</p>
        <div role="radiogroup" aria-label="불편을 더 살펴볼 구역">
          {rows.map((zone) => (
            <label key={zone.id}>
              <input type="radio" name="underserved-zone" value={zone.id} checked={selectedZoneId === zone.id} onChange={() => onSelectZone(zone.id)} />
              {zone.name}
            </label>
          ))}
        </div>
      </fieldset>
      <div className="perspective-table-wrap">
        <table className="perspective-table">
          <caption>구역별 주민 관점 비교</caption>
          <thead><tr><th scope="col">구역</th><th scope="col">사람 토큰</th><th scope="col">이동 단위</th><th scope="col">도달 여부</th><th scope="col">기존 혜택</th><th scope="col">새 혜택</th><th scope="col">불편 이유</th><th scope="col">이동 조건</th></tr></thead>
          <tbody>{rows.map((zone) => {
            const travel = byZoneId.get(zone.id)?.travelUnits ?? null;
            const unreachable = travel === null;
            return <tr key={zone.id} className={selectedZoneId === zone.id ? 'is-selected' : undefined}>
              <th scope="row">{zone.name}</th>
              <td>{zone.peopleTokens} 사람 토큰</td>
              <td>{unreachable ? '도달 불가' : `${travel} 이동 단위`}</td>
              <td>{unreachable ? '도달 불가' : '도달 가능'}</td>
              <td>{existingBenefit(city, mission, zone.id)}</td>
              <td>{newBenefit(city, mission, analysis, zone.id)}</td>
              <td>{inconvenienceReason(zone.name, travel, longestTravel)}</td>
              <td>{zone.mobilityBarrier ? '이동 조건을 함께 살펴야 합니다' : '추가 이동 조건 표지 없음'}</td>
            </tr>;
          })}</tbody>
        </table>
      </div>
      <div className="perspective-actions">
        {!hasSavedA && !hasSavedB && <button type="button" disabled={!canSave} onClick={onSaveA}>A안 저장</button>}
        {hasSavedA && !hasSavedB && isDifferentFromA && onSaveB !== undefined && <button type="button" disabled={!canSave} onClick={onSaveB}>B안 저장</button>}
        {hasSavedA && !hasSavedB && !isDifferentFromA && <button type="button" onClick={onRevise}>후보 수정하여 B안 만들기</button>}
      </div>
      {!canSave && <p role="status">구역을 하나 선택하면 저장할 수 있습니다.</p>}
    </section>
  );
}
