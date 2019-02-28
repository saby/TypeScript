#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const logger = console;

function unixify (str) {
   return String(str).replace(/\\/g, '/');
}

function replaceTemplate(template, data) {
   return String(template).replace(/\${([^}]+)}/, (match, name) => {
      return name in data ? data[name] : '';
   });
}

async function copyWithPostProcessing(source, target, data) {
   try {
      return await new Promise((resolve, reject) => {
         fs.readFile(source, (err, buffer) => {
            if (err) {
               reject(err);
            }

            fs.writeFile(
               target,
               data ? replaceTemplate(buffer, data) : buffer,
               (err) => {
                  if (err) {
                     reject(err);
                  }

                  resolve(String(buffer).length);
               }
            );
         });
      });
   } catch (error) {
      throw error;
   }
}

// Processing CLI arguments into options
const options = {
   tsconfig: {
      source: 'templates/tsconfig.json',
      target: 'tsconfig.json',
      default: true,
      template: true
   },
   tslib: {
      source: 'tslib.js',
      target: 'tslib.js',
      default: false
   },
   tslint: {
      source: 'templates/tslint.json',
      target: 'tslint.json',
      default: true
   }
};
process.argv.slice(2).forEach(arg => {
   const [param, value] = arg.split('=', 2);
   if (param.startsWith('--')) {
      const name = param.substr(2);
      if (name in options) {
         options[name].target = value;
         options[name].default = true;
      }
   }
});

const source = __dirname;
const target = process.cwd();

let relativeSource = unixify(path.relative(target, source));
if (!relativeSource.startsWith('.')) {
   relativeSource = './' + relativeSource;
}

// Copy files with replace
const config = {
   nodePath: relativeSource
};

Object.keys(options).forEach((param) => {
   const option = options[param];
   if (!option.default) {
      return;
   }
   const sourceFile = option.source;
   const targetFile = option.target;
   const sourcePath = path.join(source, sourceFile);
   const targetPath = path.join(target, targetFile);
   let message = `copying '${sourcePath}' to '${targetPath}'`;

   copyWithPostProcessing(sourcePath, targetPath, option.template ? config : null).then(() => {
      logger.log(`${message}: success.`);
   }).catch((err) => {
      logger.error(`${message}: fail.`);
      logger.error(err);
   });
});
