#!/usr/bin/env node
const path = require('path');
const spawn = require('child_process').spawn;

const argv = process.argv.slice(2);
let command = '';
let args = [];
argv.forEach((arg, index) => {
   const [name, value] = arg.split('=', 2);
   switch (name) {
      case '--install':
         command = 'install.js';
         args = argv.slice(1 + index);
         break;
      case '--compile':
         command = 'compile.js';
         args = argv.slice(1 + index);
         break;
       case '--lint':
           command = 'lint.js';
           args = argv.slice(1 + index);
           break;
   }
});

if (!command) {
   throw new Error('Unknown command');
}

const proc = spawn(
   process.execPath,
   [path.join(__dirname,  command), ...args],
   {stdio: 'inherit'}
);

// Wait for exit
proc.on('exit', (code, signal) => {
   process.on('exit', () => {
      if (signal) {
         process.kill(process.pid, signal);
      } else {
         process.exit(code);
      }
   });
});

// Terminate child on exit
process.on('SIGINT', () => {
   proc.kill('SIGINT');
   proc.kill('SIGTERM');
   process.kill(process.pid, 'SIGINT');
});
