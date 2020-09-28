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

**JS**
```javascript
const Elo = require('elo');
const elo = new Elo({ k: 20, rating: 2000 }); // set your defaults!
const { change } = elo.change(2200, 1 /* 1 = win, 0.5 = draw, 0 = loss */); // 15.19 ...
```
