var Vector = function(x, y) {
    this.x = Math.round(x) || 0;
    this.y = Math.round(y) || 0;
};
Vector.prototype = {
    negative: function() {
        return new Vector(-this.x, -this.y);
    },
    convertToInt: function () {
        return new Vector(Math.floor(this.x), Math.floor(this.y));
    },
    radian: function (angle) {
        return Math.PI/180*angle;
    },
    angleVector: function(a) {
        return new Vector(Math.sin(this.radian(a)), Math.cos(this.radian(a)));
    },
    add: function(v) {
        if (v instanceof Vector) {
            return new Vector(this.x + v.x, this.y + v.y);
        } else {
            return new Vector(this.x + v, this.y + v);
        }
    },
    subtract: function(v) {
        if (v instanceof Vector) {
            return new Vector(this.x - v.x, this.y - v.y);
        } else {
            return new Vector(this.x - v, this.y - v)
        };
    },
    multiply: function(v) {
        if (v instanceof Vector) {
            return new Vector(this.x * v.x, this.y * v.y);
        } else {
            return new Vector(this.x * v, this.y * v);
        }
    },
    dot: function(v) {
        return this.x * v.x + this.y * v.y;
    },
    length: function() {
        return Math.round(Math.sqrt(this.dot(this)));
    }
};

Vector.lerp = function(a, b, fraction) {
    return b.subtract(a).multiply(fraction).add(a);
};

Vector.proekt = function(a, b) {
    return a.dot(b)/Math.sqrt(a.dot(a));
}

module.exports = Vector;