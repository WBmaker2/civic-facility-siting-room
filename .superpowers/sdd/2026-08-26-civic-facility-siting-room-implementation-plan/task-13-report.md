# Task 13 보고서 — 순차 안내와 감소 모션 대안

## RED

- 기준 SHA: `e1e3c6e2bf0788a88f1267db00da13eaa75d17b0`
- 명령: `npm run test:unit -- src/navigation/guidedAction.test.ts src/accessibility/motion.test.tsx`
- 결과: `guidedAction.ts`, `FacilityRange.tsx`가 없어 두 테스트 스위트가 import 해석에 실패했습니다. 구현 부재에 따른 의도된 실패입니다.

## GREEN

- 집중 명령: `npm run test:unit -- src/navigation/guidedAction.test.ts src/accessibility/motion.test.tsx src/features/city-data/CityDataRoom.test.tsx src/features/analysis/ImpactAnalysis.test.tsx src/features/opinion/opinion.test.tsx src/app/App.test.tsx src/app/App.flow.test.tsx`
- 결과: 7개 파일, 50개 테스트 PASS
- 전체 명령: `npm run test:unit`
- 결과: 24개 파일, 199개 테스트 PASS
- 품질 확인: `npm run lint`, `npm run check:lines`, `npm run build`, `git diff --check` 모두 PASS

## 변경

- `getGuidedAction`에 malformed/stale 상태 fail-closed, 중복 자료층·A/B 대안 판별, 의견 완료 상태 null 규칙을 추가했습니다.
- `GuidedActionButton`으로 현재 필수 활동에만 `gi-pulse`를 적용하고, disabled 상태의 static `data-guided`/`다음 필수 활동` 배지를 제공했습니다.
- `useReducedMotion`에 초기 `matchMedia` 값, 현대 이벤트 구독, legacy fallback, cleanup, unavailable fail-safe를 구현했습니다.
- `FacilityRange`를 ImpactAnalysis의 각 배치 후보와 mission 서비스 임계값에 연결해 좌표·가상 서비스 범위·상대 이동 단위를 항상 표시합니다.
- `motion.css`에 레이아웃 이동 없는 2초 aura, 범위 spread, reduced-motion static outline을 추가하고 main entry에 import했습니다.
- CityDataRoom, ImpactAnalysis, SitingOpinionForm, resident-view entry를 공통 안내 버튼으로 연결했습니다. 최종 버튼 이름은 `의견서 작성`으로 통일하고 관련 Task12 테스트를 갱신했습니다.

## 유보

- Task14 업데이트 내역, push/merge/deploy, 외부 저장·영속화는 수행하지 않았습니다.
- browser E2E와 수동 VoiceOver/375px/200% zoom 검증은 Task15 범위로 유보했습니다.
