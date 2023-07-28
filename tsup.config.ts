import { defineConfig } from 'tsup'

export default defineConfig({
  entryPoints: ['src/**/*.ts'],
  outDir: 'dist',
  format: ['esm', 'cjs'],
  dts: true,
  splitting: true,
  sourcemap: false,
  clean: true,
  treeshake: true,
  minify: true,
  banner: {
    js: `/**
*        
*   ---=== MuseTools ===---
*   https://github.com/CavinHuang/muse-share
* 
*   一些实用工具函数
*
*/`,
  },
})
