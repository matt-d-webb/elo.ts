interface IRatingChange {
    change: Number,
    newRating: Number
}

export interface IElo {
    change(opponentRating: number, result: number): IRatingChange,
    probablility(opponentRating: number): number
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
        newRating: Math.round(outcome)
    };
};

const probablility = (playerRating: number, opponentRating: number) => {
    const diff = opponentRating - playerRating;
    return 1 / (1 + Math.pow(10, diff / 400));
};

export class Elo implements IElo {
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

    probablility(opponentRating: number) {
        return probablility(this.#options.rating, opponentRating);
    }
};