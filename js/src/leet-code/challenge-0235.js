// Author: Rick Love
// Start: ?
// Pause: 2019-03-23 19:19:55
// Unpause: 2019-03-23 19:51:31
// End: 2019-03-23 20:15:25
// Note: Wasted time because the inputs and outputs were actually nodes after all

/*
235. Lowest Common Ancestor of a Binary Search Tree
Easy

Given a binary search tree (BST), find the lowest common ancestor (LCA) of two given nodes in the BST.

According to the definition of LCA on Wikipedia: “The lowest common ancestor is defined between two nodes p and q as the lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself).”

Given binary search tree:  root = [6,2,8,0,4,7,9,null,null,3,5]


Example 1:

Input: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8
Output: 6
Explanation: The LCA of nodes 2 and 8 is 6.
Example 2:

Input: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4
Output: 2
Explanation: The LCA of nodes 2 and 4 is 2, since a node can be a descendant of itself according to the LCA definition.
 

Note:

All of the nodes' values will be unique.
p and q are different and both values will exist in the BST.
*/

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/** Return least common anscestor between both nodes
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */

// [6, 2,8, 0,4,7,9, null,null,3,5 ]
var lowestCommonAncestor = function (values = ['a', 'aa', 'ab', 'aaa', 'aab', 'aba', 'abb', 'aaaa', 'aaab', 'aaba', 'aabb'], p = 'aa', q = 'ab') {

    // Build tree
    const nodes = values.map(x => new TreeNode(x));
    const rootNode = buildTree(nodes, 0);
    return lowestCommonAncestor_inner(rootNode, nodes.filter(x => x.val == p)[0], nodes.filter(x => x.val == q)[0]);
}

function buildTree(nodes, i = 0) {

    // // 0 => 1 => 3 => 7 => 15 => 33
    // const iLevelStart = (i / 2) | 0;
    // // 1 => 2 => 4 => 8
    // const iLevelOffset = i - iLevelStart;

    // const iLevelStartNext = iLevelStart << 1 + 1;
    // const iLevelOffsetNext = 

    // // 0 => 1,2
    // // 1 => 1*2+0 => 2
    // // 2 => 1*2+0+1 => 3
    // const iLeft = iLevelStartNext + (iLevelOffset * 2);
    // const iRight = iLevelStartNext + (iLevelOffset * 2) + 1;

    // const iLeft = (i + 1) << 1 - 1;
    // const iRight = (i + 1) << 1;

    if (!nodes[i]) {
        return;
    }

    // Record i for debugging
    nodes[i].index = i;

    const iLeft = i * 2 + 1;
    const iRight = i * 2 + 2;
    nodes[i].left = nodes[iLeft];
    nodes[i].right = nodes[iRight];

    if (nodes[iLeft]) { buildTree(nodes, iLeft); }
    if (nodes[iRight]) { buildTree(nodes, iRight); }

    return nodes[i];
}

var lowestCommonAncestor_inner = function (root = new TreeNode(0), p = new TreeNode(0), q = new TreeNode(0)) {

    addParents(root, null);
    const pa = getAncestors(p, [p]);
    const qa = getAncestors(q, [q]);

    let iRev = 0;

    while (iRev < pa.length && iRev < qa.length) {
        if (pa[pa.length - 1 - iRev] !== qa[qa.length - 1 - iRev]) {
            // Fail
            break;
        }

        iRev++;
    }

    const common = pa[pa.length - 1 - (iRev - 1)];
    return common.val;
};

function addParents(n = new TreeNode(0), parent = new TreeNode(0)) {
    n.parent = parent;
    if (n.left) addParents(n.left, n);
    if (n.right) addParents(n.right, n);
}

function getAncestors(n = new TreeNode(0), ancestors = []) {
    if (n.parent) {
        ancestors.push(n.parent);
        return getAncestors(n.parent, ancestors);
    }

    return ancestors;
}

class TreeNode {
    constructor(val = 0, left = null, right = null) {
        this.val = val;

        // Give these type
        this.left = this.right = this.parent = this;
        this.left = this.right = this.parent = null;

        this.left = left;
        this.right = right;
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

    const aaaa = new TreeNode('aaaa');
    const aaa = new TreeNode('aaa', aaaa);
    const aab = new TreeNode('aab');
    const aa = new TreeNode('aa', aaa, aab);
    const ab = new TreeNode('ab');
    const a = new TreeNode('a', aa, ab);

    verify(() => lowestCommonAncestor_inner(a, aa, ab), a.val);
    verify(() => lowestCommonAncestor_inner(a, aa, aaa), aa.val);
    verify(() => lowestCommonAncestor_inner(a, aaa, aaaa), aaa.val);
    verify(() => lowestCommonAncestor_inner(a, aaa, aab), aa.val);

    verify(() => lowestCommonAncestor(['a', 'aa', 'ab', 'aaa', 'aab', 'aba', 'abb', 'aaaa', 'aaab', 'aaba', 'aabb'], 'aaa', 'aba'), 'a');
    verify(() => lowestCommonAncestor([6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], 2, 8), 6);
    verify(() => lowestCommonAncestor([6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], 2, 4), 2);
}

test();