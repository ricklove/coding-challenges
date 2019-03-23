// Author: Rick Love
// Start: 2019-03-23 16:47:19
// End: 2019-03-23 17:51:28
// Note: Not Submitted because case seems to be broken

/**
 * // Definition for a QuadTree TreeNode.
 * function TreeNode(val,isLeaf,topLeft,topRight,bottomLeft,bottomRight) {
 *    this.val = val;
 *    this.isLeaf = isLeaf;
 *    this.topLeft = topLeft;
 *    this.topRight = topRight;
 *    this.bottomLeft = bottomLeft;
 *    this.bottomRight = bottomRight;
 * };
 */
/**
 * @param {number[][]} grid
 * @return {TreeNode}
 */
var construct = function (grid = [[0]], range = { isEmpty: true, cMin: 0, cMax: 0, rMin: 0, rMax: 0 }) {
    if (grid.length === 0) { return new TreeNode(0, true); }
    if (grid.length === 1) { return new TreeNode(grid[0][0], true); }

    let r = range;
    if (r.isEmpty) {
        r = {
            cMin: 0, cMax: grid[0].length,
            rMin: 0, rMax: grid.length,
        };
    }

    const first = grid[r.rMin][r.cMin];

    if (r.cMax - r.cMin === 1) {
        return new TreeNode(first, true);
    }

    const isSame = grid.slice(r.rMin, r.rMax).filter(x => x
        .slice(r.cMin, r.cMax)
        .filter(y => y === first).length === (r.cMax - r.cMin)
    ).length === (r.rMax - r.rMin);

    if (isSame) {
        return new TreeNode(first, true);
    }


    const { cMin, cMax, rMin, rMax } = r;
    const cMid = (cMax - cMin) / 2 + cMin;
    const rMid = (rMax - rMin) / 2 + rMin;

    return new TreeNode(
        null, false,
        construct(grid, { cMin: cMin, cMax: cMid, rMin: rMin, rMax: rMid }),
        construct(grid, { cMin: cMid, cMax: cMax, rMin: rMin, rMax: rMid }),
        construct(grid, { cMin: cMin, cMax: cMid, rMin: rMid, rMax: rMax }),
        construct(grid, { cMin: cMid, cMax: cMax, rMin: rMid, rMax: rMax }),
    );
};

class TreeNode {
    constructor(val, isLeaf, topLeft, topRight, bottomLeft, bottomRight) {
        this.val = val;
        this.isLeaf = isLeaf;
        this.topLeft = topLeft;
        this.topRight = topRight;
        this.bottomLeft = bottomLeft;
        this.bottomRight = bottomRight;
    }
}

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
    verify(() => construct([
        [0]]), new TreeNode(0, true));
    verify(() => construct([
        [1]]), new TreeNode(1, true));
    verify(() => construct([
        [0, 0],
        [0, 0]]), new TreeNode(0, true));
    verify(() => construct([
        [1, 1],
        [1, 1]]), new TreeNode(1, true));

    verify(() => construct([
        [1, 1, 1, 1, 0, 0, 0, 0],
        [1, 1, 1, 1, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 0, 0, 0, 0],
        [1, 1, 1, 1, 0, 0, 0, 0],
        [1, 1, 1, 1, 0, 0, 0, 0],
        [1, 1, 1, 1, 0, 0, 0, 0]]),
        new TreeNode(null, false,
            new TreeNode(1, true),
            new TreeNode(null, false,
                new TreeNode(0, true),
                new TreeNode(0, true),
                new TreeNode(1, true),
                new TreeNode(1, true),
            ),
            new TreeNode(1, true),
            new TreeNode(0, true),
        )
    );
}

test();