
module.exports = function(app) {
    var mongoose = require('mongoose');
    var Warior = require('../modules/hero1.js');
    var Wizard = require('../modules/hero2.js');
    var schema = mongoose.Schema;
    var war = new Warior("Misha", 0, 0, 25, 100, "Red");
    var wiz = new Wizard("Petya", 0, 0, 25, 50, 60, "White");
    var heroes = [war, wiz]; // створюємо масив героїв, з якого по id будемо витягати певного героя

    heroSchema = new schema({ // схема для збереження в базу (на мою думку така!!!!, Ви може думаєте по інакшому)
        id: Number,
        currentPosition: {x: Number, y: Number},
        health: Number,
        moveToPosition: {x: Number, y: Number}
    });

    app.get('/moveTo/:id', function(req, res, next){
        // потрібно витягувати moveToPosition для заданого id і рухатися далі туди, а потім перезаписати в базу

    });
    app.get('/moveTo/:id/:x/:y', function(req, res, next){
        var id = req.params.id; // id героя в масиві. в загальному випадку від 0 до 9
        var x = req.params.x;
        var y = req.params.y;
        var hero = heroes[id];
        hero.moveTo(x, y);

        // update в базу героя з id

        //hero.moveTo(x, y);
        res.status(200).send(hero.name + " is moving");
    });
}