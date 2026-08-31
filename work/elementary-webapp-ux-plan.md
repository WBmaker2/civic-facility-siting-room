# Elementary Web App UX Improvement Plan

작성일: 2026-08-31
대상: `/Volumes/ External Drive 256G/Dev2/codex/civic-facility-siting-room`
실행 모드: full (기준선 관찰 → 계획 기록 → 승인된 범위 구현 → 같은 시나리오 재검증)
대상 학습자: 초등학교 5~6학년, 교사 안내 또는 개인 브라우저 사용자

## Goal

가상 도시의 인구·도로·위험·비용 자료를 읽고 공공시설 후보지를 비교하는 기존 학습 계약은 유지하면서, 정상적인 중간 상태를 오류로 오해하지 않고 모바일·키보드에서도 다음 행동을 알아차리며 의견서까지 완주하도록 개선합니다.

이번 범위의 구체적인 결과는 다음과 같습니다.

1. 주민 관점표에 아직 A안도 저장하지 않은 정상 상태를 오류 경고가 아닌 다음 행동 안내로 보여 줍니다.
2. 두 제안을 비교한 뒤 조건을 모두 충족한 A안을 선택해도 완료 요약이 `타당안—절충 확인`으로 일관되게 표시되도록 판정 표시 규칙을 보완합니다. 조건이 충족되지 않은 경우에는 `수정 필요`와 확인할 이유를 함께 유지합니다.
3. 320px·375px 화면의 업데이트 내역 창에서 제목과 닫기 버튼이 겹치지 않도록 헤더 구조를 반응형으로 정리합니다.
4. 완료 요약에 친구에게 설명하거나 다시 비교할 수 있는 한 문장의 다음 학습 행동을 추가합니다.
5. 건너뛰기 링크의 학습 영역 대상을 키보드·스크린 리더가 인식할 수 있는 포커스 대상으로 만듭니다.
6. 2026-08-31 날짜의 평이한 업데이트 기록을 남깁니다.

## Architecture

기존의 `SessionState` 전이, 결정적 그래프 계산, `CITIES`·`MISSIONS` 데이터 계약, 개인정보·안전 문구, 지도와 표의 정보 동등성은 변경하지 않습니다.

화면 계층은 다음 경계를 유지합니다.

```text
SessionShell
 ├─ StageFocusRegion (#learning-stage, 단계 포커스 대상)
 ├─ ProgressStepper (현재 단계 상태)
 ├─ stage content
 │   ├─ ResidentPerspective (구역 선택과 A/B 저장)
 │   ├─ AlternativeComparison (저장 전·A만·A/B 비교 상태)
 │   └─ OpinionSummary (완료 요약과 다음 학습 행동)
 └─ UpdateHistoryButton (날짜별 변경 기록)
```

표현 규칙은 데이터 판정과 분리합니다. `validateOpinion`과 엔진의 원본 판정은 보존하고, `OpinionSummary`에서 이미 저장된 두 제안과 모든 공개 조건을 함께 살핀 완료 맥락을 사용해 어린이에게 보이는 요약 문구를 결정합니다. 이 방식은 A안 저장 시점의 “아직 대안 비교 전” 증거와 최종 비교 완료 상태를 혼동하지 않게 하면서도 데이터 위조 방지 경계를 낮추지 않습니다.

## Tech Stack

- React 19, TypeScript 6, Vite 8
- Vitest 4, Testing Library, `user-event`
- Playwright E2E와 axe 기반 접근성 테스트
- 기존 CSS 토큰·네이티브 `dialog`·`button`·`select`·radio·checkbox·textarea 재사용
- 새 패키지, 서버, 외부 API, 이미지 자산, 음성 기능 없음

