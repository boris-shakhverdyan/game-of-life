import Matrix from "../Matrix/index.js";
import Position from "../Position/index.js";
class Directions {
    static get(position, radius, type = position.type) {
        let result = [];
        let XRMinus = position.x - radius < 0 ? 0 : position.x - radius;
        let XRPlus = position.x + radius > Matrix.WIDTH - 1 ? Matrix.WIDTH - 1 : position.x + radius;
        let YRMinus = position.y - radius < 0 ? 0 : position.y - radius;
        let YRPlus = position.y + radius > Matrix.HEIGHT - 1 ? Matrix.HEIGHT - 1 : position.y + radius;
        for (let y = YRMinus; y <= YRPlus; y++) {
            for (let x = XRMinus; x <= XRPlus; x++) {
                if (y === position.y && x === position.x && position.type === type)
                    continue;
                result.push(new Position(x, y, type >= 0 ? type : position.type));
            }
        }
        return result;
    }
    static small(position) {
        return this.get(position, 1);
    }
    static medium(position) {
        return this.get(position, 2);
    }
    static large(position) {
        return this.get(position, 3);
    }
    static huge(position) {
        return this.get(position, 4);
    }
}
export default Directions;
//# sourceMappingURL=index.js.map