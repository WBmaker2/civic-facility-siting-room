# Civic Facility Siting Room Education Web App Redesign Plan

작성일: 2026-08-29
대상: `/Volumes/ External Drive 256G/Dev2/codex/civic-facility-siting-room`
실행 모드: full redesign (계획 기록 후 구현·검증)
기준 문서: `2026-08-26-civic-facility-siting-room-design.md`, `2026-08-28-civic-facility-siting-room-improvement-plan.md`, `docs/content-and-safety-review.md`, `docs/verification-report.md`

## Goal

초등학교 5~6학년 학습자가 가상 도시의 자료를 읽고, 시설 후보를 배치하고, 평균과 가장 불리한 구역을 비교한 뒤, 주민 관점의 근거를 담은 의견서를 완성하는 여정을 화면 위치를 잃지 않고 수행하도록 리디자인합니다.

이번 변경은 다음 학습 계약을 보존합니다.

- 사회·수학 확장 활동으로서 인구·도로·위험·비용 자료를 함께 비교합니다.
- 평균만으로 입지를 결정하지 않고 가장 긴 이동, 도달 불가, 소외 구역을 확인합니다.
- A안과 장점이 다른 B안을 비교하고 절충·보완 방법을 글로 설명합니다.
- 가상 격자와 상대 단위만 사용하며 실제 주소·GPS·실제 도시계획·응급 서비스 성능을 암시하지 않습니다.
- 입력은 현재 탭에만 유지되고 새로고침하면 사라집니다.

완료 기준은 첫 행동, 현재 단계, 다음 행동, 오류 회복, 결과의 다음 학습 행동이 375px·768px·1280px에서 모두 분명한 상태입니다. 자동 검증과 사람의 보조공학 승인은 서로 다른 증거로 기록하며 VoiceOver/TalkBack은 이 작업의 검증 범위에서 제외합니다.

## Design requirement traceability

| 설계 문서 요구 | 리디자인 연결 | 확인 위치 |
|---|---|---|
| 학습 목표: 여러 기준 설명, 이동·예산 적용, 평균의 한계 분석, 절충 평가 | 첫 화면의 기준 카드, 자료층·표, 평균/최대/도달 불가 카드, A/B 문장 프롬프트의 순서를 강화 | `ReviewIntake.tsx`, `CityDataRoom.tsx`, `AccessMetrics.tsx`, `AlternativeComparison.tsx` |
| 기존 앱과의 차별성: 장소 탐색이 아닌 공공시설 입지의 접근성·위험·예산 의사결정 | 실제 지도·주소 기능을 추가하지 않고 가상 격자·자료층·후보 배치·주민 관점 비교를 첫 화면부터 유지 | `GridMap.tsx`, `CityDataTable.tsx`, `FacilityPlacementPanel.tsx`, `ResidentPerspective.tsx` |
| 핵심 학습 흐름: 자료 읽기 → 기준 선택 → 배치 → 결과 → 소외 구역 → 대안 → 의견서 | `SessionState` 전이 순서를 유지하고 단계 변경 시 새 제목으로 포커스를 이동 | `sessionReducer.ts`, `StageFocusRegion.tsx`, `ProgressStepper.tsx` |
| 콘텐츠·판정 모델: 그래프 이동 단위, 평균/최대/미도달, 위험·비용, 복수 타당안 | 엔진과 데이터 계약을 변경하지 않고 결과 카드·상세 근거·A/B 비교의 정보 계층만 개선 | `analyzePlacement.ts`, `validatePlacementAnalysis.ts`, `proposalComparison.ts`, `AccessMetrics.tsx` |
| 접근성: 표 대체 보기, 키보드, 375px·200%·reduced-motion, 단계 CTA 강조 | 네이티브 입력·ARIA·sticky 표·overflow 격리·`gi-pulse`와 정적 reduced-motion 대체를 검증 | `GridMap.tsx`, `ResidentPerspective.tsx`, `motion.css`, `tests/e2e/redesign.spec.ts` |
| 개인정보·안전: 실제 주소·학교·주민 낙인 금지, 실제 정책·응급 성능 오해 방지 | 기존 안내 문구를 보존하고 외부 저장·API·AI·음성 기능·실제 도시 이미지를 추가하지 않음 | `learnerCopy.ts`, `privacy-and-network.spec.ts`, `work/education-webapp-redesign-assets.md` |
| MVP와 완료 기준: 가상 도시 2종·미션 4종, 지도 없이 표로 핵심 활동, 평균만으로 판정하지 않음 | 기능·도시·미션 수를 그대로 두고 전체 단위·접근성·E2E·반응형 검증을 완료 | `package.json` scripts, `tests/e2e/table-only.spec.ts`, `work/education-webapp-redesign-report.md` |

