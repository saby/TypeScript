#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const logger = console;

function unixify(str) {
   return String(str).replace(/\\/g, '/');
}

function replaceTemplate(template, data) {
   return String(template).replace(/\${([^}]+)}/, (match, name) => {
      return name in data ? data[name] : '';
   });
}

async function copyWithPostProcessing(source, target, config, data) {
   try {
      return await new Promise((resolve, reject) => {
         if (config.link) {
            fs.symlink(source, target, (err) => {
               if (err) {
                  reject(err);
               }
               resolve();
            });
         } else {
            fs.readFile(source, (err, buffer) => {
               if (err) {
                  reject(err);
               }
               fs.writeFile(
                  target,
                  config.template ? replaceTemplate(buffer, data) : buffer,
                  (err) => {
                     if (err) {
                        reject(err);
                     }
                     resolve();
                  }
               );
            });
         }
      });
   } catch (error) {
      throw error;
   }
}

function getArgs() {
   const args = {};
   process.argv.slice(2).forEach(arg => {
      const [param, value] = arg.split('=', 2);
      if (param.startsWith('--')) {
         const name = param.substr(2);
         args[name] = value;
      }
   });
   return args;
}

const config = getArgs();
const isDevelopmentMode = config.mode === 'development';

// Processing CLI arguments into options
const options = {
   tsconfig: {
      source: isDevelopmentMode ? 'configs/es5.dev.json' : 'configs/es5.json',
      target: 'tsconfig.json',
      link: true,
      default: true
   },
   tslib: {
      source: 'tslib.js',
      target: 'tslib.js',
      link: true,
      default: true
   },
   tslint: {
      source: 'tslint/export.json',
      target: 'tslint.json',
      link: true,
      default: true
   }
};

Object.keys(config).forEach(name => {
   if (name in options) {
      const value = config[name];
      options[name].target = value;
      options[name].default = true;

      // Prevent copy for WS postinstall script
      if (name === 'tslib' && value === 'WS.Core/ext/tslib.js') {
         options[name].link = false;
      }
   }
});

const source = path.resolve(__dirname, '..');
const target = process.cwd();

let relativeSource = unixify(path.relative(target, source));
if (!relativeSource.startsWith('.')) {
   relativeSource = './' + relativeSource;
}

// Copy files with replace
const data = {
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

   copyWithPostProcessing(sourcePath, targetPath, option, data).then(() => {
      logger.log(`${message}: success.`);
   }).catch((err) => {
      logger.error(`${message}: fail.`);
      logger.error(err.message);
   });
});
