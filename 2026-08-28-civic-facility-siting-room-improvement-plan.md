# Civic Facility Siting Room Improvement Plan

작성일: 2026-08-28
상태: 계획 작성 후 Tasks 1~5 구현 및 로컬 품질 검증 완료; GitHub push·Pages 재배포 전
대상: `/Volumes/ External Drive 256G/Dev2/codex/civic-facility-siting-room`
검증 대상: `https://wbmaker2.github.io/civic-facility-siting-room/`

## Goal

초등학생이 도움 없이 처음 접해도 현재 해야 할 일을 이해하고, 자료를 보고, 후보지를 배치하고, 주민 관점에서 비교한 뒤, 자신의 근거를 담은 의견서를 완성하도록 학습 흐름을 개선합니다.

이번 개선은 기존의 결정적 가상 도시 모델, 개인정보 보호, 현재 탭에만 유지되는 상태, 지도·표 동등성, 여섯 단계 게이트를 유지하면서 다음 결과를 보장합니다.

1. 정상적인 A안 중간 저장 상태에 오류가 표시되지 않습니다.
2. 영향 분석에서 다음 단계가 막힐 때 이유와 해야 할 행동이 보이고, 필요한 카드에 `gi-pulse`가 적용됩니다.
3. 0건 결과가 중복 문구 없이 표시됩니다.
4. 후보지 위치가 자료층 학습을 방해하지 않으며, 지도와 표·ARIA 설명이 같은 정보를 전달합니다.
5. 의견서 입력창은 300자 활동에 맞는 크기이고, 사용 전 오류를 쏟아내지 않습니다.
6. 제출 완료가 화면·키보드·스크린 리더 의미 구조로 분명히 전달됩니다. VoiceOver 구현과 VoiceOver 검증은 범위에서 제외합니다.
7. 모바일 고정 버튼, 가로 표, 진행 단계, 어린이용 문장이 학습 흐름을 방해하지 않습니다.
8. 모든 변경은 회귀 테스트와 업데이트 내역 기록으로 추적됩니다.

## Architecture

- **상태 흐름 유지**: `SessionState`와 reducer의 결정적 판정, `LearningEvidence`, `ProposalSnapshot`, `OpinionDraft` 계약은 유지합니다.
- **관심사별 수정**: 비교 상태·영향 게이트·자료 표현·배치 문구·의견서·공통 레이아웃을 각각 현재 기능 폴더에서 수정하고, 500줄에 가까워지는 파일은 새 헬퍼로 분리합니다.
- **안내 상태 확장**: `GuidedActionId`에 영향 결과 카드 확인 상태를 추가하여 `getGuidedAction`과 시각적 강조가 같은 진실을 사용하게 합니다.
- **학습 증거 보존**: 자료층 2개 확인, 평균·최대 결과 확인, 주민 구역 선택, A/B 비교라는 기존 완료 조건을 완화하지 않습니다.
- **오류 상태와 중간 상태 분리**: A안만 저장된 상태, 빈 결과 목록, 아직 입력하지 않은 의견서 필드는 유효한 진행 상태로 렌더링하고, 위조·손상된 데이터만 오류로 처리합니다.
- **접근성 의미 일치**: 화면에 보이는 활성 자료와 ARIA 설명을 일치시키고, `aria-describedby`, `aria-live`, 포커스 이동으로 다음 행동과 완료를 알립니다. OS VoiceOver는 검증하지 않습니다.
- **동작 비용 절약**: 외부 API, 로그인, 저장소, 분석 SDK, 지도/GPS를 추가하지 않습니다.

## Tech Stack

- React 19 + TypeScript 6 + Vite 8
- Vitest 4 + Testing Library + user-event
- Playwright E2E와 axe-core 접근성 검사
- 기존 CSS 토큰, `gi-pulse`, `prefers-reduced-motion` 규칙
- GitHub Pages 정적 배포 경로와 상대 자산 경로

## Spec and acceptance criteria

### 비교·판정 정확성

