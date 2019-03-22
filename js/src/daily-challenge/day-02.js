// This problem was asked by Uber.
// Given an array of integers, return a new array such that each element at index i of the new array is the product of all the numbers in the original array except the one at i.
// For example, if our input was [1, 2, 3, 4, 5], the expected output would be [120, 60, 40, 30, 24]. If our input was [3, 2, 1], the expected output would be [2, 3, 6].
// Follow-up: what if you can't use division?
// Upgrade to premium and get in-depth solution

var mapToProductDividedByElement = function (nums) {
    const product = nums.reduce((out, x) => out *= x, 1);
    return nums.map(x => product / x);
};

// Adhoc Testing
const verify = (nums, expected) => {
    const actual = mapToProductDividedByElement(nums);
    if (JSON.stringify(actual) != JSON.stringify(expected)) {
        throw new Exception("Failed to verify", { expected, actual, nums });
    }
}

const test = () => {
    verify([1, 2, 3, 4, 5], [120, 60, 40, 30, 24]);
    verify([3, 2, 1], [2, 3, 6]);
};

test();
