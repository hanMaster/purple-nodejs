const { parentPort, workerData } = require('worker_thraeds');
const { compute } = require('./factorial');

parentPort.postMessage(compute(workerData));
