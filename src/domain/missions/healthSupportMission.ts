import type { MissionDefinition } from '../types';

export const HEALTH_SUPPORT_MISSION: MissionDefinition = {
  id: 'health-help-center', cityId: 'maru', title: '일상 건강 상담 시설을 놓아 보세요', facilityKinds: ['health-support'], budgetTokens: 3,
  requiredLayers: ['population', 'roads', 'risk', 'cost', 'existing-facilities'], serviceThreshold: 6,
  conditions: [
    { code: 'WITHIN_BUDGET', label: '예산 토큰 3개 안에 놓기', required: true, numericLimit: 3 },
    { code: 'NO_UNREACHABLE_ZONE', label: '도달 불가 구역 없이 놓기', required: true, numericLimit: 0 },
    { code: 'MOBILITY_BARRIER_TRAVEL_WITHIN_LIMIT', label: '이동이 불편한 구역의 이동 단위 6 이하', required: true, numericLimit: 6 },
    { code: 'NO_RISK_SITE', label: '위험 표지가 없는 터 선택하기', required: true, numericLimit: 0 },
    { code: 'COST_WITHIN_PRIORITY_CAP', label: '비용 우선 기준은 2토큰 이하', required: false, numericLimit: 2 },
  ],
  priorityRules: {
    'access-equity': ['NO_UNREACHABLE_ZONE', 'MOBILITY_BARRIER_TRAVEL_WITHIN_LIMIT'],
    safety: ['NO_RISK_SITE'], cost: ['COST_WITHIN_PRIORITY_CAP'],
  },
  learningPrompt: '이 시설은 응급실이나 응급 대응 시설이 아니라 일상 건강 상담 시설입니다. 이동이 불편한 구역도 상담을 받으러 가기 쉬운 위치를 근거와 함께 제안해 보세요.',
};
export const healthSupportMission = HEALTH_SUPPORT_MISSION;