- `AlternativeComparison`은 정식 `city`·`mission`과 정식 A안만 있는 상태에서 오류 `role="alert"`를 렌더링하지 않고 B안 작성 안내를 렌더링합니다.
- 정식 A안·B안·비교 자료가 모두 있을 때만 변화량을 렌더링합니다.
- `ImpactAnalysis`의 기존 시설 중복과 서비스 공백이 0이면 각각 정확히 `없음` 한 번만 출력합니다.
- 위조된 도시·미션·제안·비교 자료는 기존 fail-closed 오류 화면을 유지합니다.

### 영향 분석 안내

- `GuidedActionId`에 `inspect-impact-metrics`를 추가합니다.
- 배치가 유효하고 최신 분석은 있으나 `average` 또는 `maximum` 증거가 없으면 `getGuidedAction`이 `inspect-impact-metrics`를 반환합니다.
- 평균 이동 단위와 가장 긴 이동 단위 카드에 `gi-pulse`, `data-guided="true"`, 어린이용 안내 배지를 적용합니다.
- 두 카드 확인 전 `주민 관점표로 이동`은 비활성화하되 `aria-describedby`로 “두 결과 카드를 눌러 확인하세요”를 연결합니다.
- 두 카드 확인 후 버튼이 활성화되고, 기존 `gi-pulse` 순서와 reduced-motion 대체 외곽선을 유지합니다.

### 자료층·후보지·표

- 후보지가 있는 좌표는 `후보지 비용` 자료층이 꺼져도 “후보지 있음” 위치 표지가 보여야 합니다. 비용 숫자는 비용 자료층이 켜진 경우에만 노출합니다.
- 지도 셀 ARIA label은 활성 자료층의 상세만 읽고, 후보지 존재와 선택 상태는 항상 포함합니다.
- 표의 꺼진 자료층 안내, 후보지 라디오 선택, 지도와 표 사이 선택 동기화는 유지합니다.
- 모바일 표에는 “좌우로 밀어 더 보기” 안내를 표시하고, 긴 범례는 `details/summary`로 접을 수 있게 합니다.

### 배치·주민 관점

- 후보 선택 뒤 슬롯 설명은 “B2에 책마루 도서관 놓기”처럼 시설명과 좌표를 포함합니다.
- 이미 배치된 동일 상태와 다른 슬롯 사용 상태는 각각 구분된 status 문구를 유지합니다.
- 주민 관점표는 이동 단위·도달 불가 여부·가장 불리한 구역을 문장에 반영합니다. 모든 양의 이동 결과에 같은 문장을 반복하지 않습니다.

### 의견서·완료

- 의견 textarea는 부모 폭을 활용하고 데스크톱·모바일 모두 300자를 작성·검토할 수 있는 최소 높이를 가집니다.
- 빈 의견서 진입 시 오류 `role="alert"`는 보이지 않고, 필드별 도움말만 보입니다. blur 또는 제출 시도 후 해당 오류를 표시합니다.
- 제출 성공 시 결과 영역이 화면에 보이고, `role="status"` 완료 알림과 결과 제목 포커스를 제공합니다.
- 문장 틀은 “문장 틀”이라는 설명과 짧은 예시를 함께 제공하며, `___`가 미완성 입력처럼 보이지 않도록 안내합니다.
- `가상 단위`, `토큰`, `절충` 같은 용어에는 어린이용 설명을 붙이고 자동 채점·정답 판정으로 오해하게 만들지 않습니다.

### 공통 UI·콘텐츠

- 첫 화면은 미션 선택·선택 요약·우선 기준·다음 버튼의 순서를 명확히 하고, 네 미션 상세는 접거나 짧게 보여 줍니다.
- `ProgressStepper`는 현재·완료·다음 단계를 시각적으로 구분하고, 어린이용 단계 설명을 함께 노출합니다.
- 고정 업데이트 버튼이 375px 화면의 콘텐츠를 가리지 않도록 위치 또는 여백을 조정합니다.
- 업데이트 내역은 날짜와 개선 내용을 유지하되 `reflow`, `table-only`, `enabled`, `gi-pulse CTA` 같은 개발자 용어를 사용하지 않습니다.
- 모델 한계·개인정보·사회적 안전 문구는 반복으로 학습 흐름을 막지 않도록 짧은 요약과 펼침 구조를 검토하되, 정보 자체는 삭제하지 않습니다.

## Global Constraints

