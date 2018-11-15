#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const logger = console;
const source = __dirname;
const target = process.cwd();
const files = ['tsconfig.json', 'tslib.json'];

files.forEach((file) => {
   const sourceFile = path.join(source, file);
   const targetFile = path.join(target, file);
   let message = `copy ${sourceFile} to ${targetFile}`;

   try {
      fs.copyFileSync(sourceFile, targetFile);
      logger.log(`${message}: success.`);
   } catch (err) {
      logger.error(`${message}: fail.`);
      logger.error(err);
   }
});
