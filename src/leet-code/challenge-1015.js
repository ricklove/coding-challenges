/** Return the number of values <= N that contain a duplicate digit
 * Author: Rick Love
 * @param {number} N
 * @return {number}
 */
var numDupDigitsAtMostN = function (N) {
    // Permute - Non Duplicates
    // 2345 =
    // Leading Zeros
    // [0][!0]xy = 9*9*8 = (9*9p2)
    // [0][0][!0]x = 9*9 = (9*9p1)
    // [0][0][0][!0] = 9 = (9*9p0)
    // Non Leading Zeros
    // x=9
    // y=8
    // z=7
    // [1]xyz            = ([a-1 ^0]*9p3)
    // 2[012 ^2]yz       = ([a-1 ^left]*8p2)
    // 23[0123 ^23]z     = ([a-1 ^left]*7p1)
    // Last use [a] not [a-1]
    // 234[01234 ^234]   = ([a ^left])

    // Leading Zeros
    const nonDup_leadingZeros = (_N) => {
        let _countNonDups = 0;
        let l = (_N + '').length - 2;
        while (l >= 0) {
            _countNonDups += 9 * permute(9, l);
            l--;
        }

        return _countNonDups;
    }

    // Non-leading Zeros
    const nonDup_nonLeadingZeros = (_N) => {
        if (_N < 10) { return _N; }

        let _countNonDups = 0;
        let left = '';
        let right = _N + '';
        while (right.length) {
            const a = parseInt(right[0]);
            // All digits up to a {0...a}
            const aDigits = new Array(a + 1).fill(0).map((x, i) => i);
            const aChoices =
                // First digit = <a ^0 
                left.length === 0 ? aDigits.filter(x => x < a).filter(x => x > 0)
                    // Last digits = <=a ^left 
                    : right.length === 1 ? aDigits.filter(x => left.indexOf(x) < 0)
                        // Mid digit === 0 => SKIP
                        : a === 0 ? []
                            // Mid digits = <a ^left 
                            : aDigits.filter(x => x < a).filter(x => left.indexOf(x) < 0);

            const aMult = aChoices.length;
            const pSize = 10 - left.length - 1;

            if (right.length === 1) {
                // Last Digit
                _countNonDups += aMult;
            } else if (aMult > 0 && pSize > 0) {
                // Non-last Digit
                const pTake = right.length - 1;
                const pMult = permute(pSize, pTake);
                _countNonDups += aMult * pMult;
            }

            const nextDigit = right[0];
            // If the remaining options would have duplicates, done
            if (left.indexOf(nextDigit) >= 0) {
                break;
            }

            left += nextDigit;
            right = right.substr(1);
        }
        return _countNonDups;
    }

    const countNonDups_zeros = nonDup_leadingZeros(N);
    const countNonDups_nonZeros = nonDup_nonLeadingZeros(N);
    const countNonDups = countNonDups_zeros + countNonDups_nonZeros;
    return N - countNonDups;
};

const nonRepeatOfAnyDigits_removeDuplicateLeadingZeros = (digitCount) => {
    return permute(10, digitCount) - factorial(digitCount - 2) * 9;
};

const nonRepeatOfAnyDigits_withLeadingZeros = (digitCount) => {
    return nonRepeatOfAnyDigits_skipLeadingZeros(digitCount) + nonRepeatOfAnyDigits_withLeadingZeros(digitCount - 1);
};

const nonRepeatOfAnyDigits_skipLeadingZeros = (digitCount) => {
    return (permute(10, digitCount) * 9 / 10) | 0;
};

/** k Permutations of n
 * 
 * @param {Number of Items} n 
 * @param {Number of Selection} k 
 */
const permute = (n, k) => {
    return (factorial(n) / factorial(n - k)) | 0;
};

/** k Combinations of n
 * 
 * @param {Number of Items} n 
 * @param {Number Taken} k 
 */
const combine = (n, k) => {
    return factorial(n) / (factorial(n - k) * factorial(k));
};

const factorial_memoized = {};
const factorial = (f) => f <= 1 ? 1
    : factorial_memoized[f] ? factorial_memoized[f]
        : factorial_memoized[f] = f * factorial(f - 1);


// --- 
// Adhoc Testing
const verify = (N, expected) => {
    const actual = numDupDigitsAtMostN(N);
    if (actual != expected) {
        throw new Exception("Failed", { expected, actual, N });
    }
}

const verify_callback = (callback, N, expected) => {
    const actual = callback(N);
    if (actual != expected) {
        throw new Exception("Failed", { expected, actual, N });
    }
}

function test() {

    verify(110, 12);
    verify(10, 0);
    verify(100, 10);
    verify(1000, 262);
    verify(20, 1);
    verify(110, 12);

    // 1 <= N <= 10^9
    verify(1, 0);

    // Unknown Answers, but should complete quickly
    let a = numDupDigitsAtMostN(1000000);
    a = numDupDigitsAtMostN(29947500);
    a = numDupDigitsAtMostN(31034990);

    // This would take 1 GB of memory with brute force
    a = numDupDigitsAtMostN(1000000000);
}

test();