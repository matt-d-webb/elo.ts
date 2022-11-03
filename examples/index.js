const Elo = require("../dist/index.js").default;

const { probablility, change } = new Elo({ k: 20, rating: 2000 });

const prob = probablility(2000);
const result = change(2200, 1);

// eslint-disable-next-line no-console
console.log(result);
// eslint-disable-next-line no-console
console.log(prob);
