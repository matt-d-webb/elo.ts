const Elo = require('../dist/index.js').default;

const elo = new Elo({ k: 20, rating: 2000 });

const prob = elo.probablility(2200);
const result = elo.change(2200, 1);

console.log(result);
console.log(prob);
