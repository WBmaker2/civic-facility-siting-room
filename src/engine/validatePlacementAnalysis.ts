import type { CityScenario, FacilityPlacement, MissionDefinition, PlacementAnalysis } from '../domain/types';
import { validatePlacements } from '../domain/placementRules';
import { analyzePlacement } from './analyzePlacement';

const isPlainRecord = (value: object): boolean => {
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
};

const isStandardDenseArray = (value: object): value is unknown[] => {
  if (Object.getPrototypeOf(value) !== Array.prototype) return false;
  const array = value as unknown[];
  const lengthDescriptor = Object.getOwnPropertyDescriptor(array, 'length');
  if (lengthDescriptor === undefined || !('value' in lengthDescriptor) || !Number.isSafeInteger(lengthDescriptor.value)) return false;
  const ownKeys = Reflect.ownKeys(array);
  if (ownKeys.length !== lengthDescriptor.value + 1) return false;
  for (let index = 0; index < lengthDescriptor.value; index += 1) {
    const descriptor = Object.getOwnPropertyDescriptor(array, String(index));
    if (descriptor === undefined || !('value' in descriptor)) return false;
  }
  return ownKeys.every((key) => key === 'length' || (typeof key === 'string' && /^\d+$/.test(key) && Number(key) < lengthDescriptor.value));
};

/** Structural comparison used at every analysis trust boundary. */
export const sameSerializableValue = (left: unknown, right: unknown): boolean => {
  const leftPath = new WeakSet<object>();
  const rightPath = new WeakSet<object>();
  const compare = (a: unknown, b: unknown): boolean => {
    if (a === null || b === null) return a === b;
    if (typeof a !== typeof b) return false;
    if (typeof a === 'undefined' || typeof a === 'function' || typeof a === 'symbol' || typeof a === 'bigint') return false;
    if (typeof a !== 'object') return Object.is(a, b);
    if (typeof b !== 'object' || b === null) return false;
    if (leftPath.has(a) || rightPath.has(b)) return false;
    leftPath.add(a); rightPath.add(b);
    try {
      if (Array.isArray(a) || Array.isArray(b)) {
        if (!Array.isArray(a) || !Array.isArray(b) || !isStandardDenseArray(a) || !isStandardDenseArray(b) || a.length !== b.length) return false;
        for (let index = 0; index < a.length; index += 1) {
          const leftDescriptor = Object.getOwnPropertyDescriptor(a, String(index));
          const rightDescriptor = Object.getOwnPropertyDescriptor(b, String(index));
          if (leftDescriptor === undefined || rightDescriptor === undefined || !('value' in leftDescriptor) || !('value' in rightDescriptor) || !compare(leftDescriptor.value, rightDescriptor.value)) return false;
        }
        return true;
      }
      if (!isPlainRecord(a) || !isPlainRecord(b)) return false;
      const ownKeysA = Reflect.ownKeys(a);
      const ownKeysB = Reflect.ownKeys(b);
      if (ownKeysA.some((key) => typeof key !== 'string') || ownKeysB.some((key) => typeof key !== 'string')) return false;
      const keysA = (ownKeysA as string[]).sort();
      const keysB = (ownKeysB as string[]).sort();
      const recordA = a as Record<string, unknown>;
      const recordB = b as Record<string, unknown>;
      return keysA.length === keysB.length && keysA.every((key, index) => {
        if (key !== keysB[index]) return false;
        const descriptorA = Object.getOwnPropertyDescriptor(recordA, key);
        const descriptorB = Object.getOwnPropertyDescriptor(recordB, key);
        return descriptorA !== undefined && descriptorB !== undefined && 'value' in descriptorA && 'value' in descriptorB && compare(descriptorA.value, descriptorB.value);
      });
    } finally {
      leftPath.delete(a); rightPath.delete(b);
    }
  };
  try { return compare(left, right); } catch { return false; }
};

export function validatePlacementAnalysis(
  city: CityScenario | unknown,
  mission: MissionDefinition | unknown,
  placements: readonly FacilityPlacement[] | unknown,
  analysis: PlacementAnalysis | unknown,
): analysis is PlacementAnalysis {
  try {
    if (!validatePlacements(mission, city, placements) || !Array.isArray(placements)) return false;
    const expected = analyzePlacement(city as CityScenario, mission as MissionDefinition, [...placements] as FacilityPlacement[]);
    return sameSerializableValue(analysis, expected);
  } catch {
    return false;
  }
}
