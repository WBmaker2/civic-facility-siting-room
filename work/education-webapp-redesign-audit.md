# Civic Facility Siting Room Initial Redesign Audit

검토일: 2026-08-29 (KST)
대상 URL: `http://127.0.0.1:5173/` (현재 작업 트리 Vite dev server)
실제 공개 경로 참고: `https://wbmaker2.github.io/civic-facility-siting-room/`
브라우저: Playwright Chromium, 1280×812 및 375×812
검수 역할 상태: `impeccable` unavailable/not run; 현재 에이전트가 동일 체크리스트로 관찰함

## 조사 범위

시작 화면부터 `심의 접수 → 도시 자료실 → 후보 배치판 → 영향 분석실 → 주민 관점표 → 심의 의견서`까지 책마루 도서관 미션을 실제 브라우저에서 진행했습니다. 인구·도로 자료층 선택, 후보 B2/C3 배치, 평균·최대 카드 확인, 주민 구역 선택, A/B 저장, 의견서 진입까지 확인했습니다.

## 영향도별 발견

### P1 — 단계가 바뀌어도 새 화면의 제목이 화면에 나타나지 않음

- 근거: 375×812에서 `도시 자료실로 이동`, `영향 계산`, `주민 관점표로 이동`, `의견서 작성`을 누른 뒤 snapshot의 해당 stage `h2`가 각각 약 -977px, -2856px, -185px, -1856px에 놓였습니다. 사용자는 새 단계로 이동했지만 제목과 안내를 다시 찾기 위해 위로 스크롤해야 합니다.
- 학습 위험: 현재 무엇을 하고 있는지와 다음 행동이 끊기며, 특히 긴 결과 화면에서 학습자가 버튼을 눌렀는지 알기 어렵습니다.
- 수정: `StageFocusRegion`이 단계 변경 시 첫 `h2`를 포커스하고 상단으로 스크롤합니다. 포커스 대상은 키보드 순서를 방해하지 않는 `tabIndex=-1`입니다.

### P1 — 데스크톱 `업데이트 내역` 버튼이 학습 콘텐츠 위에 고정됨

- 근거: 1280×812 snapshot에서 버튼 box가 `y=727`에 고정되어 미션 선택 영역과 겹쳤습니다. 모바일에서는 static으로 내려가지만, 데스크톱에서는 선택 카드와 같은 viewport 위치에 떠 있습니다.
- 학습 위험: 미션·자료·결과를 가리거나 클릭 대상을 혼동시킵니다.
- 수정: 제목 옆 헤더의 일반 흐름에 버튼을 배치하고 44px 터치 영역과 dialog focus 복귀는 유지합니다.

### P1 — 모바일 긴 표와 A/B 비교가 다음 학습 행동을 밀어냄

- 근거: 375px 주민 관점표가 실제 table width 1088px로 렌더되어 표 안 가로 스크롤이 필요합니다. A/B 비교는 약 2405px, 영향 분석 결과는 약 3592px 높이로 이어져 CTA가 화면 아래로 멀어집니다.
- 학습 위험: 어린이가 가장 불편한 구역과 다음 버튼을 동시에 찾기 어렵습니다.
- 수정: 주민 표 첫 열 sticky·가로 이동 안내, A/B 공개 조건 details, 결과의 핵심 카드 우선·상세 근거 점진 공개를 적용합니다. 테이블·계산 내용은 삭제하지 않습니다.

### P2 — 시작 화면의 정보가 평평하여 첫 행동이 약함

- 근거: 진행 단계가 모든 viewport에서 세로 6개 항목(약 411px)을 차지하고, 선택 미션·우선 기준·완료 조건이 같은 시각 무게로 이어집니다.
- 학습 위험: “미션 선택 → 기준 선택 → 자료실 이동” 순서가 긴 설명 사이에서 묻힙니다.
- 수정: 데스크톱 6열·모바일 2열 단계 카드, 선택 미션 카드, 우선 기준 카드, 짧은 완료 체크리스트를 토큰으로 구분합니다.

### P2 — 반복 안내가 결과 화면의 핵심 수치를 희석함

