/**
 * @param {number} N
 * @return {number}
 */
var numPairsDivisibleBy60 = function (times) {
    let count = 0;
    for (let i = 0; i < times.length; i++) {
        for (let j = i + 1; j < times.length; j++) {
            if ((times[i] + times[j]) % 60 === 0) { count++; }
        }
    }

    return count;
}


// Adhoc Testing
const verify = (input_times, expected) => {
    const actual = numPairsDivisibleBy60(input_times);
    if (actual != expected) {
        throw new Exception("Failed", { expected, actual, input_times });
    }
}

function test() {
    verify([30, 20, 150, 100, 40], 3);
    verify([60, 60, 60], 3);
    verify([], 0);
    verify([0], 0);
    verify([1], 0);
    verify([500], 0);
    verify([600, 0], 1);
    verify([60, 60, ...new Array(60000).fill(1)], 1);
}

test();