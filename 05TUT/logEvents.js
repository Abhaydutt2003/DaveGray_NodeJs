const {format} = require('date-fns');
const {v4:uuid } = require('uuid');

//core
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const logEvents = async(message,fileName)=>{
    const dateTime  = `${format(new Date(),'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
    try{
        if(!fs.existsSync(path.join(__dirname,'logs'))){
            await fsPromises.mkdir(path.join(__dirname,'logs'));
        }
        await fsPromises.appendFile(path.join(__dirname,'logs',fileName),logItem);
    }catch(err){
        console.log(err);
        return;
    }
}

module.exports = logEvents;