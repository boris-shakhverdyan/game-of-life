import { repeat } from "../../../helpers.js";
import Position from "../Position/index.js";
import Random from "../Random/index.js";
import { TMatrix } from "./types.js";
import { EMPTYCELL_ID } from "../../Constants/entities.js";

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

    public static isEqual(position: Position, value: number): boolean {
        return this.getByPos(position) === value;
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
                this._matrix[y][x] = EMPTYCELL_ID;
            }
        }

        if (entitiesCount) {
            entitiesCount.map((entityCount) => this.fillByEntity(entityCount));
        }

        return this;
    }

    public static random(): Position {
        return new Position(
            Random.number(0, this.WIDTH - 1),
            Random.number(0, this.HEIGHT - 1)
        );
    }

    public static fillByEntity(entityCount: { index: number; count: number }) {
        const cache: Position[] = [];

        const fill = () => {
            const position = this.random();

            if (
                !cache.filter((item) => item.isEqual(position))[0] &&
                this.getByPos(position) === EMPTYCELL_ID
            ) {
                this.set(position, entityCount.index);
                cache.push(position);
                return;
            }

            fill();
        };

        repeat(entityCount.count, fill);

        return this;
    }
}

export default Matrix;
