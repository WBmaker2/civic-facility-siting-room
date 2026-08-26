import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './',
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './tests/setup.ts',
    css: true,
    include: ['src/**/*.{test,spec}.{ts,tsx}', 'tests/accessibility/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['tests/e2e/**'],
  },
});
