import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';
import { useEffect } from 'react';
import { App } from '../../app/App';
import { CityDataRoom } from './CityDataRoom';
import { SessionProvider, useSession } from '../../state/SessionProvider';

async function renderSessionAtDataRoom() {
  const user = userEvent.setup();
  render(<App />);
  await user.selectOptions(screen.getByRole('combobox', { name: '미션 선택' }), 'bookmaru-library');
  await user.click(screen.getByRole('radio', { name: /접근성/ }));
  await user.click(screen.getByRole('button', { name: '도시 자료실로 이동' }));
  return user;
}

describe('CityDataRoom', () => {
  afterEach(() => cleanup());

  it('requires two reviewed layers before data confirmation', async () => {
    const user = await renderSessionAtDataRoom();
    const confirm = screen.getByRole('button', { name: '자료층 확인' });
    expect(confirm).toBeDisabled();

    await user.click(screen.getByRole('checkbox', { name: /인구/ }));
    await user.click(screen.getByRole('checkbox', { name: /도로·이동 단위/ }));
    expect(confirm).toBeEnabled();
    expect(screen.getByRole('status')).toHaveTextContent('5개 중 2개 확인');
  });

  it('keeps reviewed evidence after a layer is unchecked and exposes legend meaning', async () => {
    const user = await renderSessionAtDataRoom();
    const population = screen.getByRole('checkbox', { name: /인구/ });
    const roads = screen.getByRole('checkbox', { name: /도로·이동 단위/ });

    await user.click(population);
    await user.click(roads);
    expect(screen.getByText(/인구가 분포한 구역/)).toBeInTheDocument();
    await user.click(population);

    expect(population).not.toBeChecked();
    expect(screen.getByRole('status')).toHaveTextContent('5개 중 2개 확인');
    expect(screen.getByText(/사람 토큰/)).toBeInTheDocument();
    expect(screen.getByText(/연결선/)).toBeInTheDocument();
  });

  it('exposes all five exact checkbox names and retains reviewed evidence after every toggle', async () => {
    const user = await renderSessionAtDataRoom();
    const labels = ['인구', '도로·이동 단위', '가상 위험 표지', '후보지 비용', '기존 시설'];
    const checkboxes = labels.map((label) => screen.getByRole('checkbox', { name: label }));
    checkboxes.forEach((checkbox) => expect(checkbox).not.toBeChecked());

    for (const checkbox of checkboxes) {
      await user.click(checkbox);
      expect(checkbox).toBeChecked();
    }
    expect(screen.getByRole('status')).toHaveTextContent('5개 중 5개 확인');
    expect(screen.getByRole('button', { name: '자료층 확인' })).toBeEnabled();
    expect(document.querySelectorAll('[data-layer-id]')).toHaveLength(5);

    for (const checkbox of checkboxes) {
      await user.click(checkbox);
      expect(checkbox).not.toBeChecked();
    }
    expect(screen.getByRole('status')).toHaveTextContent('5개 중 5개 확인');
    expect(screen.getByRole('button', { name: '자료층 확인' })).toBeEnabled();
    expect(document.querySelectorAll('[data-layer-id]')).toHaveLength(0);
  });

  it('moves the actual stage region after confirming two layers', async () => {
    const user = await renderSessionAtDataRoom();
    await user.click(screen.getByRole('checkbox', { name: /인구/ }));
    await user.click(screen.getByRole('checkbox', { name: /도로·이동 단위/ }));
    await user.click(screen.getByRole('button', { name: '자료층 확인' }));

    expect(screen.getByRole('region', { name: '후보 배치판' })).toHaveAttribute('data-stage-id', 'placement');
    expect(screen.queryByRole('region', { name: '도시 자료실' })).not.toBeInTheDocument();
  });

  it('fails closed when rendered in the initial SessionProvider without intake context', async () => {
    const user = userEvent.setup();
    render(<SessionProvider><CityDataRoom /></SessionProvider>);

    const confirm = screen.getByRole('button', { name: '자료층 확인' });
    expect(confirm).toBeDisabled();
    expect(screen.getByRole('alert')).toHaveTextContent(/미션.*배정 도시.*우선순위/);
    expect(screen.getByRole('button', { name: '심의 접수로 돌아가기' })).toBeInTheDocument();

    await user.click(screen.getByRole('checkbox', { name: '인구' }));
    await user.click(screen.getByRole('checkbox', { name: '도로·이동 단위' }));
    expect(confirm).toBeDisabled();
  });

  it('fails closed for inherited mission identifiers without showing an undefined city', async () => {
    function InvalidContextHarness() {
      const { dispatch } = useSession();
      useEffect(() => {
        dispatch({ type: 'select-mission', missionId: '__proto__' as 'bookmaru-library' });
      }, [dispatch]);
      return <CityDataRoom />;
    }

    render(<SessionProvider><InvalidContextHarness /></SessionProvider>);
    await waitFor(() => expect(screen.getByRole('alert')).toBeInTheDocument());
    expect(screen.getByRole('button', { name: '자료층 확인' })).toBeDisabled();
    expect(screen.getByRole('alert')).toHaveTextContent(/미션.*배정 도시.*우선순위/);
    expect(screen.queryByText(/undefined의 가상 자료/)).not.toBeInTheDocument();
  });

  it('provides a labeled keyboard grid with a single active descendant', async () => {
    const user = await renderSessionAtDataRoom();
    const grid = screen.getByRole('grid', { name: /물빛시.*격자/ });

    expect(grid).toHaveAttribute('tabindex', '0');
    expect(grid).toHaveAttribute('aria-activedescendant', 'mulbit-cell-a1');
    expect(screen.getByText('현재 좌표: A1')).toBeInTheDocument();
    expect(grid.querySelectorAll('[tabindex="0"]')).toHaveLength(0);

    grid.focus();
    await user.keyboard('{ArrowRight}{ArrowDown}');
    expect(document.activeElement).toBe(grid);
    expect(screen.getByText('현재 좌표: B2')).toBeInTheDocument();
    expect(grid).toHaveAttribute('aria-activedescendant', 'mulbit-cell-b2');
  });

  it('clamps grid movement and supports Home and End within the current row', async () => {
    const user = await renderSessionAtDataRoom();
    const grid = screen.getByRole('grid', { name: /물빛시.*격자/ });
    grid.focus();

    await user.keyboard('{ArrowLeft}{ArrowUp}{End}');
    expect(grid).toHaveAttribute('aria-activedescendant', 'mulbit-cell-e1');
    await user.keyboard('{Home}');
    expect(grid).toHaveAttribute('aria-activedescendant', 'mulbit-cell-a1');
  });

  it('selects a candidate with Enter or Space while focus remains on the grid', async () => {
    const user = await renderSessionAtDataRoom();
    const grid = screen.getByRole('grid', { name: /물빛시.*격자/ });
    grid.focus();
    await user.keyboard('{ArrowRight}{ArrowDown}{Enter}');
    expect(screen.getByText('현재 선택 좌표: B2')).toBeInTheDocument();
    expect(document.activeElement).toBe(grid);

    await user.keyboard('{Space}');
    expect(document.activeElement).toBe(grid);
    expect(grid).toHaveAttribute('aria-activedescendant', 'mulbit-cell-b2');
  });

  it('exposes equivalent table data and candidate radio selection', async () => {
    const user = await renderSessionAtDataRoom();
    await user.click(screen.getByRole('tab', { name: '표 보기' }));

    const table = screen.getByRole('table', { name: /물빛시.*도시 자료/ });
    expect(table.querySelector('caption')).toHaveTextContent(/물빛시/);
    expect(table).toHaveTextContent('A1');
    expect(table).toHaveTextContent('햇살 북쪽 구역');
    expect(table).toHaveTextContent('사람 토큰 5');
    expect(table).toHaveTextContent('도로 연결');
    expect(table).toHaveTextContent('기존 보장 시설 없음');
    expect(table).toHaveTextContent('후보지 없음');

    const candidate = screen.getByRole('radio', { name: /느린 강변 터.*비용 1/ });
    await user.click(candidate);
    expect(candidate).toBeChecked();
    expect(screen.getByText('현재 선택 좌표: B2')).toBeInTheDocument();
  });

  it('uses text, icon, and pattern encoding for a risk cell', async () => {
    const user = await renderSessionAtDataRoom();
    await user.click(screen.getByRole('checkbox', { name: '가상 위험 표지' }));

    const riskCell = screen.getByRole('gridcell', { name: /A4.*빗물 고임/ });
    expect(riskCell).toHaveAttribute('data-pattern', 'waves');
    expect(riskCell).toHaveTextContent('≋');
    expect(riskCell.querySelector('[data-pattern="waves"]')).toBeInTheDocument();
  });

  it('renders only the selected view panel while tabs remain switchable', async () => {
    const user = await renderSessionAtDataRoom();
    expect(screen.getByRole('tabpanel', { name: '지도 보기' })).toBeInTheDocument();
    expect(screen.queryByRole('tabpanel', { name: '표 보기' })).not.toBeInTheDocument();

    await user.click(screen.getByRole('tab', { name: '표 보기' }));
    expect(screen.queryByRole('tabpanel', { name: '지도 보기' })).not.toBeInTheDocument();
    expect(screen.getByRole('tabpanel', { name: '표 보기' })).toBeInTheDocument();
  });
});
