# Civic Facility Siting Room Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

> **Execution boundary:** This document is an implementation plan. Every shell command, test command, Git command, package installation, and file change below is a future action for the implementation session; none is to be executed while authoring this plan.

**Goal:** Build a deterministic, privacy-preserving Korean static learning SPA in which upper-elementary learners compare public-facility sites across accessibility, safety, cost, and underserved-area evidence, revise a proposal, and complete a balanced siting opinion without being graded against one supposedly optimal location.

**Architecture:** Use immutable fictional-city and mission fixtures as the source of truth, pure TypeScript graph/analysis/assessment functions as the deterministic model, and a React reducer as current-tab-only session state. Present the same model through an accessible grid and a fully operable table, then layer a six-stage learner flow over it: intake, data review, placement, impact analysis, resident perspective and alternative comparison, and opinion writing. Keep domain data, calculations, learning evidence, UI features, motion, update history, and verification isolated so every source file remains below 500 lines.

**Tech Stack:** Vite, React, TypeScript in strict mode, focused plain CSS files, Vitest, React Testing Library, `@testing-library/user-event`, `@testing-library/jest-dom`, axe-core, Playwright, ESLint, Node.js 22 LTS, and npm with a committed lockfile. No runtime network library, map SDK, server, login, analytics, external AI, drag-and-drop package, or persistent browser storage is permitted.

**Spec:** `/Volumes/ External Drive 256G/Dev2/codex/civic-facility-siting-room/2026-08-26-civic-facility-siting-room-design.md`

## Global Constraints

- The learner audience is upper-elementary grades 5–6, extending the urban population, transport, industry, and city-life inquiry identified in `[4사10-02]`.
- Before learner-facing copy is frozen, compare the standard and textbook terminology against the Ministry of Education 2022 revised Social Studies curriculum source and record the review in `docs/content-and-safety-review.md`.
- One recommended lesson lasts 35–45 minutes; the default path must be completable within that period.
- Use only two fictional grid cities, four missions, relative population tokens, relative travel units, and one-to-three-level budget tokens.
- Never request, infer, store, or transmit a real address, GPS position, school, home location, real locality, real vulnerable-population data, learner name, login, or account identifier.
- Do not use a real map API, geocoder, server, external AI, online voting, traffic model, land ownership, land price, planning law, disaster prediction, or emergency-response prediction.
- State beside every analysis and final opinion that the numbers are educational relative units and that the model does not replace actual urban planning or predict emergency-service performance.
- Calculate shortest travel units on the fictional road graph deterministically; the same city, mission, placements, and rules must always return the same result.
- Show population-weighted average travel units, the longest reachable travel value, unreachable zones, risk constraints, and cost constraints separately. Never treat the average alone as sufficient evidence.
- Recognize at least two materially different valid proposals for each single-facility mission and at least two valid pairs for the combined mission.
- Use the verdict labels `타당안—절충 확인` and `수정 필요`; do not reveal or imply a single best location.
- Require evidence that the learner reviewed at least two data layers, inspected both average and worst-served outcomes, identified who is more inconvenienced, and compared an alternative before completing the opinion.
- Explain disadvantage as a result of access conditions and siting choices, never as an individual resident’s fault.
- Keep learner choices and writing in React memory for the current tab only. Do not use `localStorage`, `sessionStorage`, IndexedDB, cookies, service workers, or network submission.
- Place facilities with `후보지 선택 → 시설 배치` controls; do not require or expose dragging.
- Encode map meaning with a combination of text, icon, and pattern; color alone must never carry population, road, risk, cost, facility, or selection meaning.
- Provide a table alternative that can complete the entire core activity without viewing the grid map.
- Apply `gi-pulse` only to the one currently required action among `자료층 확인`, `영향 계산`, and `의견서 작성`.
- Under `prefers-reduced-motion: reduce`, remove pulse and range-spread animation while retaining a static high-contrast outline, visible instruction text, and the result table.
- At 375 CSS pixels, separate map and result/table content into tabs and keep the selected coordinate visible as text.
- Verify keyboard-only use, VoiceOver or an equivalent screen reader, 200% zoom, 375-pixel mobile layout, reduced motion, and table-only completion.
- Put a small `업데이트 내역` button at the lower right and record the 2026-08-26 design entry plus the actual KST implementation date and every later improvement date.
- Keep every `.ts`, `.tsx`, `.js`, `.mjs`, `.css`, `.html`, and test source file below 500 physical lines; split a file before it reaches the limit.
- During future implementation orchestrated or reviewed by `gpt-5.6-sol` or `gpt-5.6-terra`, dispatch coding work to `gpt-5.6-luna`; use `5.3 Codex Spark` only if `gpt-5.6-luna` cannot be called.
- If the same implementation or verification approach fails three times, stop that approach, preserve the failure evidence, and ask the user whether to pause, retry with a named alternative, or reduce scope.
- The MVP ends at a tested local static build. Repository creation, commits, pushes, deployment, and catalog registration require their own explicit authorization at execution time.

---

## Product Decisions and Requirement Traceability

| Design requirement | Concrete implementation decision | Primary tasks |
|---|---|---|
| Learning objective—understand | Intake and approved copy explain that public-facility siting involves several criteria and stakeholders | 2, 7 |
| Learning objective—apply | The weighted road engine and visible zone rows let learners compare travel units and budgets on the grid | 3, 4, 8, 10 |
| Learning objective—analyze | Average, maximum, unreachable, and worst-zone evidence reveal exclusion hidden by an average | 4, 5, 10, 11 |
| Learning objective—evaluate | Public mission conditions and opinion frames support evidence-based accessibility, safety, and cost trade-offs across plural valid proposals | 5, 11, 12 |
| Distinction from route-finding apps | Learners compare effects on several zones; they never choose one route as the answer | 2, 4, 11 |
| Distinction from place-record maps | No place search or place record exists; the core artifact is a siting comparison and opinion | 2, 12 |
| Distinction from allocation-principle apps | Facility coordinates change service access on the shared fictional road graph | 3, 4, 9 |
| Learning flow—read city data | Layer controls, legend, grid, and table expose the fictional city before placement | 7, 8 |
| Learning flow—choose priorities | Intake records one of accessibility equity, safety, or cost and shows its trade-off rule | 7 |
| Learning flow—place a facility | Explicit candidate selection and placement controls create one or two facility slots | 9 |
| Learning flow—inspect impacts | Deterministic analysis displays travel, benefit, risk, and budget results | 10 |
| Learning flow—find underserved zones | The resident table requires naming who is more inconvenienced | 11 |
| Learning flow—revise and compare | Proposal A must be changed, recalculated, and compared with proposal B | 11 |
| Learning flow—write the opinion | Structured evidence, counterargument, and remedy form the final opinion | 12 |
| Two fictional cities and four missions | Validated fixture registries expose exactly two `CityScenario` values and four `MissionDefinition` values | 2 |
| Population, road, risk, cost, and existing-facility layers | Shared layer registry feeds the legend, grid, table, evidence tracker, and calculations | 2, 7, 8 |
| Multiple valid answers | Fixture acceptance tests name two passing alternatives per mission and reject single-winner ranking | 5 |
| Balanced feedback | Feedback asks for missing views and trade-offs, never exposes a best site | 5, 10, 12 |
| Map and table equivalence | Both views consume `CityScenario` and dispatch the same candidate-selection action | 8, 9, 15 |
| Sequential pulse and reduced motion | One pure guided-action selector controls `gi-pulse`; CSS media query and hook provide the static alternative | 13 |
| Current-tab-only privacy | Reducer state has no persistence adapter; E2E reload and request-capture tests prove reset/no transmission | 6, 15 |
| Model limitations and social safety | Centralized approved copy renders in intake, analysis, resident view, and opinion summary | 2, 10–12 |
| Update history | Typed entries include design date and the actual implementation date captured in KST | 14 |
| Completion criteria | Unit, component, accessibility, table-only, mobile, zoom, reduced-motion, and learner-flow gates | 15 |

## Expected File Structure and Responsibilities

All paths below are relative to `/Volumes/ External Drive 256G/Dev2/codex/civic-facility-siting-room`. The line-budget checker treats 500 lines as a failure, so the target shown here leaves review headroom.