- 실제 도시계획, 교통량, 법률, 재난, 응급 서비스 성능을 예측한다고 표현하지 않습니다.
- 이름·학교·집 주소·실제 지역을 입력받거나 전송·저장하지 않습니다.
- 외부 네트워크, 지도, AI 추천, 로그인, 분석 도구를 추가하지 않습니다.
- `select`·radio·checkbox·button·textarea는 네이티브 요소를 유지하며 최소 44px 터치 영역을 지킵니다.
- 키보드 화살표·Enter·Space, Tab 순서, 포커스 외곽선, 표 보기 동작을 깨뜨리지 않습니다.
- `prefers-reduced-motion: reduce`에서는 `gi-pulse`와 전환 애니메이션을 제거하고 정적 외곽선으로 대체합니다.
- 단일 소스 파일은 500줄 미만입니다. 새 로직이 500줄에 접근하면 컴포넌트·표현·검증 모듈을 기능별로 분리합니다.
- VoiceOver/TalkBack의 실제 OS 실행은 구현 및 검증 범위에서 제외합니다. 대신 axe, ARIA 스냅샷, 키보드, `aria-live`·포커스 자동 검사를 수행합니다.
- 구현 중 기존 사용자 변경을 덮어쓰지 않고, 계획 문서와 앱 업데이트 기록을 함께 유지합니다.

## Expected file structure and responsibilities

- `src/domain/types.ts`: `GuidedActionId`의 `inspect-impact-metrics` 타입 확장.
- `src/navigation/guidedAction.ts`: 최신 분석 후 평균·최대 결과 증거가 없을 때의 안내 상태 판정.
- `src/navigation/GuidedActionButton.tsx`: 기존 안내 버튼 계약과 `gi-pulse` 데이터 표식 유지.
- `src/features/analysis/ImpactAnalysis.tsx`: 비활성 다음 버튼 설명, 0건 문구, 결과 카드 안내 연결.
- `src/features/analysis/AccessMetrics.tsx`: 결과 카드에 현재 안내 상태와 정적 reduced-motion 표식을 전달.
- `src/features/analysis/ImpactAnalysis.test.tsx`: 0건 문구·분석 게이트·안내 문구 회귀 테스트.
- `src/navigation/guidedAction.test.ts`: `inspect-impact-metrics` 상태 전이 회귀 테스트.
- `src/features/perspective/AlternativeComparison.tsx`: A안만 존재하는 중간 상태와 완성된 A/B 상태 구분.
- `src/features/perspective/perspective.test.tsx`: A안 저장 직후 오류가 없는지 회귀 테스트.
- `src/features/city-data/GridMap.tsx`: 활성 자료층과 ARIA label 일치, 후보지 존재 표지.
- `src/features/city-data/CityDataTable.tsx`: 모바일 가로 스크롤 도움말과 후보지/자료층 표현.
- `src/features/city-data/LayerLegend.tsx`: 접을 수 있는 어린이용 범례.
- `src/features/city-data/CityDataRoom.tsx`: 후보지 확인 안내와 자료층 선택 안내.
- `src/features/city-data/CityDataRoom.test.tsx`: 후보지 표시·표/지도 선택·활성 자료층 의미 회귀 테스트.
- `src/features/placement/FacilityPlacementPanel.tsx`: 선택 좌표와 시설명을 포함한 동적 배치 문구.
- `src/features/placement/placement.test.tsx`: 동적 슬롯 문구와 상태 합격 조건 테스트.
- `src/features/perspective/ResidentPerspective.tsx`: 이동 심각도와 가장 불리한 구역을 드러내는 어린이용 문장.
- `src/features/perspective/perspective.test.tsx`: 이동 단위별 문장 차이 회귀 테스트.
- `src/features/opinion/SitingOpinionForm.tsx`: touched/submit validation, textarea 레이아웃, 문장 틀 안내.
- `src/features/opinion/OpinionSummary.tsx`: 완료 영역의 명시적 status·포커스 대상.
- `src/features/opinion/opinion.test.tsx`: 초기 오류 숨김, 제출 완료 알림, textarea 크기 계약 테스트.
- `src/app/App.tsx`: 제출 결과 포커스와 상태 연결.
- `src/styles/global.css`: textarea 폭·최소 높이와 공통 입력 레이아웃.
- `src/styles/responsive.css`: 모바일 표 스크롤 힌트, 범례·고정 버튼과의 간격.
- `src/app/app.css`: 업데이트 버튼이 콘텐츠를 가리지 않는 모바일 배치.
- `src/navigation/ProgressStepper.tsx`: 단계별 현재·완료·다음 시각 상태.
- `src/state/sessionTypes.ts`: 학습자에게 이해하기 쉬운 단계 표시 문구.
- `src/content/learnerCopy.ts`: 모델·개인정보·사회적 안전·용어 도움말의 어린이용 문장.
- `src/updates/updateHistory.ts`: 2026-08-28 개선 기록의 날짜·평이한 요약.
- `src/updates/updateHistory.test.tsx`: 날짜와 개발자 용어가 노출되지 않는지 검증.
- `tests/e2e/learner-flow.spec.ts`: 전체 학습 흐름과 A안 중간 상태·분석 안내·완료 메시지 검증.
- `tests/e2e/mobile-and-motion.spec.ts`: 375px 겹침·표 스크롤 힌트·reduced-motion 검증.
- `tests/e2e/keyboard-only.spec.ts`: Tab·화살표·Enter/Space와 안내 버튼 접근 순서 검증.
- `tests/accessibility/app.a11y.test.tsx`: axe와 ARIA 의미 구조 검증. VoiceOver 실행은 포함하지 않음.

