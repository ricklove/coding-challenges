/**
 * @param {number} N
 * @return {number}
 */
var numPairsDivisibleBy60 = function (N) {
    return bitwiseComplement_bitshift(N);
}

var bitwiseComplement_bitshift = function (N) {
    if (N === 0) { return 1; }

    // Get complement into reverse bit order
    let n = N;
    let rev = 0;
    while (n > 0) {
        rev = (rev << 1) + (n % 2 ? 0 : 1);
        n = n >> 1;
    }

    // Reverse with same length
    n = N;
    let comp = 0;
    while (n > 0) {
        comp = (comp << 1) + (rev % 2);
        rev = rev >> 1;
        n = n >> 1;
    }

    return comp;
};

var bitwiseComplement_bitmask = function (N) {
    if (N === 0) { return 1; }

    let bitMask = 0;
    let n = N;
    while (n > 0) {
        n = n >> 1;
        bitMask = (bitMask << 1) + 1;
    }

    const comp = (~N) & bitMask;
    return comp;
};

// Adhoc Testing
const verify = (sample, expected) => {
    const actual = numPairsDivisibleBy60(sample);
    if (actual != expected) {
        throw new Exception("Failed", { expected, actual, sample });
    }
}

function test() {
    //  5 = 101
    // ~2 = 010
    verify(5, 2);
    verify(0, 1);
    verify(1, 0);
    verify(7, 0);
    verify(8, 7);
    verify(15, 0);
    verify(14, 1);
    verify(13, 2);
    verify(12, 3);
}

test();