## Architecture

### 유지하는 경계

- `SessionState`와 `sessionReducer`의 결정적 상태 전이·판정 모델을 변경하지 않습니다.
- `CITIES`, `MISSIONS`, `analyzePlacement`, `compareProposals`, `validatePlacementAnalysis`, `validateOpinion`의 데이터 계약을 유지합니다.
- 지도와 표의 정보 동등성, 네이티브 `select`·radio·checkbox·button·textarea, fail-closed 검증을 유지합니다.

### 리디자인 축

1. **단계 전환 안내**: `StageFocusRegion`이 단계가 바뀔 때 새 단계의 첫 `h2`를 포커스하고 화면 상단으로 스크롤합니다. 모션 감소 환경에서는 즉시 스크롤합니다.
2. **앱 셸**: 제목·모형 한계·업데이트 버튼을 헤더에 배치하여 고정 버튼이 학습 콘텐츠를 가리지 않게 합니다.
3. **진행 단계**: 데스크톱은 6단계 요약 그리드, 모바일은 2열 카드로 보여 현재·완료·다음 상태를 한눈에 읽게 합니다.
4. **점진적 공개**: 미션 조건과 A/B 공개 조건처럼 부차적인 긴 설명은 네이티브 `details/summary`로 접고, 핵심 수치와 다음 CTA는 처음부터 보입니다.
5. **모바일 표**: 주민 관점표의 첫 열을 고정하고 가로 이동 안내를 강화하여 긴 문장과 구역 이름을 함께 비교할 수 있게 합니다.
6. **시각 계층**: 학습용 CTA 하나만 `gi-pulse`로 강조하고, 카드·상태·경고·완료 결과를 토큰으로 일관되게 표현합니다.

### 상태 전이

`intake → data-room → placement → analysis → resident-view → opinion` 순서는 그대로입니다. 각 전환은 다음 조건을 유지합니다.

- `intake`: 미션과 우선 기준 선택
- `data-room`: 서로 다른 자료층 2개 이상 검토
- `placement`: 모든 시설 슬롯에 유효한 후보 배치
- `analysis`: 영향 계산 후 평균·최대 이동 카드 확인
- `resident-view`: 소외 구역 선택과 A/B 두 안 저장
- `opinion`: 우선 기준·선택안·근거 자료·세 문장 입력 후 완료

## Tech Stack

- React 19, TypeScript 6, Vite 8
- Vitest 4, Testing Library, `user-event`
- Playwright E2E, axe-core 접근성 테스트
- 기존 CSS 파일과 네이티브 HTML 요소 재사용
- 새 런타임 의존성 없음, 기존 `node_modules`와 package lock 변경 없음

지원 역할 상태(2026-08-30 재실행): `impeccable`(`/Users/kimhongnyeon/.codex/skills/impeccable/SKILL.md`), `ui-ux-pro-max`(`/Users/kimhongnyeon/.codex/skills/ui-ux-pro-max/SKILL.md`), `redesign-existing-projects`(`/Users/kimhongnyeon/.codex/skills/redesign-existing-projects/SKILL.md`), `imagegen`(`/Users/kimhongnyeon/.codex/skills/imagegen/SKILL.md`)을 모두 읽었습니다. `ui-ux-pro-max`는 Skill 카탈로그에는 노출되지 않았지만 설치 경로의 `SKILL.md`와 검색 CLI를 확인했습니다. 이미지 자산 사용처가 없으므로 `imagegen` 생성은 실행하지 않습니다.

