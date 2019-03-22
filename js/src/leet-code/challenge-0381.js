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
    }

    /**
     * Inserts a value to the collection. Returns true if the collection did not already contain the specified element. 
     * @param {number} val
     * @return {boolean}
     */
    insert(val) {
        const items = this._items;
        const keyIndexes = this._keyIndexes;

        const i = items.push(val) - 1;
        keyIndexes[val] = (keyIndexes[val] || []);
        keyIndexes[val].push(i);

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

        if (!keyIndexes[val] || !keyIndexes[val].length) { return false; }

        // Remove that index
        const i = keyIndexes[val].pop();

        // Move the last item to that index
        const newVal = items.pop();
        const iToRemove = items.length;

        // If i was the last index, then already done
        if (i === iToRemove) { return true; }

        // Move newValue to empty index
        items[i] = newVal;

        // Remove extra keyIndex
        const k = keyIndexes[newVal];
        if (k[k.length - 1] === iToRemove) {
            k.pop();
        } else {
            const kIndex = k.indexOf(iToRemove);
            k[kIndex] = k.pop();
        }

        // Add new keyIndex
        k.push(i);

        return true;
    }

    /**
     * Get a random element from the collection.
     * @return {number}
     */
    getRandom() {
        const items = this._items;
        if (!items.length) { return 0; }

        return items[(items.length * Math.random()) | 0];
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


    verify(collection.insert(2), false);
    verify(collection.insert(2), false);
    verify(collection.insert(2), false);
    verify(collection.insert(1), false);
    verify(collection.insert(1), false);
    verify(collection.insert(1), false);
    verify(collection.remove(1), true);
    verify(collection.remove(1), true);
    verify(collection.remove(1), true);
    verify(collection.remove(2), true);
    verify(collection.remove(2), true);
    verify(collection.remove(2), true);

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