## Ordered TDD tasks

### Task 1 — 비교 중간 상태와 0건 판정 문구 고정

- [x] **실패 테스트 작성**
  - `src/features/perspective/perspective.test.tsx`: 정식 `first`만 전달하고 `second={null}`, `comparison={null}`인 경우 안내 문단이 보이고 `role="alert"`가 없는지 assert합니다.
  - `src/features/analysis/ImpactAnalysis.test.tsx`: `coverageGapZoneIds=[]`, `overlapZoneIds=[]`인 분석 결과에서 텍스트가 정확히 `없음`인지 assert합니다.
- [x] **최소 구현**
  - `src/features/perspective/AlternativeComparison.tsx:86-87`의 props 검증을 A안만 저장된 정식 중간 상태로 허용하고, 손상된 객체만 오류로 보냅니다.
  - `src/features/analysis/ImpactAnalysis.tsx:104,108`에서 0건일 때 `ZoneNames` fallback을 중복 호출하지 않도록 조건부 렌더링합니다.
- [x] **통과 테스트**
  - `npx vitest run src/features/perspective/perspective.test.tsx src/features/analysis/ImpactAnalysis.test.tsx` 실행 결과 두 파일의 모든 테스트가 통과합니다.
- [x] **합격 조건**
  - A안 저장 직후 오류 alert 없음, B안 안내 있음, 0건 문구 중복 없음, 기존 malformed props 테스트 통과.

### Task 2 — 영향 결과 확인 게이트와 gi-pulse 안내

- [x] **실패 테스트 작성**
  - `src/navigation/guidedAction.test.ts`: 최신 분석이 있고 평균·최대 증거가 비어 있으면 `inspect-impact-metrics`, 둘 다 있으면 `null`을 반환하는 상태 표를 추가합니다.
  - `src/features/analysis/ImpactAnalysis.test.tsx`: 계산 직후 주민 버튼이 disabled이고 설명 문구와 `aria-describedby`가 있으며, 두 카드 확인 후 enabled가 되는지 assert합니다.
  - `src/features/analysis/ImpactAnalysis.test.tsx`: 안내 상태에서 평균·최대 카드에 `data-guided="true"`와 `gi-pulse`가 있고, reduced-motion CSS 계약이 유지되는지 assert합니다.
- [x] **최소 구현**
  - `src/domain/types.ts`에 `inspect-impact-metrics`를 추가합니다.
  - `src/navigation/guidedAction.ts`에서 `hasFreshAnalysis` 이후 증거를 검사합니다.
  - `src/features/analysis/AccessMetrics.tsx`에 `currentAction?: GuidedActionId`를 추가하고 평균·최대 `EvidenceButton`에 안내 표식을 전달합니다.
  - `src/features/analysis/ImpactAnalysis.tsx`에 disabled 이유를 가진 설명 요소와 어린이용 status를 연결합니다.
  - `src/app/App.tsx`에서 `state.evidence.inspectedMetricIds`와 `currentAction`을 분석 컴포넌트에 전달합니다.
