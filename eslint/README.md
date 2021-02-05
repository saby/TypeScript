# @tensor-corp/eslint-config

Пакет предоставляет shareable конфигурации ESLint (.eslintrc) компании Тензор:

* "@tensor-corp" или "@tensor-corp/eslint-config/base" - конфигурация, которая может быть применима к широкому спектру JS кода (ES3, ES5, ES6+, node.js, unit tests).
* "@tensor-corp/eslint-config/es6" - конфигурация, которая заставляет использовать новый синтаксис ES6+ (например, const и let вместо var).
Наследуется от "@tensor-corp/eslint-config/base".
* "@tensor-corp/eslint-config/node" - конфигурация для node.js проектов.
Наследуется от "@tensor-corp/eslint-config/es6".

## Использование

Установите пакет и укажите в файле ".eslintrc" строки:

        {
            "extends": "@tensor-corp"
        }

или, например,

        {
            "extends": "@tensor-corp/eslint-config/node"
        }

Можно дополнительно [переопределить отдельные поля в конфигурации](https://eslint.org/docs/user-guide/getting-started).
