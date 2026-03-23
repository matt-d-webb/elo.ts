const { Elo } = require("../dist/index");

const elo = new Elo({ k: 20, rating: 2000 });

const result = elo.change(2200, 1);
const prob = elo.probability(2200);
const perf = elo.performance([
    { opponentRating: 2200, result: 1 },
    { opponentRating: 2100, result: 0.5 },
    { opponentRating: 2600, result: 0 },
]);

console.log(result);
console.log(prob);
console.log(perf);

