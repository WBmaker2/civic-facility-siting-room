import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';
import { App } from '../../app/App';
import { CityDataRoom } from './CityDataRoom';
import { SessionProvider } from '../../state/SessionProvider';

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
});