런타임 준비 결과는 [`elementary-webapp-ux-bootstrap.md`](./elementary-webapp-ux-bootstrap.md)에 기록했습니다. Playwright는 인앱 브라우저 런타임으로 사용했고, `ui-ux-pro-max`는 런타임 카탈로그에 없어 CLI fallback 검색을 실행했습니다. `impeccable`과 `redesign-existing-projects` 지침은 읽었으며, 실제 시각 변경 후 detector를 한 번만 실행합니다.

## Spec

### 학습 목표와 구현 연결

| 설계 목표 | 이번 개선 연결 | 합격 조건 |
|---|---|---|
| 여러 기준과 절충 설명 | A안·B안 비교가 시작 전에는 안내, 완료 후에는 조건·변화·문장 프롬프트로 이어짐 | 저장 전 `role="alert"` 없음, A/B 완료 후 비교 값과 문장 프롬프트 표시 |
| 평균만으로 결정하지 않기 | 선택한 제안의 공개 조건과 평균·최대 이동을 함께 확인 | 평균·최대 근거를 선택한 완료 요약에 각각 표시 |
| 주민 관점과 보완 | 완료 뒤 다음 학습 행동 문장으로 선택 이유를 친구에게 설명하도록 안내 | `다음 학습 행동` 영역과 실제 설명 문장 표시 |
| 접근성 | 건너뛰기 대상 포커스, 모바일 dialog 헤더, 기존 44px·focus-visible·reduced-motion 유지 | 320/375px 겹침 0, 대상 `tabindex=-1`, 기존 axe·키보드 테스트 통과 |
| 개인정보·안전 | 기존 세 고지 문구와 현재 탭 저장 경계 유지 | 새 네트워크·로그인·주소·실제 도시 표현 0건 |

### 상태별 화면 계약

| 상태 | 관찰된 문제 | 변경 계약 |
|---|---|---|
| 주민 관점표, 제안 0개 | `AlternativeComparison`이 데이터 손상용 alert를 렌더링함 | `A안은 아직 저장하지 않았습니다. ...` 안내를 일반 paragraph로 렌더링 |
| 주민 관점표, A안만 | 정상 중간 상태 안내는 유지 | B안 제작 CTA와 비교 방법을 계속 표시 |
| 의견서 완료, A안 선택 | 조건 목록은 모두 충족하지만 `수정 필요`가 보임 | 두 제안·조건 충족·우선 기준 일치이면 `타당안—절충 확인`; 아니면 `수정 필요`와 재검토 안내 |
| 업데이트 dialog, 320px | close 버튼이 제목 위로 겹침 | `.update-history-dialog-header` grid/flex 헤더, 좁은 화면은 세로 배치 |
| 첫 화면 skip link | fragment 대상이 포커스 불가능한 div | `StageFocusRegion` 루트에 `tabIndex={-1}` 추가 |
| 완료 요약 | 인쇄·처음부터 다시 시작만 있어 학습 전이가 약함 | `다음 학습 행동` 제목과 친구 설명용 한 문장 추가 |

### 접근성·모션·반응형

- 모든 기존 핵심 버튼은 44px 이상, `:focus-visible` 4px 외곽선, `gi-pulse` CTA를 유지합니다.
- `prefers-reduced-motion: reduce`에서는 `gi-pulse`와 dialog 전환의 반복 애니메이션을 추가하지 않고 정적 표시를 유지합니다.
- 모바일 표의 가로 스크롤은 `.perspective-table-wrap` 내부에만 존재해야 하며 문서 자체의 가로 스크롤은 0이어야 합니다.
- 건너뛰기 링크는 Tab 첫 순서에 있고 Enter 후 URL fragment가 `#learning-stage`이며, 대상 루트가 포커스 가능한 의미 구조를 가집니다.
- VoiceOver/TalkBack 실행과 음성 출력 구현은 범위에서 제외합니다. DOM·키보드·axe 증거로 분리해 기록합니다.

## Global Constraints

