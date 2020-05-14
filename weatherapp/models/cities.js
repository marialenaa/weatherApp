var mongoose = require('mongoose')

var citySchema = mongoose.Schema({
    name : String, 
    desc : String,
    url : String,
    tempmin : Number,
    tempmax :  Number,
    lon: Number,
    lat:Number
});

var cityModel = mongoose.model('cities', citySchema);
module.exports = cityModel;