const fsPromises = require('fs').promises;
const path = require('path');



const fileOps = async ()=>{
    try{
        await fsPromises.unlink(path.join(__dirname,'files','newReply.txt'));
        const data = await fsPromises.readFile(path.join(__dirname,'files','starter.txt'),'utf-8');
        console.log(data);
    }catch(error){
        console.log(error);
        return;
    }
}

fileOps();






// const fs = require('fs');
// const path = require('path');





// fs.readFile(path.join(__dirname,'files','starter.txt'),'utf-8',(err,data)=>{
//     if(err){
//         throw err;
//     }else{
//         console.log(data);
//     }
// })


// console.log('hello');


// //big callback hell,to escape use promises
// fs.writeFile(path.join(__dirname,'files','reply.txt'),'Hello Abhay',(err)=>{
//     if(err) throw err;
//     console.log('write complete');

//     fs.appendFile(path.join(__dirname,'files','reply.txt'),'\n\n aloo', (err)=>{
//         if(err)throw err;
//         console.log('Appended'); 
//     });
//     fs.rename(path.join(__dirname,'files','reply.txt'),path.join(__dirname,'files','newReply.txt'),(err)=>{
//         if(err)throw err;
//         console.log('renamed');
//     });
// });


//exit on uncaught error

process.on('uncaughtException',err=>{
    console.error(`There was an uncaught exception ${err}`);
    process.exit(1);
})

