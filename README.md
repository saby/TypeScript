# Saby's environment for TypeScript

This environment contains basic setups and patterns for [TypeScript](https://www.typescriptlang.org/) in Saby such as recommended version, preferred configuartion file `tsconfig.json` and this instruction.

## How to include in your own project

**Firstly**. Your project must [follow npm architecture](https://docs.npmjs.com/cli/init). You need to [Node.js](https://nodejs.org/) being installed on your computer. The easiest first step to start is execute this command:
```bash
npm init
```
You have to answer several simple questions. After that you'll have the new file `package.json` in your project.

**Secondly**. Add dependency in your `package.json` file at `dependencies` section like this:
```javascript
"dependencies": {
  "saby-typescript": "git+https://github.com:saby/TypeScript.git#rc-x.x.xxx"
}
```
You should replace `x.x.xxx` with actual version. For example, `3.18.700`. 

**Thirdly**. Also add a pair of scripts at `scripts` section like this:
```javascript
"scripts": {
  "postinstall": "node node_modules/saby-typescript/install",
  "compile": "node node_modules/saby-typescript/compile"
}
```

It's almost ready now!

**Fourthly**. Just install your package dependencies using this command:
```bash
npm install
```

## How to use

You've got a new file `tsconfig.json` in your project as result of previous command execute. This file is necessary to compile your `.ts` files to `.js` files. You can find out more information about it on [TypeScript site](https://www.typescriptlang.org/).

Now it's simply to compile your project manually using command line:
```bash
npm run compile
```

Of course you can setup an IDE you prefer to your convenience. It allows you compile `.ts` files automatically every time you change them.
For example, if you use WebStorm IDE you can read its own [developer's manual](https://www.jetbrains.com/help/webstorm/typescript-support.html).

## Any questions?

You can ask them [in our community](https://wi.sbis.ru). Thank you!