| Path | Responsibility | Target maximum |
|---|---|---:|
| `package.json`, `package-lock.json` | Reproducible scripts and dependency lock | 160 / generated |
| `vite.config.ts` | Relative static asset base and Vitest configuration | 100 |
| `playwright.config.ts` | Local web server and browser projects | 120 |
| `eslint.config.js` | TypeScript/React lint policy | 140 |
| `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json` | Strict compiler boundaries | 100 each |
| `scripts/check-source-lines.mjs` | Fail when a source or test file reaches 500 lines | 120 |
| `docs/content-and-safety-review.md` | Curriculum term, differentiation, model-boundary, privacy, and social-language review evidence | 220 |
| `docs/verification-report.md` | Actual automated and manual acceptance evidence from the implementation session | 240 |
| `src/main.tsx` | React entry point | 40 |
| `src/app/App.tsx` | Compose provider, layout, and stage router | 140 |
| `src/app/App.test.tsx` | Shell and stage smoke tests | 180 |
| `src/app/app.css` | Shell layout only | 220 |
| `src/domain/types.ts` | Shared branded IDs, city, mission, placement, analysis, and opinion contracts | 300 |
| `src/domain/coordinates.ts` | Grid label conversion and bounds helpers | 140 |
| `src/domain/gridRoadBuilder.ts` | Convert explicit blocked/weighted links into undirected road edges | 180 |
| `src/domain/cities/mulbitCity.ts` | Fictional water-risk city fixture | 260 |
| `src/domain/cities/maruCity.ts` | Fictional slope/road-bottleneck city fixture | 260 |
| `src/domain/cities/index.ts` | Two-city registry | 80 |
| `src/domain/cities/validateCity.ts` | Runtime/test invariant checks for fictional data | 180 |
| `src/domain/missions/libraryMission.ts` | Library goal and public conditions | 140 |
| `src/domain/missions/healthSupportMission.ts` | Everyday health-support goal, explicitly non-emergency | 150 |
| `src/domain/missions/cultureCenterMission.ts` | Existing-service overlap and gap goal | 150 |
| `src/domain/missions/combinedMission.ts` | Two-facility, shared-budget, staged-installation goal | 170 |
| `src/domain/missions/index.ts` | Four-mission registry | 90 |
| `src/domain/fixtures.test.ts` | Counts, invariants, wording, and no-real-place tests | 300 |
| `src/content/learnerCopy.ts` | Approved Korean titles, instructions, notices, and feedback prompts | 220 |
| `src/content/learnerCopy.test.ts` | Boundary, privacy, and non-stigmatizing copy tests | 180 |
| `src/engine/shortestPath.ts` | Deterministic positive-weight shortest path | 180 |
| `src/engine/shortestPath.test.ts` | Weighted, disconnected, and tie tests | 180 |
| `src/engine/analyzePlacement.ts` | Per-facility and nearest-facility access, risk, cost, overlap, and gap metrics | 320 |
| `src/engine/analyzePlacement.test.ts` | Formula and constraint tests | 300 |
| `src/engine/assessProposal.ts` | Required-condition, priority-consistency, evidence, and plural-valid verdicts | 260 |
| `src/engine/assessProposal.test.ts` | Valid alternatives and average-only rejection tests | 320 |
| `src/engine/explainCalculation.ts` | Korean calculation-basis rows derived from typed metrics | 160 |
| `src/engine/explainCalculation.test.ts` | Formula disclosure tests | 160 |
| `src/state/sessionTypes.ts` | Stage, evidence, opinion draft, and action contracts | 240 |
| `src/state/sessionReducer.ts` | Current-tab-only state transitions and invalidation | 320 |
| `src/state/sessionReducer.test.ts` | Stage gates, reset, evidence, and revision tests | 340 |
| `src/state/SessionProvider.tsx` | Context wrapper and typed dispatch hooks | 140 |
| `src/navigation/ProgressStepper.tsx` | Labeled six-stage progress | 140 |
| `src/navigation/GuidedActionButton.tsx` | Shared current-action button semantics | 120 |
| `src/navigation/guidedAction.ts` | Pure selector for the one guided action | 140 |
| `src/navigation/guidedAction.test.ts` | Sequential-action tests | 160 |
| `src/features/intake/ReviewIntake.tsx` | Mission purpose, budget, conditions, priority selection | 240 |
| `src/features/intake/ReviewIntake.test.tsx` | Intake semantics and priority tests | 220 |
| `src/features/city-data/CityDataRoom.tsx` | Layer controls and view-mode tabs | 260 |
| `src/features/city-data/LayerLegend.tsx` | Text/icon/pattern legend | 150 |
| `src/features/city-data/GridMap.tsx` | Keyboard grid, active coordinate, and map-layer rendering | 320 |
| `src/features/city-data/CityDataTable.tsx` | Fully equivalent table view and candidate controls | 300 |
| `src/features/city-data/CityDataRoom.test.tsx` | Layer gating and shared-selection tests | 300 |
| `src/features/placement/CandidateBoard.tsx` | Candidate details and selection | 240 |
| `src/features/placement/FacilityPlacementPanel.tsx` | Click/keyboard placement slots and budget remainder | 260 |
| `src/features/placement/placement.test.tsx` | No-drag, single, dual, and invalidation tests | 300 |
| `src/features/analysis/ImpactAnalysis.tsx` | Analysis trigger, metrics, constraints, and model notice | 300 |
| `src/features/analysis/AccessMetrics.tsx` | Average, maximum, unreachable, and worst-zone cards | 220 |
| `src/features/analysis/CalculationBasis.tsx` | Formula, denominators, paths, and virtual-unit explanation | 220 |
| `src/features/analysis/ImpactAnalysis.test.tsx` | Visible evidence and live-announcement tests | 300 |
| `src/features/perspective/ResidentPerspective.tsx` | Zone benefit/inconvenience table and underserved-zone choice | 280 |
| `src/features/perspective/AlternativeComparison.tsx` | Save and compare two proposal snapshots | 300 |
| `src/features/perspective/perspective.test.tsx` | Who-is-inconvenienced and alternative tests | 300 |
| `src/features/opinion/SitingOpinionForm.tsx` | Structured criteria, evidence, counterargument, and remedy writing | 320 |
| `src/features/opinion/OpinionSummary.tsx` | Printable on-screen opinion with limits and verdict | 240 |
| `src/features/opinion/validateOpinion.ts` | Transparent structural completion rules, no AI scoring | 180 |
| `src/features/opinion/opinion.test.tsx` | Sentence-frame, completion, privacy, and wording tests | 320 |
| `src/features/range/FacilityRange.tsx` | Animated-or-static service-range outline | 180 |
| `src/accessibility/useReducedMotion.ts` | Reactive media-query hook | 100 |
| `src/accessibility/motion.test.tsx` | Reduced-motion and static-fallback tests | 220 |
| `src/updates/updateHistory.ts` | Typed design, development, and improvement records | 140 |
| `src/updates/UpdateHistoryButton.tsx` | Fixed trigger and accessible dialog | 220 |
| `src/updates/updateHistory.test.tsx` | Date, order, dialog, and content tests | 220 |
| `src/styles/tokens.css` | Light classroom palette, focus, spacing, type, pattern variables | 180 |
| `src/styles/global.css` | Reset, typography, semantic base styles | 180 |
| `src/styles/motion.css` | `gi-pulse` and range spread with reduced-motion override | 160 |
| `src/styles/responsive.css` | 375-pixel tabs, 200%-zoom-safe reflow, touch targets | 220 |
| `tests/setup.ts` | jest-dom and deterministic browser mocks | 100 |
| `tests/fixtures/tinyCity.ts` | Small exact graphs for engine tests | 180 |
| `tests/accessibility/app.a11y.test.tsx` | axe scans for all six stages | 260 |
| `tests/e2e/learner-flow.spec.ts` | Complete single and combined mission paths | 320 |
| `tests/e2e/table-only.spec.ts` | Complete core flow without grid map | 260 |
| `tests/e2e/mobile-and-motion.spec.ts` | 375-pixel, selected-coordinate, and reduced-motion checks | 260 |
| `tests/e2e/privacy-and-network.spec.ts` | Reload reset and localhost-only request proof | 220 |

## Stable Domain and UI Contracts

These names are authoritative across all tasks.

```ts
export type CityId = 'mulbit' | 'maru';
export type MissionId =
  | 'bookmaru-library'
  | 'health-help-center'
  | 'living-culture-center'
  | 'combined-review';
export type FacilityKind = 'library' | 'health-support' | 'culture-center';
export type DataLayerId = 'population' | 'roads' | 'risk' | 'cost' | 'existing-facilities';
export type PriorityId = 'access-equity' | 'safety' | 'cost';
export type RiskKind = 'water-ponding' | 'steep-slope';
export type StageId =
  | 'intake'
  | 'data-room'
  | 'placement'
  | 'analysis'
  | 'resident-view'
  | 'opinion';
export type GuidedActionId = 'review-layers' | 'calculate-impact' | 'write-opinion' | null;
export type Verdict = 'valid-with-tradeoffs' | 'revise';

export interface GridCoordinate {
  row: number;
  column: number;
  label: string;
}

export interface PopulationZone {
  id: string;
  name: string;
  nodeId: string;
  peopleTokens: number;
  mobilityBarrier: boolean;
  existingCoverage: FacilityKind[];
}

export interface RoadEdge {
  from: string;
  to: string;
  travelUnits: number;
}

export interface CandidateSite {
  id: string;
  name: string;
  nodeId: string;
  coordinate: GridCoordinate;
  costTokens: 1 | 2 | 3;
}

export interface RiskMarker {
  nodeId: string;
  coordinate: GridCoordinate;
  kind: RiskKind;
  label: string;
}

export interface ExistingFacility {
  id: string;
  name: string;
  facilityKind: FacilityKind;
  nodeId: string;
  coordinate: GridCoordinate;
}

export interface CityScenario {
  id: CityId;
  name: string;
  rows: number;
  columns: number;
  nodes: GridCoordinate[];
  roads: RoadEdge[];
  zones: PopulationZone[];
  candidates: CandidateSite[];
  riskMarkers: RiskMarker[];
  existingFacilities: ExistingFacility[];
  virtualDataNotice: string;
}

export interface MissionCondition {
  code:
    | 'WITHIN_BUDGET'
    | 'NO_UNREACHABLE_ZONE'
    | 'WORST_TRAVEL_WITHIN_LIMIT'
    | 'MOBILITY_BARRIER_TRAVEL_WITHIN_LIMIT'
    | 'NO_RISK_SITE'
    | 'COST_WITHIN_PRIORITY_CAP'
    | 'COVERAGE_GAP_WITHIN_LIMIT'
    | 'DISTINCT_CANDIDATE_SITES'
    | 'REQUIRED_FACILITY_MIX';
  label: string;
  required: boolean;
  numericLimit: number | null;
}

export interface MissionDefinition {
  id: MissionId;
  cityId: CityId;
  title: string;
  facilityKinds: FacilityKind[];
  budgetTokens: number;
  requiredLayers: DataLayerId[];
  conditions: MissionCondition[];
  priorityRules: Record<PriorityId, Array<MissionCondition['code']>>;
  serviceThreshold: number;
  learningPrompt: string;
}

export interface FacilityPlacement {
  slotId: string;
  facilityKind: FacilityKind;
  candidateId: string;
}

export interface ZoneTravelResult {
  zoneId: string;
  travelUnits: number | null;
  pathNodeIds: string[];
}

export interface AccessMetrics {
  populationWeightedAverage: number | null;
  reachablePeopleTokens: number;
  totalPeopleTokens: number;
  longestReachableTravel: number | null;
  worstServedZoneIds: string[];
  unreachableZoneIds: string[];
  zoneTravel: ZoneTravelResult[];
}

export interface PlacementAnalysis {
  cityId: CityId;
  missionId: MissionId;
  placements: FacilityPlacement[];
  perFacility: Record<string, AccessMetrics>;
  nearestFacilityAccess: AccessMetrics;
  mobilityBarrierAccess: AccessMetrics;
  totalCostTokens: number;
  riskyCandidateIds: string[];
  overlapZoneIds: string[];
  coverageGapZoneIds: string[];
}

export interface LearningEvidence {
  reviewedLayerIds: DataLayerId[];
  inspectedMetricIds: Array<'average' | 'maximum' | 'unreachable' | 'risk' | 'cost'>;
  selectedUnderservedZoneIds: string[];
  comparedProposalIds: string[];
}

export interface ConditionResult {
  code: MissionCondition['code'];
  passed: boolean;
  evidenceText: string;
}

export interface ProposalAssessment {
  verdict: Verdict;
  conditionResults: ConditionResult[];
  priorityConsistent: boolean;
  missingEvidence: string[];
  feedbackPrompts: string[];
}

export interface ProposalSnapshot {
  id: string;
  label: string;
  placements: FacilityPlacement[];
  analysis: PlacementAnalysis;
  assessment: ProposalAssessment;
}

export interface OpinionDraft {
  priorityId: PriorityId | null;
  selectedProposalId: string | null;
  evidenceMetricIds: Array<'average' | 'maximum' | 'unreachable' | 'risk' | 'cost'>;
  underservedZoneId: string | null;
  rationale: string;
  counterargument: string;
  mitigation: string;
}

export interface ProposalComparison {
  firstProposalId: string;
  secondProposalId: string;
  averageDelta: number | null;
  maximumDelta: number | null;
  newlyReachedZoneIds: string[];
  newlyUnreachableZoneIds: string[];
  riskCountDelta: number;
  costTokenDelta: number;
  overlapCountDelta: number;
  moreInconveniencedZoneIds: string[];
}

export interface SessionState {
  cityId: CityId | null;
  missionId: MissionId | null;
  stage: StageId;
  priorityId: PriorityId | null;
  activeLayerIds: DataLayerId[];
  selectedCandidateId: string | null;
  placements: FacilityPlacement[];
  analysis: PlacementAnalysis | null;
  evidence: LearningEvidence;
  proposals: ProposalSnapshot[];
  opinion: OpinionDraft;
}
```

### Calculation contract

