import type { DataLayerId } from '../../domain/types';

interface LayerMeaning {
  label: string;
  icon: string;
  pattern: string;
  description: string;
}

const LAYER_MEANINGS: Record<DataLayerId, LayerMeaning> = {
  population: { label: '인구', icon: '●', pattern: '사람 토큰', description: '인구가 분포한 구역을 사람 토큰 수로 읽습니다.' },
  roads: { label: '도로·이동 단위', icon: '↔', pattern: '연결선과 이동 숫자', description: '구역 사이 도로 연결과 이동에 드는 상대 단위를 확인합니다.' },
  risk: { label: '가상 위험 표지', icon: '△', pattern: '빗금 표지', description: '빗물 고임이나 급경사처럼 가상으로 표시한 위험 조건입니다.' },
  cost: { label: '후보지 비용', icon: '▣', pattern: '예산 토큰', description: '후보지를 고를 때 필요한 1~3단계 상대 예산 토큰입니다.' },
  'existing-facilities': { label: '기존 시설', icon: '⌂', pattern: '건물 무늬', description: '이미 있는 시설의 위치를 보고 서비스 중복과 공백을 비교합니다.' },
};

export function LayerLegend({ activeLayerIds }: { activeLayerIds: DataLayerId[] }) {
  if (activeLayerIds.length === 0) return <p>자료층을 켜면 아이콘·무늬·설명이 여기에 나타납니다.</p>;
  return (
    <div aria-label="켜진 자료층 범례" aria-labelledby="layer-legend-heading">
      <h3 id="layer-legend-heading">켜진 자료층 범례</h3>
      <ul>
        {activeLayerIds.map((layerId) => {
          const meaning = LAYER_MEANINGS[layerId];
          return (
            <li key={layerId} data-layer-id={layerId}>
              <span aria-hidden="true">{meaning.icon}</span>{' '}
              <strong>{meaning.label}</strong> · 무늬: {meaning.pattern} · {meaning.description}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export { LAYER_MEANINGS };
