export type CityId = 'mulbit' | 'maru';
export type MissionId = 'bookmaru-library' | 'health-help-center' | 'living-culture-center' | 'combined-review';
export type FacilityKind = 'library' | 'health-support' | 'culture-center';
export type DataLayerId = 'population' | 'roads' | 'risk' | 'cost' | 'existing-facilities';
export type PriorityId = 'access-equity' | 'safety' | 'cost';
export type RiskKind = 'water-ponding' | 'steep-slope';
export type StageId = 'intake' | 'data-room' | 'placement' | 'analysis' | 'resident-view' | 'opinion';
export type GuidedActionId = 'review-layers' | 'calculate-impact' | 'write-opinion' | null;
export type Verdict = 'valid-with-tradeoffs' | 'revise';

export interface GridCoordinate { row: number; column: number; label: string }
export interface PopulationZone {
  id: string; name: string; nodeId: string; peopleTokens: number; mobilityBarrier: boolean; existingCoverage: FacilityKind[];
}
export interface RoadEdge { from: string; to: string; travelUnits: number }
export interface CandidateSite { id: string; name: string; nodeId: string; coordinate: GridCoordinate; costTokens: 1 | 2 | 3 }
export interface RiskMarker { nodeId: string; coordinate: GridCoordinate; kind: RiskKind; label: string }
export interface ExistingFacility { id: string; name: string; facilityKind: FacilityKind; nodeId: string; coordinate: GridCoordinate }
export interface CityScenario {
  id: CityId; name: string; rows: number; columns: number; nodes: GridCoordinate[]; roads: RoadEdge[];
  zones: PopulationZone[]; candidates: CandidateSite[]; riskMarkers: RiskMarker[];
  existingFacilities: ExistingFacility[]; virtualDataNotice: string;
}
export interface MissionCondition {
  code: 'WITHIN_BUDGET' | 'NO_UNREACHABLE_ZONE' | 'WORST_TRAVEL_WITHIN_LIMIT' | 'MOBILITY_BARRIER_TRAVEL_WITHIN_LIMIT' | 'NO_RISK_SITE' | 'COST_WITHIN_PRIORITY_CAP' | 'COVERAGE_GAP_WITHIN_LIMIT' | 'DISTINCT_CANDIDATE_SITES' | 'REQUIRED_FACILITY_MIX';
  label: string; required: boolean; numericLimit: number | null;
}
export interface MissionDefinition {
  id: MissionId; cityId: CityId; title: string; facilityKinds: FacilityKind[]; budgetTokens: number;
  requiredLayers: DataLayerId[]; conditions: MissionCondition[]; priorityRules: Record<PriorityId, Array<MissionCondition['code']>>;
  serviceThreshold: number; learningPrompt: string;
}
export interface FacilityPlacement { slotId: string; facilityKind: FacilityKind; candidateId: string }
export interface ZoneTravelResult { zoneId: string; travelUnits: number | null; pathNodeIds: string[] }
export interface AccessMetrics {
  populationWeightedAverage: number | null; reachablePeopleTokens: number; totalPeopleTokens: number; longestReachableTravel: number | null;
  worstServedZoneIds: string[]; unreachableZoneIds: string[]; zoneTravel: ZoneTravelResult[];
}
export interface PlacementAnalysis {
  cityId: CityId; missionId: MissionId; placements: FacilityPlacement[]; perFacility: Record<string, AccessMetrics>;
  nearestFacilityAccess: AccessMetrics; mobilityBarrierAccess: AccessMetrics; totalCostTokens: number; riskyCandidateIds: string[];
  overlapZoneIds: string[]; coverageGapZoneIds: string[];
}
export interface LearningEvidence {
  reviewedLayerIds: DataLayerId[]; inspectedMetricIds: Array<'average' | 'maximum' | 'unreachable' | 'risk' | 'cost'>;
  selectedUnderservedZoneIds: string[]; comparedProposalIds: string[];
}
export interface ConditionResult { code: MissionCondition['code']; passed: boolean; evidenceText: string }
export interface ProposalAssessment {
  verdict: Verdict; conditionResults: ConditionResult[]; priorityConsistent: boolean; missingEvidence: string[]; feedbackPrompts: string[];
}
export interface ProposalSnapshot { id: string; label: string; placements: FacilityPlacement[]; analysis: PlacementAnalysis; assessment: ProposalAssessment }
export interface OpinionDraft {
  priorityId: PriorityId | null; selectedProposalId: string | null; evidenceMetricIds: Array<'average' | 'maximum' | 'unreachable' | 'risk' | 'cost'>;
  underservedZoneId: string | null; rationale: string; counterargument: string; mitigation: string;
}
export interface ProposalComparison {
  firstProposalId: string; secondProposalId: string; averageDelta: number | null; maximumDelta: number | null;
  newlyReachedZoneIds: string[]; newlyUnreachableZoneIds: string[]; riskCountDelta: number; costTokenDelta: number;
  overlapCountDelta: number; moreInconveniencedZoneIds: string[];
}
export interface SessionState {
  cityId: CityId | null; missionId: MissionId | null; stage: StageId; priorityId: PriorityId | null; activeLayerIds: DataLayerId[];
  selectedCandidateId: string | null; placements: FacilityPlacement[]; analysis: PlacementAnalysis | null; evidence: LearningEvidence;
  proposals: ProposalSnapshot[]; opinion: OpinionDraft;
}
