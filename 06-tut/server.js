const path = require("path");
const PORT = process.env.PORT || 3500;
const express = require("express");
const app = express();

app.get("^/$|/index(.html)?", (req, res) => {
    //res.sendFile('./views/index.html',{root:__dirname});
    res.sendFile(path.join(__dirname,'views','index.html'));
});

app.get('/new-page(.html)?',(req,res)=>{
    res.sendFile(path.join(__dirname,'views','new-page.html'));
});

app.get('/old-page(.html)?',(req,res)=>{
    res.redirect(301,'/new-page.html');//302 by defualt 
});

//route handling

const one = (req,res,next)=>{
    console.log('Hell0 1');
    next();
} 
const two = (req,res,next)=>{
    console.log('Hell0 2');
    next();
} 
const three = (req,res,)=>{
    console.log('Hell0 3');
} 

app.get('/chain(.html)?',[one,two,three]);

app.get('/*',(req,res)=>{
    return res.status(404).sendFile(path.join(__dirname,'views','404.html'));
})



app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
