// Author: Rick Love
// Start: 
// End: 

var method = function (n = 0) {
    return 0;
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
    verify(() => method(0), 0);

}

test();