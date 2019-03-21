// Given a list of numbers and a number k, return whether any two numbers from the list add up to k.

// For example, given [10, 15, 3, 7] and k of 17, return true since 10 + 7 is 17.

// Bonus: Can you do this in one pass?

var mapToProductDividedByElement = function (nums, k) {
    for (let i = 0; i < nums.length; i++) {
        for (let j = i; j < nums.length; j++) {
            if (nums[i] + nums[j] === k) { return true; }
        }
    }
    return false;
};

// Adhoc Testing
const verify = (nums, k, expected) => {
    const actual = mapToProductDividedByElement(nums, k);
    if (actual != expected) {
        throw new Exception("Failed to verify", { expected, actual, nums, k });
    }
}

const test = () => {
    verify([], 2, false);
    verify([1, 1], 0, false);
    verify([1, 1], 2, true);
    verify([1, 2, 3], 5, true);
    verify([1, 3, 5], 8, true);
    verify([1, 3, 5], 9, false);
};

test();
