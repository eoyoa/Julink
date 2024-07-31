// @ts-check

import eslint from '@eslint/js'
import tsEslint from 'typescript-eslint'
import prettierConfig from 'eslint-config-prettier'
import vitest from 'eslint-plugin-vitest'

export default tsEslint.config(
  eslint.configs.recommended,
  ...tsEslint.configs.strict,
  ...tsEslint.configs.stylistic,
  prettierConfig,
  {
    files: [
      'src/**/*.spec.ts',
      'src/**/*.spec.tsx',
      'testing/**/*.ts',
      'testing/**/*.spec.ts',
      'testing/**/*.spec.tsx'
    ], // or any other pattern
    plugins: {
      vitest
    },
    rules: {
      ...vitest.configs.recommended.rules,
    },
  },
  {
    ignores: ['**/dist/**', '**/*_old*(.*)', '**/*_old/**']
  }
)