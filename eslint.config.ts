import eslint from '@eslint/js';
import type { ESLint } from 'eslint';
import { defineConfig } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default defineConfig(
  {
    files: ['src/**/*.{ts,tsx}', 'vite.config.ts'],
    extends: [eslint.configs.recommended, ...tseslint.configs.strictTypeChecked, eslintConfigPrettier],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      'react-hooks': reactHooks as ESLint.Plugin,
      'react-refresh': reactRefresh as ESLint.Plugin,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      '@typescript-eslint/no-non-null-assertion': 'off',
      'react-hooks/set-state-in-effect': 'off',
      '@typescript-eslint/no-misused-promises': [
        'error',
        { checksVoidReturn: { attributes: false, arguments: false } },
      ],
    },
  },
  {
    files: ['src/components/**/*.tsx'],
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },
);
