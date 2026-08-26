import type { MissionDefinition } from '../types';

export const COMBINED_MISSION: MissionDefinition = {
  id: 'combined-review', cityId: 'maru', title: '두 시설의 절충안을 검토해 보세요', facilityKinds: ['library', 'health-support'], budgetTokens: 4,
  requiredLayers: ['population', 'roads', 'risk', 'cost', 'existing-facilities'], serviceThreshold: 7,
  conditions: [
    { code: 'WITHIN_BUDGET', label: '두 시설을 예산 토큰 4개 안에 놓기', required: true, numericLimit: 4 },
    { code: 'DISTINCT_CANDIDATE_SITES', label: '서로 다른 터 두 곳 선택하기', required: true, numericLimit: 2 },
    { code: 'REQUIRED_FACILITY_MIX', label: '도서관 1곳과 건강 도움소 1곳 놓기', required: true, numericLimit: 2 },
    { code: 'NO_UNREACHABLE_ZONE', label: '도달 불가 구역 없이 놓기', required: true, numericLimit: 0 },
    { code: 'WORST_TRAVEL_WITHIN_LIMIT', label: '가장 먼 구역 이동 단위 7 이하', required: false, numericLimit: 7 },
    { code: 'NO_RISK_SITE', label: '두 터 모두 위험 표지가 없기', required: false, numericLimit: 0 },
    { code: 'COST_WITHIN_PRIORITY_CAP', label: '비용 우선 기준은 3토큰 이하', required: false, numericLimit: 3 },
  ],
  priorityRules: {
    'access-equity': ['NO_UNREACHABLE_ZONE', 'WORST_TRAVEL_WITHIN_LIMIT'],
    safety: ['NO_RISK_SITE'], cost: ['COST_WITHIN_PRIORITY_CAP'],
  },
  learningPrompt: '도서관과 일상 건강 상담 시설을 서로 다른 터에 놓고, 접근성·안전·비용 사이의 절충과 보완안을 근거와 함께 비교해 보세요.',
};
export const combinedMission = COMBINED_MISSION;
