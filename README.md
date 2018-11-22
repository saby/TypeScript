# Saby's environment for TypeScript

This environment provides basic setup for [TypeScript](https://www.typescriptlang.org/) under Saby such as recommended version, preferred configuration file and this instruction.

## How to include in your own project

**Firstly**. Your project must [follow npm architecture](https://docs.npmjs.com/cli/init). You need to [Node.js](https://nodejs.org/) being installed on your computer. The easiest first step to start is execute this command:
```bash
npm init
```
You have to answer several simple questions. After that you'll have the new file `package.json` in your project.

**Secondly**. Add dependency in your `package.json` file at `dependencies` section like this:
```json
"devDependencies": {
  "saby-typescript": "git+https://github.com:saby/TypeScript.git#rc-x.x.xxx"
}
```
You should replace `x.x.xxx` with actual version. For example, `3.18.700`. 

**Thirdly**. Also add a pair of scripts at `scripts` section like this:
```json
"scripts": {
  "prepare": "saby-typescript --install",
  "compile": "tsc"
}
```

It's almost ready now!

**Fourthly**. Just install your package dependencies using this command:
```bash
npm install
```

## How to use

You've got new file `tsconfig.json` in your project as a result of previous command execute. This file is necessary to compile your `.ts` files to `.js` files. You can find out more information about `tsconfig.json` on [TypeScript site](https://www.typescriptlang.org/).

Just create silly module `test.ts`, for example:
```typescript
class Foo {
   _foo: string = 'Foo';
}

export class Bar extends Foo {
   _bar: string = 'Bar';
}
```

Now it's simply to compile your project manually using command line:
```bash
npm run compile
```

It creates a new file `test.js` next to `test.ts` which is an AMD module:
```javascript
define(["require", "exports", "tslib"], function (require, exports, tslib_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Foo = /** @class */ (function () {
        function Foo() {
            this._foo = 'Foo';
        }
        return Foo;
    }());
    var Bar = /** @class */ (function (_super) {
        tslib_1.__extends(Bar, _super);
        function Bar() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._bar = 'Bar';
            return _this;
        }
        return Bar;
    }(Foo));
    exports.Bar = Bar;
});
```

Of course you can setup an IDE you prefer to your convenience. It allows you compile `.ts` files automatically every time you change them.
For example, if you use WebStorm IDE you can read its own [developer's manual](https://www.jetbrains.com/help/webstorm/typescript-support.html).

## Tips and tricks

### How to define custom name for AMD module?

Use slash directive [amd-module](https://www.typescriptlang.org/docs/handbook/triple-slash-directives.html#-amd-module-):

```typescript
/// <amd-module name="NameOf/Your/Amd/Module" />
```

Compilator will put given module name into `define()` function for this module and everywhere this module is used for import in AMD representation.

### How to import AMD module into TypeScript module?

Use `import` as usual:

```typescript
import * as someAmdModule from 'NameOf/Some/Amd/Module';
```

Or with directive with [require()](https://www.typescriptlang.org/docs/handbook/triple-slash-directives.html#export--and-import--require):

```typescript
import someAmdModule = require('NameOf/Some/Amd/Module');
```

In common case this imported module will be like "black box" for TypeScript interpreter so you should define a type of it if you want to work well with it.

If you plan to create inherited class from imported AMD class you will possible have a problems with static class members. The inheritance chain with only TypeScript classes is preferred.

## Any questions?

You can ask them [in our community](https://wi.sbis.ru). Thank you!
