import Elo from './elo';

const elo = new Elo({ k: 20, rating: 2000 });

const result = elo.change(2200, 1);

console.log(result);
// { change: 15.194938532959213, newRating: 2015 }


// pass a full table of results:
// result, sorted performance

