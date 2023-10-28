import { GROUND_INDEX } from "../../../Constants/entities.js";
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

    public isInRow(y: number) {
        return this.y === y;
    }

    public isEqual(position: Position, isStrict: boolean = true): boolean {
        if (this.isInCoords(position)) {
            if (isStrict && this.type === position.type) {
                return true;
            } else if (!isStrict && this.type !== position.type) {
                return true;
            }
        }

        return false;
    }

    public isInCoords({ x, y }: Position) {
        return this.x === x && this.y === y;
    }

    public set({ x, y, type }: Position, withType: boolean = false) {
        this.x = x;
        this.y = y;

        if (withType) {
            this.type = type;
        }
    }

    public static createFrom(list: [number, number][]) {
        let result = [];

        for (let [x, y] of list) {
            result.push(new Position(x, y, GROUND_INDEX));
        }

        return result;
    }
}

export default Position;