- 근거: `MODEL_LIMIT_NOTICE`가 앱 상단·분석 상단·분석 하단·주민 관점표 상단에 반복되고, 결과 카드 아래에 동일 수치가 문장으로 다시 나옵니다.
- 학습 위험: 평균·최대·도달 불가라는 핵심 증거가 긴 모델 설명과 반복 문장 사이에 묻힙니다.
- 수정: 모델 한계 문구의 의미는 유지하되 토큰 기반 note 표면으로 통일하고, 상세 경로·조건은 `details`로 접습니다.

### P2 — 초기 브라우저 콘솔에 favicon 404가 있음

- 근거: `http://127.0.0.1:5173/favicon.ico` 요청이 404로 기록되었습니다.
- 영향: 학습 흐름을 막지는 않지만 최종 콘솔 0개 목표와 충돌합니다.
- 이번 처리: 사실 확인 없이 아이콘을 자동 생성하지 않고 pending 관찰로 기록합니다. 별도 자산 승인 없이는 새 favicon을 만들지 않습니다.

## 잘 작동하는 부분과 보존 항목

- 네이티브 select/radio/checkbox와 44px 입력 영역이 있어 키보드·터치 기반 조작의 기본 계약이 있습니다.
- 지도와 표가 같은 후보·좌표·자료층을 전달하고, 후보지 비용이 꺼지면 비용 숫자를 숨깁니다.
- 평균·최대 결과 카드 확인 전 `주민 관점표로 이동`을 막아 평균만 보고 지나가지 않게 합니다.
- A안만 저장한 상태를 오류로 처리하지 않고 B안 작성 안내를 보여 줍니다.
- 가상 도시·상대 단위·개인정보·사회적 안전 문구가 실제 정책 판단으로 오해되지 않게 합니다.
- `gi-pulse`와 `prefers-reduced-motion` 대체 외곽선이 이미 있어 CTA 강조 규칙을 확장하되 남용하지 않습니다.

## 초기 수용 기준

1. 단계 전환 직후 해당 단계 `h2`가 포커스되고 viewport에 보입니다.
2. 헤더 업데이트 버튼이 모든 화면에서 콘텐츠와 겹치지 않습니다.
3. 375px에서 document 가로 overflow가 없고 주민 표 내부 가로 이동만 있습니다.
4. 평균·최대 카드, A/B 변화, 의견서 CTA는 상세 조건을 열지 않아도 처음부터 찾을 수 있습니다.
5. 기존 도메인 판정·개인정보·라이트 모드·VoiceOver 제외 범위를 유지합니다.

## 구현 후 재검토

검토일: 2026-08-29 (KST)
브라우저: Playwright Chromium, 1280×812·768×812·375×812·320×800
실행 경로: `http://127.0.0.1:5173/`

### 해결 확인

- 단계 전환 후 새 영역의 `h2`가 `tabindex=-1`로 포커스되고 viewport 상단에 놓였습니다. 375px 자료실 전환 snapshot에서 `도시 자료실` 제목 box가 `y=17`에 있었습니다.
- `업데이트 내역`은 헤더의 일반 흐름에 있으며 fixed overlay가 아닙니다. 초기 1280px snapshot에서 헤더 안 `y=45`에 있고 미션 카드와 겹치지 않았습니다.
- 진행 단계는 1280px에서 6열, 375px에서 2열로 표시되어 기존 세로 6단계보다 첫 행동을 빨리 찾습니다.
- 미션 공개 조건과 A/B 공개 조건 결과는 네이티브 `details/summary`로 접고, 핵심 안내·결과 카드는 먼저 보여 줍니다.
- 주민 관점표는 `aria-describedby="perspective-table-help"`와 `data-sticky-column="true"`를 제공하고, 첫 구역 열을 sticky로 유지합니다.
- 320px·375px·768px에서 `document.documentElement.scrollWidth === clientWidth`를 확인했습니다. 표·지도 내부의 가로 이동만 남습니다.
- 200% 텍스트 확대 proxy에서 문서 가로 폭은 viewport와 같고, 지도 내부 scroll width만 viewport보다 큽니다.
- 현재 브라우저 콘솔에서 error 0을 확인했습니다. 초기 감사에서 관찰한 favicon 404는 새 자산을 임의 생성하지 않고 pending 관찰로 보존합니다.

