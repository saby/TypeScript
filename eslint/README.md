Here are different configurations for ESLint (.eslintrc):

* "base" - configuration that is suitable for any js code  (ES3, ES5, ES6+, node.js, unit tests).
* "es6" - configuration that forces you to use ES6+ (for example, const и let instead of var).
Inherited from "base".
* "node" - configuration for node.js projects.
Inherited from "es6".

## Usage

Install package and append the following lines to ".eslintrc":

        {
            "extends": "./node_modules/saby-typescript/eslint/base"
        }

or

        {
            "extends": "./node_modules/saby-typescript/eslint/node"
        }

Also you can override some settings in configuration (https://eslint.org/docs/user-guide/getting-started).
