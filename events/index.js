const EventEmitter = require('events');

const myEmitter = new EventEmitter();

const logDbConnection = () => {
    console.log('DB connected');
};

myEmitter.addListener('connected', logDbConnection);

myEmitter.emit('connected');

myEmitter.removeListener('connected', logDbConnection);
// myEmitter.off('connected', logDbConnection);
// myEmitter.removeAllListeners('connected');

myEmitter.emit('connected');

myEmitter.on('msg', (data) => {
    console.log(data);
});

myEmitter.emit('msg', 'hello');
