export type UpdateCategory = '설계' | '개발' | '개선';

export interface UpdateEntry {
  date: string;
  category: UpdateCategory;
  summaries: string[];
}

function freezeEntry(entry: UpdateEntry): UpdateEntry {
  const summaries = Object.freeze([...entry.summaries]) as unknown as string[];
  return Object.freeze({ ...entry, summaries });
}

export const UPDATE_HISTORY: readonly UpdateEntry[] = Object.freeze([
  freezeEntry({
    date: '2026-08-27',
    category: '개선',
    summaries: ['375px 모바일 지도·표 내부 스크롤과 reflow, table-only 시작·범례 이름·의견 입력 44px 터치 영역·자료층 확인 enabled gi-pulse CTA 보강'],
  }),
  freezeEntry({
    date: '2026-08-27',
    category: '개발',
    summaries: [
      '가상 도시 2종과 미션 4종 구현',
      '접근성 표 보기와 결정적 판정 모델 추가',
      '사회적 표현 및 개인정보 안전 검수 완료',
    ],
  }),
  freezeEntry({ date: '2026-08-26', category: '설계', summaries: ['최초 설계 문서 작성'] }),
]);
