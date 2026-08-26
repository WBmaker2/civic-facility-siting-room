import { describe, expect, it } from 'vitest';
import { TINY_CITY_ROADS } from '../../tests/fixtures/tinyCity';
import { shortestTravelPath } from './shortestPath';

const edges = TINY_CITY_ROADS;

describe('shortestTravelPath', () => {
  it('uses weights instead of direct geometric distance', () => {
    expect(shortestTravelPath([...edges], 'A', 'C')).toEqual({
      travelUnits: 5,
      nodeIds: ['A', 'B', 'C'],
    });
  });

  it('treats roads as bidirectional', () => {
    expect(shortestTravelPath([...edges], 'C', 'A')).toEqual({
      travelUnits: 5,
      nodeIds: ['C', 'B', 'A'],
    });
  });

  it('returns null for a disconnected node', () => {
    expect(shortestTravelPath([...edges], 'A', 'D')).toBeNull();
  });

  it('returns the zero-length path when start and end are equal', () => {
    expect(shortestTravelPath([...edges], 'A', 'A')).toEqual({ travelUnits: 0, nodeIds: ['A'] });
  });

  it('validates all edge weights before the start-equals-end early return', () => {
    for (const travelUnits of [0, -1, 1.5, Number.NaN, Number.POSITIVE_INFINITY]) {
      expect(() => shortestTravelPath([{ from: 'A', to: 'B', travelUnits }], 'A', 'A')).toThrow(RangeError);
    }
  });

  it('breaks equal-cost ties using the complete path lexicographically', () => {
    expect(shortestTravelPath([...edges], 'A', 'C')?.nodeIds).toEqual(['A', 'B', 'C']);
  });

  it('keeps the same tie result for deterministic edge shuffles', () => {
    const shuffles = [
      [edges[4]!, edges[2]!, edges[0]!, edges[3]!, edges[1]!],
      [edges[1]!, edges[3]!, edges[0]!, edges[4]!, edges[2]!],
      [edges[2]!, edges[0]!, edges[4]!, edges[1]!, edges[3]!],
      [edges[3]!, edges[1]!, edges[2]!, edges[4]!, edges[0]!],
      [edges[0]!, edges[4]!, edges[3]!, edges[2]!, edges[1]!],
    ];

    for (const shuffledEdges of shuffles) {
      expect(shortestTravelPath([...shuffledEdges], 'A', 'C')).toEqual({
        travelUnits: 5,
        nodeIds: ['A', 'B', 'C'],
      });
    }
  });
});
