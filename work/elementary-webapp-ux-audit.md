# Elementary Web App UX Audit

작성일: 2026-08-31
대상: `/Volumes/ External Drive 256G/Dev2/codex/civic-facility-siting-room`
모드: full baseline audit
증거: 인앱 브라우저(localhost), DOM snapshot, screenshot, source inspection, 기존 Vitest/Playwright 계약

## 실행 경계

- 실제 학생 연구가 아니라 초등학교 5~6학년 페르소나를 사용한 관찰형 시뮬레이션입니다.
- `서윤`(10~12세, 첫 사용·자료 비교 중심)을 주 대상, `준호`(8~10세, 인접 학년 guardrail) 관점으로 읽었습니다.
- VoiceOver/TalkBack, TTS, 음성 입력·녹음은 검증하지 않았습니다.
- Playwright CLI는 사용자 npm 캐시의 root-owned 파일로 `EPERM`이 발생해 사용하지 않았고, 동일 로컬 URL의 Codex 인앱 브라우저로 대체했습니다.
- 콘솔 로그는 초기 intake와 전체 흐름에서 `error/warn` 0건이었습니다.

## 기준선 viewport와 흐름

| viewport | 상태·증거 | 결과 |
|---|---|---|
| 1280×720 기본 인앱 브라우저 | intake screenshot 및 DOM snapshot | 제목·현재 단계·미션 선택·기준 선택·CTA가 읽힘. 페이지 높이는 2007px이며 핵심 CTA는 첫 화면 아래에 있음 |
| 375×812 | intake reload screenshot, `clientWidth=360`, `scrollWidth=360` | 문서 가로 overflow 없음. 진행 단계 2열과 헤더가 세로로 정렬됨 |
| 320×800 | intake reload screenshot, `clientWidth=305`, `scrollWidth=305` | 문서 가로 overflow 없음. 긴 모형 안내와 6단계 카드가 세로로 읽힘 |
| 320×800 dialog | 업데이트 내역 click screenshot | 제목과 `업데이트 내역 닫기` 버튼이 겹침. close box `x=109.39,y=104.30,w=147.11,h=45.59`, heading box `x=18.5,y=98,w=238,h=38.39` |

학습자 시나리오는 다음 순서로 실제 조작했습니다.

```text
책마루 도서관 + 접근성 선택
→ 인구·도로 자료층 켜기
→ 지도에서 자료층 확인
→ 가운데 광장 터(C3) A안 배치·영향 계산
→ 평균·가장 긴 이동 카드 확인
→ 주민 관점표에서 햇살 북쪽 구역 선택·A안 저장
→ A안만 저장된 상태 확인
→ 후보를 느린 강변 터(B2)로 변경·재계산
→ 평균·가장 긴 이동 카드 확인
→ 느티나무 남쪽 구역 선택·B안 저장
→ A안 선택·평균/최대/비용 근거·세 문장 입력
→ 의견서 완료
```

## 이슈 장부

