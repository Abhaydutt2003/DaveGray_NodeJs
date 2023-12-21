import { existsSync, mkdir, rmdir } from 'fs';

if(!existsSync('./new')){
    mkdir('./new',(err)=>{
        if(err) throw err;
        console.log('created');
    })
}


if(existsSync('./new')){
    rmdir('./new',(err)=>{
        if(err) throw err;
        console.log('removed');
    })
}