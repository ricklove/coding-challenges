/** 
 * Your RandomizedCollection object will be instantiated and called as such:
 * var obj = Object.create(RandomizedCollection).createNew()
 * var param_1 = obj.insert(val)
 * var param_2 = obj.remove(val)
 * var param_3 = obj.getRandom()
 */

class RandomizedCollection {

    constructor() {
        this._items = [];
        this._keyIndexes = {};
        this._count = 0;
        this._freeIndexes = [];
    }

    /**
     * Inserts a value to the collection. Returns true if the collection did not already contain the specified element. 
     * @param {number} val
     * @return {boolean}
     */
    insert(val) {
        const items = this._items;
        const keyIndexes = this._keyIndexes;
        const freeIndexes = this._freeIndexes;

        const i = freeIndexes.length ? freeIndexes.pop() : items.length;
        items[i] = val;
        keyIndexes[val] = (keyIndexes[val] || []);
        keyIndexes[val].push(i);
        this._count++;

        return (keyIndexes[val].length == 1);
    }

    /**
     * Removes a value from the collection. Returns true if the collection contained the specified element. 
     * @param {number} val
     * @return {boolean}
     */
    remove(val) {
        const items = this._items;
        const keyIndexes = this._keyIndexes;
        const freeIndexes = this._freeIndexes;

        if (!keyIndexes[val] || !keyIndexes[val].length) { return false; }

        const i = keyIndexes[val].pop();
        items[i] = undefined;
        this._count--;
        this._freeIndexes.push(i);

        return true;
    }

    /**
     * Get a random element from the collection.
     * @return {number}
     */
    getRandom() {
        if (this._count <= 0) { return 0; }

        const items = this._items;

        while (true) {
            const iRand = (Math.random() * items.length) | 0;
            const val = items[iRand];
            if (val !== undefined) { return val; }
        }
    }
}




// Adhoc Testing
const verify = (actual, expected) => {
    if (actual != expected && (!expected.indexOf || expected.indexOf(actual) < 0)) {
        throw new Exception("Failed", { expected, actual });
    }
}

const test = () => {
    const collection = new (RandomizedCollection);

    // Inserts 1 to the collection. Returns true as the collection did not contain 1.
    verify(collection.insert(1), true);

    // Inserts another 1 to the collection. Returns false as the collection contained 1. Collection now contains [1,1].
    verify(collection.insert(1), false);

    // Inserts 2 to the collection, returns true. Collection now contains [1,1,2].
    verify(collection.insert(2), true);

    // getRandom should return 1 with the probability 2/3, and returns 2 with the probability 1/3.
    verify(collection.getRandom(), [1, 2]);

    // Removes 1 from the collection, returns true. Collection now contains [1,2].
    verify(collection.remove(1), true);

    // getRandom should return 1 and 2 both equally likely.
    verify(collection.getRandom(), [1, 2]);

    verify(collection.remove(1), true);
    verify(collection.remove(1), false);
    verify(collection.remove(1), false);
    verify(collection.insert(2), false);
    verify(collection.insert(2), false);
    verify(collection.insert(2), false);
    verify(collection.getRandom(), [2]);
    verify(collection.getRandom(), [2]);
    verify(collection.getRandom(), [2]);
    verify(collection.getRandom(), [2]);
    verify(collection.insert(1), true);
    verify(collection.getRandom(), [1, 2]);
    verify(collection.remove(2), true);
    verify(collection.remove(2), true);
    verify(collection.remove(2), true);
    verify(collection.remove(2), true);
    verify(collection.remove(2), false);
    verify(collection.getRandom(), [1]);
    verify(collection.getRandom(), [1]);
    verify(collection.getRandom(), [1]);
    verify(collection.getRandom(), [1]);
    verify(collection.getRandom(), [1]);

    for (let i = 0; i < 1000000; i++) {
        verify(collection.insert(1), false);
        verify(collection.getRandom(), [1]);
    }
    for (let i = 0; i < 1000000; i++) {
        verify(collection.remove(1), true);
        verify(collection.getRandom(), [1]);
    }

    verify(collection.getRandom(), [1]);

    for (let i = 0; i < 1000000; i++) {
        collection.remove(1);
    }

    verify(collection.remove(1), false);
    verify(collection.getRandom(), 0);
};

test();
