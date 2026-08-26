import { coordinateLabel, isCoordinateInBounds, nodeId } from '../coordinates';
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
  if (city.rows !== 5 || city.columns !== 5) errors.push('city must use a 5 by 5 grid');
  const expectedNodeCount = Number.isInteger(city.rows) && Number.isInteger(city.columns) && city.rows > 0 && city.columns > 0
    ? city.rows * city.columns : 0;
  if (city.nodes.length !== expectedNodeCount) errors.push('node count must equal rows multiplied by columns');
  if (city.virtualDataNotice !== MODEL_LIMIT_NOTICE) errors.push('virtual data notice must use approved copy');

  const nodeIds = new Set<string>();
  const coordinateKeys = new Set<string>();
  for (const node of city.nodes) {
    const key = `${node.row},${node.column}`;
    const inBounds = isCoordinateInBounds(node, city.rows, city.columns);
    const expectedLabel = inBounds ? coordinateLabel(node.row, node.column) : null;
    if (!inBounds) errors.push(`node coordinate out of bounds: ${node.label}`);
    if (coordinateKeys.has(key)) errors.push(`duplicate grid coordinate: ${node.label}`);
    coordinateKeys.add(key);
    if (expectedLabel !== node.label) errors.push(`node label does not match coordinate: ${node.label}`);
    const derivedId = nodeId(city.id, node.row, node.column);
    if (nodeIds.has(derivedId)) errors.push(`duplicate derived node id: ${derivedId}`);
    nodeIds.add(derivedId);
  }
  if (coordinateKeys.size !== expectedNodeCount) errors.push('grid coordinates must cover every cell exactly once');

  duplicateIds(city.zones.map((zone) => zone.id), 'zone', errors);
  duplicateIds(city.candidates.map((site) => site.id), 'candidate', errors);
  duplicateIds(city.riskMarkers.map((marker) => marker.nodeId), 'risk marker', errors);
  duplicateIds(city.existingFacilities.map((facility) => facility.id), 'existing facility', errors);
  if (city.zones.length !== 6) errors.push('city must have exactly six population zones');
  if (city.candidates.length < 5) errors.push('city must have at least five candidate sites');
  if (city.riskMarkers.length < 1) errors.push('city must have at least one risk marker');
  if (city.existingFacilities.length < 1) errors.push('city must have at least one existing facility');

  for (const zone of city.zones) {
    if (!nodeIds.has(zone.nodeId)) errors.push(`zone node missing: ${zone.nodeId}`);
    if (!Number.isInteger(zone.peopleTokens) || zone.peopleTokens <= 0) errors.push(`zone tokens invalid: ${zone.id}`);
    for (const kind of zone.existingCoverage) {
      if (!['library', 'health-support', 'culture-center'].includes(kind)) errors.push(`zone coverage invalid: ${zone.id}`);
    }
  }
  for (const site of city.candidates) {
    if (!nodeIds.has(site.nodeId)) errors.push(`candidate node missing: ${site.id}`);
    if (!isCoordinateInBounds(site.coordinate, city.rows, city.columns)) errors.push(`candidate coordinate out of bounds: ${site.id}`);
    else if (site.nodeId !== nodeId(city.id, site.coordinate.row, site.coordinate.column)) errors.push(`candidate node does not match coordinate: ${site.id}`);
    if (![1, 2, 3].includes(site.costTokens)) errors.push(`candidate cost invalid: ${site.id}`);
  }
  for (const marker of city.riskMarkers) {
    if (!nodeIds.has(marker.nodeId)) errors.push(`risk marker node missing: ${marker.nodeId}`);
    if (!isCoordinateInBounds(marker.coordinate, city.rows, city.columns)) errors.push(`risk coordinate out of bounds: ${marker.nodeId}`);
    else if (marker.nodeId !== nodeId(city.id, marker.coordinate.row, marker.coordinate.column)) errors.push(`risk marker node does not match coordinate: ${marker.nodeId}`);
  }
  for (const facility of city.existingFacilities) {
    if (!nodeIds.has(facility.nodeId)) errors.push(`existing facility node missing: ${facility.id}`);
    if (!isCoordinateInBounds(facility.coordinate, city.rows, city.columns)) errors.push(`facility coordinate out of bounds: ${facility.id}`);
    else if (facility.nodeId !== nodeId(city.id, facility.coordinate.row, facility.coordinate.column)) errors.push(`facility node does not match coordinate: ${facility.id}`);
  }
  for (const edge of city.roads) {
    if (!nodeIds.has(edge.from) || !nodeIds.has(edge.to)) errors.push(`road endpoint missing: ${edge.from} ${edge.to}`);
    if (!Number.isInteger(edge.travelUnits) || edge.travelUnits <= 0) errors.push(`road weight invalid: ${edge.from} ${edge.to}`);
  }
  return errors;
}
