import type { GridCoordinate } from '../../domain/types';
import { cloneStrictSerializable } from '../../engine/proposalComparison';

export interface FacilityRangeProps {
  coordinate: GridCoordinate;
  radiusUnits: number;
  reducedMotion: boolean;
}

const isCoordinate = (value: unknown): value is GridCoordinate => {
  try {
    if (value === null || typeof value !== 'object') return false;
    const keys = Reflect.ownKeys(value);
    if (keys.length !== 3 || !keys.every((key) => typeof key === 'string' && ['row', 'column', 'label'].includes(key))) return false;
    const record = value as Record<string, unknown>;
    return Number.isSafeInteger(record.row) && (record.row as number) >= 0
      && Number.isSafeInteger(record.column) && (record.column as number) >= 0
      && typeof record.label === 'string' && record.label.trim().length > 0;
  } catch { return false; }
};

export function FacilityRange({ coordinate, radiusUnits, reducedMotion }: FacilityRangeProps) {
  let safeCoordinate: GridCoordinate | null = null;
  try {
    const cloned = cloneStrictSerializable<GridCoordinate>(coordinate);
    if (isCoordinate(cloned)) safeCoordinate = cloned;
  } catch { safeCoordinate = null; }
  const validRadius = typeof radiusUnits === 'number' && Number.isFinite(radiusUnits) && radiusUnits >= 0;
  if (safeCoordinate === null || !validRadius || typeof reducedMotion !== 'boolean') return <p role="alert">가상 서비스 범위 자료를 표시할 수 없습니다. 좌표와 상대 이동 단위를 확인해 주세요.</p>;
  return (
    <div className={`facility-range${reducedMotion ? '' : ' facility-range--spread'}`} aria-label={`${safeCoordinate.label} 가상 서비스 범위`} data-coordinate={safeCoordinate.label}>
      <strong>가상 서비스 범위</strong>
      <span>중심 좌표: {safeCoordinate.label}</span>
      <span>서비스 기준: {radiusUnits} 상대 이동 단위</span>
      <small>실제 거리·시간이 아닌 상대 이동 단위로 표시한 경계입니다.</small>
    </div>
  );
}
