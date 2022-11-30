const Elo = require("../dist/index").default;

const { change, performance } = new Elo({ k: 20, rating: 2000 });

//const prob = probability(2000);
const result = change(2200, 1);
const perf = performance([
        { opponentRating: 2200, result: 1 },
        { opponentRating: 2100, result: 0.5 },
        { opponentRating: 2600, result: 0 }
    ]);

// eslint-disable-next-line no-console
console.log(result);
// eslint-disable-next-line no-console
//console.log(prob);
// eslint-disable-next-line no-console
console.log(perf);

