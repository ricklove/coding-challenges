// Author: Rick Love
// Start: 2019-03-23 18:00:00?
// End: 2019-03-23 18:14:06

/*
97. Interleaving String
Hard

Given s1, s2, s3, find whether s3 is formed by the interleaving of s1 and s2.

Example 1:

Input: s1 = "aabcc", s2 = "dbbca", s3 = "aadbbcbcac"
Output: true

Example 2:

Input: s1 = "aabcc", s2 = "dbbca", s3 = "aadbbbaccc"
Output: false
*/

/** Can s3 be formed by interleaving s1,s2
 * @param {string} s1
 * @param {string} s2
 * @param {string} s3
 * @return {boolean}
 */
var isInterleave = function (s1 = '', s2 = '', s3 = '', i1 = 0, i2 = 0, i3 = 0) {
    if (i1 == s1.length && i2 == s2.length && i3 == s3.length) { return true; }

    // Try 1
    if (i1 < s1.length && s1[i1] === s3[i3]) {
        // That works => Attempt Deeper
        if (isInterleave(s1, s2, s3, i1 + 1, i2, i3 + 1)) {
            return true;
        }
    }

    // Try 2
    if (i2 < s2.length && s2[i2] === s3[i3]) {
        // That works => Attempt Deeper
        if (isInterleave(s1, s2, s3, i1, i2 + 1, i3 + 1)) {
            return true;
        }
    }

    // Both failed
    return false;
};

// ------------- 
// Adhoc Testing
// ------------- 
const verify = (call, expected) => {
    const actual = call();

    const actualJson = JSON.stringify({ data: actual });
    const expectedJson = JSON.stringify({ data: expected });

    if (actualJson !== expectedJson) {
        console.log('FAIL', `\na=${actualJson}\ne=${expectedJson}`);
        throw new Exception("Failed", { expected, actual, N: n });
    }
}

function test() {
    // WRONG CASE
    // verify(() => isInterleave('ac', 'bd', 'WRONG'), true);

    verify(() => isInterleave('', '', ''), true);
    verify(() => isInterleave('a', '', 'a'), true);
    verify(() => isInterleave('', 'b', 'b'), true);
    verify(() => isInterleave('a', 'b', 'ab'), true);
    verify(() => isInterleave('a', 'b', 'ba'), true);
    verify(() => isInterleave('aa', 'bb', 'aabb'), true);
    verify(() => isInterleave('aa', 'bb', 'abba'), true);
    verify(() => isInterleave('aa', 'bb', 'bbaa'), true);
    verify(() => isInterleave('ac', 'bd', 'acdb'), false);
    verify(() => isInterleave('aabcc', 'dbbca', 'aadbbcbcac'), true);
    verify(() => isInterleave('aabcc', 'dbbca', 'aadbbbaccc'), false);
    verify(() => isInterleave(new Array(1000).fill('a').join(''), new Array(1000).fill('b').join(''), new Array(1000).fill('ab').join('')), true);


}

test();