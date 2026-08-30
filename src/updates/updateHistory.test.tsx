import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { App } from '../app/App';
import { UPDATE_HISTORY, type UpdateEntry } from './updateHistory';
import { UpdateHistoryButton } from './UpdateHistoryButton';

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe('UPDATE_HISTORY', () => {
  it('keeps the exact dated entries newest first and immutable', () => {
    expect(UPDATE_HISTORY).toEqual([
      { date: '2026-08-30', category: '개선', summaries: ['키보드로 처음 들어온 학습자가 본문으로 바로 건너뛸 수 있게 길을 추가했습니다.', '버튼을 가리키거나 누를 때 상태가 보이고, 움직임을 줄인 환경에서도 편안하게 사용할 수 있게 다듬었습니다.'] },
      { date: '2026-08-29', category: '개선', summaries: ['단계가 바뀌면 새 화면의 제목으로 바로 이동하고, 작은 화면에서도 다음 행동을 쉽게 찾도록 화면 구성을 정리했습니다.', '업데이트 내역 버튼과 비교 자료를 학습 내용을 가리지 않는 자리로 옮겼습니다.'] },
      { date: '2026-08-28', category: '개선', summaries: ['후보지 위치를 더 잘 찾고, 결과 카드를 확인한 뒤 다음 단계로 갈 수 있게 안내를 다듬었습니다.', '의견서 입력 도움말과 완료 알림을 어린이가 이해하기 쉽게 고쳤습니다.'] },
      { date: '2026-08-27', category: '개선', summaries: ['작은 화면에서 지도와 표를 편하게 살피고, 의견 입력과 자료 확인 버튼을 더 쉽게 사용할 수 있게 다듬었습니다.'] },
      {
        date: '2026-08-27',
        category: '개발',
        summaries: [
          '가상 도시 2종과 미션 4종 구현',
          '접근성 표 보기와 결정적 판정 모델 추가',
          '사회적 표현 및 개인정보 안전 검수 완료',
        ],
      },
      { date: '2026-08-26', category: '설계', summaries: ['최초 설계 문서 작성'] },
    ] satisfies readonly UpdateEntry[]);
    expect(UPDATE_HISTORY.flatMap((entry) => entry.summaries).join(' ')).not.toMatch(/reflow|table-only|enabled|gi-pulse CTA/);
    expect(UPDATE_HISTORY.every((entry) => /^\d{4}-\d{2}-\d{2}$/.test(entry.date))).toBe(true);
    expect(UPDATE_HISTORY[0]?.date).toBe('2026-08-30');
    expect((UPDATE_HISTORY[0]?.date ?? '') >= (UPDATE_HISTORY[1]?.date ?? '')).toBe(true);
    expect(Object.isFrozen(UPDATE_HISTORY)).toBe(true);
    expect(UPDATE_HISTORY.every((entry) => Object.isFrozen(entry) && Object.isFrozen(entry.summaries))).toBe(true);
  });
});

describe('UpdateHistoryButton', () => {
  it('opens the fallback dialog, focuses close, closes on Escape, and returns focus', async () => {
    const user = userEvent.setup();
    render(<UpdateHistoryButton />);
    const trigger = screen.getByRole('button', { name: '업데이트 내역' });
    expect(trigger).toHaveAttribute('aria-haspopup', 'dialog');
    await user.click(trigger);
    const dialog = screen.getByRole('dialog', { name: '업데이트 내역' });
    expect(dialog).toHaveAttribute('open');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(screen.getByRole('button', { name: '업데이트 내역 닫기' })).toHaveFocus();
    expect(screen.getByText('가상 도시 2종과 미션 4종 구현')).toBeInTheDocument();
    await user.keyboard('{Escape}');
    expect(dialog).not.toHaveAttribute('open');
    expect(trigger).toHaveFocus();
    await user.click(trigger);
    expect(screen.getByRole('dialog', { name: '업데이트 내역' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: '업데이트 내역 닫기' }));
    expect(trigger).toHaveFocus();
  });

  it('uses native showModal and close when the browser provides them', async () => {
    const showModal = vi.fn(function showModal(this: HTMLDialogElement) { this.setAttribute('open', ''); });
    const close = vi.fn(function close(this: HTMLDialogElement) { this.removeAttribute('open'); });
    Object.defineProperty(HTMLDialogElement.prototype, 'showModal', { configurable: true, value: showModal });
    Object.defineProperty(HTMLDialogElement.prototype, 'close', { configurable: true, value: close });
    const user = userEvent.setup();
    render(<UpdateHistoryButton />);
    const trigger = screen.getByRole('button', { name: '업데이트 내역' });
    await user.click(trigger);
    expect(showModal).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('button', { name: '업데이트 내역 닫기' })).toHaveFocus();
    await user.click(screen.getByRole('button', { name: '업데이트 내역 닫기' }));
    expect(close).toHaveBeenCalledTimes(1);
    expect(trigger).toHaveFocus();
  });

  it('renders one trigger in the App independently of learner state', async () => {
    const user = userEvent.setup();
    render(<App />);
    expect(screen.getAllByRole('button', { name: '업데이트 내역' })).toHaveLength(1);
    await user.selectOptions(screen.getByRole('combobox', { name: '미션 선택' }), 'bookmaru-library');
    await user.click(screen.getByRole('radio', { name: '접근성' }));
    await user.click(screen.getByRole('button', { name: '도시 자료실로 이동' }));
    expect(screen.getAllByRole('button', { name: '업데이트 내역' })).toHaveLength(1);
    await user.click(screen.getByRole('button', { name: '업데이트 내역' }));
    await user.click(screen.getByRole('button', { name: '업데이트 내역 닫기' }));
    expect(screen.getByRole('region', { name: '도시 자료실' })).toBeInTheDocument();
  });
});
