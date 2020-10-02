import Elo from '../src';
import { IElo } from '../src/elo';

describe('Elo', () => {
    let elo: IElo;
    beforeAll(() => {
        elo = new Elo({ k: 20, rating: 2000 });
    });
    
    test('change() with overrides', () => {
        const newRating = elo.change(2200, 1);
        expect(newRating).toStrictEqual({ change: 15.194938532959213, newRating: 2015 });
    });
    test('change() with defaults', () => {
        const eloDefaults = new Elo();
        const newRating = eloDefaults.change(2200, 1);
        expect(newRating).toStrictEqual({ change: 19.936953816334835, newRating: 1220 });
    });

    test('probability() with overrides', () => {
        const probability = elo.probablility(2200);
        expect(probability).toStrictEqual(0.2402530733520421);
    });
    test('probability() with defaults', () => {
        const eloDefaults = new Elo();
        const probability = eloDefaults.probablility(2200);
        expect(probability).toStrictEqual(0.0031523091832602124);
    });
});
