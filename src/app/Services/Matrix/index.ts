import { repeat } from "../../../helpers.js";
import Position from "../Position/index.js";
import Random from "../Random/index.js";
import { TMatrix } from "./types.js";
import { EMPTYCELL_ID, GROUND_INDEX } from "../../../Constants/entities.js";
import CreatureCollection from "../Collection/CreatureCollection.js";
import Cache from "../Cache/index.js";

class Matrix {
    private static _matrix: TMatrix<number>;

    public static isWithin(position: Position): boolean {
        if (position.x >= 0 && position.x < Matrix.WIDTH && position.y >= 0 && position.y < Matrix.HEIGHT) {
            return true;
        }

        return false;
    }

    public static setAllInRow(y: number, value: number) {
        for (let x = 0; x < this.WIDTH; x++) {
            let position = new Position(x, y, GROUND_INDEX);
            this.setEmptyAll(position);

            this.set(position, value);
        }

        return this;
    }

    public static setAllInColumn(x: number, value: number) {
        for (let y = 0; y < this.HEIGHT; y++) {
            let position = new Position(x, y, GROUND_INDEX);
            this.setEmptyAll(position);

            this.set(position, value);
        }
    }

    public static get(): TMatrix<number> {
        return this._matrix;
    }

    public static getByPos(position: Position, type: number = position.type): number {
        return this._matrix[position.y][position.x][type];
    }

    public static set(position: Position, value: number, type: number = position.type) {
        this._matrix[position.y][position.x][type] = value;
    }

    public static setEmpty(position: Position, type: number = position.type) {
        this._matrix[position.y][position.x][type] = EMPTYCELL_ID;
    }

    public static setEmptyAll(position: Position) {
        this._matrix[position.y][position.x] = [EMPTYCELL_ID, EMPTYCELL_ID, EMPTYCELL_ID];
    }

    public static isEqual(
        position: Position,
        value: number | number[],
        type: number = position.type
    ): boolean {
        return Array.isArray(value)
            ? value.includes(this.getByPos(position, type))
            : this.getByPos(position, type) === value;
    }

    public static isEmptyCell(position: Position, type: number = position.type): boolean {
        return this.getByPos(position, type) === EMPTYCELL_ID;
    }

    public static get HEIGHT() {
        return this._matrix.length;
    }

    public static get WIDTH() {
        return this._matrix[0].length;
    }

    public static get DEPTH() {
        return this._matrix[0][0].length;
    }

    public static generate(
        width: number,
        height: number,
        entitiesCount:
            | {
                  count: number;
                  collection: CreatureCollection<any>;
              }[]
            | null = null
    ) {
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

    public static random(type: number): Position {
        return new Position(Random.number(0, this.WIDTH - 1), Random.number(0, this.HEIGHT - 1), type);
    }

    public static fillByEntity({
        count,
        collection,
    }: {
        count: number;
        collection: CreatureCollection<any>;
    }) {
        const cache = new Cache<Position>();

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
