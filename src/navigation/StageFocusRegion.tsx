import { useEffect, useRef, type ReactNode } from 'react';
import type { StageId } from '../domain/types';
import { useReducedMotion } from '../accessibility/useReducedMotion';

export interface StageFocusRegionProps {
  stage: StageId;
  children: ReactNode;
}

/** Keeps the learner oriented when a gated stage replaces the current screen. */
export function StageFocusRegion({ stage, children }: StageFocusRegionProps) {
  const regionRef = useRef<HTMLDivElement | null>(null);
  const previousStageRef = useRef(stage);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (previousStageRef.current === stage) return;
    previousStageRef.current = stage;

    const region = regionRef.current;
    const heading = region?.querySelector<HTMLElement>('h2');
    if (heading === null || heading === undefined) return;

    if (!heading.hasAttribute('tabindex')) heading.setAttribute('tabindex', '-1');
    try {
      heading.focus({ preventScroll: true });
    } catch {
      heading.focus();
    }

    if (typeof region?.scrollIntoView === 'function') {
      region.scrollIntoView({ block: 'start', behavior: reducedMotion ? 'auto' : 'smooth' });
    }
  }, [reducedMotion, stage]);

  return <div id="learning-stage" ref={regionRef} className="stage-focus-region" data-stage-focus={stage} tabIndex={-1}>{children}</div>;
}
