const mongoose = require('mongoose');
require('dotenv').config();
const connection = mongoose.connect("pass mongo db url");


module.exports={connection};