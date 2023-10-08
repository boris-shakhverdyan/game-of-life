import { repeat } from "../../../helpers.js";
import Position from "../Position/index.js";
import Random from "../Random/index.js";
import { TMatrix } from "./types.js";

class Matrix {
    private static _matrix: TMatrix<number>;

    public static get(): TMatrix<number> {
        return this._matrix;
    }

    public static getByPos(position: Position): number {
        return this._matrix[position.y][position.x];
    }

    public static set(position: Position, value: number) {
        this._matrix[position.y][position.x] = value;
    }

    public static get HEIGHT() {
        return this._matrix.length;
    }

    public static get WIDTH() {
        return this._matrix[0].length;
    }

    public static generate(
        width: number,
        height: number,
        entitiesCount: { index: number; count: number }[] | null = null
    ) {
        this._matrix = [];

        for (let y = 0; y < height; y++) {
            this._matrix.push([]);

            for (let x = 0; x < width; x++) {
                this._matrix[y][x] = 0;
            }
        }

        if (entitiesCount) {
            entitiesCount.map((entityCount) =>
                this.fillByEntity(entityCount.index, entityCount.count)
            );
        }

        return this;
    }

    public static random(): Position {
        return new Position(
            Random.number(0, this._matrix.length),
            Random.number(0, this._matrix[0].length)
        );
    }

    public static fillByEntity(entityIndex: number, count: number) {
        let cache: Position[] = [];

        repeat(count, () => {
            let position = this.random();

            if (
                !cache.find(
                    (item) => item.x === position.x && item.y === position.y
                )
            ) {
                this._matrix[position.y][position.x] = entityIndex;
                cache.push(position);
            }
        });

        return this;
    }
}

export default Matrix;