- 소스 파일 하나는 500줄 미만이어야 하며 `npm run check:lines`로 확인합니다.
- 데이터·엔진·미션 수·도시 수·판정 조건을 변경하지 않습니다.
- 실제 주소·GPS·실제 도시 이미지·외부 지도·AI 추천·온라인 저장·분석 SDK·음성 기능을 추가하지 않습니다.
- 기존 작업 트리의 `.playwright-mcp/`, `initial-audit.png`, `redesign-post-*.png`와 다른 산출물을 삭제하거나 덮어쓰지 않습니다.
- 계획 단계에서는 Git 상태를 바꾸지 않으며, 릴리스 승인 뒤 검증 결과와 공개 URL을 문서에 갱신합니다.
- 계획·감사 문서는 빈칸이나 미결정 표기 없이 정확한 파일·상태·합격 조건을 기록합니다.
- 계획에 적은 명령은 구현 시 실행할 명령이며 계획 작성 단계에서는 실행하지 않습니다.

## 예상 파일 구조와 책임

| 파일 | 책임 |
|---|---|
| `src/features/perspective/AlternativeComparison.tsx` | 제안 0개·A만·A/B 비교 상태의 안전한 분기와 어린이용 안내 |
| `src/features/perspective/perspective.test.tsx` | 제안 0개 정상 상태, A만 상태, 위조 props 차단 회귀 |
| `src/features/opinion/OpinionSummary.tsx` | 완료 요약 verdict 표시, 조건·근거·다음 학습 행동 |
| `src/features/opinion/opinion.test.tsx` | A안 선택 완료 verdict와 다음 행동 문구 회귀 |
| `src/navigation/StageFocusRegion.tsx` | `#learning-stage` 대상과 단계 변경 포커스·스크롤 |
| `src/app/App.test.tsx` | 건너뛰기 대상의 포커스 계약 |
| `src/updates/UpdateHistoryButton.tsx` | 업데이트 dialog 헤더 의미 구조 |
| `src/updates/updateHistory.test.tsx` | 최신 날짜·평이한 기록·dialog 포커스 회귀 |
| `src/app/app.css` | dialog 헤더 및 320/375px 반응형 배치 |
| `work/elementary-webapp-ux-audit.md` | 기준선·최종 브라우저 관찰과 P0~P3 장부 |
| `work/elementary-webapp-ux-language-audit.md` | 실제 렌더링 문구의 전후·난이도·이해 probe |
| `work/elementary-webapp-ux-simulation-decision.md` | 시뮬레이션 필요성 결정과 DOM/표 근거 |
| `work/elementary-webapp-ux-report.md` | 최종 변경·검증·미실행 범위·사람 확인 경계 |

## 작업별 Files·Interfaces·TDD 순서

각 단계는 반드시 **실패 테스트 작성 → 최소 구현 → 관련 테스트 통과 → 같은 브라우저 시나리오 재검증** 순서로 진행합니다.

### Task 1 — 기준선 문서와 시뮬레이션 결정

- Files: `work/elementary-webapp-ux-bootstrap.md`, `work/elementary-webapp-ux-audit.md`, `work/elementary-webapp-ux-language-audit.md`, `work/elementary-webapp-ux-simulation-decision.md`
- Interfaces: `StageId`, `AlternativeComparisonProps`, `OpinionDraft`, `ProposalSnapshot`
- 실패 조건: 기준선 문서에 320/375/1280 viewport, 첫 행동, 정상·빈·오류·완료 상태, 콘솔 로그가 없으면 단계가 실패합니다.
- 최소 기록: 인앱 브라우저에서 intake→data-room→placement→analysis→resident-view→opinion을 실제 클릭으로 통과하고 A안 선택 완료의 `수정 필요`, 제안 0개 alert, 320px dialog 겹침을 각각 selector·상태·관찰 문장으로 기록합니다.
- 통과 조건: 세 감사 문서에 P1/P2 이슈 ID, 학습자 persona, 복구 행동, `not-needed` 시뮬레이션 결정과 근거가 있습니다.

