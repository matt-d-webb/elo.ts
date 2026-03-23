<p align="center">
    <img
      alt="Elo"
      src="img/chart-icon.png?raw=true"
    />
  <h2 align="center">elo</h2>

</p>
<p align="center">
    Implements the basic <strong>Elo</strong> rating system in <i>TypeScript</i>.
      <p align="center">
  <a href="https://github.com/matt-d-webb/elo.ts/actions/workflows/test.yml"><img src="https://github.com/matt-d-webb/elo.ts/actions/workflows/test.yml/badge.svg" alt="Test" /></a>
  <a href="https://www.npmjs.com/package/elo-rating-system"><img src="https://img.shields.io/npm/v/elo-rating-system" alt="npm version" /></a>

  </p>
</p>

> _The Elo rating system is a method for calculating the relative skill levels of players in zero-sum games such as chess. It is named after its creator Arpad Elo, a Hungarian-American physics professor -_
> [_wikipedia_](https://en.wikipedia.org/wiki/Elo_rating_system)

```bash
npm install elo-rating-system
```

## Usage

```javascript
const { Elo } = require('elo-rating-system');

const elo = new Elo({ k: 20, rating: 2000 }); // override the defaults (k: 20, rating: 1200)
```

**.change()** - rating change based on `opponentRating` and `result`
```javascript
const { change, newRating } = elo.change(2200, 1); // { change: 15.19..., newRating: 2015 }
```

**.probability()** - decimal probability of winning vs `opponentRating`
```javascript
const probability = elo.probability(2200); // 0.24 (or 24%)
```

**.performance()** - performance rating from an array of game results
```javascript
const perf = elo.performance([
    { opponentRating: 2200, result: 1 },
    { opponentRating: 2100, result: 0.5 },
    { opponentRating: 2600, result: 0 },
]);
// { games: 3, change: [...], ratings: [...], tpr: 2233.33 }
```

Results use `1` for a win, `0.5` for a draw, and `0` for a loss.

### Dynamic K-Factor

Pass a function as `k` to vary the K-factor based on the player's rating:

```javascript
const elo = new Elo({
    rating: 2000,
    k: (rating) => {
        if (rating < 2400) return 40;
        return 10;
    },
});
```

## Tests
```bash
npm test
```
