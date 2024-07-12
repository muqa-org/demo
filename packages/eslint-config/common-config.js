/** @type {import('eslint').Linter.Config} */
module.exports = {
  rules: {
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
    'import/order': [
      'error',
      {
        alphabetize: {
          order: 'asc',
        },
        groups: ['external', 'internal'],
        'newlines-between': 'always',
      },
    ],
    'quotes': [
      'error',
      'single',
      {
        'avoidEscape': true,
        'allowTemplateLiterals': true
      }
    ]
  },
};