### Task 2 — 제안 0개 정상 상태 안내

- Files: `src/features/perspective/AlternativeComparison.tsx`, `src/features/perspective/perspective.test.tsx`
- Interface: `AlternativeComparisonProps { city; mission; first; second; comparison }`
- 실패 테스트: canonical `city`·`mission`과 `first=null`, `second=null`, `comparison=null`을 렌더링했을 때 `role="alert"`가 없고 `A안을 저장하면...` 안내가 있어야 한다는 테스트를 먼저 추가합니다.
- 최소 구현: `hasNoProposals` 분기를 `propsValid`에 포함하고, 기존 A만 안내와 같은 일반 문단으로 렌더링합니다. malformed city·mission·proposal·comparison은 현재 fail-closed alert를 유지합니다.
- 통과 테스트: 제안 0개·A만·완성 A/B·위조 snapshot 테스트를 실행합니다.
- 합격 조건: 주민 관점표 최초 진입에서 오류 단어가 사라지고, A안 저장 버튼과 B안 이동 CTA가 실제 흐름에서 그대로 동작합니다.

### Task 3 — 완료 verdict와 다음 학습 행동

- Files: `src/features/opinion/OpinionSummary.tsx`, `src/features/opinion/opinion.test.tsx`
- Interfaces: `OpinionSummaryProps`, `ProposalSnapshot.assessment`, `OpinionValidation`
- 실패 테스트: A안 assessment가 저장 시점에 `revise`여도 두 canonical 제안이 있고 선택안의 `conditionResults`가 모두 `passed`, `priorityConsistent=true`인 완성 draft라면 `타당안—절충 확인`과 `다음 학습 행동` heading이 표시되어야 한다는 테스트를 작성합니다. 조건 미충족 fixture는 `수정 필요`와 재검토 문장을 기대합니다.
- 최소 구현: `canPresentAsTradeoff`를 `OpinionSummary.tsx` 내부 순수 계산으로 만들고 `safeProposals.length === 2`, 선택안 조건 전체 통과, `priorityConsistent`를 확인합니다. 기존 assessment·validateOpinion·snapshot은 변경하지 않습니다. 완료 아래에 `다음 학습 행동` section과 “친구에게 선택한 기준, 가장 불편한 구역, 보완 방법을 차례로 설명해 보세요.” 문장을 추가합니다.
- 통과 테스트: `opinion.test.tsx`의 기존 보안·경계 테스트와 새 verdict/전이 테스트를 통과시킵니다.
- 합격 조건: A안과 B안 모두 조건·비교 맥락이 일치하는 완료 화면에서 misleading한 `수정 필요`가 없고, 실패한 조건 fixture에는 기존 안내가 남습니다.

### Task 4 — 업데이트 dialog 320/375px 헤더

- Files: `src/updates/UpdateHistoryButton.tsx`, `src/updates/updateHistory.test.tsx`, `src/app/app.css`
- Interfaces: `UpdateHistoryButton`, `UPDATE_HISTORY`
- 실패 테스트: dialog를 320px 폭 fixture로 렌더링했을 때 `.update-history-dialog-header`가 존재하고 h2·닫기 버튼 bounding box가 교차하지 않으며 닫기 버튼이 44px 이상이어야 한다는 DOM/CSS 테스트를 추가합니다. 기존 Escape·return focus 테스트도 유지합니다.
- 최소 구현: h2와 닫기 button을 `.update-history-dialog-header`로 묶고, desktop은 `grid-template-columns: minmax(0,1fr) auto`, 600px 이하에서는 `grid-template-columns: 1fr`과 버튼 우측 정렬을 적용합니다. float·음수 margin을 제거합니다.
- 통과 테스트: unit dialog test와 인앱 브라우저 320/375 screenshot/bounding-box 확인을 통과시킵니다.
- 합격 조건: 제목·닫기 버튼 겹침 0, dialog 내부 세로 스크롤만 허용, 배경 학습 콘텐츠와 dialog가 혼동되지 않습니다.

