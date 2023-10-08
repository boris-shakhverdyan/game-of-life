import Creature from "../../Entities/Creature/index.js";
import Position from "../Position/index.js";
import Collection from "./index.js";

class CreatureCollection<T extends Creature> extends Collection<T> {
    public index: number;

    constructor(index: number) {
        super([]);

        this.index = index;
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