- Roads are undirected and have positive integer `travelUnits`.
- `shortestTravelUnits(graph, start, end)` returns the minimum total and path; ties choose the lexicographically smaller complete node-id sequence so results never depend on insertion order.
- For each facility slot and each population zone, calculate shortest travel from the zone node to the placed candidate node.
- For multiple facilities, `nearestFacilityAccess` uses the minimum reachable travel to any placed facility while `perFacility` preserves each facility’s distinct role.
- `populationWeightedAverage` equals `roundToOneDecimal(sum(travelUnits × peopleTokens) / reachablePeopleTokens)`. Unreachable population tokens are never silently included or assigned a guessed value; the numerator, reachable denominator, total denominator, and unreachable rows are all displayed.
- `longestReachableTravel` is the largest finite zone travel. `worstServedZoneIds` lists every unreachable zone first; if none are unreachable, it lists all zones tied at the longest reachable value.
- `totalCostTokens` is the sum of unique placed-site costs. Reusing one candidate for two facility slots is invalid.
- `riskyCandidateIds` lists placed sites with a risk marker. No numeric probability or real-world risk prediction is produced.
- `overlapZoneIds` contains zones already covered by the same facility kind and within the new facility’s mission threshold. `coverageGapZoneIds` contains zones covered by neither an existing matching facility nor the new matching facility.

### Mission contract

| Mission ID | Assigned city | Facility slots | Budget | Required conditions | Named plural-valid fixture cases |
|---|---|---|---:|---|---|
| `bookmaru-library` | `mulbit` | one library | 3 | budget; no unreachable zone; longest travel ≤ 7 | `mulbit-b2` and `mulbit-c3` |
| `health-help-center` | `maru` | one health-support facility | 3 | budget; no unreachable zone; longest mobility-barrier-zone travel ≤ 6; no risky site | `maru-c2` and `maru-d3` |
| `living-culture-center` | `mulbit` | one culture center | 3 | budget; no unreachable zone; uncovered zones ≤ 1 | `mulbit-c4` and `mulbit-d3` |
| `combined-review` | `maru` | one library plus one health-support facility | 4 | budget; distinct sites; required mix; no unreachable zone | (`maru-b2`, `maru-d3`) and (`maru-c2`, `maru-e3`) |

Mission selection assigns its `cityId`; the learner does not create unsupported city/mission pairings. The fixtures must also include at least one over-budget choice, one risky choice, one disconnected candidate, and one existing-facility overlap so every separate constraint can be observed. Thresholds are public learner-facing mission rules, not hidden scoring weights.

Every mission also publishes these priority-consistency rules through `priorityRules`:

| Mission | `access-equity` | `safety` | `cost` |
|---|---|---|---|
| `bookmaru-library` | no unreachable zone and longest travel ≤ 7 | no risk marker at the site | total cost ≤ 2 |
| `health-help-center` | no unreachable zone and longest mobility-barrier-zone travel ≤ 6 | no risk marker at the site | total cost ≤ 2 |
| `living-culture-center` | no unreachable zone and uncovered zones ≤ 1 | no risk marker at the site | total cost ≤ 2 |
| `combined-review` | no unreachable zone and longest nearest-facility travel ≤ 7 | no risk marker at either site | total cost ≤ 3 |

`NO_RISK_SITE`, `COST_WITHIN_PRIORITY_CAP`, and an access limit may be non-required `MissionCondition` values when they serve only a selected priority. Their exact learner-facing labels and numeric caps remain visible; priority consistency never uses a hidden score.

---

### Task 1: Establish the Strict Static SPA and Test Harness

**Files:**
- Create: `package.json`
- Create: `package-lock.json`
- Create: `index.html`
- Create: `vite.config.ts`
- Create: `playwright.config.ts`
- Create: `eslint.config.js`
- Create: `tsconfig.json`
- Create: `tsconfig.app.json`
- Create: `tsconfig.node.json`
- Create: `.gitignore`
- Create: `scripts/check-source-lines.mjs`
- Create: `src/main.tsx`
- Create: `src/app/App.tsx`
- Create: `src/app/App.test.tsx`
- Create: `tests/setup.ts`

**Interfaces:**
- Consumes: No application interface. Execution starts from the design-only directory documented in the Spec.
- Produces: `App(): JSX.Element`; npm scripts `dev`, `build`, `preview`, `lint`, `test:unit`, `test:a11y`, `test:e2e`, `check:lines`, and `check`.

- [ ] **Step 1: Initialize only after execution authorization**

Run:

```bash
git init -b main
npm init -y
npm install react react-dom
npm install -D typescript vite @vitejs/plugin-react eslint @eslint/js typescript-eslint eslint-plugin-react-hooks eslint-plugin-react-refresh vitest jsdom @testing-library/react @testing-library/user-event @testing-library/jest-dom axe-core @playwright/test
```

Expected: a `main` Git branch exists, npm exits 0, and `package-lock.json` pins every dependency. No dev server is started.

- [ ] **Step 2: Define exact scripts and strict configuration**

Set `package.json` scripts to:

```json
{
  "dev": "vite",
  "build": "tsc -b && vite build",
  "preview": "vite preview",
  "lint": "eslint .",
  "test:unit": "vitest run",
  "test:a11y": "vitest run tests/accessibility",
  "test:e2e": "playwright test",
  "check:lines": "node scripts/check-source-lines.mjs",
  "check": "npm run lint && npm run test:unit && npm run check:lines && npm run build"
}
```

Configure TypeScript with `strict: true`, `noUncheckedIndexedAccess: true`, and `exactOptionalPropertyTypes: true`. Configure Vite with `base: './'`, jsdom tests, `tests/setup.ts`, and CSS enabled. Configure Playwright’s future `webServer` as `npm run dev -- --host 127.0.0.1` and `baseURL` as `http://127.0.0.1:5173`.

- [ ] **Step 3: Write the failing shell test**

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { App } from './App';

describe('App', () => {
  it('names the learning room and identifies the fictional model', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: '도시 기능 입지 심의실' })).toBeInTheDocument();
    expect(screen.getByText(/가상 격자 도시/)).toBeInTheDocument();
  });
});
```

- [ ] **Step 4: Run the test and verify the intended failure**

Run: `npm run test:unit -- src/app/App.test.tsx`

Expected: FAIL because `src/app/App.tsx` does not yet export `App`.

- [ ] **Step 5: Add the minimum shell**

```tsx
export function App() {
  return (
    <main>
      <h1>도시 기능 입지 심의실</h1>
      <p>실제 지도가 아닌 가상 격자 도시에서 공공시설 후보지를 비교합니다.</p>
    </main>
  );
}
```

Wire `src/main.tsx` to `createRoot` and render `<App />`. The line checker must walk the project root; skip `.git`, `node_modules`, `dist`, `coverage`, `playwright-report`, and `test-results`; and exit nonzero when any `.ts`, `.tsx`, `.js`, `.mjs`, `.css`, or `.html` file has 500 or more lines.

- [ ] **Step 6: Run foundation gates**

Run:

```bash
npm run test:unit -- src/app/App.test.tsx
npm run check:lines
npm run build
```

Expected: the shell test passes, the line checker reports zero files at or above 500 lines, and Vite creates `dist/index.html` with relative asset references.

- [ ] **Step 7: Commit the independently testable foundation**

```bash
git add package.json package-lock.json index.html vite.config.ts playwright.config.ts eslint.config.js tsconfig.json tsconfig.app.json tsconfig.node.json .gitignore scripts/check-source-lines.mjs src/main.tsx src/app/App.tsx src/app/App.test.tsx tests/setup.ts
git commit -m "chore: establish civic siting app foundation"
```

Expected: one commit containing only the static SPA and test harness.

### Task 2: Lock Curriculum, Safety Copy, Fictional Data, and Four Missions

**Files:**
- Create: `docs/content-and-safety-review.md`
- Create: `src/content/learnerCopy.ts`
- Create: `src/content/learnerCopy.test.ts`
- Create: `src/domain/types.ts`
- Create: `src/domain/coordinates.ts`
- Create: `src/domain/gridRoadBuilder.ts`
- Create: `src/domain/cities/mulbitCity.ts`
- Create: `src/domain/cities/maruCity.ts`
- Create: `src/domain/cities/index.ts`
- Create: `src/domain/cities/validateCity.ts`
- Create: `src/domain/missions/libraryMission.ts`
- Create: `src/domain/missions/healthSupportMission.ts`
- Create: `src/domain/missions/cultureCenterMission.ts`
- Create: `src/domain/missions/combinedMission.ts`
- Create: `src/domain/missions/index.ts`
- Create: `src/domain/fixtures.test.ts`

**Interfaces:**
- Consumes: No runtime interface from Task 1.
- Produces: every contract in “Stable Domain and UI Contracts”; `CITIES: Record<CityId, CityScenario>`; `MISSIONS: Record<MissionId, MissionDefinition>`; `validateCity(city: CityScenario): string[]`; `MODEL_LIMIT_NOTICE`, `PRIVACY_NOTICE`, `SOCIAL_SAFETY_NOTICE`, and `FEEDBACK_PROMPTS`.

- [ ] **Step 1: Record the content gate before fixture coding**

Write `docs/content-and-safety-review.md` with these completed review sections:

1. Source checked: Ministry of Education 2022 revised Social Studies curriculum, including the exact wording associated with `[4사10-02]` and the date accessed.
2. Grade positioning: the standard is treated as prior urban-life inquiry and the app is explicitly a grades 5–6 extension using distance, time, and data comparison.
3. Approved terms: `가상 도시`, `구역`, `사람 토큰`, `이동 단위`, `예산 토큰`, `위험 표지`, `도달 불가`, `소외 구역`, `절충`, and `보완안`.
4. Differentiation: multi-zone siting effects rather than one route, spatial access rather than place records, and location-caused access differences rather than allocation principles alone.
5. Social-language check: no sentence blames residents; health-help content says everyday consultation and never emergency response.
6. Privacy/model check: no real-place input, no actual-policy claim, no precision or prediction claim.

Acceptance: the reviewer records the exact source title, URL, access date, decision, and reviewer name; any mismatch in the standard code or wording blocks learner-copy approval until the design owner resolves it.

- [ ] **Step 2: Write failing copy and fixture tests**

```ts
import { describe, expect, it } from 'vitest';
import { CITIES } from './cities';
import { MISSIONS } from './missions';
import { MODEL_LIMIT_NOTICE, PRIVACY_NOTICE, SOCIAL_SAFETY_NOTICE } from '../content/learnerCopy';

