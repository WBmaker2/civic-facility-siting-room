import { useId, useLayoutEffect, useRef, useState, type JSX, type KeyboardEvent } from 'react';
import { UPDATE_HISTORY } from './updateHistory';

function supportsNativeDialog(): boolean {
  return typeof HTMLDialogElement !== 'undefined'
    && typeof HTMLDialogElement.prototype.showModal === 'function'
    && typeof HTMLDialogElement.prototype.close === 'function';
}

export function UpdateHistoryButton(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const nativeOpenedRef = useRef(false);
  const returnFocusRef = useRef(false);
  const headingId = `update-history-heading-${useId()}`;
  const dialogId = `update-history-dialog-${useId()}`;
  const nativeDialog = supportsNativeDialog();

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (dialog === null) return;
    if (isOpen) {
      if (nativeDialog) {
        try {
          if (!dialog.open) {
            dialog.showModal();
            nativeOpenedRef.current = true;
          }
        } catch {
          dialog.setAttribute('open', '');
        }
      } else {
        dialog.setAttribute('open', '');
      }
      closeRef.current?.focus();
      return;
    }
    if (nativeOpenedRef.current) {
      try { dialog.close(); } catch { dialog.removeAttribute('open'); }
      nativeOpenedRef.current = false;
    } else {
      dialog.removeAttribute('open');
    }
    if (returnFocusRef.current) {
      returnFocusRef.current = false;
      if (triggerRef.current?.isConnected) triggerRef.current.focus();
    }
  }, [isOpen, nativeDialog]);

  function openHistory(): void {
    setIsOpen(true);
  }

  function closeHistory(): void {
    returnFocusRef.current = true;
    setIsOpen(false);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDialogElement>): void {
    if (event.key === 'Escape') {
      event.preventDefault();
      closeHistory();
    }
  }

  return (
    <>
      <button
        ref={triggerRef}
        className="update-history-trigger"
        type="button"
        aria-haspopup="dialog"
        aria-controls={dialogId}
        onClick={openHistory}
      >
        업데이트 내역
      </button>
      <dialog
        ref={dialogRef}
        id={dialogId}
        className="update-history-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={headingId}
        open={isOpen && !nativeDialog}
        onCancel={(event) => { event.preventDefault(); closeHistory(); }}
        onKeyDown={handleKeyDown}
      >
        <div className="update-history-dialog-content">
          <div className="update-history-dialog-header">
            <h2 id={headingId}>업데이트 내역</h2>
            <button ref={closeRef} type="button" onClick={closeHistory}>업데이트 내역 닫기</button>
          </div>
          <ol>
            {UPDATE_HISTORY.map((entry) => (
              <li key={`${entry.date}-${entry.category}`}>
                <p><time dateTime={entry.date}>{entry.date}</time> · <strong>{entry.category}</strong></p>
                <ul>
                  {entry.summaries.map((summary) => <li key={summary}>{summary}</li>)}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </dialog>
    </>
  );
}
