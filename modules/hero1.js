
var Vector = require('./vector.js');
var Environment = require('./env.js');

function Warior(name, a, b, str, speed, cH){ // функція конструктор 1-го персонажу
    this.name = name; // ім'я
    this.x = a; // позиція х
    this.y = b; // позиція у
    this.strenght = str; // сила
    this.speed = speed; // швидкість
    this.colorHair = cH; // колір волося
}

Warior.prototype = {
    constructor: Warior,
    clan: "Paladin",
    health: 100, // життя
    isDead: false, // чи мертвий( використовується для перевірки закінчення бою)
    range: 45, // значення range у Warior дорівнює 45 (ближній бій)
    distance: 100,
    /*
     метод для перевірки можливості атакувати противника (оскільки використовує метод checkDistance(enemy, this.range)
     в якому distance приймає параметр this.range то даний метод буде актуальний і для персонажу-нащадку)
     */
    canAttack: function(enemy){
        var vect = new Vector(this.x, this.y);
        if(vect.checkDistance(enemy, this.range) && this.health > 0){
            return true;
        }
        else{
            return false;
        }
    },

    moveTo: function(x, y){ // метод руху персонажа
        var self = this;
        var x2 = self.x;
        var y2 = self.y;
        var sX = x - x2;
        var sY = y - y2;
        var sD = Math.sqrt(sX * sX + sY * sY);
        var tanAngle = sX / sY;
        var angle = Math.atan(tanAngle);
        var vect;

        if (sD < self.distance){
            x2 = sD * Math.sin(angle);
            y2 = sD * Math.cos(angle);
        } else {
            x2 = self.distance * Math.sin(angle);
            y2 = self.distance * Math.cos(angle);
        }

        vect = new Vector(x2, y2);

        vect = Environment.wind(vect);
        vect = Environment.envRes(vect);

        x2 = vect.x;
        y2 = vect.y;

        this.x = Math.floor(x2);
        this.y = Math.floor(y2);
        console.log(this.x + ' ' + this.y);
        return this;

    },
    // метод нанесення удару противнику
    fight: function(enemy){
        if (this.canAttack(enemy)) { // робимо провірку на можливість атакувати
            var eH = enemy.health * 20;
            var strenght = Math.random() * (25 - 1) * this.strenght + 1; // обчислюємо силу удару враховуючи силу персонажу випадковим чином()
            var crit = Math.floor(Math.random() * (5 - 2 + 1)) + 2; // обчислюємо коефіцієнт критичного удару
            var h;
            if (strenght > 19 * this.strenght){ // якщо сила удару більше ніж 20 * this.strenght проводимо критичний удар з коеф. crit
                console.log('Critical strike ' + crit + 'x : ' + strenght * crit);
                eH -= strenght * crit; // віднімаємо health противника
                console.log('-----------------');
                h = (Math.round(eH / 20) > 0) ? Math.round(eH / 20) : 0;
                console.log(enemy.name + " 's health:" + h);
                console.log('');
                console.log('****************************************');
                console.log('');
                console.log('');
            }
            else{
                console.log('Power boom ' + strenght);
                eH -= strenght;
                console.log('-----------------');
                h = (Math.round(eH / 20) > 0) ? Math.round(eH / 20) : 0;
                console.log(enemy.name + " 's health:" + h);
                console.log('');
                console.log('****************************************');
                console.log('');
                console.log('');
            }
            enemy.health = Math.round(eH / 20);
            if(enemy.health <= 0){
                enemy.health = 0;
                enemy.isDead = true;
                console.log(enemy.name + " is dead");
                console.log(this.name + " is winner");
                console.log('');
                console.log('<<<<<<<<<<<<<<<<<<<<<<<<<WIN!!!>>>>>>>>>>>>>>>>>>>>>>>>>>');
                console.log('');
            }
        }
        else{ // якщо противник на недосяжній відстані виводимо наступне
            console.log(enemy.name + ' is untouchable');
            console.log('****************************************');
            console.log('');
            console.log(''); // повідомляємо, що противники недосяжний для удару
        }
        return this;
    },
    // виводить опис персонажу
    getDescription: function(){
        var d = [];
        d[0] = "Clan: " + this.clan;
        d[1] = "Name: " + this.name;
        d[2] = "Health: " + this.health;
        d[3] = "Strenght: " + this.strenght;
        d[4] = "Max speed: " + this.speed;
        d[5] = "Hair color: " + this.colorHair;
        for (var i in d){
            console.log(d[i]);
        }
        console.log('***********************************************');
        console.log('');
        return this;
    }
}

module.exports = Warior;

