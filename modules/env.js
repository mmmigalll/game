var Vector = require('./vector.js');
var Environment = {
    wind: function(vector){ // функція вітру
        var v = new Vector();
        v.x = Math.round(Math.random() * 20 - 10);
        v.y = Math.round(Math.random() * 20 - 10);
        vector.add(v);
        return vector;
    },

    envRes: function(vector){ // функція опору середовища
        var v = new Vector();
        v = vector.unitaryVect();
        vector.sub(v);
        return vector;
    }
}

module.exports = Environment;