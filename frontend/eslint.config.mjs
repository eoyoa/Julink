// @ts-check

import eslint from '@eslint/js'
import tsEslint from 'typescript-eslint'
import prettierConfig from 'eslint-config-prettier'

export default tsEslint.config(
  eslint.configs.recommended,
  ...tsEslint.configs.strict,
  ...tsEslint.configs.stylistic,
  prettierConfig,
  {
    ignores: ['**/dist/**', '**/*_old*(.*)', '**/*_old/**']
  }
)