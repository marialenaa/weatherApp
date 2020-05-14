var express = require('express');
var router = express.Router();

var request = require('sync-request');

var cityModel = require('../models/cities')
var userModel = require('../models/users')

/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('login');
});

router.get('/weather', async function(req, res, next) {
if(req.session.user == null){
res.redirect('/')
}else{
  var cityList = await cityModel.find()
  res.render('weather', {cityList, mycities:req.session.user.mycities});
}
});

router.post('/addcity', async function(req, res, next) {  
  var result = request("GET", `http://api.openweathermap.org/data/2.5/weather?q=${req.body.cityFront}&lang=fr&appid=60703ffeff7b9f56af3212ba332be9d9&units=metric`);
  var resultCityJSON = JSON.parse(result.body);
  // pour add une ville sur la liste FAVORIS
  console.log(req.session.user, req.body.cityFront)
  var mycities = req.session.user.mycities
   mycities.push({
      name : req.body.cityFront, 
      desc : resultCityJSON.weather[0].description,
      url : `http://openweathermap.org/img/wn/${resultCityJSON.weather[0].icon}@2x.png`,
      tempmin : resultCityJSON.main.temp_min,
      tempmax :  resultCityJSON.main.temp_max,
      lon : resultCityJSON.coord.lon,
      lat : resultCityJSON.coord.lat,
   })
   console.log(req.session.user)

// SECTION POUR ADD UNE VILLE DANS CITYLIST LA BASE DE DONNEE MONGODB
//   var  exist = await cityModel.findOne(
//  {name : req.body.cityFront}
//   )
//   if(resultCityJSON.name && exist == null){
//     var mycities = new cityModel ({
//       name : req.body.cityFront, 
//       desc : resultCityJSON.weather[0].description,
//       url : `http://openweathermap.org/img/wn/${resultCityJSON.weather[0].icon}@2x.png`,
//       tempmin : resultCityJSON.main.temp_min,
//       tempmax :  resultCityJSON.main.temp_max,
//       lon : resultCityJSON.coord.lon,
//       lat : resultCityJSON.coord.lat,
//     })
//    await mycities.save()
//   }
  var cityList = await cityModel.find();
  // console.log(req.session.cityList)
  res.render('weather', {cityList, mycities:req.session.user.mycities});
});

router.get('/deletecity', async function(req, res, next) {
await cityModel.deleteOne(
{_id : req.query.id}
)

var cityList = await cityModel.find();
res.render('weather', {cityList });
});

router.get('/update', async function(req, res, next) {
 var cityList = await cityModel.find();
  
 for(var i=0; i<cityList.length;i++){
    var result = request("GET", `http://api.openweathermap.org/data/2.5/weather?q=${cityList[i].name}&lang=fr&appid=60703ffeff7b9f56af3212ba332be9d9&units=metric`);
    var resultCityJSON = JSON.parse(result.body);
  
  await cityModel.updateOne({
   _id: cityList[i].id 
  },{
    name : cityList[i].name, 
    desc : resultCityJSON.weather[0].description,
    url : `http://openweathermap.org/img/wn/${resultCityJSON.weather[0].icon}@2x.png`,
    tempmin : resultCityJSON.main.temp_min,
    tempmax :  resultCityJSON.main.temp_max
  })
}
   cityList = await cityModel.find()
  res.render('weather', {cityList});
});

module.exports = router;
