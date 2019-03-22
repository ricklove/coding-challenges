/**
 * @param {number} x
 * @return {boolean}
 */
const isPalindrome = (x) => {
    // return isPalindrome_simple(x);
    // return isPalindrome_fast(x);
    // return isPalindrome_numeric(x);
    return isPalindrome_numeric_noArray(x);
}

const isPalindrome_simple = (x) => {
    const text = x + '';
    const textRev = text.split('').reverse().join('');
    return text === textRev;
};

const isPalindrome_fast = (x) => {
    const text = x + '';
    const iDone = (text.length / 2) | 0;

    for (let i = 0; i < iDone; i++) {
        if (text.charAt(i) !== text.charAt(text.length - 1 - i)) { return false; }
    }

    return true;
};

const isPalindrome_numeric = (x) => {
    if (x === 0) { return true; }
    if (x < 1) { return false; }
    if (x !== (x | 0)) { return isPalindrome_fast(x); }

    const digits = [];

    while (x > 0) {
        digits.push(x % 10);
        x = (x / 10) | 0;
    }

    const iDone = (digits.length / 2) | 0;

    for (let i = 0; i < iDone; i++) {
        if (digits[i] !== digits[digits.length - 1 - i]) { return false; }
    }

    return true;
};

const isPalindrome_numeric_noArray = (x) => {
    if (x === 0) { return true; }
    if (x < 1) { return false; }
    if (x === Infinity) { return false; }
    if (typeof x !== 'number') { return false; }
    if (x !== (x | 0)) { return isPalindrome_fast(x); }

    const xClone = x;

    let digitCount = 0;
    let most10 = 1 / 10;

    while (x > 0) {
        digitCount++;
        most10 *= 10;
        x = (x / 10) | 0;
    }
    x = xClone;

    const iDone = (digitCount / 2) | 0;

    for (let i = 0; i < iDone; i++) {
        const least = x % 10;
        const most = (x / most10) | 0;

        if (least !== most) { return false; }

        x -= (most * most10);
        x = (x / 10) | 0;
        most10 /= 100;
    }

    return true;
};

// Adhoc Testing
const verify = (sample, expected) => {
    const actual = isPalindrome(sample);
    if (actual != expected) {
        throw new Exception("Failed", { expected, actual, sample });
    }
}

const test = () => {
    verify(0, true);
    verify(1, true);
    verify(121, true);
    verify(1221, true);
    verify(121212121, true);
    verify(-121, false);
    verify(10, false);
    verify(Infinity, false);
    verify(0.57, false);
    verify(1.57, false);
    verify(1.1, true);
    verify(10.01, true);
    verify(100.001, true);
    verify(10e7, false);
    verify(10e-7, false);
    verify('fewr', false);
};

test();
