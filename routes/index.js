/**
 * Created by soundstorm on 28.03.15.
 */
module.exports = function(app, arena){
    var character = require('../modules/character.js');
    var path = require('path');

    app.post('/addChar', function (req, res, next) {
        var body = req.body;
        var char = {};
        char.id = arena.lastId;
        arena.lastId += 1;
        (body.name) ? char.name = body.name : char.name = '';
        (body.race) ? char.race = body.race : char.race = 0;
        (body.class) ? char.class = body.class : char.class = 0;
        var hero = new character(char.id, char.name, char.race, char.class);
        hero.enterCanvas(arena);
        console.log('Hero created and went to arena:');
        console.dir(char);
        console.dir(hero.cur_pos);
    });

    app.post('/:id/moveTo', function (req, res, next) {
        var body = req.body;
        arena.heroes.forEach(function(hero){
            if (hero.id == req.params.id) {
                if (body.x && body.y) {
                    var cur_pos = hero.cur_pos;
                    hero.move({"x":body.x, "y":body.y});
                    console.log('Hero, ', hero.name, ', moved to ', hero.end_pos, 'from: ', cur_pos);
                    console.log('Stoped at {' + hero.cur_pos.x + ', ' + hero.cur_pos.y + '}');
                } else {
                    hero.move(hero.end_pos);
                }
            }
        });
    });
    app.get('/:id/fight/:target_id', function (req, res, next) {
        var body = req.body;
        var hero_attacker;
        var hero_target;

        arena.heroes.forEach(function(hero) {
            if (hero.id == req.params.id) {
                hero_attacker = hero;
            } else if (hero.id == req.params.target_id ){
                hero_target = hero;
            }
        });
        if (hero_attacker && hero_target) {
            if (hero_target.cur_hp > 0) {
                hero_attacker.fight(hero_target);
                console.log(hero_attacker.cur_pos, hero_attacker.end_pos);
                console.log(hero_target.cur_pos, hero_target.end_pos);
                console.dir(hero_target.cur_hp);
                res.status(200).send(hero_attacker.name + " is moving");
            } else {
                res.status(200).send(hero_target.name + " is allready dead!");
            }
        } else {
            console.log('Wrong ids');
            return
        }
    });
};