### Task 5 — skip link 포커스 대상

- Files: `src/navigation/StageFocusRegion.tsx`, `src/app/App.test.tsx`, 필요 시 `tests/e2e/redesign.spec.ts`
- Interfaces: `StageFocusRegionProps { stage; children }`
- 실패 테스트: `#learning-stage` 루트에 `tabindex="-1"`이 있고 일반 Tab 순서에는 포함되지 않는다는 테스트를 먼저 작성합니다.
- 최소 구현: StageFocusRegion wrapper에 `tabIndex={-1}`을 추가합니다. 단계 변경 h2 포커스와 `scrollIntoView` 동작은 그대로 둡니다.
- 통과 테스트: StageFocusRegion unit, keyboard-only E2E의 첫 Tab·Enter·fragment 검증을 통과시킵니다.
- 합격 조건: 키보드 사용자가 헤더를 반복하지 않고 학습 영역으로 이동하며, 단계 전환 focus contract가 깨지지 않습니다.

### Task 6 — 날짜 기록과 통합 검증

- Files: `src/updates/updateHistory.ts`, `src/updates/updateHistory.test.tsx`, `work/elementary-webapp-ux-report.md`
- Interface: `UpdateEntry { date; category; summaries }`
- 실패 테스트: 최신 `UPDATE_HISTORY[0].date`가 `2026-08-31`이고 “A안 비교 안내·모바일 업데이트 창·완료 요약”을 어린이용 문장으로 설명한다는 테스트를 먼저 추가합니다.
- 최소 구현: 2026-08-31 `개선` entry를 가장 앞에 추가하고 기존 날짜·불변성 규칙을 유지합니다.
- 통과 테스트·브라우저: `npm run lint`, `npm run test:unit`, `npm run test:a11y`, `npm run test:e2e`, `npm run check:lines`, `npm run build`, 동일 브라우저 학습 경로·320/375/1280·reduced-motion·콘솔 로그를 실행합니다.
- 합격 조건: P0 0, 신규 P1 0, 소스 500줄 이상 0, lint/unit/a11y/e2e/build 모두 통과입니다. VoiceOver는 실행하지 않습니다.

## 실패 테스트 → 최소 구현 → 통과 테스트 명령

아래 명령은 구현 시 순서대로 실행할 항목입니다.

```bash
# Task 2
npx vitest run src/features/perspective/perspective.test.tsx
# 기대 결과: 새 제안 0개 안내 테스트는 처음에는 실패하고, AlternativeComparison 최소 구현 뒤 통과

# Task 3
npx vitest run src/features/opinion/opinion.test.tsx
# 기대 결과: A안 완료 verdict와 다음 학습 행동 테스트가 최소 구현 뒤 통과

# Task 4
npx vitest run src/updates/updateHistory.test.tsx
# 기대 결과: dialog header 구조·Escape·return focus·최신 날짜가 통과

# Task 5
npx vitest run src/navigation/StageFocusRegion.test.tsx src/app/App.test.tsx
# 기대 결과: #learning-stage tabindex와 단계 heading focus가 통과

# 좁은 범위 회귀
npm run lint
npm run test:unit
npm run test:a11y
npm run check:lines
npm run build
npm run test:e2e
# 기대 결과: 타입·단위·axe·줄 수·Vite build·실제 Tab 학습 흐름 모두 통과

# 시각/무결성 detector (변경된 TSX target에 대해 한 번)
node /Users/kimhongnyeon/.codex/skills/impeccable/scripts/detect.mjs --json src/features/perspective/AlternativeComparison.tsx src/features/opinion/OpinionSummary.tsx src/navigation/StageFocusRegion.tsx src/updates/UpdateHistoryButton.tsx
# 기대 결과: detector 결과를 report에 기록하고 false positive와 실제 이슈를 분리
```

