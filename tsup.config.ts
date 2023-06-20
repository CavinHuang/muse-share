import { defineConfig } from 'tsup';

export default defineConfig({
  entryPoints: ['src/index.ts'],
  bundle: true,
  splitting: true,
  outDir: 'dist',
  format: ['iife', 'cjs', 'esm'],
  globalName: 'MUtil',
  dts: true,
  shims: true,
  target: 'es2015',
  platform: "neutral"
});

