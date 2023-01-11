module.exports = {
  processors: ['stylelint-processor-styled-components'],
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-styled-components',
  ],
  customSyntax: 'postcss-scss',
  rules: {
    'selector-type-case': ['lower', { ignoreTypes: ['/^\\$\\w+/'] }],
    'selector-type-no-unknown': [
      true,
      { ignoreTypes: ['/-styled-mixin/', '/^\\$\\w+/'] },
    ],
    'value-keyword-case': ['lower', { ignoreKeywords: ['dummyValue'] }],
    'declaration-colon-newline-after': null,
    'rule-empty-line-before': null,
    'declaration-empty-line-before': null,
    'string-quotes': 'single',
    'no-descending-specificity': null,
    'selector-class-pattern': null,
  },
}