## 릴리스 커밋 기록

계획에 적은 기능 단위와 문서를 검증한 뒤 `57b1a96 fix: polish elementary learner ux flow` 한 커밋으로 묶어 `main`에 푸시했습니다. GitHub Actions `33348738969`의 build·deploy job과 공개 Pages 학습 경로 검증까지 완료했습니다. 다음 변경이 생기면 같은 순서로 관련 테스트, `git diff --check`, 빌드, 공개 URL을 확인합니다.

## Rollback

각 변경은 독립 파일·테스트 단위로 되돌릴 수 있습니다. verdict 표시는 `OpinionSummary`에만 국한하고 엔진/상태 snapshot을 변경하지 않으므로, 문제 발생 시 해당 컴포넌트의 display helper와 테스트를 함께 되돌립니다. dialog 구조는 CSS와 JSX를 같은 커밋 단위로 되돌리고, StageFocusRegion은 `tabIndex` 한 줄 제거로 기존 단계 포커스 로직을 보존합니다.

## 완료 검토 체크리스트

- [x] `elementary-webapp-ux-audit.md` 기준선·최종 이슈 장부가 실제 selector와 viewport를 가집니다.
- [x] `elementary-webapp-ux-language-audit.md` 모든 변경 문구에 before/after, 학습 의도, curriculum 용어, comprehension probe가 있습니다.
- [x] `elementary-webapp-ux-simulation-decision.md`는 DOM/표 기반 결정적 모델을 `not-needed`로 판단하고 과장된 시뮬레이션을 추가하지 않았습니다.
- [x] 정상 제안 0개 상태에 alert가 없고 malformed props에는 alert가 남아 있습니다.
- [x] A안 완료 화면의 verdict와 조건 목록이 서로 모순되지 않습니다.
- [x] 업데이트 dialog 제목·닫기 버튼이 320px에서 겹치지 않습니다.
- [x] 완료 화면에 다음 학습 행동이 있고, 개인정보·안전 문구가 그대로입니다.
- [x] 44px controls, `gi-pulse`, reduced-motion, 모바일 표 overflow, 키보드·axe 증거가 통과했습니다.
- [x] VoiceOver/TTS/녹음·외부 저장은 실행하지 않았고 개인정보·안전 경계를 유지했습니다.

## 구현 기록

2026-08-31에 계획의 Task 2~6을 순서대로 구현하고 동일 학습 경로를 새 개발 서버에서 재검증했습니다.

- `src/features/perspective/AlternativeComparison.tsx`: canonical한 제안 0개 상태는 일반 안내로, 불완전하거나 위조된 자료는 기존 `role="alert"` fail-closed 경계로 유지했습니다.
- `src/features/opinion/OpinionSummary.tsx`: 두 제안·우선 기준 일치·선택안 조건 전체 통과 맥락에서 `타당안—절충 확인`을 표시하고, 실패 맥락에는 `수정 필요`와 재검토 도움말을 표시합니다. `다음 학습 행동` 영역을 추가했습니다.
- `src/updates/UpdateHistoryButton.tsx`, `src/app/app.css`, `src/updates/updateHistory.ts`: dialog 헤더를 의미 있는 grid 구조로 바꾸고 2026-08-31 개선 기록을 추가했습니다.
- `src/navigation/StageFocusRegion.tsx`: `#learning-stage` 루트에 `tabIndex={-1}`을 추가했습니다.
- 관련 회귀 테스트를 `perspective.test.tsx`, `opinion.test.tsx`, `updateHistory.test.tsx`, `App.test.tsx`에 추가했습니다.

최종 검증과 릴리스 결과는 [`elementary-webapp-ux-report.md`](./elementary-webapp-ux-report.md)에 기록했습니다. 현재 변경은 `main`에 커밋·푸시되었고 GitHub Pages에 배포되었습니다.
