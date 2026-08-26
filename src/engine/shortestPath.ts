import type { RoadEdge } from '../domain/types';

export interface PathResult {
  travelUnits: number;
  nodeIds: string[];
}

interface QueueEntry {
  nodeId: string;
  travelUnits: number;
  nodeIds: string[];
}

const compareNodeIds = (left: string[], right: string[]): number => {
  const sharedLength = Math.min(left.length, right.length);
  for (let index = 0; index < sharedLength; index += 1) {
    const leftNode = left[index]!;
    const rightNode = right[index]!;
    if (leftNode < rightNode) return -1;
    if (leftNode > rightNode) return 1;
  }
  return left.length - right.length;
};

const compareQueueEntries = (left: QueueEntry, right: QueueEntry): number => {
  if (left.travelUnits !== right.travelUnits) return left.travelUnits - right.travelUnits;
  return compareNodeIds(left.nodeIds, right.nodeIds);
};

const isBetterPath = (candidate: QueueEntry, current: QueueEntry | undefined): boolean => {
  if (current === undefined) return true;
  if (candidate.travelUnits !== current.travelUnits) return candidate.travelUnits < current.travelUnits;
  return compareNodeIds(candidate.nodeIds, current.nodeIds) < 0;
};

const validateEdges = (edges: RoadEdge[]): void => {
  for (const edge of edges) {
    if (edge === null || typeof edge !== 'object') {
      throw new TypeError('Road edges must be objects.');
    }
    if (typeof edge.from !== 'string' || edge.from.length === 0 || typeof edge.to !== 'string' || edge.to.length === 0) {
      throw new TypeError('Road endpoints must be non-empty node IDs.');
    }
    if (!Number.isInteger(edge.travelUnits) || edge.travelUnits <= 0) {
      throw new RangeError('Road travelUnits must be a positive integer.');
    }
  }
};

const addNeighbor = (adjacency: Map<string, RoadEdge[]>, nodeId: string, edge: RoadEdge): void => {
  const neighbors = adjacency.get(nodeId) ?? [];
  neighbors.push(edge);
  adjacency.set(nodeId, neighbors);
};

export function shortestTravelPath(
  edges: RoadEdge[],
  startNodeId: string,
  endNodeId: string,
): PathResult | null {
  validateEdges(edges);

  if (startNodeId === endNodeId) {
    return { travelUnits: 0, nodeIds: [startNodeId] };
  }

  const adjacency = new Map<string, RoadEdge[]>();
  for (const edge of edges) {
    addNeighbor(adjacency, edge.from, edge);
    addNeighbor(adjacency, edge.to, { from: edge.to, to: edge.from, travelUnits: edge.travelUnits });
  }

  const queue: QueueEntry[] = [{ nodeId: startNodeId, travelUnits: 0, nodeIds: [startNodeId] }];
  const bestByNode = new Map<string, QueueEntry>();

  while (queue.length > 0) {
    queue.sort(compareQueueEntries);
    const current = queue.shift()!;
    if (!isBetterPath(current, bestByNode.get(current.nodeId))) continue;
    bestByNode.set(current.nodeId, current);
    if (current.nodeId === endNodeId) {
      return { travelUnits: current.travelUnits, nodeIds: current.nodeIds };
    }

    const neighbors = [...(adjacency.get(current.nodeId) ?? [])].sort((left, right) => {
      if (left.to !== right.to) return left.to < right.to ? -1 : 1;
      return left.travelUnits - right.travelUnits;
    });
    for (const edge of neighbors) {
      if (current.nodeIds.includes(edge.to)) continue;
      const candidate: QueueEntry = {
        nodeId: edge.to,
        travelUnits: current.travelUnits + edge.travelUnits,
        nodeIds: [...current.nodeIds, edge.to],
      };
      if (isBetterPath(candidate, bestByNode.get(candidate.nodeId))) queue.push(candidate);
    }
  }

  return null;
}
