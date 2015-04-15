var express = require('express');
var mongoose = require('mongoose');
var app = express();

var db = mongoose.createConnection('mongodb://localhost/hero');


db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {

   console.log("Connection to mainDB is success");

   app.set('db', db);
   require('./routes/index.js')(app);

   app.listen(3030, function(){
      console.log('--- Express start successful ---');
   });
});