## Spec

### 학습 목표 연결

| 설계 목표 | 화면 계약 | 구현 경로 | 합격 조건 |
|---|---|---|---|
| 여러 기준이 작용함을 설명 | 미션·우선 기준 카드와 절충 문장 | `ReviewIntake.tsx`, `learnerCopy.ts` | 선택 요약과 기준 설명이 375px에서 잘리지 않음 |
| 이동 단위·예산 비교 | 자료층, 지도·표, 계산 근거 | `CityDataRoom.tsx`, `GridMap.tsx`, `CityDataTable.tsx`, `CalculationBasis.tsx` | 지도 없이 표만으로 핵심 활동 유지 |
| 평균과 가장 불리한 구역 분석 | 평균·최대·도달 불가 카드, 주민 표 | `AccessMetrics.tsx`, `ResidentPerspective.tsx` | 평균·최대 카드 확인 전 다음 단계 비활성 |
| 절충·대안 평가 | A/B 요약과 변화 목록 | `AlternativeComparison.tsx` | A안만 저장한 상태가 오류가 아니며 B안 안내 표시 |
| 근거 있는 의견서 작성 | 세 textarea, 근거 체크, 완료 요약 | `SitingOpinionForm.tsx`, `OpinionSummary.tsx` | 제출 성공 시 완료 상태와 다음 행동을 포커스로 전달 |

### 접근성·사용성 계약

- 단계 전환 시 포커스 대상은 해당 영역의 첫 `h2`이며 `tabIndex=-1`입니다.
- `ProgressStepper`의 현재 단계 안내는 `role="status"`와 `aria-live="polite"`로 알립니다.
- 모든 입력·버튼은 44px 이상의 터치 영역과 `:focus-visible` 외곽선을 유지합니다.
- `gi-pulse`는 `currentAction` CTA 또는 평균·최대 결과 카드에만 적용합니다.
- `@media (prefers-reduced-motion: reduce)`에서는 애니메이션을 끄고 정적 외곽선을 사용합니다.
- 라이트 모드만 제공하며 `prefers-color-scheme: dark`를 추가하지 않습니다.
- 주민 표는 첫 열 sticky와 가로 이동 안내를 제공하지만 테이블 의미를 제거하지 않습니다.
- 업데이트 내역은 2026-08-29 리디자인 내역을 최신 항목으로 기록합니다.

### 개인정보·사회적 안전

- 실제 지역명, 주소, 학생 이름, 학교, GPS, 로그인, 네트워크 저장, 분석 SDK를 추가하지 않습니다.
- 결과가 실제 도시계획·재난·응급 대응 예측처럼 보이는 문구를 추가하지 않습니다.
- 도달이 어려운 구역을 주민 개인의 책임으로 설명하지 않습니다.
- 기존 `MODEL_LIMIT_NOTICE`, `PRIVACY_NOTICE`, `SOCIAL_SAFETY_NOTICE`의 의미를 삭제하지 않습니다.

### MVP 범위와 변경하지 않을 범위

포함: 앱 셸, 단계 포커스/스크롤, 진행 단계 레이아웃, 미션·조건 점진적 공개, 결과·A/B 비교의 정보 계층, 모바일 표 고정 열, 토큰 기반 스타일, 업데이트 기록, 자동·수동 검증.
변경하지 않음: 도시 데이터·미션 수·판정 알고리즘·실제 지도/주소/GPS·AI 추천·온라인 저장·음성 기능·HVC 동기화·Git 커밋/푸시/배포.

## Global Constraints

