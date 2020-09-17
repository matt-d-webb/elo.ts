interface RatingChange {
    change: Number,
    newRating: Number
}

export const elo = (playerRating: number, opponentRating: number, kFactor: number, result: number): RatingChange => {

    const transformPR = Math.pow(10, (playerRating / 400));
    const transformOR = Math.pow(10, (opponentRating / 400));

    const expectation = transformPR / (transformPR + transformOR);

    const outcome = playerRating + kFactor * (result - expectation);

    return {
        change: (outcome - playerRating),
        newRating: Math.round(outcome),
    };
}
