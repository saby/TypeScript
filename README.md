# Saby's environment for TypeScript

This environment contains setups and patterns to use with [TypeScript](https://www.typescriptlang.org/) in Saby such as recommended version, preferred configuartion files (`tsconfig.json` and `tslib.js`) and instructions.

## How to include in your own project

**First**. Your project must [follow npm architecture](https://docs.npmjs.com/cli/init). You need to [Node.js](https://nodejs.org/) being installed on your computer. The easiest first step to start is execute this command:
```bash
npm init
```
You have to answer to several simple questions. After that you'll have the new file `package.json` in your project.

**Second**. Add dependency of this package in your `package.json` file at section `dependencies` like this:
```javascript
"dependencies": {
  "saby-typescript": "git+https://github.com:saby/TypeScript.git#rc-x.x.xxx"
}
```
You should replace `x.x.xxx` with actual version. For example, `3.18.700`. 

**Third**. Also add a few scripts at section `scripts` like this:
```javascript
"scripts": {
  "postinstall": "node node_modules/saby-typescript/install",
  "compile": "node node_modules/saby-typescript/compile"
}
```

It's almost ready now!

**Fourth**. Just install your package dependencies using this command:
```bash
npm install
```

## How to use

You've got a few new files in your project as result of previous command execute. There are `tsconfig.json` and `tslib.js`. These files are necessary to compile your `.ts` files to `.js` files. You can find out more information about them on [TypeScript site](https://www.typescriptlang.org/).

Now it's simply to compile your project manually using command line:
```bash
npm run compile
```

Of course you can setup an IDE you prefer to your convenience. It allows you compile `.ts` files automatically every time you change them.
For example, if you use WebStorm IDE you can read its own [developer's manual](https://www.jetbrains.com/help/webstorm/typescript-support.html).

## Any questions?

You can ask them [in our community](https://wi.sbis.ru). Thank you!
