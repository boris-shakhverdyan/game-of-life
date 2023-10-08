import { repeat } from "../../../helpers.js";
import Position from "../Position/index.js";
import Random from "../Random/index.js";
import { TMatrix } from "./types.js";
import { EMPTYCELL_ID } from "../../../Constants/entities.js";
import CreatureCollection from "../Collection/CreatureCollection.js";
import Cache from "../Cache/index.js";

class Matrix {
    private static _matrix: TMatrix<number>;

    public static get(): TMatrix<number> {
        return this._matrix;
    }

    public static getByPos(position: Position): number {
        return this._matrix[position.y][position.x][position.type];
    }

    public static set(position: Position, value: number, type: number = -1) {
        this._matrix[position.y][position.x][type >= 0 ? type : position.type] = value;
    }

    public static isEqual(position: Position, value: number): boolean {
        return this.getByPos(position) === value;
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

            if (!cache.has(position) && this.isEqual(position, EMPTYCELL_ID)) {
                this.set(position, collection.index);
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
