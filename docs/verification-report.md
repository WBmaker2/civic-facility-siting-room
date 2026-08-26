# 도시 기능 입지 심의실 검증 보고서

검증일: 2026-08-27 (KST)
브라우저: Google Chrome for Testing 145.0.7632.6 (Playwright Chromium)
Playwright: 1.62.1
Node.js: v24.13.1
자동 뷰포트: 기본 E2E 1280×720, `mobile-and-motion.spec.ts` 375×812
자동 환경: `npm run dev -- --host 127.0.0.1`, 로컬 정적 Vite SPA, Playwright 1 worker

## 자동 검증 결과

- `npm run test:a11y`: PASS — 1 file, 2 tests. 실제 intake→data-room→placement→analysis→resident-view→opinion 여섯 rendered stage를 순서대로 렌더링하고 axe serious/critical 0을 확인했습니다. 같은 테스트가 main 1개, heading 순서, unique ID, live announcement(analysis), labeled grid/table/fieldset, pattern/icon/text 범례를 확인합니다 (`tests/accessibility/app.a11y.test.tsx`).
- `npm run test:e2e`: PASS — 7 tests. 모든 E2E에는 page error 및 console error/warning fail-closed guard가 있습니다 (`tests/e2e/flow-helpers.ts`).
  - `learner-flow.spec.ts`: library와 combined 두 경로 PASS. intake→자료층→배치→분석→주민 관점→A/B 비교→구조화 의견 제출을 실제 UI로 완료했습니다. combined는 공유 예산, 도서관·건강 도움소 역할 분담, 단계 설치 문장, B2/D3와 C2/E3 두 쌍을 확인합니다.
  - `table-only.spec.ts`: `/?view=table`로 진입해 첫 data-room 렌더부터 table visible 및 **grid count 0**을 확인하고, labeled table만으로 후보를 선택해 분석·소외 구역·대안·의견을 완료했습니다. population/road/risk/cost/existing/candidate/analysis/resident/opinion 텍스트를 확인합니다.
  - `mobile-and-motion.spec.ts`: 375×812에서 document overflow 0, 지도/표/선택 위치/결과표 탭, 선택 좌표 B2, visible focus ring, 분석 CTA와 의견서 핵심 입력/제출 대상 및 업데이트 dialog close의 44px geometry를 100%와 root-font-size 200% proxy에서 확인하고, root text-scale reflow와 reduced-motion computed animation `none`/`0s`를 확인했습니다.
  - `privacy-and-network.spec.ts`: distinctive learner text와 선택이 reload 후 초기화되고, 모든 request host가 `127.0.0.1`이며 analytics/maps/geocoding/AI/login/submission 유사 경로가 없음을 fail-closed로 확인했습니다.
  - `keyboard-only.spec.ts`: 처음 mission native select와 마지막 opinion-zone native select 두 곳만 승인된 `selectOption` 자동화 예외로 값만 설정합니다. 그 외 library 전체 흐름은 locator focus/click/check 없이 실제 Tab/Shift+Tab 순회와 Arrow, Enter, Space, Escape 키 이벤트로 완료하고 업데이트 dialog 포커스 복귀를 검증합니다. headless Chromium의 native select ArrowDown 커밋 한계를 런타임 우회 없이 두 select 경계로 기록했으며, 실제 사용자 키보드 조작은 수동 확인이 필요합니다.
- `npm run lint`: PASS.
- `npm run test:unit`: PASS — 25 files, 226 tests (E2E specs are excluded from Vitest discovery).
- `npm run check:lines`: PASS — 92 source files, 0 files at or above 500 lines.
- `npm run build`: PASS — strict TypeScript compile 및 Vite `dist/index.html`/hashed local assets 생성.

## 설계 완료 기준 및 안전 계약

