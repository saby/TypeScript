'use strict';

// объект rules для ES6 кода
module.exports = {
   'no-restricted-properties': ['warn',
      {
         object: 'arguments',
         property: 'callee',
         message: 'arguments.callee is deprecated',
      },
      {
         object: 'global',
         property: 'isFinite',
         message: 'Please use Number.isFinite instead',
      },
      {
         object: 'self',
         property: 'isFinite',
         message: 'Please use Number.isFinite instead',
      },
      {
         object: 'window',
         property: 'isFinite',
         message: 'Please use Number.isFinite instead',
      },
      {
         object: 'global',
         property: 'isNaN',
         message: 'Please use Number.isNaN instead',
      },
      {
         object: 'self',
         property: 'isNaN',
         message: 'Please use Number.isNaN instead',
      },
      {
         object: 'window',
         property: 'isNaN',
         message: 'Please use Number.isNaN instead',
      },
      {
         property: '__defineGetter__',
         message: 'Please use Object.defineProperty instead.',
      },
      {
         property: '__defineSetter__',
         message: 'Please use Object.defineProperty instead.',
      },
      {
         object: 'Math',
         property: 'pow',
         message: 'Use the exponentiation operator (**) instead.',
      }],
   'no-var': 'warn',
   'object-shorthand': ['warn', 'always', {
      ignoreConstructors: false,
      avoidQuotes: true,
   }],
   'prefer-arrow-callback': ['warn', {
      allowNamedFunctions: true,
      allowUnboundThis: true,
   }],
   'prefer-const': ['warn', {
      destructuring: 'any',
      ignoreReadBeforeAssign: true,
   }],
   'prefer-destructuring': ['warn', {
      VariableDeclarator: {
         array: false,
         object: true,
      },
      AssignmentExpression: {
         array: true,
         object: true,
      },
   }, {
      enforceForRenamedProperties: false,
   }],
   'prefer-numeric-literals': 'warn',
   'prefer-rest-params': 'warn',
   'prefer-spread': 'warn',
   'prefer-template': 'warn',
   'prefer-object-spread': 'warn',
   'comma-dangle': [
      'warn',
      {
         arrays: 'only-multiline',
         objects: 'only-multiline',
         imports: 'only-multiline',
         exports: 'only-multiline',
         functions: 'only-multiline'
      }
   ]
};
