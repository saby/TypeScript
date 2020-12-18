const spawn = require('child_process').spawn;
const fs = require('fs');
const path = require('path');
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
    return new Promise((resolve, reject) => {
        const source = require.resolve('tslib/tslib.js');
        const target = path.resolve('tslib.js');

        logger.log(`Writing: ${target} taken from ${source}`);
        try {
            const config = require(path.join(path.dirname(source), 'package.json'));

            fs.readFile(source, (readErr, contents) => {
                if (readErr) {
                    reject(readErr);
                }
                const result = `/**
 * ${config.description}
 * Version: ${config.version}
 * URL: ${config.repository.url}
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
    //await wrapTslib();
    await exec('node', 'cli/compiler', '-p', 'tslint/custom-rules').catch((err) => {
        logger.warn(err.message);
    });
}

postinstall().catch((err) => {
    logger.error('postinstall script failed:', err.message);
    process.exit(1);
});
