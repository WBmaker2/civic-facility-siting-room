# Civic Facility Siting Room Redesign Asset Record

검토일: 2026-08-29
검토 대상: `/Volumes/ External Drive 256G/Dev2/codex/civic-facility-siting-room`

## 검색 결과

`public/` 디렉터리와 `src/assets/` 디렉터리가 존재하지 않습니다. JSX/TSX의 `<img>`, CSS `url(...)`, `srcset`, preload 참조도 없습니다. 지도는 `GridMap.tsx`의 HTML grid와 텍스트·무늬·아이콘 문자로 렌더링됩니다.

## 판정

| 원본 | 화면·역할 | 판정 | 새 파일 | 접근성 | 상태 | 롤백 |
|---|---|---|---|---|---|---|
| 없음 | 도시 격자 지도·결과 표 | 자동 생성·교체 금지 대상인 데이터 시각화 대신 DOM으로 구현 | 없음 | 색·무늬·문자·ARIA를 함께 제공 | 유지·검토 완료 | DOM 렌더링을 유지하며 이미지 참조를 추가하지 않음 |
| 없음 | 앱 장식·hero 이미지 | 이미지 사용 없음 | 없음 | 장식 alt 없음 | imagegen not run | 새 장식 이미지를 추가하지 않음 |

이번 리디자인에서는 이미지가 학습 목표를 가리거나 근거 없는 수치·지도·기관 이미지를 만들 위험을 피하기 위해 `imagegen`을 호출하지 않습니다. 이후 일반 개념 일러스트가 별도 승인될 때만 원본 보존·버전 파일·alt 텍스트·출처를 기록하고 검토합니다.

## 2026-08-30 재검토

`imagegen`의 `SKILL.md`를 다시 읽고 `public/`, `src/assets/`, JSX·TSX 이미지 import, CSS `url()`, `srcset`, preload를 재검색했습니다. 새 자산 사용처는 발견되지 않았습니다. 따라서 이미지 생성·편집·교체는 실행하지 않았고, DOM 지도·표의 텍스트·무늬·ARIA 표현을 유지했습니다. 새로 추가한 UI는 이미지 없이도 동일한 학습 정보를 전달합니다.
