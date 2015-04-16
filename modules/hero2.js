function timeOut (time){	// для затримки часу між ходами противників (використаний таймер з Д/З №5)
    var start = Date.now();
    while(Date.now() - start <= time * 1000){
        if (((Date.now() - start) / 1000) < time)
            continue;
        else
            return;
    }
}

var Vector = require('./vector.js');
var Warior = require('./hero1.js');

function Wizard(name, a, b, str, magic ,speed, cH){ // функція конструктор 2-го персонажу. Клас має такі самі всастивості, лише додається властивість magic
    Warior.call(this, name, a, b, str, speed, cH);
    this.magic = magic; // магічні сили (викоистовуються для можливості використання скілу TORNADO)
}

Wizard.prototype = new Warior(); // встановлюємо наслідування Wizard від Warior
Wizard.prototype.constructor = Wizard;

// доповнюємо(вдосконалюємо) персонаж Wizard
Wizard.prototype.clan = "White Priest"
Wizard.prototype.range = 60; // значення range у Wizard дорівнює 60 (дальній бій)
Wizard.prototype.fight = function(enemy){ // перевизначаємо метод fight у персонажа нащадка
    if(this.canAttack(enemy)){
        var eH = enemy.health * 20;
        var strenght = Math.random() * (17 - 1) * this.strenght + 1;
        var h;
        if(strenght > 13 * this.strenght && this.magic > 0){
            console.log('Tornado was wake up!!! ' + strenght * 6);
            eH -= strenght * 6;
            this.magic -= 25;
            console.log('-----------------');
            h = (Math.round(eH / 20) > 0) ? Math.round(eH / 20) : 0;
            console.log(enemy.name + "'s health:" + h);
            console.log('');
            console.log('****************************************');
            console.log('');
            console.log('');
        }
        else{
            console.log('Fire: ' + strenght);
            eH -= strenght;
            console.log('-----------------');
            h = (Math.round(eH / 20) > 0) ? Math.round(eH / 20) : 0;
            console.log(enemy.name + "'s health:" + h);
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
    else
    {
        console.log(enemy.name + ' is untouchable'); // повідомляємо, що противники недосяжний для удару
        console.log('****************************************');
        console.log('');
        console.log('');
    }
    return this;

};
Wizard.prototype.getDescription =  function(){
    var d = [];
    d[0] = "Clan: " + this.clan;
    d[1] = "Name: " + this.name;
    d[2] = "Health: " + this.health;
    d[3] = "Strenght: " + this.strenght;
    d[4] = "Magic power: " + this.magic;
    d[5] = "Max speed: " + this.speed;
    d[6] = "Hair color: " + this.colorHair;
    for (var i in d){
        console.log(d[i]);
    }
    console.log('***********************************************');
    console.log('');
    return this;
};

module.exports = Wizard;