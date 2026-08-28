export const MODEL_LIMIT_NOTICE =
  '이 결과는 가상 격자 도시의 교육용 상대 단위로 계산했습니다. 실제 교통량·토지 소유·법률·재난을 반영하지 않으며 실제 도시계획을 대신하거나 응급 서비스 성능을 예측하지 않습니다.';

export const PRIVACY_NOTICE =
  '이름, 학교, 집 주소, 실제 지역은 입력하지 마세요. 작성 내용은 현재 탭에만 남고 새로고침하면 사라집니다.';

export const SOCIAL_SAFETY_NOTICE =
  '시설의 이익과 불편은 구역마다 다르게 나타날 수 있습니다. 시설을 이용하기 어려운 상황은 주민 개인의 잘못이 아닙니다.';

export const TERM_HELP = {
  virtualUnit: '가상 단위는 이 활동 안에서 이동 부담을 비교하려고 만든 숫자입니다.',
  token: '사람 토큰은 실제 사람 수가 아니라 구역별 인구를 나타내는 모형 표지입니다.',
  tradeoff: '절충은 좋은 점을 지키면서 생기는 아쉬운 점을 함께 살피는 방법입니다.',
} as const;

export const FEEDBACK_PROMPTS = {
  averageMissing: '평균과 함께 가장 멀거나 도달하기 어려운 구역도 확인해 보세요.',
  underservedMissing: '이 위치에서 누가 더 불편한지 구역별 표에서 찾아보세요.',
  alternativeMissing: '장점이 다른 두 번째 후보를 비교하고 첫 선택의 약점을 보완해 보세요.',
  tradeoffMissing: '접근성·안전·비용 중 지킨 기준과 감수한 손해를 함께 설명해 보세요.',
} as const;
