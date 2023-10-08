import Random from "../Random/index.js";

class Collection<T> extends Array<T> {
    constructor(array: Array<T> = []) {
        super(...array);
    }

    public random(): T {
        return Random.arrayItem(this);
    }
}

export default Collection;
