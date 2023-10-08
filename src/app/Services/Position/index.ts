import { ICacheable } from "../Cache/types.js";

class Position implements ICacheable<Position> {
    public x: number;
    public y: number;
    public type: number;

    constructor(x: number, y: number, type: number) {
        this.x = x;
        this.y = y;
        this.type = type;
    }

    public isEqual({ x, y, type }: Position): boolean {
        if (this.x === x && this.y === y && this.type === type) {
            return true;
        }

        return false;
    }
}

export default Position;
