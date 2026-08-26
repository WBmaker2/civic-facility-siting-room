import type { GridCoordinate } from '../../domain/types';

export interface FacilityRangeProps {
  coordinate: GridCoordinate;
  radiusUnits: number;
  reducedMotion: boolean;
}

export function FacilityRange({ coordinate, radiusUnits, reducedMotion }: FacilityRangeProps) {
  const safeRadius = Number.isFinite(radiusUnits) && radiusUnits >= 0 ? radiusUnits : 0;
  return (
    <div className={`facility-range${reducedMotion ? '' : ' facility-range--spread'}`} aria-label={`${coordinate.label} 가상 서비스 범위`} data-coordinate={coordinate.label}>
      <strong>가상 서비스 범위</strong>
      <span>중심 좌표: {coordinate.label}</span>
      <span>반경: {safeRadius} 이동 단위</span>
      <small>실제 거리·시간이 아닌 상대 이동 단위로 표시한 경계입니다.</small>
    </div>
  );
}