- 한 소스 파일은 500줄 미만으로 유지합니다. 현재 `npm run check:lines` 기준을 모든 변경 후 다시 실행합니다.
- 기존 작업 트리의 `.playwright-mcp/` 등 관련 없는 변경을 덮어쓰거나 정리하지 않습니다.
- 새 의존성·환경 변수·외부 API·서버를 만들지 않습니다.
- 사용자에게 보이지 않는 검증을 사람 승인으로 표현하지 않습니다.
- 브라우저 콘솔 오류는 자동 검증과 별도로 기록합니다. 현재 초기 감사에서 `favicon.ico` 404가 관찰되었으며, 이번 리디자인 범위에서 favicon 파일을 새로 만들지 않고 최종 보고서의 pending 관찰로 남깁니다.
- 커밋·푸시·릴리스·배포·HVC 등록은 사용자가 별도로 요청하기 전까지 실행하지 않습니다.

## Expected file structure and responsibilities

- `PRODUCT.md`: Impeccable product truth captured from the confirmed design documents; no visual tokens or invented claims
- `work/education-webapp-redesign-plan.md`: 이 실행 계획과 수용 기준
- `work/education-webapp-redesign-audit.md`: 초기·최종 UI/UX 감사 기록
- `work/education-webapp-redesign-assets.md`: 자산 목록·교체 판정·롤백 기록
- `work/education-webapp-redesign-report.md`: 변경·검증·미해결 항목·실행하지 않은 역할
- `design-system/MASTER.md`: 교육 목표 우선 토큰과 컴포넌트 규칙
- `src/navigation/StageFocusRegion.tsx`: 단계 변경 포커스·스크롤·reduced-motion 처리
- `src/navigation/StageFocusRegion.test.tsx`: 단계 변경 포커스와 스크롤 호출 계약
- `src/navigation/ProgressStepper.tsx`: 현재 단계 live status와 상태별 단계 카드
- `src/app/App.tsx`: 헤더·StageFocusRegion·업데이트 버튼 배치
- `src/features/intake/ReviewIntake.tsx`: 미션 카드·조건 details·선택 요약의 의미 구조
- `src/features/perspective/AlternativeComparison.tsx`: A/B 핵심 요약과 조건 details
- `src/features/perspective/ResidentPerspective.tsx`: sticky 표 첫 열과 모바일 보조 안내 연결
- `src/updates/updateHistory.ts`: 2026-08-29 변경 내역
- `src/styles/tokens.css`: 색·간격·반경·그림자 토큰
- `src/styles/global.css`: 공통 카드·입력·표·focus 스타일
- `src/styles/responsive.css`: 375/768px 레이아웃·sticky 표·진행 단계 반응형 규칙
- `src/app/app.css`: 업데이트 버튼·앱 셸 여백·업데이트 dialog
- `src/styles/motion.css`: `gi-pulse` 색상과 reduced-motion 정적 대체
- `src/features/intake/ReviewIntake.test.tsx`: 조건 details와 CTA 접근성 회귀
- `src/features/perspective/perspective.test.tsx`: A/B 조건 공개 계약 회귀
- `src/updates/updateHistory.test.tsx`: 날짜·평이한 문장·불변성 회귀
- `tests/e2e/redesign.spec.ts`: 단계 포커스·데스크톱 겹침·모바일 sticky 표 브라우저 검증

## 작업 단계와 TDD 순서

각 작업은 **실패 테스트 작성 → 최소 구현 → 통과 테스트 → 정리/회귀 확인** 순서로 진행합니다.

### Task 1 — 계획·감사·디자인 시스템 기록

- [x] `PRODUCT.md`에 설계 문서에서 확인한 제품 사실·플랫폼·접근성 계약을 기록합니다.
- [x] `work/education-webapp-redesign-plan.md`에 목표·범위·수용 기준·롤백·검증 명령을 기록합니다.
- [x] `work/education-webapp-redesign-audit.md`에 1280×812와 375×812 실제 화면 근거, 영향도별 문제, 지원 Skill 상태를 기록합니다.
- [x] `work/education-webapp-redesign-assets.md`에 `public/`·`src/assets/`와 이미지 참조 검색 결과를 기록합니다.
- [x] `design-system/MASTER.md`에 라이트 교육용 토큰, 버튼 우선순위, responsive breakpoint, focus/reduced-motion 규칙을 기록합니다.

