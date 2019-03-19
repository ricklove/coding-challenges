/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
const findMedianSortedArrays = (nums1, nums2) => {
    const totalCount = nums1.length + nums2.length;
    const targetIndex = 1 + ((totalCount / 2) | 0);

    let i = 0;
    let j = 0;
    let next1 = nums1.length ? nums1[0] : Infinity;
    let next2 = nums2.length ? nums2[0] : Infinity;
    let a = 0;
    let b = 0;

    while (i + j < targetIndex) {
        if (next1 < next2) {
            i++;
            a = b;
            b = next1;
            next1 = i < nums1.length ? nums1[i] : Infinity;
        } else {
            j++;
            a = b;
            b = next2;
            next2 = j < nums2.length ? nums2[j] : Infinity;
        }
    }

    if (totalCount % 2 == 1) {
        return a > b ? a : b;
    } else {
        return (a + b) / 2.0;
    }
};

// Adhoc Testing
const verify = (nums1, nums2, expected) => {
    const actual = findMedianSortedArrays(nums1, nums2);
    if (actual != expected) {
        throw new Exception("Failed to verify", { expected, actual, num1, nums2 });
    }
}

const test = () => {
    verify([1], [1], 1);
    verify([10], [], 10);
    verify([], [2, 3], 2.5);
    verify([1, 2, 3], [0, 4], 2);
    verify([1, 2, 3], [1, 2, 3], 2);
    verify([1, 2, 3], [4, 5, 6], 3.5);
    verify([0, 1, 2, 3], [4, 5, 6], 3);
    verify([1, 3, 5], [0, 2, 4, 6], 3);
};

test();
