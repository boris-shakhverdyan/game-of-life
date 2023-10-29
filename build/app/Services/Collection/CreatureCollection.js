import Collection from "./index.js";
class CreatureCollection extends Collection {
    constructor(name, index, obj, type) {
        super([]);
        this.obj = obj;
        this.index = index;
        this.type = type;
        this.name = name;
    }
    filter(callbackfn) {
        this._arr = this._arr.filter(callbackfn);
        return this;
    }
    add(position) {
        this._arr.push(new this.obj(position));
        return this;
    }
    deleteByPos(position, strict = true) {
        this._arr = this._arr.filter((item) => !position[strict ? "isEqual" : "isInCoords"](item.position));
        return this;
    }
    run(callbackfn) {
        this._arr.map(callbackfn);
    }
    getByPos(position) {
        return this._arr.find((item) => item.position.isEqual(position));
    }
}
export default CreatureCollection;
//# sourceMappingURL=CreatureCollection.js.map