import { Elo, IElo } from '../src';

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
        const probability = elo.probability(2200);
        expect(probability).toStrictEqual(0.2402530733520421);
    });
    test('probability() with defaults', () => {
        const eloDefaults = new Elo();
        const probability = eloDefaults.probability(2200);
        expect(probability).toBeCloseTo(0.0031523091832602124, 15);
    });

    test('performance() returns correct stats for multiple games', () => {
        const results = [
            { opponentRating: 2200, result: 1 as const },
            { opponentRating: 2100, result: 0.5 as const },
            { opponentRating: 2600, result: 0 as const },
        ];
        const perf = elo.performance(results);
        expect(perf.games).toBe(3);
        expect(perf.change).toHaveLength(3);
        expect(perf.ratings).toHaveLength(3);
        expect(perf.change[0]).toHaveProperty('change');
        expect(perf.change[0]).toHaveProperty('newRating');
        expect(typeof perf.tpr).toBe('number');
    });

    test('performance() caps rating difference at 400', () => {
        const results = [
            { opponentRating: 2800, result: 1 as const },
        ];
        const perf = elo.performance(results);
        expect(perf.ratings[0]).toBe(2400);
    });

    test('performance() with single win', () => {
        const results = [
            { opponentRating: 2200, result: 1 as const },
        ];
        const perf = elo.performance(results);
        expect(perf.games).toBe(1);
        expect(perf.tpr).toBe(perf.ratings[0]);
        expect(perf.change[0].change).toBeGreaterThan(0);
    });

    test('performance() with single loss', () => {
        const results = [
            { opponentRating: 2200, result: 0 as const },
        ];
        const perf = elo.performance(results);
        expect(perf.games).toBe(1);
        expect(perf.change[0].change).toBeLessThan(0);
    });

    test('performance() with empty results', () => {
        const perf = elo.performance([]);
        expect(perf.games).toBe(0);
        expect(perf.change).toHaveLength(0);
        expect(perf.ratings).toHaveLength(0);
    });
});