- [x] **통과 테스트**
  - `npx vitest run src/navigation/guidedAction.test.ts src/features/analysis/ImpactAnalysis.test.tsx src/accessibility/motion.test.tsx`가 통과합니다.
- [x] **합격 조건**
  - 분석 완료 후 어린이가 다음 행동을 문장으로 알 수 있고, 평균·최대 카드 확인 전에는 이동 버튼이 잠기며, 두 카드 확인 후 열립니다.

### Task 3 — 후보지 가시성·ARIA 의미·배치 문구

- [x] **실패 테스트 작성**
  - `src/features/city-data/CityDataRoom.test.tsx`: 인구·도로만 활성화한 지도에도 후보지 존재 표지가 나타나고 비용 숫자는 나타나지 않는지 assert합니다.
  - `src/features/city-data/CityDataRoom.test.tsx`: 비활성 위험·기존 시설 상세가 gridcell `aria-label`에 포함되지 않고, 후보지 존재·선택 상태는 포함되는지 assert합니다.
  - `src/features/placement/placement.test.tsx`: 후보 `mulbit-b2` 선택 후 슬롯 설명이 좌표와 시설명을 포함하는지 assert합니다.
- [x] **최소 구현**
  - `src/features/city-data/GridMap.tsx`의 `cellLabel`에 활성 레이어를 전달하고 후보지 존재를 별도 공통 정보로 유지합니다.
  - `GridMap` 렌더러는 비용 레이어가 꺼져도 “후보지 있음” 마커를 표시하며 비용 토큰은 숨깁니다.
  - `src/features/city-data/CityDataRoom.tsx`에 후보지 위치 확인 안내를 추가합니다.
  - `src/features/placement/FacilityPlacementPanel.tsx`의 슬롯 문구와 버튼 accessible name을 선택 좌표·시설명 기반으로 만듭니다.
- [x] **통과 테스트**
  - `npx vitest run src/features/city-data/CityDataRoom.test.tsx src/features/placement/placement.test.tsx`가 통과합니다.
- [x] **합격 조건**
  - 지도·표·스크린 리더 의미가 같은 후보지 위치를 전달하고, 비용 정보는 선택한 레이어에서만 보입니다.

### Task 4 — 모바일 표·범례·고정 버튼·진행 단계

- [x] **실패 테스트 작성**
  - `src/features/city-data/CityDataRoom.test.tsx`: 표 보기에서 “좌우로 밀어 더 보기” 안내와 범례 `summary`를 확인합니다.
  - `tests/e2e/mobile-and-motion.spec.ts`: 375×812에서 업데이트 버튼의 bounding box가 주요 표·카드 콘텐츠와 겹치지 않고, 표 내부 `scrollWidth > clientWidth`가 유지되는지 assert합니다.
  - `src/app/App.test.tsx` 또는 `src/navigation/ProgressStepper.test.tsx`: 현재 단계·완료 단계·다음 단계의 class/data 상태와 어린이용 문구를 확인합니다.
- [x] **최소 구현**
  - `src/features/city-data/LayerLegend.tsx`를 `details/summary` 기반으로 접을 수 있게 하고, `CityDataTable.tsx`에 가로 스크롤 힌트를 추가합니다.
  - `src/app/app.css`와 `src/styles/responsive.css`에서 업데이트 버튼이 콘텐츠 위에 놓이지 않도록 safe-area와 콘텐츠 여백을 조정합니다.
  - `src/navigation/ProgressStepper.tsx`와 `src/state/sessionTypes.ts`에 현재·완료·다음 시각 상태와 어린이용 설명을 추가합니다.
- [x] **통과 테스트**
  - `npx vitest run src/features/city-data/CityDataRoom.test.tsx src/app/App.test.tsx src/navigation/ProgressStepper.test.tsx`와 `npx playwright test tests/e2e/mobile-and-motion.spec.ts`가 통과합니다.
- [x] **합격 조건**
  - 375px에서 겹침이 없고, 표를 밀어야 한다는 사실이 보이며, 단계 목록만 보아도 현재 위치와 다음 행동을 알 수 있습니다.

