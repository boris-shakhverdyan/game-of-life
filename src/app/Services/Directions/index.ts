import Matrix from "../Matrix/index.js";
import Position from "../Position/index.js";

class Directions {
    /**
     * Get all coordinates in perimeter
     *
     * @param {Position} position position
     * @param {number} radius radius
     */
    public static get(position: Position, radius: number, type: number = -1) {
        let result = [];

        let XRMinus = position.x - radius < 0 ? 0 : position.x - radius;
        let XRPlus = position.x + radius > Matrix.WIDTH - 1 ? Matrix.WIDTH - 1 : position.x + radius;
        let YRMinus = position.y - radius < 0 ? 0 : position.y - radius;
        let YRPlus = position.y + radius > Matrix.HEIGHT - 1 ? Matrix.HEIGHT - 1 : position.y + radius;

        for (let y = YRMinus; y <= YRPlus; y++) {
            for (let x = XRMinus; x <= XRPlus; x++) {
                if (y === position.y && x === position.x) continue; // FIXME: GrassEater can't eat the grass under him.

                result.push(new Position(x, y, type >= 0 ? type : position.type));
            }
        }

        return result;
    }

    /**
     * Get small directions list
     *
     * Radius = 1
     *
     * @param {Position} position position
     */
    public static small(position: Position) {
        return this.get(position, 1);
    }

    /**
     * Get medium directions list
     *
     * Radius = 2
     *
     * @param {Position} position position
     */
    public static medium(position: Position) {
        return this.get(position, 2);
    }

    /**
     * Get large directions list
     *
     * Radius = 3
     *
     * @param {Position} position position
     */
    public static large(position: Position) {
        return this.get(position, 3);
    }

    /**
     * Get huge directions list
     *
     * Radius = 4
     *
     * @param {Position} position position
     */
    public static huge(position: Position) {
        return this.get(position, 4);
    }
}

export default Directions;
