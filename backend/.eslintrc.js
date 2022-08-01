module.exports = {
    env: {
        commonjs: true,
        es2021: true,
        node: true,
    },
    extends: [
      'airbnb-base',
    ],
    parserOptions: {
        ecmaVersion: 'latest',
    },
    rules: {
        indent: ['error', 2, { SwitchCase: 1, ObjectExpression: 2, FunctionExpression: { body: 2 } }],
        'no-underscore-dangle': 'off',
        'no-param-reassign': 'off',
        'consistent-return': 'off',
    },
};