describe('fictional learning content', () => {
  it('exposes exactly two fictional cities and four missions', () => {
    expect(Object.keys(CITIES).sort()).toEqual(['maru', 'mulbit']);
    expect(Object.keys(MISSIONS).sort()).toEqual([
      'bookmaru-library',
      'combined-review',
      'health-help-center',
      'living-culture-center',
    ]);
  });

  it('states model, privacy, and social boundaries', () => {
    expect(MODEL_LIMIT_NOTICE).toContain('교육용 상대 단위');
    expect(MODEL_LIMIT_NOTICE).toContain('실제 도시계획');
    expect(MODEL_LIMIT_NOTICE).toContain('응급 서비스 성능을 예측하지 않습니다');
    expect(PRIVACY_NOTICE).toContain('이름, 학교, 집 주소, 실제 지역은 입력하지 마세요');
    expect(SOCIAL_SAFETY_NOTICE).toContain('개인의 잘못이 아닙니다');
  });
});
```

Add invariant cases asserting unique city/zone/candidate/risk-marker/existing-facility IDs, valid endpoints and coordinates, positive integer road weights, one-to-three cost tokens, six population zones per city, at least five candidates and one existing facility per city, all five layer IDs, each mission’s assigned `cityId`, no real address fields, the exact mission contracts above, and explicit `everyday health consultation`/non-emergency wording.

- [ ] **Step 3: Run and verify the intended failure**

Run: `npm run test:unit -- src/content/learnerCopy.test.ts src/domain/fixtures.test.ts`

Expected: FAIL because the copy, domain contracts, two city registries, and four mission registries do not exist.

- [ ] **Step 4: Implement centralized approved copy**

Use these exact boundary strings:

```ts
export const MODEL_LIMIT_NOTICE =
  '이 결과는 가상 격자 도시의 교육용 상대 단위로 계산했습니다. 실제 교통량·토지 소유·법률·재난을 반영하지 않으며 실제 도시계획을 대신하거나 응급 서비스 성능을 예측하지 않습니다.';

export const PRIVACY_NOTICE =
  '이름, 학교, 집 주소, 실제 지역은 입력하지 마세요. 작성 내용은 현재 탭에만 남고 새로고침하면 사라집니다.';

export const SOCIAL_SAFETY_NOTICE =
  '시설의 이익과 불편은 구역마다 다르게 나타날 수 있습니다. 시설을 이용하기 어려운 상황은 주민 개인의 잘못이 아닙니다.';

export const FEEDBACK_PROMPTS = {
  averageMissing: '평균과 함께 가장 멀거나 도달하기 어려운 구역도 확인해 보세요.',
  underservedMissing: '이 위치에서 누가 더 불편한지 구역별 표에서 찾아보세요.',
  alternativeMissing: '장점이 다른 두 번째 후보를 비교하고 첫 선택의 약점을 보완해 보세요.',
  tradeoffMissing: '접근성·안전·비용 중 지킨 기준과 감수한 손해를 함께 설명해 보세요.',
} as const;
```

- [ ] **Step 5: Implement typed cities and missions**

Create `mulbit` and `maru` as explicitly fictional 5×5 grids. Each has six named zones, at least five candidates, population tokens, undirected roads with explicit blocked/weighted links, node-based water-ponding or steep-slope `RiskMarker` values, candidate costs, at least one located `ExistingFacility`, and zone-level existing coverage. Candidate risk is derived by matching its `nodeId` to `city.riskMarkers` rather than duplicated on the candidate. Include the named valid candidates in the mission contract plus:

- `mulbit-e5-island` as the disconnected candidate,
- `mulbit-a4-water` as a water-risk candidate,
- `maru-a5-slope` as a steep-slope candidate,
- `maru-e1-premium` as a cost-3 candidate that makes the combined pair exceed budget,
- one `mulbit` zone already covered by a culture center.

`validateCity` must return an empty array only when IDs are unique, coordinates are in bounds, every zone/candidate node exists, road endpoints exist, weights are positive integers, tokens are positive integers, candidate costs are 1–3, and the city notice equals `MODEL_LIMIT_NOTICE`.

- [ ] **Step 6: Run fixture and copy tests**

Run: `npm run test:unit -- src/content/learnerCopy.test.ts src/domain/fixtures.test.ts`

Expected: PASS for exactly two cities, four missions, all invariants, approved wording, and every named observable constraint.

- [ ] **Step 7: Commit content and deterministic fixtures**

```bash
git add docs/content-and-safety-review.md src/content src/domain
git commit -m "feat: define fictional cities missions and safety copy"
```

Expected: one reviewable commit with no UI, calculation engine, real-place data, or network integration.

### Task 3: Implement Deterministic Weighted Shortest Paths

**Files:**
- Create: `tests/fixtures/tinyCity.ts`
- Create: `src/engine/shortestPath.ts`
- Create: `src/engine/shortestPath.test.ts`

**Interfaces:**
- Consumes: `RoadEdge` from `src/domain/types.ts`.
- Produces: `PathResult { travelUnits: number; nodeIds: string[] }` and `shortestTravelPath(edges: RoadEdge[], startNodeId: string, endNodeId: string): PathResult | null`.

- [ ] **Step 1: Write exact failing graph tests**

```ts
import { describe, expect, it } from 'vitest';
import { shortestTravelPath } from './shortestPath';

const edges = [
  { from: 'A', to: 'B', travelUnits: 2 },
  { from: 'B', to: 'C', travelUnits: 3 },
  { from: 'A', to: 'C', travelUnits: 9 },
  { from: 'A', to: 'E', travelUnits: 2 },
  { from: 'E', to: 'C', travelUnits: 3 },
] as const;

describe('shortestTravelPath', () => {
  it('uses weights instead of direct geometric distance', () => {
    expect(shortestTravelPath([...edges], 'A', 'C')).toEqual({
      travelUnits: 5,
      nodeIds: ['A', 'B', 'C'],
    });
  });

  it('returns null for a disconnected node', () => {
    expect(shortestTravelPath([...edges], 'A', 'D')).toBeNull();
  });

  it('breaks equal-cost ties lexicographically', () => {
    expect(shortestTravelPath([...edges], 'A', 'C')?.nodeIds).toEqual(['A', 'B', 'C']);
  });
});
```

- [ ] **Step 2: Run and verify the intended failure**

Run: `npm run test:unit -- src/engine/shortestPath.test.ts`

Expected: FAIL with a missing `shortestTravelPath` module or export.

- [ ] **Step 3: Implement the minimum deterministic algorithm**

Use Dijkstra’s algorithm with an adjacency list, reject non-positive/non-integer weights with `RangeError`, treat each edge as bidirectional, return `{ travelUnits: 0, nodeIds: [start] }` when start equals end, and return `null` when the destination is unreachable. Sort neighbors and compare complete path-key strings on equal cost so edge insertion order cannot change the chosen path.

```ts
export interface PathResult {
  travelUnits: number;
  nodeIds: string[];
}

export function shortestTravelPath(
  edges: RoadEdge[],
  startNodeId: string,
  endNodeId: string,
): PathResult | null;
```

- [ ] **Step 4: Add validation and shuffled-edge regression cases**

Add tests for zero/negative/fractional weights, start-equals-end, and five deterministic shuffles of the same edges. Every shuffle must return the same path.

- [ ] **Step 5: Run the path suite**

Run: `npm run test:unit -- src/engine/shortestPath.test.ts`

Expected: PASS for weighted route, disconnected node, input validation, start-equals-end, and deterministic tie cases.

- [ ] **Step 6: Commit the engine primitive**

```bash
git add tests/fixtures/tinyCity.ts src/engine/shortestPath.ts src/engine/shortestPath.test.ts
git commit -m "feat: add deterministic road travel engine"
```

Expected: one commit containing a pure engine with no React or browser dependency.

### Task 4: Calculate Access, Risk, Cost, Overlap, and Gaps

**Files:**
- Create: `src/engine/analyzePlacement.ts`
- Create: `src/engine/analyzePlacement.test.ts`
- Create: `src/engine/explainCalculation.ts`
- Create: `src/engine/explainCalculation.test.ts`
- Modify: `tests/fixtures/tinyCity.ts`

**Interfaces:**
- Consumes: `CityScenario`, `MissionDefinition`, `FacilityPlacement`, `PlacementAnalysis`, and `shortestTravelPath(edges, startNodeId, endNodeId)`.
- Produces: `analyzePlacement(city: CityScenario, mission: MissionDefinition, placements: FacilityPlacement[]): PlacementAnalysis`; `CalculationRow { label: string; value: string; explanation: string }`; `explainCalculation(analysis: PlacementAnalysis, city: CityScenario): CalculationRow[]`.

- [ ] **Step 1: Write a failing weighted-average test**

Build a tiny city with zone `z1` at node A containing one token, zone `z2` at node C containing three tokens, and a candidate at B. Paths A→B and C→B cost 2 and 3.

```ts
const result = analyzePlacement(tinyCity, tinyMission, [
  { slotId: 'library-1', facilityKind: 'library', candidateId: 'candidate-b' },
]);

expect(result.nearestFacilityAccess.populationWeightedAverage).toBe(2.8);
expect(result.nearestFacilityAccess.reachablePeopleTokens).toBe(4);
expect(result.nearestFacilityAccess.totalPeopleTokens).toBe(4);
expect(result.nearestFacilityAccess.longestReachableTravel).toBe(3);
expect(result.nearestFacilityAccess.worstServedZoneIds).toEqual(['z2']);
```

Add failing cases for an unreachable fifth token, total cost, risky candidate IDs, distinct-site enforcement, per-facility values, nearest-facility values, existing-service overlap, and coverage gaps.

- [ ] **Step 2: Run and verify the intended failure**

Run: `npm run test:unit -- src/engine/analyzePlacement.test.ts src/engine/explainCalculation.test.ts`

Expected: FAIL because analysis and explanation functions do not exist.

- [ ] **Step 3: Implement metric calculation without hidden penalties**

For each zone, store the exact path and finite travel or `null`. Compute the one-decimal weighted mean only from reachable people tokens, retain both reachable and total denominators, and list unreachable zone IDs. For a tie, sort zone IDs. Derive `mobilityBarrierAccess` with the same formula over only zones whose `mobilityBarrier` is true, so the health mission’s public mobility-barrier limit can be evaluated without reading UI state. Throw `RangeError` for an unknown candidate, wrong facility mix, duplicate site, or total placement count different from the mission’s facility slots.

`explainCalculation` must produce rows for:

1. `평균 이동 단위` with numerator and `reachablePeopleTokens / totalPeopleTokens`;
2. `가장 긴 이동 단위` with tied zone names;
3. `도달 불가` with zone names and tokens;
4. `이동이 어려운 구역` with the separate mobility-barrier denominator when such zones exist;
5. `위험 표지` with site names and qualitative risk kind;
6. `예산` with each cost and total/budget;
7. `기존 시설 중복·공백` when the mission uses that condition.

- [ ] **Step 4: Run analysis tests**

Run: `npm run test:unit -- src/engine/analyzePlacement.test.ts src/engine/explainCalculation.test.ts`

Expected: PASS with `2.8` for the named average, `null` travel for disconnected zones, exact full-population and mobility-barrier denominators, separate constraints, and Korean explanation rows containing `가상 단위`.

- [ ] **Step 5: Commit the complete calculation layer**

```bash
git add tests/fixtures/tinyCity.ts src/engine/analyzePlacement.ts src/engine/analyzePlacement.test.ts src/engine/explainCalculation.ts src/engine/explainCalculation.test.ts
git commit -m "feat: calculate siting access risks and costs"
```

Expected: one pure-function commit that exposes every displayed number’s basis.

### Task 5: Assess Public Conditions, Priority Consistency, and Plural Validity

**Files:**
- Create: `src/engine/assessProposal.ts`
- Create: `src/engine/assessProposal.test.ts`
- Modify: `src/domain/cities/mulbitCity.ts`
- Modify: `src/domain/cities/maruCity.ts`
- Modify: `src/domain/missions/libraryMission.ts`
- Modify: `src/domain/missions/healthSupportMission.ts`
- Modify: `src/domain/missions/cultureCenterMission.ts`
- Modify: `src/domain/missions/combinedMission.ts`

**Interfaces:**
- Consumes: `MissionDefinition`, `PriorityId`, `PlacementAnalysis`, `LearningEvidence`, `ProposalAssessment`, and `FEEDBACK_PROMPTS`.
- Produces: `assessProposal(mission: MissionDefinition, priorityId: PriorityId, analysis: PlacementAnalysis, evidence: LearningEvidence): ProposalAssessment`.

- [ ] **Step 1: Write failing assessment tests**

```ts
const completeEvidence: LearningEvidence = {
  reviewedLayerIds: ['population', 'roads', 'risk', 'cost'],
  inspectedMetricIds: ['average', 'maximum', 'unreachable', 'risk', 'cost'],
  selectedUnderservedZoneIds: ['mulbit-south'],
  comparedProposalIds: ['proposal-b'],
};

