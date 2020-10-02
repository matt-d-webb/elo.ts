<p align="center">
    <img
      alt="Elo"
      src="img/chart-icon.png?raw=true"
    />
  <h2 align="center">elo</h1>
</p>
<p align="center">
    Implements the basic <strong>Elo</strong> rating system calculations in <i>TypeScript</i>.
</p>


> The Elo rating system is a method for calculating the relative skill levels of players in zero-sum games such as chess. It is named after its creator Arpad Elo, a Hungarian-American physics professor.
> - [Wikipedia](https://en.wikipedia.org/wiki/Elo_rating_system)


## Basic

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/de13737906324a0b8039d4c246fabf93)](https://app.codacy.com/gh/matt-d-webb/elo?utm_source=github.com&utm_medium=referral&utm_content=matt-d-webb/elo&utm_campaign=Badge_Grade)

**JS**
```javascript
const Elo = require('elo');
const elo = new Elo({ k: 20, rating: 2000 }); // set your defaults!
const result = Object.freeze({ win: 1, loss: 0, draw: 0.5 });
const { change } = elo.change(2200, result.win); // 15.19 ...
```
## Tests

```bash
npx jest
```

**Todo**
* multi result calculation 
* performance rating calculation