### Task 2 — 단계 전환 포커스·앱 헤더·업데이트 버튼

상태: 완료 (2026-08-29)

실패 테스트:

- `src/navigation/StageFocusRegion.test.tsx`에서 stage가 `intake`에서 `data-room`으로 바뀔 때 새 영역의 `h2`가 focus되고 `scrollIntoView`가 `{block: 'start', behavior: 'auto'|'smooth'}` 중 환경 조건에 맞게 호출되는지 실패하도록 작성합니다.
- `src/updates/updateHistory.test.tsx`에서 최신 날짜가 `2026-08-29`이고 리디자인 문장이 개발자 용어 없이 존재하는지 실패하도록 갱신합니다.

최소 구현:

- `src/navigation/StageFocusRegion.tsx`에서 첫 렌더는 건너뛰고 단계 변경마다 첫 `h2`에 `tabIndex=-1`, `focus({preventScroll:true})`, `scrollIntoView`를 적용합니다.
- `src/app/App.tsx`의 제목·모형 안내·`UpdateHistoryButton`을 `.app-header`로 묶고 stage 렌더를 `StageFocusRegion`으로 감쌉니다.
- `src/app/app.css`에서 업데이트 버튼의 fixed 위치를 제거하고 헤더 안의 44px 버튼으로 배치합니다.
- `src/updates/updateHistory.ts`에 `2026-08-29` 개선 기록을 추가합니다.

통과 테스트·합격 조건:

- `npx vitest run src/navigation/StageFocusRegion.test.tsx src/updates/updateHistory.test.tsx`가 통과합니다.
- 단계 버튼을 클릭하면 375px·1280px 모두 새 단계 heading이 포커스되고, 업데이트 버튼이 어떤 콘텐츠와도 겹치지 않습니다.

### Task 3 — 진행 단계·심의 접수 정보 계층

상태: 완료 (2026-08-29)

실패 테스트:

- `src/navigation/ProgressStepper.test.tsx`에서 현재 단계 live status, `data-state="complete|current|next"`, 어린이용 설명을 확인합니다.
- `src/features/intake/ReviewIntake.test.tsx`에서 선택 미션의 조건을 `details/summary`로 열 수 있고, 미션·우선 기준 선택 후 CTA가 접근 가능한 이름을 가지는지 확인합니다.

최소 구현:

- `src/navigation/ProgressStepper.tsx`에 `role="status" aria-live="polite"`와 단계 상태 class/data를 유지합니다.
- `src/features/intake/ReviewIntake.tsx`에 `mission-card`, `mission-conditions`, `priority-option`, `completion-criteria`, `intake-safety-notices` class를 부여하고 조건 목록을 네이티브 details로 묶습니다.
- `src/styles/global.css`, `src/styles/responsive.css`에서 진행 단계 6열/2열, 우선 기준 카드, 미션 선택 요약의 시각적 순서를 정의합니다.

통과 테스트·합격 조건:

- 관련 Vitest 테스트가 통과하고 `npm run test:e2e -- tests/e2e/redesign.spec.ts`의 intake 검증이 통과합니다.
- 첫 화면에서 “무엇을 고르나요 → 무엇을 먼저 보나요 → 어디로 가나요” 순서가 375px에서 한 번에 이해됩니다.

### Task 4 — 자료실·배치·주민 표 모바일 계층

상태: 완료 (2026-08-29)

실패 테스트:

