const commonGlobals = {
  Array: 'readonly',
  Boolean: 'readonly',
  Date: 'readonly',
  Error: 'readonly',
  Infinity: 'readonly',
  JSON: 'readonly',
  Map: 'readonly',
  NaN: 'readonly',
  Number: 'readonly',
  Object: 'readonly',
  Promise: 'readonly',
  Proxy: 'readonly',
  RegExp: 'readonly',
  Set: 'readonly',
  String: 'readonly',
  URL: 'readonly',
  WeakMap: 'readonly',
  WeakSet: 'readonly',
  clearTimeout: 'readonly',
  console: 'readonly',
  process: 'readonly',
  setTimeout: 'readonly'
};

export default [
  {
    ignores: ['coverage/**', 'dist/**', 'node_modules/**', 'site-dist/**']
  },
  {
    files: ['docs-site/**/*.js'],
    languageOptions: {
      globals: {
        document: 'readonly',
        globalThis: 'readonly',
        navigator: 'readonly',
        performance: 'readonly'
      }
    }
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        ...commonGlobals,
        module: 'readonly',
        require: 'readonly'
      },
      sourceType: 'commonjs'
    },
    rules: {
      'no-constant-binary-expression': 'error',
      'no-undef': 'error',
      'no-unreachable': 'error',
      'no-unused-vars': ['error', { args: 'none', caughtErrors: 'none' }]
    }
  },
  {
    files: ['**/*.mjs'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: commonGlobals,
      sourceType: 'module'
    },
    rules: {
      'no-constant-binary-expression': 'error',
      'no-undef': 'error',
      'no-unreachable': 'error',
      'no-unused-vars': ['error', { args: 'none', caughtErrors: 'none' }]
    }
  }
];
