<p align="center">
    <img
      alt="Elo"
      src="img/chart-icon.png?raw=true"
    />
  <h2 align="center">elo</h1>
</p>
<p align="center">
    Implements the basic **Elo** rating system calculations in `TypeScript`.
</p>

> The Elo rating system is a method for calculating the relative skill levels of players in zero-sum games such as chess. It is named after its creator Arpad Elo, a Hungarian-American physics professor.
> - [Wikipedia](https://en.wikipedia.org/wiki/Elo_rating_system)


## Basic

```javascript
const elo = require('elo');

const { change } = elo(2000, 2200, 20, 1); // 15.19 ...
```