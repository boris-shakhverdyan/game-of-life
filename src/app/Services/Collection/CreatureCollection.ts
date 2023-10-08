import Creature from "../../Entities/Creature/index.js";
import Position from "../Position/index.js";
import Collection from "./index.js";

class CreatureCollection<T extends Creature> extends Collection<T> {
    public index: number;
    public obj: any;

    constructor(index: number, obj: any) {
        super([]);

        this.obj = obj;
        this.index = index;
    }

    public add(position: Position) {
        this._arr.push(new this.obj(position));
    }

    public deleteByPos(position: Position) {
        for (let index = 0; index < this._arr.length; index++) {
            if (
                position.x === this._arr[index].position.x &&
                position.y === this._arr[index].position.y
            ) {
                this._arr.splice(index, 1);
                break;
            }
        }
    }

    public run(callbackfn: (value: T, index: number, array: T[]) => void) {
        this._arr.map(callbackfn);
    }
}

export default CreatureCollection;
