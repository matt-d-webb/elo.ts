interface IRatingChange {
    change: Number,
    newRating: Number
}

interface IElo {
    change(opponentRating: number, result: number): IRatingChange
}

interface IOptions {
    k?: number,
    rating?: number
}

const change = (playerRating: number, opponentRating: number, kFactor: number, result: number): IRatingChange => {
    const transformPR: number = Math.pow(10, (playerRating / 400));
    const transformOR: number = Math.pow(10, (opponentRating / 400));
    const expectation: number = transformPR / (transformPR + transformOR);
    const outcome = playerRating + kFactor * (result - expectation);

    return {
        change: (outcome - playerRating),
        newRating: Math.round(outcome),
    };
}

const performance = () => {
    // takes a list of opponent ratings: [2100, 2200, 2250, 2190];
    // takes the performance: 1.5 / 4
    // calculates the performance rating + change in raing
}

export default class Elo implements IElo {
    #__defaults__: IOptions = {
        k: 20,
        rating: 1200
    };
    #options: IOptions;

    constructor(options?: IOptions) {
        this.#options = Object.assign({}, this.#__defaults__, options);
    }

    change(opponentRating: number, result: number): IRatingChange {
        return change(this.#options.rating, opponentRating, this.#options.k, result);
    }
} 