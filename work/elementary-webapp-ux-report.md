# Elementary Web App UX Improvement Report

작성일: 2026-08-31
대상: `/Volumes/ External Drive 256G/Dev2/codex/civic-facility-siting-room`
적용 워크플로: `elementary-webapp-ux-orchestrator` full mode
대상 학습자: 초등학교 5~6학년

## 결과 요약

기준선에서 확인한 P1 세 건과 P2 두 건을 구현하고, 같은 책마루 도서관 시나리오를 새 개발 서버에서 다시 실행했습니다.

- 제안이 하나도 없는 주민 관점표는 오류 경고가 아니라 `A안은 아직 저장하지 않았습니다`라는 시작 안내를 보여 줍니다.
- A안·B안과 공개 조건을 모두 확인한 완료 화면은 조건 목록과 일치하는 `타당안—절충 확인`을 보여 줍니다. 조건이 빠지면 `수정 필요`와 재검토 도움말을 유지합니다.
- 320px·375px 업데이트 내역 dialog의 제목과 닫기 버튼을 반응형 헤더로 분리했습니다.
- 완료 화면에 친구에게 선택 기준·불편한 구역·보완 방법을 설명하는 `다음 학습 행동`을 추가했습니다.
- `#learning-stage`에 `tabIndex={-1}`을 부여해 건너뛰기 링크의 실제 포커스 대상을 만들었습니다.
- 2026-08-31 날짜의 어린이용 업데이트 기록을 추가했습니다.

검증 후 커밋 `57b1a96 fix: polish elementary learner ux flow`를 `main`에 푸시했고, GitHub Actions `33348738969`의 build·deploy job 성공을 확인했습니다.

## 기준선과 개선 장부

기준선은 1280×720, 375×812, 320×800 viewport에서 인앱 브라우저로 관찰했습니다. 기준선은 문서 가로 overflow가 없고 핵심 학습 계산이 동작했지만, 정상적인 제안 0개 상태가 `role="alert"`로 표시되고, 모든 조건이 충족된 A안 완료가 `수정 필요`로 보이며, 320px dialog의 제목과 닫기 버튼이 겹쳤습니다.

최종 이슈 장부는 [`elementary-webapp-ux-audit.md`](./elementary-webapp-ux-audit.md)에 있으며 EDU-UX-001~005를 `fixed; confirmed`로 갱신했습니다.

| 이슈 | 최종 확인 |
|---|---|
| EDU-UX-001 정상 제안 0개 상태 | `role="alert"` 0개, 시작 안내 문장 표시 |
| EDU-UX-002 완료 verdict 불일치 | `타당안—절충 확인` 표시, `수정 필요` 미표시 |
| EDU-UX-003 320px dialog 겹침 | heading·close bounding box 교차 `false`, 문서 overflow `0px` |
| EDU-UX-004 완료 후 전이 부족 | `다음 학습 행동` heading과 설명 문장 표시 |
| EDU-UX-005 skip 대상 포커스 | `#learning-stage` `tabindex="-1"`, keyboard-only E2E 통과 |

## 설계 요구사항 연결

| 요구사항 | 구현·검증 연결 |
|---|---|
| 여러 기준과 절충 | A/B 비교 전에는 저장 순서를 안내하고, 완료 후에는 평균·최대·비용·위험·변화와 문장 프롬프트를 함께 표시했습니다. |
| 평균만으로 결정하지 않기 | 의견서의 평균 이동 단위와 가장 긴 이동 단위 근거 선택을 보존했습니다. |
| 주민 관점과 보완 | 완료 후 친구에게 세 가지 요소를 차례로 설명하는 다음 학습 행동을 추가했습니다. |
| 접근성 | 네이티브 입력, 기존 44px control·`focus-visible`·`gi-pulse`·reduced-motion 정책을 보존하고 skip 대상과 dialog 헤더를 보완했습니다. |
| 개인정보·안전 | 이름·학교·주소·실제 지역 금지, 가상 도시·상대 단위·주민 비난 금지 문구와 현재 탭 저장 경계를 변경하지 않았습니다. |
| MVP 범위 | 새 서버·외부 API·분석 SDK·로그인·음성·실제 지도·이미지 자산을 추가하지 않았습니다. |

