import { elo } from '../src/elo';

describe('Elo', () => {
    test('calculator', () => {
        const newRating = elo(2000, 2200, 20, 1);
        expect(newRating).toStrictEqual({ change: 15.194938532959213, newRating: 2015 })
    })
})