1. 결과의 평균·최대·도달 불가·위험·비용에는 계산 근거와 교육용 상대 단위 안내가 함께 표시됩니다 — `learner-flow.spec.ts`, `table-only.spec.ts`.
2. 평균만으로 통과시키지 않고 가장 긴 이동/도달 불가 및 주민 관점 선택을 요구합니다 — `src/state/sessionReducer.ts` stage gate와 `learner-flow.spec.ts`.
3. 네 미션의 복수 타당안 fixture와 A/B 비교를 유지하며 단일 정답·순위·AI 자동 추천을 제공하지 않습니다 — `src/domain/fixtures.test.ts`, `learner-flow.spec.ts`.
4. 표 대체 보기만으로 핵심 활동 완료 — `table-only.spec.ts`.
5. 375px, keyboard/tab focus, 200% root-font-size reflow proxy, reduced motion 자동 검증 PASS. 실제 브라우저 확대 조작, VoiceOver와 물리적 macOS Reduce Motion은 아래와 같이 미검증입니다.
6. 가상 도시 2종, 미션 4개, 인구·도로·위험·비용의 **4개 primary layer + 기존 시설 context**, combined shared budget — `src/domain/fixtures.test.ts`, `learner-flow.spec.ts`.
7. current-tab memory-only reload reset 및 localhost-only request — `privacy-and-network.spec.ts`.
8. 실제 지도/주소/GPS, 응급 성능 예측, 법·토지가·재난 예측, 온라인 투표, AI 추천 기능 없음 — fixture/copy unit tests와 E2E learner output. 화면에는 다음 문구를 유지합니다: `실제 도시계획을 대신하거나 응급 서비스 성능을 예측하지 않습니다`.
9. `src/updates/updateHistory.ts`에 실제 KST 개발일 `2026-08-27`과 같은 날짜의 모바일 개선 항목이 최신순으로 기록되어 있습니다.
10. 교육과정·콘텐츠·사회적 표현·개인정보 검토 — `docs/content-and-safety-review.md`.

## 수동 접근성 검증

UNVERIFIED — 사용자 실기 확인 필요. 이 세션에서는 macOS VoiceOver, 물리적 macOS Reduce Motion, 실제 브라우저 chrome zoom을 수행하지 않았으며 PASS로 주장하지 않습니다. 자동 axe, accessibility semantics, Playwright keyboard interaction, viewport/text-scale 200% proxy 및 `prefers-reduced-motion` computed-style 근거와 구분합니다. `keyboard-only.spec.ts`도 native mission/zone selectOption 두 곳 외에는 키보드 이벤트를 사용하지만 실제 사용자 키보드 확인은 별도입니다.

사용자 실행 스크립트:

```bash
npm run dev -- --host 127.0.0.1
# 별도 터미널에서 브라우저를 127.0.0.1:5173으로 열기
# macOS: Command+F5로 VoiceOver 시작
# headings/main/fieldset/grid/table을 읽고, Tab/Shift+Tab/Arrow/Enter/Space/Escape로
# library 및 combined 전체 경로, 표-only 경로, 업데이트 내역 dialog를 반복 확인
# 브라우저 chrome 확대 200%와 시스템 Reduce Motion을 각각 켜고 focus/overflow/정적 범위를 확인
```

확인 전까지 VoiceOver 버전, 실제 chrome zoom 및 물리적 Reduce Motion 관찰 결과는 비워 둡니다.

## 변경 범위

Task 14 이후 acceptance failure로 확인된 375px 컨테이너 가로 넘침을 `src/styles/responsive.css`에서 내부 overflow/reflow로 최소 수정했습니다. 같은 개선 범위에서 `?view=table` 실제 table-only 시작, 범례 named semantic, 의견서 textarea 44px 터치 영역을 보강했으며 2026-08-27 `개선` update-history 항목과 exact unit test에 기록했습니다. 테스트·검증 파일은 외부 네트워크, persistence, analytics, map SDK, API, login, submission을 추가하지 않습니다.
