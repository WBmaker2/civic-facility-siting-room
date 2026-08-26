import type { MissionDefinition } from '../types';

export const CULTURE_CENTER_MISSION: MissionDefinition = {
  id: 'living-culture-center', cityId: 'mulbit', title: '생활 문화센터를 놓아 보세요', facilityKinds: ['culture-center'], budgetTokens: 3,
  requiredLayers: ['population', 'roads', 'risk', 'cost', 'existing-facilities'], serviceThreshold: 7,
  conditions: [
    { code: 'WITHIN_BUDGET', label: '예산 토큰 3개 안에 놓기', required: true, numericLimit: 3 },
    { code: 'NO_UNREACHABLE_ZONE', label: '도달 불가 구역 없이 놓기', required: true, numericLimit: 0 },
    { code: 'COVERAGE_GAP_WITHIN_LIMIT', label: '문화시설 소외 구역 1곳 이하', required: true, numericLimit: 1 },
    { code: 'NO_RISK_SITE', label: '위험 표지가 없는 터 선택하기', required: false, numericLimit: 0 },
    { code: 'COST_WITHIN_PRIORITY_CAP', label: '비용 우선 기준은 2토큰 이하', required: false, numericLimit: 2 },
  ],
  priorityRules: {
    'access-equity': ['NO_UNREACHABLE_ZONE', 'COVERAGE_GAP_WITHIN_LIMIT'],
    safety: ['NO_RISK_SITE'], cost: ['COST_WITHIN_PRIORITY_CAP'],
  },
  learningPrompt: '기존 문화시설이 있는 구역과 없는 구역을 비교하여 생활 문화센터 위치의 절충과 보완안을 근거와 함께 설명해 보세요.',
};
export const cultureCenterMission = CULTURE_CENTER_MISSION;
