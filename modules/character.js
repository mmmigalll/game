var vector = require('./vector2d.js');

function Def_character() {
};

Def_character.prototype = {
    id: 0,
    hit_length: 10,
    con: 1,
    str: 1,
    dex: 10,
    int: 1,
    men: 1,
    cur_pos: new vector(1, 1),
    end_pos: new vector(1, 1),
    getWind: function (v) {
        var length = v.length();
        var koef = this.left_length / length;
        var a = (koef * v.x * this.canvas.wind.x + koef * v.y * this.canvas.wind.y) / ( this.left_length * this.left_length );
        return 1 + a;
    },
    moveOneFrame: function (path) {

        while (!!this.left_length) {
            if (path.length) {
                var endPos = new vector(path[0].x, path[0].y);
                var result = this.move(endPos);
                if (!!result) {
                    if (path.length) {
                        path.shift();
                    }
                } else {
                    this.left_length = this.dex;
                    return 0;
                }
            } else {
                return 0;
            }
        }
    },
    move: function (endPos) {
        this.left_length = this.dex;
        endPos = new vector(endPos.x, endPos.y)
        this.end_pos = endPos;

        var distance = endPos.subtract(this.cur_pos);
        var length = distance.length();
        var realSpeedLength = this.left_length * this.getWind(distance);

        if (length < realSpeedLength) {
            this.cur_pos = endPos;
            this.left_length = (realSpeedLength - length) / this.getWind(distance);
            return 1;
        } else {
            this.cur_pos = vector.lerp(this.cur_pos, endPos, (realSpeedLength / length));
            this.left_length = 0;
            return 0;
        }

        (this.cur_pos.x > this.canvas.width) ? this.canvas.width : this.cur_pos.x;
        (this.cur_pos.x < 0) ? 0 : this.cur_pos.x;
        (this.cur_pos.y > this.canvas.height) ? this.canvas.width : this.cur_pos.y;
        (this.cur_pos.y < 0) ? 0 : this.cur_pos.y;
    },
    fight: function (char) {
        var distance = this.cur_pos.subtract(char.cur_pos);
        var length = distance.length();
        if (length < 0) {
            length.negative();
        }
        if (length <= this.hit_length) {
            (char.cur_hp >= this.hit) ? char.cur_hp -= this.hit : char.cur_hp = 0;
        } else {
            this.move(char.cur_pos);
        }
    },
    get_hit: function (n) {
        if (n) {
            return this.str * 10;
        } else {
            return this.int * 10;
        }
    },
    def_hp: function () {
        return this.con * 100;
    },
    def_mp: function () {
        return this.men * 100;
    },
    enterCanvas: function (canvas) {
        canvas.addChar(this);
        this.canvas = canvas;

    }
};

function charClass(char, classNum) {
    if (classNum === 0) {
        char.con *= 3;
        char.str *= 2;
        char.hit = char.get_hit(1);
    } else if (classNum === 1) {
        char.int *= 2;
        char.men *= 3;
        char.hit = char.get_hit(0);
        char.hit_length = 2;
    } else if (classNum === 2) {
        char.con *= 2;
        char.str *= 4;
        char.hit = char.get_hit(1);
        char.hit_length = 3;
    }
    ;
};

function Human(classNum) {
    this.con *= 3;
    this.str *= 2;
    this.dex *= 3;
    charClass(this, classNum);
    this.cur_hp = this.def_hp();
    this.cur_mp = this.def_mp();
    this.left_length = this.dex;
};

Human.prototype = new Def_character();
Human.prototype.constructor = Human;
Human.def_class = Def_character.prototype;

function Orc(classNum) {
    this.con *= 3;
    this.str *= 3;
    this.dex *= 2;
    this.int *= 2;
    charClass(this, classNum);
    this.cur_hp = this.def_hp();
    this.cur_mp = this.def_mp();
    this.left_length = this.dex;
};

Orc.prototype = new Def_character();
Orc.prototype.constructor = Orc;
Orc.def_class = Def_character.prototype;

function Elf(classNum) {
    this.str *= 2;
    this.dex *= 5;
    this.int *= 3;
    this.men *= 2;
    charClass(this, classNum);
    this.cur_hp = this.def_hp();
    this.cur_mp = this.def_mp();
    this.left_length = this.dex;
};

Elf.prototype = new Def_character();
Elf.prototype.constructor = Elf;
Elf.def_class = Def_character.prototype;

function Character(id, name, race, char_class) {
    this.id = id;
    this.name = name;
    if (race == 0) {
        Human.call(this, char_class);
    } else if (race == 1) {
        Orc.call(this, char_class);
    } else if (race == 0) {
        Elf.call(this, char_class);
    }
    ;
};

Character.prototype = new Def_character();
Character.prototype.constructor = Character;
Character.def_class = Def_character.prototype;

module.exports = Character;