import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    rules: {
      'semi': [ 'error', 'always' ],
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      'react/jsx-curly-spacing': [ 'warn', 'always' ],
      'react/display-name': 'off',
      'no-unused-vars': 'error',
      'quotes': [ 'warn', 'single' ], // 문자열 single quote가 아닌 경우 경고
      'jsx-quotes': [ 'warn', 'prefer-double' ],
      'object-curly-spacing': [ 'warn', 'always' ],
      'template-curly-spacing': [ 'warn', 'always' ],
      'array-bracket-spacing': [ 'warn', 'always' ],
      'comma-dangle': [ 'error', 'never' ],
      'no-console': [ 'warn', { 'allow': [ 'error', 'warn', 'info' ] } ],
      'space-before-blocks': 'warn',
      'space-before-function-paren': [ 'error', {
        'anonymous': 'always',
        'named': 'never',
        'asyncArrow': 'always'
      } ],
      'indent': [ 'warn', 2 ], // 인덴트가 2가 아닌 경우 경고
      'eqeqeq': [ 'error', 'smart' ],
      'prefer-const': 'error',
      'no-multiple-empty-lines': [ 'error', { 'max': 1 } ],
      'eol-last': [ 'error', 'always' ],
      'no-debugger': 'error'
    }
  }
];
export default eslintConfig;
