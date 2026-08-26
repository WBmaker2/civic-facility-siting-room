import { isCoordinateInBounds, nodeId } from '../coordinates';
import type { CityScenario } from '../types';
import { MODEL_LIMIT_NOTICE } from '../../content/learnerCopy';

function duplicateIds(ids: string[], label: string, errors: string[]): void {
  const seen = new Set<string>();
  for (const id of ids) {
    if (seen.has(id)) errors.push(`duplicate ${label} id: ${id}`);
    seen.add(id);
  }
}

export function validateCity(city: CityScenario): string[] {
  const errors: string[] = [];
  const nodeIds = new Set(city.nodes.map((node) => nodeId(city.id, node.row, node.column)));
  if (city.rows !== 5 || city.columns !== 5) errors.push('city must use a 5 by 5 grid');
  if (city.virtualDataNotice !== MODEL_LIMIT_NOTICE) errors.push('virtual data notice must use approved copy');
  duplicateIds(city.zones.map((zone) => zone.id), 'zone', errors);
  duplicateIds(city.candidates.map((site) => site.id), 'candidate', errors);
  duplicateIds(city.riskMarkers.map((marker) => marker.nodeId), 'risk marker', errors);
  duplicateIds(city.existingFacilities.map((facility) => facility.id), 'existing facility', errors);
  for (const node of city.nodes) if (!isCoordinateInBounds(node, city.rows, city.columns)) errors.push(`node coordinate out of bounds: ${node.label}`);
  for (const zone of city.zones) {
    if (!nodeIds.has(zone.nodeId)) errors.push(`zone node missing: ${zone.nodeId}`);
    if (!Number.isInteger(zone.peopleTokens) || zone.peopleTokens <= 0) errors.push(`zone tokens invalid: ${zone.id}`);
    for (const kind of zone.existingCoverage) if (!['library', 'health-support', 'culture-center'].includes(kind)) errors.push(`zone coverage invalid: ${zone.id}`);
  }
  for (const site of city.candidates) {
    if (!nodeIds.has(site.nodeId)) errors.push(`candidate node missing: ${site.id}`);
    if (!isCoordinateInBounds(site.coordinate, city.rows, city.columns)) errors.push(`candidate coordinate out of bounds: ${site.id}`);
    if (![1, 2, 3].includes(site.costTokens)) errors.push(`candidate cost invalid: ${site.id}`);
  }
  for (const marker of city.riskMarkers) {
    if (!nodeIds.has(marker.nodeId)) errors.push(`risk marker node missing: ${marker.nodeId}`);
    if (!isCoordinateInBounds(marker.coordinate, city.rows, city.columns)) errors.push(`risk coordinate out of bounds: ${marker.nodeId}`);
  }
  for (const facility of city.existingFacilities) {
    if (!nodeIds.has(facility.nodeId)) errors.push(`existing facility node missing: ${facility.nodeId}`);
    if (!isCoordinateInBounds(facility.coordinate, city.rows, city.columns)) errors.push(`facility coordinate out of bounds: ${facility.id}`);
  }
  for (const edge of city.roads) {
    if (!nodeIds.has(edge.from) || !nodeIds.has(edge.to)) errors.push(`road endpoint missing: ${edge.from} ${edge.to}`);
    if (!Number.isInteger(edge.travelUnits) || edge.travelUnits <= 0) errors.push(`road weight invalid: ${edge.from} ${edge.to}`);
  }
  return errors;
}