### 보존·미실행 항목

- `SessionState`, 결정적 입지 판정, 가상 도시·상대 단위·개인정보·사회적 안전 문구는 변경하지 않았습니다.
- VoiceOver/TalkBack 실행과 인간 보조공학 승인은 요청 범위에서 제외했습니다.
- `impeccable`, `ui-ux-pro-max`, `redesign-existing-projects` 지원 역할은 현재 세션에 없어 unavailable/not run으로 기록했습니다.
- 저장소에 이미지 자산이 없어 `imagegen`은 호출하지 않았습니다. 지도·표는 데이터 시각화의 정확성을 위해 DOM·텍스트·무늬·ARIA를 유지했습니다.

## 2026-08-30 재실행 사전 감사

이번 재실행은 기존 리디자인 작업 트리의 품질을 다시 점검하는 범위입니다. 제품 사실과 학습 흐름은 `PRODUCT.md`, `2026-08-26-civic-facility-siting-room-design.md`, `work/education-webapp-redesign-plan.md`를 기준으로 유지했습니다.

### Skill·규칙 확인

| 역할 | 상태 | 근거 |
|---|---|---|
| `impeccable` | available/read | `/Users/kimhongnyeon/.codex/skills/impeccable/SKILL.md` |
| `ui-ux-pro-max` | available/read | `/Users/kimhongnyeon/.codex/skills/ui-ux-pro-max/SKILL.md` 및 `search.py` 검색 실행 |
| `redesign-existing-projects` | available/read | `/Users/kimhongnyeon/.codex/skills/redesign-existing-projects/SKILL.md` |
| `imagegen` | available/read, 생성 not run | 이미지 import·`url()`·`srcset` 사용처 없음 |
| 프로젝트 `AGENTS.md` | 없음 | 저장소·상위 `/Volumes/ External Drive 256G/Dev2` 검색 결과 없음 |
| `EDUCATION_DESIGN.md` | 없음 | 저장소·상위 `/Volumes/ External Drive 256G/Dev2` 검색 결과 없음 |

### 새로 확인한 개선점

- `node /Users/kimhongnyeon/.codex/skills/impeccable/scripts/detect.mjs --json ...`에서 `src/styles/global.css`의 `.selected-mission-summary`와 `.comparison-sentence-prompt`에 `border-left: 4px` side-tab 경고가 각각 보고되었습니다. 강조 의미는 유지하되 상단 accent로 바꾸는 P1 품질 수정으로 분류했습니다.
- 버튼에 hover·pressed 피드백이 없어 포인터 사용자가 상태 변화를 확인하기 어렵고, 첫 키보드 이동을 위한 skip link가 없습니다. 기능·콘텐츠를 바꾸지 않는 P1 상호작용 보강으로 분류했습니다.
- `ui-ux-pro-max`의 React 검색 결과가 Testing Library의 역할 기반 쿼리와 44px 터치 영역·visible focus·reduced-motion을 요구합니다. 현재 테스트·토큰 계약과 일치하므로 새 런타임 의존성은 추가하지 않습니다.

### 보존 판정

- `design-system/MASTER.md`의 teal light-only 토큰은 가상 도시 자료를 읽는 교실 맥락과 기존 기능 계약에 맞아 유지합니다. 검색 CLI가 제안한 일반 blue/green 팔레트는 프로젝트의 명시적 light-only·기존 토큰 규칙을 대체하지 않습니다.
- 실제 지도·주민·기관을 묘사하는 이미지가 없어 `imagegen`으로 생성하거나 DOM 지도·표를 래스터 이미지로 바꾸지 않습니다.
- `favicon.ico` 404 관찰, VoiceOver/TalkBack 실행 제외, `.playwright-mcp/` 등 기존 작업 트리 변경은 이번 품질 수정의 범위 밖으로 보존합니다.
