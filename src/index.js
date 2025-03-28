var Dice = /** @class */ (function () {
    function Dice() {
        this.val = 1 + Math.round(5 * Math.random());
    }
    Dice.prototype.roll = function () {
        this.val = 1 + Math.round(5 * Math.random());
    };
    return Dice;
}());
var d1 = new Dice();
var rolls = [];
for (var i = 0; i < 100; i++) {
    d1.roll();
    rolls.push(d1.val);
}
var totals = [0, 0, 0, 0, 0, 0];
for (var i = 0; i < rolls.length; i++) {
    totals[rolls[i] - 1]++;
}
console.log(totals);
