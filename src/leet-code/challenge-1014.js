/** Return the minimum capacity needed to pack the weights into D shipments (without changing order)
 * @param {number[]} weights
 * @param {number} D
 * @return {number}
 */
var shipWithinDays = function (weights, D) {
    // const total = weights.reduce((out, x) => out += x);
    const max = weights.reduce((out, x) => Math.max(out, x));

    let c = max;
    while (true) {
        let d = 0;
        let daySize = 0;
        let canFit = true;
        for (let iWeight = 0; iWeight < weights.length; iWeight++) {
            const w = weights[iWeight];
            if (daySize + w <= c) {
                daySize += w;
                continue;
            }

            d++;
            daySize = w;

            if (d >= D) {
                // Failed to fit in allowed days
                canFit = false;
                break;
            }
        }

        if (canFit) {
            return c;
        }

        c++;
    }
};


var shipWithinDays_noOrder = function (weights, D) {
    // const total = weights.reduce((out, x) => out += x);
    // const max = weights.reduce((out, x) => Math.max(out, x));
    weights = weights.slice().sort((a, b) => a - b);
    const bins = new Array(D).fill(0);

    while (weights.length) {
        bins.sort((a, b) => a - b);
        bins[0] += weights.pop();
    }

    const binMax = bins.reduce((out, x) => Math.max(out, x));
    return binMax;
};


// Adhoc Testing
const verify = (weights, days, expected) => {
    const actual = shipWithinDays(weights, days);
    if (actual != expected) {
        throw new Exception("Failed", { expected, actual, weights, days });
    }
}

function test() {

    verify([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5, 15);
    verify([3, 2, 2, 4, 1, 4], 3, 6);
    verify([1, 2, 3, 1, 1], 4, 3);

    // 1 <= D <= weights.length <= 50000
    // 1 <= weights[i] <= 500
    verify([1], 1, 1);
    verify([500], 1, 500);
    verify([600, 1], 1, 601);
    verify([60, 60, ...new Array(50000).fill(1)], 50002, 60);
    verify([...new Array(50000).fill(10)], 50000, 10);
    verify([...new Array(50000).fill(500)], 5000, 5000);
}

test();