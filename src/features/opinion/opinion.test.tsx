import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { CITIES } from '../../domain/cities';
import { MISSIONS } from '../../domain/missions';
import { analyzePlacement } from '../../engine/analyzePlacement';
import { assessProposal } from '../../engine/assessProposal';
import { createProposalSnapshot } from '../../engine/proposalComparison';
import type { FacilityPlacement, OpinionDraft, ProposalSnapshot } from '../../domain/types';
import { OpinionSummary } from './OpinionSummary';
import { SitingOpinionForm } from './SitingOpinionForm';
import { cloneOpinionDraft, validateOpinion } from './validateOpinion';

afterEach(cleanup);

const makeProposals = (): ProposalSnapshot[] => {
  const mission = MISSIONS['bookmaru-library'];
  const placements = (candidateId: string): FacilityPlacement[] => [{ slotId: 'library-1', facilityKind: 'library', candidateId }];
  return ['mulbit-b2', 'mulbit-c3'].map((candidateId, index) => {
    const current = placements(candidateId);
    const analysis = analyzePlacement(CITIES.mulbit, mission, current);
    const assessment = assessProposal(mission, 'access-equity', analysis, { reviewedLayerIds: ['population', 'roads'], inspectedMetricIds: ['average', 'maximum'], selectedUnderservedZoneIds: ['mulbit-north'], comparedProposalIds: index === 0 ? [] : ['proposal-a', 'proposal-b'] });
    return createProposalSnapshot(index === 0 ? 'A안' : 'B안', current, analysis, assessment);
  });
};

const draftFor = (proposals: ProposalSnapshot[]): OpinionDraft => ({
  priorityId: 'access-equity', selectedProposalId: proposals[0]!.id, evidenceMetricIds: ['average', 'maximum', 'risk'], underservedZoneId: proposals[0]!.analysis.nearestFacilityAccess.zoneTravel[0]!.zoneId,
  rationale: '여러 구역의 이동 부담을 함께 살폈습니다.', counterargument: '다른 구역의 이동이 길어질 수 있습니다.', mitigation: '다음 단계에서 안내와 보완 시설을 함께 살핍니다.',
});

const makeCombinedProposals = (): ProposalSnapshot[] => {
  const mission = MISSIONS['combined-review'];
  const placements = (healthCandidateId: string): FacilityPlacement[] => [
    { slotId: 'library-1', facilityKind: 'library', candidateId: 'maru-d3' },
    { slotId: 'health-support-1', facilityKind: 'health-support', candidateId: healthCandidateId },
  ];
  return ['maru-c2', 'maru-e3'].map((healthCandidateId, index) => {
    const current = placements(healthCandidateId);
    const analysis = analyzePlacement(CITIES.maru, mission, current);
    const assessment = assessProposal(mission, 'cost', analysis, { reviewedLayerIds: ['population', 'roads'], inspectedMetricIds: ['average', 'maximum'], selectedUnderservedZoneIds: ['maru-east'], comparedProposalIds: index === 0 ? [] : ['proposal-a', 'proposal-b'] });
    return createProposalSnapshot(index === 0 ? 'A안' : 'B안', current, analysis, assessment);
  });
};

