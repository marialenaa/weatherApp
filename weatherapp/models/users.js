var mongoose = require('mongoose')

var citiesSchema = mongoose.Schema({
    name : String, 
    desc : String,
    url : String,
    tempmin : Number,
    tempmax :  Number,
    lon: Number,
    lat:Number
});

var userschema = mongoose.Schema ({
    userName: String,
    email: String,
    password: String,
    cities : [citiesSchema],
});

var userModel = mongoose.model('users', userschema);
module.exports = userModel;