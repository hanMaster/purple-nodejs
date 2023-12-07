const { fork } = require('child_process');
const { Worker } = require('worker_threads');
const perf_hooks = require('perf_hooks');

const performanceObserver = new perf_hooks.PerformanceObserver((items, observer) => {
    const worker = items.getEntriesByName('workerFunction').pop();
    console.log(`${worker.name}: ${worker.duration}`);
    const fork = items.getEntriesByName('forkFunction').pop();
    console.log(`${fork.name}: ${fork.duration}`);
    observer.disconnect();
});

performanceObserver.observe({ entryTypes: ['measure'] });

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
    performance.mark('wStart');
    await workerFunction([25, 19, 48, 30]);
    performance.mark('wEnd');
    performance.mark('fStart');
    await forkFunction([25, 19, 48, 30]);
    performance.mark('fEnd');
    performance.measure('workerFunction', 'wStart', 'wEnd');
    performance.measure('forkFunction', 'fStart', 'fEnd');
};

main();
