// eslint-disable-next-line no-undef
module.exports = {
  settings: {
    react: {
      'version': 'detect'
    },
  },
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'eslint:recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    'react-hooks',
    'custom-rules'
  ],
  rules: {
    'react-hooks/rules-of-hooks': 'error', 
    'react-hooks/exhaustive-deps': 'warn',
    'no-control-regex': 'off',
    'comma-dangle': 'off',
    'semi': 'error',
    'quotes': [2, 'single', 'avoid-escape'],
    'no-multiple-empty-lines': 'error',
    'no-console': 'warn',
    'no-alert': 'warn',
    'spaced-comment': 'error',
    'eol-last': 'error',
    'react/react-in-jsx-scope': 'off',
    'no-unused-vars': 'warn',
    'custom-rules/no-react-default-import': 'error',
  },
};
