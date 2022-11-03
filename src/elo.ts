interface IRatingChange {
    change: number,
    newRating: number
}

interface IOptions {
    k?: number,
    rating?: number
}

export interface IElo {
    change(opponentRating: number, result: number): IRatingChange,
    probablility(opponentRating: number): number
}

export class Elo implements IElo {
    #__defaults__: IOptions = {
        k: 20,
        rating: 1200
    };
    #options: IOptions;

    constructor(options?: IOptions) {
        this.#options = Object.assign({}, this.#__defaults__, options);
    }

    private _change = (playerRating: number, opponentRating: number, kFactor: number, result: number): IRatingChange => {
        const transformPR: number = Math.pow(10, (playerRating / 400));
        const transformOR: number = Math.pow(10, (opponentRating / 400));
        const expectation: number = transformPR / (transformPR + transformOR);
        const outcome = playerRating + kFactor * (result - expectation);
    
        return {
            change: (outcome - playerRating),
            newRating: Math.round(outcome)
        };
    };
    
    private _probablility = (playerRating: number, opponentRating: number) => {
        const diff = opponentRating - playerRating;
        return 1 / (1 + Math.pow(10, diff / 400));
    };

    public change(opponentRating: number, result: number): IRatingChange {
        return this._change(this.#options.rating, opponentRating, this.#options.k, result);
    }

    public probablility(opponentRating: number) {
        return this._probablility(this.#options.rating, opponentRating);
    }
}