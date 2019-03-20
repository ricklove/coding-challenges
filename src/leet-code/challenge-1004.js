/**
 * Return the longest sequence of continguous 1s, allowing for K 0s
 * @param {number[]} A
 * @param {number} K
 * @return {number}
 */
const longestOnes = (A, K) => {

    if (!A.length) { return 0; }
    if (K >= A.length) { return A.length; }
    if (A.length === 1 && A[0] === 1) { return 1; }

    let iStart = 0;
    let iEnd = 0;
    let zerosFree = A[0] === 0 ? K - 1 : K;
    let max = 0;

    while (iEnd < A.length - 1) {
        const n = A[iEnd + 1];

        // Move start if end is blocked by zero
        if (n === 0 && zerosFree <= 0) {
            iStart++;

            if (A.length - iStart < max) { break; }

            if (A[iStart - 1] === 0) {
                zerosFree++;
            }

            if (iEnd < iStart) {
                iEnd = iStart;
                zerosFree--;
            }

            continue;
        }

        // Move end
        iEnd++;

        if (zerosFree < 0) {
            iStart++;
            zerosFree++;
        }

        const size = iEnd - iStart + 1;
        if (size > max) {
            max = size;
        }

        if (n === 0) {
            zerosFree--;
        }
    }

    return max;
};


// Adhoc Testing
const verify = (sample, changes, expected) => {
    const actual = longestOnes(sample, changes);
    if (actual != expected) {
        throw new Exception("Failed", { expected, actual, sample, changes });
    }
}

const test = () => {
    verify([], 0, 0);
    verify([0], 0, 0);
    verify([1], 0, 1);
    verify([0], 1, 1);
    verify([1, 1], 0, 2);
    verify([1, 0], 1, 2);
    verify([0, 1], 1, 2);
    verify([0, 1, 1, 1, 0], 0, 3);
    verify([0, 0, 1, 1, 1, 0, 0], 0, 3);
    verify([1, 1, 0, 0, 0, 1, 1], 0, 2);
    verify([1, 0, 0, 0, 1, 1], 0, 2);
    verify([1, 1, 0, 0, 0, 1], 0, 2);
    verify([1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0], 0, 4);
    verify([1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0], 1, 5);
    verify([1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0], 2, 6);
    verify([1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0], 3, 10);
    verify([1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0], 3, 10);
    verify([0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0], 3, 10);
    verify([0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0], 3, 10);
    verify([0, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1], 3, 10);

    verify([0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1], 3, 10);
};

test();
