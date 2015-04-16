function Vector(x, y){  // для обчислення руху героїв.
    this.x = x;
    this.y = y;
}

Vector.prototype = {
    constructor : Vector,

    add: function(vector) { // додавання векторів
        this.x += vector.x;
        this.y += vector.y;
    },

    sub: function(vector){ // віднімання векторів
        this.x -= vector.x;
        this.y -= vector.y;
    },

    scalProd: function(scalar){ // множення вектора на скаляр
        this.x *= scalar;
        this.y *= scalar;
    },
    /*
     метод перевірки, того чи персонаж противник знаходиться на відстані(distance) від даного персонажу
     використовується для перевірки можливості атакувати противника
     */
    checkDistance: function(vector, distance){
        if (Math.pow((vector.x - this.x), 2) + Math.pow((vector.y - this.y), 2) < distance * distance){
            return true;
        }
        else{
            return false;
        }
    },

    unitaryVect: function(){ // метод створення одничного вектора з напрямом даного вектора(використовується для створення опору середовища)
        var x;
        var y;
        if (this.x >= this.y){
            if (this.x === 0) {
                x = 0;
                y = 0;
            }
            else{
                x = this.x / this.x;
                y = this.y / this.x;
            }
        }
        else{
            if (this.y === 0) {
                x = 0;
                y = 0;
            }
            else{
                x = this.x / this.y;
                y = this.y / this.y;
            }
        }
        return new Vector(x, y);
    },

    showVector: function(){
        console.log("(" + this.x + ", " + this.y + ")" );
    }
};

module.exports = Vector;