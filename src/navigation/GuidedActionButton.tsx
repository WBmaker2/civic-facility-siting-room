import type { ReactNode } from 'react';
import type { GuidedActionId } from '../domain/types';

export interface GuidedActionButtonProps {
  actionId: Exclude<GuidedActionId, null>;
  currentAction: GuidedActionId;
  disabled: boolean;
  onClick: () => void;
  children: ReactNode;
}

export function GuidedActionButton({ actionId, currentAction, disabled, onClick, children }: GuidedActionButtonProps) {
  const isCurrent = actionId === currentAction;
  return (
    <button type="button" disabled={disabled} onClick={onClick} data-guided={isCurrent ? 'true' : undefined} className={isCurrent && !disabled ? 'gi-pulse' : undefined}>
      {children}
      {isCurrent && <span className="guided-action-badge" aria-hidden="true">다음 필수 활동</span>}
    </button>
  );
}
