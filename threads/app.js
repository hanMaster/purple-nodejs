const { fork } = require('child_process');
const { Worker } = require('worker_threads');
const { PerformanceObserver } = require('perf_hooks');

const performanceObserver = new PerformanceObserver((items, observer) => {
    items.getEntries().forEach((e) => {
        console.log(`${e.name}: ${e.duration}`);
    });
    observer.disconnect();
});

performanceObserver.observe({ entryTypes: ['measure'] });

const workerFunction = (array) => {
    return new Promise((resolve, reject) => {
        const worker = new Worker('./worker.js', {
            workerData: { array },
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

/**
 * workerFunction: 991.9622000008821
 * forkFunction: 1198.59090000391
 *
 * workerFunction: 1003.6624000072479
 * forkFunction: 1225.521899998188
 */
