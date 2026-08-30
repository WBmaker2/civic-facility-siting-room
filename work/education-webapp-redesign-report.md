# Civic Facility Siting Room Education Web App Redesign Report

작성일: 2026-08-29 (KST)
대상: `/Volumes/ External Drive 256G/Dev2/codex/civic-facility-siting-room`

## 결과 요약

초등 5~6학년 학습자의 실제 흐름을 보존하면서 단계 전환 위치, 첫 행동, 모바일 표 읽기, 결과 정보 계층을 개선했습니다. 도시·미션·판정 모델, 개인정보·사회적 안전 문구, 새로고침 시 비저장 계약은 변경하지 않았습니다.

## 구현 내용

- `src/navigation/StageFocusRegion.tsx`를 추가해 단계 변경 시 새 영역의 첫 `h2`에 `tabindex=-1`을 부여하고 포커스·스크롤합니다. reduced-motion에서는 즉시 스크롤하며 첫 렌더와 React StrictMode 재실행은 건너뜁니다.
- `src/app/App.tsx`에서 제목·모형 한계·업데이트 버튼을 헤더로 묶고 stage를 `StageFocusRegion`으로 감쌌습니다.
- `src/navigation/ProgressStepper.tsx`에 현재 단계 `role=status`, `aria-live=polite`를 추가하고 6열/2열 단계 카드 스타일을 연결했습니다.
- `src/features/intake/ReviewIntake.tsx`의 미션 조건을 선택형 `details`로, 우선 기준·완료 조건·안전 안내를 카드와 순서 있는 묶음으로 정리했습니다.
- `src/features/analysis/AccessMetrics.tsx`의 핵심 평균·최대·도달 불가 카드는 유지하고 반복 근거는 `metric-details`로 접었습니다. `ImpactAnalysis.tsx` 계산 상태에는 `영향 계산 안내` accessible name을 부여했습니다.
- `src/features/perspective/ResidentPerspective.tsx`에 모바일 표 이동 안내·`aria-describedby`·sticky 첫 열 계약을 추가했습니다.
- `src/features/perspective/AlternativeComparison.tsx`의 A/B 공개 조건 결과를 제안별 `details`로 정리했습니다.
- `src/styles/tokens.css`, `src/styles/global.css`, `src/styles/responsive.css`, `src/app/app.css`를 light-only 토큰과 320/375/768/1280 레이아웃 기준으로 갱신했습니다. 지도는 내부 overflow를 유지하고 문서 overflow를 막도록 grid min-width를 분리했습니다.
- `src/updates/updateHistory.ts`에 2026-08-29 리디자인 내역을 추가했습니다.
- `tests/e2e/redesign.spec.ts`에 단계 포커스·업데이트 버튼 흐름·375px 표 overflow·200% 텍스트 확대 proxy 검증을 추가했습니다.

## 자동 검증 증거

| 명령 | 결과 |
|---|---|
| `npx vitest run src/navigation/StageFocusRegion.test.tsx src/navigation/ProgressStepper.test.tsx src/updates/updateHistory.test.tsx src/features/intake/ReviewIntake.test.tsx src/features/perspective/perspective.test.tsx` | 5 files, 25 tests passed |
| `npm run test:unit` | 27 files, 242 tests passed |
| `npm run test:a11y` | 2 tests passed; axe serious/critical 0 |
| `npm run lint` | passed |
| `npm run check:lines` | 96 source files checked; 500줄 이상 0개 |
| `npm run build` | Vite production build passed; `dist/` 생성 |
| `npm run test:e2e` | 10 tests passed, 37.8s |
| `npx playwright test tests/e2e/redesign.spec.ts --reporter=list` | 3 tests passed, 8.9s |

Vitest 실행 중 jsdom의 `HTMLCanvasElement.getContext()` 미구현 경고가 있었지만 테스트 실패는 없었습니다.

## 브라우저·반응형 확인

- 로컬 URL `http://127.0.0.1:5173/`에서 1280×812 초기 화면을 확인했습니다. 헤더의 업데이트 버튼은 콘텐츠와 겹치지 않았고 단계 요약은 6열입니다.
- 375×812에서 자료실 진입 후 새 제목이 포커스되고 y=17 부근에 표시되었습니다. 단계 요약은 2열이며 자료층 선택·자료실 CTA가 화면 폭 안에 있습니다.
- 320×800·375×812·768×812에서 문서 가로 overflow가 없고 표·지도 내부에만 가로 이동이 생겼습니다.
- 200% 텍스트 확대 proxy에서 문서 폭은 viewport와 같고 지도 내부 scroll width만 커졌습니다.
- 브라우저 콘솔 error 0을 확인했습니다. 초기 감사의 favicon 404는 별도 자산 승인 없이 수정하지 않고 pending 관찰로 남겼습니다.

## 안전·범위 확인

- 실제 주소·GPS·실제 도시·로그인·서버 저장·분석 SDK·AI 추천·음성 기능·외부 데이터는 추가하지 않았습니다.
- 실제 주민이나 특정 집단의 불편을 개인 책임으로 설명하는 문장을 추가하지 않았습니다.
- 이미지 자산이 없으므로 `imagegen`은 호출하지 않았습니다. DOM 지도·표의 정확성과 대체 텍스트 계약을 우선했습니다.
- 지원 목록에 없는 `impeccable`, `ui-ux-pro-max`, `redesign-existing-projects` 역할은 unavailable/not run으로 기록했습니다.
- VoiceOver/TalkBack은 요청 범위에서 제외했으며, 자동 axe·키보드·반응형 검증과 인간 보조공학 승인을 동일한 증거로 표현하지 않았습니다.

