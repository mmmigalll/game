var express = require('express');

var app = express();


var Warior = require('./modules/hero1.js');
var Wizard = require('./modules/hero2.js');

var war = new Warior("Misha", 0, 0, 25, 100, "Red");
var wiz = new Wizard("Petya", 0, 0, 25, 50, 60, "White");
war.moveTo(10, 20).fight(wiz);


app.listen(3000, function(){
   console.log("___Server Up successfully___");
});