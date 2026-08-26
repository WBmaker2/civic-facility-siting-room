import type { GridCoordinate } from './types';

export function columnLabel(column: number): string {
  let value = column + 1;
  let result = '';
  while (value > 0) {
    const remainder = (value - 1) % 26;
    result = String.fromCharCode(65 + remainder) + result;
    value = Math.floor((value - 1) / 26);
  }
  return result;
}

export function coordinateLabel(row: number, column: number): string {
  return `${columnLabel(column)}${row + 1}`;
}

export function nodeId(prefix: string, row: number, column: number): string {
  return `${prefix}-${coordinateLabel(row, column).toLowerCase()}`;
}

export function createGridNodes(prefix: string, rows: number, columns: number): GridCoordinate[] {
  return Array.from({ length: rows * columns }, (_, index) => {
    const row = Math.floor(index / columns);
    const column = index % columns;
    return { row, column, label: coordinateLabel(row, column) };
  });
}

export function isCoordinateInBounds(coordinate: GridCoordinate, rows: number, columns: number): boolean {
  return Number.isInteger(coordinate.row) && Number.isInteger(coordinate.column)
    && coordinate.row >= 0 && coordinate.row < rows && coordinate.column >= 0 && coordinate.column < columns;
}

export const isInBounds = isCoordinateInBounds;
