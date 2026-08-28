import type { Dispatch } from 'react';
import type {
  CityId,
  DataLayerId,
  FacilityPlacement,
  LearningEvidence,
  MissionId,
  OpinionDraft,
  PlacementAnalysis,
  PriorityId,
  ProposalSnapshot,
  SessionState,
  StageId,
} from '../domain/types';

export type {
  CityId,
  DataLayerId,
  FacilityPlacement,
  LearningEvidence,
  MissionId,
  OpinionDraft,
  PlacementAnalysis,
  PriorityId,
  ProposalSnapshot,
  SessionState,
  StageId,
};

export const STAGE_ORDER = [
  'intake',
  'data-room',
  'placement',
  'analysis',
  'resident-view',
  'opinion',
] as const satisfies readonly StageId[];

export const STAGE_LABELS: Record<StageId, string> = {
  intake: '심의 접수',
  'data-room': '도시 자료실',
  placement: '후보 배치판',
  analysis: '영향 분석실',
  'resident-view': '주민 관점표',
  opinion: '심의 의견서',
};

export const STAGE_DESCRIPTIONS: Record<StageId, string> = {
  intake: '미션과 먼저 생각할 기준 고르기',
  'data-room': '자료를 두 가지 이상 살펴보기',
  placement: '후보지에 시설 놓기',
  analysis: '평균과 가장 긴 이동 결과 확인하기',
  'resident-view': '어느 구역이 더 불편한지 살펴보기',
  opinion: '근거를 넣어 의견서 완성하기',
};

export type SessionAction =
  | { type: 'select-mission'; missionId: MissionId }
  | { type: 'select-priority'; priorityId: PriorityId }
  | { type: 'toggle-layer'; layerId: DataLayerId }
  | { type: 'select-candidate'; candidateId: string }
  | { type: 'place-facility'; placement: FacilityPlacement }
  | { type: 'store-analysis'; analysis: PlacementAnalysis }
  | { type: 'inspect-metric'; metricId: LearningEvidence['inspectedMetricIds'][number] }
  | { type: 'select-underserved-zone'; zoneId: string }
  | { type: 'save-proposal'; proposal: ProposalSnapshot }
  | { type: 'set-opinion'; opinion: OpinionDraft }
  | { type: 'go-to-stage'; stage: StageId }
  | { type: 'restart-mission' };

export type SessionDispatch = Dispatch<SessionAction>;

export interface SessionSelectors {
  readonly canAdvance: boolean;
  readonly opinionReady: boolean;
}
