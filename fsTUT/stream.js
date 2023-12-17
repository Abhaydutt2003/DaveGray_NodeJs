const fs = require('fs');

const rs = fs.createReadStream('./files/lorem.txt','utf-8');

const ws = fs.createWriteStream('./files/newLorem.txt');

rs.on('data',(datachunk)=>{
    ws.write(datachunk);
});

