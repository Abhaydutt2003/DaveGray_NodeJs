const logEvents = require('./logEvents');

const EventEmitter = require('events');


const myEmitter = new EventEmitter();


myEmitter.on('log',(msg)=>logEvents(msg));

setTimeout(()=>{
    //emit event
    myEmitter.emit('log','Log Event Emitted');
},3000);
