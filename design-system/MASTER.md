# Civic Facility Siting Room Design System

작성일: 2026-08-29, 2026-08-30 보강
대상: 초등 5~6학년 사회·수학 확장 활동
모드: light only

## 디자인 원칙

1. 학습자가 지금 할 일과 다음 할 일을 첫 시선에 찾습니다.
2. 평균·최대·도달 불가·위험·비용을 서로 다른 근거로 읽게 합니다.
3. 지도와 표, 화면 문장과 ARIA 이름은 같은 정보를 말합니다.
4. 장식보다 가상 모형의 한계, 주민 관점, 절충을 우선합니다.
5. 중요한 CTA 하나만 움직임으로 강조하고, 모션 감소 환경에서는 정적으로 표시합니다.

## 토큰

| 역할 | 토큰 | 값 | 사용 |
|---|---|---|---|
| 잉크 | `--color-ink` | `#18323f` | 본문·제목 |
| 보조 잉크 | `--color-muted` | `#4e6670` | 설명·보조 문장 |
| 종이 | `--color-paper` | `#f5fbf9` | body 배경 |
| 표면 | `--color-surface` | `#ffffff` | 카드·fieldset |
| 부드러운 표면 | `--color-surface-soft` | `#e8f4f1` | 헤더·표 머리글 |
| 경계 | `--color-border` | `#b7cec8` | 카드·표 선 |
| 강조 | `--color-accent` | `#0f6878` | 주요 CTA·선택 |
| 강조 배경 | `--color-accent-soft` | `#d8efee` | 선택·현재 단계 |
| 강한 강조 | `--color-accent-strong` | `#084d59` | hover·제목 강조 |
| 포커스 | `--color-focus` | `#a34f00` | focus-visible·학습 CTA |
| 성공 | `--color-success` | `#1d704c` | 통과·완료 |
| 위험 | `--color-risk` | `#853f00` | 위험 표지·경고 |

간격은 `--space-1` 0.25rem, `--space-2` 0.5rem, `--space-3` 0.75rem, `--space-4` 1rem, `--space-5` 1.25rem, `--space-6` 1.5rem, `--space-8` 2rem을 사용합니다. 기본 반경은 `--radius-sm: 0.625rem`, 카드 반경은 `--radius: 1rem`, 그림자는 `--shadow-soft` 하나를 우선 사용합니다.

## 타이포그래피

- 시스템 한글 sans-serif를 사용합니다.
- body 기본 line-height는 1.6, 제목은 1.2~1.35입니다.
- 본문 최소 1rem, 보조 문장 최소 0.9rem입니다.
- 200% 텍스트 확대에서 가로 고정 폭을 만들지 않습니다.

## 컴포넌트 규칙

### App header

`.app-header`는 제목·가상 모형 안내·업데이트 내역을 한 흐름에 둡니다. 업데이트 버튼은 fixed overlay가 아니라 일반 레이아웃 요소이며 44×44px 이상입니다.

첫 번째 키보드 포커스에는 `본문으로 건너뛰기` 링크를 제공하고 `#learning-stage`로 현재 학습 영역을 연결합니다. 링크는 평소 화면 밖에 두되 포커스 시 헤더를 가리지 않는 위치에 표시합니다.

### Progress stepper

데스크톱에서는 6열 grid, 모바일에서는 2열 grid입니다. `data-state="complete|current|next|upcoming"`로 상태를 표현하고 색만 사용하지 않습니다. 현재 단계는 `aria-current="step"`와 live status로 알립니다.

### Guided CTA

`GuidedActionButton`의 `gi-pulse`는 현재 필수 행동에만 붙입니다. `prefers-reduced-motion: reduce`에서는 animation을 `none`으로 하고 3px 정적 outline을 사용합니다.

### Data cards

평균·최대·도달 불가 같은 핵심 수치는 `.impact-evidence-card`로 먼저 보여 줍니다. 계산 근거·경로·조건 목록은 `details/summary`로 열 수 있지만 DOM 의미와 키보드 접근성은 유지합니다.

### Interactive states and callouts

버튼은 enabled 상태에서 배경·경계·그림자 전환과 눌림 이동을 제공하고 disabled 상태에서는 변하지 않습니다. 전환은 `touch-action: manipulation`과 함께 사용하며 reduced-motion에서는 끕니다. 안내 callout은 두꺼운 측면 탭 대신 1px 경계와 표면 색 또는 inset 상단 accent로 계층을 표시합니다.

### Mobile tables

표 wrapper는 `overflow-x: auto`이며 주민 표의 첫 열은 sticky로 유지합니다. `table` 의미를 제거하는 `display:block` 변환을 사용하지 않습니다. 표 위에는 “좌우로 밀어 더 보기” 안내를 연결합니다.

## 반응형 기준

- 320px: 콘텐츠 폭 최소화, 세로 단일 열, 표 내부만 가로 이동
- 375px: 2열 단계 카드, CTA 전체 폭 또는 자연 폭, 44px 터치 영역
- 768px: 카드 2열, 분석 패널 여유 폭
- 1280px: 6열 단계 요약, 분석 선택·결과 2열

## 포커스·모션·안전

`:focus-visible` 외곽선은 4px solid `--color-focus`와 3px offset입니다. 단계 전환 스크롤은 reduced-motion에서 즉시 이동합니다. 실제 도시·주민·재난을 묘사하는 이미지나 외부 데이터는 추가하지 않습니다. VoiceOver/TalkBack의 실행 결과는 이 시스템의 자동 합격 근거가 아닙니다.
