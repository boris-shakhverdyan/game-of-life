import Creature from "../../Entities/Creature/index.js";
import Position from "../Position/index.js";
import Collection from "./index.js";

class CreatureCollection<T extends Creature> extends Collection<T> {
    public name: string;
    public index: number;
    public obj: any;
    public type: number;

    constructor(name: string, index: number, obj: any, type: number) {
        super([]);

        this.obj = obj;
        this.index = index;
        this.type = type;
        this.name = name;
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
