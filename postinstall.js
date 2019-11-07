const spawn = require('child_process').spawn;
const fs = require('fs');
const path = require('path');
const config = require('./package.json');
const logger = console;

/**
 * Executes a shell command
 * @param {String} command Command
 * @param {String} arguments Arguments
 */
async function exec(command, ...arguments) {
    return new Promise((resolve, reject) => {
        try {
            logger.log(`Executing: ${command} ${arguments.join(' ')}`);
            let proc = spawn(command, arguments, {
                stdio: 'inherit',
                cwd: __dirname
            });

            proc.on('exit', (code, signal) => {
                if (code) {
                    reject(new Error(`Command fails with code ${code}`));
                } else {
                    resolve(code, signal);
                }
            });

            process.on('SIGINT', () => {
                proc.kill('SIGINT');
                proc.kill('SIGTERM');
            });
        } catch (err) {
            reject(err);
        }
    });
}

/**
 * Creates tslib.js by read node_modules/tslib/tslib.js and wrap its contents into a self-call function
 */
async function wrapTslib() {
    const source = 'node_modules/tslib/tslib.js';
    const target = 'tslib.js';

    return new Promise((resolve, reject) => {
        logger.log(`Writing: ${path.resolve(target)}`);
        try {
            fs.readFile(source, (readErr, contents) => {
                if (readErr) {
                    reject(readErr);
                }
                const result = `/**
 * This is a runtime library for TypeScript that contains all of the TypeScript helper functions.
 * Version ${config.dependencies.tslib}
 * https://www.npmjs.com/package/tslib
 */
(function() {
${String(contents)}
})();`;
                fs.writeFile(target, result, (writeErr) => {
                    if (writeErr) {
                        reject(writeErr);
                    }
                    resolve();
                });
            });
        } catch (err) {
            reject(err);
        }
    });
}

async function postinstall() {
    await wrapTslib();
    await exec('node', 'compile', '-p', 'tslint/custom-rules').catch((err) => {
        logger.warn(err.message);
    });
}

postinstall().catch((err) => {
    logger.error('postinstall script failed:', err.message);
    process.exit(1);
});
