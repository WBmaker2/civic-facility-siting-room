import { createContext, useContext, useReducer, type ReactNode } from 'react';
import { createInitialSession, sessionReducer } from './sessionReducer';
import type { SessionAction, SessionDispatch, SessionState } from './sessionTypes';

interface SessionContextValue { state: SessionState; dispatch: SessionDispatch }
const SessionContext = createContext<SessionContextValue | undefined>(undefined);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(sessionReducer, undefined, createInitialSession);
  return <SessionContext.Provider value={{ state, dispatch }}>{children}</SessionContext.Provider>;
}
// eslint-disable-next-line react-refresh/only-export-components
export function useSession(): { state: SessionState; dispatch: (action: SessionAction) => void } {
  const context = useContext(SessionContext); if (context === undefined) throw new Error('useSession은 SessionProvider 안에서만 사용할 수 있습니다.'); return context;
}
