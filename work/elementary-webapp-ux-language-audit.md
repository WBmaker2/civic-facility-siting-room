# Elementary Web App UX Language Audit

작성일: 2026-08-31
대상 학년: 초등학교 5~6학년
방법: 정적 후보 수집(`elementary-webapp-ux-language-candidates.md`) 후 실제 렌더링 흐름의 문구를 수동 triage

정적 수집기는 92개 파일에서 2,499개 후보를 찾았습니다. 테스트 fixture·개발자 문구가 섞인 triage 결과이므로 자동 난이도 인증으로 사용하지 않았고, 실제 학습 경로의 제목·지시·상태·오류·완료 문구만 아래 장부에 올렸습니다.

## 문구 장부

| issue-id | screen/state | surface | source/evidence | static or dynamic | learner-facing | before | difficulty signals | after | learning intent preserved | curriculum terms and facts preserved | comprehension probe | visual link | verification state | status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| EDU-LANG-001 | 주민 관점표 진입, 제안 0개 | error/feedback | `AlternativeComparison.tsx`; 최종 browser DOM `role=alert` 0개 | dynamic | yes | `비교 자료를 표시할 수 없습니다. 현재 미션과 두 제안의 분석 자료를 다시 확인해 주세요.` | missing-recovery, abstract-or-formal, factual state mismatch | `A안은 아직 저장하지 않았습니다. 먼저 표에서 불편한 구역을 고르고 A안을 저장해 보세요.` | yes | yes; A/B 비교 조건은 그대로이고 저장 순서만 풀어 씀 | 재진술 probe: “아직 A안을 저장하지 않았으니 표에서 구역을 고른 뒤 A안을 저장한다”를 말할 수 있는지 확인 | EDU-UX-001 | fixed; confirmed in final flow |
| EDU-LANG-002 | 의견서 완료, A안 선택 | verdict/feedback | `OpinionSummary.tsx`; 최종 browser DOM | dynamic | yes | `수정 필요` (조건 목록은 모두 `충족`) | inconsistent-label, missing-explanation, emotional surprise | 조건·우선 기준·두 제안을 모두 살폈을 때 `타당안—절충 확인`; 그렇지 않으면 `수정 필요` 아래 `미충족 조건을 다시 보고 다른 후보의 장점을 보완해 보세요.` | yes | yes; 공개 조건과 priority 판정을 삭제하지 않음 | 결과 예측 probe: 조건이 모두 충족되면 어떤 문구가 나올지 말하고 완료 화면에서 확인 | EDU-UX-002 | fixed; confirmed in final flow |
| EDU-LANG-003 | 완료 요약 | next-learning-action | `OpinionSummary.tsx`; 최종 browser DOM | static addition | yes | 인쇄 또는 `처음부터 다시 시작`만 있음 | missing-recovery, missing-transfer | `다음 학습 행동` / `친구에게 선택한 기준, 가장 불편한 구역, 보완 방법을 차례로 설명해 보세요.` | yes | yes; 새 정답·실제 정책 판단을 추가하지 않음 | 전이 probe: 학습자가 설명할 세 가지를 순서대로 말할 수 있는지 확인 | EDU-UX-004 | fixed; confirmed in final flow |
| EDU-LANG-004 | 업데이트 dialog, 320px | dialog control | `UpdateHistoryButton.tsx`, `app.css`; 최종 screenshot | static structure | yes | 제목과 `업데이트 내역 닫기`가 겹침 | visual readability, ambiguous-reference | 제목과 닫기 버튼을 한 헤더로 분리하고, 같은 라벨을 유지 | yes | yes | recovery probe: 닫기 버튼 위치를 찾고 Escape 또는 button으로 닫을 수 있는지 확인 | EDU-UX-003 | fixed; confirmed at 320/375 |
| EDU-LANG-005 | intake/impact 공통 고지 | note | `learnerCopy.ts:1-12`; browser DOM | static | yes | `가상 격자 도시... 실제 교통량·토지 소유·법률·재난...` | long-or-dense, multiple-conditions | 이번 범위에서 문장을 줄이지 않고, 제목·결과 가까이에 반복해 모형 한계를 보존 | yes | human-review not needed; 안전·개인정보 사실을 보존해야 함 | 용어 probe: “가상 단위는 실제 시간인가?”에 “아니오, 활동 안에서 비교하는 숫자”라고 답하는지 확인 | none | confirmed, intentionally unchanged |

## 핵심 용어 일관성

- `가상 도시`, `가상 격자 모형`, `가상 단위`, `사람 토큰`, `공개 조건`, `절충`, `도달 불가`는 설계 문서의 사실을 보존해야 하므로 삭제하지 않습니다.
- 첫 등장에 이미 “실제 도시가 아닌 학습용 모형”, “숫자는 실제 측정값이 아님”, “가상 단위” 설명이 있습니다. 완료 요약에서는 같은 용어를 다른 말로 바꾸지 않습니다.
- `확인`, `저장`, `계산`, `작성`은 실제 상태 변화와 일치합니다. 제안 0개 상태의 `비교 자료를 표시할 수 없습니다`만 정상 진행에 맞는 동사로 바꿉니다.

## 학생 패널 관찰 규칙

이 장부의 probe는 실제 학생 연구나 읽기 수준 인증이 아닙니다. 같은 브라우저 상태에서 다음 질문과 행동을 기록합니다.

1. 지시 재진술: 현재 화면에서 하나의 다음 행동을 말할 수 있는가?
2. 결과 예측: A/B 두 제안을 저장하면 비교 영역에 무엇이 나타날지 예측하는가?
3. 용어 설명: 평균, 가장 긴 이동, 가상 단위, 사람 토큰 중 하나를 자기 말로 설명하는가?
4. 회복 행동: 정상 중간 안내·빈 입력 alert·dialog 닫기 뒤 다음 조작을 선택하는가?

## 최종 probe 결과

- 제안 0개 상태에서 다음 행동 문장을 읽고 `표에서 불편한 구역 선택 → A안 저장` 순서를 DOM으로 확인했습니다.
- A/B를 모두 저장하고 조건을 충족한 완료 흐름에서 `타당안—절충 확인`과 세 가지 설명 요소를 찾았습니다. 이는 브라우저 관찰 결과이지 실제 학생 패널의 응답률이 아닙니다.
- 업데이트 dialog는 320px·375px에서 닫기 버튼이 제목 아래에 놓이고 문서 overflow가 0px였습니다.
- `EDU-LANG-005`의 가상 도시·개인정보·사회적 안전 고지는 사실 보존을 위해 의도적으로 변경하지 않았습니다.