const assessment = assessProposal(
  MISSIONS['bookmaru-library'],
  'access-equity',
  analysisForMulbitB2,
  completeEvidence,
);

expect(assessment.verdict).toBe('valid-with-tradeoffs');
expect(assessment.priorityConsistent).toBe(true);
expect(assessment.missingEvidence).toEqual([]);
```

Add exact cases proving:

- `mulbit-b2` and `mulbit-c3` both pass the library mission with different trade-offs;
- `maru-c2` and `maru-d3` both pass the health mission;
- `mulbit-c4` and `mulbit-d3` both pass the culture mission;
- both named combined pairs pass within four tokens;
- reviewing average without maximum or underserved zone returns `revise`;
- no alternative comparison returns `revise`;
- a risky, disconnected, or over-budget proposal identifies that specific failed condition;
- the return type has no score, rank, winner, or optimum field.

- [ ] **Step 2: Run and verify the intended failure**

Run: `npm run test:unit -- src/engine/assessProposal.test.ts`

Expected: FAIL because `assessProposal` is absent and plural-valid fixture expectations are not calibrated.

- [ ] **Step 3: Implement transparent rule evaluation**

Evaluate every `MissionCondition` independently, evaluate the selected `PriorityId` only from the public `priorityRules` codes, and build missing evidence with these exact gates:

```ts
const evidenceGates = {
  minimumLayers: 2,
  requiredMetrics: ['average', 'maximum'] as const,
  minimumUnderservedZones: 1,
  minimumComparedProposals: 1,
};
```

Return `valid-with-tradeoffs` only if every required condition passes, the selected priority is consistent, and every evidence gate passes. Always include at least one feedback prompt naming a trade-off even when valid. Return `revise` with the specific missed view rather than a location answer.

- [ ] **Step 4: Calibrate fixtures to the named acceptance cases**

Change only fictional road weights, candidate costs, node-based risk markers, and public numeric limits needed to make all named valid and invalid cases true. Record each final threshold in the mission’s learner-facing condition label so no hidden weight exists.

- [ ] **Step 5: Run domain and assessment suites**

Run: `npm run test:unit -- src/domain/fixtures.test.ts src/engine/shortestPath.test.ts src/engine/analyzePlacement.test.ts src/engine/assessProposal.test.ts`

Expected: PASS; every mission has at least two named valid proposals, average-only evidence fails, and no result ranks candidates.

- [ ] **Step 6: Commit rule assessment**

```bash
git add src/domain/cities src/domain/missions src/engine/assessProposal.ts src/engine/assessProposal.test.ts
git commit -m "feat: assess plural siting proposals by public rules"
```

Expected: one commit with deterministic acceptance rules and no opaque composite score.

### Task 6: Build Current-Tab Session State and Six-Stage Gates

**Files:**
- Create: `src/state/sessionTypes.ts`
- Create: `src/state/sessionReducer.ts`
- Create: `src/state/sessionReducer.test.ts`
- Create: `src/state/SessionProvider.tsx`
- Create: `src/navigation/ProgressStepper.tsx`
- Modify: `src/app/App.tsx`
- Modify: `src/app/App.test.tsx`

**Interfaces:**
- Consumes: `CityId`, `MissionId`, `StageId`, `PriorityId`, `FacilityPlacement`, `PlacementAnalysis`, `LearningEvidence`, `ProposalSnapshot`, and `OpinionDraft`.
- Produces: `SessionState`; `SessionAction`; `createInitialSession(): SessionState`; `sessionReducer(state: SessionState, action: SessionAction): SessionState`; `useSession(): { state: SessionState; dispatch: Dispatch<SessionAction> }`.

- [ ] **Step 1: Write failing reducer tests**

Define actions exactly as:

```ts
export type SessionAction =
  | { type: 'select-mission'; missionId: MissionId }
  | { type: 'select-priority'; priorityId: PriorityId }
  | { type: 'toggle-layer'; layerId: DataLayerId }
  | { type: 'select-candidate'; candidateId: string }
  | { type: 'place-facility'; placement: FacilityPlacement }
  | { type: 'store-analysis'; analysis: PlacementAnalysis }
  | { type: 'inspect-metric'; metricId: LearningEvidence['inspectedMetricIds'][number] }
  | { type: 'select-underserved-zone'; zoneId: string }
  | { type: 'save-proposal'; proposal: ProposalSnapshot }
  | { type: 'set-opinion'; opinion: OpinionDraft }
  | { type: 'go-to-stage'; stage: StageId }
  | { type: 'restart-mission' };
```

Tests must show that initial state is `intake`, selecting a mission also assigns its declared `cityId`, stage skipping is rejected, changing a placement clears stale analysis and comparison, changing the mission resets dependent state, and `restart-mission` returns a new initial state while retaining no learner writing.

- [ ] **Step 2: Run and verify the intended failure**

Run: `npm run test:unit -- src/state/sessionReducer.test.ts src/app/App.test.tsx`

Expected: FAIL because the reducer/provider and six-stage composition are missing.

- [ ] **Step 3: Implement state with no persistence seam**

`SessionState` must contain only serializable domain values and current-tab learner input. Do not create a storage repository, hydration function, network client, or effect that writes state. `go-to-stage` may advance only when:

- intake has city, mission, and priority;
- data room has at least two reviewed layers;
- placement has the exact required facility slots within budget;
- analysis has a fresh `PlacementAnalysis`;
- resident view has an underserved-zone selection and an alternative snapshot;
- opinion passes `validateOpinion` once that function is introduced.

Until the opinion validator exists, keep the final transition disabled behind a typed `opinionReady: false` selector.

- [ ] **Step 4: Compose the stage shell**

`ProgressStepper` exposes an ordered list with current-step text, not clickable stage skipping. `App` renders one stage region at a time under `SessionProvider` and keeps the product heading and fictional-model notice visible.

- [ ] **Step 5: Run state and shell tests**

Run: `npm run test:unit -- src/state/sessionReducer.test.ts src/app/App.test.tsx`

Expected: PASS for reset, invalidation, ordered navigation, one visible stage, and no persistence module.

- [ ] **Step 6: Commit the learner-flow state**

```bash
git add src/state src/navigation/ProgressStepper.tsx src/app/App.tsx src/app/App.test.tsx
git commit -m "feat: add gated current-tab learner session"
```

Expected: one commit implementing the learning sequence without storing learner data.

### Task 7: Implement Intake and Data-Layer Review

**Files:**
- Create: `src/features/intake/ReviewIntake.tsx`
- Create: `src/features/intake/ReviewIntake.test.tsx`
- Create: `src/features/city-data/CityDataRoom.tsx`
- Create: `src/features/city-data/LayerLegend.tsx`
- Create: `src/features/city-data/CityDataRoom.test.tsx`
- Modify: `src/app/App.tsx`

**Interfaces:**
- Consumes: `CITIES`, `MISSIONS`, `DataLayerId`, `PriorityId`, `MODEL_LIMIT_NOTICE`, `SessionState`, and dispatch actions `select-mission`, `select-priority`, `toggle-layer`, and `go-to-stage`.
- Produces: `ReviewIntake(): JSX.Element`; `CityDataRoom(): JSX.Element`; `LayerLegend({ activeLayerIds }: { activeLayerIds: DataLayerId[] }): JSX.Element`.

- [ ] **Step 1: Write failing learner interaction tests**

```tsx
it('shows purpose budget conditions and three priority choices', async () => {
  renderSessionAt('intake');
  expect(screen.getByRole('heading', { name: '심의 접수' })).toBeInTheDocument();
  expect(screen.getByText(/완료 조건/)).toBeInTheDocument();
  expect(screen.getAllByRole('radio', { name: /접근성|안전|비용/ })).toHaveLength(3);
  expect(screen.getByText(/35~45분/)).toBeInTheDocument();
});

