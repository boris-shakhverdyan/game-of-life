import Creature from "../../Entities/Creature/index.js";
import Position from "../Position/index.js";
import Collection from "./index.js";

class CreatureCollection<T extends Creature> extends Collection<T> {
    public index: number;
    public obj: any;
    public type: number;

    constructor(index: number, obj: any, type: number) {
        super([]);

        this.obj = obj;
        this.index = index;
        this.type = type;
    }

    public add(position: Position) {
        this._arr.push(new this.obj(position));

        return this;
    }

    public deleteByPos(position: Position) {
        this._arr = this._arr.filter((item) => !position.isEqual(item.position));

        return this;
    }

    public run(callbackfn: (value: T, index: number, array: T[]) => void) {
        this._arr.map(callbackfn);
    }
}

export default CreatureCollection;
