import { TMatrix } from "../Matrix/types.js";
import Random from "../Random/index.js";

class Position {
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public isEqual(position: Position) {
        if(this.x === position.x && this.y === position.y) {
            return true;
        }

        return false;
    }
}

export default Position;