it('requires two reviewed layers before data confirmation', async () => {
  const user = userEvent.setup();
  renderSessionAt('data-room');
  const confirm = screen.getByRole('button', { name: '자료층 확인' });
  expect(confirm).toBeDisabled();
  await user.click(screen.getByRole('checkbox', { name: /인구/ }));
  await user.click(screen.getByRole('checkbox', { name: /도로/ }));
  expect(confirm).toBeEnabled();
});
```

- [ ] **Step 2: Run and verify the intended failure**

Run: `npm run test:unit -- src/features/intake/ReviewIntake.test.tsx src/features/city-data/CityDataRoom.test.tsx`

Expected: FAIL because the intake and layer-room components are absent.

- [ ] **Step 3: Implement the intake**

Show each mission with its assigned fictional city, facility purpose, relative budget, every public condition, the recommended duration, completion evidence, and three radio priorities with plain-language trade-offs. Selecting a mission dispatches `select-mission` and displays its city; there is no unsupported free-form city/mission pairing. The health mission must say `일상 건강 상담 시설이며 응급 출동 시간을 예측하지 않습니다`. The combined mission must show two facility slots, one shared budget, role division, and phased-installation prompt.

- [ ] **Step 4: Implement layer review and evidence dispatch**

Expose five toggle controls labeled `인구`, `도로·이동 단위`, `가상 위험 표지`, `후보지 비용`, and `기존 시설`. Toggling a layer makes its icon, pattern label, and text description visible and dispatches `toggle-layer`; the reducer toggles `activeLayerIds` while permanently accumulating that layer in `evidence.reviewedLayerIds` for the current mission. Keep `자료층 확인` disabled until two distinct layers were reviewed, and state `5개 중 N개 확인` in a live status.

- [ ] **Step 5: Run intake and layer tests**

Run: `npm run test:unit -- src/features/intake/ReviewIntake.test.tsx src/features/city-data/CityDataRoom.test.tsx`

Expected: PASS; a learner can select a mission/priority, read public conditions, inspect two layers, and advance without real-place input.

- [ ] **Step 6: Commit intake and evidence review**

```bash
git add src/features/intake src/features/city-data/CityDataRoom.tsx src/features/city-data/LayerLegend.tsx src/features/city-data/CityDataRoom.test.tsx src/app/App.tsx
git commit -m "feat: add mission intake and data layer review"
```

Expected: one commit implementing the first two learning actions.

### Task 8: Provide Equivalent Keyboard Grid and Table Views

**Files:**
- Create: `src/features/city-data/GridMap.tsx`
- Create: `src/features/city-data/CityDataTable.tsx`
- Modify: `src/features/city-data/CityDataRoom.tsx`
- Modify: `src/features/city-data/CityDataRoom.test.tsx`
- Create: `src/styles/tokens.css`
- Create: `src/styles/global.css`
- Create: `src/styles/responsive.css`
- Modify: `src/main.tsx`

**Interfaces:**
- Consumes: `CityScenario`, `DataLayerId[]`, `CandidateSite`, and `select-candidate`.
- Produces: `GridMapProps { city: CityScenario; activeLayerIds: DataLayerId[]; selectedCandidateId: string | null; onSelectCandidate(candidateId: string): void }`; the same data/selection props for `CityDataTable`; view mode `'map' | 'table'`.

- [ ] **Step 1: Write failing equivalence and keyboard tests**

Test that:

- the map is a labeled `role="grid"` with one keyboard-active cell;
- Arrow keys update `현재 좌표: B2` text without moving focus out of the grid;
- Enter or Space selects a candidate at the active coordinate;
- the table has a caption, zone/candidate/existing-facility coordinates, people tokens, road access, risk text, cost text, existing coverage, and candidate radio controls;
- selecting `mulbit-b2` in either view produces the same `select-candidate` action;
- risk cells expose icon text and a pattern class even when CSS color is ignored.

- [ ] **Step 2: Run and verify the intended failure**

Run: `npm run test:unit -- src/features/city-data/CityDataRoom.test.tsx`

Expected: FAIL because neither equivalent city view exists.

- [ ] **Step 3: Implement the keyboard grid**

Use one tab stop on the grid, `aria-activedescendant` for the active cell, Arrow keys clamped to city bounds, Home/End for first/last column, and Enter/Space for candidate selection. Each cell’s accessible name concatenates coordinate, zone tokens, road status, risk kind, candidate name/cost, existing facility, and selected state. Render visible SVG or Unicode icons plus `data-pattern` values `dots`, `lines`, `waves`, `crosshatch`, and `ring`; never rely on fill color alone.

- [ ] **Step 4: Implement the table alternative and responsive tabs**

The table view reads from the same city object and dispatches the same callback. At widths at or below 600 pixels, expose `지도 보기` and `표 보기` tabs and render only the selected panel; above 600 pixels the learner may still switch views. Keep `현재 선택 좌표: 좌표명` directly above both panels. Use 44×44 CSS-pixel minimum interactive targets, visible `:focus-visible` rings, light classroom colors, and local table overflow without page-level horizontal scrolling.

- [ ] **Step 5: Run component and line-budget tests**

Run:

```bash
npm run test:unit -- src/features/city-data/CityDataRoom.test.tsx
npm run check:lines
```

Expected: PASS for map/table selection equivalence, keyboard navigation, text/icon/pattern encoding, and every source file below 500 lines.

- [ ] **Step 6: Commit both city representations**

```bash
git add src/features/city-data src/styles src/main.tsx
git commit -m "feat: add accessible grid and equivalent city table"
```

Expected: one commit in which either representation supports candidate selection.

### Task 9: Implement Click-and-Keyboard Facility Placement

**Files:**
- Create: `src/features/placement/CandidateBoard.tsx`
- Create: `src/features/placement/FacilityPlacementPanel.tsx`
- Create: `src/features/placement/placement.test.tsx`
- Modify: `src/app/App.tsx`

**Interfaces:**
- Consumes: `CityScenario`, `CandidateSite`, `FacilityPlacement`, `MissionDefinition`, selected candidate ID, and dispatch actions `select-candidate` and `place-facility`. `CandidateBoard` derives risk text from `city.riskMarkers` at the candidate node.
- Produces: `PlacementSlotView { slotId: string; facilityKind: FacilityKind; candidateId: string | null }` and `getRemainingBudget(mission: MissionDefinition, city: CityScenario, placements: FacilityPlacement[]): number`.

- [ ] **Step 1: Write failing placement tests**

```tsx
it('places a facility through candidate selection and a named button', async () => {
  const user = userEvent.setup();
  renderPlacement('bookmaru-library');
  await user.click(screen.getByRole('radio', { name: /물빛 B2/ }));
  await user.click(screen.getByRole('button', { name: '시설 배치' }));
  expect(screen.getByText('책마루 도서관 배치: B2')).toBeInTheDocument();
});