## 구현 파일과 책임

- `src/features/perspective/AlternativeComparison.tsx`: canonical한 제안 0개를 정상 안내로 분기하고 malformed 자료는 기존 fail-closed alert로 유지했습니다.
- `src/features/perspective/perspective.test.tsx`: 제안 0개 안내와 기존 경계 회귀를 검증합니다.
- `src/features/opinion/OpinionSummary.tsx`: 두 제안, 우선 기준 일치, 선택안 조건 전체 통과를 확인하는 표시용 `canPresentAsTradeoff`를 추가했습니다. 원본 엔진 판정과 `validateOpinion` 계약은 변경하지 않았습니다.
- `src/features/opinion/opinion.test.tsx`: 완료 verdict와 다음 행동 문장을 검증합니다.
- `src/updates/UpdateHistoryButton.tsx`: 제목과 닫기 버튼을 `.update-history-dialog-header`로 묶었습니다.
- `src/app/app.css`: 넓은 화면 grid와 600px 이하 세로 헤더를 정의하고 float·음수 margin을 제거했습니다.
- `src/updates/updateHistory.ts`, `src/updates/updateHistory.test.tsx`: 2026-08-31 기록과 불변·최신 날짜 회귀를 추가했습니다.
- `src/navigation/StageFocusRegion.tsx`, `src/app/App.test.tsx`: `#learning-stage` 포커스 계약을 추가했습니다.
- `src/styles/global.css`: verdict 도움말과 다음 학습 행동 영역의 기존 토큰 기반 스타일을 추가했습니다.

모든 변경 소스 파일은 줄 수 검사에서 500줄 미만입니다.

## 언어·시뮬레이션·시각 결정

- [`elementary-webapp-ux-language-audit.md`](./elementary-webapp-ux-language-audit.md)에 실제 렌더링 문구의 before/after, 학습 의도, 교육과정 용어, comprehension probe를 기록했습니다. `가상 도시`, `가상 단위`, `사람 토큰`, 개인정보·사회적 안전 고지는 사실 보존을 위해 바꾸지 않았습니다.
- [`elementary-webapp-ux-simulation-decision.md`](./elementary-webapp-ux-simulation-decision.md)의 결정은 `not-needed`입니다. 고정 격자·도로 그래프와 DOM 표가 학습 사실의 원본이므로 Canvas/WebGL·시간 기반 게임·새 이미지가 필요하지 않습니다.
- `ui-ux-pro-max` 런타임 카탈로그는 준비되지 않아 CLI fallback 검색으로 디자인 시스템 보고서를 생성했습니다. 기존 light-only 토큰과 표·지도 동등성을 우선해 새 장식 스타일은 덧붙이지 않았습니다.

## 검증 결과

### 자동 게이트

| 명령 | 결과 |
|---|---|
| `npm run lint` | 통과 |
| `npm run test:unit -- --reporter=dot` | 28개 파일, 251개 테스트 통과. jsdom Canvas 미구현 알림은 기존 비차단 경고입니다. |
| `npm run test:a11y -- --reporter=dot` | 접근성 테스트 1개 파일, 2개 테스트 통과 |
| `npm run test:e2e -- --reporter=list` | 11개 테스트 통과(33.9초) |
| `npm run check:lines` | 97개 소스 파일 검사, 500줄 이상 0개 |
| `npm run build` | TypeScript·Vite 통과, 65 modules 변환. JS 323.92 kB, CSS 18.19 kB 산출 |
| `git diff --check` | 공백·패치 오류 없음 |
| Impeccable detector | 변경 TSX 4개 대상 JSON `[]` |

### 실제 학습자 경로

