import Random from "../Random/index.js";

class Collection<T> {
    protected _arr: Array<T>;

    constructor(arr: Array<T>) {
        this._arr = arr;
    }

    public get size(): number {
        return this._arr.length;
    }

    public get(): Array<T> {
        return this._arr;
    }

    public push(value: T) {
        this._arr.push(value);
    }

    public random(): T {
        return Random.arrayItem(this._arr);
    }
}

export default Collection;
