const mongoose = require('mongoose');


const shortUrlSchema= new  mongoose.Schema({
   longUrl:String,
   shorturl:String

})


const UrlModel = new mongoose.model('shorturl',shortUrlSchema);

module.exports={UrlModel};