const Elo = require('../dist/index.js').default;

const elo = new Elo({ k: 20, rating: 2000 });

const prob = elo.probablility(2200);
const result = elo.change(2200, 1);

// eslint-disable-next-line no-console
console.log(result);
// eslint-disable-next-line no-console
console.log(prob);
