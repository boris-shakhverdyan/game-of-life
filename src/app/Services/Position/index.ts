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

    public isEqual({ x, y, type }: Position, isStrict: boolean = true): boolean {
        if (this.x === x && this.y === y) {
            if (isStrict && this.type === type) {
                return true;
            } else if (!isStrict && this.type !== type) {
                return true;
            }
        }

        return false;
    }

    public set({ x, y, type }: Position, withType: boolean = false) {
        this.x = x;
        this.y = y;

        if (withType) {
            this.type = type;
        }
    }
}

export default Position;