- `src/features/city-data/CityDataRoom.test.tsx`에서 자료층 설명과 후보지 선택 안내 class/ARIA 연결을 확인합니다.
- `src/features/perspective/perspective.test.tsx`에서 주민 표 wrapper가 설명 ID를 연결하고 첫 열 sticky 계약 class를 갖는지 확인합니다.
- `tests/e2e/redesign.spec.ts`에서 375×812의 document `scrollWidth === clientWidth`, 주민 표의 가로 스크롤과 sticky 첫 열 스타일을 확인합니다.

최소 구현:

- `src/features/city-data/CityDataRoom.tsx`, `CityDataTable.tsx`, `LayerLegend.tsx`의 기존 정보는 유지하면서 안내·fieldset·탭 class를 일관되게 적용합니다.
- `src/features/perspective/ResidentPerspective.tsx`에 `id="perspective-table-help"`, `aria-describedby`, `data-sticky-column="true"`를 연결합니다.
- `src/styles/responsive.css`에서 표 wrapper의 `overflow-x:auto`, 첫 열 sticky, scroll hint, 44px 입력 영역을 정의합니다.

통과 테스트·합격 조건:

- 지도와 표가 같은 후보·좌표·자료층을 전달하고, 모바일에서 가로 스크롤은 표 안에만 생깁니다.
- 주민 이름과 이동 단위가 표를 밀어도 계속 보이며, 색만으로 의미를 전달하지 않습니다.

### Task 5 — 영향 분석·A/B 비교 점진적 공개와 CTA 계층

상태: 완료 (2026-08-29)

실패 테스트:

- `src/features/analysis/ImpactAnalysis.test.tsx`에서 핵심 평균·최대 카드가 보이고, 계산 근거와 긴 경로는 details로 접근 가능한지 확인합니다.
- `src/features/perspective/perspective.test.tsx`에서 각 제안의 공개 조건 summary와 상세 목록을 확인합니다.

최소 구현:

- `src/features/analysis/AccessMetrics.tsx`의 핵심 카드와 반복 설명을 `metric-summary`·`metric-details`로 구분합니다.
- `src/features/perspective/AlternativeComparison.tsx`의 제안별 공개 조건 결과를 `details`로 접고, 각 제안의 좌표·평균·최대·비용·도달 불가를 요약 영역에 남깁니다.
- `src/styles/global.css`와 `src/styles/responsive.css`에서 카드 간격, 결과 상태, 비교 변화 목록, 모바일 단일 열을 정의합니다.

통과 테스트·합격 조건:

- 평균·최대 카드 확인이라는 학습 게이트는 변하지 않고, A안만 저장한 중간 상태는 오류가 아닙니다.
- 결과·비교 화면의 첫 viewport에 핵심 수치와 다음 CTA가 보이며, 상세 근거는 키보드로 열 수 있습니다.

### Task 6 — 최종 검증·보고서·롤백 확인

상태: 완료 (2026-08-29)

- [x] `git diff --check`에서 공백 오류가 없습니다.
- [x] `npm run lint`가 통과합니다.
- [x] `npm run test:unit`가 통과합니다.
- [x] `npm run test:a11y`가 serious/critical 0으로 통과합니다. VoiceOver/TalkBack은 실행하지 않습니다.
- [x] `npm run test:e2e`가 학습 흐름·키보드·모바일·privacy 계약과 redesign 스펙을 통과합니다.
- [x] `npm run check:lines`가 500줄 이상 소스 0개를 보고합니다.
- [x] `npm run build`가 상대 자산 경로로 통과합니다.
- [x] 로컬 브라우저에서 320/375/768/1280px의 시작→활동→피드백→결과→다음 행동을 확인합니다.
- [x] `prefers-reduced-motion: reduce`, 라이트 모드, 200% 텍스트 크기 proxy, Tab/Shift+Tab/Arrow/Enter/Space/Escape를 확인합니다.
- [x] `work/education-webapp-redesign-report.md`에 자동 결과·브라우저 결과·사람 검토 대기·지원 Skill not run을 분리해 기록합니다.

## Interfaces and file-level contracts

### `StageFocusRegion`

