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

    test('performance() caps rating difference at +400', () => {
        const results = [
            { opponentRating: 2800, result: 1 as const },
        ];
        const perf = elo.performance(results);
        expect(perf.ratings[0]).toBe(2400);
    });

    test('performance() caps rating difference at -400', () => {
        const results = [
            { opponentRating: 1500, result: 1 as const },
        ];
        const perf = elo.performance(results);
        expect(perf.ratings[0]).toBe(1600);
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

    test('change() with dynamic k-factor function', () => {
        const fide = new Elo({
            rating: 2000,
            k: (rating) => {
                if (rating < 2400) return 20;
                return 10;
            },
        });
        const result = fide.change(2200, 1);
        expect(result).toStrictEqual({ change: 15.194938532959213, newRating: 2015 });
    });

    test('dynamic k-factor applies different k for high-rated players', () => {
        const kFn = (rating: number) => {
            if (rating < 2400) return 40;
            return 10;
        };
        const lowRated = new Elo({ rating: 2000, k: kFn });
        const highRated = new Elo({ rating: 2500, k: kFn });

        const lowResult = lowRated.change(2200, 1);
        const highResult = highRated.change(2200, 1);

        // K=40 produces larger swings than K=10
        expect(Math.abs(lowResult.change)).toBeGreaterThan(Math.abs(highResult.change));
    });

    test('dynamic k-factor works with performance()', () => {
        const fide = new Elo({
            rating: 2000,
            k: (rating) => rating < 2400 ? 20 : 10,
        });
        const perf = fide.performance([
            { opponentRating: 2200, result: 1 as const },
            { opponentRating: 2100, result: 0 as const },
        ]);
        expect(perf.games).toBe(2);
        expect(perf.change).toHaveLength(2);
    });
});
