import type { MissionDefinition } from '../types';

export const LIBRARY_MISSION: MissionDefinition = {
  id: 'bookmaru-library', cityId: 'mulbit', title: '책마루 도서관을 놓아 보세요', facilityKinds: ['library'], budgetTokens: 3,
  requiredLayers: ['population', 'roads', 'risk', 'cost', 'existing-facilities'], serviceThreshold: 7,
  conditions: [
    { code: 'WITHIN_BUDGET', label: '예산 토큰 3개 안에 놓기', required: true, numericLimit: 3 },
    { code: 'NO_UNREACHABLE_ZONE', label: '도달 불가 구역 없이 놓기', required: true, numericLimit: 0 },
    { code: 'WORST_TRAVEL_WITHIN_LIMIT', label: '가장 먼 구역 이동 단위 7 이하', required: true, numericLimit: 7 },
    { code: 'NO_RISK_SITE', label: '위험 표지가 없는 터 선택하기', required: false, numericLimit: 0 },
    { code: 'COST_WITHIN_PRIORITY_CAP', label: '비용 우선 기준은 2토큰 이하', required: false, numericLimit: 2 },
  ],
  priorityRules: {
    'access-equity': ['NO_UNREACHABLE_ZONE', 'WORST_TRAVEL_WITHIN_LIMIT'],
    safety: ['NO_RISK_SITE'], cost: ['COST_WITHIN_PRIORITY_CAP'],
  },
  learningPrompt: '구역별 사람 토큰과 이동 단위를 살펴 가장 공평한 책마루 도서관 위치를 근거와 함께 제안해 보세요.',
};
export const libraryMission = LIBRARY_MISSION;
