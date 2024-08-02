// @ts-check

import eslint from '@eslint/js'
import tsEslint from 'typescript-eslint'
import { fixupPluginRules } from '@eslint/compat'
import prettierConfig from 'eslint-config-prettier'
import vitest from 'eslint-plugin-vitest'
import reactHooks from 'eslint-plugin-react-hooks'

export default tsEslint.config(
  eslint.configs.recommended,
  ...tsEslint.configs.strict,
  ...tsEslint.configs.stylistic,
  prettierConfig,
  {
    plugins: { 'react-hooks': fixupPluginRules(reactHooks) },
    rules: {
      ...reactHooks.configs.recommended.rules,
    },
  },
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