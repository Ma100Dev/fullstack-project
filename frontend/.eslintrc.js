// eslint-disable-next-line no-undef
module.exports = {
  settings: {
    react: {
      "version": "detect"
    },
  },
  env: {
    browser: true,
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
  ],
  rules: {
    'no-control-regex': 'off',
    'comma-dangle': 'off',
  },
};