```ts
export interface StageFocusRegionProps {
  stage: StageId;
  children: ReactNode;
}
```

첫 렌더를 제외한 `stage` 변경마다 descendant `h2`를 포커스하고 `scrollIntoView`를 호출합니다. `scrollIntoView`가 없는 테스트 환경에서는 포커스만 보장합니다.

### `ProgressStepper`

```ts
export interface ProgressStepperProps {
  currentStage: StageId;
}
```

기존 prop을 유지하고 `role="status"` 상태 문장, `data-state` 상태, `aria-current="step"`를 함께 제공합니다.

### `UpdateEntry`

기존 `UpdateEntry` 타입을 유지합니다. 최신 항목은 `date="2026-08-29"`, category `개선`, 학습자에게 읽히는 두 문장으로 구성합니다.

## Executed commands and expected results

아래 명령은 계획에서 예정한 뒤 구현 후 실행했습니다. 실제 결과는 `work/education-webapp-redesign-report.md`의 자동 검증 표에 기록했습니다.

```bash
npx vitest run src/navigation/StageFocusRegion.test.tsx src/navigation/ProgressStepper.test.tsx src/features/intake/ReviewIntake.test.tsx
# 기대 결과: 단계 포커스, live status, 미션 조건 details와 intake CTA 테스트 통과

npx vitest run src/features/city-data/CityDataRoom.test.tsx src/features/perspective/perspective.test.tsx src/features/analysis/ImpactAnalysis.test.tsx
# 기대 결과: 지도·표 동등성, sticky 표 안내, 핵심 결과 카드와 A/B 상세 공개 테스트 통과

npm run lint
# 기대 결과: ESLint 오류 0

npm run test:unit
# 기대 결과: 기존 결정적 모델·컴포넌트 회귀 포함 전체 Vitest 통과

npm run test:a11y
# 기대 결과: axe serious/critical 위반 0, landmark·heading·ARIA 계약 통과

npm run test:e2e -- tests/e2e/redesign.spec.ts
# 기대 결과: 단계 전환 heading focus, update 버튼 비겹침, 375px sticky 주민 표, 200% 확대 overflow proxy 통과

npm run test:e2e
# 기대 결과: 학습자 전체 흐름, keyboard, mobile/reduced-motion, privacy 전체 통과

npm run check:lines
# 기대 결과: 500줄 이상 소스 파일 0개

npm run build
# 기대 결과: TypeScript strict compile와 Vite production build 통과
```

## Rollback

리디자인 변경은 `StageFocusRegion.tsx`, 화면 class/`details` 마크업, CSS 토큰·반응형 파일, 테스트·문서로 제한합니다. 회귀가 발생하면 해당 변경 파일만 이전 버전으로 되돌리고 `SessionState`·도메인·엔진 파일은 건드리지 않습니다. 업데이트 기록은 실제 적용 내역을 보존하므로 롤백 시에도 이미 실행된 날짜 항목을 삭제하지 않고 “되돌림” 문장을 별도 기록합니다. 배포·Git 작업은 이 계획 범위가 아니므로 롤백을 위해 원격 상태를 변경하지 않습니다.

## Commit stages (future only)

커밋은 사용자가 별도로 요청하고 모든 검증이 통과한 뒤에만 실행합니다.

1. `docs: record education redesign plan and audit` — 계획·감사·자산·디자인 시스템 문서만 포함
2. `feat: improve civic learner navigation and visual hierarchy` — StageFocusRegion, 헤더, 진행 단계, 화면·스타일 구현
3. `test: cover redesign accessibility and mobile contracts` — 단위·E2E 회귀 테스트
4. `docs: record civic redesign verification` — 최종 보고서와 실행 증거

각 단계에서 `git diff --check`, 변경 파일 목록, 테스트 결과를 확인하고 관련 없는 `.playwright-mcp/` 변경은 커밋에 포함하지 않습니다.

## Task 7 — 2026-08-30 전문 UI 품질 보강