### Task 5 — 주민 문장·의견서 입력·완료 피드백·업데이트 기록

- [x] **실패 테스트 작성**
  - `src/features/perspective/perspective.test.tsx`: 이동 2와 이동 4가 다른 불편 이유 문장을 갖고 가장 불리한 구역을 식별하는지 assert합니다.
  - `src/features/opinion/opinion.test.tsx`: 빈 draft로 진입했을 때 필드 오류 alert가 없고 도움말이 있으며, submit 시도 뒤 오류가 보이는지 assert합니다.
  - `src/features/opinion/opinion.test.tsx`: textarea의 CSS 계약(`width: 100%`, 최소 높이 class)과 문장 틀 설명을 확인합니다.
  - `src/app/App.test.tsx`: 유효 의견 제출 후 완료 status와 summary heading 포커스 대상이 존재하는지 assert합니다.
  - `src/updates/updateHistory.test.tsx`: 업데이트 summaries에 `reflow`, `table-only`, `enabled`, `gi-pulse CTA`가 없고 날짜가 `2026-08-28`인지를 assert합니다.
- [x] **최소 구현**
  - `ResidentPerspective.tsx`에 travel 값과 unreachable을 반영한 문장 생성 함수를 둡니다.
  - `SitingOpinionForm.tsx`에 touched/submit-attempt 상태를 두고, 오류는 상호작용 후에만 표시합니다.
  - `global.css`에 `.opinion-field textarea` 폭·최소 높이를 추가하고 모바일에서 줄바꿈을 보장합니다.
  - `App.tsx`와 `OpinionSummary.tsx`에 완료 status, `ref`, `tabIndex={-1}`, `focus()`를 연결합니다.
  - `learnerCopy.ts`와 의견서 문장 틀을 어린이용 설명으로 다듬습니다.
  - `updateHistory.ts`에 평이한 2026-08-28 개선 기록을 추가합니다.
- [x] **통과 테스트**
  - `npx vitest run src/features/perspective/perspective.test.tsx src/features/opinion/opinion.test.tsx src/app/App.test.tsx src/updates/updateHistory.test.tsx`가 통과합니다.
- [x] **합격 조건**
  - 처음부터 빨간 오류가 쏟아지지 않고, 300자 입력이 가능하며, 제출 후 어린이가 완성 여부와 배운 점을 즉시 알 수 있습니다.

### Task 6 — 전체 회귀·정적 검토·공개 경로 스모크

- [x] 변경된 파일을 `git diff --check`로 확인합니다.
- [x] `npm run lint`로 타입·규칙 오류가 없는지 확인합니다.
- [x] `npm run test:unit`로 모든 단위·컴포넌트 테스트를 실행합니다.
- [x] `npm run test:a11y`로 axe·ARIA·키보드 의미 구조를 실행합니다. VoiceOver는 실행하지 않습니다.
- [x] `npm run test:e2e`로 학습 흐름·키보드·모바일·reduced motion·privacy 네트워크 경계를 실행합니다.
- [x] `npm run check:lines`로 500줄 이상 파일이 없는지 확인합니다.
- [x] `npm run build`로 GitHub Pages용 상대 자산 빌드를 확인합니다.
- [ ] 공개 URL에서 HTTP 200, 문서 제목, HTML이 참조하는 JS/CSS, 초기 학습 경로, 업데이트 내역 버튼, 모바일 표 경로를 확인합니다.
- [x] 로컬 E2E의 콘솔 오류가 0개인지 확인하고, `HTMLCanvasElement.getContext` 같은 테스트 환경 경고는 제품 오류와 구분해 기록합니다.
- [x] `git diff`를 계획과 대조하여 범위 밖 외부 서비스·저장소·VoiceOver 구현이 추가되지 않았는지 검토합니다.

## Implementation record

2026-08-28 기준으로 Tasks 1~5를 계획 순서대로 구현했습니다. 공개 Pages 항목은 기존 배포본의 HTTP 상태만 확인했으며, 이번 로컬 개선 변경을 공개 경로에 반영하는 push·재배포는 실행하지 않았습니다.

