/** Return number of egg drops required to discover exactly the max floor height that doesn't breaks eggs, given K eggs, and N floors
 * @param {number} K
 * @param {number} N
 * @return {number}
 */
const superEggDrop = (K, N) => {
    return superEggDrop_recursive(K, N);
}

let memoized = {};
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
    const JUMP_RATIO = 0.571251;

    let f = ((fBestHigh - fBestLow - 2) * JUMP_RATIO) | 0 + fBestLow + 1;

    while (fBestHigh > fBestLow + 1) {

        // Try the bottom if broken egg
        const bottom = superEggDrop_recursive(K - 1, f - 1);

        // Try the top if not broken
        const top = superEggDrop_recursive(K, N - f);

        // Use the worst case between bottom and top
        const diff = top - bottom;

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

    const best = bestHigh < bestLow ? bestHigh : bestLow;
    const result = best + 1;
    memoized[K][N] = result;
    return result;
};

// Optimizing
// const JUMP_RATIO = 1 / Math.E;
// const JUMP_RATIO = 0.35; //685K
// const JUMP_RATIO = 0.4; //642K
// const JUMP_RATIO = 0.5; //635K
// const JUMP_RATIO = 0.55; //619K
// const JUMP_RATIO = 0.56; //616K
// const JUMP_RATIO = 0.57; //573K
// const JUMP_RATIO = 0.5705; //565K
// const JUMP_RATIO = 0.57075; //564K
// const JUMP_RATIO = 0.5709; //563K
// const JUMP_RATIO = 0.571; //561K
// const JUMP_RATIO = 0.5711; //555K
// const JUMP_RATIO = 0.57115; //554K
// const JUMP_RATIO = 0.5712; //552K
// const JUMP_RATIO = 0.57124; //551K
// const JUMP_RATIO = 0.571245; //550.3K
// const JUMP_RATIO = 0.5712475; //550.3K
// const JUMP_RATIO = 0.571249; //550.3K
// const JUMP_RATIO = 0.57125; //550.2K
// const JUMP_RATIO = 0.5712505; //550.20K
// const JUMP_RATIO = 0.5712507; //550.20K
// const JUMP_RATIO = 0.5712508; //550.19K
// const JUMP_RATIO = 0.5712509; //550.19K
// const JUMP_RATIO = 0.57125095; //550.19K
// const JUMP_RATIO = 0.571251; //550.19K // Also best time
// const JUMP_RATIO = 0.5712511; //550.19K
// const JUMP_RATIO = 0.5712512; //550.22K
// const JUMP_RATIO = 0.5712515; //550.22K
// const JUMP_RATIO = 0.571252; //551.04K
// const JUMP_RATIO = 0.571255; //551.3K
// const JUMP_RATIO = 0.57126; //551K
// const JUMP_RATIO = 0.5713; //561K
// const JUMP_RATIO = 0.5715; //583K
// const JUMP_RATIO = 0.572; //583K
// const JUMP_RATIO = 0.575; //585K
// const JUMP_RATIO = 0.58125; //595K
// const JUMP_RATIO = 0.6; //629K
// const JUMP_RATIO = 0.7; //712K
let JUMP_RATIO = 0.5;
const bestJumpRatios = {};
let callCount = 0;
const shouldLogBest = false;

let memoized_test = {};
const superEggDrop_recursive_test = (K, N) => {
    callCount++;

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

    if (!memoized_test[K]) { memoized_test[K] = {}; }
    const m = memoized_test[K][N];
    if (m) { return m; }

    // Search for best floor range 
    // The cost of top decreases as it moves down
    // The cost of bottom decreases as it moves up
    // So best is where bottomCost == topCost
    let fBestHigh = N + 1;
    let fBestLow = 0;
    let bestHigh = Infinity;
    let bestLow = Infinity;

    let f = ((fBestHigh - fBestLow - 2) * JUMP_RATIO) | 0 + fBestLow + 1;

    while (fBestHigh > fBestLow + 1) {

        // Try the bottom if broken egg
        const bottom = superEggDrop_recursive_test(K - 1, f - 1);

        // Try the top if not broken
        const top = superEggDrop_recursive_test(K, N - f);

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
    memoized_test[K][N] = result;
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

// test();

const optimize = () => {
    const results = [];

    for (JUMP_RATIO = 0.4; JUMP_RATIO < 0.6; JUMP_RATIO += 0.0025) {
        const c = callCount = 0;
        memoized = {};
        memoized_test = {};
        const timeStart = Date.now();

        test();

        const timeEnd = Date.now();
        const timeDelta = timeEnd - timeStart;
        results.push({ timeDelta, JUMP_RATIO, callCount });
    }

    const done = true;
};

optimize();