상태: 완료 (2026-08-30)

이번 재실행에서 기존 리디자인의 학습 흐름·데이터 모델·라이트 모드를 유지한 채, 디자인 검수에서 확인한 기계적·상호작용 품질을 보강합니다.

실패 테스트:

- `src/app/App.test.tsx`에서 `본문으로 건너뛰기` 링크가 `#learning-stage`를 가리키고 주요 단계 영역에 해당 id가 있는지 확인합니다.
- `src/styles/ui-contract.test.ts`에서 안내 callout에 `border-left: 4px`가 없고, 일반 버튼의 hover·active 상태와 reduced-motion 규칙이 CSS에 존재하는지 확인합니다.
- `tests/e2e/redesign.spec.ts`에서 375px 키보드 첫 Tab이 skip link에 도달하고, 마우스 hover·pointerdown 뒤 버튼의 배경·transform 변화가 레이아웃 폭을 바꾸지 않는지 확인합니다.

최소 구현:

- `src/app/App.tsx`의 `main` 시작 부분에 skip link를 두고 `StageFocusRegion` 래퍼에 `id="learning-stage"`를 추가합니다.
- `src/styles/global.css`의 `.selected-mission-summary`, `.completion-criteria`, `.intake-safety-notices`, `.comparison-sentence-prompt` 강조를 1px 외곽선과 `border-top` 또는 inset accent로 바꾸어 side-tab detector 경고를 제거합니다.
- `src/styles/global.css`에 버튼 hover·active·transition·`touch-action: manipulation`을 추가하고 `@media (prefers-reduced-motion: reduce)`에서 transition을 끕니다. disabled 버튼은 hover·active 변화를 받지 않습니다.
- `src/styles/responsive.css`에 skip link가 작은 화면에서도 콘텐츠를 덮지 않는 포커스 위치와 callout 여백을 기록합니다.

통과 테스트·합격 조건:

- `npm run test:unit -- src/app/App.test.tsx src/styles/ui-contract.test.ts`가 통과하고 기존 242개 이상 단위 테스트가 회귀하지 않습니다.
- `npx playwright test tests/e2e/redesign.spec.ts`가 skip link, hover·active, 320/375px overflow 계약을 통과합니다.
- `node /Users/kimhongnyeon/.codex/skills/impeccable/scripts/detect.mjs --json src/app/App.tsx src/styles/global.css src/styles/responsive.css` 결과가 side-tab 경고 0건입니다.
- `npm run lint`, `npm run test:a11y`, `npm run check:lines`, `npm run build`가 모두 통과하고 변경 소스 파일은 500줄 미만입니다.

실행 결과:

- [x] `src/app/App.test.tsx`, `src/styles/ui-contract.test.ts`의 실패 우선 계약을 구현 후 통과시켰습니다.
- [x] `npm run test:unit`: 28개 파일, 247개 테스트 통과
- [x] `npm run test:a11y`: 2개 테스트 통과, serious/critical 위반 0
- [x] `npx playwright test tests/e2e/redesign.spec.ts --reporter=list`: 4개 테스트 통과
- [x] `npm run test:e2e`: 11개 테스트 통과
- [x] `npm run check`: lint·unit·check:lines·build 모두 통과
- [x] `git diff --check`: 공백 오류 0
- [x] Impeccable 기계 검수에서 UI side-tab 경고 0건을 확인했습니다. 탐색적으로 생성된 concept-seed 대기 표시는 선택한 방향이 없어 제거했으며, 새로운 시각 방향이나 이미지 컴프는 채택하지 않았습니다.

롤백:

Task 7 변경만 되돌릴 때 `PRODUCT.md`와 이전 계획·감사 기록은 유지하고 `App.tsx`, `StageFocusRegion.tsx`, `global.css`, `responsive.css`, 새 계약 테스트만 이전 버전으로 복원합니다. `SessionState`, 데이터, 엔진, 기존 리디자인 테스트는 되돌리지 않습니다.