- `npm run check`: lint 통과, 단위 테스트 26개 파일·239개 테스트 통과, 500줄 이상 소스 0개, Vite production build 통과
- `npm run test:a11y`: axe/ARIA 테스트 2개 통과
- `npm run test:e2e`: learner flow·keyboard·mobile/reduced-motion·privacy·table-only 7개 통과
- `git diff --check`: 공백 오류 없음
- `curl -sS -I https://wbmaker2.github.io/civic-facility-siting-room/`: 기존 공개 경로 HTTP/2 200
- 테스트 환경의 `HTMLCanvasElement.getContext` jsdom 경고는 제품 실패가 아니며, VoiceOver/TalkBack 실행은 범위에서 제외했습니다.

## Future commands and expected outcomes

아래 명령은 계획된 구현·검증 순서이며 문서 작성 시점에는 실행하지 않습니다.

```bash
npx vitest run src/features/perspective/perspective.test.tsx src/features/analysis/ImpactAnalysis.test.tsx
# 기대 결과: 비교 중간 상태, 0건 문구 테스트 통과

npx vitest run src/navigation/guidedAction.test.ts src/features/analysis/ImpactAnalysis.test.tsx src/accessibility/motion.test.tsx
# 기대 결과: inspect-impact-metrics 안내와 reduced-motion 테스트 통과

npx vitest run src/features/city-data/CityDataRoom.test.tsx src/features/placement/placement.test.tsx
# 기대 결과: 후보지 표지·ARIA·동적 배치 문구 테스트 통과

npx vitest run src/features/opinion/opinion.test.tsx src/features/perspective/perspective.test.tsx src/app/App.test.tsx src/updates/updateHistory.test.tsx
# 기대 결과: 주민 문장·입력 검증·완료 포커스·평이한 업데이트 기록 통과

npx playwright test tests/e2e/mobile-and-motion.spec.ts tests/e2e/keyboard-only.spec.ts
# 기대 결과: 375px 겹침 없음, 표 스크롤 힌트, 키보드 순서, reduced-motion 통과

npm run lint && npm run test:unit && npm run test:a11y && npm run test:e2e && npm run check:lines && npm run build
# 기대 결과: 전체 품질 게이트와 Pages 빌드 통과

git diff --check
# 기대 결과: 공백·충돌 표식 없음

curl -I https://wbmaker2.github.io/civic-facility-siting-room/
# 기대 결과: HTTP/2 200
```

## Future commit sequence

구현 중 커밋이 필요할 때는 다음 순서로 기능 단위를 분리합니다.

1. `fix: handle saved A proposal and empty impact results`
2. `feat: guide impact metric inspection`
3. `fix: reveal candidate presence and clarify placement`
4. `feat: improve mobile data views and progress guidance`
5. `feat: improve resident copy and opinion completion`
6. `test: cover learner-flow regression gates`

각 커밋은 해당 단계의 소스·테스트·업데이트 기록만 포함하고, 커밋 전 관련 좁은 테스트와 `git diff --check`를 통과해야 합니다. GitHub push·Pages 재배포는 별도 사용자 승인 후 수행합니다.

## Self-review checklist

- [x] QA에서 확인된 A안 오류, 분석 dead-end, 0건 중복, 후보지 숨김, 의견 textarea 폭, 초기 오류, 모바일 겹침을 각각 파일·인터페이스·테스트로 연결했습니다.
- [x] 학습 목표인 근거 기반 비교, 주민 관점, 장단점 절충, 의견서 완성을 안내 문구·상태·완료 포커스로 연결했습니다.
- [x] 기존 앱 차별성인 결정적 가상 도시·표 보기·개인정보 안전·AI/서버 없음 제약을 유지했습니다.
- [x] `gi-pulse`와 `prefers-reduced-motion` 대체를 영향 결과 확인 단계에 포함했습니다.
- [x] 모바일·키보드·axe/ARIA 의미 구조 검증을 별도 단계로 포함했고 VoiceOver는 제외했습니다.
- [x] 날짜가 있는 업데이트 내역과 평이한 학습자용 기록을 포함했습니다.
- [x] 모든 소스 파일 500줄 미만 조건과 기능별 책임 분리를 명시했습니다.
- [x] 미완성 작업을 숨기는 자리표시자나 다른 단계로 책임을 넘기는 문구를 사용하지 않았습니다.
