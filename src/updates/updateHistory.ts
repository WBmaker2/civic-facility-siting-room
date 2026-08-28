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
    date: '2026-08-28',
    category: '개선',
    summaries: ['후보지 위치를 더 잘 찾고, 결과 카드를 확인한 뒤 다음 단계로 갈 수 있게 안내를 다듬었습니다.', '의견서 입력 도움말과 완료 알림을 어린이가 이해하기 쉽게 고쳤습니다.'],
  }),
  freezeEntry({
    date: '2026-08-27',
    category: '개선',
    summaries: ['작은 화면에서 지도와 표를 편하게 살피고, 의견 입력과 자료 확인 버튼을 더 쉽게 사용할 수 있게 다듬었습니다.'],
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
