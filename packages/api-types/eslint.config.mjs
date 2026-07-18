import eslint from '@eslint/js'
import { defineConfig } from 'eslint/config'
import importPlugin from 'eslint-plugin-import'
import prettierPlugin from 'eslint-plugin-prettier'
import unusedImports from 'eslint-plugin-unused-imports'
import tseslint from 'typescript-eslint'

export default defineConfig([
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    files: ['**/*.ts'],

    plugins: {
      import: importPlugin,
      prettier: prettierPlugin,
      'unused-imports': unusedImports
    },

    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.json'
        }
      }
    },

    rules: {
      /* ===============================
         General
      =============================== */
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'prettier/prettier': 'error',

      /* ===============================
         Import rules
      =============================== */
      'import/no-unresolved': 'error',
      'import/no-duplicates': 'error',
      'import/no-mutable-exports': 'error',

      'import/extensions': [
        'error',
        'ignorePackages',
        {
          ts: 'never',
          js: 'never'
        }
      ],

      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type'
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          'newlines-between': 'never',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true
          }
        }
      ],

      /* ===============================
         Unused imports
      =============================== */
      '@typescript-eslint/no-unused-vars': 'off',
      'no-unused-vars': 'off',

      'unused-imports/no-unused-imports': 'error',

      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_'
        }
      ]
    }
  }
])