it('never requires dragging', () => {
  const { container } = renderPlacement('bookmaru-library');
  expect(container.querySelector('[draggable="true"]')).toBeNull();
});
```

Add tests for two labeled slots in `combined-review`, distinct candidates, visible remaining budget, over-budget prevention, full keyboard operation, and clearing a stale analysis when placement changes.

- [ ] **Step 2: Run and verify the intended failure**

Run: `npm run test:unit -- src/features/placement/placement.test.tsx`

Expected: FAIL because placement components and budget selector are absent.

- [ ] **Step 3: Implement the minimum placement controls**

`CandidateBoard` presents candidate name, coordinate, cost, risk text, and road connection summary as a radio group. `FacilityPlacementPanel` names the current facility slot and enables `시설 배치` only when a candidate is selected, the site is unused, and the resulting total is within the mission budget. The combined mission displays `도서관 1곳` and `건강 도움소 1곳` separately and shows `남은 예산 토큰 N` after every placement.

- [ ] **Step 4: Run placement and reducer tests**

Run: `npm run test:unit -- src/features/placement/placement.test.tsx src/state/sessionReducer.test.ts`

Expected: PASS for single and dual placement, budget enforcement, no drag, keyboard operation, and stale-analysis invalidation.

- [ ] **Step 5: Commit placement**

```bash
git add src/features/placement src/app/App.tsx src/state/sessionReducer.test.ts
git commit -m "feat: add explicit facility placement controls"
```

Expected: one commit delivering the `후보지 선택 → 시설 배치` interaction.

### Task 10: Render Transparent Impact Analysis

**Files:**
- Create: `src/features/analysis/ImpactAnalysis.tsx`
- Create: `src/features/analysis/AccessMetrics.tsx`
- Create: `src/features/analysis/CalculationBasis.tsx`
- Create: `src/features/analysis/ImpactAnalysis.test.tsx`
- Modify: `src/app/App.tsx`

**Interfaces:**
- Consumes: `analyzePlacement(city, mission, placements)`, `explainCalculation(analysis, city)`, `MODEL_LIMIT_NOTICE`, and dispatch actions `store-analysis` and `inspect-metric`.
- Produces: `ImpactAnalysisProps { city: CityScenario; mission: MissionDefinition; placements: FacilityPlacement[]; analysis: PlacementAnalysis | null; onAnalysis(analysis: PlacementAnalysis): void; onInspectMetric(metricId: LearningEvidence['inspectedMetricIds'][number]): void }`.

- [ ] **Step 1: Write failing evidence-display tests**

Test that `영향 계산` produces:

- side-by-side `평균 이동 단위` and `가장 긴 이동 단위` values;
- a separate `이동이 어려운 구역` metric row using `mobilityBarrierAccess` for the health mission;
- reachable/total people-token denominator and one-decimal formula;
- named worst-served and unreachable zones;
- separate risk, cost, overlap, and gap sections;
- an expandable path table showing zone, path nodes, travel units, and reachability;
- an `aria-live="polite"` summary;
- the full model-limit notice;
- no `최적 위치`, `정답 위치`, candidate rank, or score language.
- at 600 pixels or narrower, `선택 위치` and `결과표` tabs, with `현재 선택 좌표` visible above both panels.

- [ ] **Step 2: Run and verify the intended failure**

Run: `npm run test:unit -- src/features/analysis/ImpactAnalysis.test.tsx`

Expected: FAIL because the impact-analysis UI does not exist.

- [ ] **Step 3: Implement the analysis trigger and evidence cards**

Keep `영향 계산` disabled until required facility slots are valid. On activation, call the pure engine, dispatch the immutable result, and announce `영향 계산이 완료되었습니다. 평균, 가장 긴 이동, 도달 불가, 위험, 비용을 함께 확인하세요.`. Clicking or focusing each evidence card dispatches its corresponding metric evidence; the average card alone cannot unlock the next stage.

- [ ] **Step 4: Implement calculation-basis disclosure**

Render `CalculationRow[]` in a definition list and the zone paths in a captioned table. If unreachable zones exist, show the reachable-only average denominator and a high-visibility `도달 불가 구역은 평균에서 숨기지 않고 따로 표시했습니다` note. For the combined mission, render per-facility results and nearest-facility access without collapsing facility roles.

- [ ] **Step 5: Run UI and engine regression tests**

Run: `npm run test:unit -- src/engine src/features/analysis/ImpactAnalysis.test.tsx`

Expected: PASS; every number has a visible basis, average and worst-served evidence coexist, and results remain deterministic.

- [ ] **Step 6: Commit impact analysis**

```bash
git add src/features/analysis src/app/App.tsx
git commit -m "feat: explain facility impact calculations"
```

Expected: one commit delivering the impact-analysis room and transparent formulas.

### Task 11: Identify Underserved Zones and Compare an Alternative

**Files:**
- Create: `src/features/perspective/ResidentPerspective.tsx`
- Create: `src/features/perspective/AlternativeComparison.tsx`
- Create: `src/features/perspective/perspective.test.tsx`
- Modify: `src/app/App.tsx`
- Modify: `src/state/sessionReducer.ts`
- Modify: `src/state/sessionReducer.test.ts`

**Interfaces:**
- Consumes: `PopulationZone`, `PlacementAnalysis`, `ProposalAssessment`, `ProposalSnapshot`, `assessProposal`, and dispatch actions `select-underserved-zone` and `save-proposal`.
- Produces: `createProposalSnapshot(label: string, placements: FacilityPlacement[], analysis: PlacementAnalysis, assessment: ProposalAssessment): ProposalSnapshot` and `compareProposals(first: ProposalSnapshot, second: ProposalSnapshot): ProposalComparison` where `ProposalComparison` contains average delta, maximum delta, newly reached/unreached zones, risk delta, cost delta, overlap delta, and `moreInconveniencedZoneIds`.

- [ ] **Step 1: Write failing resident-perspective tests**

```tsx
it('requires a named zone and asks who is more inconvenienced', async () => {
  const user = userEvent.setup();
  renderResidentView();
  expect(screen.getByRole('heading', { name: '주민 관점표' })).toBeInTheDocument();
  expect(screen.getByText('누가 더 불편한가요?')).toBeInTheDocument();
  await user.click(screen.getByRole('radio', { name: /남쪽 구역/ }));
  expect(readEvidence().selectedUnderservedZoneIds).toEqual(['mulbit-south']);
});
```

Add tests that zone rows expose tokens, travel, reachability, existing benefit, new benefit, inconvenience, and mobility-barrier text; saving proposal A, changing placement, recalculating, and saving proposal B yields all comparison deltas; an identical proposal cannot count as an alternative.

- [ ] **Step 2: Run and verify the intended failure**

Run: `npm run test:unit -- src/features/perspective/perspective.test.tsx`

Expected: FAIL because resident and alternative comparison components are absent.

- [ ] **Step 3: Implement the resident perspective table**

Order unreachable zones first, then longest-travel zones, then by zone ID. Use neutral structural phrasing such as `도로 연결과 선택한 위치 때문에 이동이 더 어렵습니다`. Mark mobility barriers as a condition to consider, never as a resident deficit. Require an explicit radio selection before advancing.

- [ ] **Step 4: Implement two-proposal comparison and revision loop**

Save immutable, deterministically identified snapshots using `proposal-a` and `proposal-b` in session order. After proposal A is saved, route back to placement with A retained for comparison; require a changed candidate set and fresh analysis before saving B. Render both trade-off columns without declaring a winner and include the sentence prompt `A안은 ___을 지키지만 ___이 불리하고, B안은 ___을 바꿉니다.`.

- [ ] **Step 5: Run perspective, assessment, and reducer tests**

Run: `npm run test:unit -- src/features/perspective/perspective.test.tsx src/engine/assessProposal.test.ts src/state/sessionReducer.test.ts`

Expected: PASS; at least one underserved zone and one materially different alternative are recorded before opinion writing.

- [ ] **Step 6: Commit the revision loop**

```bash
git add src/features/perspective src/app/App.tsx src/state/sessionReducer.ts src/state/sessionReducer.test.ts
git commit -m "feat: compare resident impacts and alternative sites"
```

Expected: one commit implementing the analyze–identify–revise–compare learning cycle.

### Task 12: Complete a Structured Siting Opinion

**Files:**
- Create: `src/features/opinion/SitingOpinionForm.tsx`
- Create: `src/features/opinion/OpinionSummary.tsx`
- Create: `src/features/opinion/validateOpinion.ts`
- Create: `src/features/opinion/opinion.test.tsx`
- Modify: `src/app/App.tsx`
- Modify: `src/state/sessionReducer.ts`

**Interfaces:**
- Consumes: `OpinionDraft`, `ProposalSnapshot`, `ProposalAssessment`, `PriorityId`, `MODEL_LIMIT_NOTICE`, `PRIVACY_NOTICE`, `SOCIAL_SAFETY_NOTICE`, and `set-opinion`.
- Produces: `OpinionValidation { complete: boolean; errors: Record<'proposal' | 'evidence' | 'underservedZone' | 'rationale' | 'counterargument' | 'mitigation', string | null> }` and `validateOpinion(draft: OpinionDraft, proposals: ProposalSnapshot[]): OpinionValidation`.

- [ ] **Step 1: Write failing form-validation tests**

An opinion is complete only when:

- a saved proposal is selected;
- priority matches the intake priority;
- evidence includes both average and maximum plus at least one of unreachable/risk/cost;
- a selected underserved zone belongs to the analysis;
- rationale, counterargument, and mitigation are each 10–300 Unicode characters after trimming;
- a distinct alternative snapshot exists.

```tsx
it('uses evidence counterargument and mitigation without AI scoring', async () => {
  renderOpinionWithTwoProposals();
  expect(screen.getByLabelText('선택안의 근거')).toHaveAttribute('maxlength', '300');
  expect(screen.getByLabelText('예상되는 반론')).toHaveAttribute('maxlength', '300');
  expect(screen.getByLabelText('보완 방법')).toHaveAttribute('maxlength', '300');
  expect(screen.getByText(/이름, 학교, 집 주소, 실제 지역은 입력하지 마세요/)).toBeInTheDocument();
  expect(screen.queryByText(/AI 추천|자동 채점|최적 위치/)).not.toBeInTheDocument();
});
```

- [ ] **Step 2: Run and verify the intended failure**

Run: `npm run test:unit -- src/features/opinion/opinion.test.tsx`

Expected: FAIL because the opinion form and structural validator do not exist.

- [ ] **Step 3: Implement exact sentence frames and transparent validation**

Use:

- `저는 ___ 기준을 우선하여 ___안을 제안합니다.`
- `평균 이동 단위는 ___이고, 가장 불리한 ___구역은 ___입니다.`
- `이 선택은 ___에 유리하지만 ___에는 불리할 수 있습니다.`
- `이에 대한 반론은 ___입니다.`
- `이를 보완하기 위해 ___을 함께 제안합니다.`

Validation checks only structure, selection, and length. It never claims to understand or score the learner’s prose.

- [ ] **Step 4: Implement the opinion summary**

Render the selected proposal, public condition results, priority, metric evidence, underserved zone, trade-off, counterargument, remedy, verdict label, and all three boundary notices. For the combined mission, include facility role division and a phased-installation sentence. Keep the summary printable through browser print but do not download, upload, or persist learner writing.

- [ ] **Step 5: Run opinion and full learner-state tests**

Run: `npm run test:unit -- src/features/opinion/opinion.test.tsx src/state/sessionReducer.test.ts src/app/App.test.tsx`

Expected: PASS; incomplete evidence blocks completion, valid structured opinions render, privacy/model limits remain visible, and no AI or single-answer language appears.

- [ ] **Step 6: Commit the final learning artifact**

```bash
git add src/features/opinion src/app/App.tsx src/state/sessionReducer.ts
git commit -m "feat: add evidence based siting opinion"
```

Expected: one commit delivering the candidate comparison table and siting opinion artifact.

### Task 13: Add Sequential gi-pulse and Reduced-Motion Alternatives

**Files:**
- Create: `src/navigation/guidedAction.ts`
- Create: `src/navigation/guidedAction.test.ts`
- Create: `src/navigation/GuidedActionButton.tsx`
- Create: `src/accessibility/useReducedMotion.ts`
- Create: `src/accessibility/motion.test.tsx`
- Create: `src/features/range/FacilityRange.tsx`
- Create: `src/styles/motion.css`
- Modify: `src/features/city-data/CityDataRoom.tsx`
- Modify: `src/features/analysis/ImpactAnalysis.tsx`
- Modify: `src/features/opinion/SitingOpinionForm.tsx`
- Modify: `src/main.tsx`

**Interfaces:**
- Consumes: `SessionState` and `GuidedActionId`.
- Produces: `getGuidedAction(state: SessionState): GuidedActionId`; `GuidedActionButtonProps { actionId: Exclude<GuidedActionId, null>; currentAction: GuidedActionId; disabled: boolean; onClick(): void; children: ReactNode }`; `useReducedMotion(): boolean`; `FacilityRangeProps { coordinate: GridCoordinate; radiusUnits: number; reducedMotion: boolean }`.

- [ ] **Step 1: Write failing guidance tests**

```ts
expect(getGuidedAction(dataRoomStateWithZeroLayers)).toBe('review-layers');
expect(getGuidedAction(placementReadyState)).toBe('calculate-impact');
expect(getGuidedAction(opinionReadyState)).toBe('write-opinion');
expect(getGuidedAction(completedState)).toBeNull();
```

Component tests must assert that at every state no more than one element has `gi-pulse`, disabled actions never pulse, and reduced-motion mode removes animation while keeping `data-guided="true"` and a visible `다음 필수 활동` badge.

- [ ] **Step 2: Run and verify the intended failure**

Run: `npm run test:unit -- src/navigation/guidedAction.test.ts src/accessibility/motion.test.tsx`

Expected: FAIL because guided-action and reduced-motion implementations are absent.

- [ ] **Step 3: Implement the one-action selector**

`getGuidedAction` returns:

1. `review-layers` only in `data-room` while fewer than two distinct layers are reviewed;
2. `calculate-impact` only in `placement` or `analysis` when placement is valid and no fresh analysis exists;
3. `write-opinion` only in `resident-view` or `opinion` after both metrics, an underserved zone, and an alternative are recorded;
4. `null` in every other state.

`GuidedActionButton` adds `gi-pulse` only when its ID equals the selector result and it is enabled.

- [ ] **Step 4: Implement motion and static fallback**

Define a soft two-second aura using `box-shadow` and outline opacity, not scaling that shifts layout. `FacilityRange` always renders a labeled static boundary; in normal motion it may add a one-time range-spread opacity effect. Under the media query below, animations and transitions become none and a 3-pixel solid outline remains:

```css
@media (prefers-reduced-motion: reduce) {
  .gi-pulse,
  .facility-range {
    animation: none;
    transition: none;
  }

  [data-guided='true'],
  .facility-range {
    outline: 3px solid var(--focus-strong);
    outline-offset: 3px;
  }
}
```

- [ ] **Step 5: Run motion and affected component tests**

Run: `npm run test:unit -- src/navigation/guidedAction.test.ts src/accessibility/motion.test.tsx src/features/city-data/CityDataRoom.test.tsx src/features/analysis/ImpactAnalysis.test.tsx src/features/opinion/opinion.test.tsx`

Expected: PASS; only the current required action pulses, and reduced-motion learners receive equivalent static guidance and result information.

- [ ] **Step 6: Commit guided motion**

```bash
git add src/navigation src/accessibility src/features/range src/styles/motion.css src/features/city-data/CityDataRoom.tsx src/features/analysis/ImpactAnalysis.tsx src/features/opinion/SitingOpinionForm.tsx src/main.tsx
git commit -m "feat: guide required actions with reduced motion support"
```

Expected: one commit limited to guidance and motion-equivalence behavior.

### Task 14: Add the Dated Update History

**Files:**
- Create: `src/updates/updateHistory.ts`
- Create: `src/updates/UpdateHistoryButton.tsx`
- Create: `src/updates/updateHistory.test.tsx`
- Modify: `src/app/App.tsx`
- Modify: `src/app/app.css`

**Interfaces:**
- Consumes: no learner state.
- Produces: `UpdateEntry { date: string; category: '설계' | '개발' | '개선'; summaries: string[] }`; `UPDATE_HISTORY: readonly UpdateEntry[]`; `UpdateHistoryButton(): JSX.Element`.

- [ ] **Step 1: Capture the real implementation date during the future execution**

Run: `TZ=Asia/Seoul date +%F`

Expected: one ISO date in `YYYY-MM-DD` form. Use that exact output for the development entry; do not reuse the design date unless implementation truly occurs on 2026-08-26.

- [ ] **Step 2: Write failing history tests**

Test that:

- one design entry has date `2026-08-26`, category `설계`, and summary `최초 설계 문서 작성`;
- one development entry uses the captured KST date and contains the three exact summaries `가상 도시 2종과 미션 4종 구현`, `접근성 표 보기와 결정적 판정 모델 추가`, and `사회적 표현 및 개인정보 안전 검수 완료`;
- dates match `^\d{4}-\d{2}-\d{2}$` and are newest-first;
- the lower-right button opens a dialog named `업데이트 내역`, focus moves into it, Escape closes it, and focus returns to the trigger.

- [ ] **Step 3: Run and verify the intended failure**

Run: `npm run test:unit -- src/updates/updateHistory.test.tsx`

Expected: FAIL because the update history and dialog do not exist.

- [ ] **Step 4: Implement typed history and accessible dialog**

Use a native `<dialog>` when supported and a tested modal fallback in jsdom. Place a small but 44×44-pixel trigger at the lower right without covering stage buttons or mobile content. Show date, category, and bullet summaries. Every later feature improvement must prepend a KST-dated `개선` entry in the same commit as the improvement.

- [ ] **Step 5: Run history, layout, and line tests**

Run:

```bash
npm run test:unit -- src/updates/updateHistory.test.tsx src/app/App.test.tsx
npm run check:lines
```

Expected: PASS for exact dates/content, dialog keyboard behavior, lower-right trigger, and source line limits.

- [ ] **Step 6: Commit the dated history**

```bash
git add src/updates src/app/App.tsx src/app/app.css
git commit -m "feat: add dated update history"
```

Expected: one commit with the design date and actual implementation date recorded.

### Task 15: Verify Mobile, Keyboard, Screen Reader, Privacy, and Full MVP Completion

**Files:**
- Create: `tests/accessibility/app.a11y.test.tsx`
- Create: `tests/e2e/learner-flow.spec.ts`
- Create: `tests/e2e/table-only.spec.ts`
- Create: `tests/e2e/mobile-and-motion.spec.ts`
- Create: `tests/e2e/privacy-and-network.spec.ts`
- Create: `docs/verification-report.md`
- Modify: `playwright.config.ts`
- Modify: `src/styles/responsive.css`
- Modify: `src/app/app.css`

**Interfaces:**
- Consumes: accessible names and stable domain/session contracts from all prior tasks.
- Produces: no runtime application interface; produces executable acceptance evidence and a completed `docs/verification-report.md`.

- [ ] **Step 1: Write failing automated accessibility checks**

Use axe-core on each of the six rendered stages and assert zero violations with impact `serious` or `critical`. Add semantic assertions for one `main` landmark, ordered headings, labeled grids/tables/forms/dialog, unique IDs, live result announcements, visible focus, and no color-only legend.

```tsx
const results = await axe.run(container);
const blocking = results.violations.filter(
  (violation) => violation.impact === 'serious' || violation.impact === 'critical',
);
expect(blocking).toEqual([]);
```

- [ ] **Step 2: Write failing Playwright acceptance paths**

`learner-flow.spec.ts` must complete:

1. the library mission from intake through a valid opinion;
2. the combined mission with two facilities, shared budget, resident comparison, phased installation, and a second valid pair.

`table-only.spec.ts` must hide or never activate the grid, select candidates only in the table, complete analysis, identify a zone, compare an alternative, and submit the opinion.

`mobile-and-motion.spec.ts` must use a 375×812 viewport, assert no document-level horizontal overflow, switch map/table/result tabs, keep the selected coordinate text visible, emulate reduced motion, and assert no running pulse/range animation.

`privacy-and-network.spec.ts` must enter distinctive learner text, reload, assert that the text and selections reset, and fail if any request host is not `127.0.0.1` or if any request path resembles analytics, maps, geocoding, AI, login, or submission.

- [ ] **Step 3: Run and verify the intended failures**

Run:

```bash
npm run test:a11y
npx playwright install chromium
npm run test:e2e
```

Expected: the new acceptance tests initially fail on remaining semantic, reflow, focus, or flow gaps; Chromium installation is a future setup action and exits 0.

- [ ] **Step 4: Make the minimum accessibility and responsive corrections**

Correct only failures identified by the tests. Preserve these exact acceptance behaviors:

- all functionality is operable with Tab, Shift+Tab, Arrow keys, Enter, Space, and Escape;
- focus order follows visible stage order and never enters hidden mobile tabs;
- analysis changes are announced once without stealing focus;
- 200% browser zoom reflows into one column with no clipped action, selected coordinate, form label, or dialog control;
- tables scroll within their labeled region when necessary;
- every 44×44 target and focus ring remains visible at 375 pixels;
- the table-only path exposes all population, road, risk, cost, existing-facility, candidate, analysis, resident, and opinion information.

- [ ] **Step 5: Perform the manual screen-reader and zoom script**

Run the local app in the future implementation session:

```bash
npm run dev -- --host 127.0.0.1
```

Expected: Vite reports the local URL and no network dependency is required.

With macOS VoiceOver:

1. Start VoiceOver with Command+F5.
2. Navigate headings and landmarks from `도시 기능 입지 심의실` through `심의 접수`.
3. Choose a mission and priority using only keyboard commands.
4. Read layer checkboxes, legend text, map grid labels, and the full table alternative.
5. Select and place a candidate, run analysis, and confirm average, maximum, unreachable, risk, and cost announcements.
6. Select an underserved zone, compare proposal A and B, complete all opinion fields, and open/close update history.
7. Confirm no unlabeled control, focus trap, repeated live message, color-only meaning, or claim of a single best site occurs.

Repeat the full table-only path at browser zoom 200% and repeat the required-action path with macOS Reduce Motion enabled. Record browser version, screen-reader version, viewport, observed output, and `PASS` for each numbered step in `docs/verification-report.md`.

- [ ] **Step 6: Run the complete automated release gate**

Run:

```bash
npm run lint
npm run test:unit
npm run test:a11y
npm run test:e2e
npm run check:lines
npm run build
```

Expected:

- ESLint exits 0;
- all unit/component/axe tests pass;
- both complete learner flows, table-only flow, 375×812 flow, reduced-motion flow, reload reset, and localhost-only request test pass in Chromium;
- no source/test file has 500 or more lines;
- TypeScript strict compilation succeeds;
- `dist/index.html` and hashed local assets are produced;
- the browser console contains no uncaught error or React warning.

- [ ] **Step 7: Check every design completion criterion in the report**

`docs/verification-report.md` must state `PASS` with an evidence link or named test for:

1. every result number has a visible calculation basis and virtual-unit explanation;
2. average never determines validity without worst-served/unreachable review;
3. each mission has at least two differently advantaged valid proposals;
4. table-only completion succeeds;
5. 375-pixel mobile, keyboard-only, 200% zoom, reduced motion, and VoiceOver succeed;
6. both cities, all four missions, four primary MVP data layers, existing-facility context, and the combined-budget flow are present;
7. current-tab reload clears learner input and no request leaves localhost;
8. prohibited real-map, emergency-prediction, law/land-price, online-vote, and AI-recommendation features are absent;
9. the actual KST development date appears in update history;
10. the content and safety review is complete.

- [ ] **Step 8: Commit final verification**

```bash
git add tests/accessibility tests/e2e docs/verification-report.md playwright.config.ts src/styles/responsive.css src/app/app.css
git commit -m "test: verify accessible civic siting learner flow"
```

Expected: one final test/documentation commit; no push or deployment occurs without a new explicit instruction.

---

## Future Command Sequence and Expected Outcomes

These commands are ordered for the later execution session and must be run task-by-task, not during plan authoring.

| Stage | Command | Expected outcome |
|---|---|---|
| Foundation | `git init -b main` | Local `main` repository only after authorization |
| Dependencies | npm install commands in Task 1 | Lockfile created; no runtime network dependency in the shipped app |
| Red phase | Each targeted `npm run test:unit -- <paths>` | Fails for the named missing behavior before implementation |
| Green phase | The same targeted test command | Passes after the minimum implementation |
| Per-task quality | `npm run check:lines` | Zero source/test files at or above 500 lines |
| Accessibility | `npm run test:a11y` | Zero serious/critical axe violations across all stages |
| Browser flows | `npm run test:e2e` | Single, combined, table-only, mobile, reduced-motion, privacy, and network tests pass |
| Build | `npm run build` | Strict TypeScript build and local static `dist` output succeed |
| Final gate | `npm run check` followed by `npm run test:a11y` and `npm run test:e2e` | All automated gates exit 0 |
| Git history | One `git commit` at the end of every task | Fifteen focused commits with the exact messages listed below |
| Remote release | No command in this plan | Push, deployment, and catalog registration remain outside MVP authorization |

## Future Commit Sequence

1. `chore: establish civic siting app foundation`
2. `feat: define fictional cities missions and safety copy`
3. `feat: add deterministic road travel engine`
4. `feat: calculate siting access risks and costs`
5. `feat: assess plural siting proposals by public rules`
6. `feat: add gated current-tab learner session`
7. `feat: add mission intake and data layer review`
8. `feat: add accessible grid and equivalent city table`
9. `feat: add explicit facility placement controls`
10. `feat: explain facility impact calculations`
11. `feat: compare resident impacts and alternative sites`
12. `feat: add evidence based siting opinion`
13. `feat: guide required actions with reduced motion support`
14. `feat: add dated update history`
15. `test: verify accessible civic siting learner flow`

## Authoring Self-Review Record

### Design coverage

- Sections 1–4: audience, subjects, question, outputs, four learning objectives, and all three differentiation points map to Global Constraints and Tasks 2, 3, 4, 5, 7, 11, and 12.
- Sections 5–10: the complete seven-node learning flow, five data layers, four missions, six screens, deterministic model, plural validity, evidence rubric, missed-view feedback, counterargument, and remedy map to Tasks 2–12.
- Sections 11–13: pattern/icon/text encoding, table equivalence, three guided actions, reduced motion, keyboard coordinates, mobile tabs, static architecture, current-tab state, privacy, non-stigmatizing language, and model limits map to Tasks 2, 6–8, and 13–15.
- Sections 14–17: every included and excluded MVP item, all five completion criteria, dated update history, and the no-implementation boundary map to Global Constraints and Tasks 14–15.

### Naming and type consistency

- `CityId`, `MissionId`, `FacilityKind`, `DataLayerId`, `PriorityId`, `StageId`, `GuidedActionId`, and `Verdict` have one authoritative spelling.
- `FacilityPlacement` feeds `analyzePlacement`; `PlacementAnalysis` feeds `assessProposal`; `ProposalAssessment` and analysis feed `ProposalSnapshot`; snapshots and `OpinionDraft` feed `validateOpinion`.
- UI action names exactly match `SessionAction`, and guided action IDs map one-to-one to `자료층 확인`, `영향 계산`, and `의견서 작성`.
- Average uses `populationWeightedAverage` everywhere; worst finite value uses `longestReachableTravel`; unreachable and worst-served zone IDs remain separate.
- The app uses `valid-with-tradeoffs`/`타당안—절충 확인` and `revise`/`수정 필요` consistently, with no ranking type.

### Plan quality gates

- Spec-gap result: 0 uncovered requirements after adding explicit `RiskMarker` and `ExistingFacility` layers, `mobilityBarrierAccess`, assigned `MissionDefinition.cityId` values, public priority caps, seven learner-flow mappings, and separate mobile/result verification.
- Forbidden-placeholder scan result: 0 matches in this plan.
- Type/name audit result: 0 known mismatches after standardizing `toggle-layer`, mission condition codes, proposal comparison fields, and session-state fields.
- Every task names exact files, consumed and produced interfaces, a failing test, its expected failure, the minimum implementation, a passing test command, and a focused future commit.
- Every future command is explicitly marked as future execution; plan authoring changes only this Markdown file.
- Source decomposition and `check-source-lines.mjs` enforce the strict under-500-line rule.
- The implementation-date rule uses the actual KST execution date rather than a prefilled date.
- Mobile, keyboard, VoiceOver, 200% zoom, reduced motion, table-only completion, privacy reset, localhost-only networking, and model-boundary checks are independent acceptance gates.
