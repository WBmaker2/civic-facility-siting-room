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

  it('renders conditions, trade-offs, verdict, and all boundary notices in the printable summary', () => {
    const proposals = makeProposals();
    render(<OpinionSummary draft={draftFor(proposals)} proposals={proposals} mission={MISSIONS['bookmaru-library']} city={CITIES.mulbit} />);
    expect(screen.getByRole('heading', { name: '완성한 입지 심의 의견서' })).toBeInTheDocument();
    expect(screen.getByText(/타당안—절충 확인|수정 필요/)).toBeInTheDocument();
    expect(screen.getAllByText(/평균 이동 단위/).length).toBeGreaterThan(0);
    expect(screen.getByText(/실제 도시계획을 대신하거나 응급 서비스 성능을 예측하지 않습니다/)).toBeInTheDocument();
    expect(screen.getAllByText(/이름, 학교, 집 주소, 실제 지역은 입력하지 마세요/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/주민 개인의 잘못이 아닙니다/).length).toBeGreaterThan(0);
  });

  it('keeps valid controls native and only submits a valid draft', async () => {
    const user = userEvent.setup();
    const proposals = makeProposals();
    const onSubmit = vi.fn();
    const onChange = vi.fn();
    render(<SitingOpinionForm draft={draftFor(proposals)} proposals={proposals} intakePriorityId="access-equity" onChange={onChange} onSubmit={onSubmit} />);
    await user.click(screen.getByRole('button', { name: '의견서 완성' }));
    expect(onSubmit).toHaveBeenCalledTimes(1);
    await user.click(screen.getByRole('checkbox', { name: '위험 조건' }));
    expect(onChange).toHaveBeenCalled();
    const emitted = onChange.mock.lastCall?.[0] as OpinionDraft;
    expect(new Set(emitted.evidenceMetricIds).size).toBe(emitted.evidenceMetricIds.length);

    cleanup();
    onSubmit.mockClear();
    render(<SitingOpinionForm draft={{ ...draftFor(proposals), priorityId: 'cost' }} proposals={proposals} intakePriorityId="access-equity" onSubmit={onSubmit} />);
    expect(screen.getByRole('button', { name: '의견서 완성' })).toBeDisabled();
    expect(onSubmit).not.toHaveBeenCalled();
    expect(screen.getByRole('group', { name: '우선 기준' })).toHaveAttribute('aria-describedby', 'opinion-error-priority');
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
});
