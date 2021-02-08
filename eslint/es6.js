'use strict';

const es6Rules = require('./impl/es6-rules');

// Configuration that forces us to use ES6+
module.exports = {
   extends: './base.js',
   parserOptions: {
      ecmaVersion: 9,
      sourceType: 'module'
   },
   rules: es6Rules
};
