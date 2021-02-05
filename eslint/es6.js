'use strict';

const es6Rules = require('./impl/es6-rules');

// конфигурация, которая заставляет использовать новый синтаксис ES6+
module.exports = {
   extends: './base.js',
   parserOptions: {
      ecmaVersion: 9,
      sourceType: 'module'
   },
   rules: es6Rules
};
