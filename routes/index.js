
module.exports = function(app) {

    var mongoose = require('mongoose');
    var Warior = require('../modules/hero1.js');
    var Wizard = require('../modules/hero2.js');
    var schema = mongoose.Schema;
    var war = new Warior("MIsha", 0, 0, 25, 100, "red");

    var wiz = new Wizard("Petya", 0, 0, 25, 50, 60, "White");
     // створюємо масив героїв, з якого по id будемо витягати певного героя
    var db = app.get('db');
    var HeroModel;

    heroSchema = new schema({ // схема для збереження в базу (на мою думку така!!!!, Ви може думаєте по інакшому)
        id: Number,
        currentPosition: {
            x: Number,
            y: Number
        },
        health: Number,
        moveToPosition: {
            x: Number,
            y: Number
        }
    }, {collection: 'heroesStats'});

    HeroModel = db.model('heroSchema', heroSchema);

    app.post('/hero', function(req, res, next){
        var body = req.body;
        war = new Warior(body.name, body.x, body.y, body.strenght, body.speed, body.colorHair);
        var insertObj = {
            id: body.id,
            currentPosition: {x: body.x, y: body.y},
            health: war.health,
            moveToPosition: {x: body.x, y: body.y}
        }
        var hero = new HeroModel(insertObj);
        hero.save(function(err){
            if(err){
                return res.status(500).send(err);
            }
            res.status(200).send(war.name + ' added successfully');
        })
    });
    var heroes = [war, wiz];
    app.get('/moveTo/:id', function(req, res, next){
        var id = req.params.id;
        var hero = heroes[id];
        var moveToX;
        var moveToY;
        var insertObj;
        var currPos;
        var moveToPos;
        var insHero;
        var findObj = {
            id: id
        };
        var projectObj = {
            _id: 0,
            __v: 0
        }

        HeroModel.find(findObj, projectObj).exec(function(err, result){
            if (err){
                return res.status(500).send('Error');
            }
            if (result){
                moveToX = result.moveToPosition.x;
                moveToY = result.moveToPosition.y;

                hero.x = result.currentPosition.x;
                hero.y = result.currentPosition.y;
                hero.health = result.health;

                hero.moveTo(moveToX, moveToY);
                currPos = {
                    x: hero.x,
                    y: hero.y
                };

                moveToPos = {
                    x: moveToX,
                    y: moveToY
                };

                insertObj = {
                    id: id,
                    currentPosition: currPos,
                    health: hero.health,
                    moveToPosition: moveToPos
                };

                insHero = new HeroModel(insertObj);
                insHero.save(function(err){
                    if (err){
                        return res.status(500).send('Error');
                    }
                    res.status(200).send(hero.name + ' is moving');
                });

            } else {
                res.status(500).send('Use moveTo/id/x/y/');
            }
        });
    });
    app.get('/moveTo/:id/:x/:y', function(req, res, next){
        var id = req.params.id; // id героя в масиві. в загальному випадку від 0 до 9
        var x = req.params.x;
        var y = req.params.y;
        var hero = heroes[id];


        var moveToX;
        var moveToY;
        var insertObj;
        var currPos;
        var moveToPos;
        var insHero;
        var findObj = {
            id: id
        };
        var projectObj = {
            _id: 0,
            __v: 0
        };
        HeroModel.find(findObj, projectObj).exec(function(err, result){
            if (err){
                return res.status(500).send('Error');
            }
            if (result){
                moveToX = x;
                moveToY = y;

                /*hero.x = result[0].currentPosition.x;
                hero.y = result[0].currentPosition.y;*/
                hero.health = result[0].health;

                hero.moveTo(moveToX, moveToY);
                currPos = {
                    x: hero.x,
                    y: hero.y
                };

                moveToPos = {
                    x: x,
                    y: y
                };

                insertObj = {
                    id: id,
                    currentPosition: currPos,
                    health: hero.health,
                    moveToPosition: moveToPos
                };

                //insHero = new HeroModel(insertObj);
                HeroModel.update({id: id}, insertObj ,function(err){
                    if (err){
                        return res.status(500).send('Error');
                    }
                    res.status(200).send(hero.name + ' is moving');
                });

            }
        });
    });
}