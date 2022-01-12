const fs = require('fs');
const path = require('path');

const prettierOptions = JSON.parse(fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8'));

module.exports = {
  plugins: ['react'],
  extends: [
    'airbnb',
    'plugin:import/recommended',
    'plugin:prettier/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/typescript',
  ],
  env: {
    es6: true,
    node: true,
    browser: true,
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
  },
  rules: {
    'prettier/prettier': ['error', prettierOptions],
    'react/function-component-definition': 'off',
    'no-param-reassign': 'off',
    'no-sparse-arrays': 'error',
    'no-plusplus': 'off',
    'global-require': 'off',
    'import/no-cycle': 'off',
    'import/prefer-default-export': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/require-default-props': 'off',
    'react/prop-types': 'off',
    'no-restricted-syntax': 'off',
    'no-underscore-dangle': 'off',
    'guard-for-in': 'off',
    'no-continue': 'off',
    'import/order': [
      'warn',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'],
        pathGroups: [
          {
            pattern: '{react,react-**, **-react}',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '@component/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '{@feature/**}',
            group: 'external',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      plugins: ['@typescript-eslint'],
      extends: ['airbnb-typescript'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        sourceType: 'module',
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.eslint.json'],
      },
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-unused-vars': [
          'warn',
          {
            argsIgnorePattern: '^_',
            varsIgnorePattern: '[iI]gnored',
          },
        ],
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-use-before-define': [
          'error',
          {
            functions: false,
            classes: true,
            variables: true,
            typedefs: true,
          },
        ],
        '@typescript-eslint/unbound-method': 'off',
        '@typescript-eslint/comma-dangle': 'off',
        '@typescript-eslint/naming-convention': 'off',
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
};
