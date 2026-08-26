import { describe, expect, it } from 'vitest';
import { CITIES } from '../domain/cities';
import { MISSIONS } from '../domain/missions';
import { FEEDBACK_PROMPTS } from '../content/learnerCopy';
import type { LearningEvidence, PlacementAnalysis } from '../domain/types';
import { analyzePlacement } from './analyzePlacement';
import { assessProposal } from './assessProposal';

const completeEvidence: LearningEvidence = {
  reviewedLayerIds: ['population', 'roads', 'risk', 'cost'],
  inspectedMetricIds: ['average', 'maximum', 'unreachable', 'risk', 'cost'],
  selectedUnderservedZoneIds: ['mulbit-south'],
  comparedProposalIds: ['proposal-b'],
};

const evidenceFor = (cityId: 'mulbit' | 'maru'): LearningEvidence => ({
  ...completeEvidence,
  selectedUnderservedZoneIds: [`${cityId}-north`],
});

const analysisFor = (missionId: keyof typeof MISSIONS, candidateIds: readonly string[]): PlacementAnalysis => {
  const mission = MISSIONS[missionId];
  const city = CITIES[mission.cityId];
  const placements = mission.facilityKinds.map((facilityKind, index) => ({
    slotId: `${facilityKind}-${index + 1}`,
    facilityKind,
    candidateId: candidateIds[index]!,
  }));
  return analyzePlacement(city, mission, placements);
};

describe('assessProposal', () => {
  it.each([
    ['bookmaru-library', ['mulbit-b2']],
    ['bookmaru-library', ['mulbit-c3']],
    ['health-help-center', ['maru-c2']],
    ['health-help-center', ['maru-d3']],
    ['living-culture-center', ['mulbit-c4']],
    ['living-culture-center', ['mulbit-d3']],
    ['combined-review', ['maru-b2', 'maru-d3']],
    ['combined-review', ['maru-c2', 'maru-e3']],
  ] as const)('%s accepts %s as a public-rule proposal', (missionId, candidateIds) => {
    const mission = MISSIONS[missionId];
    const assessment = assessProposal(mission, 'access-equity', analysisFor(missionId, candidateIds), evidenceFor(mission.cityId));

    expect(assessment.verdict).toBe('valid-with-tradeoffs');
    expect(assessment.priorityConsistent).toBe(true);
    expect(assessment.missingEvidence).toEqual([]);
    expect(assessment.feedbackPrompts).toContain(FEEDBACK_PROMPTS.tradeoffMissing);
  });

  it.each([
    ['bookmaru-library', ['mulbit-b2'], ['mulbit-c3']],
    ['health-help-center', ['maru-c2'], ['maru-d3']],
    ['living-culture-center', ['mulbit-c4'], ['mulbit-d3']],
    ['combined-review', ['maru-b2', 'maru-d3'], ['maru-c2', 'maru-e3']],
  ] as const)('keeps named %s proposals visibly different in their trade-offs', (missionId, firstIds, secondIds) => {
    const mission = MISSIONS[missionId];
    const first = assessProposal(mission, 'access-equity', analysisFor(missionId, firstIds), evidenceFor(mission.cityId));
    const second = assessProposal(mission, 'access-equity', analysisFor(missionId, secondIds), evidenceFor(mission.cityId));
    const firstText = first.conditionResults.map((result) => result.evidenceText).join(' ');
    const secondText = second.conditionResults.map((result) => result.evidenceText).join(' ');
    expect(firstText).not.toBe(secondText);
  });

  it('rejects average-only, underserved-missing, and alternative-missing evidence', () => {
    const evidence: LearningEvidence = {
      ...completeEvidence,
      inspectedMetricIds: ['average'],
      selectedUnderservedZoneIds: [],
      comparedProposalIds: [],
    };
    const assessment = assessProposal(
      MISSIONS['bookmaru-library'],
      'access-equity',
      analysisFor('bookmaru-library', ['mulbit-b2']),
      evidence,
    );

    expect(assessment.verdict).toBe('revise');
    expect(assessment.missingEvidence).toEqual(expect.arrayContaining([
      FEEDBACK_PROMPTS.averageMissing,
      FEEDBACK_PROMPTS.underservedMissing,
      FEEDBACK_PROMPTS.alternativeMissing,
    ]));
  });

  it('requires at least two reviewed layers and both public access metrics', () => {
    const evidence: LearningEvidence = {
      ...completeEvidence,
      reviewedLayerIds: ['population'],
      inspectedMetricIds: ['maximum'],
    };
    const assessment = assessProposal(
      MISSIONS['bookmaru-library'],
      'access-equity',
      analysisFor('bookmaru-library', ['mulbit-b2']),
      evidence,
    );

    expect(assessment.verdict).toBe('revise');
    expect(assessment.missingEvidence.join(' ')).toContain('자료층');
    expect(assessment.missingEvidence).toContain(FEEDBACK_PROMPTS.averageMissing);
  });

  it.each([
    ['mulbit-a4-water', 'NO_RISK_SITE'],
    ['mulbit-e5-island', 'NO_UNREACHABLE_ZONE'],
  ] as const)('identifies the specific failed condition for %s', (candidateId, code) => {
    const assessment = assessProposal(
      MISSIONS['bookmaru-library'],
      code === 'NO_RISK_SITE' ? 'safety' : 'access-equity',
      analysisFor('bookmaru-library', [candidateId]),
      completeEvidence,
    );
    const result = assessment.conditionResults.find((condition) => condition.code === code);
    expect(result?.passed).toBe(false);
    expect(assessment.verdict).toBe('revise');
  });

  it('identifies an over-budget condition without hiding other public results', () => {
    const assessment = assessProposal(
      MISSIONS['combined-review'],
      'cost',
      analysisFor('combined-review', ['maru-e1-premium', 'maru-d3']),
      completeEvidence,
    );
    expect(assessment.conditionResults.find((result) => result.code === 'WITHIN_BUDGET')?.passed).toBe(false);
    expect(assessment.priorityConsistent).toBe(false);
    expect(assessment.verdict).toBe('revise');
  });

  it('uses only selected priority public condition codes', () => {
    const assessment = assessProposal(
      MISSIONS['bookmaru-library'],
      'cost',
      analysisFor('bookmaru-library', ['mulbit-d3']),
      completeEvidence,
    );
    expect(assessment.priorityConsistent).toBe(false);
    expect(assessment.conditionResults.find((result) => result.code === 'COST_WITHIN_PRIORITY_CAP')?.passed).toBe(false);
  });

  it('has no opaque ranking fields in its own keys or serialized output', () => {
    const assessment = assessProposal(
      MISSIONS['bookmaru-library'],
      'access-equity',
      analysisFor('bookmaru-library', ['mulbit-b2']),
      completeEvidence,
    );
    expect(Object.keys(assessment)).not.toEqual(expect.arrayContaining(['score', 'rank', 'winner', 'optimum']));
    expect(JSON.stringify(assessment)).not.toMatch(/\b(score|rank|winner|optimum)\b/i);
  });

  it('fails safely when analysis belongs to another mission or has incomplete context', () => {
    const analysis = analysisFor('bookmaru-library', ['mulbit-b2']);
    const mismatched = { ...analysis, missionId: 'health-help-center' as const };
    const incomplete = { ...analysis, missionContext: undefined } as unknown as PlacementAnalysis;
    expect(assessProposal(MISSIONS['bookmaru-library'], 'access-equity', mismatched, completeEvidence).verdict).toBe('revise');
    expect(assessProposal(MISSIONS['bookmaru-library'], 'access-equity', incomplete, completeEvidence).verdict).toBe('revise');
  });
});
