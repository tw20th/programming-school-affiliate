module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'google',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['tsconfig.json'],
    sourceType: 'module',
  },
  ignorePatterns: [
    '.eslintrc.js', // 👈 追加
    '/lib/**/*',
    '/generated/**/*',
  ],
  plugins: ['@typescript-eslint', 'import'],
  rules: {
    'max-len': ['error', { code: 100 }],
    quotes: ['error', 'double'],
    'import/no-unresolved': 0,
    indent: ['error', 2],
    'require-jsdoc': 'off', // 👈 オプションで追加
  },
}
