import { nodeId } from './coordinates';
import type { RoadEdge } from './types';

export interface GridRoadOptions {
  blockedLinks?: string[];
  weightedLinks?: Record<string, number>;
}

function linkKey(from: string, to: string): string {
  return [from, to].sort().join('::');
}

export function buildGridRoads(prefix: string, rows: number, columns: number, options: GridRoadOptions = {}): RoadEdge[] {
  const blocked = new Set((options.blockedLinks ?? []).map((link) => {
    const [from, to] = link.split('::');
    return from && to ? linkKey(from, to) : link;
  }));
  const edges: RoadEdge[] = [];
  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const from = nodeId(prefix, row, column);
      const neighbors = [[row, column + 1], [row + 1, column]] as const;
      for (const [nextRow, nextColumn] of neighbors) {
        if (nextRow >= rows || nextColumn >= columns) continue;
        const to = nodeId(prefix, nextRow, nextColumn);
        const key = linkKey(from, to);
        if (blocked.has(key)) continue;
        const travelUnits = options.weightedLinks?.[key] ?? options.weightedLinks?.[`${from}::${to}`] ?? 1;
        edges.push({ from, to, travelUnits });
      }
    }
  }
  return edges;
}

export const buildGridRoadEdges = buildGridRoads;
