//to run use
//  node index.js

//to compile typscript to javascript for runtime use
//  tsc index.ts


class Dice {
    public val;

    constructor() {
        this.val = 1 + Math.round(5 * Math.random());
    }


    roll() {
        this.val = 1 + Math.round(5 * Math.random());
    }
}


var d1 = new Dice();

var rolls: number[] = [];

for (let i = 0; i < 100; i++) {
    d1.roll();
    rolls.push(d1.val);
}



var totals: number[] = [0,0,0,0,0,0]

for (let i = 0; i < rolls.length; i++) {
    totals[rolls[i]-1]++;
}

console.log(totals);
