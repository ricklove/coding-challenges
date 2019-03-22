// Author: Rick Love
// Start:  2019-03-22 11:46:46 
// End: 2019-03-22 12:42:02

/*
This problem was asked by Google.

Given the root to a binary tree, implement serialize(root), which serializes the tree into a string, and deserialize(s), which deserializes the string back into the tree.

For example, given the following Node class

class Node:
    def __init__(self, val, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
The following test should pass:

node = Node('root', Node('left', Node('left.left')), Node('right'))
assert deserialize(serialize(node)).left.left.val == 'left.left'
*/

const serialize = (root, depth = 0) => {
    const indent = new Array(depth).fill('-').join('');
    const space_child = '\n';
    //const text = `${indent}${root.val}${indent_child}${serialize(root.left)}${indent_child}${serialize(root.right)}`;
    let text = indent + root.val;
    if (root.left) { text += space_child + serialize(root.left, depth + 1); }
    if (root.right) { text += space_child + serialize(root.right, depth + 1); }
    return text;
};

const deserialize = (s) => {
    return deserializeInner(s.split('\n')).node;
};

const deserializeInner = (lines, i = 0) => {
    if (i >= lines.length) {
        return { node: null, lineCount: 0 };
    }

    const lineN = lines[i];
    const lineL = lines[i + 1] || '';

    const lineN_trimmed = lineN.replace(/^-*/, '');
    const lineL_trimmed = lineL.replace(/^-*/, '');

    const depthN = lineN.length - lineN_trimmed.length;
    const depthL = lineL.length - lineL_trimmed.length;

    let left_result = { node: null, lineCount: 0 };
    let right_result = { node: null, lineCount: 0 };

    if (depthL > depthN) {
        left_result = deserializeInner(lines, i + 1);
    }

    if (left_result.lineCount > 0) {
        const lineR = lines[i + left_result.lineCount];
        const lineR_trimmed = lineR.replace(/^-*/, '');
        const depthR = lineR.length - lineR_trimmed.length;
        if (depthR > depthN) {
            right_result = deserializeInner(lines, i + 1 + left_result.lineCount);
        }
    }

    return { node: new Node(lineN_trimmed, left_result.node, right_result.node), lineCount: 1 + left_result.lineCount + right_result.lineCount };
};

class Node {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

// Adhoc Testing
const verify = (callback, args, expected) => {
    const actual = callback.apply(null, args);
    if (JSON.stringify({ data: actual }) != JSON.stringify({ data: expected })) {
        throw new Exception("Failed to verify", { expected, actual, args });
    }
}

const test = () => {

    const tree = new Node('a', new Node('a.a', new Node('a.a.a'), new Node('a.a.b')), new Node('a.b', new Node('a.b.a'), new Node('a.b.b')));
    const treeText = `
a
-a.a
--a.a.a
--a.a.b
-a.b
--a.b.a
--a.b.b
    `.replace('\r\n', '\n').trim();
    verify(serialize, [tree], treeText);
    verify(deserialize, [treeText], tree);

    const node = new Node('root', new Node('left', new Node('left.left')), new Node('right'))
    const node_loop = deserialize(serialize(node))
    verify(() => node_loop.left.left.val, [], 'left.left');
};

test();
