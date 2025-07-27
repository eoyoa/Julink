import * as esbuild from 'esbuild';

await esbuild.build({
  bundle: true,
  sourcemap: true,
  minify: true,
  format: 'esm',
  platform: 'node',
  target: 'es2020',
  entryPoints: ['function.ts'],
  outfile: 'dist/index.mjs',
  loader: {
    '.txt': 'text'
  }
}).catch(() => process.exit(1));