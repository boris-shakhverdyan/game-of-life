import { repeat } from "../../../helpers.js";
import Position from "../Position/index.js";
import Random from "../Random/index.js";
import { EMPTYCELL_ID, GROUND_INDEX } from "../../../Constants/entities.js";
import Cache from "../Cache/index.js";
class Matrix {
    static isWithin(position) {
        if (position.x >= 0 && position.x < Matrix.WIDTH && position.y >= 0 && position.y < Matrix.HEIGHT) {
            return true;
        }
        return false;
    }
    static setAllInRow(y, value) {
        for (let x = 0; x < this.WIDTH; x++) {
            let position = new Position(x, y, GROUND_INDEX);
            this.setEmptyAll(position);
            this.set(position, value);
        }
        return this;
    }
    static setAllInColumn(x, value) {
        for (let y = 0; y < this.HEIGHT; y++) {
            let position = new Position(x, y, GROUND_INDEX);
            this.setEmptyAll(position);
            this.set(position, value);
        }
    }
    static get() {
        return this._matrix;
    }
    static getByPos(position, type = position.type) {
        return this._matrix[position.y][position.x][type];
    }
    static set(position, value, type = position.type) {
        this._matrix[position.y][position.x][type] = value;
    }
    static setEmpty(position, type = position.type) {
        this._matrix[position.y][position.x][type] = EMPTYCELL_ID;
    }
    static setEmptyAll(position) {
        this._matrix[position.y][position.x] = [EMPTYCELL_ID, EMPTYCELL_ID, EMPTYCELL_ID];
    }
    static isEqual(position, value, type = position.type) {
        return Array.isArray(value)
            ? value.includes(this.getByPos(position, type))
            : this.getByPos(position, type) === value;
    }
    static isEmptyCell(position, type = position.type) {
        return this.getByPos(position, type) === EMPTYCELL_ID;
    }
    static get HEIGHT() {
        return this._matrix.length;
    }
    static get WIDTH() {
        return this._matrix[0].length;
    }
    static get DEPTH() {
        return this._matrix[0][0].length;
    }
    static generate(width, height, entitiesCount = null) {
        this._matrix = [];
        for (let y = 0; y < height; y++) {
            this._matrix.push([]);
            for (let x = 0; x < width; x++) {
                this._matrix[y][x] = [EMPTYCELL_ID, EMPTYCELL_ID, EMPTYCELL_ID];
            }
        }
        if (entitiesCount) {
            entitiesCount.map((entityCount) => this.fillByEntity(entityCount));
        }
        return this;
    }
    static random(type) {
        return new Position(Random.number(0, this.WIDTH - 1), Random.number(0, this.HEIGHT - 1), type);
    }
    static fillByEntity({ count, collection, }) {
        const cache = new Cache();
        const fill = () => {
            const position = this.random(collection.type);
            if (!cache.has(position) && this.isEmptyCell(position)) {
                this.set(position, Array.isArray(collection.index) ? collection.index[0] : collection.index);
                collection.push(new collection.obj(position));
                cache.push(position);
                return;
            }
            fill();
        };
        repeat(count, fill);
        return this;
    }
}
export default Matrix;
//# sourceMappingURL=index.js.map