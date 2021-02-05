'use strict';

// конфигурация для node.js проектов
module.exports = {
   extends: './es6.js',
   parserOptions: {
      ecmaVersion: 9,
      sourceType: 'script'
   },
   env: {
      browser: false,
      node: true,
      es6: true,
      amd: false,
      mocha: true,
      jquery: false
   },
   rules: {
      strict: ['error', 'global'],
      'global-require': 'warn',
      'handle-callback-err': 'error',
      'no-buffer-constructor': 'warn',
      'no-new-require': 'warn',
      'no-path-concat': 'error',
      'no-sync': [
         'warn',
         {
            'allowAtRootLevel': true
         }
      ],
      'no-restricted-modules': [
         'warn',
         {
            'name': 'fs',
            'message': 'Please use fs-extra instead.'
         }
      ],
      'no-console': 'off'
   }
};
