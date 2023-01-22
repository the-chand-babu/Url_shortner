const express = require('express');
const redis = require('redis');
const router = express.Router();
const shortid=require('shortid');


const {UrlModel} = require('../config/model')


router.get('/data',async(req,res)=>{
    const data = await UrlModel.find();
    res.status(200).send({status:true,message:"all data",data});
})

router.get('/:url',async(req,res)=>{
        
        const shorturl=req.params.url;
        
        if(!shorturl){
            return res.send({"message":"provide short url"});
        }
       
        const url= await UrlModel.findOne({shorturl});
        if(!url) return res.status(404).send({message:'not found'});

        const {longUrl}=url
        console.log(longUrl);
        res.redirect(longUrl)
        
      
})


router.post('/',async(req,res)=>{
    console.log(req.body);
    if(Object.keys(req.body).length==0){
        return res.status(400).send({ status: false, message: "Invalid request:Please provide longUrl in the Body" })
    }
    const longUrl = req.body.url;
    if (typeof longUrl !== "string") {
        return res.status(400).send({ status: false, message: "longUrl must be in String" })
    }
   
   
    const catchUrl =await UrlModel.findOne({longUrl});
 
    if(catchUrl){
        return res.status(200).send({status:true,message:"already present"});
    }
    console.log(longUrl)
    const shorturl = shortid.generate();
    const data = new UrlModel({longUrl,shorturl});
    await data.save();
    res.status(200).send({status:true,message:"shorturl created",shorturl})
})







module.exports={router}