import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import prettierPlugin from 'eslint-plugin-prettier'
import unusedImports from 'eslint-plugin-unused-imports'

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    plugins: {
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
          tsx: 'never',
          js: 'never',
          jsx: 'never'
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
          pathGroups: [
            {
              pattern: '@/**',
              group: 'internal'
            }
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
         Unused imports (AUTO FIX)
      =============================== */

      // Disable default unused-vars
      '@typescript-eslint/no-unused-vars': 'off',
      'no-unused-vars': 'off',

      // Remove unused imports automatically
      'unused-imports/no-unused-imports': 'error',

      // Keep unused vars but allow _ prefix
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
  },

  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts'])
])
