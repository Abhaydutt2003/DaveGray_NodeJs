const mongoose = require('mongoose');


//mongoose is PROMISE based
const connectDb = async ()=>{
    try{
        await mongoose.connect(process.env.DATABASE_URI,{
            useUnifiedTopology:true,
            useNewUrlParser:true
        })
    }catch(error){
        return console.log(error);
    }
}

module.exports = connectDb;