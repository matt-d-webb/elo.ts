import Elo from '../src/elo';

describe('Elo', () => {
    let elo;
    beforeAll(() => {
        elo = new Elo({ k: 20, rating: 2000 });
    });
    test('calculator with overrides', () => {
        const newRating = elo.change(2200, 1);
        expect(newRating).toStrictEqual({ change: 15.194938532959213, newRating: 2015 });
    });
    test('calculator with defaults', () => {
        const eloDefaults = new Elo();
        const newRating = eloDefaults.change(2200, 1);
        expect(newRating).toStrictEqual({ change: 19.936953816334835, newRating: 1220 });
    });
});
