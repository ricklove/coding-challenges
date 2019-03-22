/** Return the number of values <= N that contain a duplicate digit
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
var numDupDigitsAtMostN_skip = function (N) {
    let c = 0;
    for (let i = 0; i <= N; i++) {
        const base = getDuplicateBase10(i);
        if (base === 0) { continue; }
        if (base + i > N) { c++; continue; }
        c += base;
        i += base;
        i--;
    }
    return c;
};

const powers10 = new Array(10).fill().map((x, i) => Math.pow(10, i));
const getDuplicateBase10 = (v) => {
    const chars = (v + '').split('');
    const keys = {};
    for (let i = 0; i < chars.length; i++) {
        const c = chars[i];
        if (keys[c] !== undefined) { return powers10[chars.length - 1 - i]; }
        keys[c] = 1;
    }

    return 0;
};

// ---
// This won't work - out of memory
const tree = [];
const buildTree = () => {
    if (tree.length) { return; }
    buildNode(tree, new Array(10).fill(false));
};

const buildNode = (node, used) => {
    for (let i = 0; i <= 9; i++) {
        if (used[i]) { continue; }

        node[i] = {};
        used[i] = true;
        buildNode(node[i], used);
        used[i] = false;
    }
};

// ---
var numDupDigitsAtMostN_memCache = function (N) {
    populate(N);
    let c = 0;
    for (let i = 0; i <= N; i++) {
        if (duplicates[i]) { c++; }
    }
    return c;
};

const duplicates = [];
const populate = (N) => {
    if (duplicates.length > N) { return; }
    for (let i = duplicates.length; i <= N; i++) {
        duplicates[i] = hasDuplicate((i + '').split(''));
    }
};

const hasDuplicate = (chars) => {
    const keys = {};
    for (c of chars) {
        if (keys[c] !== undefined) { return true; }
        keys[c] = 1;
    }

    return false;
};

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

    // Example 1:
    // Input: 20
    // Output: 1
    // Explanation: The only positive number (<= 20) with at least 1 repeated digit is 11.

    // Example 2:
    // Input: 100
    // Output: 10
    // Explanation: The positive numbers (<= 100) with atleast 1 repeated digit are 11, 22, 33, 44, 55, 66, 77, 88, 99, and 100.

    // // Example 3:
    // // Input: 1000
    // // Output: 262
    // verify_callback(nonRepeatOfAnyDigits_skipLeadingZeros, 0, 0 - 0);
    // verify_callback(nonRepeatOfAnyDigits_skipLeadingZeros, 1, 9 - 0);
    // verify_callback(nonRepeatOfAnyDigits_skipLeadingZeros, 2, 90 - 9);
    // // !0.. = 900
    // // ddd = 9
    // // dd[!d] = 9 * 9
    // // d[!d]d = 9 * 9
    // // [!d]dd = 9 * 9
    // verify_callback(nonRepeatOfAnyDigits_skipLeadingZeros, 3, 900 - (9 + 3 * 9 * 9));

    // // !0... = 9000
    // // d = !0
    // // x = !d
    // // y = !d!x
    // // dddd = 9d
    // // dddx = 9d * 9x
    // // ddxd = 9d * 9x
    // // dxdd = 9d * 9x
    // // xddd = 9d * 9x
    // // ddxy = 9d * 9x * 8y
    // // dxyd = 9d * 9x * 8y
    // // xydd = 9d * 9x * 8y
    // // dxdy = 9d * 9x * 8y
    // // xdyd = 9d * 9x * 8y
    // // xddy = 9d * 9x * 8y
    // //verify_callback(nonRepeatOfAnyDigits_skipLeadingZeros, 4, 9000 - (9 + 4 * 9 * 9 + 3 * 2 * 9 * 9 * 8));

    // verify_callback(nonRepeatOfAnyDigits_removeDuplicateLeadingZeros, 0, 0);
    // verify_callback(nonRepeatOfAnyDigits_removeDuplicateLeadingZeros, 1, 0);
    // verify_callback(nonRepeatOfAnyDigits_removeDuplicateLeadingZeros, 2, 9);
    // verify_callback(nonRepeatOfAnyDigits_removeDuplicateLeadingZeros, 3);

    verify(110, 12);
    verify(10, 0);
    verify(100, 10);
    verify(1000, 262);
    verify(20, 1);
    verify(110, 12);

    // 1 <= N <= 10^9
    verify(1, 0);
    // At least complete
    let a = numDupDigitsAtMostN(1000000);
    a = numDupDigitsAtMostN(29947500);
    a = numDupDigitsAtMostN(31034990);

    // This will take 1 GB of memory
    a = numDupDigitsAtMostN(1000000000);
}

test();