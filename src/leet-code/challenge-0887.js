/** Return number of egg drops required to discover exactly the max floor height that doesn't breaks eggs, given K eggs, and N floors
 * @param {number} K
 * @param {number} N
 * @return {number}
 */
const superEggDrop = (K, N) => {
    return superEggDrop_recursive(K, N);
}

const bestJumpRatios = {};
const shouldLogBest = false;
const memoized = {};
const superEggDrop_recursive = (K, N) => {
    // If no eggs, invalid
    if (K === 0) {
        return Infinity;
    }

    // If no floors left, done
    if (N <= 0) { return 0; }

    // If only one floor left, do it
    if (N <= 1) { return 1; }

    // If only one egg left, have to work from the bottom and try every floor
    if (K === 1) { return N; }

    // If 2 floors, they both must be tested
    if (N <= 2) { return 2; }

    if (!memoized[K]) { memoized[K] = {}; }
    const m = memoized[K][N];
    if (m) { return m; }

    // Search for best floor range 
    // The cost of top decreases as it moves down
    // The cost of bottom decreases as it moves up
    // So best is where bottomCost == topCost
    let fBestHigh = N + 1;
    let fBestLow = 0;
    let bestHigh = Infinity;
    let bestLow = Infinity;

    const JUMP_RATIO = 0.5;
    let f = ((fBestHigh - fBestLow - 2) * JUMP_RATIO) | 0 + fBestLow + 1;

    while (fBestHigh > fBestLow + 1) {

        // Try the bottom if broken egg
        const bottom = superEggDrop_recursive(K - 1, f - 1);

        // Try the top if not broken
        const top = superEggDrop_recursive(K, N - f);

        // Use the worst case between bottom and top
        const diff = top - bottom;

        // If balanced, done?
        // if (diff === 0) {
        //     fBestHigh = f;
        //     fBestLow = f;
        //     bestHigh = top;
        //     bestLow = top;
        //     break;
        // }
        if (diff < 0) {
            // If bottom is most expensive => go Lower
            bestHigh = bottom;
            fBestHigh = f;
        } else {
            // If top is most expensive => go Higher
            bestLow = top;
            fBestLow = f;
        }

        f = ((fBestHigh - fBestLow - 2) * JUMP_RATIO) | 0 + fBestLow + 1;
    }

    if (shouldLogBest) {
        // Log Best Jump Ratios for tweaking
        // f = ((fBestHigh - fBestLow - 2) * JUMP_RATIO) | 0 + fBestLow + 1;
        // f - fBestLow - 1 = (fBestHigh - fBestLow - 2) * JUMP_RATIO)
        // (f - fBestLow - 1) / (fBestHigh - fBestLow - 2) = JUMP_RATIO;
        // (f - 0 - 1) / (N+1 - 0 - 2) = JUMP_RATIO;
        // (f - 1) / (N - 1) = JUMP_RATIO;
        const bestJumpRatio = (f - 1) / (N - 1);
        bestJumpRatios[K] = bestJumpRatios[K] || [];
        bestJumpRatios[K].push({ bestJumpRatio, K, N, fBestHigh, fBestLow, f });
    }

    const best = bestHigh < bestLow ? bestHigh : bestLow;
    const result = best + 1;
    memoized[K][N] = result;
    return result;
};


// Adhoc Testing
const verify = (eggs, floors, expected) => {
    const actual = superEggDrop(eggs, floors);
    if (actual != expected) {
        throw new Exception("Failed", { expected, actual, sample, changes });
    }
}

const test = () => {
    const b = bestJumpRatios;

    // Provided
    verify(2, 6, 3);
    verify(3, 14, 4);
    verify(2, 4, 3);
    verify(2, 10, 4);
    verify(2, 11, 5);
    verify(2, 15, 5);
    verify(2, 16, 6);
    verify(2, 21, 6);
    verify(7, 100, 7);
    verify(7, 1000, 11);

    // Assumed
    verify(7, 10000, 15);
    verify(1000, 10000, 14);

    verify(1, 1, 1);
    verify(1, 2, 2);
    verify(1, 10, 10);
    verify(2, 2, 2);
    verify(10, 2, 2);

    verify(2, 11, 5);
    verify(2, 10, 4);

    verify(10, 15, 4);
    verify(10, 16, 5);
};

test();
