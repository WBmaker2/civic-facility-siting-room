import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app/App';
// Vite handles these side-effect stylesheet imports; TypeScript has no CSS module declaration in this MVP.
// @ts-expect-error CSS side-effect import is resolved by Vite.
import './styles/tokens.css';
// @ts-expect-error CSS side-effect import is resolved by Vite.
import './styles/global.css';
// @ts-expect-error CSS side-effect import is resolved by Vite.
import './styles/responsive.css';
// @ts-expect-error Vite resolves CSS side-effect imports in the test runtime.
import './styles/motion.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('앱을 표시할 root 요소를 찾을 수 없습니다.');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
