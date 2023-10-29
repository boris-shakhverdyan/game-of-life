import Random from "../Random/index.js";
class Collection {
    constructor(arr) {
        this._arr = arr;
    }
    get size() {
        return this._arr.length;
    }
    get() {
        return this._arr;
    }
    push(value) {
        this._arr.push(value);
    }
    random() {
        return Random.arrayItem(this._arr);
    }
    *[Symbol.iterator]() {
        for (let item of this._arr) {
            yield item;
        }
    }
}
export default Collection;
//# sourceMappingURL=index.js.map