| issue-id | severity | screen/state | category | evidence | learner impact | recommendation | verification state | status |
|---|---|---|---|---|---|---|---|---|
| EDU-UX-001 | P1 | 주민 관점표, 제안 0개 | 오류 회복·인지 부하 | 기준선 `AlternativeComparison.tsx`의 `alert`; 최종 DOM에는 alert 0개와 `A안은 아직 저장하지 않았습니다` | 아직 첫 제안도 저장하지 않은 정상 상태를 데이터 손상으로 오해할 수 있고, B안 흐름을 시작하기 전에 불안이 생김 | 제안 0개를 `A안을 저장하면 ...` 일반 안내로 분기하고 malformed props만 alert 유지 | 최종 인앱 브라우저에서 텍스트·role 확인, 잘못된 props 단위 테스트 통과 | fixed; confirmed |
| EDU-UX-002 | P1 | 심의 의견서 완료, A안 선택 | 피드백 일관성·판정 표시 | 기준선 완료 DOM은 모든 조건 `충족`인데 `수정 필요`; 최종 DOM은 `타당안—절충 확인` | 자신의 근거가 맞는지 예측하기 어렵고, 공개 조건과 최종 요약이 서로 모순되어 학습 목표인 절충 설명을 약화 | 두 canonical 제안·조건 전체 통과·우선 기준 일치 시 `타당안—절충 확인`으로 표시하고, 실패 시 재검토 문장 | 최종 전체 흐름에서 verdict·조건·다음 행동 확인, opinion unit suite 통과 | fixed; confirmed |
| EDU-UX-003 | P1 | 업데이트 내역 dialog, 320px | 반응형·접근성 | 기준선 float/음수 margin screenshot; 최종 320px heading `y=98`, close `y=148.39`, 교차 `false`, overflow `0` | 제목과 닫기 버튼이 겹쳐 날짜 기록을 읽기 어렵고 닫기 조작 위치를 오해할 수 있음 | h2·close를 `.update-history-dialog-header`로 묶고 좁은 화면에서 세로 배치 | 최종 320px·375px bounding-box와 screenshot 확인, dialog unit 회귀 통과 | fixed; confirmed |
| EDU-UX-004 | P2 | 완료 요약 | 전이·학습 전이 | 기준선에는 인쇄/처음부터 다시 시작만 있었고, 최종 DOM에 `다음 학습 행동`과 친구 설명 문장 표시 | 활동이 끝난 뒤 무엇을 친구에게 설명하거나 다시 생각할지 명확하지 않음 | `다음 학습 행동` section과 한 문장 설명 prompt 추가 | 최종 completed DOM 텍스트 확인 및 opinion unit 회귀 통과 | fixed; confirmed |
| EDU-UX-005 | P2 | 글로벌 건너뛰기 링크 | 키보드·스크린 리더 의미 | 기준선 fragment 대상에 tabindex 없음; 최종 `#learning-stage`의 `tabindex=-1`, keyboard-only E2E 통과 | 첫 Tab 사용자가 fragment 이동 후 실제 학습 영역 포커스를 확인하기 어려움 | wrapper에 `tabIndex={-1}` 추가, 기존 단계 heading focus 유지 | 최종 DOM attribute 확인, App unit·keyboard E2E 통과 | fixed; confirmed |

## 긍정적인 기준선

- intake에서 실제 도시·실제 측정값이 아니라는 모형 한계를 제목 가까이에 노출합니다.
- 지도와 표를 모두 제공하고, 표만으로도 후보지·자료층을 확인할 수 있습니다.
- 평균·가장 긴 이동·도달 불가를 별도 카드로 두고, 평균과 최대 카드를 눌러야 다음 단계가 열립니다.
- 주민 관점표는 첫 열 sticky, 가로 스크롤 안내, 네이티브 radio를 사용합니다.
- 빈 의견서 제출 시 각 입력 오류가 `role="alert"`로 나타나며 10~300자 범위와 다음 행동을 설명합니다.
- `gi-pulse`와 `prefers-reduced-motion` 정적 외곽선 규칙이 이미 존재합니다.
- 실제 이름·학교·주소·지역을 입력하지 말라는 개인정보 고지와 주민 비난을 막는 사회적 안전 고지가 유지됩니다.

## 페르소나 관찰

### 서윤 (주 대상, 10~12세)

- 첫 glance: 제목과 `심의 접수`는 목적을 전달하지만 모형 한계·완료 조건·우선 기준 설명이 길어 첫 CTA가 화면 아래로 밀립니다.
- 첫 click: 미션 select와 접근성 radio를 순서대로 찾아 정상 진입했습니다.
- stuck/surprise: 주민 관점표에 들어오자 A안 전에도 `alert`가 보여 “내가 잘못했나?”라고 해석할 위험이 있습니다(EDU-UX-001).
- wrong choice/recovery: 빈 의견서 제출 후 alert가 각 필드 아래 나타나고 A/B·근거를 채워 회복할 수 있었습니다.
- completion: 완료 heading과 인쇄/처음부터 다시 시작은 보였지만 A안이 `수정 필요`라 조건 목록과 모순되고, 친구에게 설명할 다음 행동은 없었습니다(EDU-UX-002·004).

