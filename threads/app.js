const { fork } = require('child_process');

const workerFunction = (array) => {
    return new Promise((resolve, reject) => {});
};

const forkFunction = (array) => {
    return new Promise((resolve, reject) => {
        const forkProcess = fork('fork.js');

        forkProcess.on('message', (msg) => {
            console.log('Получено сообщение fork', msg);
        });

        forkProcess.on('close', (code) => {
            performance.mark('forkDone');
            console.log('fork закончил работу с кодом', code);
        });

        performance.mark('forkStart');
        forkProcess.send({ array });
    });
};

const main = async () => {
    // await workerFunction([25, 19, 48, 30]);
    await forkFunction([25, 19, 48, 30]);
};

main();
