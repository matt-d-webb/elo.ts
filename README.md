<p align="center">
    <img
      alt="Elo"
      src="img/chart-icon.png?raw=true"
    />
  <h2 align="center">elo</h1>

</p>
<p align="center">
    Implements the basic <strong>Elo</strong> rating system calculations in <i>TypeScript</i>.
      <p align="center">
  <img alt="CircleCI" src="https://img.shields.io/circleci/build/github/matt-d-webb/elo">
  <a href="https://www.codacy.com/gh/matt-d-webb/elo/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=matt-d-webb/elo&amp;utm_campaign=Badge_Grade"><img src="https://app.codacy.com/project/badge/Grade/a42f9b2f24664121891aa40081f04b21"/></a>
  </p>
</p>


> _The Elo rating system is a method for calculating the relative skill levels of players in zero-sum games such as chess. It is named after its creator Arpad Elo, a Hungarian-American physics professor -_
> [_wikipedia_](https://en.wikipedia.org/wiki/Elo_rating_system)


## Basic

### JS examples

**.change()** - rating change based `opponentRating` and `result`
```javascript
const Elo = require('elo');
const elo = new Elo({ k: 20, rating: 2000 }); // set your defaults!
const result = Object.freeze({ win: 1, loss: 0, draw: 0.5 });
const { change } = elo.change(2200, result.win); // 15.19 ...
```

**.probability()** - of a win vs `opponentRating`
```javascript
const probability = elo.probability(2200); // 0.24 ...
```

## Tests

```bash
npx jest
```

**Todo**
* multi result calculation 
* performance rating calculation
