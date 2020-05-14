var express = require('express');
var router = express.Router();
var isLogin = false

var userModel = require('../models/users')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', async function(req, res, next) {
  var exist = await userModel.findOne({
    email: req.body.email,
  })
  console.log('exist?',exist)
  if(!exist && req.body.username && req.body.password  ){
    var newuser = new userModel({
      userName: req.body.username,
      email: req.body.email,
      password: req.body.password
    })
    var newuser = await newuser.save()
    console.log(newuser)
    req.session.user = {
      name : newuser.userName, 
      id:newuser._id,
      mycities:newuser.cities
    }
    isLogin = true
    console.log('est logué?',isLogin,req.session.user)
    res.redirect('/weather') 
  }else{
    res.redirect('/');
  }
});

router.post('/signin', async function(req, res, next) {
  var exist = await userModel.findOne({
    email: req.body.email, 
    password: req.body.password
 })  
 console.log('exist',exist)
 if(exist == null){
   console.log('nul')
  res.redirect('/');
}else{
  req.session.user = {name : exist.userName, id:exist._id, mycities:exist.cities}
  isLogin = true
  console.log('est logué?',isLogin, req.session.user)
  res.redirect('/weather')
}
});

router.get('/logout', function(req, res, next){
  req.session.user = null
  isLogin = false
  res.redirect('/')
  })
  
module.exports = router;
