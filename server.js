var express = require('express');

var app = express();


require('./routes')(app);

app.listen(3000, function(){
   console.log("___Server Up successfully___");
});