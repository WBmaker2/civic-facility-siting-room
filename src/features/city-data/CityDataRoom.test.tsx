import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';
import { App } from '../../app/App';

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

  it('moves the actual stage region after confirming two layers', async () => {
    const user = await renderSessionAtDataRoom();
    await user.click(screen.getByRole('checkbox', { name: /인구/ }));
    await user.click(screen.getByRole('checkbox', { name: /도로·이동 단위/ }));
    await user.click(screen.getByRole('button', { name: '자료층 확인' }));

    expect(screen.getByRole('region', { name: '후보 배치판' })).toHaveAttribute('data-stage-id', 'placement');
    expect(screen.queryByRole('region', { name: '도시 자료실' })).not.toBeInTheDocument();
  });
});
