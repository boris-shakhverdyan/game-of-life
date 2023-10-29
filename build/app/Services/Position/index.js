import { GROUND_INDEX } from "../../../Constants/entities.js";
class Position {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type;
    }
    isInRow(y) {
        return this.y === y;
    }
    isEqual(position, isStrict = true) {
        if (this.isInCoords(position)) {
            if (isStrict && this.type === position.type) {
                return true;
            }
            else if (!isStrict && this.type !== position.type) {
                return true;
            }
        }
        return false;
    }
    isInCoords({ x, y }) {
        return this.x === x && this.y === y;
    }
    set({ x, y, type }, withType = false) {
        this.x = x;
        this.y = y;
        if (withType) {
            this.type = type;
        }
    }
    static createFrom(list) {
        let result = [];
        for (let [x, y] of list) {
            result.push(new Position(x, y, GROUND_INDEX));
        }
        return result;
    }
}
export default Position;
//# sourceMappingURL=index.js.map