describe('structured siting opinion', () => {
  it('hides field alerts on entry, then shows them after submit, with a guided textarea', async () => {
    const user = userEvent.setup();
    const proposals = makeProposals();
    render(<SitingOpinionForm draft={{ ...draftFor(proposals), selectedProposalId: null, evidenceMetricIds: [], underservedZoneId: null, rationale: '', counterargument: '', mitigation: '' }} proposals={proposals} intakePriorityId="access-equity" onSubmit={vi.fn()} />);
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(screen.getAllByText(/밑줄은 생각을 넣을 자리/).length).toBeGreaterThan(0);
    expect(screen.getByLabelText('선택안의 근거')).toHaveClass('opinion-textarea');
    await user.click(screen.getByRole('button', { name: '의견서 작성' }));
    expect(screen.getAllByRole('alert').length).toBeGreaterThan(0);
  });

  it('hides invalid ARIA state until an opinion field is touched or submitted', async () => {
    const proposals = makeProposals();
    render(<SitingOpinionForm draft={{ ...draftFor(proposals), selectedProposalId: null, evidenceMetricIds: [], underservedZoneId: null, rationale: '', counterargument: '', mitigation: '' }} proposals={proposals} intakePriorityId="access-equity" onSubmit={vi.fn()} />);
    expect(screen.getByLabelText('선택안의 근거')).not.toHaveAttribute('aria-invalid');
    expect(screen.getByLabelText('선택안의 근거')).not.toHaveAttribute('aria-describedby');
    expect(screen.getByLabelText('더 불편을 살필 구역')).not.toHaveAttribute('aria-invalid');
    expect(screen.getByRole('group', { name: '선택안' })).not.toHaveAttribute('aria-invalid');
    expect(screen.getByRole('group', { name: '선택안' })).not.toHaveAttribute('aria-describedby');
  });

  it('keeps priority mismatch hidden until the learner changes the priority', async () => {
    const user = userEvent.setup();
    const proposals = makeProposals();
    render(<SitingOpinionForm draft={{ ...draftFor(proposals), priorityId: 'cost' }} proposals={proposals} intakePriorityId="access-equity" onSubmit={vi.fn()} />);
    const priorityGroup = screen.getByRole('group', { name: '우선 기준' });
    expect(priorityGroup).not.toHaveAttribute('aria-invalid');
    expect(priorityGroup).not.toHaveAttribute('aria-describedby');
    await user.click(screen.getByRole('radio', { name: '접근성' }));
    await user.click(screen.getByRole('radio', { name: '비용' }));
    expect(priorityGroup).toHaveAttribute('aria-invalid', 'true');
    expect(priorityGroup).toHaveAttribute('aria-describedby', 'opinion-error-priority');
    expect(screen.getByRole('alert')).toHaveTextContent('심의 접수에서 고른 기준과 같은 기준을 선택해 주세요.');
  });

  it('exposes the five sentence frames and privacy-safe bounded fields without AI claims', () => {
    const proposals = makeProposals();
    render(<SitingOpinionForm draft={{ ...draftFor(proposals), rationale: '', counterargument: '', mitigation: '' }} proposals={proposals} intakePriorityId="access-equity" />);
    expect(screen.getByLabelText('선택안의 근거')).toHaveAttribute('maxlength', '300');
    expect(screen.getByLabelText('예상되는 반론')).toHaveAttribute('maxlength', '300');
    expect(screen.getByLabelText('보완 방법')).toHaveAttribute('maxlength', '300');
    expect(screen.getByText('저는 ___ 기준을 우선하여 ___안을 제안합니다.')).toBeInTheDocument();
    expect(screen.getByText('평균 이동 단위는 ___이고, 가장 불리한 ___구역은 ___입니다.')).toBeInTheDocument();
    expect(screen.getByText('이 선택은 ___에 유리하지만 ___에는 불리할 수 있습니다.')).toBeInTheDocument();
    expect(screen.getAllByText(/이름, 학교, 집 주소, 실제 지역은 입력하지 마세요/).length).toBeGreaterThan(0);
    expect(screen.queryByText(/AI 추천|자동 채점|최적 위치|정답 위치/)).not.toBeInTheDocument();
  });

  it('completes only with both travel metrics, an extra condition, an alternative, and bounded Unicode prose', () => {
    const proposals = makeProposals();
    const result = validateOpinion(draftFor(proposals), proposals);
    expect(result.complete).toBe(true);
    expect(Object.keys(result.errors)).toEqual(['proposal', 'evidence', 'underservedZone', 'rationale', 'counterargument', 'mitigation']);
    const complete = draftFor(proposals);
    const oneError: Array<[keyof typeof result.errors, OpinionDraft]> = [
      ['proposal', { ...complete, selectedProposalId: null }],
      ['evidence', { ...complete, evidenceMetricIds: ['average', 'maximum'] }],
      ['underservedZone', { ...complete, underservedZoneId: null }],
      ['rationale', { ...complete, rationale: '짧음' }],
      ['counterargument', { ...complete, counterargument: '짧음' }],
      ['mitigation', { ...complete, mitigation: '짧음' }],
    ];
    for (const [key, candidate] of oneError) {
      for (const [errorKey, message] of Object.entries(validateOpinion(candidate, proposals).errors)) {
        expect(message === null).toBe(errorKey !== key);
      }
    }
    expect(validateOpinion({ ...draftFor(proposals), evidenceMetricIds: ['average'], rationale: '짧음' }, proposals).complete).toBe(false);
    expect(validateOpinion({ ...draftFor(proposals), underservedZoneId: 'unknown-zone' }, proposals).errors.underservedZone).not.toBeNull();
    expect(validateOpinion(draftFor(proposals), [null as never, null as never]).complete).toBe(false);
    for (const count of [9, 10, 300, 301]) {
      const candidate = { ...draftFor(proposals), rationale: '가'.repeat(count) };
      expect(validateOpinion(candidate, proposals).errors.rationale === null).toBe(count === 10 || count === 300);
    }
    const malformed = { ...draftFor(proposals), evidenceMetricIds: ['average', 'maximum'] as string[] };
    Object.defineProperty(malformed, 'rationale', { enumerable: true, get: () => '접근성 자료를 충분히 살폈습니다.' });
    expect(validateOpinion(malformed as never, proposals).complete).toBe(false);
    const nullPrototype = Object.assign(Object.create(null), draftFor(proposals));
    expect(cloneOpinionDraft(Object.freeze(nullPrototype))).not.toBeNull();
  });

  it('rejects semantic assessment forgeries even when the snapshot shape is complete', () => {
    const proposals = makeProposals();
    const mutations: ProposalSnapshot['assessment'][] = [
      { ...proposals[0]!.assessment, conditionResults: proposals[0]!.assessment.conditionResults.map((result, index) => index === 0 ? { ...result, passed: !result.passed } : result) },
      { ...proposals[0]!.assessment, conditionResults: proposals[0]!.assessment.conditionResults.map((result, index) => index === 0 ? { ...result, evidenceText: `${result.evidenceText} 위조` } : result) },
      { ...proposals[0]!.assessment, verdict: proposals[0]!.assessment.verdict === 'revise' ? 'valid-with-tradeoffs' : 'revise' },
      { ...proposals[0]!.assessment, priorityConsistent: !proposals[0]!.assessment.priorityConsistent },
      { ...proposals[0]!.assessment, missingEvidence: [...proposals[0]!.assessment.missingEvidence, '위조'] },
      { ...proposals[0]!.assessment, feedbackPrompts: [...proposals[0]!.assessment.feedbackPrompts, '위조'] },
    ];
    for (const assessment of mutations) {
      const forged = [{ ...proposals[0]!, assessment }, proposals[1]!];
      expect(validateOpinion(draftFor(proposals), forged as ProposalSnapshot[]).complete).toBe(false);
    }
  });

  it('renders conditions, trade-offs, verdict, and all boundary notices in the printable summary', () => {
    const proposals = makeProposals();
    render(<OpinionSummary draft={draftFor(proposals)} proposals={proposals} mission={MISSIONS['bookmaru-library']} city={CITIES.mulbit} />);
    expect(screen.getByRole('heading', { name: '완성한 입지 심의 의견서' })).toBeInTheDocument();
    expect(screen.getByText(/타당안—절충 확인|수정 필요/)).toBeInTheDocument();
    const selected = proposals[0]!;
    expect(screen.getByText(`평균 이동 단위: ${selected.analysis.nearestFacilityAccess.populationWeightedAverage!.toFixed(1)} 이동 단위`)).toBeInTheDocument();
    expect(screen.getByText(`가장 긴 이동 단위: ${selected.analysis.nearestFacilityAccess.longestReachableTravel} 이동 단위`)).toBeInTheDocument();
    expect(screen.getByText(`위험 조건: ${selected.analysis.riskyCandidateIds.length}곳`)).toBeInTheDocument();
    expect(screen.getByText('물빛 가운데 구역')).toBeInTheDocument();
    expect(screen.getByText('여러 구역의 이동 부담을 함께 살폈습니다.')).toBeInTheDocument();
    expect(screen.getByText('다른 구역의 이동이 길어질 수 있습니다.')).toBeInTheDocument();
    expect(screen.getByText('다음 단계에서 안내와 보완 시설을 함께 살핍니다.')).toBeInTheDocument();
    expect(screen.getByText(/실제 도시계획을 대신하거나 응급 서비스 성능을 예측하지 않습니다/)).toBeInTheDocument();
    expect(screen.getAllByText(/이름, 학교, 집 주소, 실제 지역은 입력하지 마세요/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/주민 개인의 잘못이 아닙니다/).length).toBeGreaterThan(0);
  });

  it('announces completion and focuses the summary heading', async () => {
    const proposals = makeProposals();
    const headingRef = { current: null } as { current: HTMLHeadingElement | null };
    render(<OpinionSummary draft={draftFor(proposals)} proposals={proposals} mission={MISSIONS['bookmaru-library']} city={CITIES.mulbit} summaryHeadingRef={headingRef} />);
    expect(screen.getByRole('status')).toHaveTextContent('의견서가 완성되었습니다');
    expect(headingRef.current).toBe(screen.getByRole('heading', { name: '완성한 입지 심의 의견서' }));
  });

  it('keeps valid controls native and only submits a valid draft', async () => {
    const user = userEvent.setup();
    const proposals = makeProposals();
    const onSubmit = vi.fn();
    const onChange = vi.fn();
    render(<SitingOpinionForm draft={draftFor(proposals)} proposals={proposals} intakePriorityId="access-equity" onChange={onChange} onSubmit={onSubmit} />);
    await user.click(screen.getByRole('button', { name: '의견서 작성' }));
    expect(onSubmit).toHaveBeenCalledTimes(1);
    await user.click(screen.getByRole('checkbox', { name: '위험 조건' }));
    expect(onChange).toHaveBeenCalled();
    const emitted = onChange.mock.lastCall?.[0] as OpinionDraft;
    expect(new Set(emitted.evidenceMetricIds).size).toBe(emitted.evidenceMetricIds.length);

    cleanup();
    onSubmit.mockClear();
    render(<SitingOpinionForm draft={{ ...draftFor(proposals), priorityId: 'cost' }} proposals={proposals} intakePriorityId="access-equity" onSubmit={onSubmit} />);
    expect(screen.getByRole('button', { name: '의견서 작성' })).toBeDisabled();
    expect(onSubmit).not.toHaveBeenCalled();
    expect(screen.getByRole('group', { name: '우선 기준' })).not.toHaveAttribute('aria-describedby');
  });

  it('shows combined-review role sharing, phased installation, exact conditions, print, and restart actions', async () => {
    const user = userEvent.setup();
    const proposals = makeCombinedProposals();
    const print = vi.spyOn(window, 'print').mockImplementation(() => undefined);
    const onRestart = vi.fn();
    render(<OpinionSummary draft={{ ...draftFor(proposals), priorityId: 'cost' }} proposals={proposals} mission={MISSIONS['combined-review']} city={CITIES.maru} priorityId="cost" onRestart={onRestart} />);
    expect(screen.getByText(/도서관은 책과 배움 자료를, 건강 도움소는 일상 건강 상담을 맡도록 역할을 나눕니다/)).toBeInTheDocument();
    expect(screen.getByText(/한 시설을 먼저 설치하고 다른 시설은 단계적으로 설치합니다/)).toBeInTheDocument();
    expect(screen.getAllByText(/: 충족 —/).length).toBe(MISSIONS['combined-review'].conditions.length);
    await user.click(screen.getByRole('button', { name: '브라우저에서 인쇄' }));
    expect(print).toHaveBeenCalledTimes(1);
    await user.click(screen.getByRole('button', { name: '처음부터 다시 시작' }));
    expect(onRestart).toHaveBeenCalledTimes(1);
    print.mockRestore();
  });

  it('fails closed for forged proposal assessment and invalid summary context', () => {
    const proposals = makeProposals();
    const forged = [{ ...proposals[0]!, assessment: { ...proposals[0]!.assessment, conditionResults: [] } }, proposals[1]!];
    expect(validateOpinion(draftFor(proposals), forged as ProposalSnapshot[]).complete).toBe(false);
    render(<OpinionSummary draft={draftFor(proposals)} proposals={proposals} mission={null as never} city={CITIES.mulbit} />);
    expect(screen.getByRole('alert')).toHaveTextContent('의견서 자료를 표시할 수 없습니다');
  });

  it('renders an alert for incomplete drafts, malformed explicit proposals, and malformed form inputs', () => {
    const proposals = makeProposals();
    const incomplete = { ...draftFor(proposals), evidenceMetricIds: [] as OpinionDraft['evidenceMetricIds'] };
    render(<OpinionSummary draft={incomplete} proposals={proposals} mission={MISSIONS['bookmaru-library']} city={CITIES.mulbit} />);
    expect(screen.getByRole('alert')).toHaveTextContent('의견서 자료를 표시할 수 없습니다');
    for (const invalidDraft of [
      { ...draftFor(proposals), underservedZoneId: null },
      { ...draftFor(proposals), rationale: '가'.repeat(9) },
      { ...draftFor(proposals), rationale: '가'.repeat(301) },
    ]) {
      cleanup();
      render(<OpinionSummary draft={invalidDraft} proposals={proposals} mission={MISSIONS['bookmaru-library']} city={CITIES.mulbit} />);
      expect(screen.getByRole('alert')).toHaveTextContent('의견서 자료를 표시할 수 없습니다');
    }
    cleanup();
    render(<OpinionSummary draft={draftFor(proposals)} proposal={{ ...proposals[0]!, assessment: { ...proposals[0]!.assessment, verdict: 'not-a-verdict' } as never }} proposals={proposals} mission={MISSIONS['bookmaru-library']} city={CITIES.mulbit} />);
    expect(screen.getByRole('alert')).toHaveTextContent('선택안과 우선 기준을 확인할 수 없습니다');
    cleanup();
    const onSubmit = vi.fn();
    render(<SitingOpinionForm draft={null as never} proposals={proposals} onSubmit={onSubmit} />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
    cleanup();
    render(<SitingOpinionForm draft={draftFor(proposals)} proposals={null as never} onSubmit={onSubmit} />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
