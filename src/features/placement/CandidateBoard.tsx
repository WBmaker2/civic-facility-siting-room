import type { CandidateSite, CityScenario } from '../../domain/types';

interface CandidateBoardProps {
  city: CityScenario;
  selectedCandidateId: string | null;
  disabledCandidateIds?: ReadonlySet<string>;
  candidateReasons?: ReadonlyMap<string, string>;
  onSelectCandidate: (candidateId: string) => void;
}

const cityLabel = (city: CityScenario): string => city.id === 'mulbit' ? '물빛' : '마루';

function riskText(city: CityScenario, candidate: CandidateSite): string {
  const marker = city.riskMarkers.find((item) => item.nodeId === candidate.nodeId);
  return marker ? `위험 표지: ${marker.label}` : '위험 표지 없음';
}

function roadSummary(city: CityScenario, candidate: CandidateSite): string {
  const links = city.roads.filter((road) => road.from === candidate.nodeId || road.to === candidate.nodeId);
  if (links.length === 0) return '연결 도로 없음';
  const units = links.map((road) => road.travelUnits);
  const minimum = Math.min(...units);
  const maximum = Math.max(...units);
  const range = minimum === maximum ? `${minimum}` : `${minimum}~${maximum}`;
  return `연결 도로 ${links.length}개 · 이동 단위 ${range}`;
}

export function CandidateBoard({
  city,
  selectedCandidateId,
  disabledCandidateIds = new Set<string>(),
  candidateReasons = new Map<string, string>(),
  onSelectCandidate,
}: CandidateBoardProps) {
  return (
    <fieldset className="candidate-board">
      <legend>후보지 선택</legend>
      <p>라디오 버튼으로 후보지를 고른 뒤 시설 배치 버튼을 누릅니다. 드래그는 사용하지 않습니다.</p>
      {city.candidates.map((candidate) => {
        const reason = candidateReasons.get(candidate.id);
        const disabled = disabledCandidateIds.has(candidate.id);
        const detailsId = `candidate-details-${candidate.id}`;
        return (
          <label className="candidate-card" key={candidate.id} htmlFor={`candidate-${candidate.id}`}>
            <input
              id={`candidate-${candidate.id}`}
              type="radio"
              name="candidate-site"
              value={candidate.id}
              checked={selectedCandidateId === candidate.id}
              disabled={disabled}
              aria-describedby={detailsId}
              onChange={() => onSelectCandidate(candidate.id)}
            />
            <span className="candidate-card-content">
              <strong>{candidate.name} ({cityLabel(city)} {candidate.coordinate.label})</strong>
              <span id={detailsId}>
                좌표 {candidate.coordinate.label} · 비용 {candidate.costTokens}토큰 · {riskText(city, candidate)} · {roadSummary(city, candidate)}
                {reason ? ` · ${reason}` : ''}
              </span>
            </span>
          </label>
        );
      })}
    </fieldset>
  );
}
