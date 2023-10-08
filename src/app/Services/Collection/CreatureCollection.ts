import Creature from "../../Entities/Creature/index.js";
import Position from "../Position/index.js";
import Collection from "./index.js";

class CreatureCollection<T extends Creature> extends Collection<T> {
    public deleteByPos(position: Position) {
        for (let index = 0; index < this.length; index++) {
            if (
                position.x === this[index].position.x &&
                position.y === this[index].position.y
            ) {
                this.splice(index, 1);
                break;
            }
        }
    }

    public run(callbackfn: (value: T, index: number, array: T[]) => void) {
        this.map(callbackfn);
    }
}

export default CreatureCollection;
