const express = require('express');
const cors=require('cors');
const {connection}= require('./config/db');
const {router}=require('./router/router');


const app = express();
app.use(cors());
app.use(express.json({extended:false}));
app.use('/',router);













app.listen(process.env.Port||3810,async()=>{
    try{
        await connection;
        console.log("port is lisning 3810");
    }catch(err){
        console.log("err from db connect");
        console.log(err);
    }
   
})