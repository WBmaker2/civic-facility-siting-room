import type { CityScenario, PlacementAnalysis, PopulationZone } from '../domain/types';

export interface CalculationRow {
  label: string;
  value: string;
  explanation: string;
}

const formatNumber = (value: number | null): string => value === null ? '없음' : `${value}`;

const zoneById = (city: CityScenario, id: string): PopulationZone | undefined =>
  city.zones.find((zone) => zone.id === id);

const zoneNames = (city: CityScenario, ids: string[]): string => ids
  .map((id) => zoneById(city, id)?.name ?? id)
  .join(', ') || '없음';

const weightedNumerator = (analysis: PlacementAnalysis, city: CityScenario): string => analysis.nearestFacilityAccess.zoneTravel
  .filter((travel) => travel.travelUnits !== null)
  .map((travel) => {
    const zone = zoneById(city, travel.zoneId);
    return `${travel.travelUnits} × ${zone?.peopleTokens ?? 0}`;
  })
  .join(' + ') || '0';

const longestZoneNames = (analysis: PlacementAnalysis, city: CityScenario): string => {
  const longest = analysis.nearestFacilityAccess.longestReachableTravel;
  if (longest === null) return '없음';
  const ids = analysis.nearestFacilityAccess.zoneTravel
    .filter((travel) => travel.travelUnits === longest)
    .map((travel) => travel.zoneId)
    .sort();
  return zoneNames(city, ids);
};

const missionBudgets: Record<PlacementAnalysis['missionId'], number> = {
  'bookmaru-library': 3,
  'health-help-center': 3,
  'living-culture-center': 3,
  'combined-review': 4,
};

export function explainCalculation(analysis: PlacementAnalysis, city: CityScenario): CalculationRow[] {
  const access = analysis.nearestFacilityAccess;
  const mobility = analysis.mobilityBarrierAccess;
  const sites = analysis.placements
    .map((placement) => city.candidates.find((candidate) => candidate.id === placement.candidateId))
    .filter((candidate): candidate is NonNullable<typeof candidate> => candidate !== undefined);
  const riskText = analysis.riskyCandidateIds.map((id) => {
    const site = city.candidates.find((candidate) => candidate.id === id);
    const markers = city.riskMarkers.filter((marker) => marker.nodeId === site?.nodeId).map((marker) => marker.label);
    return `${site?.name ?? id} (${markers.join(', ') || '위험 표지'})`;
  }).join(', ') || '없음';
  const costText = sites.map((site) => `${site.name} ${site.costTokens}토큰`).join(', ') || '없음';
  const unreachableTokens = access.unreachableZoneIds.reduce((sum, id) => sum + (zoneById(city, id)?.peopleTokens ?? 0), 0);

  return [
    {
      label: '평균 이동 단위',
      value: `${formatNumber(access.populationWeightedAverage)} 가상 단위`,
      explanation: `(${weightedNumerator(analysis, city)}) ÷ ${access.reachablePeopleTokens}명 토큰 = ${access.populationWeightedAverage ?? '계산 불가'}; 분모는 ${access.reachablePeopleTokens} / ${access.totalPeopleTokens}명 토큰(도달 / 전체)입니다. 모든 수치는 가상 단위입니다.`,
    },
    {
      label: '가장 긴 이동 단위',
      value: `${formatNumber(access.longestReachableTravel)} 가상 단위`,
      explanation: `가장 긴 도달 가능 경로이며, 해당 구역: ${longestZoneNames(analysis, city)}. 미도달 구역은 별도 행에서 확인합니다. 가상 단위는 실제 이동 시간 예측이 아닙니다.`,
    },
    {
      label: '도달 불가',
      value: access.unreachableZoneIds.length === 0 ? '없음' : `${access.unreachableZoneIds.length}개 구역`,
      explanation: access.unreachableZoneIds.length === 0
        ? '모든 구역에 경로가 있습니다. 미도달 인구 토큰은 0입니다. 가상 단위 모형입니다.'
        : `${zoneNames(city, access.unreachableZoneIds)} (${access.unreachableZoneIds.join(', ')}, ${unreachableTokens}명 토큰)는 경로가 없어 평균에서 제외하고 따로 표시했습니다. 가상 단위 모형입니다.`,
    },
    {
      label: '이동이 어려운 구역',
      value: `${formatNumber(mobility.populationWeightedAverage)} 가상 단위`,
      explanation: `이동이 어려운 구역만 따로 계산: 도달 ${mobility.reachablePeopleTokens} / 전체 ${mobility.totalPeopleTokens}명 토큰, 산식은 해당 구역의 이동 단위 × 사람 토큰 ÷ 도달 토큰입니다.`,
    },
    {
      label: '위험 표지',
      value: riskText,
      explanation: '선택한 터의 가상 위험 표지 종류를 숫자 점수나 실제 재난 확률로 바꾸지 않았습니다.',
    },
    {
      label: '예산',
      value: `${analysis.totalCostTokens} / ${missionBudgets[analysis.missionId]} 토큰`,
      explanation: `${costText}; 배치된 터 비용의 합계 ${analysis.totalCostTokens} / 예산 ${missionBudgets[analysis.missionId]} 토큰입니다. 수치는 가상 예산 단위입니다.`,
    },
    {
      label: '기존 시설 중복·공백',
      value: `중복 ${analysis.overlapZoneIds.length}곳 · 공백 ${analysis.coverageGapZoneIds.length}곳`,
      explanation: `기존 시설과 새 시설이 함께 닿는 구역: ${zoneNames(city, analysis.overlapZoneIds)}. 어느 시설에도 닿지 않는 구역: ${zoneNames(city, analysis.coverageGapZoneIds)}. 서비스 기준은 공개된 가상 이동 단위입니다.`,
    },
  ];
}
