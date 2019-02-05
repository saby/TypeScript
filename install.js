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

async function copyTemplate(source, target, data) {
   try {
      return await new Promise((resolve, reject) => {
         fs.readFile(source, (err, buffer) => {
            if (err) {
               reject(err);
            }

            fs.writeFile(target, replaceTemplate(buffer, data), (err) => {
               if (err) {
                  reject(err);
               }

               resolve(String(buffer).length);
            });
         });
      });
   } catch (error) {
      throw error;
   }
}

const source = __dirname;
const target = process.cwd();

let relativeSource = unixify(path.relative(target, source));
if (!relativeSource.startsWith('.')) {
   relativeSource = './' + relativeSource;
}

// Processing CLI arguments into options
const options = {
   tsconfig: 'tsconfig.json'
   tslint: 'tslint.json'
};
process.argv.slice(2).forEach(arg => {
   const [name, value] = arg.split('=', 2);
   switch (name) {
      case '--tsconfig':
         options.tsconfig = value;
         break;
      case '--tslint':
         options.tsconfig = value;
         break;
   }
});

// Copy files with replace
const config = {
   nodePath: relativeSource
};
const files = {
   'templates/tsconfig.json': options.tsconfig
   'templates/tslint.json': options.tslint
};
Object.keys(files).forEach((sourceFile) => {
   const sourcePath = path.join(source, sourceFile);
   const targetPath = path.join(target, files[sourceFile]);
   let message = `copying '${sourcePath}' to '${targetPath}'`;

   copyTemplate(sourcePath, targetPath, config).then(() => {
      logger.log(`${message}: success.`);
   }).catch((err) => {
      logger.error(`${message}: fail.`);
      logger.error(err);
   });
});
