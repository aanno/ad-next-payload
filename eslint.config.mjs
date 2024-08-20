// migrated eslint config
// * https://eslint.org/docs/latest/use/configure/migration-guide#predefined-and-shareable-configs
// * https://stackoverflow.com/questions/74237042/how-do-you-configure-eslints-parser-and-plug-ins-using-eslints-flat-configurat
// * https://github.com/vercel/next.js/discussions/49337

import globals from 'globals'
import react from 'eslint-plugin-react'
import hooks from 'eslint-plugin-react-hooks'
import a11y from 'eslint-plugin-jsx-a11y'
// seems not to support flat files currently (tp)
import next from '@next/eslint-plugin-next'
// replaced by @typescript-eslint/eslint-plugin ? (tp)
// import ts from 'eslint-plugin-ts'
import js from '@eslint/js'
import jsdoc from 'eslint-plugin-jsdoc'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import ts from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import functional from 'eslint-plugin-functional'
import imprt from 'eslint-plugin-import'
import prettier from 'eslint-plugin-prettier'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default [
  {
    // js files don't allow ts parser
    files: ['**/*.{ts,tsx,mtsx}'],
    ...next.configs.recommended,
    ...react.configs.flat.recommended,
    ...a11y.flatConfigs.recommended,
    // ...hooks.configs.flat.recommended,
    // ...ts.configs.flat.recommended,
    // ...jsdoc.configs.flat.recommended,
    // ...prettier.configs.flat.recommended,
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          modules: true,
        },
        ecmaVersion: 'latest',
        project: './tsconfig.json',
        globals: {
          ...globals.serviceworker,
          ...globals.browser,
        },
      },
    },
    plugins: {
      functional,
      import: imprt,
      '@typescript-eslint': ts,
      react,
      'react-hooks': hooks,
      a11y,
      ts,
      js,
      jsdoc,
      prettier,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...ts.configs['eslint-recommended'].rules,
      ...ts.configs['recommended'].rules,
      ...react.configs['jsx-runtime'].rules,
      // TODO: leads to Key "@next/next/no-html-link-for-pages": Could not find plugin "@next/next"'
      // ...next.configs.recommended.rules,
      // ...next.configs['core-web-vitals'].rules,
      // already enabled with ...react.configs.flat.recommended (tp)
      // ...react.configs['recommended'].rules,
      // not flat (tp)
      // ...hooks.configs['recommended'].rules,
      ...hooks.configs.recommended.rules,
      // not fulfilled (tp)
      // ...functional.configs['recommended'].rules,
      // not flat (tp)
      // ...jsdoc.configs['recommended'].rules,
      'ts/return-await': 2,
      'react/prop-types': 'off',
      '@typescript-eslint/no-empty-object-type': 0,
      '@typescript-eslint/no-explicit-any': 0,
      '@typescript-eslint/no-unused-vars': 0,
      '@typescript-eslint/ban-ts-comment': 0,
      'react-hooks/exhaustive-deps': 0,
    },
  },
  {
    // js files don't allow ts parser
    files: ['**/*.{js,mjs,cjs,jsx,mjsx}'],
    ...next.configs.recommended,
    ...react.configs.flat.recommended,
    ...a11y.flatConfigs.recommended,
    ...js.configs.recommended,
    // ...hooks.configs.flat.recommended,
    // ...ts.configs.flat.recommended,
    // ...jsdoc.configs.flat.recommended,
    // ...prettier.configs.flat.recommended,
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          modules: true,
        },
        ecmaVersion: 'latest',
        project: './tsconfig.json',
        globals: {
          ...globals.serviceworker,
          ...globals.browser,
        },
      },
    },
    plugins: {
      functional,
      import: imprt,
      '@typescript-eslint': ts,
      react,
      'react-hooks': hooks,
      a11y,
      js,
      jsdoc,
      prettier,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...react.configs['jsx-runtime'].rules,
      // TODO: leads to Key "@next/next/no-html-link-for-pages": Could not find plugin "@next/next"'
      // ...next.configs.recommended.rules,
      // ...next.configs['core-web-vitals'].rules,
      // already enabled with ...react.configs.flat.recommended (tp)
      // ...react.configs['recommended'].rules,
      // not flat (tp)
      // ...hooks.configs['recommended'].rules,
      ...hooks.configs.recommended.rules,
      // not fulfilled (tp)
      // ...functional.configs['recommended'].rules,
      // not flat (tp)
      // ...jsdoc.configs['recommended'].rules,
      'react/prop-types': 'off',
      'react-hooks/exhaustive-deps': 0,
    },
  },
  {
    ignores: [
      '**/.tmp',
      '**/.git',
      '**/.hg',
      '**/.pnp.*',
      '**/.svn',
      '**/.yarn/**/*',
      '**/build',
      '**/dist/**/*',
      '**/node_modules',
      '**/temp',
      '**/playwright.config.ts',
      '**/jest.config.js',
      '**/ad-next-payload.code-workspace',
      '**/pnpm-lock.yaml',
      '/ ???',
      '**/*.json',
      '.next/*',
    ],
  },
]