새로 시작한 1280×720 인앱 브라우저에서 다음 순서를 실제 클릭했습니다.

```text
책마루 도서관 + 접근성
→ 인구·도로 자료층 확인
→ 가운데 광장 터(C3) A안 계산
→ 평균·가장 긴 이동 확인
→ 주민 관점표에서 햇살 북쪽 구역 선택·A안 저장
→ 느린 강변 터(B2) B안 계산
→ 평균·가장 긴 이동 확인
→ 느티나무 남쪽 구역 선택·B안 저장
→ A안·평균·최대·비용 근거·세 문장 입력
→ 완료
```

관찰 결과:

- A안 저장 전 비교 영역은 `role="alert"` 없이 시작 안내를 표시했습니다.
- 완료 영역은 `타당안—절충 확인`, `다음 학습 행동`, 친구 설명 문장을 함께 표시했고 `수정 필요`는 없었습니다.
- 단계 전환 focus는 `stage-heading`, `placement-heading`, `impact-analysis-heading`, `resident-perspective-heading`, `opinion-form-heading`, `opinion-summary-heading`으로 이동했습니다.
- 전체 흐름 console `error/warn`은 `[]`였습니다.

### 좁은 화면

- 375px viewport: `clientWidth=360`, `scrollWidth=360`, 문서 overflow `0px`.
- 320px 업데이트 dialog: heading과 닫기 버튼의 bounding box 교차 `false`, 문서 overflow `0px`. 버튼은 제목 아래에 놓였습니다.
- 기존 E2E의 모바일 표 내부 가로 스크롤, 200% 텍스트 확대, reduced-motion, 키보드 Tab 경로도 통과했습니다.

## 접근성·안전 경계

검증 범위는 DOM semantics, 키보드·Tab 순서, axe 기반 테스트, focus-visible, reduced-motion, 반응형 레이아웃입니다. VoiceOver/TalkBack 실행, TTS·음성 입력·녹음 기능은 교육적 필요와 별도 승인 없이 추가하거나 검증하지 않았습니다. 관찰은 초등학교 5~6학년 페르소나 기반 시뮬레이션이며 실제 학생 연구나 보조공학 인증이 아닙니다.

개발 서버에서 Playwright CLI를 실행하려 할 때 사용자 npm 캐시의 root-owned 파일로 `EPERM`이 발생해 Codex 인앱 브라우저로 동일 URL을 검증했습니다. CI용 Playwright 계약은 별도로 `npm run test:e2e`에서 11개 모두 통과했습니다.

## 남은 확인과 릴리스 상태

코드·문서·자동 검증은 완료했습니다. 실제 수업 전에는 교사 1회 검토, 실제 초등 학습자 관찰, Safari/WebKit 수동 확인을 추가할 수 있습니다. 이 보고서의 관찰만으로 학생 이해도나 수업 효과를 확정하지 않습니다.

현재 변경은 `main`과 공개 Pages에 반영되어 있습니다. [공개 학습 앱](https://wbmaker2.github.io/civic-facility-siting-room/)에서 제목·자산·375px 반응형·A/B 완료 경로·완료 verdict·console `error/warn` 0건을 확인했습니다. Actions 실행은 [33348738969](https://github.com/WBmaker2/civic-facility-siting-room/actions/runs/33348738969)에서 확인할 수 있습니다.

브라우저 로그·스크린샷 임시 산출물(`.playwright-mcp/`, `initial-audit.png`, `redesign-post-*.png`)은 커밋하지 않고 작업 트리에 보존했습니다.

관련 문서:

- [`elementary-webapp-ux-plan.md`](./elementary-webapp-ux-plan.md)
- [`elementary-webapp-ux-audit.md`](./elementary-webapp-ux-audit.md)
- [`elementary-webapp-ux-language-audit.md`](./elementary-webapp-ux-language-audit.md)
- [`elementary-webapp-ux-simulation-decision.md`](./elementary-webapp-ux-simulation-decision.md)
