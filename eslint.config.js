import globals from 'globals';
import eslint from '@eslint/js';
import prettier from 'eslint-plugin-prettier';
import tsparser from '@typescript-eslint/parser';
import prettierConfig from 'eslint-config-prettier';
import tseslint from '@typescript-eslint/eslint-plugin';

export default [
  {
    ignores: ['dist/**', 'node_modules/**'],
  },
  eslint.configs.recommended,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        ...globals.node,
        ...globals.es2021,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      'prettier': prettier,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      ...prettierConfig.rules,
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'no-undef': 'off',
      'no-console': 'warn',
      'prettier/prettier': ['error', {
        singleQuote: true,
        trailingComma: 'all',
        printWidth: 90,
        tabWidth: 2,
        semi: true,
      }],
    },
  },
]; 