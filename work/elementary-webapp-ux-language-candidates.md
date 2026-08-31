# Learner Text Inventory

- Root: `/Volumes/ External Drive 256G/Dev2/codex/civic-facility-siting-room`
- Files scanned: `92`
- Candidates: `2499`
- Status: `triage only`; not a grade-level certification or automatic rewrite.

## Candidate strings

| Source | Surface | Text | Role hints | Review signals |
| --- | --- | --- | --- | --- |
| index.html:6:39 | text | 가상 격자 도시에서 공공시설 후보지를 비교하는 학습 공간 | learner-text-candidate | — |
| index.html:7:12 | text | 도시 기능 입지 심의실 | learner-text-candidate | repeated-text |
| scripts/check-source-lines.mjs:47:50 | text | ${file.path}: ${file.lines} lines (limit: 499) | feedback-or-error | — |
| src/accessibility/motion.test.tsx:14:16 | text | { cleanup(); vi.restoreAllMocks(); Reflect.deleteProperty(window, 'matchMedia'); }); function MotionProbe() { return | learner-text-candidate | long-or-dense |
| src/accessibility/motion.test.tsx:17:30 | aria-label | 감소 모션 상태 | aria-label | repeated-text |
| src/accessibility/motion.test.tsx:17:40 | text | {String(useReducedMotion())} | learner-text-candidate | — |
| src/accessibility/motion.test.tsx:17:77 | text | ; } function mediaMock(matches: boolean) { const listeners = new Set | learner-text-candidate | long-or-dense |
| src/accessibility/motion.test.tsx:37:7 | text | renders a labeled virtual service range in reduced motion mode | learner-text-candidate | long-or-dense |
| src/accessibility/motion.test.tsx:37:77 | text | { render( | learner-text-candidate | repeated-text |
| src/accessibility/motion.test.tsx:38:68 | text | B2 | learner-text-candidate | repeated-text |
| src/accessibility/motion.test.tsx:40:30 | text | 서비스 기준: 3 상대 이동 단위 | learner-text-candidate | repeated-text |
| src/accessibility/motion.test.tsx:41:69 | text | facility-range--spread | learner-text-candidate | — |
| src/accessibility/motion.test.tsx:44:99 | text | { const { rerender } = render( | learner-text-candidate | repeated-text |
| src/accessibility/motion.test.tsx:45:89 | text | B2 | learner-text-candidate | repeated-text |
| src/accessibility/motion.test.tsx:45:136 | text | ); const normalRange = screen.getByLabelText(/B2.*가상 서비스 범위/); expect(normalRange).toHaveClass('facility-range--spread'); expect(normalRange).toHaveTextContent('가상 서비스 범위'); expect(normalRange).toHaveTextContent('중심 좌표: B2'); expect(normalRange).toHaveTextContent('서비스 기준: 3 상대 이동 단위'); expect(normalRange).toHaveTextContent('실제 거리·시간이 아닌 상대 이동 단위'); rerender( | learner-text-candidate | long-or-dense |
| src/accessibility/motion.test.tsx:48:44 | text | 가상 서비스 범위 | learner-text-candidate | repeated-text |
| src/accessibility/motion.test.tsx:49:44 | text | 중심 좌표: B2 | learner-text-candidate | — |
| src/accessibility/motion.test.tsx:50:44 | text | 서비스 기준: 3 상대 이동 단위 | learner-text-candidate | repeated-text |
| src/accessibility/motion.test.tsx:51:44 | text | 실제 거리·시간이 아닌 상대 이동 단위 | learner-text-candidate | — |
| src/accessibility/motion.test.tsx:52:70 | text | B2 | learner-text-candidate | repeated-text |
| src/accessibility/motion.test.tsx:52:126 | text | ); expect(screen.getByRole('alert')).toHaveTextContent(/범위 자료를 표시할 수 없습니다/); const coordinate = { row: 1, column: 2, label: '' }; rerender( | learner-text-candidate | long-or-dense |
| src/accessibility/motion.test.tsx:62:35 | text | 감소 모션 상태 | learner-text-candidate | repeated-text |
| src/accessibility/motion.test.tsx:62:66 | text | false | learner-text-candidate | repeated-text |
| src/accessibility/motion.test.tsx:64:55 | text | 감소 모션 상태 | learner-text-candidate | repeated-text |
| src/accessibility/motion.test.tsx:64:86 | text | true | learner-text-candidate | repeated-text |
| src/accessibility/motion.test.tsx:75:35 | text | 감소 모션 상태 | learner-text-candidate | repeated-text |
| src/accessibility/motion.test.tsx:75:66 | text | false | learner-text-candidate | repeated-text |
| src/accessibility/motion.test.tsx:117:35 | text | 감소 모션 상태 | learner-text-candidate | repeated-text |
| src/accessibility/motion.test.tsx:117:66 | text | false | learner-text-candidate | repeated-text |
| src/accessibility/motion.test.tsx:121:36 | text | matchMedia | feedback-or-error | — |
| src/accessibility/motion.test.tsx:121:83 | text | { throw new Error('unavailable'); } }); render( | feedback-or-error | — |
| src/accessibility/motion.test.tsx:121:103 | text | unavailable | feedback-or-error | — |
| src/accessibility/motion.test.tsx:122:27 | text | ); expect(screen.getByLabelText('감소 모션 상태')).toHaveTextContent('false'); cleanup(); const query = mediaMock(false); render( | learner-text-candidate | long-or-dense |
| src/accessibility/motion.test.tsx:123:35 | text | 감소 모션 상태 | learner-text-candidate | repeated-text |
| src/accessibility/motion.test.tsx:123:66 | text | false | learner-text-candidate | repeated-text |
| src/accessibility/motion.test.tsx:138:35 | text | 감소 모션 상태 | learner-text-candidate | repeated-text |
| src/accessibility/motion.test.tsx:138:66 | text | true | learner-text-candidate | repeated-text |
| src/accessibility/motion.test.tsx:148:67 | text | review-layers | learner-text-candidate | repeated-text |
| src/accessibility/motion.test.tsx:148:147 | text | 자료층 확인 | learner-text-candidate | repeated-text |
| src/accessibility/motion.test.tsx:149:70 | text | review-layers | learner-text-candidate | repeated-text |
| src/accessibility/motion.test.tsx:149:120 | text | 영향 계산 | learner-text-candidate | repeated-text |
| src/accessibility/motion.test.tsx:150:67 | text | write-opinion | learner-text-candidate | repeated-text |
| src/accessibility/motion.test.tsx:150:109 | text | 의견서 작성 | learner-text-candidate | repeated-text |
| src/accessibility/motion.test.tsx:153:30 | text | button | button-or-action | repeated-text |
| src/accessibility/motion.test.tsx:153:48 | text | 자료층 확인 | button-or-action | repeated-text |
| src/accessibility/motion.test.tsx:153:77 | text | data-guided | button-or-action | missing-term-explanation, repeated-text, technical-or-internal |
| src/accessibility/motion.test.tsx:153:92 | text | true | button-or-action | repeated-text |
| src/accessibility/motion.test.tsx:154:30 | text | button | button-or-action | repeated-text |
| src/accessibility/motion.test.tsx:154:48 | text | 자료층 확인 | button-or-action | repeated-text |
| src/accessibility/motion.test.tsx:154:79 | text | 다음 필수 활동 | button-or-action | repeated-text |
| src/accessibility/motion.test.tsx:155:30 | text | button | button-or-action | repeated-text |
| src/accessibility/motion.test.tsx:155:48 | text | 자료층 확인 | button-or-action | repeated-text |
| src/accessibility/motion.test.tsx:155:73 | text | existing | button-or-action | — |
| src/accessibility/motion.test.tsx:155:85 | text | class | button-or-action | — |
| src/accessibility/motion.test.tsx:155:94 | text | gi-pulse | button-or-action | repeated-text |
| src/accessibility/motion.test.tsx:156:30 | text | button | button-or-action | repeated-text |
| src/accessibility/motion.test.tsx:156:48 | text | 의견서 작성 | button-or-action | repeated-text |
| src/accessibility/motion.test.tsx:156:77 | text | data-guided | button-or-action | missing-term-explanation, repeated-text, technical-or-internal |
| src/accessibility/motion.test.tsx:156:92 | text | true | button-or-action | repeated-text |
| src/accessibility/motion.test.tsx:157:30 | text | button | button-or-action | repeated-text |
| src/accessibility/motion.test.tsx:157:48 | text | 의견서 작성 | button-or-action | repeated-text |
| src/accessibility/motion.test.tsx:157:79 | text | 다음 필수 활동 | button-or-action | repeated-text |
| src/accessibility/motion.test.tsx:158:30 | text | button | button-or-action | repeated-text |
| src/accessibility/motion.test.tsx:158:48 | text | 의견서 작성 | button-or-action | repeated-text |
| src/accessibility/motion.test.tsx:158:77 | text | gi-pulse | button-or-action | repeated-text |
| src/accessibility/motion.test.tsx:159:30 | text | button | button-or-action | repeated-text |
| src/accessibility/motion.test.tsx:159:48 | text | 영향 계산 | button-or-action | repeated-text |
| src/accessibility/motion.test.tsx:166:67 | text | review-layers | learner-text-candidate | repeated-text |
| src/accessibility/motion.test.tsx:166:117 | text | 자료층 확인 | learner-text-candidate | repeated-text |
| src/accessibility/motion.test.tsx:167:70 | text | review-layers | learner-text-candidate | repeated-text |
| src/accessibility/motion.test.tsx:167:120 | text | 영향 계산 | learner-text-candidate | repeated-text |
| src/accessibility/motion.test.tsx:168:67 | text | write-opinion | learner-text-candidate | repeated-text |
| src/accessibility/motion.test.tsx:168:109 | text | 의견서 작성 | learner-text-candidate | repeated-text |
| src/accessibility/motion.test.tsx:170:40 | text | button | button-or-action | repeated-text |
| src/accessibility/motion.test.tsx:170:58 | text | 자료층 확인 | button-or-action | repeated-text |
| src/accessibility/motion.test.tsx:171:40 | text | button | button-or-action | repeated-text |
| src/accessibility/motion.test.tsx:171:58 | text | 영향 계산 | button-or-action | repeated-text |
| src/accessibility/motion.test.tsx:172:40 | text | button | button-or-action | repeated-text |
| src/accessibility/motion.test.tsx:172:58 | text | 의견서 작성 | button-or-action | repeated-text |
| src/accessibility/motion.test.tsx:187:33 | text | 서비스 기준: ${mission.serviceThreshold} 상대 이동 단위 | learner-text-candidate | — |
| src/app/App.flow.test.tsx:12:68 | text | 미션 선택 | learner-text-candidate | repeated-text |
| src/app/App.flow.test.tsx:13:57 | text | 접근성 | learner-text-candidate | repeated-text |
| src/app/App.flow.test.tsx:14:40 | text | button | button-or-action | repeated-text |
| src/app/App.flow.test.tsx:14:58 | text | 도시 자료실로 이동 | button-or-action | repeated-text |
| src/app/App.flow.test.tsx:15:48 | text | 도시 자료실 | learner-text-candidate | repeated-text |
| src/app/App.flow.test.tsx:16:60 | text | 인구 | learner-text-candidate | repeated-text |
| src/app/App.flow.test.tsx:17:60 | text | 도로·이동 단위 | learner-text-candidate | repeated-text |
| src/app/App.flow.test.tsx:18:40 | text | button | button-or-action | repeated-text |
| src/app/App.flow.test.tsx:18:58 | text | 자료층 확인 | button-or-action | repeated-text |
| src/app/App.flow.test.tsx:19:48 | text | 후보 배치판 | learner-text-candidate | repeated-text |
| src/app/App.flow.test.tsx:20:45 | text | button | button-or-action | repeated-text |
| src/app/App.flow.test.tsx:20:63 | text | 영향 계산 | button-or-action | repeated-text |
| src/app/App.flow.test.tsx:23:40 | text | button | button-or-action | repeated-text |
| src/app/App.flow.test.tsx:24:30 | text | button | button-or-action | repeated-text |
| src/app/App.flow.test.tsx:24:48 | text | 영향 계산 | button-or-action | repeated-text |
| src/app/App.flow.test.tsx:26:40 | text | button | button-or-action | repeated-text |
| src/app/App.flow.test.tsx:26:58 | text | 영향 계산 | button-or-action | repeated-text |
| src/app/App.flow.test.tsx:27:48 | text | 영향 분석실 | learner-text-candidate | abstract-or-formal, repeated-text |
| src/app/App.flow.test.tsx:28:30 | text | button | button-or-action | repeated-text |
| src/app/App.flow.test.tsx:28:48 | text | 영향 계산 | button-or-action | repeated-text |
| src/app/App.flow.test.tsx:36:68 | text | 미션 선택 | learner-text-candidate | repeated-text |
| src/app/App.flow.test.tsx:37:57 | text | 접근성 | learner-text-candidate | repeated-text |
| src/app/App.flow.test.tsx:38:40 | text | button | button-or-action | repeated-text |
| src/app/App.flow.test.tsx:38:58 | text | 도시 자료실로 이동 | button-or-action | repeated-text |
| src/app/App.flow.test.tsx:39:60 | text | 인구 | learner-text-candidate | repeated-text |
| src/app/App.flow.test.tsx:40:60 | text | 도로·이동 단위 | learner-text-candidate | repeated-text |
| src/app/App.flow.test.tsx:41:40 | text | button | button-or-action | repeated-text |
| src/app/App.flow.test.tsx:41:58 | text | 자료층 확인 | button-or-action | repeated-text |
| src/app/App.flow.test.tsx:43:40 | text | button | button-or-action | repeated-text |
| src/app/App.flow.test.tsx:44:40 | text | button | button-or-action | repeated-text |
| src/app/App.flow.test.tsx:44:58 | text | 영향 계산 | button-or-action | repeated-text |
| src/app/App.flow.test.tsx:45:40 | text | button | button-or-action | repeated-text |
| src/app/App.flow.test.tsx:45:58 | text | 영향 계산 | button-or-action | repeated-text |
| src/app/App.flow.test.tsx:46:40 | text | button | button-or-action | repeated-text |
| src/app/App.flow.test.tsx:47:40 | text | button | button-or-action | repeated-text |
| src/app/App.flow.test.tsx:48:40 | text | button | button-or-action | repeated-text |
| src/app/App.flow.test.tsx:48:58 | text | 주민 관점표로 이동 | button-or-action | repeated-text |
| src/app/App.flow.test.tsx:50:40 | text | button | button-or-action | repeated-text |
| src/app/App.flow.test.tsx:50:58 | text | A안 저장 | button-or-action | repeated-text |
| src/app/App.flow.test.tsx:51:30 | text | button | button-or-action | repeated-text |
| src/app/App.flow.test.tsx:51:48 | text | 후보 수정하여 B안 만들기 | button-or-action | repeated-text |
| src/app/App.flow.test.tsx:52:40 | text | button | button-or-action | repeated-text |
| src/app/App.flow.test.tsx:52:58 | text | 후보 수정하여 B안 만들기 | button-or-action | repeated-text |
| src/app/App.flow.test.tsx:54:40 | text | button | button-or-action | repeated-text |
| src/app/App.flow.test.tsx:55:40 | text | button | button-or-action | repeated-text |
| src/app/App.flow.test.tsx:55:58 | text | 영향 계산 | button-or-action | repeated-text |
| src/app/App.flow.test.tsx:56:40 | text | button | button-or-action | repeated-text |
| src/app/App.flow.test.tsx:56:58 | text | 영향 계산 | button-or-action | repeated-text |
| src/app/App.flow.test.tsx:57:40 | text | button | button-or-action | repeated-text |
| src/app/App.flow.test.tsx:58:40 | text | button | button-or-action | repeated-text |
| src/app/App.flow.test.tsx:59:40 | text | button | button-or-action | repeated-text |
| src/app/App.flow.test.tsx:59:58 | text | 주민 관점표로 이동 | button-or-action | repeated-text |
| src/app/App.flow.test.tsx:61:40 | text | button | button-or-action | repeated-text |
| src/app/App.flow.test.tsx:61:58 | text | B안 저장 | button-or-action | repeated-text |
| src/app/App.flow.test.tsx:62:30 | text | heading | heading | repeated-text |
| src/app/App.flow.test.tsx:62:49 | text | A안과 B안 비교 | heading | repeated-text |
| src/app/App.flow.test.tsx:63:32 | text | button | button-or-action | repeated-text |
| src/app/App.flow.test.tsx:63:50 | text | A안 저장 | button-or-action | repeated-text |
| src/app/App.flow.test.tsx:64:32 | text | button | button-or-action | repeated-text |
| src/app/App.flow.test.tsx:64:50 | text | B안 저장 | button-or-action | repeated-text |
| src/app/App.flow.test.tsx:65:32 | text | button | button-or-action | repeated-text |
| src/app/App.flow.test.tsx:65:50 | text | 후보 수정하여 B안 만들기 | button-or-action | repeated-text |
| src/app/App.flow.test.tsx:66:30 | text | 도서관: 느린 강변 터 (B2) | learner-text-candidate | repeated-text |
| src/app/App.flow.test.tsx:67:30 | text | 2.7 이동 단위 | learner-text-candidate | repeated-text |
| src/app/App.flow.test.tsx:68:30 | text | 예산 토큰 3개 안에 놓기: 충족 — 배치 비용 1토큰 / 공개 한도 3토큰입니다. | learner-text-candidate | repeated-text |
| src/app/App.flow.test.tsx:69:30 | text | A안은 ___을 지키지만 ___이 불리하고, B안은 ___을 바꿉니다. | learner-text-candidate | repeated-text |
| src/app/App.flow.test.tsx:76:68 | text | 미션 선택 | learner-text-candidate | repeated-text |
| src/app/App.flow.test.tsx:77:57 | text | 접근성 | learner-text-candidate | repeated-text |
| src/app/App.flow.test.tsx:78:40 | text | button | button-or-action | repeated-text |
| src/app/App.flow.test.tsx:78:58 | text | 도시 자료실로 이동 | button-or-action | repeated-text |
| src/app/App.flow.test.tsx:79:60 | text | 인구 | learner-text-candidate | repeated-text |
| src/app/App.flow.test.tsx:80:60 | text | 도로·이동 단위 | learner-text-candidate | repeated-text |
| src/app/App.flow.test.tsx:81:40 | text | button | button-or-action | repeated-text |
| src/app/App.flow.test.tsx:81:58 | text | 자료층 확인 | button-or-action | repeated-text |
| src/app/App.flow.test.tsx:83:40 | text | button | button-or-action | repeated-text |
| src/app/App.flow.test.tsx:84:40 | text | button | button-or-action | repeated-text |
| src/app/App.flow.test.tsx:84:58 | text | 영향 계산 | button-or-action | repeated-text |
| src/app/App.flow.test.tsx:85:40 | text | button | button-or-action | repeated-text |
| src/app/App.flow.test.tsx:85:58 | text | 영향 계산 | button-or-action | repeated-text |
| src/app/App.flow.test.tsx:86:40 | text | button | button-or-action | repeated-text |
| src/app/App.flow.test.tsx:87:40 | text | button | button-or-action | repeated-text |
| src/app/App.flow.test.tsx:88:40 | text | button | button-or-action | repeated-text |
| src/app/App.flow.test.tsx:88:58 | text | 주민 관점표로 이동 | button-or-action | repeated-text |
| src/app/App.flow.test.tsx:90:40 | text | button | button-or-action | repeated-text |
| src/app/App.flow.test.tsx:90:58 | text | A안 저장 | button-or-action | repeated-text |
| src/app/App.flow.test.tsx:91:40 | text | button | button-or-action | repeated-text |
| src/app/App.flow.test.tsx:91:58 | text | 후보 수정하여 B안 만들기 | button-or-action | repeated-text |
| src/app/App.flow.test.tsx:93:40 | text | button | button-or-action | repeated-text |
| src/app/App.flow.test.tsx:94:40 | text | button | button-or-action | repeated-text |
| src/app/App.flow.test.tsx:94:58 | text | 영향 계산 | button-or-action | repeated-text |
| src/app/App.flow.test.tsx:95:40 | text | button | button-or-action | repeated-text |
| src/app/App.flow.test.tsx:95:58 | text | 영향 계산 | button-or-action | repeated-text |
| src/app/App.flow.test.tsx:96:40 | text | button | button-or-action | repeated-text |
| src/app/App.flow.test.tsx:97:40 | text | button | button-or-action | repeated-text |
| src/app/App.flow.test.tsx:98:40 | text | button | button-or-action | repeated-text |
| src/app/App.flow.test.tsx:98:58 | text | 주민 관점표로 이동 | button-or-action | repeated-text |
| src/app/App.flow.test.tsx:100:40 | text | button | button-or-action | repeated-text |
| src/app/App.flow.test.tsx:100:58 | text | B안 저장 | button-or-action | repeated-text |
| src/app/App.flow.test.tsx:101:40 | text | button | button-or-action | repeated-text |
| src/app/App.flow.test.tsx:101:58 | text | 의견서 작성 | button-or-action | repeated-text |
| src/app/App.flow.test.tsx:102:32 | text | heading | heading | repeated-text |
| src/app/App.flow.test.tsx:102:51 | text | 완성한 입지 심의 의견서 | heading | repeated-text |
| src/app/App.flow.test.tsx:103:30 | text | button | button-or-action | repeated-text |
| src/app/App.flow.test.tsx:103:48 | text | 의견서 작성 | button-or-action | repeated-text |
| src/app/App.flow.test.tsx:105:57 | text | A안 | learner-text-candidate | repeated-text |
| src/app/App.flow.test.tsx:106:60 | text | 평균 이동 단위 | learner-text-candidate | repeated-text |
| src/app/App.flow.test.tsx:107:60 | text | 가장 긴 이동 단위 | learner-text-candidate | repeated-text |
| src/app/App.flow.test.tsx:108:60 | text | 위험 조건 | learner-text-candidate | repeated-text |
| src/app/App.flow.test.tsx:109:68 | text | 더 불편을 살필 구역 | learner-text-candidate | repeated-text |
| src/app/App.flow.test.tsx:110:44 | text | 선택안의 근거 | learner-text-candidate | repeated-text |
| src/app/App.flow.test.tsx:110:56 | text | 접근성과 안전 자료를 함께 비교했습니다. | learner-text-candidate | repeated-text |
| src/app/App.flow.test.tsx:111:44 | text | 예상되는 반론 | learner-text-candidate | repeated-text |
| src/app/App.flow.test.tsx:111:56 | text | 다른 구역의 이동 부담이 커질 수 있습니다. | learner-text-candidate | repeated-text |
| src/app/App.flow.test.tsx:112:44 | text | 보완 방법 | instruction | repeated-text |
| src/app/App.flow.test.tsx:112:54 | text | 단계적 안내를 함께 마련하겠습니다. | instruction | repeated-text |
| src/app/App.flow.test.tsx:113:32 | text | heading | heading | repeated-text |
| src/app/App.flow.test.tsx:113:51 | text | 완성한 입지 심의 의견서 | heading | repeated-text |
| src/app/App.flow.test.tsx:114:30 | text | button | button-or-action | repeated-text |
| src/app/App.flow.test.tsx:114:48 | text | 의견서 작성 | button-or-action | repeated-text |
| src/app/App.flow.test.tsx:116:40 | text | button | button-or-action | repeated-text |
| src/app/App.flow.test.tsx:116:58 | text | 의견서 작성 | button-or-action | repeated-text |
| src/app/App.flow.test.tsx:117:30 | text | heading | heading | repeated-text |
| src/app/App.flow.test.tsx:117:49 | text | 완성한 입지 심의 의견서 | heading | repeated-text |
| src/app/App.flow.test.tsx:119:45 | text | 선택안의 근거 | learner-text-candidate | repeated-text |
| src/app/App.flow.test.tsx:120:26 | text | {End} 수정 | learner-text-candidate | — |
| src/app/App.flow.test.tsx:121:32 | text | heading | heading | repeated-text |
| src/app/App.flow.test.tsx:121:51 | text | 완성한 입지 심의 의견서 | heading | repeated-text |
| src/app/App.flow.test.tsx:123:40 | text | button | button-or-action | repeated-text |
| src/app/App.flow.test.tsx:123:58 | text | 의견서 작성 | button-or-action | repeated-text |
| src/app/App.flow.test.tsx:124:30 | text | heading | heading | repeated-text |
| src/app/App.flow.test.tsx:124:49 | text | 완성한 입지 심의 의견서 | heading | repeated-text |
| src/app/App.flow.test.tsx:125:40 | text | button | button-or-action | repeated-text |
| src/app/App.flow.test.tsx:125:58 | text | 처음부터 다시 시작 | button-or-action | repeated-text |
| src/app/App.flow.test.tsx:126:50 | text | 미션 선택 | learner-text-candidate | repeated-text |
| src/app/App.flow.test.tsx:127:32 | text | heading | heading | repeated-text |
| src/app/App.flow.test.tsx:127:51 | text | 완성한 입지 심의 의견서 | heading | repeated-text |
| src/app/App.test.tsx:9:30 | text | heading | heading | repeated-text |
| src/app/App.test.tsx:9:49 | text | 도시 기능 입지 심의실 | heading | repeated-text |
| src/app/App.test.tsx:15:48 | text | 심의 접수 | learner-text-candidate | repeated-text |
| src/app/App.test.tsx:16:30 | text | heading | heading | repeated-text |
| src/app/App.test.tsx:16:49 | text | 심의 접수 | heading | repeated-text |
| src/app/App.test.tsx:17:30 | text | 현재 단계: 심의 접수 | learner-text-candidate | — |
| src/app/App.test.tsx:18:30 | text | list | button-or-action | — |
| src/app/App.test.tsx:18:55 | text | button | button-or-action | repeated-text |
| src/app/App.test.tsx:19:52 | text | [aria-current="step"] | learner-text-candidate | technical-or-internal |
| src/app/App.test.tsx:19:96 | text | 심의 접수 | learner-text-candidate | repeated-text |
| src/app/App.test.tsx:24:56 | text | 본문으로 건너뛰기 | learner-text-candidate | repeated-text |
| src/app/App.tsx:29:31 | text | stage-heading | heading | repeated-text |
| src/app/App.tsx:31:10 | text | 현재 단계에서 도시 자료와 입지 조건을 살펴봅니다. | learner-text-candidate | — |
| src/app/App.tsx:32:15 | text | ); } function SessionShell() { const { state, dispatch } = useSession(); const [opinionSubmitted, setOpinionSubmitted] = useState(false); const summaryHeadingRef = useRef | heading, button-or-action | long-or-dense, technical-or-internal |
| src/app/App.tsx:43:34 | text | A안 | input | repeated-text |
| src/app/App.tsx:43:41 | text | B안 | input | repeated-text |
| src/app/App.tsx:47:39 | text | B안 | learner-text-candidate | repeated-text |
| src/app/App.tsx:47:47 | text | proposal-a | learner-text-candidate | repeated-text |
| src/app/App.tsx:47:61 | text | proposal-b | learner-text-candidate | repeated-text |
| src/app/App.tsx:71:15 | text | : state.stage === 'analysis' ? | heading | technical-or-internal |
| src/app/App.tsx:73:43 | text | impact-analysis-heading | heading | repeated-text |
| src/app/App.tsx:74:50 | text | 영향 분석실 | heading | abstract-or-formal, repeated-text |
| src/app/App.tsx:75:33 | text | 미션·배정 도시 자료가 올바르지 않아 영향 분석을 열 수 없습니다. 심의 접수에서 다시 선택해 주세요. | learner-text-candidate | abstract-or-formal |
| src/app/App.tsx:76:130 | text | 영향 계산 | learner-text-candidate | repeated-text |
| src/app/App.tsx:88:70 | text | A안 | input | repeated-text |
| src/app/App.tsx:89:70 | text | B안 | input | repeated-text |
| src/app/App.tsx:104:128 | text | set-opinion | heading, button-or-action | repeated-text |
| src/app/App.tsx:118:41 | text | ; const opinionAction = state.proposals.length === 2 && state.stage === 'resident-view'; return ( | input | long-or-dense, technical-or-internal |
| src/app/App.tsx:122:55 | text | 본문으로 건너뛰기 | learner-text-candidate | repeated-text |
| src/app/App.tsx:125:15 | text | 도시 기능 입지 심의실 | heading | repeated-text |
| src/app/App.tsx:131:71 | text | {opinionAction && | learner-text-candidate | — |
| src/app/App.tsx:132:135 | text | resident-view | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/app/App.tsx:132:187 | text | set-opinion | learner-text-candidate | repeated-text |
| src/app/App.tsx:132:283 | text | go-to-stage | learner-text-candidate | repeated-text |
| src/app/App.tsx:132:305 | text | opinion | learner-text-candidate | — |
| src/app/App.tsx:132:321 | text | 의견서 작성 | learner-text-candidate | repeated-text |
| src/content/learnerCopy.test.ts:6:43 | text | 교육용 상대 단위 | learner-text-candidate | — |
| src/content/learnerCopy.test.ts:7:43 | text | 실제 도시계획 | learner-text-candidate | — |
| src/content/learnerCopy.test.ts:8:43 | text | 응급 서비스 성능을 예측하지 않습니다 | learner-text-candidate | — |
| src/content/learnerCopy.test.ts:9:39 | text | 이름, 학교, 집 주소, 실제 지역은 입력하지 마세요 | input | abstract-or-formal |
| src/content/learnerCopy.test.ts:10:45 | text | 개인의 잘못이 아닙니다 | learner-text-candidate | — |
| src/content/learnerCopy.ts:2:4 | text | 이 결과는 가상 격자 도시의 교육용 상대 단위로 계산했습니다. 실제 교통량·토지 소유·법률·재난을 반영하지 않으며 실제 도시계획을 대신하거나 응급 서비스 성능을 예측하지 않습니다. | learner-text-candidate | long-or-dense |
| src/content/learnerCopy.ts:5:4 | text | 이름, 학교, 집 주소, 실제 지역은 입력하지 마세요. 작성 내용은 현재 탭에만 남고 새로고침하면 사라집니다. | input | abstract-or-formal, long-or-dense, multiple-actions |
| src/content/learnerCopy.ts:8:4 | text | 시설의 이익과 불편은 구역마다 다르게 나타날 수 있습니다. 시설을 이용하기 어려운 상황은 주민 개인의 잘못이 아닙니다. | learner-text-candidate | long-or-dense |
| src/content/learnerCopy.ts:11:17 | text | 가상 단위는 이 활동 안에서 이동 부담을 비교하려고 만든 숫자입니다. | learner-text-candidate | — |
| src/content/learnerCopy.ts:12:11 | text | 사람 토큰은 실제 사람 수가 아니라 구역별 인구를 나타내는 모형 표지입니다. | learner-text-candidate | — |
| src/content/learnerCopy.ts:13:14 | text | 절충은 좋은 점을 지키면서 생기는 아쉬운 점을 함께 살피는 방법입니다. | learner-text-candidate | — |
| src/content/learnerCopy.ts:17:20 | text | 평균과 함께 가장 멀거나 도달하기 어려운 구역도 확인해 보세요. | learner-text-candidate | — |
| src/content/learnerCopy.ts:18:24 | text | 이 위치에서 누가 더 불편한지 구역별 표에서 찾아보세요. | learner-text-candidate | — |
| src/content/learnerCopy.ts:19:24 | text | 장점이 다른 두 번째 후보를 비교하고 첫 선택의 약점을 보완해 보세요. | learner-text-candidate | multiple-actions |
| src/content/learnerCopy.ts:20:21 | text | 접근성·안전·비용 중 지킨 기준과 감수한 손해를 함께 설명해 보세요. | learner-text-candidate | — |
| src/domain/cities/maruCity.ts:14:30 | text | 솔빛 북쪽 구역 | learner-text-candidate | — |
| src/domain/cities/maruCity.ts:15:29 | text | 새길 동쪽 구역 | learner-text-candidate | — |
| src/domain/cities/maruCity.ts:16:32 | text | 마루 가운데 구역 | learner-text-candidate | — |
| src/domain/cities/maruCity.ts:17:30 | text | 느낌 남쪽 구역 | learner-text-candidate | — |
| src/domain/cities/maruCity.ts:18:29 | text | 달맞이 서쪽 구역 | learner-text-candidate | — |
| src/domain/cities/maruCity.ts:19:29 | text | 바람 언덕 구역 | learner-text-candidate | repeated-text |
| src/domain/cities/maruCity.ts:22:27 | text | 솔마루 터 | learner-text-candidate | — |
| src/domain/cities/maruCity.ts:23:27 | text | 새길 쉼터 터 | learner-text-candidate | — |
| src/domain/cities/maruCity.ts:24:27 | text | 마루 중앙 터 | learner-text-candidate | — |
| src/domain/cities/maruCity.ts:25:27 | text | 동쪽 열린 터 | learner-text-candidate | — |
| src/domain/cities/maruCity.ts:26:33 | text | 언덕 아래 터 | learner-text-candidate | — |
| src/domain/cities/maruCity.ts:27:35 | text | 넓은 동쪽 터 | learner-text-candidate | — |
| src/domain/cities/maruCity.ts:30:17 | text | A5 | learner-text-candidate | repeated-text |
| src/domain/cities/maruCity.ts:30:47 | text | A5 | learner-text-candidate | repeated-text |
| src/domain/cities/maruCity.ts:30:60 | text | steep-slope | learner-text-candidate | repeated-text |
| src/domain/cities/maruCity.ts:30:82 | text | 경사가 가파른 표지 | learner-text-candidate | repeated-text |
| src/domain/cities/maruCity.ts:33:41 | text | 바람 언덕 도서관 | learner-text-candidate | — |
| src/domain/cities/maruCity.ts:37:22 | text | 마루시(가상 도시) | learner-text-candidate | repeated-text |
| src/domain/cities/mulbitCity.ts:14:32 | text | 햇살 북쪽 구역 | learner-text-candidate | repeated-text |
| src/domain/cities/mulbitCity.ts:15:31 | text | 바람 동쪽 구역 | learner-text-candidate | repeated-text |
| src/domain/cities/mulbitCity.ts:16:34 | text | 물빛 가운데 구역 | learner-text-candidate | repeated-text |
| src/domain/cities/mulbitCity.ts:17:32 | text | 느티나무 남쪽 구역 | learner-text-candidate | repeated-text |
| src/domain/cities/mulbitCity.ts:18:31 | text | 노을 서쪽 구역 | learner-text-candidate | repeated-text |
| src/domain/cities/mulbitCity.ts:19:31 | text | 작은 언덕 구역 | learner-text-candidate | repeated-text |
| src/domain/cities/mulbitCity.ts:22:29 | text | 느린 강변 터 | learner-text-candidate | — |
| src/domain/cities/mulbitCity.ts:23:29 | text | 가운데 광장 터 | learner-text-candidate | — |
| src/domain/cities/mulbitCity.ts:24:29 | text | 느티마당 터 | learner-text-candidate | — |
| src/domain/cities/mulbitCity.ts:25:29 | text | 푸른길 터 | learner-text-candidate | — |
| src/domain/cities/mulbitCity.ts:26:35 | text | 물 고임 관찰 터 | learner-text-candidate | — |
| src/domain/cities/mulbitCity.ts:27:36 | text | 섬 끝 터 | learner-text-candidate | — |
| src/domain/cities/mulbitCity.ts:30:17 | text | A4 | learner-text-candidate | repeated-text |
| src/domain/cities/mulbitCity.ts:30:47 | text | A4 | learner-text-candidate | repeated-text |
| src/domain/cities/mulbitCity.ts:30:60 | text | water-ponding | learner-text-candidate | repeated-text |
| src/domain/cities/mulbitCity.ts:30:84 | text | 비가 오면 물이 고일 수 있는 표지 | learner-text-candidate | repeated-text |
| src/domain/cities/mulbitCity.ts:33:43 | text | 느티마당 문화센터 | learner-text-candidate | repeated-text |
| src/domain/cities/mulbitCity.ts:34:43 | text | 햇살 작은도서관 | learner-text-candidate | — |
| src/domain/cities/mulbitCity.ts:41:24 | text | 물빛시(가상 도시) | learner-text-candidate | repeated-text |
| src/domain/cities/validateCity.ts:8:36 | text | duplicate ${label} id: ${id} | feedback-or-error | technical-or-internal |
| src/domain/cities/validateCity.ts:15:59 | text | city must use a 5 by 5 grid | feedback-or-error | missing-term-explanation, technical-or-internal |
| src/domain/cities/validateCity.ts:16:125 | text | 0 ? city.rows * city.columns : 0; if (city.nodes.length !== expectedNodeCount) errors.push('node count must equal rows multiplied by columns'); if (city.virtualDataNotice !== MODEL_LIMIT_NOTICE) errors.push('virtual data notice must use approved copy'); const nodeIds = new Set | feedback-or-error | long-or-dense, technical-or-internal |
| src/domain/cities/validateCity.ts:18:61 | text | node count must equal rows multiplied by columns | feedback-or-error | — |
| src/domain/cities/validateCity.ts:19:67 | text | virtual data notice must use approved copy | feedback-or-error | — |
| src/domain/cities/validateCity.ts:27:33 | text | node coordinate out of bounds: ${node.label} | feedback-or-error | — |
| src/domain/cities/validateCity.ts:28:47 | text | duplicate grid coordinate: ${node.label} | feedback-or-error | technical-or-internal |
| src/domain/cities/validateCity.ts:30:52 | text | node label does not match coordinate: ${node.label} | feedback-or-error | long-or-dense |
| src/domain/cities/validateCity.ts:32:46 | text | duplicate derived node id: ${derivedId} | feedback-or-error | technical-or-internal |
| src/domain/cities/validateCity.ts:35:63 | text | grid coordinates must cover every cell exactly once | feedback-or-error | missing-term-explanation, technical-or-internal |
| src/domain/cities/validateCity.ts:37:52 | text | zone | feedback-or-error | — |
| src/domain/cities/validateCity.ts:38:57 | text | candidate | feedback-or-error | missing-term-explanation, technical-or-internal |
| src/domain/cities/validateCity.ts:39:66 | text | risk marker | feedback-or-error | — |
| src/domain/cities/validateCity.ts:40:57 | text | facility.id), 'existing facility', errors); if (city.zones.length !== 6) errors.push('city must have exactly six population zones'); if (city.candidates.length | feedback-or-error | long-or-dense, technical-or-internal |
| src/domain/cities/validateCity.ts:40:73 | text | existing facility | feedback-or-error | — |
| src/domain/cities/validateCity.ts:41:45 | text | city must have exactly six population zones | feedback-or-error | — |
| src/domain/cities/validateCity.ts:42:48 | text | city must have at least five candidate sites | feedback-or-error | missing-term-explanation, technical-or-internal |
| src/domain/cities/validateCity.ts:43:49 | text | city must have at least one risk marker | feedback-or-error | — |
| src/domain/cities/validateCity.ts:44:56 | text | city must have at least one existing facility | feedback-or-error | — |
| src/domain/cities/validateCity.ts:47:49 | text | zone node missing: ${zone.nodeId} | feedback-or-error | technical-or-internal |
| src/domain/cities/validateCity.ts:48:86 | text | zone tokens invalid: ${zone.id} | feedback-or-error | technical-or-internal |
| src/domain/cities/validateCity.ts:50:14 | text | library | feedback-or-error | repeated-text |
| src/domain/cities/validateCity.ts:50:25 | text | health-support | feedback-or-error | repeated-text |
| src/domain/cities/validateCity.ts:50:43 | text | culture-center | feedback-or-error | repeated-text |
| src/domain/cities/validateCity.ts:50:89 | text | zone coverage invalid: ${zone.id} | feedback-or-error | technical-or-internal |
| src/domain/cities/validateCity.ts:54:49 | text | candidate node missing: ${site.id} | feedback-or-error | technical-or-internal |
| src/domain/cities/validateCity.ts:55:87 | text | candidate coordinate out of bounds: ${site.id} | feedback-or-error | technical-or-internal |
| src/domain/cities/validateCity.ts:56:105 | text | candidate node does not match coordinate: ${site.id} | feedback-or-error | long-or-dense, technical-or-internal |
| src/domain/cities/validateCity.ts:57:60 | text | candidate cost invalid: ${site.id} | feedback-or-error | technical-or-internal |
| src/domain/cities/validateCity.ts:60:51 | text | risk marker node missing: ${marker.nodeId} | feedback-or-error | technical-or-internal |
| src/domain/cities/validateCity.ts:61:89 | text | risk coordinate out of bounds: ${marker.nodeId} | feedback-or-error | technical-or-internal |
| src/domain/cities/validateCity.ts:62:111 | text | risk marker node does not match coordinate: ${marker.nodeId} | feedback-or-error | long-or-dense, technical-or-internal |
| src/domain/cities/validateCity.ts:65:53 | text | existing facility node missing: ${facility.id} | feedback-or-error | technical-or-internal |
| src/domain/cities/validateCity.ts:66:91 | text | facility coordinate out of bounds: ${facility.id} | feedback-or-error | technical-or-internal |
| src/domain/cities/validateCity.ts:67:117 | text | facility node does not match coordinate: ${facility.id} | feedback-or-error | long-or-dense, technical-or-internal |
| src/domain/cities/validateCity.ts:70:72 | text | road endpoint missing: ${edge.from} ${edge.to} | feedback-or-error | — |
| src/domain/cities/validateCity.ts:71:84 | text | road weight invalid: ${edge.from} ${edge.to} | feedback-or-error | technical-or-internal |
| src/domain/coordinates.ts:15:11 | text | ${columnLabel(column)}${row + 1} | learner-text-candidate | — |
| src/domain/coordinates.ts:19:11 | text | ${prefix}-${coordinateLabel(row, column).toLowerCase()} | learner-text-candidate | long-or-dense |
| src/domain/fixtures.test.ts:77:22 | text | health-help-center | hint | repeated-text |
| src/domain/fixtures.test.ts:77:61 | text | 일상 건강 상담 시설 | hint | repeated-text |
| src/domain/fixtures.test.ts:78:70 | text | 응급 | hint | — |
| src/domain/fixtures.test.ts:79:70 | text | 일상 건강 상담 시설 | hint | repeated-text |
| src/domain/fixtures.test.ts:80:70 | text | 아니라 | hint | — |
| src/domain/fixtures.test.ts:81:88 | text | 근거 | learner-text-candidate | — |
| src/domain/fixtures.test.ts:157:74 | text | wrong | feedback-or-error | — |
| src/domain/fixtures.test.ts:157:113 | text | node label | feedback-or-error | — |
| src/domain/missions/combinedMission.ts:4:8 | text | combined-review | learner-text-candidate | repeated-text |
| src/domain/missions/combinedMission.ts:4:35 | text | maru | learner-text-candidate | repeated-text |
| src/domain/missions/combinedMission.ts:4:50 | text | 두 시설의 절충안을 검토해 보세요 | learner-text-candidate | — |
| src/domain/missions/combinedMission.ts:4:88 | text | library | learner-text-candidate | repeated-text |
| src/domain/missions/combinedMission.ts:4:99 | text | health-support | learner-text-candidate | repeated-text |
| src/domain/missions/combinedMission.ts:7:14 | text | WITHIN_BUDGET | learner-text-candidate | repeated-text |
| src/domain/missions/combinedMission.ts:7:38 | text | 두 시설을 예산 토큰 4개 안에 놓기 | learner-text-candidate | — |
| src/domain/missions/combinedMission.ts:8:14 | text | DISTINCT_CANDIDATE_SITES | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/domain/missions/combinedMission.ts:8:49 | text | 서로 다른 터 두 곳 선택하기 | learner-text-candidate | — |
| src/domain/missions/combinedMission.ts:9:14 | text | REQUIRED_FACILITY_MIX | hint | — |
| src/domain/missions/combinedMission.ts:9:46 | text | 도서관 1곳과 건강 도움소 1곳 놓기 | hint | — |
| src/domain/missions/combinedMission.ts:10:14 | text | NO_UNREACHABLE_ZONE | learner-text-candidate | repeated-text |
| src/domain/missions/combinedMission.ts:10:44 | text | 도달 불가 구역 없이 놓기 | learner-text-candidate | repeated-text |
| src/domain/missions/combinedMission.ts:11:14 | text | WORST_TRAVEL_WITHIN_LIMIT | learner-text-candidate | repeated-text |
| src/domain/missions/combinedMission.ts:11:50 | text | 가장 먼 구역 이동 단위 7 이하 | learner-text-candidate | repeated-text |
| src/domain/missions/combinedMission.ts:12:14 | text | NO_RISK_SITE | learner-text-candidate | repeated-text |
| src/domain/missions/combinedMission.ts:12:37 | text | 두 터 모두 위험 표지가 없기 | learner-text-candidate | — |
| src/domain/missions/combinedMission.ts:13:14 | text | COST_WITHIN_PRIORITY_CAP | learner-text-candidate | repeated-text |
| src/domain/missions/combinedMission.ts:13:49 | text | 비용 우선 기준은 3토큰 이하 | learner-text-candidate | — |
| src/domain/missions/combinedMission.ts:19:20 | text | 도서관과 일상 건강 상담 시설을 서로 다른 터에 놓고, 접근성·안전·비용 사이의 절충과 보완안을 근거와 함께 비교해 보세요. | learner-text-candidate | long-or-dense |
| src/domain/missions/cultureCenterMission.ts:4:8 | text | living-culture-center | learner-text-candidate | — |
| src/domain/missions/cultureCenterMission.ts:4:41 | text | mulbit | learner-text-candidate | repeated-text |
| src/domain/missions/cultureCenterMission.ts:4:58 | text | 생활 문화센터를 놓아 보세요 | learner-text-candidate | — |
| src/domain/missions/cultureCenterMission.ts:4:93 | text | culture-center | learner-text-candidate | repeated-text |
| src/domain/missions/cultureCenterMission.ts:7:14 | text | WITHIN_BUDGET | learner-text-candidate | repeated-text |
| src/domain/missions/cultureCenterMission.ts:7:38 | text | 예산 토큰 3개 안에 놓기 | learner-text-candidate | repeated-text |
| src/domain/missions/cultureCenterMission.ts:8:14 | text | NO_UNREACHABLE_ZONE | learner-text-candidate | repeated-text |
| src/domain/missions/cultureCenterMission.ts:8:44 | text | 도달 불가 구역 없이 놓기 | learner-text-candidate | repeated-text |
| src/domain/missions/cultureCenterMission.ts:9:14 | text | COVERAGE_GAP_WITHIN_LIMIT | learner-text-candidate | repeated-text |
| src/domain/missions/cultureCenterMission.ts:9:50 | text | 문화시설 소외 구역 1곳 이하 | learner-text-candidate | — |
| src/domain/missions/cultureCenterMission.ts:10:14 | text | NO_RISK_SITE | learner-text-candidate | repeated-text |
| src/domain/missions/cultureCenterMission.ts:10:37 | text | 위험 표지가 없는 터 선택하기 | learner-text-candidate | repeated-text |
| src/domain/missions/cultureCenterMission.ts:11:14 | text | COST_WITHIN_PRIORITY_CAP | learner-text-candidate | repeated-text |
| src/domain/missions/cultureCenterMission.ts:11:49 | text | 비용 우선 기준은 2토큰 이하 | learner-text-candidate | repeated-text |
| src/domain/missions/cultureCenterMission.ts:17:20 | text | 기존 문화시설이 있는 구역과 없는 구역을 비교하여 생활 문화센터 위치의 절충과 보완안을 근거와 함께 설명해 보세요. | learner-text-candidate | long-or-dense |
| src/domain/missions/healthSupportMission.ts:4:8 | text | health-help-center | hint | repeated-text |
| src/domain/missions/healthSupportMission.ts:4:38 | text | maru | hint | repeated-text |
| src/domain/missions/healthSupportMission.ts:4:53 | text | 일상 건강 상담 시설을 놓아 보세요 | hint | — |
| src/domain/missions/healthSupportMission.ts:4:92 | text | health-support | hint | repeated-text |
| src/domain/missions/healthSupportMission.ts:7:14 | text | WITHIN_BUDGET | learner-text-candidate | repeated-text |
| src/domain/missions/healthSupportMission.ts:7:38 | text | 예산 토큰 3개 안에 놓기 | learner-text-candidate | repeated-text |
| src/domain/missions/healthSupportMission.ts:8:14 | text | NO_UNREACHABLE_ZONE | learner-text-candidate | repeated-text |
| src/domain/missions/healthSupportMission.ts:8:44 | text | 도달 불가 구역 없이 놓기 | learner-text-candidate | repeated-text |
| src/domain/missions/healthSupportMission.ts:9:14 | text | MOBILITY_BARRIER_TRAVEL_WITHIN_LIMIT | learner-text-candidate | — |
| src/domain/missions/healthSupportMission.ts:9:61 | text | 이동이 불편한 구역의 이동 단위 6 이하 | learner-text-candidate | — |
| src/domain/missions/healthSupportMission.ts:10:14 | text | NO_RISK_SITE | learner-text-candidate | repeated-text |
| src/domain/missions/healthSupportMission.ts:10:37 | text | 위험 표지가 없는 터 선택하기 | learner-text-candidate | repeated-text |
| src/domain/missions/healthSupportMission.ts:11:14 | text | COST_WITHIN_PRIORITY_CAP | learner-text-candidate | repeated-text |
| src/domain/missions/healthSupportMission.ts:11:49 | text | 비용 우선 기준은 2토큰 이하 | learner-text-candidate | repeated-text |
| src/domain/missions/healthSupportMission.ts:17:20 | text | 이 시설은 응급실이나 응급 대응 시설이 아니라 일상 건강 상담 시설입니다. 이동이 불편한 구역도 상담을 받으러 가기 쉬운 위치를 근거와 함께 제안해 보세요. | learner-text-candidate | long-or-dense |
| src/domain/missions/libraryMission.ts:4:8 | text | bookmaru-library | learner-text-candidate | repeated-text |
| src/domain/missions/libraryMission.ts:4:36 | text | mulbit | learner-text-candidate | repeated-text |
| src/domain/missions/libraryMission.ts:4:53 | text | 책마루 도서관을 놓아 보세요 | learner-text-candidate | — |
| src/domain/missions/libraryMission.ts:4:88 | text | library | learner-text-candidate | repeated-text |
| src/domain/missions/libraryMission.ts:7:14 | text | WITHIN_BUDGET | learner-text-candidate | repeated-text |
| src/domain/missions/libraryMission.ts:7:38 | text | 예산 토큰 3개 안에 놓기 | learner-text-candidate | repeated-text |
| src/domain/missions/libraryMission.ts:8:14 | text | NO_UNREACHABLE_ZONE | learner-text-candidate | repeated-text |
| src/domain/missions/libraryMission.ts:8:44 | text | 도달 불가 구역 없이 놓기 | learner-text-candidate | repeated-text |
| src/domain/missions/libraryMission.ts:9:14 | text | WORST_TRAVEL_WITHIN_LIMIT | learner-text-candidate | repeated-text |
| src/domain/missions/libraryMission.ts:9:50 | text | 가장 먼 구역 이동 단위 7 이하 | learner-text-candidate | repeated-text |
| src/domain/missions/libraryMission.ts:10:14 | text | NO_RISK_SITE | learner-text-candidate | repeated-text |
| src/domain/missions/libraryMission.ts:10:37 | text | 위험 표지가 없는 터 선택하기 | learner-text-candidate | repeated-text |
| src/domain/missions/libraryMission.ts:11:14 | text | COST_WITHIN_PRIORITY_CAP | learner-text-candidate | repeated-text |
| src/domain/missions/libraryMission.ts:11:49 | text | 비용 우선 기준은 2토큰 이하 | learner-text-candidate | repeated-text |
| src/domain/missions/libraryMission.ts:17:20 | text | 구역별 사람 토큰과 이동 단위를 살펴 가장 공평한 책마루 도서관 위치를 근거와 함께 제안해 보세요. | learner-text-candidate | — |
| src/domain/types.ts:51:118 | text | ; selectedUnderservedZoneIds: string[]; comparedProposalIds: string[]; } export interface ConditionResult { code: MissionCondition['code']; passed: boolean; evidenceText: string } export interface ProposalAssessment { verdict: Verdict; conditionResults: ConditionResult[]; priorityConsistent: boolean; missingEvidence: string[]; feedbackPrompts: string[]; } export interface ProposalSnapshot { id: string; label: string; placements: FacilityPlacement[]; analysis: PlacementAnalysis; assessment: ProposalAssessment } export interface OpinionDraft { priorityId: PriorityId \| null; selectedProposalId: string \| null; evidenceMetricIds: Array | feedback-or-error | long-or-dense, technical-or-internal |
| src/engine/analyzePlacement.test.ts:70:7 | text | throws RangeError for an unknown candidate, wrong count, mix, or duplicate site | feedback-or-error | long-or-dense, missing-term-explanation, technical-or-internal |
| src/engine/analyzePlacement.ts:24:27 | text | Facility slot ID must be a safe, non-empty identifier. | feedback-or-error | long-or-dense, missing-term-explanation, technical-or-internal |
| src/engine/analyzePlacement.ts:105:57 | text | Mission and city do not match. | feedback-or-error | — |
| src/engine/analyzePlacement.ts:107:27 | text | Placement count must match the mission facility slots. | feedback-or-error | long-or-dense |
| src/engine/analyzePlacement.ts:112:52 | text | (); for (const placement of placements) { validateSlotId(placement.slotId); const candidate = candidatesById.get(placement.candidateId); if (candidate === undefined) throw new RangeError(`Unknown candidate: ${placement.candidateId}`); if (usedCandidateIds.has(placement.candidateId)) throw new RangeError('Candidate sites must be distinct.'); if (usedSlotIds.has(placement.slotId)) throw new RangeError('Facility slot IDs must be distinct.'); if (!mission.facilityKinds.includes(placement.facilityKind)) throw new RangeError('Wrong facility mix.'); usedCandidateIds.add(placement.candidateId); usedSlotIds.add(placement.slotId); actualKinds.set(placement.facilityKind, (actualKinds.get(placement.facilityKind) ?? 0) + 1); } const expectedKinds = new Map | feedback-or-error | long-or-dense, technical-or-internal |
| src/engine/analyzePlacement.ts:116:56 | text | Unknown candidate: ${placement.candidateId} | feedback-or-error | technical-or-internal |
| src/engine/analyzePlacement.ts:117:76 | text | Candidate sites must be distinct. | feedback-or-error | missing-term-explanation, technical-or-internal |
| src/engine/analyzePlacement.ts:118:66 | text | Facility slot IDs must be distinct. | feedback-or-error | missing-term-explanation, technical-or-internal |
| src/engine/analyzePlacement.ts:119:88 | text | Wrong facility mix. | feedback-or-error | repeated-text |
| src/engine/analyzePlacement.ts:127:64 | text | Wrong facility mix. | feedback-or-error | repeated-text |
| src/engine/analyzePlacement.ts:130:66 | text | Wrong facility mix. | feedback-or-error | repeated-text |
| src/engine/assessProposal.test.ts:53:57 | text | 배치 비용 1토큰 / 공개 한도 3토큰입니다. | learner-text-candidate | — |
| src/engine/assessProposal.test.ts:53:86 | text | 배치 비용 2토큰 / 공개 한도 3토큰입니다. | learner-text-candidate | — |
| src/engine/assessProposal.test.ts:54:55 | text | 이동이 불편한 구역의 가장 긴 이동 단위 3 / 공개 한도 6입니다. | hint | — |
| src/engine/assessProposal.test.ts:54:97 | text | 이동이 불편한 구역의 가장 긴 이동 단위 5 / 공개 한도 6입니다. | hint | — |
| src/engine/assessProposal.test.ts:55:62 | text | 비용 2토큰 / 우선 기준 공개 한도 2토큰입니다. | learner-text-candidate | — |
| src/engine/assessProposal.test.ts:55:94 | text | 비용 3토큰 / 우선 기준 공개 한도 2토큰입니다. | learner-text-candidate | — |
| src/engine/assessProposal.test.ts:56:74 | text | 가장 긴 이동 단위 3 / 공개 한도 7입니다. | learner-text-candidate | — |
| src/engine/assessProposal.test.ts:56:104 | text | 가장 긴 이동 단위 4 / 공개 한도 7입니다. | learner-text-candidate | — |
| src/engine/assessProposal.test.ts:91:16 | text | rejects %s mission context condition provenance | learner-text-candidate | — |
| src/engine/assessProposal.test.ts:139:16 | text | fails closed for a %s | learner-text-candidate | — |
| src/engine/assessProposal.test.ts:192:61 | text | 자료층 | learner-text-candidate | — |
| src/engine/assessProposal.ts:45:73 | text | 공개 제한 없음 | learner-text-candidate | — |
| src/engine/assessProposal.ts:54:44 | text | 분석의 도시·미션·공개 규칙이 선택한 미션과 일치하지 않아 다시 계산해야 합니다. | learner-text-candidate | abstract-or-formal, multiple-actions, multiple-conditions |
| src/engine/assessProposal.ts:62:39 | text | 배치 비용 ${analysis.totalCostTokens}토큰 / 공개 한도 ${formatLimit(limit)}토큰입니다. | learner-text-candidate | long-or-dense |
| src/engine/assessProposal.ts:66:39 | text | 도달 불가 구역 ${analysis.nearestFacilityAccess.unreachableZoneIds.length}곳 / 공개 한도 ${formatLimit(limit)}곳입니다. | learner-text-candidate | long-or-dense, technical-or-internal |
| src/engine/assessProposal.ts:71:39 | text | 가장 긴 이동 단위 ${value === null ? '계산 불가' : value} / 공개 한도 ${formatLimit(limit)}입니다. | learner-text-candidate | long-or-dense, technical-or-internal |
| src/engine/assessProposal.ts:76:39 | text | 이동이 불편한 구역의 가장 긴 이동 단위 ${value === null ? '계산 불가' : value} / 공개 한도 ${formatLimit(limit)}입니다. | learner-text-candidate | long-or-dense, technical-or-internal |
| src/engine/assessProposal.ts:80:39 | text | 위험 표지가 있는 선택 터 ${analysis.riskyCandidateIds.length}곳 / 공개 한도 ${formatLimit(limit)}곳입니다. | learner-text-candidate | long-or-dense, technical-or-internal |
| src/engine/assessProposal.ts:84:39 | text | 비용 ${analysis.totalCostTokens}토큰 / 우선 기준 공개 한도 ${formatLimit(limit)}토큰입니다. | learner-text-candidate | long-or-dense |
| src/engine/assessProposal.ts:88:39 | text | 문화시설 소외 구역 ${analysis.coverageGapZoneIds.length}곳 / 공개 한도 ${formatLimit(limit)}곳입니다. | learner-text-candidate | long-or-dense, technical-or-internal |
| src/engine/assessProposal.ts:93:39 | text | 서로 다른 선택 터 ${uniqueSites}곳 / 공개 기준 ${formatLimit(limit)}곳입니다. | learner-text-candidate | long-or-dense |
| src/engine/assessProposal.ts:99:39 | text | 배치 시설 ${actual.join('·') \|\| '없음'} / 공개 기준 ${expected.join('·')}입니다. | learner-text-candidate | long-or-dense |
| src/engine/assessProposal.ts:102:46 | text | 이 조건의 공개 판정 규칙을 확인할 수 없습니다. | learner-text-candidate | — |
| src/engine/assessProposal.ts:110:19 | text | 자료층을 ${EVIDENCE_GATES.minimumLayers}개 이상 확인하세요. | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/engine/assessProposal.ts:115:48 | text | 평균 이동 단위를 확인하세요. | learner-text-candidate | — |
| src/engine/assessProposal.ts:116:48 | text | 가장 긴 이동 단위를 확인하세요. | learner-text-candidate | — |
| src/engine/assessProposal.ts:150:47 | text | 선택한 미션과 같은 도시·미션으로 영향 결과를 다시 계산하세요. | learner-text-candidate | multiple-actions |
| src/engine/explainCalculation.test.ts:12:37 | text | ${row.label} ${row.value} ${row.explanation} | learner-text-candidate | repeated-text |
| src/engine/explainCalculation.test.ts:15:8 | text | 평균 이동 단위 | learner-text-candidate | repeated-text |
| src/engine/explainCalculation.test.ts:16:8 | text | 가장 긴 이동 단위 | learner-text-candidate | repeated-text |
| src/engine/explainCalculation.test.ts:17:8 | text | 도달 불가 | learner-text-candidate | repeated-text |
| src/engine/explainCalculation.test.ts:18:8 | text | 이동이 어려운 구역 | learner-text-candidate | repeated-text |
| src/engine/explainCalculation.test.ts:19:8 | text | 위험 표지 | learner-text-candidate | repeated-text |
| src/engine/explainCalculation.test.ts:20:8 | text | 예산 | learner-text-candidate | repeated-text |
| src/engine/explainCalculation.test.ts:27:29 | text | 가상 단위 | learner-text-candidate | — |
| src/engine/explainCalculation.test.ts:34:88 | text | 예산 | learner-text-candidate | repeated-text |
| src/engine/explainCalculation.test.ts:35:33 | text | 2 / 9 토큰 | learner-text-candidate | — |
| src/engine/explainCalculation.test.ts:36:44 | text | 예산 9 토큰 | learner-text-candidate | — |
| src/engine/explainCalculation.test.ts:50:70 | text | 이동이 어려운 구역 | learner-text-candidate | repeated-text |
| src/engine/explainCalculation.test.ts:51:70 | text | 기존 시설 중복·공백 | learner-text-candidate | repeated-text |
| src/engine/explainCalculation.test.ts:55:16 | text | COVERAGE_GAP_WITHIN_LIMIT | learner-text-candidate | repeated-text |
| src/engine/explainCalculation.test.ts:55:61 | text | 공백 한 곳 이하 | learner-text-candidate | — |
| src/engine/explainCalculation.test.ts:61:37 | text | ${row.label} ${row.value} ${row.explanation} | learner-text-candidate | repeated-text |
| src/engine/explainCalculation.test.ts:62:53 | text | 이동이 어려운 구역 | learner-text-candidate | repeated-text |
| src/engine/explainCalculation.test.ts:63:53 | text | 기존 시설 중복·공백 | learner-text-candidate | repeated-text |
| src/engine/explainCalculation.test.ts:65:29 | text | 물 고임 표지 | learner-text-candidate | repeated-text |
| src/engine/explainCalculation.test.ts:68:29 | text | 기존 시설 | learner-text-candidate | repeated-text |
| src/engine/explainCalculation.test.ts:69:29 | text | 새 시설 | learner-text-candidate | — |
| src/engine/explainCalculation.ts:9:74 | text | 없음 | learner-text-candidate | repeated-text |
| src/engine/explainCalculation.ts:16:19 | text | 없음 | learner-text-candidate | repeated-text |
| src/engine/explainCalculation.ts:28:33 | text | 없음 | learner-text-candidate | repeated-text |
| src/engine/explainCalculation.ts:46:25 | text | ${marker.kind}: ${marker.label} | learner-text-candidate | — |
| src/engine/explainCalculation.ts:47:13 | text | ${site?.name ?? id} (${markers.join(', ') \|\| '위험 표지'}) | learner-text-candidate | long-or-dense, technical-or-internal |
| src/engine/explainCalculation.ts:48:21 | text | 없음 | learner-text-candidate | repeated-text |
| src/engine/explainCalculation.ts:49:41 | text | ${site.name} ${site.costTokens}토큰 | learner-text-candidate | repeated-text |
| src/engine/explainCalculation.ts:49:92 | text | 없음 | learner-text-candidate | repeated-text |
| src/engine/explainCalculation.ts:54:15 | text | 평균 이동 단위 | learner-text-candidate | repeated-text |
| src/engine/explainCalculation.ts:55:15 | text | ${formatNumber(access.populationWeightedAverage)} 가상 단위 | learner-text-candidate | long-or-dense |
| src/engine/explainCalculation.ts:56:21 | text | (${weightedNumerator(analysis, city)}) ÷ ${access.reachablePeopleTokens}명 토큰 = ${access.populationWeightedAverage ?? '계산 불가'}; 분모는 ${access.reachablePeopleTokens} / ${access.totalPeopleTokens}명 토큰(도달 / 전체)입니다. 모든 수치는 가상 단위입니다. | learner-text-candidate | long-or-dense |
| src/engine/explainCalculation.ts:59:15 | text | 가장 긴 이동 단위 | learner-text-candidate | repeated-text |
| src/engine/explainCalculation.ts:60:15 | text | ${formatNumber(access.longestReachableTravel)} 가상 단위 | learner-text-candidate | long-or-dense |
| src/engine/explainCalculation.ts:61:21 | text | 가장 긴 도달 가능 경로이며, 해당 구역: ${longestZoneNames(analysis, city)}. 미도달 구역은 별도 행에서 확인합니다. 가상 단위는 실제 이동 시간 예측이 아닙니다. | learner-text-candidate | ambiguous-reference, long-or-dense |
| src/engine/explainCalculation.ts:64:15 | text | 도달 불가 | learner-text-candidate | repeated-text |
| src/engine/explainCalculation.ts:65:56 | text | 없음 | learner-text-candidate | repeated-text |
| src/engine/explainCalculation.ts:65:63 | text | ${access.unreachableZoneIds.length}개 구역 | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/engine/explainCalculation.ts:67:12 | text | 모든 구역에 경로가 있습니다. 미도달 인구 토큰은 0입니다. 가상 단위 모형입니다. | learner-text-candidate | — |
| src/engine/explainCalculation.ts:68:12 | text | ${zoneNames(city, access.unreachableZoneIds)} (${access.unreachableZoneIds.join(', ')}, ${unreachableTokens}명 토큰)는 경로가 없어 평균에서 제외하고 따로 표시했습니다. 가상 단위 모형입니다. | learner-text-candidate | long-or-dense, technical-or-internal |
| src/engine/explainCalculation.ts:71:15 | text | 위험 표지 | learner-text-candidate | repeated-text |
| src/engine/explainCalculation.ts:73:21 | text | 선택한 터의 marker kind와 정성 label을 숫자 점수나 실제 재난 확률로 바꾸지 않았습니다. | learner-text-candidate | long-or-dense |
| src/engine/explainCalculation.ts:76:15 | text | 예산 | learner-text-candidate | repeated-text |
| src/engine/explainCalculation.ts:77:15 | text | ${analysis.totalCostTokens} / ${analysis.missionContext.budgetTokens} 토큰 | learner-text-candidate | long-or-dense, repeated-text |
| src/engine/explainCalculation.ts:78:21 | text | ${costText}; 배치된 터 비용의 합계 ${analysis.totalCostTokens} / 예산 ${analysis.missionContext.budgetTokens} 토큰입니다. 수치는 가상 예산 단위입니다. | learner-text-candidate | long-or-dense |
| src/engine/explainCalculation.ts:84:15 | text | 이동이 어려운 구역 | learner-text-candidate | repeated-text |
| src/engine/explainCalculation.ts:85:15 | text | ${formatNumber(mobility.populationWeightedAverage)} 가상 단위 | learner-text-candidate | long-or-dense |
| src/engine/explainCalculation.ts:86:21 | text | 이동이 어려운 구역만 따로 계산: 도달 ${mobility.reachablePeopleTokens} / 전체 ${mobility.totalPeopleTokens}명 토큰, 산식은 해당 구역의 이동 단위 × 사람 토큰 ÷ 도달 토큰입니다. | learner-text-candidate | ambiguous-reference, long-or-dense |
| src/engine/explainCalculation.ts:93:15 | text | 기존 시설 중복·공백 | learner-text-candidate | repeated-text |
| src/engine/explainCalculation.ts:94:15 | text | 중복 ${analysis.overlapZoneIds.length}곳 · 공백 ${analysis.coverageGapZoneIds.length}곳 | learner-text-candidate | long-or-dense, missing-term-explanation, technical-or-internal |
| src/engine/explainCalculation.ts:95:21 | text | 시설 종류 ${kinds}, 서비스 임계값 ${analysis.missionContext.serviceThreshold} 가상 단위 기준입니다. 기존 시설 근거가 있고 새 시설도 임계값 안에 닿는 중복 구역: ${zoneNames(city, analysis.overlapZoneIds)}. 기존·새 시설 어느 쪽도 닿지 않는 공백 구역: ${zoneNames(city, analysis.coverageGapZoneIds)}. | learner-text-candidate | long-or-dense, technical-or-internal |
| src/engine/proposalComparison.ts:14:30 | text | proposal-a | learner-text-candidate | repeated-text |
| src/engine/proposalComparison.ts:14:44 | text | B안 | learner-text-candidate | repeated-text |
| src/engine/proposalComparison.ts:14:50 | text | proposal-b | learner-text-candidate | repeated-text |
| src/engine/proposalComparison.ts:40:78 | text | { if (value === null \|\| typeof value === 'string' \|\| typeof value === 'boolean') return value; if (typeof value === 'number') { if (!Number.isFinite(value)) throw new RangeError('Proposal values must be finite.'); return value; } if (typeof value !== 'object' \|\| seen.has(value)) throw new TypeError('Proposal values must be plain data.'); seen.add(value); if (Array.isArray(value)) { if (!isStrictArray(value)) throw new TypeError('Malformed proposal array.'); const descriptor = Object.getOwnPropertyDescriptor(value, 'length'); if (descriptor === undefined \|\| !('value' in descriptor) \|\| !Number.isSafeInteger(descriptor.value)) throw new TypeError('Malformed proposal array.'); const result: unknown[] = []; for (let index = 0; index | feedback-or-error | long-or-dense, technical-or-internal |
| src/engine/proposalComparison.ts:43:56 | text | Proposal values must be finite. | feedback-or-error | — |
| src/engine/proposalComparison.ts:46:25 | text | object | feedback-or-error | repeated-text |
| src/engine/proposalComparison.ts:46:74 | text | Proposal values must be plain data. | feedback-or-error | — |
| src/engine/proposalComparison.ts:49:53 | text | Malformed proposal array. | feedback-or-error | repeated-text |
| src/engine/proposalComparison.ts:51:40 | text | value | feedback-or-error | repeated-text |
| src/engine/proposalComparison.ts:51:127 | text | Malformed proposal array. | feedback-or-error | repeated-text |
| src/engine/proposalComparison.ts:55:76 | text | value | feedback-or-error | repeated-text |
| src/engine/proposalComparison.ts:55:124 | text | Malformed proposal array. | feedback-or-error | repeated-text |
| src/engine/proposalComparison.ts:61:51 | text | Proposal values must be plain records. | feedback-or-error | — |
| src/engine/proposalComparison.ts:62:89 | text | ; for (const key of Reflect.ownKeys(value)) { if (typeof key !== 'string') throw new TypeError('Proposal values cannot contain symbol keys.'); const descriptor = Object.getOwnPropertyDescriptor(value, key); if (descriptor === undefined \|\| !descriptor.enumerable \|\| !('value' in descriptor)) throw new TypeError('Malformed proposal record.'); result[key] = cloneValue(descriptor.value, seen); } seen.delete(value); return result; }; /** Clones descriptor-safe ordinary data without invoking accessors. */ export function cloneStrictSerializable | feedback-or-error | long-or-dense, technical-or-internal |
| src/engine/proposalComparison.ts:64:25 | text | string | feedback-or-error | repeated-text |
| src/engine/proposalComparison.ts:64:55 | text | Proposal values cannot contain symbol keys. | feedback-or-error | — |
| src/engine/proposalComparison.ts:66:66 | text | value | feedback-or-error | repeated-text |
| src/engine/proposalComparison.ts:66:110 | text | Malformed proposal record. | feedback-or-error | — |
| src/engine/proposalComparison.ts:92:86 | text | { try { if (assessment === null \|\| typeof assessment !== 'object' \|\| !isPlainRecord(assessment) \|\| !expectedKeys(assessment, ['verdict', 'conditionResults', 'priorityConsistent', 'missingEvidence', 'feedbackPrompts'])) return false; const record = assessment as unknown as Record | feedback-or-error | long-or-dense, technical-or-internal |
| src/engine/proposalComparison.ts:95:38 | text | verdict | feedback-or-error | repeated-text |
| src/engine/proposalComparison.ts:95:49 | text | conditionResults | feedback-or-error | repeated-text |
| src/engine/proposalComparison.ts:95:69 | text | priorityConsistent | feedback-or-error | repeated-text |
| src/engine/proposalComparison.ts:95:91 | text | missingEvidence | feedback-or-error | missing-term-explanation, repeated-text, technical-or-internal |
| src/engine/proposalComparison.ts:95:110 | text | feedbackPrompts | feedback-or-error | repeated-text |
| src/engine/proposalComparison.ts:113:78 | text | { try { if (snapshot === null \|\| typeof snapshot !== 'object' \|\| !isPlainRecord(snapshot) \|\| !expectedKeys(snapshot, ['id', 'label', 'placements', 'analysis', 'assessment'])) return false; const record = snapshot as unknown as Record | learner-text-candidate | long-or-dense, technical-or-internal |
| src/engine/proposalComparison.ts:116:36 | text | id | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/engine/proposalComparison.ts:116:42 | text | label | learner-text-candidate | repeated-text |
| src/engine/proposalComparison.ts:116:51 | text | placements | learner-text-candidate | — |
| src/engine/proposalComparison.ts:116:65 | text | analysis | learner-text-candidate | — |
| src/engine/proposalComparison.ts:116:77 | text | assessment | learner-text-candidate | — |
| src/engine/proposalComparison.ts:119:25 | text | proposal-a | learner-text-candidate | repeated-text |
| src/engine/proposalComparison.ts:119:58 | text | A안 | learner-text-candidate | repeated-text |
| src/engine/proposalComparison.ts:119:82 | text | proposal-b | learner-text-candidate | repeated-text |
| src/engine/proposalComparison.ts:119:115 | text | B안 | learner-text-candidate | repeated-text |
| src/engine/proposalComparison.ts:137:109 | text | typeof item === 'string'); return record.firstProposalId === 'proposal-a' && record.secondProposalId === 'proposal-b' && nullableNumber(record.averageDelta) && nullableNumber(record.maximumDelta) && typeof record.riskCountDelta === 'number' && Number.isFinite(record.riskCountDelta) && typeof record.costTokenDelta === 'number' && Number.isFinite(record.costTokenDelta) && typeof record.overlapCountDelta === 'number' && Number.isFinite(record.overlapCountDelta) && stringArray(record.newlyReachedZoneIds) && stringArray(record.newlyUnreachableZoneIds) && stringArray(record.moreInconveniencedZoneIds); } catch { return false; } }; /** * Validates and obtains a detached snapshot before any caller can inspect it. * Descriptor reads make accessors fail closed without invoking their getters. */ export function cloneProposalSnapshot(snapshot: ProposalSnapshot): ProposalSnapshot { const cloned = cloneValue(snapshot); if (!validateSnapshot(cloned)) throw new TypeError('Cannot clone a malformed proposal.'); return freezeDeep(cloned); } export function cloneProposalComparison(comparison: ProposalComparison): ProposalComparison { const cloned = cloneValue(comparison); if (!validateComparison(cloned)) throw new TypeError('Cannot clone a malformed comparison.'); return freezeDeep(cloned); } export function createProposalSnapshot( label: string, placements: FacilityPlacement[], analysis: PlacementAnalysis, assessment: ProposalAssessment, ): ProposalSnapshot { if (label !== 'A안' && label !== 'B안') throw new RangeError('Proposal label must be A안 or B안.'); const clonedPlacements = cloneValue(placements); const clonedAnalysis = cloneValue(analysis); const clonedAssessment = cloneValue(assessment); if (!isStrictArray(clonedPlacements) \|\| !validateAssessment(clonedAssessment)) throw new TypeError('Malformed proposal input.'); const analysisRecord = clonedAnalysis as Partial | feedback-or-error, input | long-or-dense, technical-or-internal |
| src/engine/proposalComparison.ts:156:55 | text | Cannot clone a malformed proposal. | feedback-or-error | — |
| src/engine/proposalComparison.ts:162:57 | text | Cannot clone a malformed comparison. | feedback-or-error | — |
| src/engine/proposalComparison.ts:172:18 | text | A안 | feedback-or-error | repeated-text |
| src/engine/proposalComparison.ts:172:36 | text | B안 | feedback-or-error | repeated-text |
| src/engine/proposalComparison.ts:172:63 | text | Proposal label must be A안 or B안. | feedback-or-error | — |
| src/engine/proposalComparison.ts:176:103 | text | Malformed proposal input. | feedback-or-error, input | — |
| src/engine/proposalComparison.ts:177:70 | text | ; const city = analysisRecord !== null && typeof analysisRecord === 'object' && typeof analysisRecord.cityId === 'string' && own(CITIES, analysisRecord.cityId) ? CITIES[analysisRecord.cityId as keyof typeof CITIES] : undefined; const mission = analysisRecord !== null && typeof analysisRecord === 'object' && typeof analysisRecord.missionId === 'string' && own(MISSIONS, analysisRecord.missionId) ? MISSIONS[analysisRecord.missionId as keyof typeof MISSIONS] : undefined; if (city === undefined \|\| mission === undefined \|\| !validatePlacementAnalysis(city, mission, clonedPlacements, clonedAnalysis)) throw new TypeError('Analysis does not match the proposal.'); const proposal: ProposalSnapshot = { id: LABEL_TO_ID[label as 'A안' \| 'B안'], label, placements: clonedPlacements as FacilityPlacement[], analysis: clonedAnalysis as PlacementAnalysis, assessment: clonedAssessment as ProposalAssessment, }; return freezeDeep(proposal); } const uniqueZoneRows = (metrics: AccessMetrics): Map | feedback-or-error | long-or-dense, technical-or-internal |
| src/engine/proposalComparison.ts:182:152 | text | Analysis does not match the proposal. | feedback-or-error | — |
| src/engine/proposalComparison.ts:184:31 | text | A안 | learner-text-candidate | repeated-text |
| src/engine/proposalComparison.ts:184:38 | text | B안 | learner-text-candidate | repeated-text |
| src/engine/proposalComparison.ts:193:82 | text | { const rows = metrics.zoneTravel; if (!isStrictArray(rows)) throw new TypeError('Malformed zone travel rows.'); const result = new Map | feedback-or-error | long-or-dense |
| src/engine/proposalComparison.ts:195:50 | text | Malformed zone travel rows. | feedback-or-error | — |
| src/engine/proposalComparison.ts:198:41 | text | object | feedback-or-error | repeated-text |
| src/engine/proposalComparison.ts:198:75 | text | string | feedback-or-error | repeated-text |
| src/engine/proposalComparison.ts:198:131 | text | Missing or duplicate zone row. | feedback-or-error | — |
| src/engine/proposalComparison.ts:199:66 | text | number | feedback-or-error | — |
| src/engine/proposalComparison.ts:199:134 | text | Malformed travel value. | feedback-or-error | — |
| src/engine/proposalComparison.ts:208:85 | text | Proposal IDs and labels must be distinct. | feedback-or-error | missing-term-explanation, technical-or-internal |
| src/engine/proposalComparison.ts:209:22 | text | proposal-a | feedback-or-error | repeated-text |
| src/engine/proposalComparison.ts:209:52 | text | proposal-b | feedback-or-error | repeated-text |
| src/engine/proposalComparison.ts:209:86 | text | A안 | feedback-or-error | repeated-text |
| src/engine/proposalComparison.ts:209:111 | text | B안 | feedback-or-error | repeated-text |
| src/engine/proposalComparison.ts:209:139 | text | Proposals must be compared in A then B order. | feedback-or-error | — |
| src/engine/proposalComparison.ts:210:137 | text | Proposals must share a mission context. | feedback-or-error | — |
| src/engine/proposalComparison.ts:213:145 | text | An alternative must change the placement. | feedback-or-error | — |
| src/engine/proposalComparison.ts:216:123 | text | Proposal zone rows do not match. | feedback-or-error | — |
| src/engine/shortestPath.test.ts:32:49 | text | A | feedback-or-error | repeated-text |
| src/engine/shortestPath.test.ts:32:58 | text | B | feedback-or-error | repeated-text |
| src/engine/shortestPath.test.ts:32:79 | text | A | feedback-or-error | repeated-text |
| src/engine/shortestPath.test.ts:32:84 | text | A | feedback-or-error | repeated-text |
| src/engine/shortestPath.ts:36:51 | text | { for (const edge of edges) { if (edge === null \|\| typeof edge !== 'object') { throw new TypeError('Road edges must be objects.'); } if (typeof edge.from !== 'string' \|\| edge.from.length === 0 \|\| typeof edge.to !== 'string' \|\| edge.to.length === 0) { throw new TypeError('Road endpoints must be non-empty node IDs.'); } if (!Number.isInteger(edge.travelUnits) \|\| edge.travelUnits | feedback-or-error | long-or-dense, technical-or-internal |
| src/engine/shortestPath.ts:39:28 | text | Road edges must be objects. | feedback-or-error | — |
| src/engine/shortestPath.ts:42:28 | text | Road endpoints must be non-empty node IDs. | feedback-or-error | missing-term-explanation, technical-or-internal |
| src/engine/shortestPath.ts:45:29 | text | Road travelUnits must be a positive integer. | feedback-or-error | — |
| src/engine/validatePlacementAnalysis.test.ts:39:7 | text | rejects %s without throwing | learner-text-candidate | — |
| src/engine/validatePlacementAnalysis.test.ts:49:47 | text | accessor | feedback-or-error | repeated-text |
| src/engine/validatePlacementAnalysis.test.ts:69:41 | text | top | learner-text-candidate | — |
| src/engine/validatePlacementAnalysis.test.ts:69:60 | text | nested | learner-text-candidate | — |
| src/engine/validatePlacementAnalysis.test.ts:69:87 | text | placement | learner-text-candidate | repeated-text |
| src/engine/validatePlacementAnalysis.test.ts:69:118 | text | index | learner-text-candidate | — |
| src/engine/validatePlacementAnalysis.test.ts:70:65 | text | bookmaru-library | learner-text-candidate | repeated-text |
| src/features/analysis/AccessMetrics.tsx:7:81 | text | void; includeEvidence?: boolean; currentAction?: GuidedActionId; } const metricLabel: Record | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/analysis/AccessMetrics.tsx:13:13 | text | 평균 이동 단위 | learner-text-candidate | repeated-text |
| src/features/analysis/AccessMetrics.tsx:14:13 | text | 가장 긴 이동 단위 | learner-text-candidate | repeated-text |
| src/features/analysis/AccessMetrics.tsx:15:17 | text | 도달 불가 | learner-text-candidate | repeated-text |
| src/features/analysis/AccessMetrics.tsx:21:37 | text | ${zone.name} (${zone.peopleTokens}명 토큰) | learner-text-candidate | — |
| src/features/analysis/AccessMetrics.tsx:24:87 | text | 계산 불가 | learner-text-candidate | repeated-text |
| src/features/analysis/AccessMetrics.tsx:24:97 | text | ${oneDecimal ? value.toFixed(1) : value} 가상 단위 | learner-text-candidate | — |
| src/features/analysis/AccessMetrics.tsx:25:47 | text | title === '전체 주민 접근' ? 'overall' : title === '이동이 어려운 구역' ? 'mobility' : title.includes('개별') ? `facility-${title.includes('도서관') ? 'library' : 'health'}` : 'nearest'; export function EvidenceButton({ metricId, label, value, detail, onInspectMetric, guided = false, }: { metricId: LearningEvidence['inspectedMetricIds'][number]; label: string; value: string; detail: string; onInspectMetric: AccessMetricsProps['onInspectMetric']; guided?: boolean; }) { return ( | heading, button-or-action | long-or-dense, technical-or-internal |
| src/features/analysis/AccessMetrics.tsx:25:59 | text | 전체 주민 접근 | heading | repeated-text |
| src/features/analysis/AccessMetrics.tsx:25:72 | text | overall | heading | — |
| src/features/analysis/AccessMetrics.tsx:25:94 | text | 이동이 어려운 구역 | heading | repeated-text |
| src/features/analysis/AccessMetrics.tsx:25:109 | text | mobility | heading | — |
| src/features/analysis/AccessMetrics.tsx:25:137 | text | 개별 | heading | — |
| src/features/analysis/AccessMetrics.tsx:25:145 | text | facility-${title.includes('도서관') ? 'library' : 'health'} | heading | long-or-dense |
| src/features/analysis/AccessMetrics.tsx:25:206 | text | nearest | heading | — |
| src/features/analysis/AccessMetrics.tsx:46:20 | text | ${label}: ${value} | learner-text-candidate | — |
| src/features/analysis/AccessMetrics.tsx:47:26 | text | metric-detail-${metricId} | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/features/analysis/AccessMetrics.tsx:54:94 | text | {guided && | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/features/analysis/AccessMetrics.tsx:55:75 | text | 먼저 확인 | learner-text-candidate | — |
| src/features/analysis/AccessMetrics.tsx:63:8 | text | 없음 | learner-text-candidate | repeated-text |
| src/features/analysis/AccessMetrics.tsx:66:8 | text | 없음 | learner-text-candidate | repeated-text |
| src/features/analysis/AccessMetrics.tsx:68:24 | text | 도달 ${metrics.reachablePeopleTokens} / 전체 ${metrics.totalPeopleTokens}명 토큰 | learner-text-candidate | long-or-dense |
| src/features/analysis/AccessMetrics.tsx:78:7 | text | ); return ( | heading | — |
| src/features/analysis/AccessMetrics.tsx:82:66 | text | access-${slug}-heading | heading | — |
| src/features/analysis/AccessMetrics.tsx:83:53 | text | {includeEvidence && ( | heading | technical-or-internal |
| src/features/analysis/AccessMetrics.tsx:85:74 | text | ${title} 핵심 결과 | learner-text-candidate | — |
| src/features/analysis/AccessMetrics.tsx:85:91 | text | {card('average', units(metrics.populationWeightedAverage, true), denominator)} {card('maximum', units(metrics.longestReachableTravel), `가장 불리한 도달 가능 구역: ${worst}`)} {card('unreachable', `${metrics.unreachableZoneIds.length}개 구역`, `별도 표시: ${unreachable}`)} | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/analysis/AccessMetrics.tsx:87:68 | text | 가장 불리한 도달 가능 구역: ${worst} | learner-text-candidate | — |
| src/features/analysis/AccessMetrics.tsx:88:33 | text | ${metrics.unreachableZoneIds.length}개 구역 | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/features/analysis/AccessMetrics.tsx:88:77 | text | 별도 표시: ${unreachable} | learner-text-candidate | — |
| src/features/analysis/AccessMetrics.tsx:91:56 | text | ${title} 자세히 보기 | learner-text-candidate | — |
| src/features/analysis/AccessMetrics.tsx:92:18 | text | 이 결과를 자세히 읽기 | learner-text-candidate | — |
| src/features/analysis/AccessMetrics.tsx:94:22 | text | 평균 이동 단위: | learner-text-candidate | — |
| src/features/analysis/AccessMetrics.tsx:94:100 | text | 가장 긴 이동 단위: | learner-text-candidate | — |
| src/features/analysis/AccessMetrics.tsx:95:22 | text | 사람 토큰 분모: | learner-text-candidate | repeated-text |
| src/features/analysis/AccessMetrics.tsx:96:22 | text | 가장 불리한 구역: | learner-text-candidate | repeated-text |
| src/features/analysis/AccessMetrics.tsx:97:22 | text | 도달 불가 구역: | learner-text-candidate | — |
| src/features/analysis/AccessMetrics.tsx:97:113 | text | 0 ? ` — ${unreachable}` : ' (없음)'} | learner-text-candidate | — |
| src/features/analysis/AccessMetrics.tsx:97:141 | text | (없음) | learner-text-candidate | — |
| src/features/analysis/AccessMetrics.tsx:101:59 | text | 도달 불가 구역은 평균에서 숨기지 않고 따로 표시했습니다 | learner-text-candidate | — |
| src/features/analysis/AccessMetrics.tsx:110:16 | text | {caption} 확인 | learner-text-candidate | — |
| src/features/analysis/AccessMetrics.tsx:114:38 | text | 구역 | learner-text-candidate | repeated-text |
| src/features/analysis/AccessMetrics.tsx:114:61 | text | 노드 경로 | learner-text-candidate | repeated-text |
| src/features/analysis/AccessMetrics.tsx:114:87 | text | 이동 단위 | learner-text-candidate | repeated-text |
| src/features/analysis/AccessMetrics.tsx:114:113 | text | 도달 상태 | learner-text-candidate | repeated-text |
| src/features/analysis/AccessMetrics.tsx:118:19 | text | {row.pathNodeIds.length === 0 ? '경로 없음' : row.pathNodeIds.join(' → ')} | learner-text-candidate | long-or-dense, repeated-text, technical-or-internal |
| src/features/analysis/AccessMetrics.tsx:118:52 | text | 경로 없음 | learner-text-candidate | repeated-text |
| src/features/analysis/AccessMetrics.tsx:119:19 | text | {row.travelUnits === null ? '도달 불가' : `${row.travelUnits} 가상 단위`} | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/analysis/AccessMetrics.tsx:119:48 | text | 도달 불가 | learner-text-candidate | repeated-text |
| src/features/analysis/AccessMetrics.tsx:119:58 | text | ${row.travelUnits} 가상 단위 | learner-text-candidate | — |
| src/features/analysis/AccessMetrics.tsx:120:19 | text | {row.travelUnits === null ? '도달 불가' : '도달 가능'} | learner-text-candidate | repeated-text, technical-or-internal |
| src/features/analysis/AccessMetrics.tsx:120:48 | text | 도달 불가 | learner-text-candidate | repeated-text |
| src/features/analysis/AccessMetrics.tsx:120:58 | text | 도달 가능 | learner-text-candidate | repeated-text |
| src/features/analysis/AccessMetrics.tsx:130:33 | text | 없음 | learner-text-candidate | repeated-text |
| src/features/analysis/CalculationBasis.tsx:10:74 | text | 도달 불가 | learner-text-candidate | repeated-text |
| src/features/analysis/CalculationBasis.tsx:10:84 | text | ${units} 가상 단위 | learner-text-candidate | — |
| src/features/analysis/CalculationBasis.tsx:18:32 | text | { const id = `calculation-label-${index}`; return ( | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/analysis/CalculationBasis.tsx:21:50 | text | ${row.label}-${index} | learner-text-candidate | — |
| src/features/analysis/CalculationBasis.tsx:38:16 | text | 구역별 이동 경로 확인 | learner-text-candidate | repeated-text |
| src/features/analysis/CalculationBasis.tsx:41:20 | text | 구역별 이동 경로 — 가장 가까운 시설 기준 | learner-text-candidate | repeated-text |
| src/features/analysis/CalculationBasis.tsx:43:33 | text | 구역 | learner-text-candidate | repeated-text |
| src/features/analysis/CalculationBasis.tsx:43:56 | text | 노드 경로 | learner-text-candidate | repeated-text |
| src/features/analysis/CalculationBasis.tsx:43:82 | text | 이동 단위 | learner-text-candidate | repeated-text |
| src/features/analysis/CalculationBasis.tsx:43:108 | text | 도달 상태 | learner-text-candidate | repeated-text |
| src/features/analysis/CalculationBasis.tsx:49:21 | text | {row.pathNodeIds.length === 0 ? '경로 없음' : row.pathNodeIds.join(' → ')} | learner-text-candidate | long-or-dense, repeated-text, technical-or-internal |
| src/features/analysis/CalculationBasis.tsx:49:54 | text | 경로 없음 | learner-text-candidate | repeated-text |
| src/features/analysis/CalculationBasis.tsx:51:21 | text | {row.travelUnits === null ? '도달 불가' : '도달 가능'} | learner-text-candidate | repeated-text, technical-or-internal |
| src/features/analysis/CalculationBasis.tsx:51:50 | text | 도달 불가 | learner-text-candidate | repeated-text |
| src/features/analysis/CalculationBasis.tsx:51:60 | text | 도달 가능 | learner-text-candidate | repeated-text |
| src/features/analysis/CalculationBasis.tsx:57:15 | text | ); } export function CalculationBasis({ city, analysis }: CalculationBasisProps) { const rows = explainCalculation(analysis, city); return ( | heading | long-or-dense |
| src/features/analysis/CalculationBasis.tsx:64:61 | text | calculation-basis-heading | heading | — |
| src/features/analysis/CalculationBasis.tsx:65:42 | text | 계산 근거 | heading | — |
| src/features/analysis/ImpactAnalysis.combined.test.tsx:8:40 | text | combined-review | learner-text-candidate | repeated-text |
| src/features/analysis/ImpactAnalysis.combined.test.tsx:8:75 | text | 복합 심의 | learner-text-candidate | — |
| src/features/analysis/ImpactAnalysis.combined.test.tsx:8:100 | text | library | learner-text-candidate | repeated-text |
| src/features/analysis/ImpactAnalysis.combined.test.tsx:8:111 | text | health-support | learner-text-candidate | repeated-text |
| src/features/analysis/ImpactAnalysis.combined.test.tsx:8:138 | text | library | learner-text-candidate | repeated-text |
| src/features/analysis/ImpactAnalysis.combined.test.tsx:8:150 | text | health-support | learner-text-candidate | repeated-text |
| src/features/analysis/ImpactAnalysis.combined.test.tsx:19:37 | text | heading | heading | repeated-text |
| src/features/analysis/ImpactAnalysis.combined.test.tsx:19:56 | text | 시설 역할별 접근 결과 | heading | repeated-text |
| src/features/analysis/ImpactAnalysis.combined.test.tsx:19:82 | text | section | heading | repeated-text |
| src/features/analysis/ImpactAnalysis.combined.test.tsx:21:47 | text | heading | heading | repeated-text |
| src/features/analysis/ImpactAnalysis.combined.test.tsx:21:66 | text | 도서관 개별 접근 | heading | — |
| src/features/analysis/ImpactAnalysis.combined.test.tsx:21:89 | text | section | heading | repeated-text |
| src/features/analysis/ImpactAnalysis.combined.test.tsx:22:46 | text | heading | heading, hint | repeated-text |
| src/features/analysis/ImpactAnalysis.combined.test.tsx:22:65 | text | 건강 도움소 개별 접근 | heading, hint | — |
| src/features/analysis/ImpactAnalysis.combined.test.tsx:22:91 | text | section | heading, hint | repeated-text |
| src/features/analysis/ImpactAnalysis.combined.test.tsx:23:47 | text | heading | heading | repeated-text |
| src/features/analysis/ImpactAnalysis.combined.test.tsx:23:66 | text | 가장 가까운 시설 기준 | heading | repeated-text |
| src/features/analysis/ImpactAnalysis.combined.test.tsx:23:92 | text | section | heading | repeated-text |
| src/features/analysis/ImpactAnalysis.combined.test.tsx:27:40 | text | 평균 이동 단위: 2.8 가상 단위 | learner-text-candidate | repeated-text |
| src/features/analysis/ImpactAnalysis.combined.test.tsx:28:40 | text | 가장 긴 이동 단위: 3 가상 단위 | learner-text-candidate | repeated-text |
| src/features/analysis/ImpactAnalysis.combined.test.tsx:29:40 | text | 도달 4 / 전체 4명 토큰 | learner-text-candidate | repeated-text |
| src/features/analysis/ImpactAnalysis.combined.test.tsx:30:40 | text | 가장 불리한 구역: C 구역 (3명 토큰) | learner-text-candidate | — |
| src/features/analysis/ImpactAnalysis.combined.test.tsx:31:40 | text | 도달 불가 구역: 0개 (없음) | learner-text-candidate | — |
| src/features/analysis/ImpactAnalysis.combined.test.tsx:32:39 | text | 평균 이동 단위: 계산 불가 | learner-text-candidate | — |
| src/features/analysis/ImpactAnalysis.combined.test.tsx:33:39 | text | 가장 긴 이동 단위: 계산 불가 | learner-text-candidate | — |
| src/features/analysis/ImpactAnalysis.combined.test.tsx:34:39 | text | 도달 0 / 전체 4명 토큰 | learner-text-candidate | — |
| src/features/analysis/ImpactAnalysis.combined.test.tsx:35:39 | text | 가장 불리한 구역: A 구역 (1명 토큰), C 구역 (3명 토큰) | learner-text-candidate | — |
| src/features/analysis/ImpactAnalysis.combined.test.tsx:36:39 | text | 도달 불가 구역: 2개 — A 구역 (1명 토큰), C 구역 (3명 토큰) | learner-text-candidate | — |
| src/features/analysis/ImpactAnalysis.combined.test.tsx:37:40 | text | 평균 이동 단위: 2.8 가상 단위 | learner-text-candidate | repeated-text |
| src/features/analysis/ImpactAnalysis.combined.test.tsx:38:40 | text | 가장 긴 이동 단위: 3 가상 단위 | learner-text-candidate | repeated-text |
| src/features/analysis/ImpactAnalysis.combined.test.tsx:39:40 | text | 도달 4 / 전체 4명 토큰 | learner-text-candidate | repeated-text |
| src/features/analysis/ImpactAnalysis.combined.test.tsx:42:9 | text | 도서관 개별 접근 경로 | learner-text-candidate | — |
| src/features/analysis/ImpactAnalysis.combined.test.tsx:42:26 | text | A 구역A → B2 가상 단위도달 가능 | learner-text-candidate | repeated-text |
| src/features/analysis/ImpactAnalysis.combined.test.tsx:42:51 | text | C 구역C → B3 가상 단위도달 가능 | learner-text-candidate | repeated-text |
| src/features/analysis/ImpactAnalysis.combined.test.tsx:43:9 | text | 건강 도움소 개별 접근 경로 | hint | — |
| src/features/analysis/ImpactAnalysis.combined.test.tsx:43:29 | text | A 구역경로 없음도달 불가도달 불가 | hint | — |
| src/features/analysis/ImpactAnalysis.combined.test.tsx:43:52 | text | C 구역경로 없음도달 불가도달 불가 | hint | — |
| src/features/analysis/ImpactAnalysis.combined.test.tsx:44:9 | text | 가장 가까운 시설 기준 접근 경로 | learner-text-candidate | repeated-text |
| src/features/analysis/ImpactAnalysis.combined.test.tsx:44:32 | text | A 구역A → B2 가상 단위도달 가능 | learner-text-candidate | repeated-text |
| src/features/analysis/ImpactAnalysis.combined.test.tsx:44:57 | text | C 구역C → B3 가상 단위도달 가능 | learner-text-candidate | repeated-text |
| src/features/analysis/ImpactAnalysis.combined.test.tsx:46:44 | text | ${caption} 확인 | learner-text-candidate | — |
| src/features/analysis/ImpactAnalysis.combined.test.tsx:54:47 | text | 구역별 이동 경로 — 가장 가까운 시설 기준 | learner-text-candidate | repeated-text |
| src/features/analysis/ImpactAnalysis.invalid.test.tsx:19:7 | text | accessor | feedback-or-error | repeated-text |
| src/features/analysis/ImpactAnalysis.invalid.test.tsx:19:103 | text | slotId | feedback-or-error | missing-term-explanation, technical-or-internal |
| src/features/analysis/ImpactAnalysis.invalid.test.tsx:19:144 | text | accessor | feedback-or-error | repeated-text |
| src/features/analysis/ImpactAnalysis.invalid.test.tsx:20:7 | text | fails closed for %s placements | learner-text-candidate | — |
| src/features/analysis/ImpactAnalysis.invalid.test.tsx:20:63 | text | { render( | learner-text-candidate | repeated-text |
| src/features/analysis/ImpactAnalysis.invalid.test.tsx:22:30 | text | heading | heading | repeated-text |
| src/features/analysis/ImpactAnalysis.invalid.test.tsx:22:49 | text | 영향 분석실 | heading | abstract-or-formal, repeated-text |
| src/features/analysis/ImpactAnalysis.invalid.test.tsx:23:30 | text | button | button-or-action | repeated-text |
| src/features/analysis/ImpactAnalysis.invalid.test.tsx:23:48 | text | 영향 계산 | button-or-action | repeated-text |
| src/features/analysis/ImpactAnalysis.invalid.test.tsx:24:58 | text | 미션·도시·시설 배치 자료가 올바르지 않아 결과를 표시할 수 없습니다. | learner-text-candidate | — |
| src/features/analysis/ImpactAnalysis.invalid.test.tsx:30:78 | text | ); expect(screen.getByRole('alert')).toHaveTextContent('아직 계산 전입니다'); expect(screen.getByRole('button', { name: '영향 계산' })).toBeEnabled(); const malformed = { ...valid, placements: null } as unknown as PlacementAnalysis; rerender( | button-or-action | long-or-dense, multiple-actions, technical-or-internal |
| src/features/analysis/ImpactAnalysis.invalid.test.tsx:31:58 | text | 아직 계산 전입니다 | learner-text-candidate | — |
| src/features/analysis/ImpactAnalysis.invalid.test.tsx:32:30 | text | button | button-or-action | repeated-text |
| src/features/analysis/ImpactAnalysis.invalid.test.tsx:32:48 | text | 영향 계산 | button-or-action | repeated-text |
| src/features/analysis/ImpactAnalysis.invalid.test.tsx:35:64 | text | ); expect(screen.getByRole('alert')).toHaveTextContent('현재 배치와 일치하는 새 분석이 아닙니다'); expect(screen.queryByText(/평균 이동 단위:/)).not.toBeInTheDocument(); const fabricated = { ...valid, nearestFacilityAccess: { ...valid.nearestFacilityAccess, populationWeightedAverage: 999 } }; rerender( | learner-text-candidate | abstract-or-formal, long-or-dense, technical-or-internal |
| src/features/analysis/ImpactAnalysis.invalid.test.tsx:36:58 | text | 현재 배치와 일치하는 새 분석이 아닙니다 | learner-text-candidate | abstract-or-formal, repeated-text |
| src/features/analysis/ImpactAnalysis.invalid.test.tsx:40:65 | text | ); expect(screen.getByRole('alert')).toHaveTextContent('현재 배치와 일치하는 새 분석이 아닙니다'); expect(screen.queryByText('999')).not.toBeInTheDocument(); const missingFacility = { ...valid, perFacility: {} }; rerender( | learner-text-candidate | abstract-or-formal, long-or-dense, technical-or-internal |
| src/features/analysis/ImpactAnalysis.invalid.test.tsx:41:58 | text | 현재 배치와 일치하는 새 분석이 아닙니다 | learner-text-candidate | abstract-or-formal, repeated-text |
| src/features/analysis/ImpactAnalysis.invalid.test.tsx:46:58 | text | 현재 배치와 일치하는 새 분석이 아닙니다 | learner-text-candidate | abstract-or-formal, repeated-text |
| src/features/analysis/ImpactAnalysis.invalid.test.tsx:61:60 | text | 현재 배치와 일치하는 새 분석이 아닙니다 | learner-text-candidate | abstract-or-formal, repeated-text |
| src/features/analysis/ImpactAnalysis.invalid.test.tsx:70:30 | text | button | button-or-action | repeated-text |
| src/features/analysis/ImpactAnalysis.invalid.test.tsx:70:48 | text | 영향 계산 | button-or-action | repeated-text |
| src/features/analysis/ImpactAnalysis.mobile.test.tsx:37:56 | text | 선택 위치 | learner-text-candidate | repeated-text |
| src/features/analysis/ImpactAnalysis.mobile.test.tsx:38:54 | text | 결과표 | learner-text-candidate | repeated-text |
| src/features/analysis/ImpactAnalysis.mobile.test.tsx:52:37 | text | 선택 위치 | learner-text-candidate | repeated-text |
| src/features/analysis/ImpactAnalysis.mobile.test.tsx:53:39 | text | 결과표 | learner-text-candidate | repeated-text |
| src/features/analysis/ImpactAnalysis.mobile.test.tsx:54:35 | text | 선택 위치 | learner-text-candidate | repeated-text |
| src/features/analysis/ImpactAnalysis.mobile.test.tsx:55:40 | text | 결과표 | learner-text-candidate | repeated-text |
| src/features/analysis/ImpactAnalysis.mobile.test.tsx:56:32 | text | 선택 위치 | learner-text-candidate | repeated-text |
| src/features/analysis/ImpactAnalysis.mobile.test.tsx:57:33 | text | 결과표 | learner-text-candidate | repeated-text |
| src/features/analysis/ImpactAnalysis.mobile.test.tsx:59:76 | text | 결과표 | learner-text-candidate | repeated-text |
| src/features/analysis/ImpactAnalysis.mobile.test.tsx:61:48 | text | 결과표 | learner-text-candidate | repeated-text |
| src/features/analysis/ImpactAnalysis.mobile.test.tsx:63:30 | text | tabpanel | learner-text-candidate | — |
| src/features/analysis/ImpactAnalysis.mobile.test.tsx:63:50 | text | 결과표 | learner-text-candidate | repeated-text |
| src/features/analysis/ImpactAnalysis.mobile.test.tsx:63:76 | text | aria-labelledby | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/features/analysis/ImpactAnalysis.mobile.test.tsx:63:95 | text | results-tab | learner-text-candidate | repeated-text |
| src/features/analysis/ImpactAnalysis.mobile.test.tsx:70:50 | text | 결과표 | learner-text-candidate | repeated-text |
| src/features/analysis/ImpactAnalysis.mobile.test.tsx:78:48 | text | 선택 위치 | learner-text-candidate | repeated-text |
| src/features/analysis/ImpactAnalysis.mobile.test.tsx:79:48 | text | 결과표 | learner-text-candidate | repeated-text |
| src/features/analysis/ImpactAnalysis.test.tsx:21:220 | text | ); const resident = screen.getByRole('button', { name: '주민 관점표로 이동' }); expect(resident).toBeDisabled(); expect(resident).toHaveAttribute('aria-describedby', 'resident-view-help'); expect(screen.getByText('두 결과 카드를 눌러 확인하세요.')).toBeInTheDocument(); expect(screen.getAllByRole('button', { name: /평균 이동 단위/ })[0]).toHaveAttribute('data-guided', 'true'); expect(screen.getAllByRole('button', { name: /가장 긴 이동 단위/ })[0]).toHaveAttribute('data-guided', 'true'); expect(screen.getAllByRole('button', { name: /평균 이동 단위/ })[0]).toHaveClass('gi-pulse'); expect(screen.getAllByRole('button', { name: /가장 긴 이동 단위/ })[0]).toHaveClass('gi-pulse'); rerender( | button-or-action, hint | long-or-dense, multiple-actions, technical-or-internal |
| src/features/analysis/ImpactAnalysis.test.tsx:22:40 | text | button | button-or-action | repeated-text |
| src/features/analysis/ImpactAnalysis.test.tsx:22:58 | text | 주민 관점표로 이동 | button-or-action | repeated-text |
| src/features/analysis/ImpactAnalysis.test.tsx:25:30 | text | 두 결과 카드를 눌러 확인하세요. | learner-text-candidate | multiple-actions, repeated-text |
| src/features/analysis/ImpactAnalysis.test.tsx:26:33 | text | button | button-or-action | repeated-text |
| src/features/analysis/ImpactAnalysis.test.tsx:26:85 | text | data-guided | button-or-action | missing-term-explanation, repeated-text, technical-or-internal |
| src/features/analysis/ImpactAnalysis.test.tsx:26:100 | text | true | button-or-action | repeated-text |
| src/features/analysis/ImpactAnalysis.test.tsx:27:33 | text | button | button-or-action | repeated-text |
| src/features/analysis/ImpactAnalysis.test.tsx:27:87 | text | data-guided | button-or-action | missing-term-explanation, repeated-text, technical-or-internal |
| src/features/analysis/ImpactAnalysis.test.tsx:27:102 | text | true | button-or-action | repeated-text |
| src/features/analysis/ImpactAnalysis.test.tsx:28:33 | text | button | button-or-action | repeated-text |
| src/features/analysis/ImpactAnalysis.test.tsx:28:81 | text | gi-pulse | button-or-action | repeated-text |
| src/features/analysis/ImpactAnalysis.test.tsx:29:33 | text | button | button-or-action | repeated-text |
| src/features/analysis/ImpactAnalysis.test.tsx:29:83 | text | gi-pulse | button-or-action | repeated-text |
| src/features/analysis/ImpactAnalysis.test.tsx:31:30 | text | button | button-or-action | repeated-text |
| src/features/analysis/ImpactAnalysis.test.tsx:31:48 | text | 주민 관점표로 이동 | button-or-action | repeated-text |
| src/features/analysis/ImpactAnalysis.test.tsx:38:39 | text | heading | heading | repeated-text |
| src/features/analysis/ImpactAnalysis.test.tsx:38:58 | text | 기존 시설 중복 | heading | repeated-text |
| src/features/analysis/ImpactAnalysis.test.tsx:38:80 | text | section | heading | repeated-text |
| src/features/analysis/ImpactAnalysis.test.tsx:39:35 | text | heading | heading | repeated-text |
| src/features/analysis/ImpactAnalysis.test.tsx:39:54 | text | 서비스 공백 | heading | repeated-text |
| src/features/analysis/ImpactAnalysis.test.tsx:39:74 | text | section | heading | repeated-text |
| src/features/analysis/ImpactAnalysis.test.tsx:40:40 | text | 없음 | learner-text-candidate | repeated-text |
| src/features/analysis/ImpactAnalysis.test.tsx:42:36 | text | 없음 | learner-text-candidate | repeated-text |
| src/features/analysis/ImpactAnalysis.test.tsx:49:30 | text | heading | heading | repeated-text |
| src/features/analysis/ImpactAnalysis.test.tsx:49:49 | text | 영향 분석실 | heading | abstract-or-formal, repeated-text |
| src/features/analysis/ImpactAnalysis.test.tsx:50:39 | text | heading | heading | repeated-text |
| src/features/analysis/ImpactAnalysis.test.tsx:50:58 | text | 전체 주민 접근 | heading | repeated-text |
| src/features/analysis/ImpactAnalysis.test.tsx:50:80 | text | section | heading | repeated-text |
| src/features/analysis/ImpactAnalysis.test.tsx:52:57 | text | 전체 주민 접근 자세히 보기 | learner-text-candidate | — |
| src/features/analysis/ImpactAnalysis.test.tsx:53:40 | text | button | button-or-action | repeated-text |
| src/features/analysis/ImpactAnalysis.test.tsx:53:58 | text | 평균 이동 단위: 2.8 가상 단위 | button-or-action | repeated-text |
| src/features/analysis/ImpactAnalysis.test.tsx:54:40 | text | button | button-or-action | repeated-text |
| src/features/analysis/ImpactAnalysis.test.tsx:54:58 | text | 가장 긴 이동 단위: 3 가상 단위 | button-or-action | repeated-text |
| src/features/analysis/ImpactAnalysis.test.tsx:55:40 | text | 사람 토큰 분모: | learner-text-candidate | repeated-text |
| src/features/analysis/ImpactAnalysis.test.tsx:55:86 | text | 도달 4 / 전체 5명 토큰 | learner-text-candidate | — |
| src/features/analysis/ImpactAnalysis.test.tsx:58:40 | text | 가장 불리한 구역: | learner-text-candidate | repeated-text |
| src/features/analysis/ImpactAnalysis.test.tsx:58:87 | text | D 구역 (1명 토큰) | learner-text-candidate | — |
| src/features/analysis/ImpactAnalysis.test.tsx:60:30 | text | heading | heading | repeated-text |
| src/features/analysis/ImpactAnalysis.test.tsx:60:49 | text | 위험 | heading | repeated-text |
| src/features/analysis/ImpactAnalysis.test.tsx:61:30 | text | heading | heading | repeated-text |
| src/features/analysis/ImpactAnalysis.test.tsx:61:49 | text | 비용 | heading | repeated-text |
| src/features/analysis/ImpactAnalysis.test.tsx:62:30 | text | heading | heading | repeated-text |
| src/features/analysis/ImpactAnalysis.test.tsx:62:49 | text | 기존 시설 중복 | heading | repeated-text |
| src/features/analysis/ImpactAnalysis.test.tsx:63:30 | text | heading | heading | repeated-text |
| src/features/analysis/ImpactAnalysis.test.tsx:63:49 | text | 서비스 공백 | heading | repeated-text |
| src/features/analysis/ImpactAnalysis.test.tsx:66:52 | text | 평균 이동 단위 | learner-text-candidate | repeated-text |
| src/features/analysis/ImpactAnalysis.test.tsx:67:23 | text | 구역별 이동 경로 확인 | learner-text-candidate | repeated-text |
| src/features/analysis/ImpactAnalysis.test.tsx:70:54 | text | 구역 | learner-text-candidate | repeated-text |
| src/features/analysis/ImpactAnalysis.test.tsx:71:54 | text | 노드 경로 | learner-text-candidate | repeated-text |
| src/features/analysis/ImpactAnalysis.test.tsx:74:44 | text | A 구역A → B2 가상 단위도달 가능 | learner-text-candidate | repeated-text |
| src/features/analysis/ImpactAnalysis.test.tsx:75:44 | text | C 구역C → B3 가상 단위도달 가능 | learner-text-candidate | repeated-text |
| src/features/analysis/ImpactAnalysis.test.tsx:76:44 | text | D 구역경로 없음도달 불가도달 불가 | learner-text-candidate | — |
| src/features/analysis/ImpactAnalysis.test.tsx:80:68 | text | ({ ...zone, name: zone.id === 'z1' ? '이동 어려움 구역' : zone.name })) }; const mission = { ...tinyMission, id: 'health-help-center' as const, title: '건강 도움소', facilityKinds: ['health-support' as const] }; const healthPlacement = { slotId: 'health-support-1', facilityKind: 'health-support' as const, candidateId: 'candidate-b' }; const analysis = analyzePlacement(city, mission, [healthPlacement]); const onInspectMetric = vi.fn(); render( | hint | long-or-dense, technical-or-internal |
| src/features/analysis/ImpactAnalysis.test.tsx:80:107 | text | 이동 어려움 구역 | learner-text-candidate | — |
| src/features/analysis/ImpactAnalysis.test.tsx:81:44 | text | health-help-center | hint | repeated-text |
| src/features/analysis/ImpactAnalysis.test.tsx:81:82 | text | 건강 도움소 | hint | repeated-text |
| src/features/analysis/ImpactAnalysis.test.tsx:81:108 | text | health-support | hint | repeated-text |
| src/features/analysis/ImpactAnalysis.test.tsx:86:42 | text | button | button-or-action | repeated-text |
| src/features/analysis/ImpactAnalysis.test.tsx:92:40 | text | heading | heading | repeated-text |
| src/features/analysis/ImpactAnalysis.test.tsx:92:59 | text | 이동이 어려운 구역 | heading | repeated-text |
| src/features/analysis/ImpactAnalysis.test.tsx:92:83 | text | section | heading | repeated-text |
| src/features/analysis/ImpactAnalysis.test.tsx:94:41 | text | 평균 이동 단위: 2.0 가상 단위 | learner-text-candidate | — |
| src/features/analysis/ImpactAnalysis.test.tsx:95:41 | text | 가장 긴 이동 단위: 2 가상 단위 | learner-text-candidate | — |
| src/features/analysis/ImpactAnalysis.test.tsx:96:41 | text | 도달 1 / 전체 1명 토큰 | learner-text-candidate | — |
| src/features/analysis/ImpactAnalysis.test.tsx:97:41 | text | 사람 토큰 분모 | learner-text-candidate | — |
| src/features/analysis/ImpactAnalysis.test.tsx:103:41 | text | button | button-or-action | repeated-text |
| src/features/analysis/ImpactAnalysis.test.tsx:103:59 | text | 영향 계산 | button-or-action | repeated-text |
| src/features/analysis/ImpactAnalysis.test.tsx:108:59 | text | 영향 계산이 완료되었습니다. 평균, 가장 긴 이동, 도달 불가, 위험, 비용을 함께 확인하세요. | learner-text-candidate | multiple-actions, repeated-text |
| src/features/analysis/ImpactAnalysis.test.tsx:111:7 | text | shows risk kind and label separately from exact per-site cost and budget | learner-text-candidate | long-or-dense |
| src/features/analysis/ImpactAnalysis.test.tsx:111:87 | text | { const riskyPlacement = { ...placement, candidateId: 'candidate-risk' }; const analysis = analyzePlacement(tinyCity, tinyMission, [riskyPlacement]); render( | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/analysis/ImpactAnalysis.test.tsx:115:36 | text | heading | heading | repeated-text |
| src/features/analysis/ImpactAnalysis.test.tsx:115:55 | text | 위험 | heading | repeated-text |
| src/features/analysis/ImpactAnalysis.test.tsx:115:71 | text | section | heading | repeated-text |
| src/features/analysis/ImpactAnalysis.test.tsx:116:36 | text | heading | heading | repeated-text |
| src/features/analysis/ImpactAnalysis.test.tsx:116:55 | text | 비용 | heading | repeated-text |
| src/features/analysis/ImpactAnalysis.test.tsx:116:71 | text | section | heading | repeated-text |
| src/features/analysis/ImpactAnalysis.test.tsx:119:37 | text | button | button-or-action | repeated-text |
| src/features/analysis/ImpactAnalysis.test.tsx:119:55 | text | 위험: 1곳 | button-or-action | repeated-text |
| src/features/analysis/ImpactAnalysis.test.tsx:120:37 | text | water-ponding · 물 고임 · 물 고임 표지 | learner-text-candidate | — |
| src/features/analysis/ImpactAnalysis.test.tsx:121:37 | text | button | button-or-action | repeated-text |
| src/features/analysis/ImpactAnalysis.test.tsx:121:55 | text | 비용: 3 / 3 토큰 | button-or-action | repeated-text |
| src/features/analysis/ImpactAnalysis.test.tsx:122:37 | text | 터 candidate-risk 3토큰 | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/features/analysis/ImpactAnalysis.test.tsx:123:52 | text | 예산 | learner-text-candidate | repeated-text |
| src/features/analysis/ImpactAnalysis.test.tsx:123:79 | text | 3 / 3 토큰 | learner-text-candidate | — |
| src/features/analysis/ImpactAnalysis.test.tsx:131:39 | text | heading | heading | repeated-text |
| src/features/analysis/ImpactAnalysis.test.tsx:131:58 | text | 전체 주민 접근 | heading | repeated-text |
| src/features/analysis/ImpactAnalysis.test.tsx:131:80 | text | section | heading | repeated-text |
| src/features/analysis/ImpactAnalysis.test.tsx:132:36 | text | heading | heading | repeated-text |
| src/features/analysis/ImpactAnalysis.test.tsx:132:55 | text | 위험 | heading | repeated-text |
| src/features/analysis/ImpactAnalysis.test.tsx:132:71 | text | section | heading | repeated-text |
| src/features/analysis/ImpactAnalysis.test.tsx:133:36 | text | heading | heading | repeated-text |
| src/features/analysis/ImpactAnalysis.test.tsx:133:55 | text | 비용 | heading | repeated-text |
| src/features/analysis/ImpactAnalysis.test.tsx:133:71 | text | section | heading | repeated-text |
| src/features/analysis/ImpactAnalysis.test.tsx:135:36 | text | button | button-or-action | repeated-text |
| src/features/analysis/ImpactAnalysis.test.tsx:135:54 | text | 평균 이동 단위: 1.3 가상 단위 | button-or-action | — |
| src/features/analysis/ImpactAnalysis.test.tsx:135:80 | text | average | button-or-action | repeated-text |
| src/features/analysis/ImpactAnalysis.test.tsx:136:36 | text | button | button-or-action | repeated-text |
| src/features/analysis/ImpactAnalysis.test.tsx:136:54 | text | 가장 긴 이동 단위: 5 가상 단위 | button-or-action | — |
| src/features/analysis/ImpactAnalysis.test.tsx:136:80 | text | maximum | button-or-action | repeated-text |
| src/features/analysis/ImpactAnalysis.test.tsx:137:36 | text | button | button-or-action | repeated-text |
| src/features/analysis/ImpactAnalysis.test.tsx:137:54 | text | 도달 불가: 0개 구역 | button-or-action | — |
| src/features/analysis/ImpactAnalysis.test.tsx:137:73 | text | unreachable | button-or-action | repeated-text |
| src/features/analysis/ImpactAnalysis.test.tsx:138:33 | text | button | button-or-action | repeated-text |
| src/features/analysis/ImpactAnalysis.test.tsx:138:51 | text | 위험: 1곳 | button-or-action | repeated-text |
| src/features/analysis/ImpactAnalysis.test.tsx:138:64 | text | risk | button-or-action | repeated-text |
| src/features/analysis/ImpactAnalysis.test.tsx:139:33 | text | button | button-or-action | repeated-text |
| src/features/analysis/ImpactAnalysis.test.tsx:139:51 | text | 비용: 3 / 3 토큰 | button-or-action | repeated-text |
| src/features/analysis/ImpactAnalysis.test.tsx:139:70 | text | cost | button-or-action | repeated-text |
| src/features/analysis/ImpactAnalysis.test.tsx:158:45 | text | 선택 위치 | learner-text-candidate | repeated-text |
| src/features/analysis/ImpactAnalysis.test.tsx:159:45 | text | 결과표 | learner-text-candidate | repeated-text |
| src/features/analysis/ImpactAnalysis.test.tsx:160:33 | text | 현재 선택 좌표: B | learner-text-candidate | — |
| src/features/analysis/ImpactAnalysis.test.tsx:168:88 | text | definition | learner-text-candidate | — |
| src/features/analysis/ImpactAnalysis.test.tsx:169:30 | text | heading | heading | repeated-text |
| src/features/analysis/ImpactAnalysis.test.tsx:170:30 | text | heading | heading, hint | repeated-text |
| src/features/analysis/ImpactAnalysis.test.tsx:171:30 | text | heading | heading | repeated-text |
| src/features/analysis/ImpactAnalysis.test.tsx:171:49 | text | 가장 가까운 시설 기준 | heading | repeated-text |
| src/features/analysis/ImpactAnalysis.tsx:21:25 | text | void; canOpenResident?: boolean; currentAction?: GuidedActionId; } type TabId = 'selection' \| 'results'; const tabOrder: readonly TabId[] = ['selection', 'results']; const facilityLabels: Record | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/analysis/ImpactAnalysis.tsx:30:13 | text | 도서관 | learner-text-candidate | repeated-text |
| src/features/analysis/ImpactAnalysis.tsx:31:22 | text | 건강 도움소 | hint | repeated-text |
| src/features/analysis/ImpactAnalysis.tsx:32:22 | text | 생활문화센터 | learner-text-candidate | repeated-text |
| src/features/analysis/ImpactAnalysis.tsx:53:11 | text | 배치한 시설 | heading | — |
| src/features/analysis/ImpactAnalysis.tsx:54:37 | text | 아직 배치한 시설이 없습니다. | learner-text-candidate | — |
| src/features/analysis/ImpactAnalysis.tsx:58:47 | text | {facilityLabels[placement.facilityKind]}: {candidate?.name ?? '확인할 수 없는 후보'} ({candidate?.coordinate.label ?? '좌표 없음'}) {candidate !== undefined && | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/analysis/ImpactAnalysis.tsx:59:78 | text | 확인할 수 없는 후보 | learner-text-candidate | — |
| src/features/analysis/ImpactAnalysis.tsx:59:126 | text | 좌표 없음 | learner-text-candidate | repeated-text |
| src/features/analysis/ImpactAnalysis.tsx:66:11 | text | ); } function ConstraintSection({ analysis, city, onInspectMetric, }: { analysis: PlacementAnalysis; city: CityScenario; onInspectMetric: ImpactAnalysisProps['onInspectMetric']; }) { const riskKindLabels: Record | learner-text-candidate | long-or-dense |
| src/features/analysis/ImpactAnalysis.tsx:79:53 | text | water-ponding | learner-text-candidate | repeated-text |
| src/features/analysis/ImpactAnalysis.tsx:79:70 | text | 물 고임 | learner-text-candidate | — |
| src/features/analysis/ImpactAnalysis.tsx:79:78 | text | steep-slope | learner-text-candidate | repeated-text |
| src/features/analysis/ImpactAnalysis.tsx:79:93 | text | 급경사 | learner-text-candidate | repeated-text |
| src/features/analysis/ImpactAnalysis.tsx:84:13 | text | ${site.name} (${marker.kind} · ${riskKindLabels[marker.kind] ?? marker.kind} · ${marker.label}) | learner-text-candidate | long-or-dense |
| src/features/analysis/ImpactAnalysis.tsx:87:53 | text | candidate.id === placement.candidateId); return site === undefined ? placement.candidateId : `${site.name} ${site.costTokens}토큰`; }); return ( | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/analysis/ImpactAnalysis.tsx:88:58 | text | ${site.name} ${site.costTokens}토큰 | learner-text-candidate | repeated-text |
| src/features/analysis/ImpactAnalysis.tsx:92:63 | text | risk-heading | heading | — |
| src/features/analysis/ImpactAnalysis.tsx:93:31 | text | 위험 | heading | repeated-text |
| src/features/analysis/ImpactAnalysis.tsx:94:48 | text | 위험 | learner-text-candidate | repeated-text |
| src/features/analysis/ImpactAnalysis.tsx:94:86 | text | 적용 없음 | learner-text-candidate | abstract-or-formal |
| src/features/analysis/ImpactAnalysis.tsx:94:96 | text | ${riskySites.length}곳 | learner-text-candidate | — |
| src/features/analysis/ImpactAnalysis.tsx:94:155 | text | 위험 표지가 없는 배치입니다. | learner-text-candidate | — |
| src/features/analysis/ImpactAnalysis.tsx:94:176 | text | 위험 표지가 있는 터: ${riskySites.join(', ')} | learner-text-candidate | — |
| src/features/analysis/ImpactAnalysis.tsx:95:12 | text | {riskySites.length === 0 ? '위험 표지 적용 없음' : `위험 표지: ${riskySites.join(', ')}`} | learner-text-candidate | abstract-or-formal, long-or-dense |
| src/features/analysis/ImpactAnalysis.tsx:95:40 | text | 위험 표지 적용 없음 | learner-text-candidate | abstract-or-formal |
| src/features/analysis/ImpactAnalysis.tsx:95:56 | text | 위험 표지: ${riskySites.join(', ')} | learner-text-candidate | — |
| src/features/analysis/ImpactAnalysis.tsx:97:63 | text | cost-heading | heading | — |
| src/features/analysis/ImpactAnalysis.tsx:98:31 | text | 비용 | heading | repeated-text |
| src/features/analysis/ImpactAnalysis.tsx:99:48 | text | 비용 | learner-text-candidate | repeated-text |
| src/features/analysis/ImpactAnalysis.tsx:99:60 | text | ${analysis.totalCostTokens} / ${analysis.missionContext.budgetTokens} 토큰 | learner-text-candidate | long-or-dense, repeated-text |
| src/features/analysis/ImpactAnalysis.tsx:99:165 | text | 비용 자료 없음 | learner-text-candidate | repeated-text |
| src/features/analysis/ImpactAnalysis.tsx:100:12 | text | {costs.length === 0 ? '비용 자료 없음' : `배치 비용: ${costs.join(', ')}`} | learner-text-candidate | long-or-dense |
| src/features/analysis/ImpactAnalysis.tsx:100:35 | text | 비용 자료 없음 | learner-text-candidate | repeated-text |
| src/features/analysis/ImpactAnalysis.tsx:100:48 | text | 배치 비용: ${costs.join(', ')} | learner-text-candidate | — |
| src/features/analysis/ImpactAnalysis.tsx:102:63 | text | overlap-heading | heading | — |
| src/features/analysis/ImpactAnalysis.tsx:103:34 | text | 기존 시설 중복 | heading | repeated-text |
| src/features/analysis/ImpactAnalysis.tsx:104:12 | text | {analysis.overlapZoneIds.length === 0 ? '없음' : | learner-text-candidate | technical-or-internal |
| src/features/analysis/ImpactAnalysis.tsx:104:53 | text | 없음 | learner-text-candidate | repeated-text |
| src/features/analysis/ImpactAnalysis.tsx:104:61 | text | {analysis.overlapZoneIds.length}곳: | learner-text-candidate | technical-or-internal |
| src/features/analysis/ImpactAnalysis.tsx:106:63 | text | gap-heading | heading | — |
| src/features/analysis/ImpactAnalysis.tsx:107:30 | text | 서비스 공백 | heading | repeated-text |
| src/features/analysis/ImpactAnalysis.tsx:108:12 | text | {analysis.coverageGapZoneIds.length === 0 ? '없음' : | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/analysis/ImpactAnalysis.tsx:108:57 | text | 없음 | learner-text-candidate | repeated-text |
| src/features/analysis/ImpactAnalysis.tsx:108:65 | text | {analysis.coverageGapZoneIds.length}곳: | learner-text-candidate | technical-or-internal |
| src/features/analysis/ImpactAnalysis.tsx:123:63 | text | facility-role-heading | heading | — |
| src/features/analysis/ImpactAnalysis.tsx:124:38 | text | 시설 역할별 접근 결과 | heading | repeated-text |
| src/features/analysis/ImpactAnalysis.tsx:125:46 | text | { const metrics = analysis.perFacility[placement.slotId]; if (metrics === undefined) return null; const facilityName = facilityLabels[placement.facilityKind]; return ( | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/analysis/ImpactAnalysis.tsx:131:36 | text | ${facilityName} 개별 접근 | learner-text-candidate | — |
| src/features/analysis/ImpactAnalysis.tsx:132:70 | text | ${facilityName} 개별 접근 경로 | learner-text-candidate | — |
| src/features/analysis/ImpactAnalysis.tsx:137:31 | title | 가장 가까운 시설 기준 | title | repeated-text |
| src/features/analysis/ImpactAnalysis.tsx:138:88 | text | 가장 가까운 시설 기준 접근 경로 | learner-text-candidate | repeated-text |
| src/features/analysis/ImpactAnalysis.tsx:156:49 | text | 아직 계산 전입니다. 시설 배치가 완성되면 영향 계산을 눌러 주세요. | learner-text-candidate | multiple-actions |
| src/features/analysis/ImpactAnalysis.tsx:157:56 | text | 현재 배치와 일치하는 새 분석이 아닙니다. 영향 계산을 다시 눌러 주세요. | learner-text-candidate | abstract-or-formal, multiple-actions |
| src/features/analysis/ImpactAnalysis.tsx:160:29 | title | 전체 주민 접근 | title | repeated-text |
| src/features/analysis/ImpactAnalysis.tsx:161:93 | title | 이동이 어려운 구역 | title | repeated-text |
| src/features/analysis/ImpactAnalysis.tsx:184:52 | text | ('results'); const [announcement, setAnnouncement] = useState(''); const [error, setError] = useState(''); const isNarrow = useNarrowLayout(); const reducedMotion = useReducedMotion(); const tabRefs = useRef | feedback-or-error | long-or-dense, technical-or-internal |
| src/features/analysis/ImpactAnalysis.tsx:189:66 | text | ({ selection: null, results: null }); const cityRecord = city !== null && typeof city === 'object' ? city as CityScenario : null; const missionRecord = mission !== null && typeof mission === 'object' ? mission as MissionDefinition : null; const validContext = isValidImpactContext(city, mission, placements); if (!validContext \|\| cityRecord === null \|\| missionRecord === null) { return ( | heading | long-or-dense, technical-or-internal |
| src/features/analysis/ImpactAnalysis.tsx:195:33 | text | impact-analysis-heading | heading | repeated-text |
| src/features/analysis/ImpactAnalysis.tsx:196:42 | text | 영향 분석실 | heading | abstract-or-formal, repeated-text |
| src/features/analysis/ImpactAnalysis.tsx:197:25 | text | 미션·도시·시설 배치 자료가 올바르지 않아 결과를 표시할 수 없습니다. 심의 접수에서 다시 확인해 주세요. | learner-text-candidate | long-or-dense, repeated-text |
| src/features/analysis/ImpactAnalysis.tsx:198:122 | text | 영향 계산 | learner-text-candidate | repeated-text |
| src/features/analysis/ImpactAnalysis.tsx:205:8 | text | 먼저 영향 계산을 완료하세요. | learner-text-candidate | — |
| src/features/analysis/ImpactAnalysis.tsx:207:10 | text | 현재 배치와 맞는 새 분석을 먼저 계산하세요. | learner-text-candidate | abstract-or-formal |
| src/features/analysis/ImpactAnalysis.tsx:209:12 | text | 두 결과 카드를 눌러 확인하세요. | learner-text-candidate | multiple-actions, repeated-text |
| src/features/analysis/ImpactAnalysis.tsx:210:12 | text | 평균과 가장 긴 이동 결과를 확인했습니다. | learner-text-candidate | — |
| src/features/analysis/ImpactAnalysis.tsx:214:17 | text | 미션·도시·시설 배치 자료가 올바르지 않아 영향 계산을 할 수 없습니다. | feedback-or-error | — |
| src/features/analysis/ImpactAnalysis.tsx:221:24 | text | 영향 계산이 완료되었습니다. 평균, 가장 긴 이동, 도달 불가, 위험, 비용을 함께 확인하세요. | learner-text-candidate | multiple-actions, repeated-text |
| src/features/analysis/ImpactAnalysis.tsx:223:17 | text | 영향 계산을 완료하지 못했습니다. 배치 자료를 다시 확인해 주세요. | feedback-or-error | multiple-actions, shaming-tone |
| src/features/analysis/ImpactAnalysis.tsx:226:38 | text | { setActiveTab(tab); tabRefs.current[tab]?.focus(); }; const onTabKeyDown = (event: KeyboardEvent | learner-text-candidate | long-or-dense |
| src/features/analysis/ImpactAnalysis.tsx:230:84 | text | { const index = tabOrder.indexOf(current); let next = index; if (event.key === 'ArrowRight' \|\| event.key === 'ArrowDown') next = (index + 1) % tabOrder.length; if (event.key === 'ArrowLeft' \|\| event.key === 'ArrowUp') next = (index + tabOrder.length - 1) % tabOrder.length; if (event.key === 'Home') next = 0; if (event.key === 'End') next = tabOrder.length - 1; if (next !== index \|\| event.key === 'Home' \|\| event.key === 'End') { event.preventDefault(); activateTab(tabOrder[next] ?? current); } }; return ( | heading | long-or-dense |
| src/features/analysis/ImpactAnalysis.tsx:244:31 | text | impact-analysis-heading | heading | repeated-text |
| src/features/analysis/ImpactAnalysis.tsx:245:40 | text | 영향 분석실 | heading | abstract-or-formal, repeated-text |
| src/features/analysis/ImpactAnalysis.tsx:248:41 | text | 미션·도시·시설 배치 자료가 올바르지 않아 결과를 표시할 수 없습니다. 심의 접수에서 다시 확인해 주세요. | learner-text-candidate | long-or-dense, repeated-text |
| src/features/analysis/ImpactAnalysis.tsx:249:166 | text | 영향 계산 | learner-text-candidate | repeated-text |
| src/features/analysis/ImpactAnalysis.tsx:256:8 | text | 주민 관점표로 이동 | button-or-action | repeated-text |
| src/features/analysis/ImpactAnalysis.tsx:257:56 | text | {error && | feedback-or-error, hint | — |
| src/features/analysis/ImpactAnalysis.tsx:259:35 | text | polite | instruction | repeated-text |
| src/features/analysis/ImpactAnalysis.tsx:259:71 | text | 영향 계산 안내: ${announcement} | instruction | — |
| src/features/analysis/ImpactAnalysis.tsx:259:101 | text | 영향 계산 안내 | instruction | repeated-text |
| src/features/analysis/ImpactAnalysis.tsx:260:128 | text | candidate.id === placement.candidateId)?.coordinate.label ?? '선택 없음').join(', ') \|\| '선택 없음'} | learner-text-candidate | long-or-dense, multiple-actions, technical-or-internal |
| src/features/analysis/ImpactAnalysis.tsx:260:191 | text | 선택 없음 | learner-text-candidate | repeated-text |
| src/features/analysis/ImpactAnalysis.tsx:260:214 | text | 선택 없음 | learner-text-candidate | repeated-text |
| src/features/analysis/ImpactAnalysis.tsx:260:225 | text | {isNarrow && ( | learner-text-candidate | — |
| src/features/analysis/ImpactAnalysis.tsx:263:65 | aria-label | 영향 분석 표현 선택 | aria-label | abstract-or-formal, repeated-text |
| src/features/analysis/ImpactAnalysis.tsx:264:153 | text | selection | button-or-action | repeated-text |
| src/features/analysis/ImpactAnalysis.tsx:264:180 | text | selection-panel | button-or-action | — |
| src/features/analysis/ImpactAnalysis.tsx:264:222 | text | selection | button-or-action | repeated-text |
| src/features/analysis/ImpactAnalysis.tsx:264:272 | text | selection | button-or-action | repeated-text |
| src/features/analysis/ImpactAnalysis.tsx:264:328 | text | selection | button-or-action | repeated-text |
| src/features/analysis/ImpactAnalysis.tsx:264:341 | text | 선택 위치 | button-or-action | repeated-text |
| src/features/analysis/ImpactAnalysis.tsx:265:149 | text | results | button-or-action | repeated-text |
| src/features/analysis/ImpactAnalysis.tsx:265:174 | text | results-panel | button-or-action | — |
| src/features/analysis/ImpactAnalysis.tsx:265:214 | text | results | button-or-action | repeated-text |
| src/features/analysis/ImpactAnalysis.tsx:265:262 | text | results | button-or-action | repeated-text |
| src/features/analysis/ImpactAnalysis.tsx:265:316 | text | results | button-or-action | repeated-text |
| src/features/analysis/ImpactAnalysis.tsx:265:327 | text | 결과표 | button-or-action | repeated-text |
| src/features/analysis/ImpactAnalysis.tsx:269:38 | text | {isNarrow ? ( | learner-text-candidate | — |
| src/features/analysis/ImpactAnalysis.tsx:271:70 | text | selection-tab | learner-text-candidate | — |
| src/features/analysis/ImpactAnalysis.tsx:271:108 | text | selection | learner-text-candidate | repeated-text |
| src/features/analysis/ImpactAnalysis.tsx:275:72 | text | selection-heading | heading | — |
| src/features/analysis/ImpactAnalysis.tsx:276:40 | text | 선택 위치 | heading | repeated-text |
| src/features/analysis/ImpactAnalysis.tsx:278:21 | text | )} {isNarrow ? ( | learner-text-candidate | — |
| src/features/analysis/ImpactAnalysis.tsx:281:68 | text | results-tab | learner-text-candidate | repeated-text |
| src/features/analysis/ImpactAnalysis.tsx:281:104 | text | results | learner-text-candidate | repeated-text |
| src/features/analysis/ImpactAnalysis.tsx:285:70 | text | results-heading | heading | — |
| src/features/analysis/ImpactAnalysis.tsx:286:38 | text | 결과표 | heading | repeated-text |
| src/features/city-data/CityDataRoom.test.tsx:22:66 | text | 미션 선택 | learner-text-candidate | repeated-text |
| src/features/city-data/CityDataRoom.test.tsx:24:38 | text | button | button-or-action | repeated-text |
| src/features/city-data/CityDataRoom.test.tsx:24:56 | text | 도시 자료실로 이동 | button-or-action | repeated-text |
| src/features/city-data/CityDataRoom.test.tsx:34:46 | text | 후보지 있음 | learner-text-candidate | — |
| src/features/city-data/CityDataRoom.test.tsx:35:50 | text | 비용 | learner-text-candidate | repeated-text |
| src/features/city-data/CityDataRoom.test.tsx:36:48 | text | aria-label | learner-text-candidate | missing-term-explanation, repeated-text, technical-or-internal |
| src/features/city-data/CityDataRoom.test.tsx:36:86 | text | 빗물 고임 | learner-text-candidate | repeated-text |
| src/features/city-data/CityDataRoom.test.tsx:37:48 | text | aria-label | learner-text-candidate | missing-term-explanation, repeated-text, technical-or-internal |
| src/features/city-data/CityDataRoom.test.tsx:37:86 | text | 기존 시설 | learner-text-candidate | repeated-text |
| src/features/city-data/CityDataRoom.test.tsx:40:7 | text | offers a mobile table hint and a collapsible legend | hint | — |
| src/features/city-data/CityDataRoom.test.tsx:40:66 | text | { render( | hint | repeated-text |
| src/features/city-data/CityDataRoom.test.tsx:42:30 | text | 모바일에서는 표를 좌우로 밀어 더 보기 | learner-text-candidate | repeated-text |
| src/features/city-data/CityDataRoom.test.tsx:43:30 | text | 켜진 자료층 범례 | learner-text-candidate | repeated-text |
| src/features/city-data/CityDataRoom.test.tsx:54:54 | text | 표 보기 | learner-text-candidate | repeated-text |
| src/features/city-data/CityDataRoom.test.tsx:57:54 | text | 지도 보기 | learner-text-candidate | repeated-text |
| src/features/city-data/CityDataRoom.test.tsx:68:39 | text | button | button-or-action | repeated-text |
| src/features/city-data/CityDataRoom.test.tsx:68:57 | text | 자료층 확인 | button-or-action | repeated-text |
| src/features/city-data/CityDataRoom.test.tsx:74:82 | text | 5개 중 2개 확인 | learner-text-candidate | repeated-text |
| src/features/city-data/CityDataRoom.test.tsx:88:82 | text | 5개 중 2개 확인 | learner-text-candidate | repeated-text |
| src/features/city-data/CityDataRoom.test.tsx:95:22 | text | 인구 | learner-text-candidate | repeated-text |
| src/features/city-data/CityDataRoom.test.tsx:95:28 | text | 도로·이동 단위 | learner-text-candidate | repeated-text |
| src/features/city-data/CityDataRoom.test.tsx:95:40 | text | 가상 위험 표지 | learner-text-candidate | repeated-text |
| src/features/city-data/CityDataRoom.test.tsx:95:52 | text | 후보지 비용 | learner-text-candidate | repeated-text |
| src/features/city-data/CityDataRoom.test.tsx:95:62 | text | 기존 시설 | learner-text-candidate | repeated-text |
| src/features/city-data/CityDataRoom.test.tsx:96:64 | text | checkbox | learner-text-candidate | repeated-text |
| src/features/city-data/CityDataRoom.test.tsx:103:82 | text | 5개 중 5개 확인 | learner-text-candidate | repeated-text |
| src/features/city-data/CityDataRoom.test.tsx:104:30 | text | button | button-or-action | repeated-text |
| src/features/city-data/CityDataRoom.test.tsx:104:48 | text | 자료층 확인 | button-or-action | repeated-text |
| src/features/city-data/CityDataRoom.test.tsx:111:82 | text | 5개 중 5개 확인 | learner-text-candidate | repeated-text |
| src/features/city-data/CityDataRoom.test.tsx:112:30 | text | button | button-or-action | repeated-text |
| src/features/city-data/CityDataRoom.test.tsx:112:48 | text | 자료층 확인 | button-or-action | repeated-text |
| src/features/city-data/CityDataRoom.test.tsx:120:40 | text | button | button-or-action | repeated-text |
| src/features/city-data/CityDataRoom.test.tsx:120:58 | text | 자료층 확인 | button-or-action | repeated-text |
| src/features/city-data/CityDataRoom.test.tsx:122:48 | text | 후보 배치판 | learner-text-candidate | repeated-text |
| src/features/city-data/CityDataRoom.test.tsx:123:50 | text | 도시 자료실 | learner-text-candidate | repeated-text |
| src/features/city-data/CityDataRoom.test.tsx:130:39 | text | button | button-or-action | repeated-text |
| src/features/city-data/CityDataRoom.test.tsx:130:57 | text | 자료층 확인 | button-or-action | repeated-text |
| src/features/city-data/CityDataRoom.test.tsx:133:30 | text | button | button-or-action | repeated-text |
| src/features/city-data/CityDataRoom.test.tsx:133:48 | text | 심의 접수로 돌아가기 | button-or-action | repeated-text |
| src/features/city-data/CityDataRoom.test.tsx:135:60 | text | 인구 | learner-text-candidate | repeated-text |
| src/features/city-data/CityDataRoom.test.tsx:136:60 | text | 도로·이동 단위 | learner-text-candidate | repeated-text |
| src/features/city-data/CityDataRoom.test.tsx:151:30 | text | button | button-or-action | repeated-text |
| src/features/city-data/CityDataRoom.test.tsx:151:48 | text | 자료층 확인 | button-or-action | repeated-text |
| src/features/city-data/CityDataRoom.test.tsx:156:7 | text | provides a labeled keyboard grid with a single active descendant | learner-text-candidate | long-or-dense, missing-term-explanation, technical-or-internal |
| src/features/city-data/CityDataRoom.test.tsx:162:30 | text | 현재 좌표: A1 | learner-text-candidate | — |
| src/features/city-data/CityDataRoom.test.tsx:168:30 | text | 현재 좌표: B2 | learner-text-candidate | — |
| src/features/city-data/CityDataRoom.test.tsx:188:30 | text | 현재 선택 좌표: B2 | learner-text-candidate | repeated-text |
| src/features/city-data/CityDataRoom.test.tsx:198:55 | text | 표 보기 | learner-text-candidate | repeated-text |
| src/features/city-data/CityDataRoom.test.tsx:203:38 | text | 햇살 북쪽 구역 | learner-text-candidate | repeated-text |
| src/features/city-data/CityDataRoom.test.tsx:204:38 | text | 사람 토큰 5 | learner-text-candidate | repeated-text |
| src/features/city-data/CityDataRoom.test.tsx:205:38 | text | 도로 연결 | learner-text-candidate | — |
| src/features/city-data/CityDataRoom.test.tsx:206:38 | text | 기존 보장 시설 없음 | learner-text-candidate | repeated-text |
| src/features/city-data/CityDataRoom.test.tsx:207:38 | text | 후보지 없음 | learner-text-candidate | repeated-text |
| src/features/city-data/CityDataRoom.test.tsx:212:30 | text | 현재 선택 좌표: B2 | learner-text-candidate | repeated-text |
| src/features/city-data/CityDataRoom.test.tsx:217:60 | text | 가상 위험 표지 | learner-text-candidate | repeated-text |
| src/features/city-data/CityDataRoom.test.tsx:227:50 | text | 지도 보기 | learner-text-candidate | repeated-text |
| src/features/city-data/CityDataRoom.test.tsx:228:52 | text | 표 보기 | learner-text-candidate | repeated-text |
| src/features/city-data/CityDataRoom.test.tsx:230:55 | text | 표 보기 | learner-text-candidate | repeated-text |
| src/features/city-data/CityDataRoom.test.tsx:231:52 | text | 지도 보기 | learner-text-candidate | repeated-text |
| src/features/city-data/CityDataRoom.test.tsx:232:50 | text | 표 보기 | learner-text-candidate | repeated-text |
| src/features/city-data/CityDataRoom.test.tsx:237:53 | text | 지도 보기 | learner-text-candidate | repeated-text |
| src/features/city-data/CityDataRoom.test.tsx:238:55 | text | 표 보기 | learner-text-candidate | repeated-text |
| src/features/city-data/CityDataRoom.test.tsx:264:53 | text | 지도 보기 | learner-text-candidate | repeated-text |
| src/features/city-data/CityDataRoom.test.tsx:265:55 | text | 표 보기 | learner-text-candidate | repeated-text |
| src/features/city-data/CityDataRoom.test.tsx:359:7 | text | uses city-prefixed active IDs after city rerender and preserves selected state labels | learner-text-candidate | long-or-dense, missing-term-explanation, technical-or-internal |
| src/features/city-data/CityDataRoom.test.tsx:359:100 | text | { const { rerender } = render( | learner-text-candidate | repeated-text |
| src/features/city-data/CityDataRoom.test.tsx:373:63 | text | 물빛시(가상 도시) | learner-text-candidate | repeated-text |
| src/features/city-data/CityDataRoom.test.tsx:374:95 | text | 좌표 | learner-text-candidate | repeated-text |
| src/features/city-data/CityDataRoom.test.tsx:374:101 | text | 인구·기존 보장 | learner-text-candidate | repeated-text |
| src/features/city-data/CityDataRoom.test.tsx:374:113 | text | 도로·이동 단위 | learner-text-candidate | repeated-text |
| src/features/city-data/CityDataRoom.test.tsx:374:125 | text | 위험 표지 | learner-text-candidate | repeated-text |
| src/features/city-data/CityDataRoom.test.tsx:374:134 | text | 후보지·비용 | learner-text-candidate | repeated-text |
| src/features/city-data/CityDataRoom.test.tsx:374:144 | text | 기존 시설 | learner-text-candidate | repeated-text |
| src/features/city-data/CityDataRoom.test.tsx:377:40 | text | tbody tr[data-coordinate="${node.label}"] | learner-text-candidate | — |
| src/features/city-data/CityDataRoom.test.tsx:379:65 | text | td'); expect(cells).toHaveLength(6); expect(cells?.[0]).toHaveTextContent(node.label); expect(cells?.[1]).toHaveTextContent(/인구\|사람 토큰/); expect(cells?.[2]).toHaveTextContent(/도로 연결/); expect(cells?.[3]).toHaveTextContent(/위험 표지\|빗물 고임/); expect(cells?.[4]).toHaveTextContent(/후보지 없음\|비용/); expect(cells?.[5]).toHaveTextContent(/기존 시설/); } const a1 = screen.getByRole('row', { name: /A1/ }); expect(a1).toHaveTextContent('햇살 북쪽 구역'); expect(a1).toHaveTextContent('사람 토큰 5'); expect(a1).toHaveTextContent('이동이 불편할 수 있는 구역'); const d4 = screen.getByRole('row', { name: /D4/ }); expect(d4).toHaveTextContent('D4'); expect(d4).toHaveTextContent('느티마당 문화센터'); expect(d4).toHaveTextContent('기존 보장: 생활문화센터'); expect(d4).toHaveTextContent('도로 연결 있음'); const waterRisk = screen.getByRole('row', { name: /A4/ }); expect(waterRisk).toHaveTextContent('빗물 고임'); expect(waterRisk).toHaveTextContent('비가 오면 물이 고일 수 있는 표지'); for (const candidate of MULBIT_CITY.candidates) { const row = screen.getByRole('row', { name: new RegExp(candidate.coordinate.label) }); expect(row).toHaveTextContent(candidate.name); expect(row).toHaveTextContent(`비용 ${candidate.costTokens}단계`); expect(within(row).getByRole('radio', { name: new RegExp(candidate.name) })).toBeInTheDocument(); } expect(within(screen.getByRole('row', { name: /B2/ })).getByRole('radio')).toBeChecked(); cleanup(); render( | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/city-data/CityDataRoom.test.tsx:389:35 | text | 햇살 북쪽 구역 | learner-text-candidate | repeated-text |
| src/features/city-data/CityDataRoom.test.tsx:390:35 | text | 사람 토큰 5 | learner-text-candidate | repeated-text |
| src/features/city-data/CityDataRoom.test.tsx:391:35 | text | 이동이 불편할 수 있는 구역 | learner-text-candidate | — |
| src/features/city-data/CityDataRoom.test.tsx:394:35 | text | 느티마당 문화센터 | learner-text-candidate | repeated-text |
| src/features/city-data/CityDataRoom.test.tsx:395:35 | text | 기존 보장: 생활문화센터 | learner-text-candidate | — |
| src/features/city-data/CityDataRoom.test.tsx:396:35 | text | 도로 연결 있음 | learner-text-candidate | — |
| src/features/city-data/CityDataRoom.test.tsx:398:42 | text | 빗물 고임 | learner-text-candidate | repeated-text |
| src/features/city-data/CityDataRoom.test.tsx:399:42 | text | 비가 오면 물이 고일 수 있는 표지 | learner-text-candidate | repeated-text |
| src/features/city-data/CityDataRoom.test.tsx:401:37 | text | row | learner-text-candidate | repeated-text |
| src/features/city-data/CityDataRoom.test.tsx:403:38 | text | 비용 ${candidate.costTokens}단계 | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/features/city-data/CityDataRoom.test.tsx:410:41 | text | 급경사 | learner-text-candidate | repeated-text |
| src/features/city-data/CityDataRoom.test.tsx:411:41 | text | 경사가 가파른 표지 | learner-text-candidate | repeated-text |
| src/features/city-data/CityDataRoom.test.tsx:427:125 | text | ); const dots = screen.getByRole('gridcell', { name: /A1/ }).querySelector('[data-pattern="dots"]'); expect(dots).toHaveTextContent('●'); expect(dots).toHaveClass('pattern-dots'); const lines = screen.getByRole('gridcell', { name: /A1/ }).querySelector('[data-pattern="lines"]'); expect(lines).toHaveTextContent('↔'); expect(lines).toHaveClass('pattern-lines'); expect(screen.getByRole('gridcell', { name: /A4.*빗물 고임/ })).toHaveAttribute('data-pattern', 'waves'); const waves = screen.getByRole('gridcell', { name: /A4.*빗물 고임/ }).querySelector('[data-pattern="waves"]'); expect(waves).toHaveTextContent('≋'); expect(waves).toHaveClass('pattern-waves'); const ring = screen.getByRole('gridcell', { name: /B2/ }).querySelector('[data-pattern="ring"]'); expect(ring).toHaveClass('pattern-ring'); cleanup(); render( | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/city-data/CityDataRoom.test.tsx:450:44 | text | button | button-or-action | repeated-text |
| src/features/city-data/CityDataRoom.test.tsx:458:54 | text | 44px | button-or-action | — |
| src/features/city-data/CityDataRoom.tsx:12:80 | text | = [ { id: 'population', label: '인구', prompt: '사람 토큰이 있는 구역을 봅니다.' }, { id: 'roads', label: '도로·이동 단위', prompt: '도로 연결과 상대 이동 단위를 봅니다.' }, { id: 'risk', label: '가상 위험 표지', prompt: '빗물 고임·급경사 등 가상 위험 표지를 봅니다.' }, { id: 'cost', label: '후보지 비용', prompt: '후보지별 1~3단계 상대 예산 토큰을 봅니다.' }, { id: 'existing-facilities', label: '기존 시설', prompt: '이미 있는 시설과 서비스 공백을 봅니다.' }, ]; export interface CityDataRoomProps { currentAction?: GuidedActionId; } export function CityDataRoom({ currentAction = null }: CityDataRoomProps) { const { state, dispatch } = useSession(); const city = cityForId(state.cityId); const [viewMode, setViewMode] = useState | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/city-data/CityDataRoom.tsx:13:10 | text | population | learner-text-candidate | — |
| src/features/city-data/CityDataRoom.tsx:13:31 | text | 인구 | learner-text-candidate | repeated-text |
| src/features/city-data/CityDataRoom.tsx:13:45 | text | 사람 토큰이 있는 구역을 봅니다. | learner-text-candidate | — |
| src/features/city-data/CityDataRoom.tsx:14:10 | text | roads | learner-text-candidate | — |
| src/features/city-data/CityDataRoom.tsx:14:26 | text | 도로·이동 단위 | learner-text-candidate | repeated-text |
| src/features/city-data/CityDataRoom.tsx:14:46 | text | 도로 연결과 상대 이동 단위를 봅니다. | learner-text-candidate | — |
| src/features/city-data/CityDataRoom.tsx:15:10 | text | risk | learner-text-candidate | repeated-text |
| src/features/city-data/CityDataRoom.tsx:15:25 | text | 가상 위험 표지 | learner-text-candidate | repeated-text |
| src/features/city-data/CityDataRoom.tsx:15:45 | text | 빗물 고임·급경사 등 가상 위험 표지를 봅니다. | learner-text-candidate | — |
| src/features/city-data/CityDataRoom.tsx:16:10 | text | cost | learner-text-candidate | repeated-text |
| src/features/city-data/CityDataRoom.tsx:16:25 | text | 후보지 비용 | learner-text-candidate | repeated-text |
| src/features/city-data/CityDataRoom.tsx:16:43 | text | 후보지별 1~3단계 상대 예산 토큰을 봅니다. | learner-text-candidate | — |
| src/features/city-data/CityDataRoom.tsx:17:10 | text | existing-facilities | learner-text-candidate | repeated-text |
| src/features/city-data/CityDataRoom.tsx:17:40 | text | 기존 시설 | learner-text-candidate | repeated-text |
| src/features/city-data/CityDataRoom.tsx:17:57 | text | 이미 있는 시설과 서비스 공백을 봅니다. | learner-text-candidate | — |
| src/features/city-data/CityDataRoom.tsx:27:66 | text | new URLSearchParams(window.location.search).get('view') === 'table' ? 'table' : 'map'); const tabRefs = useRef | learner-text-candidate | long-or-dense |
| src/features/city-data/CityDataRoom.tsx:28:34 | text | map | learner-text-candidate | repeated-text |
| src/features/city-data/CityDataRoom.tsx:28:42 | text | table | learner-text-candidate | repeated-text |
| src/features/city-data/CityDataRoom.tsx:33:43 | text | candidate.id === state.selectedCandidateId)?.coordinate.label ?? '선택 없음' : '선택 없음'; const tabOrder: Array | learner-text-candidate | long-or-dense, multiple-actions, technical-or-internal |
| src/features/city-data/CityDataRoom.tsx:33:110 | text | 선택 없음 | learner-text-candidate | repeated-text |
| src/features/city-data/CityDataRoom.tsx:34:8 | text | 선택 없음 | learner-text-candidate | repeated-text |
| src/features/city-data/CityDataRoom.tsx:36:53 | text | { setViewMode(nextMode); tabRefs.current[nextMode]?.focus(); }; const handleTabKeyDown = (event: KeyboardEvent | learner-text-candidate | long-or-dense |
| src/features/city-data/CityDataRoom.tsx:40:84 | text | map | learner-text-candidate | repeated-text |
| src/features/city-data/CityDataRoom.tsx:40:92 | text | table | learner-text-candidate | repeated-text |
| src/features/city-data/CityDataRoom.tsx:40:102 | text | { const currentIndex = tabOrder.indexOf(currentMode); let nextIndex = currentIndex; if (event.key === 'ArrowRight' \|\| event.key === 'ArrowDown') nextIndex = (currentIndex + 1) % tabOrder.length; if (event.key === 'ArrowLeft' \|\| event.key === 'ArrowUp') nextIndex = (currentIndex + tabOrder.length - 1) % tabOrder.length; if (event.key === 'Home') nextIndex = 0; if (event.key === 'End') nextIndex = tabOrder.length - 1; if (nextIndex !== currentIndex \|\| event.key === 'Home' \|\| event.key === 'End') { event.preventDefault(); activateTab(tabOrder[nextIndex] ?? currentMode); } }; return ( | heading | long-or-dense |
| src/features/city-data/CityDataRoom.tsx:54:31 | text | stage-heading | heading | repeated-text |
| src/features/city-data/CityDataRoom.tsx:55:30 | text | 도시 자료실 | heading | repeated-text |
| src/features/city-data/CityDataRoom.tsx:56:10 | text | {city ? `${city.name}의 가상 자료를 확인합니다.` : '먼저 미션을 선택해 배정 도시를 정합니다.'} | learner-text-candidate | long-or-dense, multiple-actions |
| src/features/city-data/CityDataRoom.tsx:56:19 | text | ${city.name}의 가상 자료를 확인합니다. | learner-text-candidate | — |
| src/features/city-data/CityDataRoom.tsx:56:51 | text | 먼저 미션을 선택해 배정 도시를 정합니다. | learner-text-candidate | — |
| src/features/city-data/CityDataRoom.tsx:57:10 | text | 이 자료는 실제 도시가 아닌 가상 격자 모형이며, 색 하나만으로 의미를 판단하지 않습니다. | learner-text-candidate | — |
| src/features/city-data/CityDataRoom.tsx:60:17 | text | 확인할 자료층 | learner-text-candidate | repeated-text |
| src/features/city-data/CityDataRoom.tsx:76:35 | text | polite | learner-text-candidate | repeated-text |
| src/features/city-data/CityDataRoom.tsx:76:56 | text | 자료층 확인 상태: 5개 중 ${reviewedCount}개 확인 | learner-text-candidate | multiple-actions |
| src/features/city-data/CityDataRoom.tsx:76:95 | text | 5개 중 {reviewedCount}개 확인 | learner-text-candidate | — |
| src/features/city-data/CityDataRoom.tsx:77:75 | text | 지도와 표에서 후보지가 있는 칸을 확인하고, 놓을 위치를 선택해 보세요. | hint | multiple-actions |
| src/features/city-data/CityDataRoom.tsx:82:65 | text | {`현재 선택 좌표: ${selectedCoordinate}`} | learner-text-candidate | — |
| src/features/city-data/CityDataRoom.tsx:82:67 | text | 현재 선택 좌표: ${selectedCoordinate} | learner-text-candidate | — |
| src/features/city-data/CityDataRoom.tsx:83:65 | aria-label | 도시 자료 표현 선택 | aria-label | repeated-text |
| src/features/city-data/CityDataRoom.tsx:94:14 | text | 지도 보기 | button-or-action | repeated-text |
| src/features/city-data/CityDataRoom.tsx:105:14 | text | 표 보기 | button-or-action | repeated-text |
| src/features/city-data/CityDataRoom.tsx:106:17 | text | {viewMode === 'map' ? ( | learner-text-candidate | — |
| src/features/city-data/CityDataRoom.tsx:108:66 | text | map-tab | learner-text-candidate | — |
| src/features/city-data/CityDataRoom.tsx:108:87 | aria-label | 지도 보기 | aria-label | repeated-text |
| src/features/city-data/CityDataRoom.tsx:117:68 | text | table-tab | learner-text-candidate | — |
| src/features/city-data/CityDataRoom.tsx:117:91 | aria-label | 표 보기 | aria-label | repeated-text |
| src/features/city-data/CityDataRoom.tsx:129:138 | text | go-to-stage | learner-text-candidate | repeated-text |
| src/features/city-data/CityDataRoom.tsx:129:160 | text | placement | learner-text-candidate | repeated-text |
| src/features/city-data/CityDataRoom.tsx:129:175 | text | 자료층 확인 | learner-text-candidate | repeated-text |
| src/features/city-data/CityDataRoom.tsx:131:28 | text | {!validReviewContext && ( | learner-text-candidate | technical-or-internal |
| src/features/city-data/CityDataRoom.tsx:134:14 | text | 미션·배정 도시·우선순위가 확인되지 않아 자료층을 확정할 수 없습니다. 심의 접수에서 다시 선택해 주세요. | learner-text-candidate | long-or-dense, multiple-actions |
| src/features/city-data/CityDataRoom.tsx:135:66 | text | go-to-stage | button-or-action | repeated-text |
| src/features/city-data/CityDataRoom.tsx:135:88 | text | intake | button-or-action | — |
| src/features/city-data/CityDataRoom.tsx:135:100 | text | 심의 접수로 돌아가기 | button-or-action | repeated-text |
| src/features/city-data/CityDataRoom.tsx:138:48 | text | 서로 다른 자료층을 두 개 이상 켠 뒤 확인해 주세요. | learner-text-candidate | — |
| src/features/city-data/CityDataTable.tsx:9:30 | text | ${value} · ${emptyValue} 자료층이 꺼져 있음 | learner-text-candidate | — |
| src/features/city-data/CityDataTable.tsx:18:15 | text | ${String.fromCharCode(65 + (index % city.columns))}${Math.floor(index / city.columns) + 1} | learner-text-candidate | long-or-dense |
| src/features/city-data/CityDataTable.tsx:23:44 | text | 인구 구역 없음 | learner-text-candidate | — |
| src/features/city-data/CityDataTable.tsx:24:11 | text | ${data.zoneNames.join(', ')} · 사람 토큰 ${data.peopleTokens}${data.mobilityBarrier ? ' · 이동이 불편할 수 있는 구역' : ''} · ${data.coverageNames.length > 0 ? | learner-text-candidate | long-or-dense |
| src/features/city-data/CityDataTable.tsx:24:197 | text | : '기존 보장 시설 없음'} | learner-text-candidate | — |
| src/features/city-data/CityDataTable.tsx:29:8 | text | 도로 연결 있음 · 연결 이동 단위 ${data.roadUnits.join(', ')} | learner-text-candidate | — |
| src/features/city-data/CityDataTable.tsx:30:8 | text | 도로 연결 없음 | learner-text-candidate | repeated-text |
| src/features/city-data/CityDataTable.tsx:35:42 | text | `${kind === 'water-ponding' ? '≋ 빗물 고임' : '⌁ 급경사'} · ${data.riskLabels[index] ?? ''}`).join('; ') : '위험 표지 없음'; } export function CityDataTable({ city, activeLayerIds, selectedCandidateId, onSelectCandidate }: CityDataTableProps) { const coordinates = coordinateRows(city); return ( | hint | long-or-dense, technical-or-internal |
| src/features/city-data/CityDataTable.tsx:35:44 | text | ${kind === 'water-ponding' ? '≋ 빗물 고임' : '⌁ 급경사'} · ${data.riskLabels[index] ?? ''} | learner-text-candidate | long-or-dense |
| src/features/city-data/CityDataTable.tsx:36:8 | text | 위험 표지 없음 | learner-text-candidate | repeated-text |
| src/features/city-data/CityDataTable.tsx:45:20 | text | {city.name} 도시 자료 비교표 — 지도와 같은 가상 자료를 좌표별로 읽습니다. | learner-text-candidate | — |
| src/features/city-data/CityDataTable.tsx:48:31 | text | 좌표 | learner-text-candidate | repeated-text |
| src/features/city-data/CityDataTable.tsx:49:31 | text | 인구·기존 보장 | learner-text-candidate | repeated-text |
| src/features/city-data/CityDataTable.tsx:50:31 | text | 도로·이동 단위 | learner-text-candidate | repeated-text |
| src/features/city-data/CityDataTable.tsx:51:31 | text | 위험 표지 | learner-text-candidate | repeated-text |
| src/features/city-data/CityDataTable.tsx:52:31 | text | 후보지·비용 | learner-text-candidate | repeated-text |
| src/features/city-data/CityDataTable.tsx:53:31 | text | 기존 시설 | learner-text-candidate | repeated-text |
| src/features/city-data/CityDataTable.tsx:59:71 | text | candidate.coordinate.label === coordinate.label); return ( | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/city-data/CityDataTable.tsx:62:30 | text | row | learner-text-candidate | repeated-text |
| src/features/city-data/CityDataTable.tsx:63:23 | text | {layerValue(active(activeLayerIds, 'population'), populationText(data), '인구')} | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/city-data/CityDataTable.tsx:63:96 | text | 인구 | learner-text-candidate | repeated-text |
| src/features/city-data/CityDataTable.tsx:64:23 | text | {layerValue(active(activeLayerIds, 'roads'), roadText(data), '도로·이동 단위')} | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/city-data/CityDataTable.tsx:64:85 | text | 도로·이동 단위 | learner-text-candidate | repeated-text |
| src/features/city-data/CityDataTable.tsx:66:284 | text | {layerValue(active(activeLayerIds, 'risk'), riskText(data), '위험')} | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/city-data/CityDataTable.tsx:67:84 | text | 위험 | learner-text-candidate | repeated-text |
| src/features/city-data/CityDataTable.tsx:80:31 | text | {candidate.name}{active(activeLayerIds, 'cost') ? ` · 비용 ${candidate.costTokens}단계` : ' · 후보지 있음'} | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/city-data/CityDataTable.tsx:80:82 | text | · 비용 ${candidate.costTokens}단계 | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/features/city-data/CityDataTable.tsx:80:118 | text | · 후보지 있음 | learner-text-candidate | — |
| src/features/city-data/CityDataTable.tsx:82:32 | text | 후보지 없음 | learner-text-candidate | repeated-text |
| src/features/city-data/CityDataTable.tsx:84:109 | text | 0 ? `기존 시설: ${data.existingNames.join(', ')}` : '기존 시설 없음', '기존 시설')} | learner-text-candidate | long-or-dense |
| src/features/city-data/CityDataTable.tsx:84:115 | text | 기존 시설: ${data.existingNames.join(', ')} | learner-text-candidate | — |
| src/features/city-data/CityDataTable.tsx:84:159 | text | 기존 시설 없음 | learner-text-candidate | repeated-text |
| src/features/city-data/CityDataTable.tsx:84:171 | text | 기존 시설 | learner-text-candidate | repeated-text |
| src/features/city-data/CityDataTable.tsx:91:68 | text | 모바일에서는 표를 좌우로 밀어 더 보기 | hint | repeated-text |
| src/features/city-data/CityDataTable.tsx:92:33 | text | 후보지 라디오를 선택하면 지도 보기와 같은 후보지 ID가 선택됩니다. 꺼진 자료층은 표에 이유를 표시하며, 다른 층의 정보는 색에 의존하지 않습니다. | learner-text-candidate | long-or-dense, missing-term-explanation, multiple-actions, technical-or-internal |
| src/features/city-data/GridMap.tsx:9:46 | text | void; } export interface CoordinateData { coordinate: GridCoordinate; zoneNames: string[]; peopleTokens: number; mobilityBarrier: boolean; coverageNames: string[]; roadUnits: number[]; riskKinds: RiskKind[]; riskLabels: string[]; candidateIds: string[]; candidateNames: string[]; candidateCosts: number[]; existingNames: string[]; } const RISK_NAMES: Record | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/city-data/GridMap.tsx:27:43 | text | = { 'water-ponding': '빗물 고임', 'steep-slope': '급경사', }; const COVERAGE_NAMES: Record | learner-text-candidate | long-or-dense |
| src/features/city-data/GridMap.tsx:28:21 | text | 빗물 고임 | learner-text-candidate | repeated-text |
| src/features/city-data/GridMap.tsx:29:19 | text | 급경사 | learner-text-candidate | repeated-text |
| src/features/city-data/GridMap.tsx:33:13 | text | 도서관 | learner-text-candidate | repeated-text |
| src/features/city-data/GridMap.tsx:34:22 | text | 보건 지원소 | learner-text-candidate | — |
| src/features/city-data/GridMap.tsx:35:22 | text | 생활문화센터 | learner-text-candidate | repeated-text |
| src/features/city-data/GridMap.tsx:42:26 | text | ${city.id}-${coordinate.label.toLowerCase()} | learner-text-candidate | technical-or-internal |
| src/features/city-data/GridMap.tsx:73:11 | text | ${city.id}-cell-${coordinate.label.toLowerCase()} | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/city-data/GridMap.tsx:79:20 | text | ${data.zoneNames.join(', ')}, 사람 토큰 ${data.peopleTokens}${data.mobilityBarrier ? ', 이동이 불편할 수 있는 구역' : ''} | learner-text-candidate | long-or-dense |
| src/features/city-data/GridMap.tsx:80:52 | text | 기존 보장: ${data.coverageNames.join(', ')} | learner-text-candidate | — |
| src/features/city-data/GridMap.tsx:80:96 | text | 기존 보장 시설 없음 | learner-text-candidate | repeated-text |
| src/features/city-data/GridMap.tsx:82:20 | text | 인구 구역 없음, 기존 보장 시설 없음 | learner-text-candidate | — |
| src/features/city-data/GridMap.tsx:85:8 | text | 도로 연결 있음, 연결 이동 단위 ${data.roadUnits.join(', ')} | learner-text-candidate | — |
| src/features/city-data/GridMap.tsx:86:8 | text | 도로 연결 없음 | learner-text-candidate | repeated-text |
| src/features/city-data/GridMap.tsx:88:56 | text | ${riskName(kind)}: ${data.riskLabels[index] ?? ''} | learner-text-candidate | long-or-dense |
| src/features/city-data/GridMap.tsx:90:20 | text | 위험 표지 없음 | learner-text-candidate | repeated-text |
| src/features/city-data/GridMap.tsx:94:51 | text | 후보지 ${name}, 비용 ${data.candidateCosts[index]}단계 | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/features/city-data/GridMap.tsx:95:10 | text | 후보지 있음 (${data.candidateNames.length}곳) | learner-text-candidate | technical-or-internal |
| src/features/city-data/GridMap.tsx:96:102 | text | 선택됨 | learner-text-candidate | — |
| src/features/city-data/GridMap.tsx:96:110 | text | 선택되지 않음 | learner-text-candidate | — |
| src/features/city-data/GridMap.tsx:98:20 | text | 후보지 없음 | learner-text-candidate | repeated-text |
| src/features/city-data/GridMap.tsx:100:103 | text | 기존 시설 ${data.existingNames.join(', ')} | learner-text-candidate | — |
| src/features/city-data/GridMap.tsx:100:146 | text | 기존 시설 없음 | learner-text-candidate | repeated-text |
| src/features/city-data/GridMap.tsx:109:30 | text | 0) return 'lines'; return 'ring'; } function moveCoordinate( current: GridCoordinate, key: string, rows: number, columns: number, ): GridCoordinate { if (key === 'Home') return { ...current, column: 0 }; if (key === 'End') return { ...current, column: columns - 1 }; const delta = key === 'ArrowUp' ? { row: -1, column: 0 } : key === 'ArrowDown' ? { row: 1, column: 0 } : key === 'ArrowLeft' ? { row: 0, column: -1 } : key === 'ArrowRight' ? { row: 0, column: 1 } : null; if (delta === null) return current; return { row: Math.min(rows - 1, Math.max(0, current.row + delta.row)), column: Math.min(columns - 1, Math.max(0, current.column + delta.column)), label: current.label, }; } export function GridMap({ city, activeLayerIds, selectedCandidateId, onSelectCandidate }: GridMapProps) { const [activeCoordinateState, setActiveCoordinate] = useState | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/city-data/GridMap.tsx:134:133 | text | A1 | learner-text-candidate | repeated-text |
| src/features/city-data/GridMap.tsx:135:53 | text | item.label === activeCoordinateState.label) ?? city.nodes[0] ?? { row: 0, column: 0, label: 'A1' }; const handleKeyDown = (event: KeyboardEvent | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/city-data/GridMap.tsx:137:37 | text | A1 | learner-text-candidate | repeated-text |
| src/features/city-data/GridMap.tsx:148:55 | text | item.coordinate.label === activeCoordinate.label); if (candidate) { event.preventDefault(); onSelectCandidate(candidate.id); } } }; return ( | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/city-data/GridMap.tsx:158:56 | text | polite | learner-text-candidate | repeated-text |
| src/features/city-data/GridMap.tsx:158:64 | text | 현재 좌표: {activeCoordinate.label} | learner-text-candidate | — |
| src/features/city-data/GridMap.tsx:163:22 | text | ${city.name} 가상 격자 지도 | learner-text-candidate | — |
| src/features/city-data/GridMap.tsx:170:78 | text | row-${row} | learner-text-candidate | — |
| src/features/city-data/GridMap.tsx:170:122 | text | repeat(${city.columns}, minmax(8rem, 1fr)) | learner-text-candidate | — |
| src/features/city-data/GridMap.tsx:172:59 | text | node.row === row && node.column === column) ?? { row, column, label: `${String.fromCharCode(65 + column)}${row + 1}` }; const data = getCoordinateData(city, coordinate); const label = cellLabel(data, selectedCandidateId, activeLayerIds); const isActive = coordinate.label === activeCoordinate.label; const isSelected = data.candidateIds.includes(selectedCandidateId ?? ''); return ( | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/city-data/GridMap.tsx:173:43 | text | ${String.fromCharCode(65 + column)}${row + 1} | learner-text-candidate | — |
| src/features/city-data/GridMap.tsx:197:148 | text | 0 ? data.roadUnits.join('/') : '연결 없음'} | learner-text-candidate | — |
| src/features/city-data/GridMap.tsx:197:181 | text | 연결 없음 | learner-text-candidate | — |
| src/features/city-data/GridMap.tsx:199:143 | text | ⌖ 후보지 있음 | learner-text-candidate | — |
| src/features/city-data/GridMap.tsx:200:185 | text | ▣ {name} · 비용 {data.candidateCosts[index]} | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/features/city-data/GridMap.tsx:202:80 | text | ✓ 선택됨 | learner-text-candidate | — |
| src/features/city-data/GridMap.tsx:209:32 | text | 화살표로 칸을 옮기고, 후보지가 있는 칸에서 Enter 또는 Space를 누르면 선택합니다. | hint | multiple-actions, multiple-conditions |
| src/features/city-data/LayerLegend.tsx:10:56 | text | = { population: { label: '인구', icon: '●', pattern: '사람 토큰', description: '인구가 분포한 구역을 사람 토큰 수로 읽습니다.' }, roads: { label: '도로·이동 단위', icon: '↔', pattern: '연결선과 이동 숫자', description: '구역 사이 도로 연결과 이동에 드는 상대 단위를 확인합니다.' }, risk: { label: '가상 위험 표지', icon: '△', pattern: '빗금 표지', description: '빗물 고임이나 급경사처럼 가상으로 표시한 위험 조건입니다.' }, cost: { label: '후보지 비용', icon: '▣', pattern: '예산 토큰', description: '후보지를 고를 때 필요한 1~3단계 상대 예산 토큰입니다.' }, 'existing-facilities': { label: '기존 시설', icon: '⌂', pattern: '건물 무늬', description: '이미 있는 시설의 위치를 보고 서비스 중복과 공백을 비교합니다.' }, }; export function LayerLegend({ activeLayerIds }: { activeLayerIds: DataLayerId[] }) { if (activeLayerIds.length === 0) return | learner-text-candidate | long-or-dense, multiple-actions, multiple-conditions, technical-or-internal |
| src/features/city-data/LayerLegend.tsx:11:25 | text | 인구 | learner-text-candidate | repeated-text |
| src/features/city-data/LayerLegend.tsx:11:51 | text | 사람 토큰 | learner-text-candidate | repeated-text |
| src/features/city-data/LayerLegend.tsx:11:73 | text | 인구가 분포한 구역을 사람 토큰 수로 읽습니다. | learner-text-candidate | — |
| src/features/city-data/LayerLegend.tsx:12:20 | text | 도로·이동 단위 | learner-text-candidate | repeated-text |
| src/features/city-data/LayerLegend.tsx:12:52 | text | 연결선과 이동 숫자 | learner-text-candidate | — |
| src/features/city-data/LayerLegend.tsx:12:79 | text | 구역 사이 도로 연결과 이동에 드는 상대 단위를 확인합니다. | learner-text-candidate | — |
| src/features/city-data/LayerLegend.tsx:13:19 | text | 가상 위험 표지 | learner-text-candidate | repeated-text |
| src/features/city-data/LayerLegend.tsx:13:51 | text | 빗금 표지 | learner-text-candidate | — |
| src/features/city-data/LayerLegend.tsx:13:73 | text | 빗물 고임이나 급경사처럼 가상으로 표시한 위험 조건입니다. | learner-text-candidate | — |
| src/features/city-data/LayerLegend.tsx:14:19 | text | 후보지 비용 | learner-text-candidate | repeated-text |
| src/features/city-data/LayerLegend.tsx:14:49 | text | 예산 토큰 | learner-text-candidate | — |
| src/features/city-data/LayerLegend.tsx:14:71 | text | 후보지를 고를 때 필요한 1~3단계 상대 예산 토큰입니다. | learner-text-candidate | — |
| src/features/city-data/LayerLegend.tsx:15:4 | text | existing-facilities | learner-text-candidate | repeated-text |
| src/features/city-data/LayerLegend.tsx:15:36 | text | 기존 시설 | learner-text-candidate | repeated-text |
| src/features/city-data/LayerLegend.tsx:15:65 | text | 건물 무늬 | learner-text-candidate | — |
| src/features/city-data/LayerLegend.tsx:15:87 | text | 이미 있는 시설의 위치를 보고 서비스 중복과 공백을 비교합니다. | learner-text-candidate | — |
| src/features/city-data/LayerLegend.tsx:19:46 | text | 자료층을 켜면 아이콘·무늬·설명이 여기에 나타납니다. | learner-text-candidate | ambiguous-reference |
| src/features/city-data/LayerLegend.tsx:19:79 | text | ; return ( | heading | repeated-text |
| src/features/city-data/LayerLegend.tsx:21:87 | text | layer-legend-heading | heading | — |
| src/features/city-data/LayerLegend.tsx:22:42 | text | 켜진 자료층 범례 | heading | repeated-text |
| src/features/city-data/LayerLegend.tsx:29:47 | text | · 무늬: {meaning.pattern} · {meaning.description} | learner-text-candidate | — |
| src/features/intake/ReviewIntake.invalid-state.test.tsx:34:38 | text | button | button-or-action | repeated-text |
| src/features/intake/ReviewIntake.invalid-state.test.tsx:34:56 | text | 도시 자료실로 이동 | button-or-action | repeated-text |
| src/features/intake/ReviewIntake.invalid-state.test.tsx:37:57 | text | 선택한 미션 요약 | learner-text-candidate | repeated-text |
| src/features/intake/ReviewIntake.invalid-state.test.tsx:52:38 | text | button | button-or-action | repeated-text |
| src/features/intake/ReviewIntake.invalid-state.test.tsx:52:56 | text | 도시 자료실로 이동 | button-or-action | repeated-text |
| src/features/intake/ReviewIntake.invalid-state.test.tsx:55:57 | text | 선택한 미션 요약 | learner-text-candidate | repeated-text |
| src/features/intake/ReviewIntake.test.tsx:15:30 | text | heading | heading | repeated-text |
| src/features/intake/ReviewIntake.test.tsx:15:49 | text | 심의 접수 | heading | repeated-text |
| src/features/intake/ReviewIntake.test.tsx:20:68 | text | 미션 선택 | hint | repeated-text |
| src/features/intake/ReviewIntake.test.tsx:21:33 | text | 마루시(가상 도시) | learner-text-candidate | repeated-text |
| src/features/intake/ReviewIntake.test.tsx:23:30 | text | button | button-or-action | repeated-text |
| src/features/intake/ReviewIntake.test.tsx:23:48 | text | 도시 자료실로 이동 | button-or-action | repeated-text |
| src/features/intake/ReviewIntake.test.tsx:26:30 | text | button | button-or-action | repeated-text |
| src/features/intake/ReviewIntake.test.tsx:26:48 | text | 도시 자료실로 이동 | button-or-action | repeated-text |
| src/features/intake/ReviewIntake.test.tsx:32:68 | text | 미션 선택 | learner-text-candidate | repeated-text |
| src/features/intake/ReviewIntake.test.tsx:33:59 | text | 책마루 도서관을 놓아 보세요 공개 조건 | learner-text-candidate | — |
| src/features/intake/ReviewIntake.test.tsx:35:43 | text | 공개 조건 보기 | learner-text-candidate | repeated-text |
| src/features/intake/ReviewIntake.test.tsx:41:68 | text | 미션 선택 | learner-text-candidate | repeated-text |
| src/features/intake/ReviewIntake.test.tsx:52:28 | text | 책과 배움 자료를 이용하는 작은 도서관입니다. | learner-text-candidate | repeated-text |
| src/features/intake/ReviewIntake.test.tsx:53:30 | text | 일상 건강 상담 시설이며 응급 출동 시간을 예측하지 않습니다. | hint | repeated-text |
| src/features/intake/ReviewIntake.test.tsx:54:33 | text | 주민이 함께 배우고 활동하는 생활 문화센터입니다. | learner-text-candidate | repeated-text |
| src/features/intake/ReviewIntake.test.tsx:55:27 | text | 도서관과 일상 건강 상담 시설을 함께 검토하는 복합 심의입니다. | learner-text-candidate | repeated-text |
| src/features/intake/ReviewIntake.test.tsx:59:38 | text | article | learner-text-candidate | repeated-text |
| src/features/intake/ReviewIntake.test.tsx:61:39 | text | ${mission.budgetTokens}토큰 | learner-text-candidate | — |
| src/features/intake/ReviewIntake.test.tsx:74:68 | text | 미션 선택 | learner-text-candidate | repeated-text |
| src/features/intake/ReviewIntake.test.tsx:75:47 | text | article | learner-text-candidate | repeated-text |
| src/features/intake/ReviewIntake.test.tsx:75:75 | text | combined-review | learner-text-candidate | repeated-text |
| src/features/intake/ReviewIntake.test.tsx:77:60 | text | combined-review | learner-text-candidate | repeated-text |
| src/features/intake/ReviewIntake.test.tsx:87:68 | text | 미션 선택 | learner-text-candidate | repeated-text |
| src/features/intake/ReviewIntake.test.tsx:88:55 | text | 접근성 | learner-text-candidate | repeated-text |
| src/features/intake/ReviewIntake.test.tsx:89:55 | text | 안전 | learner-text-candidate | repeated-text |
| src/features/intake/ReviewIntake.test.tsx:90:53 | text | 비용 | learner-text-candidate | repeated-text |
| src/features/intake/ReviewIntake.test.tsx:99:68 | text | 미션 선택 | learner-text-candidate | repeated-text |
| src/features/intake/ReviewIntake.tsx:7:85 | text | = [ { id: 'access-equity', label: '접근성', tradeoff: '여러 구역이 고르게 이용하기 쉽도록 가장 멀거나 이동이 불편한 구역을 먼저 살핍니다. 대신 비용이 더 들 수 있습니다.', }, { id: 'safety', label: '안전', tradeoff: '가상 위험 표지가 없는 터를 우선합니다. 대신 일부 구역의 이동 단위가 커질 수 있습니다.', }, { id: 'cost', label: '비용', tradeoff: '적은 상대 예산 토큰을 우선합니다. 대신 먼 구역이나 불편한 구역이 생길 수 있습니다.', }, ]; const MISSION_LIST = Object.values(MISSIONS); function facilityPurpose(mission: MissionDefinition): string { if (mission.id === 'bookmaru-library') return '책과 배움 자료를 이용하는 작은 도서관입니다.'; if (mission.id === 'health-help-center') return '일상 건강 상담 시설이며 응급 출동 시간을 예측하지 않습니다.'; if (mission.id === 'living-culture-center') return '주민이 함께 배우고 활동하는 생활 문화센터입니다.'; return '도서관과 일상 건강 상담 시설을 함께 검토하는 복합 심의입니다.'; } function MissionCard({ mission, open }: { mission: MissionDefinition; open: boolean }) { const city = cityForId(mission.cityId); if (city === undefined) return null; const isCombined = mission.id === 'combined-review'; return ( | hint | long-or-dense, technical-or-internal |
| src/features/intake/ReviewIntake.tsx:10:13 | text | 접근성 | learner-text-candidate | repeated-text |
| src/features/intake/ReviewIntake.tsx:11:16 | text | 여러 구역이 고르게 이용하기 쉽도록 가장 멀거나 이동이 불편한 구역을 먼저 살핍니다. 대신 비용이 더 들 수 있습니다. | learner-text-candidate | long-or-dense |
| src/features/intake/ReviewIntake.tsx:15:13 | text | 안전 | learner-text-candidate | repeated-text |
| src/features/intake/ReviewIntake.tsx:16:16 | text | 가상 위험 표지가 없는 터를 우선합니다. 대신 일부 구역의 이동 단위가 커질 수 있습니다. | learner-text-candidate | — |
| src/features/intake/ReviewIntake.tsx:20:13 | text | 비용 | learner-text-candidate | repeated-text |
| src/features/intake/ReviewIntake.tsx:21:16 | text | 적은 상대 예산 토큰을 우선합니다. 대신 먼 구역이나 불편한 구역이 생길 수 있습니다. | learner-text-candidate | — |
| src/features/intake/ReviewIntake.tsx:28:50 | text | 책과 배움 자료를 이용하는 작은 도서관입니다. | learner-text-candidate | repeated-text |
| src/features/intake/ReviewIntake.tsx:29:52 | text | 일상 건강 상담 시설이며 응급 출동 시간을 예측하지 않습니다. | hint | repeated-text |
| src/features/intake/ReviewIntake.tsx:30:55 | text | 주민이 함께 배우고 활동하는 생활 문화센터입니다. | learner-text-candidate | repeated-text |
| src/features/intake/ReviewIntake.tsx:31:11 | text | 도서관과 일상 건강 상담 시설을 함께 검토하는 복합 심의입니다. | learner-text-candidate | repeated-text |
| src/features/intake/ReviewIntake.tsx:41:67 | text | mission-${mission.id} | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/features/intake/ReviewIntake.tsx:43:12 | text | 배정 도시: | learner-text-candidate | — |
| src/features/intake/ReviewIntake.tsx:44:12 | text | 시설 목적: {facilityPurpose(mission)} | learner-text-candidate | — |
| src/features/intake/ReviewIntake.tsx:45:12 | text | {isCombined ? '두 시설이 함께 쓰는 공유 예산' : '시설 하나에 쓰는 상대 예산'}: | learner-text-candidate | — |
| src/features/intake/ReviewIntake.tsx:45:27 | text | 두 시설이 함께 쓰는 공유 예산 | learner-text-candidate | — |
| src/features/intake/ReviewIntake.tsx:45:49 | text | 시설 하나에 쓰는 상대 예산 | learner-text-candidate | — |
| src/features/intake/ReviewIntake.tsx:45:76 | text | {mission.budgetTokens}토큰 | learner-text-candidate | — |
| src/features/intake/ReviewIntake.tsx:48:17 | text | 복합 심의 역할과 순서 | heading | — |
| src/features/intake/ReviewIntake.tsx:50:18 | text | 시설 슬롯 1: 도서관, 시설 슬롯 2: 일상 건강 상담 시설 | learner-text-candidate | — |
| src/features/intake/ReviewIntake.tsx:51:18 | text | 한 예산 안에서 도서관과 건강 도움소의 역할을 나누어 맡습니다. | hint | — |
| src/features/intake/ReviewIntake.tsx:52:18 | text | 어느 시설을 우선 설치하고 어느 시설을 나중 설치할지 계획합니다. | learner-text-candidate | — |
| src/features/intake/ReviewIntake.tsx:56:62 | text | ${mission.title} 공개 조건 | learner-text-candidate | — |
| src/features/intake/ReviewIntake.tsx:57:20 | text | 공개 조건 보기 | learner-text-candidate | repeated-text |
| src/features/intake/ReviewIntake.tsx:59:17 | text | 공개 조건 | heading | repeated-text |
| src/features/intake/ReviewIntake.tsx:61:39 | text | {condition.label}{condition.required ? ' (필수)' : ' (참고)'} | learner-text-candidate | long-or-dense |
| src/features/intake/ReviewIntake.tsx:61:79 | text | (필수) | learner-text-candidate | — |
| src/features/intake/ReviewIntake.tsx:61:89 | text | (참고) | learner-text-candidate | — |
| src/features/intake/ReviewIntake.tsx:67:15 | text | ); } export function ReviewIntake() { const { state, dispatch } = useSession(); const selectedMission = missionForId(state.missionId); const selectedCity = selectedMission === undefined ? undefined : cityForId(selectedMission.cityId); const canEnterDataRoom = hasValidIntakeContext(state); return ( | heading | long-or-dense, technical-or-internal |
| src/features/intake/ReviewIntake.tsx:78:31 | text | stage-heading | heading | repeated-text |
| src/features/intake/ReviewIntake.tsx:79:30 | text | 심의 접수 | heading | repeated-text |
| src/features/intake/ReviewIntake.tsx:80:10 | text | 권장 시간: | learner-text-candidate | — |
| src/features/intake/ReviewIntake.tsx:80:25 | text | 35~45분 | learner-text-candidate | — |
| src/features/intake/ReviewIntake.tsx:80:40 | text | . 가상 도시의 자료를 읽고 여러 입지의 장단점을 근거로 비교합니다. | learner-text-candidate | — |
| src/features/intake/ReviewIntake.tsx:81:10 | text | 이 활동의 도시는 | learner-text-candidate | — |
| src/features/intake/ReviewIntake.tsx:81:28 | text | 실제 도시가 아닌 | learner-text-candidate | — |
| src/features/intake/ReviewIntake.tsx:81:46 | text | 학습용 모형입니다. 숫자는 실제 측정값이 아닙니다. | learner-text-candidate | — |
| src/features/intake/ReviewIntake.tsx:84:17 | text | 미션 선택 | learner-text-candidate | repeated-text |
| src/features/intake/ReviewIntake.tsx:85:41 | text | 검토할 미션 | learner-text-candidate | — |
| src/features/intake/ReviewIntake.tsx:88:23 | aria-label | 미션 선택 | aria-label | repeated-text |
| src/features/intake/ReviewIntake.tsx:92:28 | text | 미션을 선택하세요 | learner-text-candidate | — |
| src/features/intake/ReviewIntake.tsx:97:49 | aria-label | 네 가지 미션 안내 | aria-label, instruction | — |
| src/features/intake/ReviewIntake.tsx:99:13 | text | {selectedMission && selectedCity && selectedMission.cityId === state.cityId && ( | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/intake/ReviewIntake.tsx:102:65 | aria-label | 선택한 미션 요약 | aria-label | repeated-text |
| src/features/intake/ReviewIntake.tsx:103:15 | text | 선택한 미션 | heading | — |
| src/features/intake/ReviewIntake.tsx:104:14 | text | {selectedMission.title} · 배정 도시: {selectedCity.name} | learner-text-candidate | long-or-dense |
| src/features/intake/ReviewIntake.tsx:110:17 | text | 가장 먼저 살필 기준 | learner-text-candidate | repeated-text |
| src/features/intake/ReviewIntake.tsx:133:61 | text | completion-heading | heading | — |
| src/features/intake/ReviewIntake.tsx:134:37 | text | 완료 조건과 증거 | heading | — |
| src/features/intake/ReviewIntake.tsx:135:12 | text | 다음 자료를 남기면 접수가 끝납니다. | learner-text-candidate | — |
| src/features/intake/ReviewIntake.tsx:137:14 | text | 서로 다른 자료층 두 개 이상을 확인합니다. | learner-text-candidate | — |
| src/features/intake/ReviewIntake.tsx:138:14 | text | 평균 이동 단위와 가장 먼 구역의 결과를 함께 살핍니다. | learner-text-candidate | — |
| src/features/intake/ReviewIntake.tsx:139:14 | text | 누가 더 불편해지는지 구역 자료로 찾습니다. | learner-text-candidate | — |
| src/features/intake/ReviewIntake.tsx:140:14 | text | 선택안과 장점이 다른 대안을 비교합니다. | learner-text-candidate | multiple-actions |
| src/features/intake/ReviewIntake.tsx:148:91 | text | go-to-stage | button-or-action | repeated-text |
| src/features/intake/ReviewIntake.tsx:148:113 | text | data-room | button-or-action | — |
| src/features/intake/ReviewIntake.tsx:148:128 | text | 도시 자료실로 이동 | button-or-action | repeated-text |
| src/features/intake/ReviewIntake.tsx:150:16 | text | {!canEnterDataRoom && | button-or-action | — |
| src/features/intake/ReviewIntake.tsx:151:46 | text | 미션과 우선순위를 모두 선택하면 도시 자료실로 갈 수 있습니다. | learner-text-candidate | — |
| src/features/opinion/OpinionSummary.tsx:17:20 | text | void; summaryHeadingRef?: RefObject | heading | technical-or-internal |
| src/features/opinion/OpinionSummary.tsx:18:59 | text | ; } const PRIORITY_LABELS: Record | heading | — |
| src/features/opinion/OpinionSummary.tsx:21:56 | text | access-equity | learner-text-candidate | repeated-text |
| src/features/opinion/OpinionSummary.tsx:21:73 | text | 접근성 | learner-text-candidate | repeated-text |
| src/features/opinion/OpinionSummary.tsx:21:88 | text | 안전 | learner-text-candidate | repeated-text |
| src/features/opinion/OpinionSummary.tsx:21:100 | text | 비용 | learner-text-candidate | repeated-text |
| src/features/opinion/OpinionSummary.tsx:22:35 | text | 평균 이동 단위 | learner-text-candidate | repeated-text |
| src/features/opinion/OpinionSummary.tsx:22:56 | text | 가장 긴 이동 단위 | learner-text-candidate | repeated-text |
| src/features/opinion/OpinionSummary.tsx:22:83 | text | 도달 불가 구역 | learner-text-candidate | repeated-text |
| src/features/opinion/OpinionSummary.tsx:22:101 | text | 위험 조건 | learner-text-candidate | repeated-text |
| src/features/opinion/OpinionSummary.tsx:22:116 | text | 비용 조건 | learner-text-candidate | repeated-text |
| src/features/opinion/OpinionSummary.tsx:25:81 | text | 계산 불가 | learner-text-candidate | repeated-text |
| src/features/opinion/OpinionSummary.tsx:25:91 | text | ${access.populationWeightedAverage.toFixed(1)} 이동 단위 | learner-text-candidate | long-or-dense |
| src/features/opinion/OpinionSummary.tsx:26:78 | text | 계산 불가 | learner-text-candidate | repeated-text |
| src/features/opinion/OpinionSummary.tsx:26:88 | text | ${access.longestReachableTravel} 이동 단위 | learner-text-candidate | — |
| src/features/opinion/OpinionSummary.tsx:27:41 | text | ${access.unreachableZoneIds.length}곳 | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/features/opinion/OpinionSummary.tsx:28:34 | text | ${proposal.analysis.riskyCandidateIds.length}곳 | learner-text-candidate | long-or-dense, missing-term-explanation, technical-or-internal |
| src/features/opinion/OpinionSummary.tsx:29:11 | text | ${proposal.analysis.totalCostTokens} 토큰 | learner-text-candidate | — |
| src/features/opinion/OpinionSummary.tsx:34:66 | text | opinion-summary-heading | heading | repeated-text |
| src/features/opinion/OpinionSummary.tsx:34:124 | text | 입지 심의 의견서 | heading | — |
| src/features/opinion/OpinionSummary.tsx:40:317 | text | 의견서 자료를 표시할 수 없습니다. 선택안·도시·미션 자료를 다시 확인해 주세요. | learner-text-candidate | multiple-actions |
| src/features/opinion/OpinionSummary.tsx:45:383 | text | 선택안과 우선 기준을 확인할 수 없습니다. | learner-text-candidate | multiple-actions |
| src/features/opinion/OpinionSummary.tsx:46:85 | text | zone.id === safeDraft.underservedZoneId)?.name ?? safeDraft.underservedZoneId ?? '선택한 구역'; const verdict = proposal.assessment.verdict === 'valid-with-tradeoffs' ? '타당안—절충 확인' : '수정 필요'; return ( | heading | long-or-dense, multiple-actions, technical-or-internal |
| src/features/opinion/OpinionSummary.tsx:46:168 | text | 선택한 구역 | learner-text-candidate | — |
| src/features/opinion/OpinionSummary.tsx:47:77 | text | 타당안—절충 확인 | learner-text-candidate | repeated-text |
| src/features/opinion/OpinionSummary.tsx:47:91 | text | 수정 필요 | learner-text-candidate | — |
| src/features/opinion/OpinionSummary.tsx:49:31 | text | opinion-summary-heading | heading | repeated-text |
| src/features/opinion/OpinionSummary.tsx:50:78 | text | 완성한 입지 심의 의견서 | heading | repeated-text |
| src/features/opinion/OpinionSummary.tsx:51:43 | text | 의견서가 완성되었습니다. 살펴본 근거와 다음 보완 방법을 확인하세요. | learner-text-candidate | multiple-actions |
| src/features/opinion/OpinionSummary.tsx:53:11 | text | 선택안 | heading | repeated-text |
| src/features/opinion/OpinionSummary.tsx:55:11 | text | 우선 기준 | heading | repeated-text |
| src/features/opinion/OpinionSummary.tsx:56:10 | text | {PRIORITY_LABELS[effectivePriority]} | learner-text-candidate | — |
| src/features/opinion/OpinionSummary.tsx:57:11 | text | 공개 조건 결과 | heading | — |
| src/features/opinion/OpinionSummary.tsx:58:136 | text | item.code === condition.code)?.label ?? condition.code}: {condition.passed ? '충족' : '미충족'} — {condition.evidenceText} | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/opinion/OpinionSummary.tsx:58:215 | text | 충족 | learner-text-candidate | repeated-text |
| src/features/opinion/OpinionSummary.tsx:58:222 | text | 미충족 | learner-text-candidate | repeated-text |
| src/features/opinion/OpinionSummary.tsx:59:11 | text | 선택한 근거 수치 | heading | — |
| src/features/opinion/OpinionSummary.tsx:60:73 | text | {METRIC_LABELS[metric]}: {metricValue(proposal, metric)} | learner-text-candidate | long-or-dense |
| src/features/opinion/OpinionSummary.tsx:61:10 | text | 평균 이동 단위와 가장 긴 이동 단위를 함께 살폈습니다. | learner-text-candidate | — |
| src/features/opinion/OpinionSummary.tsx:62:11 | text | 더 불편을 살핀 구역 | heading | — |
| src/features/opinion/OpinionSummary.tsx:64:11 | text | 선택안의 근거와 절충 | heading | — |
| src/features/opinion/OpinionSummary.tsx:66:11 | text | 예상되는 반론 | heading | repeated-text |
| src/features/opinion/OpinionSummary.tsx:68:11 | text | 보완 방법 | heading | repeated-text |
| src/features/opinion/OpinionSummary.tsx:69:36 | text | {canonicalMission.id === 'combined-review' && | heading | technical-or-internal |
| src/features/opinion/OpinionSummary.tsx:70:33 | text | combined-review | heading | repeated-text |
| src/features/opinion/OpinionSummary.tsx:70:79 | text | combined-opinion-heading | heading | — |
| src/features/opinion/OpinionSummary.tsx:71:43 | text | 복합 심의 역할 분담 | heading | — |
| src/features/opinion/OpinionSummary.tsx:72:12 | text | 도서관은 책과 배움 자료를, 건강 도움소는 일상 건강 상담을 맡도록 역할을 나눕니다. | hint | — |
| src/features/opinion/OpinionSummary.tsx:73:12 | text | 예산과 이용 조건을 확인하여 한 시설을 먼저 설치하고 다른 시설은 단계적으로 설치합니다. | learner-text-candidate | — |
| src/features/opinion/OpinionSummary.tsx:75:26 | aria-label | 모형과 안전 안내 | aria-label, instruction | repeated-text |
| src/features/opinion/OpinionSummary.tsx:81:62 | text | 브라우저에서 인쇄 | button-or-action | repeated-text |
| src/features/opinion/OpinionSummary.tsx:81:80 | text | {onRestart !== undefined && | button-or-action | technical-or-internal |
| src/features/opinion/OpinionSummary.tsx:82:79 | text | 처음부터 다시 시작 | button-or-action | repeated-text |
| src/features/opinion/SitingOpinionForm.tsx:22:10 | text | access-equity | learner-text-candidate | repeated-text |
| src/features/opinion/SitingOpinionForm.tsx:22:34 | text | 접근성 | learner-text-candidate | repeated-text |
| src/features/opinion/SitingOpinionForm.tsx:23:10 | text | safety | learner-text-candidate | — |
| src/features/opinion/SitingOpinionForm.tsx:23:27 | text | 안전 | learner-text-candidate | repeated-text |
| src/features/opinion/SitingOpinionForm.tsx:24:10 | text | cost | learner-text-candidate | repeated-text |
| src/features/opinion/SitingOpinionForm.tsx:24:25 | text | 비용 | learner-text-candidate | repeated-text |
| src/features/opinion/SitingOpinionForm.tsx:27:10 | text | average | learner-text-candidate | repeated-text |
| src/features/opinion/SitingOpinionForm.tsx:27:28 | text | 평균 이동 단위 | learner-text-candidate | repeated-text |
| src/features/opinion/SitingOpinionForm.tsx:28:10 | text | maximum | learner-text-candidate | repeated-text |
| src/features/opinion/SitingOpinionForm.tsx:28:28 | text | 가장 긴 이동 단위 | learner-text-candidate | repeated-text |
| src/features/opinion/SitingOpinionForm.tsx:29:10 | text | unreachable | learner-text-candidate | repeated-text |
| src/features/opinion/SitingOpinionForm.tsx:29:32 | text | 도달 불가 구역 | learner-text-candidate | repeated-text |
| src/features/opinion/SitingOpinionForm.tsx:30:10 | text | risk | learner-text-candidate | repeated-text |
| src/features/opinion/SitingOpinionForm.tsx:30:25 | text | 위험 조건 | learner-text-candidate | repeated-text |
| src/features/opinion/SitingOpinionForm.tsx:31:10 | text | cost | learner-text-candidate | repeated-text |
| src/features/opinion/SitingOpinionForm.tsx:31:25 | text | 비용 조건 | learner-text-candidate | repeated-text |
| src/features/opinion/SitingOpinionForm.tsx:34:119 | text | 선택한 기준 | learner-text-candidate | — |
| src/features/opinion/SitingOpinionForm.tsx:35:50 | text | `opinion-error-${key}`; type TouchedState = Partial | feedback-or-error | long-or-dense, technical-or-internal |
| src/features/opinion/SitingOpinionForm.tsx:35:52 | text | opinion-error-${key} | feedback-or-error | — |
| src/features/opinion/SitingOpinionForm.tsx:36:55 | text | priority | feedback-or-error | — |
| src/features/opinion/SitingOpinionForm.tsx:36:75 | text | ; export function SitingOpinionForm({ draft, proposals, intakePriorityId, priorityId, city, onChange, onDraftChange, onSubmit, onSave, currentAction = null }: SitingOpinionFormProps) { const [touched, setTouched] = useState | button-or-action, feedback-or-error | long-or-dense, technical-or-internal |
| src/features/opinion/SitingOpinionForm.tsx:39:55 | text | ({}); const [submitAttempted, setSubmitAttempted] = useState(false); const intake = intakePriorityId ?? priorityId ?? null; const safeDraft = cloneOpinionDraft(draft); const safeProposals = cloneOpinionProposals(proposals); if (safeDraft === null \|\| safeProposals === null \|\| !isOpinionTextWithinLimit(safeDraft?.rationale) \|\| !isOpinionTextWithinLimit(safeDraft?.counterargument) \|\| !isOpinionTextWithinLimit(safeDraft?.mitigation)) { return | heading, button-or-action | long-or-dense, technical-or-internal |
| src/features/opinion/SitingOpinionForm.tsx:45:38 | text | opinion-form-heading | heading | repeated-text |
| src/features/opinion/SitingOpinionForm.tsx:45:128 | text | 심의 의견서 | heading | repeated-text |
| src/features/opinion/SitingOpinionForm.tsx:45:155 | text | 의견서 자료를 표시할 수 없습니다. 앞 단계의 두 제안과 작성 자료를 다시 확인해 주세요. | heading | multiple-actions |
| src/features/opinion/SitingOpinionForm.tsx:61:28 | text | rationale | learner-text-candidate | repeated-text |
| src/features/opinion/SitingOpinionForm.tsx:61:42 | text | counterargument | learner-text-candidate | repeated-text |
| src/features/opinion/SitingOpinionForm.tsx:61:62 | text | mitigation | learner-text-candidate | repeated-text |
| src/features/opinion/SitingOpinionForm.tsx:61:107 | text | { const error = validation.errors[key]; const errorVisible = error !== null && showError(key); return ( | feedback-or-error | long-or-dense, technical-or-internal |
| src/features/opinion/SitingOpinionForm.tsx:69:44 | text | 문장 틀: 밑줄은 생각을 넣을 자리입니다. 짧은 예: 자료에서 본 이동 부담을 근거로 씁니다. | hint | — |
| src/features/opinion/SitingOpinionForm.tsx:69:100 | text | {errorVisible && | feedback-or-error, hint | — |
| src/features/opinion/SitingOpinionForm.tsx:71:13 | text | ); }; return ( | heading | — |
| src/features/opinion/SitingOpinionForm.tsx:76:31 | text | opinion-form-heading | heading | repeated-text |
| src/features/opinion/SitingOpinionForm.tsx:77:37 | text | 심의 의견서 | heading | repeated-text |
| src/features/opinion/SitingOpinionForm.tsx:78:10 | text | 공개된 자료와 두 제안의 차이를 근거로 자신의 의견을 작성합니다. 이 양식은 글의 의미를 자동으로 채점하지 않습니다. | learner-text-candidate | long-or-dense |
| src/features/opinion/SitingOpinionForm.tsx:82:25 | aria-label | 심의 의견서 작성 | aria-label, button-or-action | repeated-text |
| src/features/opinion/SitingOpinionForm.tsx:83:128 | text | opinion-error-priority | feedback-or-error | repeated-text |
| src/features/opinion/SitingOpinionForm.tsx:84:17 | text | 우선 기준 | learner-text-candidate | repeated-text |
| src/features/opinion/SitingOpinionForm.tsx:88:17 | text | )} {intake !== null && | learner-text-candidate | technical-or-internal |
| src/features/opinion/SitingOpinionForm.tsx:89:32 | text | 심의 접수에서 고른 기준: | learner-text-candidate | — |
| src/features/opinion/SitingOpinionForm.tsx:89:55 | text | {priorityLabel(intake)} | learner-text-candidate | — |
| src/features/opinion/SitingOpinionForm.tsx:89:91 | text | } {safeDraft.priorityId !== null && safeDraft.priorityId !== intake && showPriorityError() && | feedback-or-error | long-or-dense, technical-or-internal |
| src/features/opinion/SitingOpinionForm.tsx:90:145 | text | 심의 접수에서 고른 기준과 같은 기준을 선택해 주세요. | feedback-or-error | repeated-text |
| src/features/opinion/SitingOpinionForm.tsx:93:87 | text | proposal | feedback-or-error | repeated-text |
| src/features/opinion/SitingOpinionForm.tsx:93:101 | text | opinion-error-proposal | feedback-or-error | — |
| src/features/opinion/SitingOpinionForm.tsx:93:202 | text | proposal | feedback-or-error | repeated-text |
| src/features/opinion/SitingOpinionForm.tsx:94:17 | text | 선택안 | learner-text-candidate | repeated-text |
| src/features/opinion/SitingOpinionForm.tsx:98:17 | text | )} {validation.errors.proposal !== null && showError('proposal') && | feedback-or-error | long-or-dense, technical-or-internal |
| src/features/opinion/SitingOpinionForm.tsx:99:60 | text | proposal | feedback-or-error | repeated-text |
| src/features/opinion/SitingOpinionForm.tsx:102:87 | text | evidence | feedback-or-error | missing-term-explanation, repeated-text, technical-or-internal |
| src/features/opinion/SitingOpinionForm.tsx:102:101 | text | opinion-error-evidence | feedback-or-error | missing-term-explanation, technical-or-internal |
| src/features/opinion/SitingOpinionForm.tsx:102:202 | text | evidence | feedback-or-error | missing-term-explanation, repeated-text, technical-or-internal |
| src/features/opinion/SitingOpinionForm.tsx:103:17 | text | 공개 조건 근거 | learner-text-candidate | — |
| src/features/opinion/SitingOpinionForm.tsx:104:12 | text | 평균과 가장 긴 이동 결과를 함께 보고, 추가 조건을 하나 이상 선택하세요. | learner-text-candidate | — |
| src/features/opinion/SitingOpinionForm.tsx:111:17 | text | )} {validation.errors.evidence !== null && showError('evidence') && | feedback-or-error | long-or-dense, technical-or-internal |
| src/features/opinion/SitingOpinionForm.tsx:112:60 | text | evidence | feedback-or-error | missing-term-explanation, repeated-text, technical-or-internal |
| src/features/opinion/SitingOpinionForm.tsx:116:39 | text | 더 불편을 살필 구역 | learner-text-candidate | repeated-text |
| src/features/opinion/SitingOpinionForm.tsx:117:148 | text | underservedZone | feedback-or-error | repeated-text |
| src/features/opinion/SitingOpinionForm.tsx:117:261 | text | underservedZone | feedback-or-error | repeated-text |
| src/features/opinion/SitingOpinionForm.tsx:117:290 | text | underservedZone | feedback-or-error | repeated-text |
| src/features/opinion/SitingOpinionForm.tsx:117:350 | text | underservedZoneId | feedback-or-error | missing-term-explanation, technical-or-internal |
| src/features/opinion/SitingOpinionForm.tsx:118:28 | text | 구역을 선택하세요 | learner-text-candidate | — |
| src/features/opinion/SitingOpinionForm.tsx:120:18 | text | {validation.errors.underservedZone !== null && showError('underservedZone') && | feedback-or-error | long-or-dense, technical-or-internal |
| src/features/opinion/SitingOpinionForm.tsx:121:67 | text | underservedZone | feedback-or-error | repeated-text |
| src/features/opinion/SitingOpinionForm.tsx:121:104 | text | underservedZone | feedback-or-error | repeated-text |
| src/features/opinion/SitingOpinionForm.tsx:122:13 | text | {textField('rationale', '선택안의 근거', '저는 ___ 기준을 우선하여 ___안을 제안합니다.')} | learner-text-candidate | long-or-dense |
| src/features/opinion/SitingOpinionForm.tsx:124:32 | text | 선택안의 근거 | learner-text-candidate | repeated-text |
| src/features/opinion/SitingOpinionForm.tsx:124:43 | text | 저는 ___ 기준을 우선하여 ___안을 제안합니다. | learner-text-candidate | repeated-text |
| src/features/opinion/SitingOpinionForm.tsx:126:39 | text | 평균 이동 단위는 ___이고, 가장 불리한 ___구역은 ___입니다. | learner-text-candidate | repeated-text |
| src/features/opinion/SitingOpinionForm.tsx:127:39 | text | 이 선택은 ___에 유리하지만 ___에는 불리할 수 있습니다. | learner-text-candidate | repeated-text |
| src/features/opinion/SitingOpinionForm.tsx:129:48 | text | 용어 도움말 | hint | — |
| src/features/opinion/SitingOpinionForm.tsx:129:132 | text | {textField('counterargument', '예상되는 반론', '이에 대한 반론은 ___입니다.')} {textField('mitigation', '보완 방법', '이를 보완하기 위해 ___을 함께 제안합니다.')} | button-or-action, hint | long-or-dense |
| src/features/opinion/SitingOpinionForm.tsx:130:38 | text | 예상되는 반론 | learner-text-candidate | repeated-text |
| src/features/opinion/SitingOpinionForm.tsx:130:49 | text | 이에 대한 반론은 ___입니다. | learner-text-candidate | — |
| src/features/opinion/SitingOpinionForm.tsx:131:33 | text | 보완 방법 | learner-text-candidate | repeated-text |
| src/features/opinion/SitingOpinionForm.tsx:131:42 | text | 이를 보완하기 위해 ___을 함께 제안합니다. | learner-text-candidate | — |
| src/features/opinion/SitingOpinionForm.tsx:133:148 | text | 의견서 작성 | button-or-action | repeated-text |
| src/features/opinion/SitingOpinionForm.tsx:133:175 | text | {!validation.complete && | button-or-action | missing-term-explanation, technical-or-internal |
| src/features/opinion/SitingOpinionForm.tsx:134:51 | text | 필수 조건과 세 문장 내용을 모두 채우면 의견서를 완성할 수 있습니다. | learner-text-candidate | — |
| src/features/opinion/opinion.test.tsx:23:50 | text | A안 | learner-text-candidate | repeated-text |
| src/features/opinion/opinion.test.tsx:23:57 | text | B안 | learner-text-candidate | repeated-text |
| src/features/opinion/opinion.test.tsx:29:15 | text | 여러 구역의 이동 부담을 함께 살폈습니다. | instruction | repeated-text |
| src/features/opinion/opinion.test.tsx:29:59 | text | 다른 구역의 이동이 길어질 수 있습니다. | instruction | repeated-text |
| src/features/opinion/opinion.test.tsx:29:97 | text | 다음 단계에서 안내와 보완 시설을 함께 살핍니다. | instruction | repeated-text |
| src/features/opinion/opinion.test.tsx:42:50 | text | A안 | learner-text-candidate | repeated-text |
| src/features/opinion/opinion.test.tsx:42:57 | text | B안 | learner-text-candidate | repeated-text |
| src/features/opinion/opinion.test.tsx:53:35 | text | 선택안의 근거 | learner-text-candidate | repeated-text |
| src/features/opinion/opinion.test.tsx:53:59 | text | opinion-textarea | learner-text-candidate | — |
| src/features/opinion/opinion.test.tsx:54:40 | text | button | button-or-action | repeated-text |
| src/features/opinion/opinion.test.tsx:54:58 | text | 의견서 작성 | button-or-action | repeated-text |
| src/features/opinion/opinion.test.tsx:58:7 | text | hides invalid ARIA state until an opinion field is touched or submitted | button-or-action | long-or-dense, missing-term-explanation, technical-or-internal |
| src/features/opinion/opinion.test.tsx:58:92 | text | { const proposals = makeProposals(); render( | button-or-action | — |
| src/features/opinion/opinion.test.tsx:61:35 | text | 선택안의 근거 | learner-text-candidate | repeated-text |
| src/features/opinion/opinion.test.tsx:61:67 | text | aria-invalid | learner-text-candidate | missing-term-explanation, repeated-text, technical-or-internal |
| src/features/opinion/opinion.test.tsx:62:35 | text | 선택안의 근거 | learner-text-candidate | repeated-text |
| src/features/opinion/opinion.test.tsx:62:67 | text | aria-describedby | learner-text-candidate | missing-term-explanation, repeated-text, technical-or-internal |
| src/features/opinion/opinion.test.tsx:63:35 | text | 더 불편을 살필 구역 | learner-text-candidate | repeated-text |
| src/features/opinion/opinion.test.tsx:63:71 | text | aria-invalid | learner-text-candidate | missing-term-explanation, repeated-text, technical-or-internal |
| src/features/opinion/opinion.test.tsx:64:47 | text | 선택안 | learner-text-candidate | repeated-text |
| src/features/opinion/opinion.test.tsx:65:47 | text | 선택안 | learner-text-candidate | repeated-text |
| src/features/opinion/opinion.test.tsx:72:62 | text | 우선 기준 | learner-text-candidate | repeated-text |
| src/features/opinion/opinion.test.tsx:75:57 | text | 접근성 | learner-text-candidate | repeated-text |
| src/features/opinion/opinion.test.tsx:76:57 | text | 비용 | learner-text-candidate | repeated-text |
| src/features/opinion/opinion.test.tsx:78:44 | text | aria-describedby | feedback-or-error | missing-term-explanation, repeated-text, technical-or-internal |
| src/features/opinion/opinion.test.tsx:78:64 | text | opinion-error-priority | feedback-or-error | repeated-text |
| src/features/opinion/opinion.test.tsx:79:58 | text | 심의 접수에서 고른 기준과 같은 기준을 선택해 주세요. | learner-text-candidate | repeated-text |
| src/features/opinion/opinion.test.tsx:85:35 | text | 선택안의 근거 | learner-text-candidate | repeated-text |
| src/features/opinion/opinion.test.tsx:85:63 | text | maxlength | learner-text-candidate | repeated-text |
| src/features/opinion/opinion.test.tsx:86:35 | text | 예상되는 반론 | learner-text-candidate | repeated-text |
| src/features/opinion/opinion.test.tsx:86:63 | text | maxlength | learner-text-candidate | repeated-text |
| src/features/opinion/opinion.test.tsx:87:35 | text | 보완 방법 | learner-text-candidate | repeated-text |
| src/features/opinion/opinion.test.tsx:87:61 | text | maxlength | learner-text-candidate | repeated-text |
| src/features/opinion/opinion.test.tsx:88:30 | text | 저는 ___ 기준을 우선하여 ___안을 제안합니다. | learner-text-candidate | repeated-text |
| src/features/opinion/opinion.test.tsx:89:30 | text | 평균 이동 단위는 ___이고, 가장 불리한 ___구역은 ___입니다. | learner-text-candidate | repeated-text |
| src/features/opinion/opinion.test.tsx:90:30 | text | 이 선택은 ___에 유리하지만 ___에는 불리할 수 있습니다. | learner-text-candidate | repeated-text |
| src/features/opinion/opinion.test.tsx:95:117 | text | { const proposals = makeProposals(); const result = validateOpinion(draftFor(proposals), proposals); expect(result.complete).toBe(true); expect(Object.keys(result.errors)).toEqual(['proposal', 'evidence', 'underservedZone', 'rationale', 'counterargument', 'mitigation']); const complete = draftFor(proposals); const oneError: Array | feedback-or-error | long-or-dense, technical-or-internal |
| src/features/opinion/opinion.test.tsx:99:50 | text | proposal | feedback-or-error | repeated-text |
| src/features/opinion/opinion.test.tsx:99:62 | text | evidence | feedback-or-error | missing-term-explanation, repeated-text, technical-or-internal |
| src/features/opinion/opinion.test.tsx:99:74 | text | underservedZone | feedback-or-error | repeated-text |
| src/features/opinion/opinion.test.tsx:99:93 | text | rationale | feedback-or-error | repeated-text |
| src/features/opinion/opinion.test.tsx:99:106 | text | counterargument | feedback-or-error | repeated-text |
| src/features/opinion/opinion.test.tsx:99:125 | text | mitigation | feedback-or-error | repeated-text |
| src/features/opinion/opinion.test.tsx:105:48 | text | 짧음 | learner-text-candidate | repeated-text |
| src/features/opinion/opinion.test.tsx:106:60 | text | 짧음 | learner-text-candidate | repeated-text |
| src/features/opinion/opinion.test.tsx:107:50 | text | 짧음 | learner-text-candidate | repeated-text |
| src/features/opinion/opinion.test.tsx:114:98 | text | 짧음 | learner-text-candidate | repeated-text |
| src/features/opinion/opinion.test.tsx:115:74 | text | unknown-zone | feedback-or-error | — |
| src/features/opinion/opinion.test.tsx:118:63 | text | 가 | learner-text-candidate | repeated-text |
| src/features/opinion/opinion.test.tsx:122:83 | text | 접근성 자료를 충분히 살폈습니다. | learner-text-candidate | — |
| src/features/opinion/opinion.test.tsx:132:163 | text | ${result.evidenceText} 위조 | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/features/opinion/opinion.test.tsx:135:102 | text | 위조 | learner-text-candidate | repeated-text |
| src/features/opinion/opinion.test.tsx:136:102 | text | 위조 | feedback-or-error | repeated-text |
| src/features/opinion/opinion.test.tsx:147:30 | text | heading | heading | repeated-text |
| src/features/opinion/opinion.test.tsx:147:49 | text | 완성한 입지 심의 의견서 | heading | repeated-text |
| src/features/opinion/opinion.test.tsx:150:30 | text | 평균 이동 단위: ${selected.analysis.nearestFacilityAccess.populationWeightedAverage!.toFixed(1)} 이동 단위 | learner-text-candidate | long-or-dense |
| src/features/opinion/opinion.test.tsx:151:30 | text | 가장 긴 이동 단위: ${selected.analysis.nearestFacilityAccess.longestReachableTravel} 이동 단위 | learner-text-candidate | long-or-dense |
| src/features/opinion/opinion.test.tsx:152:30 | text | 위험 조건: ${selected.analysis.riskyCandidateIds.length}곳 | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/opinion/opinion.test.tsx:153:30 | text | 물빛 가운데 구역 | learner-text-candidate | repeated-text |
| src/features/opinion/opinion.test.tsx:154:30 | text | 여러 구역의 이동 부담을 함께 살폈습니다. | learner-text-candidate | repeated-text |
| src/features/opinion/opinion.test.tsx:155:30 | text | 다른 구역의 이동이 길어질 수 있습니다. | learner-text-candidate | repeated-text |
| src/features/opinion/opinion.test.tsx:156:30 | text | 다음 단계에서 안내와 보완 시설을 함께 살핍니다. | instruction | repeated-text |
| src/features/opinion/opinion.test.tsx:162:7 | text | announces completion and focuses the summary heading | heading | long-or-dense |
| src/features/opinion/opinion.test.tsx:162:73 | text | { const proposals = makeProposals(); const headingRef = { current: null } as { current: HTMLHeadingElement \| null }; render( | heading | long-or-dense, technical-or-internal |
| src/features/opinion/opinion.test.tsx:165:97 | text | bookmaru-library | heading | repeated-text |
| src/features/opinion/opinion.test.tsx:166:59 | text | 의견서가 완성되었습니다 | learner-text-candidate | — |
| src/features/opinion/opinion.test.tsx:167:55 | text | heading | heading | repeated-text |
| src/features/opinion/opinion.test.tsx:167:74 | text | 완성한 입지 심의 의견서 | heading | repeated-text |
| src/features/opinion/opinion.test.tsx:175:156 | text | ); await user.click(screen.getByRole('button', { name: '의견서 작성' })); expect(onSubmit).toHaveBeenCalledTimes(1); await user.click(screen.getByRole('checkbox', { name: '위험 조건' })); expect(onChange).toHaveBeenCalled(); const emitted = onChange.mock.lastCall?.[0] as OpinionDraft; expect(new Set(emitted.evidenceMetricIds).size).toBe(emitted.evidenceMetricIds.length); cleanup(); onSubmit.mockClear(); render( | button-or-action | long-or-dense, technical-or-internal |
| src/features/opinion/opinion.test.tsx:176:40 | text | button | button-or-action | repeated-text |
| src/features/opinion/opinion.test.tsx:176:58 | text | 의견서 작성 | button-or-action | repeated-text |
| src/features/opinion/opinion.test.tsx:178:60 | text | 위험 조건 | learner-text-candidate | repeated-text |
| src/features/opinion/opinion.test.tsx:186:30 | text | button | button-or-action | repeated-text |
| src/features/opinion/opinion.test.tsx:186:48 | text | 의견서 작성 | button-or-action | repeated-text |
| src/features/opinion/opinion.test.tsx:188:47 | text | 우선 기준 | learner-text-candidate | repeated-text |
| src/features/opinion/opinion.test.tsx:200:40 | text | button | button-or-action | repeated-text |
| src/features/opinion/opinion.test.tsx:200:58 | text | 브라우저에서 인쇄 | button-or-action | repeated-text |
| src/features/opinion/opinion.test.tsx:202:40 | text | button | button-or-action | repeated-text |
| src/features/opinion/opinion.test.tsx:202:58 | text | 처음부터 다시 시작 | button-or-action | repeated-text |
| src/features/opinion/opinion.test.tsx:212:58 | text | 의견서 자료를 표시할 수 없습니다 | learner-text-candidate | repeated-text |
| src/features/opinion/opinion.test.tsx:218:131 | text | ); expect(screen.getByRole('alert')).toHaveTextContent('의견서 자료를 표시할 수 없습니다'); for (const invalidDraft of [ { ...draftFor(proposals), underservedZoneId: null }, { ...draftFor(proposals), rationale: '가'.repeat(9) }, { ...draftFor(proposals), rationale: '가'.repeat(301) }, ]) { cleanup(); render( | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/opinion/opinion.test.tsx:219:58 | text | 의견서 자료를 표시할 수 없습니다 | learner-text-candidate | repeated-text |
| src/features/opinion/opinion.test.tsx:222:45 | text | 가 | learner-text-candidate | repeated-text |
| src/features/opinion/opinion.test.tsx:223:45 | text | 가 | learner-text-candidate | repeated-text |
| src/features/opinion/opinion.test.tsx:226:135 | text | ); expect(screen.getByRole('alert')).toHaveTextContent('의견서 자료를 표시할 수 없습니다'); } cleanup(); render( | learner-text-candidate | long-or-dense |
| src/features/opinion/opinion.test.tsx:227:60 | text | 의견서 자료를 표시할 수 없습니다 | learner-text-candidate | repeated-text |
| src/features/opinion/opinion.test.tsx:230:252 | text | ); expect(screen.getByRole('alert')).toHaveTextContent('선택안과 우선 기준을 확인할 수 없습니다'); cleanup(); const onSubmit = vi.fn(); render( | button-or-action | long-or-dense, multiple-actions, technical-or-internal |
| src/features/opinion/opinion.test.tsx:231:58 | text | 선택안과 우선 기준을 확인할 수 없습니다 | learner-text-candidate | multiple-actions |
| src/features/opinion/validateOpinion.ts:7:32 | text | proposal | feedback-or-error | repeated-text |
| src/features/opinion/validateOpinion.ts:7:45 | text | evidence | feedback-or-error | missing-term-explanation, repeated-text, technical-or-internal |
| src/features/opinion/validateOpinion.ts:7:58 | text | underservedZone | feedback-or-error | repeated-text |
| src/features/opinion/validateOpinion.ts:7:78 | text | rationale | feedback-or-error | repeated-text |
| src/features/opinion/validateOpinion.ts:7:92 | text | counterargument | feedback-or-error | repeated-text |
| src/features/opinion/validateOpinion.ts:7:112 | text | mitigation | feedback-or-error | repeated-text |
| src/features/opinion/validateOpinion.ts:8:103 | text | } const PRIORITIES: readonly PriorityId[] = ['access-equity', 'safety', 'cost']; const METRICS = ['average', 'maximum', 'unreachable', 'risk', 'cost'] as const; type OpinionMetric = (typeof METRICS)[number]; const errorKeys: readonly OpinionErrorKey[] = ['proposal', 'evidence', 'underservedZone', 'rationale', 'counterargument', 'mitigation']; const isRecord = (value: unknown): value is Record | feedback-or-error | long-or-dense, technical-or-internal |
| src/features/opinion/validateOpinion.ts:13:49 | text | proposal | feedback-or-error | repeated-text |
| src/features/opinion/validateOpinion.ts:13:61 | text | evidence | feedback-or-error | missing-term-explanation, repeated-text, technical-or-internal |
| src/features/opinion/validateOpinion.ts:13:73 | text | underservedZone | feedback-or-error | repeated-text |
| src/features/opinion/validateOpinion.ts:13:92 | text | rationale | feedback-or-error | repeated-text |
| src/features/opinion/validateOpinion.ts:13:105 | text | counterargument | feedback-or-error | repeated-text |
| src/features/opinion/validateOpinion.ts:13:124 | text | mitigation | feedback-or-error | repeated-text |
| src/features/opinion/validateOpinion.ts:76:88 | text | verdict | feedback-or-error | repeated-text |
| src/features/opinion/validateOpinion.ts:76:99 | text | conditionResults | feedback-or-error | repeated-text |
| src/features/opinion/validateOpinion.ts:76:119 | text | priorityConsistent | feedback-or-error | repeated-text |
| src/features/opinion/validateOpinion.ts:76:141 | text | missingEvidence | feedback-or-error | missing-term-explanation, repeated-text, technical-or-internal |
| src/features/opinion/validateOpinion.ts:76:160 | text | feedbackPrompts | feedback-or-error | repeated-text |
| src/features/opinion/validateOpinion.ts:79:43 | text | feedbackPrompts | feedback-or-error | repeated-text |
| src/features/opinion/validateOpinion.ts:81:37 | text | priorityConsistent | feedback-or-error | repeated-text |
| src/features/opinion/validateOpinion.ts:81:63 | text | boolean | feedback-or-error | — |
| src/features/opinion/validateOpinion.ts:82:50 | text | string | feedback-or-error | repeated-text |
| src/features/opinion/validateOpinion.ts:82:87 | text | typeof item === 'string') \|\| results.length !== mission.conditions.length) return false; const codes = new Set | feedback-or-error | long-or-dense |
| src/features/opinion/validateOpinion.ts:82:105 | text | string | feedback-or-error | repeated-text |
| src/features/opinion/validateOpinion.ts:97:43 | text | cloneProposalSnapshot(proposal as ProposalSnapshot)); if (cloned[0]?.id !== 'proposal-a' \|\| cloned[1]?.id !== 'proposal-b' \|\| !validAssessment(cloned[0]) \|\| !validAssessment(cloned[1])) return null; compareProposals(cloned[0], cloned[1]); return cloned; } catch { return null; } } const emptyErrors = (): Record | feedback-or-error | long-or-dense, technical-or-internal |
| src/features/opinion/validateOpinion.ts:104:108 | text | [key, null])) as Record | feedback-or-error | missing-term-explanation, technical-or-internal |
| src/features/opinion/validateOpinion.ts:132:87 | text | 의견서 선택 정보를 확인해 주세요. | feedback-or-error | multiple-actions |
| src/features/opinion/validateOpinion.ts:133:91 | text | 서로 다른 A안과 B안을 비교한 뒤 선택해 주세요. | feedback-or-error | multiple-actions |
| src/features/opinion/validateOpinion.ts:134:85 | text | 공개 판정 자료를 확인할 수 없습니다. | feedback-or-error | — |
| src/features/opinion/validateOpinion.ts:136:110 | text | 저장된 제안 중 하나를 선택해 주세요. | feedback-or-error | — |
| src/features/opinion/validateOpinion.ts:136:136 | text | 우선 기준을 선택해 주세요. | feedback-or-error | — |
| src/features/opinion/validateOpinion.ts:137:48 | text | average | feedback-or-error | repeated-text |
| src/features/opinion/validateOpinion.ts:137:102 | text | maximum | feedback-or-error | repeated-text |
| src/features/opinion/validateOpinion.ts:137:175 | text | average | feedback-or-error | repeated-text |
| src/features/opinion/validateOpinion.ts:137:199 | text | maximum | feedback-or-error | repeated-text |
| src/features/opinion/validateOpinion.ts:137:229 | text | 평균과 최대 이동, 그리고 추가 조건 하나 이상을 근거로 선택해 주세요. | feedback-or-error | multiple-conditions |
| src/features/opinion/validateOpinion.ts:140:122 | text | 선택안 분석에 있는 불편 구역을 선택해 주세요. | feedback-or-error | abstract-or-formal, multiple-actions |
| src/features/opinion/validateOpinion.ts:142:6 | text | rationale | feedback-or-error | repeated-text |
| src/features/opinion/validateOpinion.ts:142:19 | text | counterargument | feedback-or-error | repeated-text |
| src/features/opinion/validateOpinion.ts:142:38 | text | mitigation | feedback-or-error | repeated-text |
| src/features/opinion/validateOpinion.ts:142:77 | text | { const length = textLength(clonedDraft[key]); if (length | feedback-or-error | long-or-dense |
| src/features/opinion/validateOpinion.ts:142:173 | text | 공백을 제외하고 10~300자의 내용을 작성해 주세요. | feedback-or-error | — |
| src/features/perspective/AlternativeComparison.tsx:16:13 | text | 도서관 | learner-text-candidate | repeated-text |
| src/features/perspective/AlternativeComparison.tsx:17:22 | text | 건강 도움소 | hint | repeated-text |
| src/features/perspective/AlternativeComparison.tsx:18:22 | text | 생활문화센터 | learner-text-candidate | repeated-text |
| src/features/perspective/AlternativeComparison.tsx:21:53 | text | 이동 단위 | learner-text-candidate | repeated-text |
| src/features/perspective/AlternativeComparison.tsx:21:91 | text | 계산 불가 | learner-text-candidate | repeated-text |
| src/features/perspective/AlternativeComparison.tsx:22:52 | text | 이동 단위 | learner-text-candidate | repeated-text |
| src/features/perspective/AlternativeComparison.tsx:22:107 | text | 계산 불가 | learner-text-candidate | repeated-text |
| src/features/perspective/AlternativeComparison.tsx:42:29 | text | alternative-comparison-heading | heading | repeated-text |
| src/features/perspective/AlternativeComparison.tsx:43:45 | text | A안과 B안 비교 | heading | repeated-text |
| src/features/perspective/AlternativeComparison.tsx:44:21 | text | 비교 자료를 표시할 수 없습니다. 현재 미션과 두 제안의 분석 자료를 다시 확인해 주세요. | learner-text-candidate | abstract-or-formal, multiple-actions |
| src/features/perspective/AlternativeComparison.tsx:45:13 | text | ); function ProposalColumn({ title, proposal, city, mission }: { title: string; proposal: ProposalSnapshot; city: CityScenario; mission: MissionDefinition }) { return ( | heading | long-or-dense |
| src/features/perspective/AlternativeComparison.tsx:50:60 | text | ${proposal.id}-heading | heading | missing-term-explanation, technical-or-internal |
| src/features/perspective/AlternativeComparison.tsx:54:59 | text | item.id === placement.candidateId); return | learner-text-candidate | technical-or-internal |
| src/features/perspective/AlternativeComparison.tsx:55:45 | text | {facilityLabels[placement.facilityKind]}: {candidate?.name ?? '후보 확인 필요'} ({candidate?.coordinate.label ?? '좌표 없음'}) | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/perspective/AlternativeComparison.tsx:55:108 | text | 후보 확인 필요 | learner-text-candidate | — |
| src/features/perspective/AlternativeComparison.tsx:55:153 | text | 좌표 없음 | learner-text-candidate | repeated-text |
| src/features/perspective/AlternativeComparison.tsx:59:18 | text | 평균 이동 | learner-text-candidate | repeated-text |
| src/features/perspective/AlternativeComparison.tsx:60:18 | text | 최대 이동 | learner-text-candidate | repeated-text |
| src/features/perspective/AlternativeComparison.tsx:61:18 | text | 도달 불가 | learner-text-candidate | repeated-text |
| src/features/perspective/AlternativeComparison.tsx:61:32 | text | {proposal.analysis.nearestFacilityAccess.unreachableZoneIds.length}곳 | learner-text-candidate | long-or-dense, missing-term-explanation, technical-or-internal |
| src/features/perspective/AlternativeComparison.tsx:62:18 | text | 위험 후보 | learner-text-candidate | repeated-text |
| src/features/perspective/AlternativeComparison.tsx:62:32 | text | {proposal.analysis.riskyCandidateIds.length}곳 | learner-text-candidate | long-or-dense, missing-term-explanation, technical-or-internal |
| src/features/perspective/AlternativeComparison.tsx:63:18 | text | 비용 | learner-text-candidate | repeated-text |
| src/features/perspective/AlternativeComparison.tsx:63:29 | text | {proposal.analysis.totalCostTokens} 토큰 | learner-text-candidate | — |
| src/features/perspective/AlternativeComparison.tsx:64:18 | text | 기존 시설 중복 | learner-text-candidate | repeated-text |
| src/features/perspective/AlternativeComparison.tsx:64:35 | text | {proposal.analysis.overlapZoneIds.length}곳 | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/features/perspective/AlternativeComparison.tsx:66:61 | text | ${title} 공개 조건 결과 | learner-text-candidate | — |
| src/features/perspective/AlternativeComparison.tsx:67:18 | text | 공개 조건 결과 보기 | learner-text-candidate | — |
| src/features/perspective/AlternativeComparison.tsx:68:129 | text | item.code === condition.code)?.label ?? '공개 조건'}: {condition.passed ? '충족' : '미충족'} — {condition.evidenceText} | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/perspective/AlternativeComparison.tsx:68:171 | text | 공개 조건 | learner-text-candidate | repeated-text |
| src/features/perspective/AlternativeComparison.tsx:68:201 | text | 충족 | learner-text-candidate | repeated-text |
| src/features/perspective/AlternativeComparison.tsx:68:208 | text | 미충족 | learner-text-candidate | repeated-text |
| src/features/perspective/AlternativeComparison.tsx:70:15 | text | ); } export function AlternativeComparison({ city, mission, first, second, comparison }: AlternativeComparisonProps) { let propsValid: boolean; let safeCity: CityScenario \| null = null; let safeMission: MissionDefinition \| null = null; try { const cityIdDescriptor = Object.getOwnPropertyDescriptor(city, 'id'); const missionIdDescriptor = Object.getOwnPropertyDescriptor(mission, 'id'); if (isCanonicalCity(city) && isCanonicalMission(mission) && cityIdDescriptor !== undefined && 'value' in cityIdDescriptor && missionIdDescriptor !== undefined && 'value' in missionIdDescriptor) { const cityId = cityIdDescriptor.value === 'mulbit' ? 'mulbit' : 'maru'; safeCity = CITIES[cityId]; safeMission = MISSIONS[missionIdDescriptor.value as keyof typeof MISSIONS]; } const hasOnlyCanonicalFirst = first !== null && second === null && comparison === null; const hasCompleteComparison = first !== null && second !== null && comparison !== null; propsValid = safeCity !== null && safeMission !== null && safeMission.cityId === safeCity.id && (hasOnlyCanonicalFirst \|\| hasCompleteComparison); } catch { propsValid = false; } if (!propsValid \|\| safeCity === null \|\| safeMission === null) return invalidComparison(); let safeFirst: ProposalSnapshot \| null; let safeSecond: ProposalSnapshot \| null; let safeComparison: ProposalComparison \| null; try { safeFirst = first === null ? null : cloneProposalSnapshot(first); safeSecond = second === null ? null : cloneProposalSnapshot(second); safeComparison = comparison === null ? null : cloneProposalComparison(comparison); } catch { return invalidComparison(); } if (safeFirst !== null && (safeFirst.analysis.cityId !== safeCity.id \|\| safeFirst.analysis.missionId !== safeMission.id)) return invalidComparison(); if (safeFirst !== null && safeSecond !== null && safeComparison !== null) { try { if (safeFirst.analysis.cityId !== safeCity.id \|\| safeSecond.analysis.cityId !== safeCity.id \|\| safeFirst.analysis.missionId !== safeMission.id \|\| safeSecond.analysis.missionId !== safeMission.id \|\| !sameSerializableValue(compareProposals(safeFirst, safeSecond), safeComparison)) return invalidComparison(); } catch { return invalidComparison(); } } return ( | heading | long-or-dense, technical-or-internal |
| src/features/perspective/AlternativeComparison.tsx:117:31 | text | alternative-comparison-heading | heading | repeated-text |
| src/features/perspective/AlternativeComparison.tsx:118:47 | text | A안과 B안 비교 | heading | repeated-text |
| src/features/perspective/AlternativeComparison.tsx:118:61 | text | {safeFirst === null \|\| safeSecond === null \|\| safeComparison === null ? ( | heading | long-or-dense, technical-or-internal |
| src/features/perspective/AlternativeComparison.tsx:120:12 | text | 먼저 주민 관점표에서 A안을 저장한 뒤, 후보를 바꾸어 새로 분석하고 B안을 저장해 주세요. 두 안의 장단점을 함께 살펴봅니다. | learner-text-candidate | abstract-or-formal, long-or-dense |
| src/features/perspective/AlternativeComparison.tsx:124:36 | title | A안 | title | repeated-text |
| src/features/perspective/AlternativeComparison.tsx:125:36 | title | B안 | title | repeated-text |
| src/features/perspective/AlternativeComparison.tsx:127:37 | text | comparison-delta-heading | heading | — |
| src/features/perspective/AlternativeComparison.tsx:128:47 | text | B안 − A안 변화 | heading | — |
| src/features/perspective/AlternativeComparison.tsx:130:19 | text | 평균 이동 변화: {deltaText(safeComparison.averageDelta, ' 이동 단위', true)} | learner-text-candidate | long-or-dense |
| src/features/perspective/AlternativeComparison.tsx:130:70 | text | 이동 단위 | learner-text-candidate | repeated-text |
| src/features/perspective/AlternativeComparison.tsx:131:19 | text | 최대 이동 변화: {deltaText(safeComparison.maximumDelta)} | learner-text-candidate | long-or-dense |
| src/features/perspective/AlternativeComparison.tsx:132:19 | text | 도달 불가 구역 변화: {safeComparison.newlyUnreachableZoneIds.length}곳 새 미도달, {safeComparison.newlyReachedZoneIds.length}곳 새 도달 | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/perspective/AlternativeComparison.tsx:133:19 | text | 위험 후보 변화: {deltaText(safeComparison.riskCountDelta, '곳')} | learner-text-candidate | long-or-dense |
| src/features/perspective/AlternativeComparison.tsx:133:72 | text | 곳 | learner-text-candidate | repeated-text |
| src/features/perspective/AlternativeComparison.tsx:134:19 | text | 비용 변화: {deltaText(safeComparison.costTokenDelta, ' 토큰')} | learner-text-candidate | long-or-dense |
| src/features/perspective/AlternativeComparison.tsx:134:69 | text | 토큰 | learner-text-candidate | — |
| src/features/perspective/AlternativeComparison.tsx:135:19 | text | 기존 시설 중복 변화: {deltaText(safeComparison.overlapCountDelta, '곳')} | learner-text-candidate | long-or-dense |
| src/features/perspective/AlternativeComparison.tsx:135:78 | text | 곳 | learner-text-candidate | repeated-text |
| src/features/perspective/AlternativeComparison.tsx:137:79 | text | 없음 | learner-text-candidate | repeated-text |
| src/features/perspective/AlternativeComparison.tsx:138:90 | text | 없음 | learner-text-candidate | repeated-text |
| src/features/perspective/AlternativeComparison.tsx:139:90 | text | 없음 | learner-text-candidate | repeated-text |
| src/features/perspective/AlternativeComparison.tsx:141:53 | text | A안은 ___을 지키지만 ___이 불리하고, B안은 ___을 바꿉니다. | learner-text-candidate | repeated-text |
| src/features/perspective/AlternativeComparison.tsx:142:14 | text | 두 안의 차이를 보고, 더 살펴볼 조건이나 보완 방법을 질문으로 남겨 보세요. | learner-text-candidate | — |
| src/features/perspective/ResidentPerspective.tsx:23:13 | text | 도서관 | learner-text-candidate | repeated-text |
| src/features/perspective/ResidentPerspective.tsx:24:22 | text | 건강 도움소 | hint | repeated-text |
| src/features/perspective/ResidentPerspective.tsx:25:22 | text | 생활문화센터 | learner-text-candidate | repeated-text |
| src/features/perspective/ResidentPerspective.tsx:30:35 | text | 기존 혜택 없음 | learner-text-candidate | repeated-text |
| src/features/perspective/ResidentPerspective.tsx:36:37 | text | 기존 혜택 없음 | learner-text-candidate | repeated-text |
| src/features/perspective/ResidentPerspective.tsx:46:8 | text | 선택 시설의 새 혜택이 기준 안에 닿지 않음 | learner-text-candidate | — |
| src/features/perspective/ResidentPerspective.tsx:47:35 | text | ${facilityLabels[placement.facilityKind]}: ${reachedFor(placement) ? '기준 안' : '기준 밖'} | learner-text-candidate | long-or-dense |
| src/features/perspective/ResidentPerspective.tsx:50:111 | text | { if (travel === null) return `${zoneName}에서는 도로가 연결되지 않아 도달할 수 없습니다.`; if (longestTravel !== null && travel === longestTravel) return `${zoneName}에서는 가장 긴 ${travel} 이동 단위가 필요해 가장 불리한 구역입니다.`; if (travel | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/perspective/ResidentPerspective.tsx:51:32 | text | ${zoneName}에서는 도로가 연결되지 않아 도달할 수 없습니다. | learner-text-candidate | — |
| src/features/perspective/ResidentPerspective.tsx:52:67 | text | ${zoneName}에서는 가장 긴 ${travel} 이동 단위가 필요해 가장 불리한 구역입니다. | learner-text-candidate | long-or-dense |
| src/features/perspective/ResidentPerspective.tsx:53:28 | text | ${zoneName}에서는 ${travel} 이동 단위로 비교적 가깝습니다. | learner-text-candidate | — |
| src/features/perspective/ResidentPerspective.tsx:54:11 | text | ${zoneName}에서는 ${travel} 이동 단위가 필요해 이동 부담을 더 살펴야 합니다. | learner-text-candidate | — |
| src/features/perspective/ResidentPerspective.tsx:61:33 | text | resident-perspective-heading | heading | missing-term-explanation, repeated-text, technical-or-internal |
| src/features/perspective/ResidentPerspective.tsx:62:47 | text | 주민 관점표 | heading | repeated-text |
| src/features/perspective/ResidentPerspective.tsx:63:25 | text | 현재 배치와 일치하는 새 분석이 없어 주민 관점표를 표시할 수 없습니다. 영향 분석을 다시 계산해 주세요. | learner-text-candidate | abstract-or-formal |
| src/features/perspective/ResidentPerspective.tsx:75:53 | text | { const leftTravel = byZoneId.get(left.id)?.travelUnits ?? null; const rightTravel = byZoneId.get(right.id)?.travelUnits ?? null; const leftGroup = leftTravel === null ? 0 : leftTravel === longestTravel ? 1 : 2; const rightGroup = rightTravel === null ? 0 : rightTravel === longestTravel ? 1 : 2; return leftGroup === rightGroup ? left.id.localeCompare(right.id) : leftGroup - rightGroup; }); return ( | heading | long-or-dense, technical-or-internal |
| src/features/perspective/ResidentPerspective.tsx:84:31 | text | resident-perspective-heading | heading | missing-term-explanation, repeated-text, technical-or-internal |
| src/features/perspective/ResidentPerspective.tsx:85:45 | text | 주민 관점표 | heading | repeated-text |
| src/features/perspective/ResidentPerspective.tsx:86:10 | text | 구역마다 혜택과 이동 부담이 어떻게 달라지는지 확인합니다. | learner-text-candidate | — |
| src/features/perspective/ResidentPerspective.tsx:90:17 | text | 누가 더 불편한가요? | learner-text-candidate | repeated-text |
| src/features/perspective/ResidentPerspective.tsx:91:12 | text | 표를 살펴보고 한 구역을 선택해 근거로 남겨 주세요. | learner-text-candidate | multiple-actions |
| src/features/perspective/ResidentPerspective.tsx:92:44 | aria-label | 불편을 더 살펴볼 구역 | aria-label | — |
| src/features/perspective/ResidentPerspective.tsx:101:68 | text | 모바일에서는 표를 좌우로 밀어 모든 열을 살펴볼 수 있습니다. 첫 번째 구역 열은 화면에 붙어 있습니다. | hint | — |
| src/features/perspective/ResidentPerspective.tsx:104:20 | text | 구역별 주민 관점 비교 | learner-text-candidate | repeated-text |
| src/features/perspective/ResidentPerspective.tsx:105:38 | text | 구역 | learner-text-candidate | repeated-text |
| src/features/perspective/ResidentPerspective.tsx:105:61 | text | 사람 토큰 | learner-text-candidate | repeated-text |
| src/features/perspective/ResidentPerspective.tsx:105:87 | text | 이동 단위 | learner-text-candidate | repeated-text |
| src/features/perspective/ResidentPerspective.tsx:105:113 | text | 도달 여부 | learner-text-candidate | repeated-text |
| src/features/perspective/ResidentPerspective.tsx:105:139 | text | 기존 혜택 | learner-text-candidate | repeated-text |
| src/features/perspective/ResidentPerspective.tsx:105:165 | text | 새 혜택 | learner-text-candidate | repeated-text |
| src/features/perspective/ResidentPerspective.tsx:105:190 | text | 불편 이유 | learner-text-candidate | repeated-text |
| src/features/perspective/ResidentPerspective.tsx:105:216 | text | 이동 조건 | learner-text-candidate | repeated-text |
| src/features/perspective/ResidentPerspective.tsx:111:19 | text | {zone.peopleTokens} 사람 토큰 | learner-text-candidate | — |
| src/features/perspective/ResidentPerspective.tsx:112:19 | text | {unreachable ? '도달 불가' : `${travel} 이동 단위`} | learner-text-candidate | — |
| src/features/perspective/ResidentPerspective.tsx:112:35 | text | 도달 불가 | learner-text-candidate | repeated-text |
| src/features/perspective/ResidentPerspective.tsx:112:45 | text | ${travel} 이동 단위 | learner-text-candidate | — |
| src/features/perspective/ResidentPerspective.tsx:113:19 | text | {unreachable ? '도달 불가' : '도달 가능'} | learner-text-candidate | — |
| src/features/perspective/ResidentPerspective.tsx:113:35 | text | 도달 불가 | learner-text-candidate | repeated-text |
| src/features/perspective/ResidentPerspective.tsx:113:45 | text | 도달 가능 | learner-text-candidate | repeated-text |
| src/features/perspective/ResidentPerspective.tsx:117:19 | text | {zone.mobilityBarrier ? '이동 조건을 함께 살펴야 합니다' : '추가 이동 조건 표지 없음'} | learner-text-candidate | long-or-dense |
| src/features/perspective/ResidentPerspective.tsx:117:44 | text | 이동 조건을 함께 살펴야 합니다 | learner-text-candidate | repeated-text |
| src/features/perspective/ResidentPerspective.tsx:117:66 | text | 추가 이동 조건 표지 없음 | learner-text-candidate | repeated-text |
| src/features/perspective/ResidentPerspective.tsx:122:44 | text | {!hasSavedA && !hasSavedB && | button-or-action | — |
| src/features/perspective/ResidentPerspective.tsx:123:98 | text | A안 저장 | button-or-action | repeated-text |
| src/features/perspective/ResidentPerspective.tsx:123:112 | text | } {hasSavedA && !hasSavedB && isDifferentFromA && onSaveB !== undefined && | button-or-action | long-or-dense, technical-or-internal |
| src/features/perspective/ResidentPerspective.tsx:124:142 | text | B안 저장 | button-or-action | repeated-text |
| src/features/perspective/ResidentPerspective.tsx:124:156 | text | } {hasSavedA && !hasSavedB && !isDifferentFromA && | button-or-action | — |
| src/features/perspective/ResidentPerspective.tsx:125:99 | text | 후보 수정하여 B안 만들기 | button-or-action | repeated-text |
| src/features/perspective/ResidentPerspective.tsx:127:37 | text | 구역을 하나 선택하면 저장할 수 있습니다. | learner-text-candidate | — |
| src/features/perspective/perspective.test.tsx:17:13 | text | revise | feedback-or-error | — |
| src/features/perspective/perspective.test.tsx:20:27 | text | A안 | learner-text-candidate | repeated-text |
| src/features/perspective/perspective.test.tsx:20:34 | text | B안 | learner-text-candidate | repeated-text |
| src/features/perspective/perspective.test.tsx:22:87 | text | access-equity | learner-text-candidate | repeated-text |
| src/features/perspective/perspective.test.tsx:29:91 | text | A안 | learner-text-candidate | repeated-text |
| src/features/perspective/perspective.test.tsx:37:44 | text | A안 | learner-text-candidate | repeated-text |
| src/features/perspective/perspective.test.tsx:41:32 | text | A안 | learner-text-candidate | repeated-text |
| src/features/perspective/perspective.test.tsx:44:42 | text | C안 | learner-text-candidate | — |
| src/features/perspective/perspective.test.tsx:44:50 | text | A안 | learner-text-candidate | repeated-text |
| src/features/perspective/perspective.test.tsx:48:51 | text | A안 | learner-text-candidate | repeated-text |
| src/features/perspective/perspective.test.tsx:48:67 | text | B안 | learner-text-candidate | repeated-text |
| src/features/perspective/perspective.test.tsx:54:45 | text | A안 | learner-text-candidate | repeated-text |
| src/features/perspective/perspective.test.tsx:54:61 | text | A안 | learner-text-candidate | repeated-text |
| src/features/perspective/perspective.test.tsx:55:45 | text | B안 | learner-text-candidate | repeated-text |
| src/features/perspective/perspective.test.tsx:55:74 | text | A안 | learner-text-candidate | repeated-text |
| src/features/perspective/perspective.test.tsx:59:29 | text | A안 | learner-text-candidate | repeated-text |
| src/features/perspective/perspective.test.tsx:60:30 | text | B안 | learner-text-candidate | repeated-text |
| src/features/perspective/perspective.test.tsx:68:42 | text | reviewer getter failure | feedback-or-error | — |
| src/features/perspective/perspective.test.tsx:76:58 | text | 비교 자료를 표시할 수 없습니다 | learner-text-candidate | repeated-text |
| src/features/perspective/perspective.test.tsx:79:111 | text | { const island = [{ slotId: 'library-1', facilityKind: 'library' as const, candidateId: 'mulbit-e5-island' }]; const comparison = compareProposals(snapshot('A안', island), snapshot('B안', placementsA)); expect(comparison.newlyReachedZoneIds).toEqual(['mulbit-central', 'mulbit-east', 'mulbit-hill', 'mulbit-north', 'mulbit-south', 'mulbit-west']); expect(comparison.newlyUnreachableZoneIds).toEqual([]); const first = snapshot('A안', island); const second = snapshot('B안', placementsA); render( | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/perspective/perspective.test.tsx:81:51 | text | A안 | learner-text-candidate | repeated-text |
| src/features/perspective/perspective.test.tsx:81:75 | text | B안 | learner-text-candidate | repeated-text |
| src/features/perspective/perspective.test.tsx:84:29 | text | A안 | learner-text-candidate | repeated-text |
| src/features/perspective/perspective.test.tsx:85:30 | text | B안 | learner-text-candidate | repeated-text |
| src/features/perspective/perspective.test.tsx:88:30 | text | 새로 도달하지 못하게 된 구역: 없음 | learner-text-candidate | — |
| src/features/perspective/perspective.test.tsx:91:103 | text | { const island = [{ slotId: 'library-1', facilityKind: 'library' as const, candidateId: 'mulbit-e5-island' }]; const comparison = compareProposals(snapshot('A안', placementsA), snapshot('B안', island)); expect(comparison.newlyReachedZoneIds).toEqual([]); expect(comparison.newlyUnreachableZoneIds).toEqual(['mulbit-central', 'mulbit-east', 'mulbit-hill', 'mulbit-north', 'mulbit-south', 'mulbit-west']); render( | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/perspective/perspective.test.tsx:93:51 | text | A안 | learner-text-candidate | repeated-text |
| src/features/perspective/perspective.test.tsx:93:80 | text | B안 | learner-text-candidate | repeated-text |
| src/features/perspective/perspective.test.tsx:96:91 | text | A안 | learner-text-candidate | repeated-text |
| src/features/perspective/perspective.test.tsx:96:115 | text | B안 | learner-text-candidate | repeated-text |
| src/features/perspective/perspective.test.tsx:97:30 | text | 새로 도달한 구역: 없음 | learner-text-candidate | — |
| src/features/perspective/perspective.test.tsx:98:30 | text | 새로 도달하지 못하게 된 구역: 물빛 가운데 구역, 바람 동쪽 구역, 작은 언덕 구역, 햇살 북쪽 구역, 느티나무 남쪽 구역, 노을 서쪽 구역 | learner-text-candidate | long-or-dense |
| src/features/perspective/perspective.test.tsx:118:30 | text | heading | heading | repeated-text |
| src/features/perspective/perspective.test.tsx:118:49 | text | 주민 관점표 | heading | repeated-text |
| src/features/perspective/perspective.test.tsx:119:30 | text | 누가 더 불편한가요? | learner-text-candidate | repeated-text |
| src/features/perspective/perspective.test.tsx:120:30 | text | button | button-or-action | repeated-text |
| src/features/perspective/perspective.test.tsx:120:48 | text | A안 저장 | button-or-action | repeated-text |
| src/features/perspective/perspective.test.tsx:121:30 | text | 사람 토큰 | learner-text-candidate | repeated-text |
| src/features/perspective/perspective.test.tsx:122:33 | text | 이동 조건을 함께 살펴야 합니다 | learner-text-candidate | repeated-text |
| src/features/perspective/perspective.test.tsx:123:47 | text | 구역별 주민 관점 비교 | hint | repeated-text |
| src/features/perspective/perspective.test.tsx:135:9 | text | 느티나무 남쪽 구역 | learner-text-candidate | repeated-text |
| src/features/perspective/perspective.test.tsx:135:23 | text | 3 사람 토큰 | learner-text-candidate | — |
| src/features/perspective/perspective.test.tsx:135:34 | text | 4 이동 단위 | learner-text-candidate | — |
| src/features/perspective/perspective.test.tsx:135:45 | text | 도달 가능 | learner-text-candidate | repeated-text |
| src/features/perspective/perspective.test.tsx:135:54 | text | 도서관 | learner-text-candidate | repeated-text |
| src/features/perspective/perspective.test.tsx:135:61 | text | 도서관: 기준 안 | learner-text-candidate | repeated-text |
| src/features/perspective/perspective.test.tsx:135:74 | text | 느티나무 남쪽 구역에서는 가장 긴 4 이동 단위가 필요해 가장 불리한 구역입니다. | learner-text-candidate | — |
| src/features/perspective/perspective.test.tsx:135:123 | text | 이동 조건을 함께 살펴야 합니다 | learner-text-candidate | repeated-text |
| src/features/perspective/perspective.test.tsx:136:9 | text | 물빛 가운데 구역 | learner-text-candidate | repeated-text |
| src/features/perspective/perspective.test.tsx:136:22 | text | 6 사람 토큰 | learner-text-candidate | — |
| src/features/perspective/perspective.test.tsx:136:33 | text | 2 이동 단위 | learner-text-candidate | repeated-text |
| src/features/perspective/perspective.test.tsx:136:44 | text | 도달 가능 | learner-text-candidate | repeated-text |
| src/features/perspective/perspective.test.tsx:136:53 | text | 도서관 | learner-text-candidate | repeated-text |
| src/features/perspective/perspective.test.tsx:136:60 | text | 도서관: 기준 안 | learner-text-candidate | repeated-text |
| src/features/perspective/perspective.test.tsx:136:73 | text | 물빛 가운데 구역에서는 2 이동 단위가 필요해 이동 부담을 더 살펴야 합니다. | learner-text-candidate | — |
| src/features/perspective/perspective.test.tsx:136:120 | text | 추가 이동 조건 표지 없음 | learner-text-candidate | repeated-text |
| src/features/perspective/perspective.test.tsx:137:9 | text | 바람 동쪽 구역 | learner-text-candidate | repeated-text |
| src/features/perspective/perspective.test.tsx:137:21 | text | 4 사람 토큰 | learner-text-candidate | repeated-text |
| src/features/perspective/perspective.test.tsx:137:32 | text | 3 이동 단위 | learner-text-candidate | repeated-text |
| src/features/perspective/perspective.test.tsx:137:43 | text | 도달 가능 | learner-text-candidate | repeated-text |
| src/features/perspective/perspective.test.tsx:137:52 | text | 도서관 | learner-text-candidate | repeated-text |
| src/features/perspective/perspective.test.tsx:137:59 | text | 도서관: 기준 안 | learner-text-candidate | repeated-text |
| src/features/perspective/perspective.test.tsx:137:72 | text | 바람 동쪽 구역에서는 3 이동 단위가 필요해 이동 부담을 더 살펴야 합니다. | learner-text-candidate | — |
| src/features/perspective/perspective.test.tsx:137:118 | text | 추가 이동 조건 표지 없음 | learner-text-candidate | repeated-text |
| src/features/perspective/perspective.test.tsx:138:9 | text | 작은 언덕 구역 | learner-text-candidate | repeated-text |
| src/features/perspective/perspective.test.tsx:138:21 | text | 2 사람 토큰 | learner-text-candidate | — |
| src/features/perspective/perspective.test.tsx:138:32 | text | 3 이동 단위 | learner-text-candidate | repeated-text |
| src/features/perspective/perspective.test.tsx:138:43 | text | 도달 가능 | learner-text-candidate | repeated-text |
| src/features/perspective/perspective.test.tsx:138:52 | text | 도서관 | learner-text-candidate | repeated-text |
| src/features/perspective/perspective.test.tsx:138:59 | text | 도서관: 기준 안 | learner-text-candidate | repeated-text |
| src/features/perspective/perspective.test.tsx:138:72 | text | 작은 언덕 구역에서는 3 이동 단위가 필요해 이동 부담을 더 살펴야 합니다. | learner-text-candidate | — |
| src/features/perspective/perspective.test.tsx:138:118 | text | 추가 이동 조건 표지 없음 | learner-text-candidate | repeated-text |
| src/features/perspective/perspective.test.tsx:139:9 | text | 햇살 북쪽 구역 | learner-text-candidate | repeated-text |
| src/features/perspective/perspective.test.tsx:139:21 | text | 5 사람 토큰 | learner-text-candidate | — |
| src/features/perspective/perspective.test.tsx:139:32 | text | 2 이동 단위 | learner-text-candidate | repeated-text |
| src/features/perspective/perspective.test.tsx:139:43 | text | 도달 가능 | learner-text-candidate | repeated-text |
| src/features/perspective/perspective.test.tsx:139:52 | text | 도서관 | learner-text-candidate | repeated-text |
| src/features/perspective/perspective.test.tsx:139:59 | text | 도서관: 기준 안 | learner-text-candidate | repeated-text |
| src/features/perspective/perspective.test.tsx:139:72 | text | 햇살 북쪽 구역에서는 2 이동 단위가 필요해 이동 부담을 더 살펴야 합니다. | learner-text-candidate | — |
| src/features/perspective/perspective.test.tsx:139:118 | text | 이동 조건을 함께 살펴야 합니다 | learner-text-candidate | repeated-text |
| src/features/perspective/perspective.test.tsx:140:9 | text | 노을 서쪽 구역 | learner-text-candidate | repeated-text |
| src/features/perspective/perspective.test.tsx:140:21 | text | 4 사람 토큰 | learner-text-candidate | repeated-text |
| src/features/perspective/perspective.test.tsx:140:32 | text | 3 이동 단위 | learner-text-candidate | repeated-text |
| src/features/perspective/perspective.test.tsx:140:43 | text | 도달 가능 | learner-text-candidate | repeated-text |
| src/features/perspective/perspective.test.tsx:140:52 | text | 도서관 | learner-text-candidate | repeated-text |
| src/features/perspective/perspective.test.tsx:140:59 | text | 도서관: 기준 안 | learner-text-candidate | repeated-text |
| src/features/perspective/perspective.test.tsx:140:72 | text | 노을 서쪽 구역에서는 3 이동 단위가 필요해 이동 부담을 더 살펴야 합니다. | learner-text-candidate | — |
| src/features/perspective/perspective.test.tsx:140:118 | text | 추가 이동 조건 표지 없음 | learner-text-candidate | repeated-text |
| src/features/perspective/perspective.test.tsx:142:29 | text | 사람 토큰 | heading | repeated-text |
| src/features/perspective/perspective.test.tsx:142:38 | text | 이동 단위 | heading | repeated-text |
| src/features/perspective/perspective.test.tsx:142:47 | text | 도달 여부 | heading | repeated-text |
| src/features/perspective/perspective.test.tsx:142:56 | text | 기존 혜택 | heading | repeated-text |
| src/features/perspective/perspective.test.tsx:142:65 | text | 새 혜택 | heading | repeated-text |
| src/features/perspective/perspective.test.tsx:142:73 | text | 불편 이유 | heading | repeated-text |
| src/features/perspective/perspective.test.tsx:142:82 | text | 이동 조건 | heading | repeated-text |
| src/features/perspective/perspective.test.tsx:143:32 | text | columnheader | heading | — |
| src/features/perspective/perspective.test.tsx:146:33 | text | 추가 이동 조건 표지 없음 | learner-text-candidate | repeated-text |
| src/features/perspective/perspective.test.tsx:154:89 | text | 바람 언덕 구역 | learner-text-candidate | repeated-text |
| src/features/perspective/perspective.test.tsx:155:70 | text | 기존 혜택 없음 | learner-text-candidate | repeated-text |
| src/features/perspective/perspective.test.tsx:159:29 | text | A안 | learner-text-candidate | repeated-text |
| src/features/perspective/perspective.test.tsx:160:30 | text | B안 | learner-text-candidate | repeated-text |
| src/features/perspective/perspective.test.tsx:163:58 | text | 비교 자료를 표시할 수 없습니다 | learner-text-candidate | repeated-text |
| src/features/perspective/perspective.test.tsx:173:247 | text | )).not.toThrow(); expect(screen.getByRole('alert')).toHaveTextContent('비교 자료를 표시할 수 없습니다'); cleanup(); } render( | learner-text-candidate | long-or-dense |
| src/features/perspective/perspective.test.tsx:174:60 | text | 비교 자료를 표시할 수 없습니다 | learner-text-candidate | repeated-text |
| src/features/perspective/perspective.test.tsx:178:30 | text | heading | heading | repeated-text |
| src/features/perspective/perspective.test.tsx:178:49 | text | A안과 B안 비교 | heading | repeated-text |
| src/features/perspective/perspective.test.tsx:179:47 | text | A안 공개 조건 결과 | learner-text-candidate | — |
| src/features/perspective/perspective.test.tsx:180:47 | text | B안 공개 조건 결과 | learner-text-candidate | — |
| src/features/perspective/perspective.test.tsx:182:30 | text | 도서관: 느린 강변 터 (B2) | learner-text-candidate | repeated-text |
| src/features/perspective/perspective.test.tsx:183:30 | text | 도서관: 푸른길 터 (D3) | learner-text-candidate | — |
| src/features/perspective/perspective.test.tsx:186:10 | text | 평균 이동 | learner-text-candidate | repeated-text |
| src/features/perspective/perspective.test.tsx:186:19 | text | 2.7 이동 단위 | learner-text-candidate | repeated-text |
| src/features/perspective/perspective.test.tsx:186:34 | text | 최대 이동 | learner-text-candidate | repeated-text |
| src/features/perspective/perspective.test.tsx:186:43 | text | 4.0 이동 단위 | learner-text-candidate | — |
| src/features/perspective/perspective.test.tsx:186:58 | text | 도달 불가 | learner-text-candidate | repeated-text |
| src/features/perspective/perspective.test.tsx:186:67 | text | 0곳 | learner-text-candidate | repeated-text |
| src/features/perspective/perspective.test.tsx:186:75 | text | 위험 후보 | learner-text-candidate | repeated-text |
| src/features/perspective/perspective.test.tsx:186:84 | text | 0곳 | learner-text-candidate | repeated-text |
| src/features/perspective/perspective.test.tsx:186:92 | text | 비용 | learner-text-candidate | repeated-text |
| src/features/perspective/perspective.test.tsx:186:98 | text | 1 토큰 | learner-text-candidate | — |
| src/features/perspective/perspective.test.tsx:186:108 | text | 기존 시설 중복 | learner-text-candidate | repeated-text |
| src/features/perspective/perspective.test.tsx:186:120 | text | 6곳 | learner-text-candidate | repeated-text |
| src/features/perspective/perspective.test.tsx:187:10 | text | 평균 이동 | learner-text-candidate | repeated-text |
| src/features/perspective/perspective.test.tsx:187:19 | text | 2.8 이동 단위 | learner-text-candidate | — |
| src/features/perspective/perspective.test.tsx:187:34 | text | 최대 이동 | learner-text-candidate | repeated-text |
| src/features/perspective/perspective.test.tsx:187:43 | text | 5.0 이동 단위 | learner-text-candidate | — |
| src/features/perspective/perspective.test.tsx:187:58 | text | 도달 불가 | learner-text-candidate | repeated-text |
| src/features/perspective/perspective.test.tsx:187:67 | text | 0곳 | learner-text-candidate | repeated-text |
| src/features/perspective/perspective.test.tsx:187:75 | text | 위험 후보 | learner-text-candidate | repeated-text |
| src/features/perspective/perspective.test.tsx:187:84 | text | 0곳 | learner-text-candidate | repeated-text |
| src/features/perspective/perspective.test.tsx:187:92 | text | 비용 | learner-text-candidate | repeated-text |
| src/features/perspective/perspective.test.tsx:187:98 | text | 3 토큰 | learner-text-candidate | — |
| src/features/perspective/perspective.test.tsx:187:108 | text | 기존 시설 중복 | learner-text-candidate | repeated-text |
| src/features/perspective/perspective.test.tsx:187:120 | text | 6곳 | learner-text-candidate | repeated-text |
| src/features/perspective/perspective.test.tsx:189:30 | text | 예산 토큰 3개 안에 놓기: 충족 — 배치 비용 1토큰 / 공개 한도 3토큰입니다. | learner-text-candidate | repeated-text |
| src/features/perspective/perspective.test.tsx:190:30 | text | 예산 토큰 3개 안에 놓기: 충족 — 배치 비용 3토큰 / 공개 한도 3토큰입니다. | learner-text-candidate | — |
| src/features/perspective/perspective.test.tsx:191:33 | text | 도달 불가 구역 없이 놓기: 충족 — 도달 불가 구역 0곳 / 공개 한도 0곳입니다. | learner-text-candidate | — |
| src/features/perspective/perspective.test.tsx:192:30 | text | 가장 먼 구역 이동 단위 7 이하: 충족 — 가장 긴 이동 단위 4 / 공개 한도 7입니다. | learner-text-candidate | long-or-dense |
| src/features/perspective/perspective.test.tsx:193:30 | text | 가장 먼 구역 이동 단위 7 이하: 충족 — 가장 긴 이동 단위 5 / 공개 한도 7입니다. | learner-text-candidate | long-or-dense |
| src/features/perspective/perspective.test.tsx:194:33 | text | 위험 표지가 없는 터 선택하기: 충족 — 위험 표지가 있는 선택 터 0곳 / 공개 한도 0곳입니다. | learner-text-candidate | multiple-actions |
| src/features/perspective/perspective.test.tsx:195:30 | text | 비용 우선 기준은 2토큰 이하: 충족 — 비용 1토큰 / 우선 기준 공개 한도 2토큰입니다. | learner-text-candidate | — |
| src/features/perspective/perspective.test.tsx:196:30 | text | 비용 우선 기준은 2토큰 이하: 미충족 — 비용 3토큰 / 우선 기준 공개 한도 2토큰입니다. | learner-text-candidate | — |
| src/features/perspective/perspective.test.tsx:208:42 | text | A안 | learner-text-candidate | repeated-text |
| src/features/perspective/perspective.test.tsx:211:42 | text | A안 | learner-text-candidate | repeated-text |
| src/features/perspective/perspective.test.tsx:212:92 | text | 위조 | learner-text-candidate | repeated-text |
| src/features/perspective/perspective.test.tsx:213:42 | text | A안 | learner-text-candidate | repeated-text |
| src/features/placement/CandidateBoard.tsx:11:64 | text | mulbit | learner-text-candidate | repeated-text |
| src/features/placement/CandidateBoard.tsx:11:75 | text | 물빛 | learner-text-candidate | repeated-text |
| src/features/placement/CandidateBoard.tsx:11:82 | text | 마루 | learner-text-candidate | repeated-text |
| src/features/placement/CandidateBoard.tsx:15:20 | text | 위험 표지: ${marker.label} | learner-text-candidate | — |
| src/features/placement/CandidateBoard.tsx:15:47 | text | 위험 표지 없음 | learner-text-candidate | repeated-text |
| src/features/placement/CandidateBoard.tsx:20:35 | text | 연결 도로 없음 | learner-text-candidate | repeated-text |
| src/features/placement/CandidateBoard.tsx:21:36 | text | road.travelUnits); const minimum = Math.min(...units); const maximum = Math.max(...units); const range = minimum === maximum ? `${minimum}` : `${minimum}~${maximum}`; return `연결 도로 ${links.length}개 · 이동 단위 ${range}`; } export function CandidateBoard({ city, selectedCandidateId, disabledCandidateIds = new Set | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/placement/CandidateBoard.tsx:25:11 | text | 연결 도로 ${links.length}개 · 이동 단위 ${range} | learner-text-candidate | — |
| src/features/placement/CandidateBoard.tsx:37:15 | text | 후보지 선택 | learner-text-candidate | repeated-text |
| src/features/placement/CandidateBoard.tsx:38:10 | text | 라디오 버튼으로 후보지를 고른 뒤 시설 배치 버튼을 누릅니다. 드래그는 사용하지 않습니다. | learner-text-candidate | — |
| src/features/placement/CandidateBoard.tsx:39:42 | text | { const reason = candidateReasons.get(candidate.id); const disabled = disabledCandidateIds.has(candidate.id); const detailsId = `candidate-details-${candidate.id}`; return ( | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/placement/CandidateBoard.tsx:56:23 | text | {candidate.name} ({cityLabel(city)} {candidate.coordinate.label}) | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/placement/CandidateBoard.tsx:57:36 | text | 좌표 {candidate.coordinate.label} · 비용 {candidate.costTokens}토큰 · {riskText(city, candidate)} · {roadSummary(city, candidate)} {reason ? ` · ${reason}` : ''} | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/placement/FacilityPlacementPanel.invalid-state.test.tsx:22:7 | text | fails closed without buttons, -Infinity, or a thrown render for damaged placements | learner-text-candidate | long-or-dense |
| src/features/placement/FacilityPlacementPanel.invalid-state.test.tsx:25:47 | text | accessor should not be read | feedback-or-error | — |
| src/features/placement/FacilityPlacementPanel.invalid-state.test.tsx:42:37 | text | button | button-or-action | repeated-text |
| src/features/placement/FacilityPlacementPanel.tsx:13:13 | text | 도서관 | learner-text-candidate | repeated-text |
| src/features/placement/FacilityPlacementPanel.tsx:14:22 | text | 건강 도움소 | hint | repeated-text |
| src/features/placement/FacilityPlacementPanel.tsx:15:22 | text | 생활문화센터 | learner-text-candidate | repeated-text |
| src/features/placement/FacilityPlacementPanel.tsx:19:72 | text | 책마루 도서관 | learner-text-candidate | — |
| src/features/placement/FacilityPlacementPanel.tsx:23:58 | text | `${facilityLabels[slot.facilityKind]} ${slot.slotId.split('-').pop() ?? ''}곳`; export interface FacilityPlacementPanelProps { currentAction?: GuidedActionId; } export function FacilityPlacementPanel({ currentAction = null }: FacilityPlacementPanelProps) { const { state, dispatch } = useSession(); const [calculationError, setCalculationError] = useState(''); const mission = missionForId(state.missionId); const city = cityForId(state.cityId); if (mission === undefined \|\| city === undefined \|\| mission.cityId !== city.id) { return ( | heading, feedback-or-error | long-or-dense, technical-or-internal |
| src/features/placement/FacilityPlacementPanel.tsx:23:60 | text | ${facilityLabels[slot.facilityKind]} ${slot.slotId.split('-').pop() ?? ''}곳 | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/placement/FacilityPlacementPanel.tsx:37:33 | text | placement-heading | heading | repeated-text |
| src/features/placement/FacilityPlacementPanel.tsx:38:36 | text | 후보 배치판 | heading | repeated-text |
| src/features/placement/FacilityPlacementPanel.tsx:39:25 | text | 미션과 가상 도시 자료를 확인할 수 없어 시설을 배치할 수 없습니다. 심의 접수에서 다시 선택해 주세요. | learner-text-candidate | multiple-actions |
| src/features/placement/FacilityPlacementPanel.tsx:40:17 | text | ); } if (!validatePlacements(mission, city, state.placements)) { return ( | heading | long-or-dense, technical-or-internal |
| src/features/placement/FacilityPlacementPanel.tsx:46:33 | text | placement-heading | heading | repeated-text |
| src/features/placement/FacilityPlacementPanel.tsx:47:36 | text | 후보 배치판 | heading | repeated-text |
| src/features/placement/FacilityPlacementPanel.tsx:48:25 | text | 현재 시설 배치 자료가 올바르지 않아 배치를 계속할 수 없습니다. 심의 접수에서 다시 시작해 주세요. | learner-text-candidate | — |
| src/features/placement/FacilityPlacementPanel.tsx:59:83 | text | 다른 시설 슬롯에서 이미 사용한 후보입니다. | learner-text-candidate | — |
| src/features/placement/FacilityPlacementPanel.tsx:71:28 | text | 영향 계산을 완료하지 못했습니다. 현재 배치를 확인한 뒤 다시 시도해 주세요. | feedback-or-error | multiple-actions, shaming-tone |
| src/features/placement/FacilityPlacementPanel.tsx:80:53 | text | 후보지를 먼저 선택해 주세요. | learner-text-candidate | repeated-text |
| src/features/placement/FacilityPlacementPanel.tsx:81:50 | text | 선택한 후보를 찾을 수 없습니다. | learner-text-candidate | — |
| src/features/placement/FacilityPlacementPanel.tsx:84:34 | text | 이 후보는 다른 시설 슬롯에서 이미 사용 중이므로 배치할 수 없습니다. | learner-text-candidate | — |
| src/features/placement/FacilityPlacementPanel.tsx:86:32 | text | 후보지를 먼저 선택해 주세요. | learner-text-candidate | repeated-text |
| src/features/placement/FacilityPlacementPanel.tsx:89:36 | text | 예산을 ${Math.abs(nextRemaining)}토큰 초과하여 배치할 수 없습니다. | learner-text-candidate | — |
| src/features/placement/FacilityPlacementPanel.tsx:90:64 | text | 현재 배치와 같습니다. | learner-text-candidate | repeated-text |
| src/features/placement/FacilityPlacementPanel.tsx:91:13 | text | 이 후보를 이 시설 슬롯에 배치할 수 있습니다. | learner-text-candidate | — |
| src/features/placement/FacilityPlacementPanel.tsx:100:132 | text | = 0; }; return ( | heading | — |
| src/features/placement/FacilityPlacementPanel.tsx:104:31 | text | placement-heading | heading | repeated-text |
| src/features/placement/FacilityPlacementPanel.tsx:105:34 | text | 후보 배치판 | heading | repeated-text |
| src/features/placement/FacilityPlacementPanel.tsx:107:43 | text | 남은 예산 토큰 {remainingBudget} | learner-text-candidate | — |
| src/features/placement/FacilityPlacementPanel.tsx:115:52 | aria-label | 시설 배치 슬롯 | aria-label | — |
| src/features/placement/FacilityPlacementPanel.tsx:117:111 | text | candidate.id === slot.candidateId); const slotLabel = labelForSlot(slot); const selectedInstruction = selectedCandidate === undefined ? `${facilityLabels[slot.facilityKind]}을(를) 놓을 후보를 선택하세요.` : `${selectedCandidate.coordinate.label}에 ${facilityDisplayName(mission, slot.facilityKind)} 놓기`; return ( | instruction | long-or-dense, technical-or-internal |
| src/features/placement/FacilityPlacementPanel.tsx:120:16 | text | ${facilityLabels[slot.facilityKind]}을(를) 놓을 후보를 선택하세요. | learner-text-candidate | long-or-dense |
| src/features/placement/FacilityPlacementPanel.tsx:121:16 | text | ${selectedCandidate.coordinate.label}에 ${facilityDisplayName(mission, slot.facilityKind)} 놓기 | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/placement/FacilityPlacementPanel.tsx:125:18 | text | {slot.candidateId && currentCandidate ? `${facilityDisplayName(mission, slot.facilityKind)} 배치: ${currentCandidate.coordinate.label}` : selectedInstruction} | instruction | long-or-dense, technical-or-internal |
| src/features/placement/FacilityPlacementPanel.tsx:126:20 | text | ${facilityDisplayName(mission, slot.facilityKind)} 배치: ${currentCandidate.coordinate.label} | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/placement/FacilityPlacementPanel.tsx:133:22 | text | ${slotLabel} 시설 배치 — ${selectedInstruction} | instruction | — |
| src/features/placement/FacilityPlacementPanel.tsx:134:37 | text | combined-review | learner-text-candidate | repeated-text |
| src/features/placement/FacilityPlacementPanel.tsx:134:57 | text | ${slotLabel} 시설 배치 | learner-text-candidate | — |
| src/features/placement/FacilityPlacementPanel.tsx:135:36 | text | placement-reason-${slot.slotId} | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/features/placement/FacilityPlacementPanel.tsx:140:16 | text | 시설 배치 | button-or-action | repeated-text |
| src/features/placement/FacilityPlacementPanel.tsx:141:90 | text | {reasonFor(slot)} | learner-text-candidate | — |
| src/features/placement/FacilityPlacementPanel.tsx:146:10 | text | 각 수치는 실제 도시가 아닌 가상 격자 모형의 상대 단위입니다. 후보지를 바꾸면 영향 분석을 다시 확인해야 합니다. | learner-text-candidate | abstract-or-formal, long-or-dense, multiple-conditions |
| src/features/placement/FacilityPlacementPanel.tsx:147:138 | text | 영향 계산 | learner-text-candidate | repeated-text |
| src/features/placement/FacilityPlacementPanel.tsx:147:164 | text | {calculationError && | feedback-or-error | — |
| src/features/placement/FacilityPlacementPanel.tsx:148:66 | text | } {!placementComplete && | feedback-or-error | — |
| src/features/placement/FacilityPlacementPanel.tsx:149:47 | text | 모든 시설 슬롯에 유효한 후보지를 배치하면 영향 분석실로 갈 수 있습니다. | learner-text-candidate | abstract-or-formal |
| src/features/placement/placement.test.tsx:43:30 | text | button | button-or-action | repeated-text |
| src/features/placement/placement.test.tsx:46:7 | text | places a facility through candidate selection and a named button | button-or-action | long-or-dense, missing-term-explanation, technical-or-internal |
| src/features/placement/placement.test.tsx:51:40 | text | button | button-or-action | repeated-text |
| src/features/placement/placement.test.tsx:52:37 | text | 책마루 도서관 배치: B2 | learner-text-candidate | repeated-text |
| src/features/placement/placement.test.tsx:63:37 | text | 남은 예산 토큰 4 | learner-text-candidate | — |
| src/features/placement/placement.test.tsx:108:37 | text | 도서관 1곳 | learner-text-candidate | — |
| src/features/placement/placement.test.tsx:109:30 | text | 건강 도움소 1곳 | hint | repeated-text |
| src/features/placement/placement.test.tsx:111:40 | text | button | button-or-action | repeated-text |
| src/features/placement/placement.test.tsx:112:37 | text | 도서관 배치: B2 | learner-text-candidate | — |
| src/features/placement/placement.test.tsx:115:40 | text | button | button-or-action, hint | repeated-text |
| src/features/placement/placement.test.tsx:116:37 | text | 건강 도움소 배치: E3 | hint | — |
| src/features/placement/placement.test.tsx:117:30 | text | 남은 예산 토큰 2 | learner-text-candidate | repeated-text |
| src/features/placement/placement.test.tsx:125:40 | text | button | button-or-action | repeated-text |
| src/features/placement/placement.test.tsx:126:30 | text | button | button-or-action | repeated-text |
| src/features/placement/placement.test.tsx:127:30 | text | button | button-or-action, hint | repeated-text |
| src/features/placement/placement.test.tsx:136:40 | text | button | button-or-action | repeated-text |
| src/features/placement/placement.test.tsx:138:40 | text | button | button-or-action, hint | repeated-text |
| src/features/placement/placement.test.tsx:140:30 | text | button | button-or-action, hint | repeated-text |
| src/features/placement/placement.test.tsx:150:37 | text | button | button-or-action | repeated-text |
| src/features/placement/placement.test.tsx:153:37 | text | 책마루 도서관 배치: B2 | learner-text-candidate | repeated-text |
| src/features/placement/placement.test.tsx:156:7 | text | keeps all placement buttons disabled until a candidate is selected | learner-text-candidate | long-or-dense, missing-term-explanation, technical-or-internal |
| src/features/placement/placement.test.tsx:158:30 | text | 건강 도움소 1곳 | hint | repeated-text |
| src/features/placement/placement.test.tsx:159:26 | text | button | button-or-action | repeated-text |
| src/features/placement/placement.test.tsx:167:39 | text | radio | learner-text-candidate | repeated-text |
| src/features/placement/placement.test.tsx:167:67 | text | ${candidate.name}.*${candidate.coordinate.label} | learner-text-candidate | long-or-dense, missing-term-explanation, technical-or-internal |
| src/features/placement/placement.test.tsx:168:74 | text | 비용 ${candidate.costTokens}토큰 | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/features/placement/placement.test.tsx:183:21 | text | bookmaru-library | learner-text-candidate | repeated-text |
| src/features/placement/placement.test.tsx:183:49 | text | mulbit | learner-text-candidate | repeated-text |
| src/features/placement/placement.test.tsx:183:70 | text | 물빛 | learner-text-candidate | repeated-text |
| src/features/placement/placement.test.tsx:185:33 | text | 위험 표지 없음 | learner-text-candidate | repeated-text |
| src/features/placement/placement.test.tsx:185:52 | text | 연결 도로 4개 · 이동 단위 1 | learner-text-candidate | repeated-text |
| src/features/placement/placement.test.tsx:186:33 | text | 위험 표지 없음 | learner-text-candidate | repeated-text |
| src/features/placement/placement.test.tsx:186:52 | text | 연결 도로 4개 · 이동 단위 1 | learner-text-candidate | repeated-text |
| src/features/placement/placement.test.tsx:187:33 | text | 위험 표지 없음 | learner-text-candidate | repeated-text |
| src/features/placement/placement.test.tsx:187:52 | text | 연결 도로 4개 · 이동 단위 1 | learner-text-candidate | repeated-text |
| src/features/placement/placement.test.tsx:188:33 | text | 위험 표지 없음 | learner-text-candidate | repeated-text |
| src/features/placement/placement.test.tsx:188:52 | text | 연결 도로 4개 · 이동 단위 1 | learner-text-candidate | repeated-text |
| src/features/placement/placement.test.tsx:189:39 | text | 위험 표지: 비가 오면 물이 고일 수 있는 표지 | learner-text-candidate | — |
| src/features/placement/placement.test.tsx:189:76 | text | 연결 도로 3개 · 이동 단위 1 | learner-text-candidate | repeated-text |
| src/features/placement/placement.test.tsx:190:40 | text | 위험 표지 없음 | learner-text-candidate | repeated-text |
| src/features/placement/placement.test.tsx:190:59 | text | 연결 도로 없음 | learner-text-candidate | repeated-text |
| src/features/placement/placement.test.tsx:194:21 | text | combined-review | learner-text-candidate | repeated-text |
| src/features/placement/placement.test.tsx:194:48 | text | maru | learner-text-candidate | repeated-text |
| src/features/placement/placement.test.tsx:194:67 | text | 마루 | learner-text-candidate | repeated-text |
| src/features/placement/placement.test.tsx:196:31 | text | 위험 표지 없음 | learner-text-candidate | repeated-text |
| src/features/placement/placement.test.tsx:196:50 | text | 연결 도로 4개 · 이동 단위 1~2 | learner-text-candidate | repeated-text |
| src/features/placement/placement.test.tsx:197:31 | text | 위험 표지 없음 | learner-text-candidate | repeated-text |
| src/features/placement/placement.test.tsx:197:50 | text | 연결 도로 4개 · 이동 단위 1~2 | learner-text-candidate | repeated-text |
| src/features/placement/placement.test.tsx:198:31 | text | 위험 표지 없음 | learner-text-candidate | repeated-text |
| src/features/placement/placement.test.tsx:198:50 | text | 연결 도로 4개 · 이동 단위 1 | learner-text-candidate | repeated-text |
| src/features/placement/placement.test.tsx:199:31 | text | 위험 표지 없음 | learner-text-candidate | repeated-text |
| src/features/placement/placement.test.tsx:199:50 | text | 연결 도로 3개 · 이동 단위 1 | learner-text-candidate | repeated-text |
| src/features/placement/placement.test.tsx:200:37 | text | 위험 표지: 경사가 가파른 표지 | learner-text-candidate | — |
| src/features/placement/placement.test.tsx:200:65 | text | 연결 도로 2개 · 이동 단위 1 | learner-text-candidate | repeated-text |
| src/features/placement/placement.test.tsx:201:39 | text | 위험 표지 없음 | learner-text-candidate | repeated-text |
| src/features/placement/placement.test.tsx:201:58 | text | 연결 도로 2개 · 이동 단위 1 | learner-text-candidate | repeated-text |
| src/features/placement/placement.test.tsx:208:32 | text | radio | learner-text-candidate | repeated-text |
| src/features/placement/placement.test.tsx:208:60 | text | ${city.candidates[0]!.name}.*${city.candidates[0]!.coordinate.label} | learner-text-candidate | long-or-dense, missing-term-explanation, technical-or-internal |
| src/features/placement/placement.test.tsx:211:41 | text | radio | learner-text-candidate | repeated-text |
| src/features/placement/placement.test.tsx:211:69 | text | ${candidate.name}.*${scenario.cityLabel} ${candidate.coordinate.label} | learner-text-candidate | long-or-dense, missing-term-explanation, technical-or-internal |
| src/features/placement/placement.test.tsx:212:52 | text | 좌표 ${candidate.coordinate.label} · 비용 ${candidate.costTokens}토큰 · ${details!.risk} · ${details!.roads} | learner-text-candidate | long-or-dense, missing-term-explanation, technical-or-internal |
| src/features/placement/placement.test.tsx:223:40 | text | button | button-or-action | repeated-text |
| src/features/placement/placement.test.tsx:224:30 | text | 남은 예산 토큰 1 | learner-text-candidate | repeated-text |
| src/features/placement/placement.test.tsx:226:40 | text | button | button-or-action | repeated-text |
| src/features/placement/placement.test.tsx:227:30 | text | 책마루 도서관 배치: B2 | learner-text-candidate | repeated-text |
| src/features/placement/placement.test.tsx:228:30 | text | 남은 예산 토큰 2 | learner-text-candidate | repeated-text |
| src/features/placement/placement.test.tsx:236:40 | text | button | button-or-action | repeated-text |
| src/features/placement/placement.test.tsx:237:30 | text | button | button-or-action | repeated-text |
| src/features/placement/placement.test.tsx:238:30 | text | 현재 배치와 같습니다. | learner-text-candidate | repeated-text |
| src/features/range/FacilityRange.tsx:14:50 | text | typeof key === 'string' && ['row', 'column', 'label'].includes(key))) return false; const record = value as Record | learner-text-candidate | long-or-dense |
| src/features/range/FacilityRange.tsx:14:67 | text | string | learner-text-candidate | repeated-text |
| src/features/range/FacilityRange.tsx:14:80 | text | row | learner-text-candidate | repeated-text |
| src/features/range/FacilityRange.tsx:14:87 | text | column | learner-text-candidate | — |
| src/features/range/FacilityRange.tsx:14:97 | text | label | learner-text-candidate | repeated-text |
| src/features/range/FacilityRange.tsx:18:35 | text | string | learner-text-candidate | repeated-text |
| src/features/range/FacilityRange.tsx:18:74 | text | 0; } catch { return false; } }; export function FacilityRange({ coordinate, radiusUnits, reducedMotion }: FacilityRangeProps) { let safeCoordinate: GridCoordinate \| null = null; try { const cloned = cloneStrictSerializable | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/range/FacilityRange.tsx:29:109 | text | 가상 서비스 범위 자료를 표시할 수 없습니다. 좌표와 상대 이동 단위를 확인해 주세요. | learner-text-candidate | — |
| src/features/range/FacilityRange.tsx:29:161 | text | ; return ( | learner-text-candidate | repeated-text |
| src/features/range/FacilityRange.tsx:31:101 | text | ${safeCoordinate.label} 가상 서비스 범위 | learner-text-candidate | — |
| src/features/range/FacilityRange.tsx:32:15 | text | 가상 서비스 범위 | learner-text-candidate | repeated-text |
| src/features/range/FacilityRange.tsx:33:13 | text | 중심 좌표: {safeCoordinate.label} | learner-text-candidate | — |
| src/features/range/FacilityRange.tsx:34:13 | text | 서비스 기준: {radiusUnits} 상대 이동 단위 | learner-text-candidate | — |
| src/features/range/FacilityRange.tsx:35:14 | text | 실제 거리·시간이 아닌 상대 이동 단위로 표시한 경계입니다. | learner-text-candidate | — |
| src/main.tsx:17:20 | text | 앱을 표시할 root 요소를 찾을 수 없습니다. | feedback-or-error | — |
| src/navigation/GuidedActionButton.tsx:13:76 | text | { const normalized = value?.trim().split(/\s+/).filter(Boolean).join(' '); return normalized === '' ? undefined : normalized; }; export function GuidedActionButton({ actionId, currentAction, disabled, onClick, children, className }: GuidedActionButtonProps) { const isCurrent = actionId === currentAction; const classes = normalizeClasses([normalizeClasses(className), isCurrent && !disabled ? 'gi-pulse' : undefined].filter(Boolean).join(' ')); return ( | button-or-action | long-or-dense, technical-or-internal |
| src/navigation/GuidedActionButton.tsx:22:91 | text | true | button-or-action | repeated-text |
| src/navigation/GuidedActionButton.tsx:22:130 | text | {children} {isCurrent && | button-or-action | — |
| src/navigation/GuidedActionButton.tsx:24:78 | text | 다음 필수 활동 | learner-text-candidate | repeated-text |
| src/navigation/ProgressStepper.test.tsx:8:59 | text | 현재 단계: 영향 분석실 | learner-text-candidate | abstract-or-formal |
| src/navigation/ProgressStepper.test.tsx:12:30 | text | 평균과 가장 긴 이동 결과 확인하기 | learner-text-candidate | repeated-text |
| src/navigation/ProgressStepper.test.tsx:13:30 | text | 어느 구역이 더 불편한지 살펴보기 | learner-text-candidate | repeated-text |
| src/navigation/ProgressStepper.tsx:5:27 | aria-label | 학습 단계 | aria-label | — |
| src/navigation/ProgressStepper.tsx:5:91 | text | polite | learner-text-candidate | repeated-text |
| src/navigation/ProgressStepper.tsx:5:99 | text | 현재 단계: {STAGE_LABELS[currentStage]} | learner-text-candidate | — |
| src/navigation/ProgressStepper.tsx:5:202 | text | { const state = index | learner-text-candidate | technical-or-internal |
| src/navigation/ProgressStepper.tsx:7:106 | text | step | learner-text-candidate | — |
| src/navigation/ProgressStepper.tsx:7:163 | text | {STAGE_LABELS[stage]} | learner-text-candidate | — |
| src/navigation/ProgressStepper.tsx:7:198 | text | {STAGE_DESCRIPTIONS[stage]} | learner-text-candidate | — |
| src/navigation/StageFocusRegion.test.tsx:9:7 | text | focuses and scrolls the first heading when the learning stage changes | heading | long-or-dense |
| src/navigation/StageFocusRegion.test.tsx:9:84 | text | { const scrollIntoView = vi.fn(); Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', { configurable: true, value: scrollIntoView }); const { rerender } = render( | heading | long-or-dense |
| src/navigation/StageFocusRegion.test.tsx:14:22 | text | 심의 접수 | heading | repeated-text |
| src/navigation/StageFocusRegion.test.tsx:15:26 | text | , ); expect(screen.getByRole('heading', { name: '심의 접수' })).not.toHaveFocus(); rerender( | heading | long-or-dense |
| src/navigation/StageFocusRegion.test.tsx:18:30 | text | heading | heading | repeated-text |
| src/navigation/StageFocusRegion.test.tsx:18:49 | text | 심의 접수 | heading | repeated-text |
| src/navigation/StageFocusRegion.test.tsx:21:22 | text | 도시 자료실 | heading | repeated-text |
| src/navigation/StageFocusRegion.test.tsx:25:39 | text | heading | heading | repeated-text |
| src/navigation/StageFocusRegion.test.tsx:25:58 | text | 도시 자료실 | heading | repeated-text |
| src/navigation/StageFocusRegion.test.tsx:27:38 | text | tabindex | heading | repeated-text |
| src/navigation/StageFocusRegion.test.tsx:31:72 | text | { const child: ReactNode = | heading, button-or-action | — |
| src/navigation/StageFocusRegion.test.tsx:32:43 | text | 심의 접수 | heading, button-or-action | repeated-text |
| src/navigation/StageFocusRegion.test.tsx:32:75 | text | 첫 행동 | heading, button-or-action | repeated-text |
| src/navigation/StageFocusRegion.test.tsx:32:98 | text | ; render( | heading, button-or-action | — |
| src/navigation/StageFocusRegion.test.tsx:34:30 | text | button | button-or-action | repeated-text |
| src/navigation/StageFocusRegion.test.tsx:34:48 | text | 첫 행동 | button-or-action | repeated-text |
| src/navigation/StageFocusRegion.test.tsx:35:63 | text | heading | heading | repeated-text |
| src/navigation/StageFocusRegion.test.tsx:35:82 | text | 심의 접수 | heading | repeated-text |
| src/navigation/StageFocusRegion.tsx:16:18 | text | { if (previousStageRef.current === stage) return; previousStageRef.current = stage; const region = regionRef.current; const heading = region?.querySelector | heading | long-or-dense |
| src/navigation/StageFocusRegion.tsx:21:55 | text | ('h2'); if (heading === null \|\| heading === undefined) return; if (!heading.hasAttribute('tabindex')) heading.setAttribute('tabindex', '-1'); try { heading.focus({ preventScroll: true }); } catch { heading.focus(); } if (typeof region?.scrollIntoView === 'function') { region.scrollIntoView({ block: 'start', behavior: reducedMotion ? 'auto' : 'smooth' }); } }, [reducedMotion, stage]); return | heading | long-or-dense, technical-or-internal |
| src/navigation/StageFocusRegion.tsx:21:57 | text | h2 | heading | — |
| src/navigation/StageFocusRegion.tsx:24:32 | text | tabindex | heading | repeated-text |
| src/navigation/StageFocusRegion.tsx:24:66 | text | tabindex | heading | repeated-text |
| src/navigation/guidedAction.test.ts:29:41 | text | A안 | learner-text-candidate | repeated-text |
| src/navigation/guidedAction.test.ts:30:42 | text | B안 | learner-text-candidate | repeated-text |
| src/navigation/guidedAction.test.ts:77:7 | text | rejects forged semantic comparisons, order, labels, IDs, and inherited registry values | learner-text-candidate | long-or-dense, missing-term-explanation, technical-or-internal |
| src/navigation/guidedAction.test.ts:79:125 | text | 위조 | learner-text-candidate | repeated-text |
| src/navigation/guidedAction.test.ts:85:49 | text | B안 | learner-text-candidate | repeated-text |
| src/navigation/guidedAction.test.ts:118:224 | text | 여러 구역의 이동 부담을 함께 살폈습니다. | instruction | repeated-text |
| src/navigation/guidedAction.test.ts:118:268 | text | 다른 구역의 이동이 길어질 수 있습니다. | instruction | repeated-text |
| src/navigation/guidedAction.test.ts:118:306 | text | 안내와 보완 시설을 함께 살핍니다. | instruction | repeated-text |
| src/state/SessionProvider.tsx:14:91 | text | useSession은 SessionProvider 안에서만 사용할 수 있습니다. | feedback-or-error | missing-term-explanation, technical-or-internal |
| src/state/sessionReducer.test.ts:42:48 | text | A안 | learner-text-candidate | repeated-text |
| src/state/sessionReducer.test.ts:42:55 | text | B안 | learner-text-candidate | repeated-text |
| src/state/sessionReducer.test.ts:44:73 | text | B안 | learner-text-candidate | repeated-text |
| src/state/sessionReducer.test.ts:44:81 | text | proposal-a | learner-text-candidate | repeated-text |
| src/state/sessionReducer.test.ts:44:95 | text | proposal-b | learner-text-candidate | repeated-text |
| src/state/sessionReducer.test.ts:45:87 | text | bookmaru-library | learner-text-candidate | repeated-text |
| src/state/sessionReducer.test.ts:45:128 | text | access-equity | learner-text-candidate | repeated-text |
| src/state/sessionReducer.test.ts:80:99 | text | 기록 | learner-text-candidate | — |
| src/state/sessionReducer.test.ts:177:87 | text | A안 | learner-text-candidate | repeated-text |
| src/state/sessionReducer.test.ts:201:99 | text | 비공개 기록 | learner-text-candidate | — |
| src/state/sessionReducer.test.ts:218:67 | text | SessionProvider 안에서만 | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/state/sessionReducer.test.ts:242:86 | text | B안 | learner-text-candidate | repeated-text |
| src/state/sessionReducer.test.ts:243:87 | text | A안 | learner-text-candidate | repeated-text |
| src/state/sessionReducer.test.ts:250:37 | text | B안 | input | repeated-text |
| src/state/sessionReducer.test.ts:252:43 | text | save-proposal | input | — |
| src/state/sessionReducer.test.ts:252:90 | text | A안 | input | repeated-text |
| src/state/sessionReducer.test.ts:282:46 | text | A안 | learner-text-candidate | repeated-text |
| src/state/sessionReducer.test.ts:330:47 | text | malformed accessor | feedback-or-error | — |
| src/state/sessionReducer.test.ts:351:98 | text | 현재 탭에만 남는 근거 기록입니다. | learner-text-candidate | — |
| src/state/sessionReducer.test.ts:371:44 | text | A안 | learner-text-candidate | repeated-text |
| src/state/sessionReducer.test.ts:372:45 | text | B안 | learner-text-candidate | repeated-text |
| src/state/sessionReducer.test.ts:373:213 | text | 여러 구역의 이동 부담을 함께 살폈습니다. | instruction | repeated-text |
| src/state/sessionReducer.test.ts:373:257 | text | 다른 구역의 이동이 길어질 수 있습니다. | instruction | repeated-text |
| src/state/sessionReducer.test.ts:373:295 | text | 안내와 보완 시설을 함께 살핍니다. | instruction | repeated-text |
| src/state/sessionReducer.ts:194:63 | text | A안 | learner-text-candidate | repeated-text |
| src/state/sessionReducer.ts:194:70 | text | B안 | learner-text-candidate | repeated-text |
| src/state/sessionReducer.ts:195:99 | text | A안 | learner-text-candidate | repeated-text |
| src/state/sessionReducer.ts:195:106 | text | proposal-a | learner-text-candidate | repeated-text |
| src/state/sessionReducer.ts:195:121 | text | proposal-b | learner-text-candidate | repeated-text |
| src/state/sessionReducer.ts:199:37 | text | 1) return state; const existingProposal = state.proposals[0]; if (state.proposals.length === 1 && (existingProposal === undefined \|\| samePlacements(existingProposal.placements, state.placements))) return state; const proposalEvidence = { ...copyEvidence(state.evidence), comparedProposalIds: state.proposals.length === 1 ? ['proposal-a', 'proposal-b'] : [], }; const assessment = assessProposal(mission, state.priorityId, state.analysis, proposalEvidence); const nextProposal = createProposalSnapshot(expectedLabel, state.placements, state.analysis, assessment); if (!sameSerializableValue(action.proposal, nextProposal)) return state; if (state.proposals.length === 0) return { ...state, proposals: [nextProposal], evidence: { ...copyEvidence(state.evidence), comparedProposalIds: [] }, }; return { ...state, proposals: existingProposal === undefined ? state.proposals : [existingProposal, nextProposal], evidence: { ...copyEvidence(state.evidence), comparedProposalIds: ['proposal-a', 'proposal-b'] }, }; } catch { return state; } } case 'set-opinion': { const opinion = cloneOpinionForState(state, action.opinion); if (opinion === null \|\| sameOpinion(opinion, state.opinion)) return state; return { ...state, opinion }; } case 'go-to-stage': { const current = indexOfStage(state.stage); const target = indexOfStage(action.stage); if (target | learner-text-candidate | long-or-dense, technical-or-internal |
| src/state/sessionTypes.ts:39:51 | text | = { intake: '심의 접수', 'data-room': '도시 자료실', placement: '후보 배치판', analysis: '영향 분석실', 'resident-view': '주민 관점표', opinion: '심의 의견서', }; export const STAGE_DESCRIPTIONS: Record | learner-text-candidate | abstract-or-formal, long-or-dense, technical-or-internal |
| src/state/sessionTypes.ts:40:12 | text | 심의 접수 | learner-text-candidate | repeated-text |
| src/state/sessionTypes.ts:41:17 | text | 도시 자료실 | learner-text-candidate | repeated-text |
| src/state/sessionTypes.ts:42:15 | text | 후보 배치판 | learner-text-candidate | repeated-text |
| src/state/sessionTypes.ts:43:14 | text | 영향 분석실 | learner-text-candidate | abstract-or-formal, repeated-text |
| src/state/sessionTypes.ts:44:21 | text | 주민 관점표 | learner-text-candidate | repeated-text |
| src/state/sessionTypes.ts:45:13 | text | 심의 의견서 | learner-text-candidate | repeated-text |
| src/state/sessionTypes.ts:48:57 | text | = { intake: '미션과 먼저 생각할 기준 고르기', 'data-room': '자료를 두 가지 이상 살펴보기', placement: '후보지에 시설 놓기', analysis: '평균과 가장 긴 이동 결과 확인하기', 'resident-view': '어느 구역이 더 불편한지 살펴보기', opinion: '근거를 넣어 의견서 완성하기', }; export type SessionAction = \| { type: 'select-mission'; missionId: MissionId } \| { type: 'select-priority'; priorityId: PriorityId } \| { type: 'toggle-layer'; layerId: DataLayerId } \| { type: 'select-candidate'; candidateId: string } \| { type: 'place-facility'; placement: FacilityPlacement } \| { type: 'store-analysis'; analysis: PlacementAnalysis } \| { type: 'inspect-metric'; metricId: LearningEvidence['inspectedMetricIds'][number] } \| { type: 'select-underserved-zone'; zoneId: string } \| { type: 'save-proposal'; proposal: ProposalSnapshot } \| { type: 'set-opinion'; opinion: OpinionDraft } \| { type: 'go-to-stage'; stage: StageId } \| { type: 'restart-mission' }; export type SessionDispatch = Dispatch | learner-text-candidate | long-or-dense, multiple-actions, technical-or-internal |
| src/state/sessionTypes.ts:49:12 | text | 미션과 먼저 생각할 기준 고르기 | learner-text-candidate | — |
| src/state/sessionTypes.ts:50:17 | text | 자료를 두 가지 이상 살펴보기 | learner-text-candidate | — |
| src/state/sessionTypes.ts:51:15 | text | 후보지에 시설 놓기 | learner-text-candidate | — |
| src/state/sessionTypes.ts:52:14 | text | 평균과 가장 긴 이동 결과 확인하기 | learner-text-candidate | repeated-text |
| src/state/sessionTypes.ts:53:21 | text | 어느 구역이 더 불편한지 살펴보기 | learner-text-candidate | repeated-text |
| src/state/sessionTypes.ts:54:13 | text | 근거를 넣어 의견서 완성하기 | learner-text-candidate | — |
| src/styles/ui-contract.test.ts:18:7 | text | defines stable hover and pressed feedback for enabled buttons | feedback-or-error | long-or-dense |
| src/styles/ui-contract.test.ts:25:7 | text | turns off button transitions when reduced motion is requested | button-or-action | long-or-dense |
| src/updates/UpdateHistoryButton.tsx:12:47 | text | (null); const dialogRef = useRef | learner-text-candidate | technical-or-internal |
| src/updates/UpdateHistoryButton.tsx:13:46 | text | (null); const closeRef = useRef | learner-text-candidate | technical-or-internal |
| src/updates/UpdateHistoryButton.tsx:77:8 | text | 업데이트 내역 | button-or-action | repeated-text |
| src/updates/UpdateHistoryButton.tsx:92:30 | text | 업데이트 내역 | heading | repeated-text |
| src/updates/UpdateHistoryButton.tsx:93:71 | text | 업데이트 내역 닫기 | button-or-action | repeated-text |
| src/updates/updateHistory.test.tsx:16:40 | text | 개선 | learner-text-candidate | repeated-text |
| src/updates/updateHistory.test.tsx:16:58 | text | 키보드로 처음 들어온 학습자가 본문으로 바로 건너뛸 수 있게 길을 추가했습니다. | learner-text-candidate | repeated-text |
| src/updates/updateHistory.test.tsx:16:106 | text | 버튼을 가리키거나 누를 때 상태가 보이고, 움직임을 줄인 환경에서도 편안하게 사용할 수 있게 다듬었습니다. | learner-text-candidate | long-or-dense, repeated-text |
| src/updates/updateHistory.test.tsx:17:40 | text | 개선 | learner-text-candidate | repeated-text |
| src/updates/updateHistory.test.tsx:17:58 | text | 단계가 바뀌면 새 화면의 제목으로 바로 이동하고, 작은 화면에서도 다음 행동을 쉽게 찾도록 화면 구성을 정리했습니다. | learner-text-candidate | abstract-or-formal, long-or-dense, repeated-text |
| src/updates/updateHistory.test.tsx:17:127 | text | 업데이트 내역 버튼과 비교 자료를 학습 내용을 가리지 않는 자리로 옮겼습니다. | learner-text-candidate | repeated-text |
| src/updates/updateHistory.test.tsx:18:40 | text | 개선 | hint, input, instruction | repeated-text |
| src/updates/updateHistory.test.tsx:18:58 | text | 후보지 위치를 더 잘 찾고, 결과 카드를 확인한 뒤 다음 단계로 갈 수 있게 안내를 다듬었습니다. | hint, input, instruction | repeated-text |
| src/updates/updateHistory.test.tsx:18:116 | text | 의견서 입력 도움말과 완료 알림을 어린이가 이해하기 쉽게 고쳤습니다. | hint, input, instruction | abstract-or-formal, repeated-text |
| src/updates/updateHistory.test.tsx:19:40 | text | 개선 | input | repeated-text |
| src/updates/updateHistory.test.tsx:19:58 | text | 작은 화면에서 지도와 표를 편하게 살피고, 의견 입력과 자료 확인 버튼을 더 쉽게 사용할 수 있게 다듬었습니다. | input | abstract-or-formal, long-or-dense, multiple-actions, repeated-text |
| src/updates/updateHistory.test.tsx:22:20 | text | 개발 | learner-text-candidate | repeated-text |
| src/updates/updateHistory.test.tsx:24:12 | text | 가상 도시 2종과 미션 4종 구현 | learner-text-candidate | repeated-text |
| src/updates/updateHistory.test.tsx:25:12 | text | 접근성 표 보기와 결정적 판정 모델 추가 | learner-text-candidate | repeated-text |
| src/updates/updateHistory.test.tsx:26:12 | text | 사회적 표현 및 개인정보 안전 검수 완료 | learner-text-candidate | repeated-text |
| src/updates/updateHistory.test.tsx:29:40 | text | 설계 | learner-text-candidate | repeated-text |
| src/updates/updateHistory.test.tsx:29:58 | text | 최초 설계 문서 작성 | learner-text-candidate | repeated-text |
| src/updates/updateHistory.test.tsx:40:11 | text | UpdateHistoryButton | learner-text-candidate | — |
| src/updates/updateHistory.test.tsx:41:98 | text | { const user = userEvent.setup(); render( | learner-text-candidate | — |
| src/updates/updateHistory.test.tsx:44:39 | text | button | button-or-action | repeated-text |
| src/updates/updateHistory.test.tsx:44:57 | text | 업데이트 내역 | button-or-action | repeated-text |
| src/updates/updateHistory.test.tsx:47:56 | text | 업데이트 내역 | learner-text-candidate | repeated-text |
| src/updates/updateHistory.test.tsx:50:30 | text | button | button-or-action | repeated-text |
| src/updates/updateHistory.test.tsx:50:48 | text | 업데이트 내역 닫기 | button-or-action | repeated-text |
| src/updates/updateHistory.test.tsx:51:30 | text | 가상 도시 2종과 미션 4종 구현 | learner-text-candidate | repeated-text |
| src/updates/updateHistory.test.tsx:56:48 | text | 업데이트 내역 | learner-text-candidate | repeated-text |
| src/updates/updateHistory.test.tsx:57:40 | text | button | button-or-action | repeated-text |
| src/updates/updateHistory.test.tsx:57:58 | text | 업데이트 내역 닫기 | button-or-action | repeated-text |
| src/updates/updateHistory.test.tsx:61:83 | text | { const showModal = vi.fn(function showModal(this: HTMLDialogElement) { this.setAttribute('open', ''); }); const close = vi.fn(function close(this: HTMLDialogElement) { this.removeAttribute('open'); }); Object.defineProperty(HTMLDialogElement.prototype, 'showModal', { configurable: true, value: showModal }); Object.defineProperty(HTMLDialogElement.prototype, 'close', { configurable: true, value: close }); const user = userEvent.setup(); render( | learner-text-candidate | long-or-dense |
| src/updates/updateHistory.test.tsx:68:39 | text | button | button-or-action | repeated-text |
| src/updates/updateHistory.test.tsx:68:57 | text | 업데이트 내역 | button-or-action | repeated-text |
| src/updates/updateHistory.test.tsx:71:30 | text | button | button-or-action | repeated-text |
| src/updates/updateHistory.test.tsx:71:48 | text | 업데이트 내역 닫기 | button-or-action | repeated-text |
| src/updates/updateHistory.test.tsx:72:40 | text | button | button-or-action | repeated-text |
| src/updates/updateHistory.test.tsx:72:58 | text | 업데이트 내역 닫기 | button-or-action | repeated-text |
| src/updates/updateHistory.test.tsx:80:33 | text | button | button-or-action | repeated-text |
| src/updates/updateHistory.test.tsx:80:51 | text | 업데이트 내역 | button-or-action | repeated-text |
| src/updates/updateHistory.test.tsx:81:68 | text | 미션 선택 | learner-text-candidate | repeated-text |
| src/updates/updateHistory.test.tsx:82:57 | text | 접근성 | learner-text-candidate | repeated-text |
| src/updates/updateHistory.test.tsx:83:40 | text | button | button-or-action | repeated-text |
| src/updates/updateHistory.test.tsx:83:58 | text | 도시 자료실로 이동 | button-or-action | repeated-text |
| src/updates/updateHistory.test.tsx:84:33 | text | button | button-or-action | repeated-text |
| src/updates/updateHistory.test.tsx:84:51 | text | 업데이트 내역 | button-or-action | repeated-text |
| src/updates/updateHistory.test.tsx:85:40 | text | button | button-or-action | repeated-text |
| src/updates/updateHistory.test.tsx:85:58 | text | 업데이트 내역 | button-or-action | repeated-text |
| src/updates/updateHistory.test.tsx:86:40 | text | button | button-or-action | repeated-text |
| src/updates/updateHistory.test.tsx:86:58 | text | 업데이트 내역 닫기 | button-or-action | repeated-text |
| src/updates/updateHistory.test.tsx:87:48 | text | 도시 자료실 | learner-text-candidate | repeated-text |
| src/updates/updateHistory.ts:1:31 | text | 설계 | learner-text-candidate | repeated-text |
| src/updates/updateHistory.ts:1:38 | text | 개발 | learner-text-candidate | repeated-text |
| src/updates/updateHistory.ts:1:45 | text | 개선 | learner-text-candidate | repeated-text |
| src/updates/updateHistory.ts:17:16 | text | 개선 | learner-text-candidate | repeated-text |
| src/updates/updateHistory.ts:18:18 | text | 키보드로 처음 들어온 학습자가 본문으로 바로 건너뛸 수 있게 길을 추가했습니다. | learner-text-candidate | repeated-text |
| src/updates/updateHistory.ts:18:66 | text | 버튼을 가리키거나 누를 때 상태가 보이고, 움직임을 줄인 환경에서도 편안하게 사용할 수 있게 다듬었습니다. | learner-text-candidate | long-or-dense, repeated-text |
| src/updates/updateHistory.ts:22:16 | text | 개선 | learner-text-candidate | repeated-text |
| src/updates/updateHistory.ts:23:18 | text | 단계가 바뀌면 새 화면의 제목으로 바로 이동하고, 작은 화면에서도 다음 행동을 쉽게 찾도록 화면 구성을 정리했습니다. | learner-text-candidate | abstract-or-formal, long-or-dense, repeated-text |
| src/updates/updateHistory.ts:23:87 | text | 업데이트 내역 버튼과 비교 자료를 학습 내용을 가리지 않는 자리로 옮겼습니다. | learner-text-candidate | repeated-text |
| src/updates/updateHistory.ts:27:16 | text | 개선 | learner-text-candidate | repeated-text |
| src/updates/updateHistory.ts:28:18 | text | 후보지 위치를 더 잘 찾고, 결과 카드를 확인한 뒤 다음 단계로 갈 수 있게 안내를 다듬었습니다. | hint, input, instruction | repeated-text |
| src/updates/updateHistory.ts:28:76 | text | 의견서 입력 도움말과 완료 알림을 어린이가 이해하기 쉽게 고쳤습니다. | hint, input, instruction | abstract-or-formal, repeated-text |
| src/updates/updateHistory.ts:32:16 | text | 개선 | learner-text-candidate | repeated-text |
| src/updates/updateHistory.ts:33:18 | text | 작은 화면에서 지도와 표를 편하게 살피고, 의견 입력과 자료 확인 버튼을 더 쉽게 사용할 수 있게 다듬었습니다. | input | abstract-or-formal, long-or-dense, multiple-actions, repeated-text |
| src/updates/updateHistory.ts:37:16 | text | 개발 | learner-text-candidate | repeated-text |
| src/updates/updateHistory.ts:39:8 | text | 가상 도시 2종과 미션 4종 구현 | learner-text-candidate | repeated-text |
| src/updates/updateHistory.ts:40:8 | text | 접근성 표 보기와 결정적 판정 모델 추가 | learner-text-candidate | repeated-text |
| src/updates/updateHistory.ts:41:8 | text | 사회적 표현 및 개인정보 안전 검수 완료 | learner-text-candidate | repeated-text |
| src/updates/updateHistory.ts:44:48 | text | 설계 | learner-text-candidate | repeated-text |
| src/updates/updateHistory.ts:44:66 | text | 최초 설계 문서 작성 | learner-text-candidate | repeated-text |
| tests/accessibility/app.a11y.test.tsx:16:51 | text | h1,h2,h3,h4,h5,h6 | heading | — |
| tests/accessibility/app.a11y.test.tsx:16:85 | text | Number(item.tagName.slice(1))); expect(headings[0]).toBe(1); for (let index = 1; index | heading | long-or-dense |
| tests/accessibility/app.a11y.test.tsx:19:59 | text | [aria-live] | learner-text-candidate | missing-term-explanation, technical-or-internal |
| tests/accessibility/app.a11y.test.tsx:23:50 | text | 미션 선택 | learner-text-candidate | repeated-text |
| tests/accessibility/app.a11y.test.tsx:24:47 | text | 가장 먼저 살필 기준 | learner-text-candidate | repeated-text |
| tests/accessibility/app.a11y.test.tsx:27:49 | text | 도시 자료 표현 선택 | learner-text-candidate | repeated-text |
| tests/accessibility/app.a11y.test.tsx:28:47 | text | 확인할 자료층 | learner-text-candidate | repeated-text |
| tests/accessibility/app.a11y.test.tsx:30:77 | text | 0) { const legend = screen.getByRole('group', { name: '켜진 자료층 범례' }); expect(legend).toHaveTextContent('●'); expect(legend).toHaveTextContent('↔'); expect(legend).toHaveTextContent(/무늬: 사람 토큰/); } } else if (stage === 'placement') { expect(screen.getByRole('group', { name: '후보지 선택' })).toBeInTheDocument(); expect(screen.getByRole('group', { name: /도서관/ })).toBeInTheDocument(); } else if (stage === 'analysis') { const analysisTabs = screen.queryByRole('tablist', { name: '영향 분석 표현 선택' }); if (analysisTabs !== null) expect(analysisTabs).toBeInTheDocument(); expect(screen.getByRole('table', { name: /이동 경로/ })).toBeInTheDocument(); } else if (stage === 'resident-view') { expect(screen.getByRole('table', { name: '구역별 주민 관점 비교' })).toBeInTheDocument(); expect(screen.getByRole('group', { name: '누가 더 불편한가요?' })).toBeInTheDocument(); } else if (stage === 'opinion') { expect(screen.getByRole('form', { name: '심의 의견서 작성' })).toBeInTheDocument(); expect(screen.getByRole('group', { name: '우선 기준' })).toBeInTheDocument(); expect(screen.getByRole('group', { name: '선택안' })).toBeInTheDocument(); expect(screen.getByLabelText('선택안의 근거')).toBeInTheDocument(); } } async function goToLibraryOpinion(): Promise | input | abstract-or-formal, long-or-dense, multiple-actions, technical-or-internal |
| tests/accessibility/app.a11y.test.tsx:31:57 | text | 켜진 자료층 범례 | learner-text-candidate | repeated-text |
| tests/accessibility/app.a11y.test.tsx:37:47 | text | 후보지 선택 | learner-text-candidate | repeated-text |
| tests/accessibility/app.a11y.test.tsx:40:65 | text | 영향 분석 표현 선택 | learner-text-candidate | abstract-or-formal, repeated-text |
| tests/accessibility/app.a11y.test.tsx:44:47 | text | 구역별 주민 관점 비교 | learner-text-candidate | repeated-text |
| tests/accessibility/app.a11y.test.tsx:45:47 | text | 누가 더 불편한가요? | learner-text-candidate | repeated-text |
| tests/accessibility/app.a11y.test.tsx:47:46 | text | 심의 의견서 작성 | learner-text-candidate | repeated-text |
| tests/accessibility/app.a11y.test.tsx:48:47 | text | 우선 기준 | learner-text-candidate | repeated-text |
| tests/accessibility/app.a11y.test.tsx:49:47 | text | 선택안 | learner-text-candidate | repeated-text |
| tests/accessibility/app.a11y.test.tsx:50:35 | text | 선택안의 근거 | learner-text-candidate | repeated-text |
| tests/accessibility/app.a11y.test.tsx:56:66 | text | 미션 선택 | learner-text-candidate | repeated-text |
| tests/accessibility/app.a11y.test.tsx:57:55 | text | 접근성 | learner-text-candidate | repeated-text |
| tests/accessibility/app.a11y.test.tsx:58:38 | text | button | button-or-action | repeated-text |
| tests/accessibility/app.a11y.test.tsx:58:56 | text | 도시 자료실로 이동 | button-or-action | repeated-text |
| tests/accessibility/app.a11y.test.tsx:60:58 | text | 인구 | learner-text-candidate | repeated-text |
| tests/accessibility/app.a11y.test.tsx:61:58 | text | 도로·이동 단위 | learner-text-candidate | repeated-text |
| tests/accessibility/app.a11y.test.tsx:63:38 | text | button | button-or-action | repeated-text |
| tests/accessibility/app.a11y.test.tsx:63:56 | text | 자료층 확인 | button-or-action | repeated-text |
| tests/accessibility/app.a11y.test.tsx:66:38 | text | button | button-or-action | repeated-text |
| tests/accessibility/app.a11y.test.tsx:67:38 | text | button | button-or-action | repeated-text |
| tests/accessibility/app.a11y.test.tsx:67:56 | text | 영향 계산 | button-or-action | repeated-text |
| tests/accessibility/app.a11y.test.tsx:69:39 | text | button | button-or-action | repeated-text |
| tests/accessibility/app.a11y.test.tsx:69:57 | text | 영향 계산 | button-or-action | repeated-text |
| tests/accessibility/app.a11y.test.tsx:70:54 | text | 영향 계산 안내 | instruction | repeated-text |
| tests/accessibility/app.a11y.test.tsx:78:39 | text | queueMicrotask(resolve)); expect(liveUpdates).toEqual(['영향 계산이 완료되었습니다. 평균, 가장 긴 이동, 도달 불가, 위험, 비용을 함께 확인하세요.']); expect(document.activeElement).toBe(calculate); await assertAccessibleStage('analysis', true); const updatesBeforeRepeat = liveUpdates.length; await user.click(screen.getByRole('button', { name: '영향 계산' })); await new Promise | button-or-action | long-or-dense, multiple-actions |
| tests/accessibility/app.a11y.test.tsx:79:33 | text | 영향 계산이 완료되었습니다. 평균, 가장 긴 이동, 도달 불가, 위험, 비용을 함께 확인하세요. | learner-text-candidate | multiple-actions, repeated-text |
| tests/accessibility/app.a11y.test.tsx:83:38 | text | button | button-or-action | repeated-text |
| tests/accessibility/app.a11y.test.tsx:83:56 | text | 영향 계산 | button-or-action | repeated-text |
| tests/accessibility/app.a11y.test.tsx:87:38 | text | button | button-or-action | repeated-text |
| tests/accessibility/app.a11y.test.tsx:88:38 | text | button | button-or-action | repeated-text |
| tests/accessibility/app.a11y.test.tsx:89:38 | text | button | button-or-action | repeated-text |
| tests/accessibility/app.a11y.test.tsx:89:56 | text | 주민 관점표로 이동 | button-or-action | repeated-text |
| tests/accessibility/app.a11y.test.tsx:92:38 | text | button | button-or-action | repeated-text |
| tests/accessibility/app.a11y.test.tsx:92:56 | text | A안 저장 | button-or-action | repeated-text |
| tests/accessibility/app.a11y.test.tsx:93:38 | text | button | button-or-action | repeated-text |
| tests/accessibility/app.a11y.test.tsx:93:56 | text | 후보 수정하여 B안 만들기 | button-or-action | repeated-text |
| tests/accessibility/app.a11y.test.tsx:95:38 | text | button | button-or-action | repeated-text |
| tests/accessibility/app.a11y.test.tsx:96:38 | text | button | button-or-action | repeated-text |
| tests/accessibility/app.a11y.test.tsx:96:56 | text | 영향 계산 | button-or-action | repeated-text |
| tests/accessibility/app.a11y.test.tsx:97:38 | text | button | button-or-action | repeated-text |
| tests/accessibility/app.a11y.test.tsx:97:56 | text | 영향 계산 | button-or-action | repeated-text |
| tests/accessibility/app.a11y.test.tsx:98:38 | text | button | button-or-action | repeated-text |
| tests/accessibility/app.a11y.test.tsx:99:38 | text | button | button-or-action | repeated-text |
| tests/accessibility/app.a11y.test.tsx:100:38 | text | button | button-or-action | repeated-text |
| tests/accessibility/app.a11y.test.tsx:100:56 | text | 주민 관점표로 이동 | button-or-action | repeated-text |
| tests/accessibility/app.a11y.test.tsx:102:38 | text | button | button-or-action | repeated-text |
| tests/accessibility/app.a11y.test.tsx:102:56 | text | B안 저장 | button-or-action | repeated-text |
| tests/accessibility/app.a11y.test.tsx:103:38 | text | button | button-or-action | repeated-text |
| tests/accessibility/app.a11y.test.tsx:103:56 | text | 의견서 작성 | button-or-action | repeated-text |
| tests/accessibility/app.a11y.test.tsx:111:38 | text | button | button-or-action | repeated-text |
| tests/accessibility/app.a11y.test.tsx:111:56 | text | 업데이트 내역 | button-or-action | repeated-text |
| tests/accessibility/app.a11y.test.tsx:114:56 | text | 업데이트 내역 | learner-text-candidate | repeated-text |
| tests/accessibility/app.a11y.test.tsx:116:30 | text | button | button-or-action | repeated-text |
| tests/accessibility/app.a11y.test.tsx:116:48 | text | 업데이트 내역 닫기 | button-or-action | repeated-text |
| tests/e2e/flow-helpers.ts:19:12 | text | pageerror | feedback-or-error | — |
| tests/e2e/flow-helpers.ts:20:22 | text | pageerror: ${error.message} | feedback-or-error | — |
| tests/e2e/flow-helpers.ts:22:34 | text | { if (message.type() === 'error' \|\| message.type() === 'warning') { throw new Error(`console ${message.type()}: ${message.text()}`); } }); } export async function chooseIntake(page: Page, mission: string, priority = 'access-equity'): Promise | feedback-or-error | long-or-dense |
| tests/e2e/flow-helpers.ts:23:29 | text | error | feedback-or-error | — |
| tests/e2e/flow-helpers.ts:23:59 | text | warning | feedback-or-error | — |
| tests/e2e/flow-helpers.ts:24:24 | text | console ${message.type()}: ${message.text()} | feedback-or-error | — |
| tests/e2e/flow-helpers.ts:29:107 | text | { await page.getByRole('combobox', { name: '미션 선택' }).selectOption(mission); await page.getByRole('radio', { name: priority === 'access-equity' ? '접근성' : priority === 'safety' ? '안전' : '비용' }).check(); await page.getByRole('button', { name: '도시 자료실로 이동' }).click(); } export async function reviewLayers(page: Page, layers: string[] = ['인구', '도로·이동 단위']): Promise | button-or-action | long-or-dense |
| tests/e2e/flow-helpers.ts:30:45 | text | 미션 선택 | learner-text-candidate | repeated-text |
| tests/e2e/flow-helpers.ts:31:73 | text | 접근성 | learner-text-candidate | repeated-text |
| tests/e2e/flow-helpers.ts:31:105 | text | 안전 | learner-text-candidate | repeated-text |
| tests/e2e/flow-helpers.ts:31:112 | text | 비용 | learner-text-candidate | repeated-text |
| tests/e2e/flow-helpers.ts:32:25 | text | button | button-or-action | repeated-text |
| tests/e2e/flow-helpers.ts:32:43 | text | 도시 자료실로 이동 | button-or-action | repeated-text |
| tests/e2e/flow-helpers.ts:35:69 | text | 인구 | learner-text-candidate | repeated-text |
| tests/e2e/flow-helpers.ts:35:75 | text | 도로·이동 단위 | learner-text-candidate | repeated-text |
| tests/e2e/flow-helpers.ts:35:101 | text | { for (const layer of layers) await page.getByRole('checkbox', { name: layer }).check(); await page.getByRole('button', { name: '자료층 확인' }).click(); } export async function selectLayers(page: Page, layers: string[] = ['인구', '도로·이동 단위']): Promise | button-or-action | long-or-dense |
| tests/e2e/flow-helpers.ts:37:25 | text | button | button-or-action | repeated-text |
| tests/e2e/flow-helpers.ts:37:43 | text | 자료층 확인 | button-or-action | repeated-text |
| tests/e2e/flow-helpers.ts:40:69 | text | 인구 | learner-text-candidate | repeated-text |
| tests/e2e/flow-helpers.ts:40:75 | text | 도로·이동 단위 | learner-text-candidate | repeated-text |
| tests/e2e/flow-helpers.ts:44:80 | text | { await page.getByRole('radio', { name: candidate }).check(); await page.getByRole('button', { name: '시설 배치' }).click(); await expect(page.getByRole('button', { name: '영향 계산' })).toBeEnabled(); await page.getByRole('button', { name: '영향 계산' }).click(); await expect(page.getByRole('region', { name: '영향 분석실' })).toBeVisible(); } export async function inspectAndOpenResident(page: Page): Promise | button-or-action | abstract-or-formal, long-or-dense, multiple-actions, technical-or-internal |
| tests/e2e/flow-helpers.ts:46:25 | text | button | button-or-action | repeated-text |
| tests/e2e/flow-helpers.ts:46:43 | text | 시설 배치 | button-or-action | repeated-text |
| tests/e2e/flow-helpers.ts:47:32 | text | button | button-or-action | repeated-text |
| tests/e2e/flow-helpers.ts:47:50 | text | 영향 계산 | button-or-action | repeated-text |
| tests/e2e/flow-helpers.ts:48:25 | text | button | button-or-action | repeated-text |
| tests/e2e/flow-helpers.ts:48:43 | text | 영향 계산 | button-or-action | repeated-text |
| tests/e2e/flow-helpers.ts:49:50 | text | 영향 분석실 | learner-text-candidate | abstract-or-formal, repeated-text |
| tests/e2e/flow-helpers.ts:52:72 | text | { await page.getByRole('button', { name: '영향 계산' }).click(); await page.getByRole('button', { name: /평균 이동 단위/ }).click(); await page.getByRole('button', { name: /가장 긴 이동 단위/ }).click(); await page.getByRole('button', { name: '주민 관점표로 이동' }).click(); await expect(page.getByRole('region', { name: '주민 관점표' })).toBeVisible(); } export async function fillOpinion(page: Page, proposal = 'B안', mitigation = '단계적 안내를 함께 마련하겠습니다.'): Promise | button-or-action, instruction | long-or-dense |
| tests/e2e/flow-helpers.ts:53:25 | text | button | button-or-action | repeated-text |
| tests/e2e/flow-helpers.ts:53:43 | text | 영향 계산 | button-or-action | repeated-text |
| tests/e2e/flow-helpers.ts:54:25 | text | button | button-or-action | repeated-text |
| tests/e2e/flow-helpers.ts:55:25 | text | button | button-or-action | repeated-text |
| tests/e2e/flow-helpers.ts:56:25 | text | button | button-or-action | repeated-text |
| tests/e2e/flow-helpers.ts:56:43 | text | 주민 관점표로 이동 | button-or-action | repeated-text |
| tests/e2e/flow-helpers.ts:57:50 | text | 주민 관점표 | learner-text-candidate | repeated-text |
| tests/e2e/flow-helpers.ts:60:59 | text | B안 | instruction | repeated-text |
| tests/e2e/flow-helpers.ts:60:78 | text | 단계적 안내를 함께 마련하겠습니다. | instruction | repeated-text |
| tests/e2e/flow-helpers.ts:61:25 | text | button | button-or-action | repeated-text |
| tests/e2e/flow-helpers.ts:61:43 | text | 의견서 작성 | button-or-action | repeated-text |
| tests/e2e/flow-helpers.ts:63:45 | text | 평균 이동 단위 | learner-text-candidate | repeated-text |
| tests/e2e/flow-helpers.ts:64:45 | text | 가장 긴 이동 단위 | learner-text-candidate | repeated-text |
| tests/e2e/flow-helpers.ts:65:45 | text | 위험 조건 | learner-text-candidate | repeated-text |
| tests/e2e/flow-helpers.ts:66:45 | text | 더 불편을 살필 구역 | learner-text-candidate | repeated-text |
| tests/e2e/flow-helpers.ts:67:26 | text | 선택안의 근거 | learner-text-candidate | repeated-text |
| tests/e2e/flow-helpers.ts:67:42 | text | 접근성과 안전 자료를 함께 비교했습니다. | learner-text-candidate | repeated-text |
| tests/e2e/flow-helpers.ts:68:26 | text | 예상되는 반론 | learner-text-candidate | repeated-text |
| tests/e2e/flow-helpers.ts:68:42 | text | 다른 구역의 이동 부담이 커질 수 있습니다. | learner-text-candidate | repeated-text |
| tests/e2e/flow-helpers.ts:69:26 | text | 보완 방법 | learner-text-candidate | repeated-text |
| tests/e2e/flow-helpers.ts:70:32 | text | button | button-or-action | repeated-text |
| tests/e2e/flow-helpers.ts:70:50 | text | 의견서 작성 | button-or-action | repeated-text |
| tests/e2e/flow-helpers.ts:71:25 | text | button | button-or-action | repeated-text |
| tests/e2e/flow-helpers.ts:71:43 | text | 의견서 작성 | button-or-action | repeated-text |
| tests/e2e/flow-helpers.ts:72:32 | text | heading | heading | repeated-text |
| tests/e2e/flow-helpers.ts:72:51 | text | 완성한 입지 심의 의견서 | heading | repeated-text |
| tests/e2e/keyboard-only.spec.ts:17:43 | text | element === document.activeElement)) return; } throw new Error(`Tab order did not reach ${await target.getAttribute('aria-label') ?? await target.textContent()}`); } async function pressSpace(page: Page, target: Locator): Promise | feedback-or-error | long-or-dense, technical-or-internal |
| tests/e2e/keyboard-only.spec.ts:19:20 | text | Tab order did not reach ${await target.getAttribute('aria-label') ?? await target.textContent()} | feedback-or-error | long-or-dense, technical-or-internal |
| tests/e2e/keyboard-only.spec.ts:36:55 | text | 미션 선택 | learner-text-candidate | repeated-text |
| tests/e2e/keyboard-only.spec.ts:41:59 | text | 접근성 | learner-text-candidate | repeated-text |
| tests/e2e/keyboard-only.spec.ts:42:42 | text | button | button-or-action | repeated-text |
| tests/e2e/keyboard-only.spec.ts:42:60 | text | 도시 자료실로 이동 | button-or-action | repeated-text |
| tests/e2e/keyboard-only.spec.ts:44:25 | text | 인구 | learner-text-candidate | repeated-text |
| tests/e2e/keyboard-only.spec.ts:44:31 | text | 도로·이동 단위 | learner-text-candidate | repeated-text |
| tests/e2e/keyboard-only.spec.ts:44:82 | text | checkbox | learner-text-candidate | repeated-text |
| tests/e2e/keyboard-only.spec.ts:45:49 | text | 지도 보기 | learner-text-candidate | repeated-text |
| tests/e2e/keyboard-only.spec.ts:52:35 | text | document.activeElement?.tagName)).not.toBe('BODY'); await page.keyboard.press('Tab'); await expect(mapTab).toBeFocused(); await page.keyboard.press('Enter'); const grid = page.getByRole('grid', { name: /가상 격자 지도/ }); await tabUntil(page, grid); await page.keyboard.press('Home'); await page.keyboard.press('ArrowDown'); await page.keyboard.press('ArrowRight'); await page.keyboard.press('Enter'); await pressEnter(page, page.getByRole('button', { name: '자료층 확인' })); await pressSpace(page, page.getByRole('radio', { name: /느린 강변 터.*물빛 B2/ })); await pressEnter(page, page.getByRole('button', { name: '시설 배치' })); const calculate = page.getByRole('button', { name: '영향 계산' }); await pressEnter(page, calculate); await pressEnter(page, calculate); for (const label of [/평균 이동 단위/, /가장 긴 이동 단위/]) await pressSpace(page, page.getByRole('button', { name: label })); const residentView = page.getByRole('button', { name: '주민 관점표로 이동' }); await expect(residentView).toBeEnabled(); await tabUntil(page, residentView, 80, 'Shift+Tab'); await page.keyboard.press('Enter'); await pressSpace(page, page.getByRole('radio', { name: /구역/ }).first()); await pressEnter(page, page.getByRole('button', { name: 'A안 저장' })); await pressEnter(page, page.getByRole('button', { name: '후보 수정하여 B안 만들기' })); await pressSpace(page, page.getByRole('radio', { name: /가운데 광장 터.*물빛 C3/ })); await pressEnter(page, page.getByRole('button', { name: '시설 배치' })); await pressEnter(page, calculate); await pressEnter(page, calculate); for (const label of [/평균 이동 단위/, /가장 긴 이동 단위/]) await pressSpace(page, page.getByRole('button', { name: label })); const secondResidentView = page.getByRole('button', { name: '주민 관점표로 이동' }); await expect(secondResidentView).toBeEnabled(); await tabUntil(page, secondResidentView, 80, 'Shift+Tab'); await page.keyboard.press('Enter'); await page.keyboard.press('Tab'); const secondZoneRadios = page.getByRole('radio', { name: /구역/ }); await expect(secondZoneRadios.first()).toBeFocused(); for (let index = 1; index | button-or-action | long-or-dense, multiple-actions, technical-or-internal |
| tests/e2e/keyboard-only.spec.ts:62:42 | text | button | button-or-action | repeated-text |
| tests/e2e/keyboard-only.spec.ts:62:60 | text | 자료층 확인 | button-or-action | repeated-text |
| tests/e2e/keyboard-only.spec.ts:65:42 | text | button | button-or-action | repeated-text |
| tests/e2e/keyboard-only.spec.ts:65:60 | text | 시설 배치 | button-or-action | repeated-text |
| tests/e2e/keyboard-only.spec.ts:66:37 | text | button | button-or-action | repeated-text |
| tests/e2e/keyboard-only.spec.ts:66:55 | text | 영향 계산 | button-or-action | repeated-text |
| tests/e2e/keyboard-only.spec.ts:69:90 | text | button | button-or-action | repeated-text |
| tests/e2e/keyboard-only.spec.ts:70:40 | text | button | button-or-action | repeated-text |
| tests/e2e/keyboard-only.spec.ts:70:58 | text | 주민 관점표로 이동 | button-or-action | repeated-text |
| tests/e2e/keyboard-only.spec.ts:75:42 | text | button | button-or-action | repeated-text |
| tests/e2e/keyboard-only.spec.ts:75:60 | text | A안 저장 | button-or-action | repeated-text |
| tests/e2e/keyboard-only.spec.ts:76:42 | text | button | button-or-action | repeated-text |
| tests/e2e/keyboard-only.spec.ts:76:60 | text | 후보 수정하여 B안 만들기 | button-or-action | repeated-text |
| tests/e2e/keyboard-only.spec.ts:78:42 | text | button | button-or-action | repeated-text |
| tests/e2e/keyboard-only.spec.ts:78:60 | text | 시설 배치 | button-or-action | repeated-text |
| tests/e2e/keyboard-only.spec.ts:81:90 | text | button | button-or-action | repeated-text |
| tests/e2e/keyboard-only.spec.ts:82:46 | text | button | button-or-action | repeated-text |
| tests/e2e/keyboard-only.spec.ts:82:64 | text | 주민 관점표로 이동 | button-or-action | repeated-text |
| tests/e2e/keyboard-only.spec.ts:91:42 | text | button | button-or-action | repeated-text |
| tests/e2e/keyboard-only.spec.ts:91:60 | text | B안 저장 | button-or-action | repeated-text |
| tests/e2e/keyboard-only.spec.ts:92:42 | text | button | button-or-action | repeated-text |
| tests/e2e/keyboard-only.spec.ts:92:60 | text | 의견서 작성 | button-or-action | repeated-text |
| tests/e2e/keyboard-only.spec.ts:99:25 | text | 평균 이동 단위 | learner-text-candidate | repeated-text |
| tests/e2e/keyboard-only.spec.ts:99:37 | text | 가장 긴 이동 단위 | learner-text-candidate | repeated-text |
| tests/e2e/keyboard-only.spec.ts:99:51 | text | 위험 조건 | learner-text-candidate | repeated-text |
| tests/e2e/keyboard-only.spec.ts:99:99 | text | checkbox | learner-text-candidate | repeated-text |
| tests/e2e/keyboard-only.spec.ts:100:52 | text | 더 불편을 살필 구역 | learner-text-candidate | repeated-text |
| tests/e2e/keyboard-only.spec.ts:104:35 | text | 선택안의 근거 | instruction | repeated-text |
| tests/e2e/keyboard-only.spec.ts:104:46 | text | 키보드로 공개 자료를 비교한 근거입니다. | instruction | — |
| tests/e2e/keyboard-only.spec.ts:104:74 | text | 예상되는 반론 | instruction | repeated-text |
| tests/e2e/keyboard-only.spec.ts:104:85 | text | 다른 구역의 이동 부담도 살펴야 합니다. | instruction | — |
| tests/e2e/keyboard-only.spec.ts:104:113 | text | 보완 방법 | instruction | repeated-text |
| tests/e2e/keyboard-only.spec.ts:104:122 | text | 안내를 함께 마련하겠습니다. | instruction | — |
| tests/e2e/keyboard-only.spec.ts:109:42 | text | button | button-or-action | repeated-text |
| tests/e2e/keyboard-only.spec.ts:109:60 | text | 의견서 작성 | button-or-action | repeated-text |
| tests/e2e/keyboard-only.spec.ts:110:32 | text | 타당안—절충 확인 | learner-text-candidate | repeated-text |
| tests/e2e/keyboard-only.spec.ts:111:35 | text | button | button-or-action | repeated-text |
| tests/e2e/keyboard-only.spec.ts:111:53 | text | 업데이트 내역 | button-or-action | repeated-text |
| tests/e2e/keyboard-only.spec.ts:113:50 | text | 업데이트 내역 | learner-text-candidate | repeated-text |
| tests/e2e/learner-flow.spec.ts:15:25 | text | button | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:15:43 | text | A안 저장 | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:16:25 | text | button | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:16:43 | text | 후보 수정하여 B안 만들기 | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:18:25 | text | button | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:18:43 | text | 시설 배치 | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:19:25 | text | button | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:19:43 | text | 영향 계산 | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:22:25 | text | button | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:22:43 | text | B안 저장 | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:23:32 | text | heading | heading | repeated-text |
| tests/e2e/learner-flow.spec.ts:23:51 | text | A안과 B안 비교 | heading | repeated-text |
| tests/e2e/learner-flow.spec.ts:24:28 | text | B안 | learner-text-candidate | repeated-text |
| tests/e2e/learner-flow.spec.ts:25:32 | text | 타당안—절충 확인 | learner-text-candidate | repeated-text |
| tests/e2e/learner-flow.spec.ts:26:33 | text | 모형과 안전 안내 | instruction | repeated-text |
| tests/e2e/learner-flow.spec.ts:30:45 | text | 미션 선택 | learner-text-candidate | repeated-text |
| tests/e2e/learner-flow.spec.ts:31:42 | text | 안전 | learner-text-candidate | repeated-text |
| tests/e2e/learner-flow.spec.ts:33:25 | text | button | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:33:43 | text | 도시 자료실로 이동 | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:34:30 | text | 인구 | learner-text-candidate | repeated-text |
| tests/e2e/learner-flow.spec.ts:34:36 | text | 도로·이동 단위 | learner-text-candidate | repeated-text |
| tests/e2e/learner-flow.spec.ts:34:48 | text | 가상 위험 표지 | learner-text-candidate | repeated-text |
| tests/e2e/learner-flow.spec.ts:34:60 | text | 후보지 비용 | learner-text-candidate | repeated-text |
| tests/e2e/learner-flow.spec.ts:34:70 | text | 기존 시설 | learner-text-candidate | repeated-text |
| tests/e2e/learner-flow.spec.ts:36:25 | text | button | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:36:43 | text | 도서관 1곳 시설 배치 | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:37:32 | text | 남은 예산 토큰 3 | learner-text-candidate | — |
| tests/e2e/learner-flow.spec.ts:39:25 | text | button | button-or-action, hint | repeated-text |
| tests/e2e/learner-flow.spec.ts:39:43 | text | 건강 도움소 1곳 시설 배치 | button-or-action, hint | repeated-text |
| tests/e2e/learner-flow.spec.ts:40:32 | text | 남은 예산 토큰 1 | learner-text-candidate | repeated-text |
| tests/e2e/learner-flow.spec.ts:41:25 | text | button | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:41:43 | text | 영향 계산 | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:44:25 | text | button | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:44:43 | text | A안 저장 | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:45:25 | text | button | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:45:43 | text | 후보 수정하여 B안 만들기 | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:47:25 | text | button | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:47:43 | text | 도서관 1곳 시설 배치 | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:48:32 | text | 남은 예산 토큰 1 | learner-text-candidate | repeated-text |
| tests/e2e/learner-flow.spec.ts:50:25 | text | button | button-or-action, hint | repeated-text |
| tests/e2e/learner-flow.spec.ts:50:43 | text | 건강 도움소 1곳 시설 배치 | button-or-action, hint | repeated-text |
| tests/e2e/learner-flow.spec.ts:51:32 | text | 남은 예산 토큰 2 | learner-text-candidate | repeated-text |
| tests/e2e/learner-flow.spec.ts:52:25 | text | button | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:52:43 | text | 영향 계산 | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:55:25 | text | button | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:55:43 | text | B안 저장 | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:56:32 | text | heading | heading | repeated-text |
| tests/e2e/learner-flow.spec.ts:56:51 | text | A안과 B안 비교 | heading | repeated-text |
| tests/e2e/learner-flow.spec.ts:60:28 | text | B안 | learner-text-candidate | repeated-text |
| tests/e2e/learner-flow.spec.ts:60:34 | text | 한 시설을 먼저 설치하고 다른 시설은 단계적으로 설치합니다. | learner-text-candidate | repeated-text |
| tests/e2e/learner-flow.spec.ts:61:33 | text | 완성한 입지 심의 의견서 | learner-text-candidate | repeated-text |
| tests/e2e/learner-flow.spec.ts:61:60 | text | 한 시설을 먼저 설치하고 다른 시설은 단계적으로 설치합니다. | learner-text-candidate | repeated-text |
| tests/e2e/learner-flow.spec.ts:62:32 | text | 타당안—절충 확인 | learner-text-candidate | repeated-text |
| tests/e2e/mobile-and-motion.spec.ts:32:32 | text | 현재 선택 좌표: B2 | learner-text-candidate | repeated-text |
| tests/e2e/mobile-and-motion.spec.ts:33:40 | text | 표 보기 | learner-text-candidate | repeated-text |
| tests/e2e/mobile-and-motion.spec.ts:34:52 | text | 표 보기 | learner-text-candidate | repeated-text |
| tests/e2e/mobile-and-motion.spec.ts:36:40 | text | 지도 보기 | learner-text-candidate | repeated-text |
| tests/e2e/mobile-and-motion.spec.ts:37:52 | text | 지도 보기 | learner-text-candidate | repeated-text |
| tests/e2e/mobile-and-motion.spec.ts:39:39 | text | button | button-or-action | repeated-text |
| tests/e2e/mobile-and-motion.spec.ts:39:57 | text | 자료층 확인 | button-or-action | repeated-text |
| tests/e2e/mobile-and-motion.spec.ts:43:43 | text | button:visible, input:visible, select:visible, textarea:visible | button-or-action, input | long-or-dense |
| tests/e2e/mobile-and-motion.spec.ts:49:40 | text | 지도 보기 | learner-text-candidate | repeated-text |
| tests/e2e/mobile-and-motion.spec.ts:54:40 | text | 지도 보기 | learner-text-candidate | repeated-text |
| tests/e2e/mobile-and-motion.spec.ts:55:52 | text | 지도 보기 | learner-text-candidate | repeated-text |
| tests/e2e/mobile-and-motion.spec.ts:56:25 | text | button | button-or-action | repeated-text |
| tests/e2e/mobile-and-motion.spec.ts:56:43 | text | 자료층 확인 | button-or-action | repeated-text |
| tests/e2e/mobile-and-motion.spec.ts:57:25 | text | button | button-or-action | repeated-text |
| tests/e2e/mobile-and-motion.spec.ts:57:43 | text | 시설 배치 | button-or-action | repeated-text |
| tests/e2e/mobile-and-motion.spec.ts:58:37 | text | button.gi-pulse | button-or-action | — |
| tests/e2e/mobile-and-motion.spec.ts:63:37 | text | button | button-or-action | repeated-text |
| tests/e2e/mobile-and-motion.spec.ts:63:55 | text | 영향 계산 | button-or-action | repeated-text |
| tests/e2e/mobile-and-motion.spec.ts:66:47 | text | 결과표 | learner-text-candidate | repeated-text |
| tests/e2e/mobile-and-motion.spec.ts:71:55 | text | 선택 위치 | learner-text-candidate | repeated-text |
| tests/e2e/mobile-and-motion.spec.ts:72:53 | text | 결과표 | learner-text-candidate | repeated-text |
| tests/e2e/mobile-and-motion.spec.ts:75:52 | text | 선택 위치 | learner-text-candidate | repeated-text |
| tests/e2e/mobile-and-motion.spec.ts:78:52 | text | 결과표 | learner-text-candidate | repeated-text |
| tests/e2e/mobile-and-motion.spec.ts:80:73 | text | button | button-or-action | repeated-text |
| tests/e2e/mobile-and-motion.spec.ts:81:25 | text | button | button-or-action | repeated-text |
| tests/e2e/mobile-and-motion.spec.ts:81:43 | text | 주민 관점표로 이동 | button-or-action | repeated-text |
| tests/e2e/mobile-and-motion.spec.ts:83:25 | text | button | button-or-action | repeated-text |
| tests/e2e/mobile-and-motion.spec.ts:83:43 | text | A안 저장 | button-or-action | repeated-text |
| tests/e2e/mobile-and-motion.spec.ts:84:25 | text | button | button-or-action | repeated-text |
| tests/e2e/mobile-and-motion.spec.ts:84:43 | text | 후보 수정하여 B안 만들기 | button-or-action | repeated-text |
| tests/e2e/mobile-and-motion.spec.ts:86:25 | text | button | button-or-action | repeated-text |
| tests/e2e/mobile-and-motion.spec.ts:86:43 | text | 시설 배치 | button-or-action | repeated-text |
| tests/e2e/mobile-and-motion.spec.ts:87:25 | text | button | button-or-action | repeated-text |
| tests/e2e/mobile-and-motion.spec.ts:87:43 | text | 영향 계산 | button-or-action | repeated-text |
| tests/e2e/mobile-and-motion.spec.ts:88:73 | text | button | button-or-action | repeated-text |
| tests/e2e/mobile-and-motion.spec.ts:89:25 | text | button | button-or-action | repeated-text |
| tests/e2e/mobile-and-motion.spec.ts:89:43 | text | 주민 관점표로 이동 | button-or-action | repeated-text |
| tests/e2e/mobile-and-motion.spec.ts:91:25 | text | button | button-or-action | repeated-text |
| tests/e2e/mobile-and-motion.spec.ts:91:43 | text | B안 저장 | button-or-action | repeated-text |
| tests/e2e/mobile-and-motion.spec.ts:92:25 | text | button | button-or-action | repeated-text |
| tests/e2e/mobile-and-motion.spec.ts:92:43 | text | 의견서 작성 | button-or-action | repeated-text |
| tests/e2e/mobile-and-motion.spec.ts:94:59 | text | 더 불편을 살필 구역 | learner-text-candidate | repeated-text |
| tests/e2e/mobile-and-motion.spec.ts:95:41 | text | button | button-or-action | repeated-text |
| tests/e2e/mobile-and-motion.spec.ts:95:59 | text | 의견서 작성 | button-or-action | repeated-text |
| tests/e2e/mobile-and-motion.spec.ts:96:72 | text | 선택안의 근거 | button-or-action | repeated-text |
| tests/e2e/mobile-and-motion.spec.ts:96:100 | text | 예상되는 반론 | button-or-action | repeated-text |
| tests/e2e/mobile-and-motion.spec.ts:96:128 | text | 보완 방법 | button-or-action | repeated-text |
| tests/e2e/mobile-and-motion.spec.ts:100:35 | text | button | button-or-action | repeated-text |
| tests/e2e/mobile-and-motion.spec.ts:100:53 | text | 업데이트 내역 | button-or-action | repeated-text |
| tests/e2e/mobile-and-motion.spec.ts:110:40 | text | button | button-or-action | repeated-text |
| tests/e2e/mobile-and-motion.spec.ts:110:58 | text | 업데이트 내역 닫기 | button-or-action | repeated-text |
| tests/e2e/mobile-and-motion.spec.ts:120:72 | text | 선택안의 근거 | button-or-action | repeated-text |
| tests/e2e/mobile-and-motion.spec.ts:120:100 | text | 예상되는 반론 | button-or-action | repeated-text |
| tests/e2e/mobile-and-motion.spec.ts:120:128 | text | 보완 방법 | button-or-action | repeated-text |
| tests/e2e/mobile-and-motion.spec.ts:123:39 | text | button | button-or-action | repeated-text |
| tests/e2e/mobile-and-motion.spec.ts:123:57 | text | 업데이트 내역 | button-or-action | repeated-text |
| tests/e2e/mobile-and-motion.spec.ts:126:44 | text | button | button-or-action | repeated-text |
| tests/e2e/mobile-and-motion.spec.ts:126:62 | text | 업데이트 내역 닫기 | button-or-action | repeated-text |
| tests/e2e/privacy-and-network.spec.ts:4:7 | text | rejects known analytics, map, AI, login, and submission request variants | learner-text-candidate | long-or-dense, missing-term-explanation, technical-or-internal |
| tests/e2e/privacy-and-network.spec.ts:25:25 | text | button | button-or-action | repeated-text |
| tests/e2e/privacy-and-network.spec.ts:25:43 | text | A안 저장 | button-or-action | repeated-text |
| tests/e2e/privacy-and-network.spec.ts:26:25 | text | button | button-or-action | repeated-text |
| tests/e2e/privacy-and-network.spec.ts:26:43 | text | 후보 수정하여 B안 만들기 | button-or-action | repeated-text |
| tests/e2e/privacy-and-network.spec.ts:28:25 | text | button | button-or-action | repeated-text |
| tests/e2e/privacy-and-network.spec.ts:28:43 | text | 시설 배치 | button-or-action | repeated-text |
| tests/e2e/privacy-and-network.spec.ts:29:25 | text | button | button-or-action | repeated-text |
| tests/e2e/privacy-and-network.spec.ts:29:43 | text | 영향 계산 | button-or-action | repeated-text |
| tests/e2e/privacy-and-network.spec.ts:32:25 | text | button | button-or-action | repeated-text |
| tests/e2e/privacy-and-network.spec.ts:32:43 | text | B안 저장 | button-or-action | repeated-text |
| tests/e2e/privacy-and-network.spec.ts:33:25 | text | button | button-or-action | repeated-text |
| tests/e2e/privacy-and-network.spec.ts:33:43 | text | 의견서 작성 | button-or-action | repeated-text |
| tests/e2e/privacy-and-network.spec.ts:34:42 | text | A안 | learner-text-candidate | repeated-text |
| tests/e2e/privacy-and-network.spec.ts:35:26 | text | 선택안의 근거 | learner-text-candidate | repeated-text |
| tests/e2e/privacy-and-network.spec.ts:35:42 | text | DISTINCTIVE_LEARNER_TEXT_2026 | learner-text-candidate | repeated-text |
| tests/e2e/privacy-and-network.spec.ts:36:33 | text | 선택안의 근거 | learner-text-candidate | repeated-text |
| tests/e2e/privacy-and-network.spec.ts:36:57 | text | DISTINCTIVE_LEARNER_TEXT_2026 | learner-text-candidate | repeated-text |
| tests/e2e/privacy-and-network.spec.ts:38:52 | text | 미션 선택 | learner-text-candidate | repeated-text |
| tests/e2e/redesign.spec.ts:6:34 | text | heading | heading | repeated-text |
| tests/e2e/redesign.spec.ts:6:53 | text | 심의 접수 | heading | repeated-text |
| tests/e2e/redesign.spec.ts:7:37 | text | button | button-or-action | repeated-text |
| tests/e2e/redesign.spec.ts:7:55 | text | 업데이트 내역 | button-or-action | repeated-text |
| tests/e2e/redesign.spec.ts:11:47 | text | 미션 선택 | learner-text-candidate | repeated-text |
| tests/e2e/redesign.spec.ts:12:44 | text | 접근성 | learner-text-candidate | repeated-text |
| tests/e2e/redesign.spec.ts:13:27 | text | button | button-or-action | repeated-text |
| tests/e2e/redesign.spec.ts:13:45 | text | 도시 자료실로 이동 | button-or-action | repeated-text |
| tests/e2e/redesign.spec.ts:14:34 | text | heading | heading | repeated-text |
| tests/e2e/redesign.spec.ts:14:53 | text | 도시 자료실 | heading | repeated-text |
| tests/e2e/redesign.spec.ts:16:46 | text | heading | heading | repeated-text |
| tests/e2e/redesign.spec.ts:16:65 | text | 도시 자료실 | heading | repeated-text |
| tests/e2e/redesign.spec.ts:26:47 | text | 미션 선택 | learner-text-candidate | repeated-text |
| tests/e2e/redesign.spec.ts:27:44 | text | 접근성 | learner-text-candidate | repeated-text |
| tests/e2e/redesign.spec.ts:28:27 | text | button | button-or-action | repeated-text |
| tests/e2e/redesign.spec.ts:28:45 | text | 도시 자료실로 이동 | button-or-action | repeated-text |
| tests/e2e/redesign.spec.ts:29:47 | text | 인구 | learner-text-candidate | repeated-text |
| tests/e2e/redesign.spec.ts:30:47 | text | 도로·이동 단위 | learner-text-candidate | repeated-text |
| tests/e2e/redesign.spec.ts:31:27 | text | button | button-or-action | repeated-text |
| tests/e2e/redesign.spec.ts:31:45 | text | 자료층 확인 | button-or-action | repeated-text |
| tests/e2e/redesign.spec.ts:33:27 | text | button | button-or-action | repeated-text |
| tests/e2e/redesign.spec.ts:34:27 | text | button | button-or-action | repeated-text |
| tests/e2e/redesign.spec.ts:34:45 | text | 영향 계산 | button-or-action | repeated-text |
| tests/e2e/redesign.spec.ts:35:27 | text | button | button-or-action | repeated-text |
| tests/e2e/redesign.spec.ts:36:27 | text | button | button-or-action | repeated-text |
| tests/e2e/redesign.spec.ts:37:27 | text | button | button-or-action | repeated-text |
| tests/e2e/redesign.spec.ts:37:45 | text | 주민 관점표로 이동 | button-or-action | repeated-text |
| tests/e2e/redesign.spec.ts:49:47 | text | 미션 선택 | learner-text-candidate | repeated-text |
| tests/e2e/redesign.spec.ts:50:44 | text | 접근성 | learner-text-candidate | repeated-text |
| tests/e2e/redesign.spec.ts:51:27 | text | button | button-or-action | repeated-text |
| tests/e2e/redesign.spec.ts:51:45 | text | 도시 자료실로 이동 | button-or-action | repeated-text |
| tests/e2e/redesign.spec.ts:60:9 | text | offers a keyboard skip link and stable pointer feedback | feedback-or-error | long-or-dense |
| tests/e2e/redesign.spec.ts:64:54 | text | 본문으로 건너뛰기 | learner-text-candidate | repeated-text |
| tests/e2e/redesign.spec.ts:70:37 | text | button | button-or-action | repeated-text |
| tests/e2e/redesign.spec.ts:70:55 | text | 업데이트 내역 | button-or-action | repeated-text |
| tests/e2e/table-only.spec.ts:9:7 | text | starts with the labeled table and completes the core activity without activating the grid | learner-text-candidate | long-or-dense, missing-term-explanation, technical-or-internal |
| tests/e2e/table-only.spec.ts:11:30 | text | 인구 | learner-text-candidate | repeated-text |
| tests/e2e/table-only.spec.ts:11:36 | text | 도로·이동 단위 | learner-text-candidate | repeated-text |
| tests/e2e/table-only.spec.ts:11:48 | text | 가상 위험 표지 | learner-text-candidate | repeated-text |
| tests/e2e/table-only.spec.ts:11:60 | text | 후보지 비용 | learner-text-candidate | repeated-text |
| tests/e2e/table-only.spec.ts:11:70 | text | 기존 시설 | learner-text-candidate | repeated-text |
| tests/e2e/table-only.spec.ts:12:52 | text | 표 보기 | learner-text-candidate | repeated-text |
| tests/e2e/table-only.spec.ts:16:56 | text | 도로·이동 단위 | learner-text-candidate | repeated-text |
| tests/e2e/table-only.spec.ts:17:56 | text | 위험 표지 | learner-text-candidate | repeated-text |
| tests/e2e/table-only.spec.ts:18:56 | text | 후보지·비용 | learner-text-candidate | repeated-text |
| tests/e2e/table-only.spec.ts:19:56 | text | 기존 시설 | learner-text-candidate | repeated-text |
| tests/e2e/table-only.spec.ts:21:25 | text | button | button-or-action | repeated-text |
| tests/e2e/table-only.spec.ts:21:43 | text | 자료층 확인 | button-or-action | repeated-text |
| tests/e2e/table-only.spec.ts:23:25 | text | button | button-or-action | repeated-text |
| tests/e2e/table-only.spec.ts:23:43 | text | 시설 배치 | button-or-action | repeated-text |
| tests/e2e/table-only.spec.ts:24:25 | text | button | button-or-action | repeated-text |
| tests/e2e/table-only.spec.ts:24:43 | text | 영향 계산 | button-or-action | repeated-text |
| tests/e2e/table-only.spec.ts:26:49 | text | 구역별 주민 관점 비교 | learner-text-candidate | repeated-text |
| tests/e2e/table-only.spec.ts:27:56 | text | 사람 토큰 | learner-text-candidate | repeated-text |
| tests/e2e/table-only.spec.ts:28:56 | text | 도달 여부 | learner-text-candidate | repeated-text |
| tests/e2e/table-only.spec.ts:30:25 | text | button | button-or-action | repeated-text |
| tests/e2e/table-only.spec.ts:30:43 | text | A안 저장 | button-or-action | repeated-text |
| tests/e2e/table-only.spec.ts:31:25 | text | button | button-or-action | repeated-text |
| tests/e2e/table-only.spec.ts:31:43 | text | 후보 수정하여 B안 만들기 | button-or-action | repeated-text |
| tests/e2e/table-only.spec.ts:33:25 | text | button | button-or-action | repeated-text |
| tests/e2e/table-only.spec.ts:33:43 | text | 시설 배치 | button-or-action | repeated-text |
| tests/e2e/table-only.spec.ts:34:25 | text | button | button-or-action | repeated-text |
| tests/e2e/table-only.spec.ts:34:43 | text | 영향 계산 | button-or-action | repeated-text |
| tests/e2e/table-only.spec.ts:37:25 | text | button | button-or-action | repeated-text |
| tests/e2e/table-only.spec.ts:37:43 | text | B안 저장 | button-or-action | repeated-text |
| tests/e2e/table-only.spec.ts:39:33 | text | 모형과 안전 안내 | instruction | repeated-text |
| tests/fixtures/tinyCity.ts:25:10 | text | 터 ${id} | learner-text-candidate | missing-term-explanation, technical-or-internal |
| tests/fixtures/tinyCity.ts:34:12 | text | A 구역 | learner-text-candidate | — |
| tests/fixtures/tinyCity.ts:42:12 | text | C 구역 | learner-text-candidate | — |
| tests/fixtures/tinyCity.ts:52:10 | text | D 구역 | learner-text-candidate | — |
| tests/fixtures/tinyCity.ts:68:46 | text | C1 | learner-text-candidate | — |
| tests/fixtures/tinyCity.ts:70:13 | text | 물 고임 표지 | learner-text-candidate | repeated-text |
| tests/fixtures/tinyCity.ts:77:12 | text | 기존 작은도서관 | learner-text-candidate | — |
| tests/fixtures/tinyCity.ts:80:46 | text | A1 | learner-text-candidate | repeated-text |
| tests/fixtures/tinyCity.ts:86:10 | text | 작은 가상 도시 | learner-text-candidate | — |
| tests/fixtures/tinyCity.ts:90:34 | text | A | learner-text-candidate | repeated-text |
| tests/fixtures/tinyCity.ts:91:34 | text | B | learner-text-candidate | repeated-text |
| tests/fixtures/tinyCity.ts:92:34 | text | C | learner-text-candidate | — |
| tests/fixtures/tinyCity.ts:93:34 | text | D | learner-text-candidate | — |
| tests/fixtures/tinyCity.ts:100:23 | text | 모든 수치는 학습을 위한 가상 단위입니다. | learner-text-candidate | — |
| tests/fixtures/tinyCity.ts:111:11 | text | 작은 도서관 미션 | learner-text-candidate | — |
| tests/fixtures/tinyCity.ts:116:14 | text | WITHIN_BUDGET | learner-text-candidate | repeated-text |
| tests/fixtures/tinyCity.ts:116:38 | text | 예산 안에 놓기 | learner-text-candidate | — |
| tests/fixtures/tinyCity.ts:117:14 | text | NO_UNREACHABLE_ZONE | learner-text-candidate | repeated-text |
| tests/fixtures/tinyCity.ts:117:44 | text | 모두 도달 가능 | learner-text-candidate | — |
| tests/fixtures/tinyCity.ts:125:20 | text | 가상 도시 자료를 근거로 시설 위치를 비교합니다. | learner-text-candidate | — |

## Limitations

- Candidates are triage signals, not an automatic grade-level or readability certification.
- Static scanning can miss runtime-composed text, fetched content, canvas/image text, and some template syntax.
- Every candidate requires rendered-state, target-grade, learning-intent, and curriculum-accuracy review.
- This command reads source files and writes only the optional report path; it never rewrites source files.

## Configuration

- Extensions: `.astro, .cjs, .htm, .html, .js, .jsx, .mjs, .svelte, .ts, .tsx, .vue`
- Excluded directories: `.git, .next, .nuxt, .parcel-cache, .turbo, .vite, build, coverage, dist, node_modules, out, target, vendor`
