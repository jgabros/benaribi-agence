import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  external: ['react', 'react-dom'],
  // All @benaribi/ui components are client-side UI — mark the bundle accordingly
  banner: { js: '"use client";' },
});
