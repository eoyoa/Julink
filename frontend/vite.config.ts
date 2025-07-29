import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import * as path from 'node:path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const monorepoRoot = path.resolve(__dirname, '..');

export default defineConfig({
    plugins: [
        react(),
        tsconfigPaths({
            root: monorepoRoot,
        }),
    ],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './testing/setup.ts',
    },
    assetsInclude: ['**/*.txt'],
});
