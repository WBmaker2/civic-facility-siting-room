import { describe, expect, it } from 'vitest';
// @ts-expect-error Vite raw stylesheet import is available in the test runtime.
import globalCss from './global.css?raw';
// @ts-expect-error Vite raw stylesheet import is available in the test runtime.
import appCss from '../app/app.css?raw';

const normalizedCss = globalCss.replace(/\s+/g, ' ').trim();
const normalizedAppCss = appCss.replace(/\s+/g, ' ').trim();

describe('global UI interaction contracts', () => {
  it('uses a top accent instead of side-tab callout borders', () => {
    expect(normalizedCss).not.toMatch(/\.selected-mission-summary[^}]*border-left:\s*4px/);
    expect(normalizedCss).not.toMatch(/\.comparison-sentence-prompt[^}]*border-left:\s*4px/);
    expect(normalizedCss).toMatch(/\.selected-mission-summary[^}]*inset 0 3px 0 var\(--color-accent\)/);
    expect(normalizedCss).toMatch(/\.comparison-sentence-prompt[^}]*background:\s*var\(--color-accent-soft\)/);
  });

  it('defines stable hover and pressed feedback for enabled buttons', () => {
    expect(normalizedCss).toMatch(/button:hover:not\(:disabled\)/);
    expect(normalizedCss).toMatch(/button:active:not\(:disabled\)/);
    expect(normalizedCss).toMatch(/transition:\s*background-color\s+180ms/);
    expect(normalizedCss).toMatch(/touch-action:\s*manipulation/);
  });

  it('turns off button transitions when reduced motion is requested', () => {
    expect(normalizedCss).toMatch(/@media \(prefers-reduced-motion: reduce\)[^}]*button[^}]*transition:\s*none/);
  });

  it('keeps the update-history trigger interactive after its component styles load', () => {
    expect(normalizedAppCss).toMatch(/\.update-history-trigger:hover:not\(:disabled\)[^}]*background:\s*var\(--color-accent-soft\)/);
    expect(normalizedAppCss).toMatch(/\.update-history-trigger:active:not\(:disabled\)[^}]*transform:\s*translateY\(1px\)/);
  });
});
