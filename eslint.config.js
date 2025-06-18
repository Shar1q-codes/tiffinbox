// eslint.config.js
import tseslint from 'typescript-eslint';

export default tseslint.config({
  extends: [
    'eslint:recommended',
    ...tseslint.configs.recommended,
  ],
  ignores: ['dist/**', 'node_modules/**'],
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    parserOptions: {
      ecmaFeatures: {
        jsx: true
      }
    },
  },
  plugins: {
    '@typescript-eslint': tseslint.plugin,
  },
  rules: {
    'no-console': 'warn',
    'no-debugger': 'warn',
    'prefer-const': 'warn',
    '@typescript-eslint/no-unused-vars': ['warn', {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_'
    }],
    '@typescript-eslint/no-explicit-any': 'warn',
  },
});