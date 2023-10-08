import { ICacheable } from "./types.js";

class Cache<T extends ICacheable<T>> {
    private _storage: T[] = [];

    constructor(initialStorage: T[] = []) {
        this._storage = initialStorage;
    }

    public has(value: T): boolean {
        return !!this._storage.filter((item) => item.isEqual(value))[0];
    }

    public push(value: T): Cache<T> {
        this._storage.push(value);

        return this;
    }
}

export default Cache;
