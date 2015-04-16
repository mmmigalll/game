var vector = require('./vector2d.js');

function random(canvas) {
    return new vector((Math.random() * canvas.width), (Math.random() * canvas.height)).convertToInt();
};

function myCanvas(width, height) {
    this.heroes=[];
    this.lastId = 0;
    this.width = width;
    this.height = height;
    this.wind = new vector(0, 0);
};
myCanvas.prototype.setWind = function (wind_speed, wind_angle) {
    if (wind_speed && wind_angle) {
        this.wind = this.wind.angleVector(wind_angle).multiply(wind_speed);
    };
};
myCanvas.prototype.addChar = function (hero) {
    hero.cur_pos = random(this);
    this.heroes.push(hero);
};

module.exports = myCanvas;