### 준호 (8~10세 guardrail)

- 긴 후보 radio accessible name과 5열 지도 설명을 한 번에 읽기 어렵습니다. 이 앱의 목표 학년은 5~6학년이므로 후보명을 줄이지 않고 표·지도 대체 경로를 유지하되, 정상 상태 오류와 dialog 겹침을 우선 고칩니다.

## 인지 부하와 Nielsen 요약

| 항목 | 기준선 판단 | 근거 |
|---|---|---|
| 방향과 위계 | 부분 통과 | 현재 단계 status와 다음 CTA는 있으나 intake가 길고 320px에서 안전 문구가 먼저 길게 보임 |
| 조작 | 통과 | 네이티브 select/radio/checkbox/button, 44px 이상, 드래그 대안 없음 |
| 피드백 | 부분 통과 | 분석 카드·빈 입력 feedback은 좋지만 A안 완료 verdict가 모순됨 |
| 회복 | 부분 통과 | 의견서·후보 수정은 회복 가능하나 제안 0개 alert가 정상 상태를 오류처럼 표시 |
| 읽기 | 부분 통과 | 문서 가로 overflow는 없고 표 내부만 스크롤되지만 dialog 헤더가 320px에서 겹침 |
| 키보드 | 통과+보완 | 기존 E2E Tab 순서와 stage heading focus는 통과. skip 대상의 명시적 tabindex를 추가할 필요 |
| 전이 | 부분 통과 | restart와 print는 있지만 완료 후 설명·적용 행동이 없음 |

## 우선순위와 합격 기준

- P0: 없음. 기준선에서 완주를 완전히 막는 블로커는 재현되지 않았습니다.
- P1: EDU-UX-001·002·003을 구현 후 0건으로 만들고 같은 시나리오에서 재현되지 않아야 합니다.
- P2: EDU-UX-004·005를 구현하고 단위·키보드·반응형 검증을 통과합니다.
- P3: 현재 pass로 유지되는 색·여백·문구는 새 장식 변경 없이 보존합니다.

## 자동화·브라우저 검증 상태

| 검증 | 기준선 상태 |
|---|---|
| Stage 0 preflight | `ready`, `work/elementary-webapp-ux-bootstrap.md`에 기록 |
| 인앱 브라우저 console error/warn | 0건 |
| 320/375 document horizontal overflow | 0px |
| Playwright CLI | 사용자 npm 캐시 root-owned 파일로 EPERM; 인앱 브라우저 fallback 사용 |
| VoiceOver/TTS | 범위 제외 |
| detector | 변경된 4개 TSX에 한 번 실행, JSON `[]` |

## 최종 브라우저 증거

- 1280×720에서 책마루 도서관·접근성 → 자료층 두 개 → C3 A안 → 평균/최대 이동 → 주민 관점표 → B2 B안 → 의견서 완료를 실제 클릭했습니다. 단계 전환 때 `stage-heading` 계열 포커스가 이동했고 console `error/warn`은 `[]`였습니다.
- A안 저장 전 비교 영역에는 `role="alert"`가 없고 `A안은 아직 저장하지 않았습니다. 먼저 표에서 불편한 구역을 고르고 A안을 저장해 보세요.`가 표시되었습니다.
- 완료 화면에는 `타당안—절충 확인`, `다음 학습 행동`, `친구에게 선택한 기준, 가장 불편한 구역, 보완 방법을 차례로 설명해 보세요.`가 함께 표시되며 `수정 필요`는 없습니다.
- 375px 초기 화면은 `clientWidth=360`, `scrollWidth=360`, overflow `0px`입니다. 320px 업데이트 dialog는 제목과 닫기 버튼 교차 `false`, 문서 overflow `0px`입니다.
- 관찰은 초등학교 5~6학년 페르소나 기반 시뮬레이션이며 실제 학생 연구나 보조공학 인증이 아닙니다. VoiceOver/TalkBack은 범위에서 제외했습니다.
