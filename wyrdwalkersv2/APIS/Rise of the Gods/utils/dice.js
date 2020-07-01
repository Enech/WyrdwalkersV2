var DiceUtils = {
    D6: function(nbDice) {
        var result = 0;
        for (var i = 0; i < nbDice; i++) {
            result += Math.floor(Math.random() * 6 + 1);
        }
        return result;
    },
    D3: function(nbDice) {
        var result = this.D6(nbDice);
        return Math.ceil(result / 2);
    },
    D10: function(nbDice) {
        var result = 0;
        for (var i = 0; i < nbDice; i++) {
            result += Math.floor(Math.random() * 10 + 1);
        }
        return result;
    },
    D8: function(nbDice) {
        var result = 0;
        for (var i = 0; i < nbDice; i++) {
            result += Math.floor(Math.random() * 8 + 1);
        }
        return result;
    },
    D4: function(nbDice) {
        var result = 0;
        for (var i = 0; i < nbDice; i++) {
            result += Math.floor(Math.random() * 4 + 1);
        }
        return result;
    }
}

module.exports = DiceUtils;