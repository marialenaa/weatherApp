var mongoose = require('mongoose')

var options = {
   connectTimeoutMS: 5000,
   useNewUrlParser: true,
       useUnifiedTopology : true , 
  }

  mongoose.connect('mongodb+srv://wUser:weatheruser@cluster0-n3oho.mongodb.net/weatherapp?retryWrites=true&w=majority',
   options,    
   function(err) {
      if (err) {
      console.log('*** DB ERROR:', err);
   } else {
    console.log('*** DB OK');
}}
  );

  module.exports = mongoose

  
