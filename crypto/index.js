const crypto = require('crypto');
const OS = require('os');

const start = performance.now();

process.env.UV_THREADPOOL_SIZE = OS.cpus().length.toString();

console.log(OS.cpus().length.toString());

for (let i = 0; i < 50; i++) {
    crypto.pbkdf2('test', 'salt', 100000, 64, 'sha512', () => {
        console.log(performance.now() - start);
    });
}
