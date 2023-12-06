const { fork } = require('child_process');
const { Worker } = require('worker_threads');

const workerFunction = (array) => {
    return new Promise((resolve, reject) => {
        const worker = new Worker('./worker.js', {
            workerData: {
                array,
            },
        });

        worker.on('message', (msg) => {
            resolve(msg);
        });
    });
};

const forkFunction = (array) => {
    return new Promise((resolve, reject) => {
        const forkProcess = fork('./fork.js');

        forkProcess.on('close', (code) => {
            resolve();
        });

        forkProcess.send({ array });
    });
};

const main = async () => {
    performance.mark('workerStart');
    await workerFunction([25, 19, 48, 30]);
    performance.mark('workerDone');
    performance.measure('worker', 'workerStart', 'workerDone');
    console.log(performance.getEntriesByName('worker').pop());

    performance.mark('forkStart');
    await forkFunction([25, 19, 48, 30]);
    performance.mark('forkDone');
    performance.measure('fork', 'forkStart', 'forkDone');
    console.log(performance.getEntriesByName('fork').pop());
};

main();
