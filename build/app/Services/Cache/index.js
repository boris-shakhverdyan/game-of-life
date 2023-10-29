class Cache {
    constructor(initialStorage = []) {
        this._storage = [];
        this._storage = initialStorage;
    }
    has(value) {
        return !!this._storage.filter((item) => item.isEqual(value))[0];
    }
    push(value) {
        this._storage.push(value);
        return this;
    }
}
export default Cache;
//# sourceMappingURL=index.js.map