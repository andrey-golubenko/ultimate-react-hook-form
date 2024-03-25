module.exports = { extends: ['@commitlint/config-conventional'],
  rules: {
    'type-case' : [2, never, [
    'lower-case', // default
    'upper-case', // UPPERCASE
    'camel-case', // camelCase
    'kebab-case', // kebab-case
    'pascal-case', // PascalCase
    'snake-case', // snake_case
  ]]
  }
};
