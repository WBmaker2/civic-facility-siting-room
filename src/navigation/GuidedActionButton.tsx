import type { ReactNode } from 'react';
import type { GuidedActionId } from '../domain/types';

export interface GuidedActionButtonProps {
  actionId: Exclude<GuidedActionId, null>;
  currentAction: GuidedActionId;
  disabled: boolean;
  onClick: () => void;
  children: ReactNode;
  className?: string;
}

const normalizeClasses = (value: string | undefined): string | undefined => {
  const normalized = value?.trim().split(/\s+/).filter(Boolean).join(' ');
  return normalized === '' ? undefined : normalized;
};

export function GuidedActionButton({ actionId, currentAction, disabled, onClick, children, className }: GuidedActionButtonProps) {
  const isCurrent = actionId === currentAction;
  const classes = normalizeClasses([normalizeClasses(className), isCurrent && !disabled ? 'gi-pulse' : undefined].filter(Boolean).join(' '));
  return (
    <button type="button" disabled={disabled} onClick={onClick} data-guided={isCurrent ? 'true' : undefined} className={classes}>
      {children}
      {isCurrent && <span className="guided-action-badge" aria-hidden="true">다음 필수 활동</span>}
    </button>
  );
}
