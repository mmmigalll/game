var character = require('./modules/character.js');
var arena = require('./modules/canvas.js');
var express = require('express');
var path = require('path');
var http = require('http');
var bodyParser = require('body-parser');
var vector = require('./modules/vector2d.js');
var app = express();
var server;

//app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json({strict: false, limit: 1024 * 1024 * 200}));
app.use(bodyParser.urlencoded({extended: false}));

/*var hero1 = new character('Pupkin1', 0, 0);
var hero2 = new character('Pupkin2', 1, 0);*/



arena.setWind(100, 45);


require('./routes')(app, arena);

server = http.createServer( app );
server.listen(3030, function() {
    console.log('Server started on port 3030\n');
});
/*hero1.enterCanvas(arena);
hero2.enterCanvas(arena);

var hero1path = [{"x":10, "y":50}, {"x":400, "y":250}];
var hero2path = [{"x":10, "y":50}, {"x":400, "y":250}];

while (!!hero1path.length && !!hero2path.length && !!hero1.cur_hp && !!hero2.cur_hp) {
    var h1start = hero1.cur_pos;
    var h2start = hero2.cur_pos;

    hero1.fight(hero2);
    hero2.fight(hero1);

    hero1.moveOneFrame(hero1path);
    hero2.moveOneFrame(hero2path);

    console.log('Hero1 moved from {' + h1start.x + ', ' + h1start.y + '} to {' + hero1.cur_pos.x + ', ' + hero1.cur_pos.y + '}, health: ' + hero1.cur_hp);
    console.log('Hero2 moved from {' + h2start.x + ', ' + h2start.y + '} to {' + hero2.cur_pos.x + ', ' + hero2.cur_pos.y + '}, health: ' + hero2.cur_hp);
};*/
//console.log('--- Hero1.cur_hp ---', hero1.cur_hp);
//console.log('--- Hero2.cur_hp ---', hero2.cur_hp);

//var canvas = document.createElement("canvas");
//var ctx = canvas.getContext("2d");
//canvas.width = 500;
//canvas.height = 500;
//document.body.appendChild(canvas);
//
//var bgReady = false;
//var bgImage = new Image();
//bgImage.onload = function () {
//    bgReady = true;
//};
//bgImage.src = 'images/background.jpg';
//
//var heroReady = false;
//var heroImage = new Image();
//heroImage.onload = function () {
//    heroReady = true;
//};
//heroImage.src = "images/hero.png";
//
//function render() {
//    if (bgReady) {
//        ctx.drawImage(bgImage, 0, 0);
//    }
//    if (heroReady) {
//        ctx.drawImage(heroImage, 10, 10);
//    }
//};
//
//var main = function () {
//    render();
//    // Request to do this again ASAP
//    requestAnimationFrame(main);
//};
//main();