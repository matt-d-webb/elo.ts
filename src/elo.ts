interface IRatingChange {
    change: number,
    newRating: number
}

interface IOptions {
    k?: number,
    rating?: number
}

interface IResult {
    opponentRating: number,
    result: GameResult
}

enum GameResult {
    win = 1,
    draw = 0.5,
    loss = 0
}

interface IPerformanceRating {
    games: number,
    change: number[], 
    ratings: number[], 
    tpr: number 
}

export interface IElo {
    change(opponentRating: number, result: number): IRatingChange,
    probability(opponentRating: number): number
    performance(results: IResult[]): any
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

    private _maxRating = (playerRating: number, opponentRating: number) => {
        const diff = opponentRating - playerRating;
        if (diff > 400) {
            return playerRating + 400;
        }
        if (opponentRating < 400) {
            return playerRating - 400;
        }
        return opponentRating;
    };

    private _probability = (playerRating: number, opponentRating: number) => {
        const diff = opponentRating - playerRating;
        return 1 / (1 + Math.pow(10, diff / 400));
    };

    private _performance = (results: IResult[]): IPerformanceRating => {

        const perf = results.reduce((pre, cur) => {

            const r = this._maxRating(this.#options.rating, cur.opponentRating);
            const c = this._change(this.#options.rating, r, this.#options.k, cur.result);

            const tpr = [...pre.ratings, r].reduce((p, c) => p += c, 0) / (pre.games += 1);

            return {
                ...pre,
                games: pre.games += 1,
                change: [...pre.change, c],
                ratings: [...pre.ratings, r],
                tpr
            };

        }, { games: 0, change: [], ratings: [], tpr: 0 });

        return perf;
    }

    public performance(results: IResult[]) {
        return this._performance(results);
    }

    public change(opponentRating: number, result: number): IRatingChange {
       return this._change(this.#options.rating, opponentRating, this.#options.k, result);
    }

    public probability(opponentRating: number): number {
        return this._probability(this.#options.rating, opponentRating);
    }
}