## 남은 확인·실행 선택지

- 현재 변경은 로컬 작업 트리에만 있습니다. 사용자가 별도로 승인하기 전까지 커밋·푸시·GitHub Pages 배포·HVC 등록은 실행하지 않았습니다.
- 배포를 요청할 경우 먼저 변경 파일과 전체 검증 결과를 확인한 뒤, 저장소의 기존 release 절차를 따라 커밋·푸시·Pages 공개 URL의 실제 학습 경로를 다시 검증해야 합니다.

## 2026-08-30 재실행 결과

이번 실행은 현재 작업 트리에 있던 리디자인을 기준으로 규칙·계획을 다시 확인하고, UI 품질 감사에서 확인한 작은 결함을 보강한 것입니다. 기존 `SessionState`, 도시·미션 데이터, 판정 엔진, 개인정보·사회적 안전 문구는 변경하지 않았습니다.

### 기록·지원 역할

- `PRODUCT.md`를 기존 설계 문서와 명시적 리디자인 요청에서 확인한 제품 사실만으로 작성했습니다. 시각 토큰이나 확인되지 않은 주장은 넣지 않았습니다.
- `impeccable`, `ui-ux-pro-max`, `redesign-existing-projects`, `imagegen`의 실제 `SKILL.md`를 읽었습니다. `ui-ux-pro-max`의 design-system·React·접근성 검색도 실행했습니다.
- 저장소에는 이미지 자산이 없고 DOM 지도·표가 사실성과 접근성의 핵심이므로 `imagegen` 생성은 실행하지 않았습니다. 실제 지도·기관·주민을 묘사하는 이미지는 추가하지 않았습니다.
- 프로젝트 규칙 검색에서 `AGENTS.md`와 `EDUCATION_DESIGN.md`는 발견되지 않았으며, 기존 `design-system/MASTER.md`와 리디자인 계획을 최우선 기준으로 사용했습니다.

### 이번 구현

- `src/app/App.tsx`, `src/navigation/StageFocusRegion.tsx`에 `본문으로 건너뛰기` 링크와 `#learning-stage` 랜드마크를 추가해 첫 키보드 이동에서 현재 학습 영역으로 바로 이동하도록 했습니다.
- `src/styles/global.css`의 callout 강조를 side-tab `border-left`에서 토큰 기반 1px 경계·inset 상단 accent 또는 표면 색으로 바꾸고, `button:hover`·`button:active`·`touch-action: manipulation`·공유 transition을 추가했습니다.
- `@media (prefers-reduced-motion: reduce)`에서 버튼 transition을 끄고, 모바일 skip link 위치를 별도 규칙으로 보정했습니다.
- `src/updates/updateHistory.ts`에 2026-08-30의 어린이용 변경 기록을 추가했습니다.
- `src/app/App.test.tsx`, `src/styles/ui-contract.test.ts`, `tests/e2e/redesign.spec.ts`에 skip link·CSS side-tab 회귀·포인터 피드백 계약을 추가했습니다.

### 검증 증거

| 명령 | 결과 |
|---|---|
| `npm run check` | lint 통과, Vitest 28개 파일·247개 테스트 통과, 500줄 이상 소스 0개, Vite build 통과 |
| `npm run test:a11y` | 2개 테스트 통과; axe serious/critical 0 |
| `npm run test:e2e` | 11개 테스트 통과 (전체 학습 흐름·키보드·모바일·privacy·리디자인 계약) |
| `npx playwright test tests/e2e/redesign.spec.ts --reporter=list` | 4개 테스트 통과 (단계 포커스·표 overflow·200% 확대·skip/포인터 상태) |
| `git diff --check` | 공백 오류 0 |
| `node /Users/kimhongnyeon/.codex/skills/impeccable/scripts/detect.mjs --json ...` | 마지막 UI 대상 스캔에서 mechanical finding `[]`; side-tab 경고 제거 확인 |

Vitest·axe 실행 중 jsdom의 `HTMLCanvasElement.getContext()` 미구현 경고가 있었지만 실패는 없었습니다. 브라우저 자동 검증은 375px 좁은 화면을 포함하며 문서 가로 overflow 0, 표·지도 내부 overflow만 허용하는 기존 계약을 계속 통과했습니다.

### 남은 확인과 실행 경계

- 초기 감사에서 기록한 `favicon.ico` 404는 별도 자산 승인 없이 자동 생성하지 않아 관찰 항목으로 남겼습니다.
- VoiceOver/TalkBack 실행과 사람의 보조공학 승인은 이 작업 범위에서 제외했습니다.
- 현재 변경은 커밋되지 않은 로컬 작업 트리에 있습니다. 이번 실행에서는 GitHub 저장소, 커밋·푸시, Pages 배포, HVC 등록을 시작하지 않았습니다.

### 2026-08-30 릴리스 전 회귀 보강

- 업데이트 내역 버튼의 컴포넌트 전용 기본 배경이 전역 hover 규칙을 덮어쓰던 문제를 확인했습니다. `src/app/app.css`에 전용 hover·pressed 규칙을 추가하고 `src/styles/ui-contract.test.ts`에 회귀 계약을 보강했습니다.
- 180ms 색상 전환 중간값을 읽던 E2E 타이밍 경합을 `expect.poll`로 안정화했습니다. 단독 리디자인 E2E 4개와 전체 E2E 11개가 모두 통과했습니다.
- 릴리스 직전 재검증: `npm run check` (28개 파일·247개 테스트, 빌드 포함), `npm run test:a11y` (2개, axe serious/critical 0), `npm run test:e2e` (11개), `git diff --check` 통과.
