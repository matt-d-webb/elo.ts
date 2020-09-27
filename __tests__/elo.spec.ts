import Elo from '../src/elo';

describe('Elo', () => {
    let elo;
    beforeAll(() => {
        elo = new Elo({ k: 20, rating: 2000 });
    });
    test('calculator', () => {
        const newRating = elo.change(2200, 1);
        expect(newRating).toStrictEqual({ change: 15.194938532959213, newRating: 2015 })
    });
});