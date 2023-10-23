import Entities from "./app/Modules/Entities/index.js";
import Matrix from "./app/Services/Matrix/index.js";
import Random from "./app/Services/Random/index.js";

export const repeat = (count: number, callback: Function) => {
    for (let i = 0; i < count; i++) {
        callback();
    }
};

export function random(min: number, max: number): number;
export function random<T>(array: Array<T>): T;
export function random(minOrArray: number | Array<any>, max?: number) {
    if (Array.isArray(minOrArray)) {
        return Random.arrayItem(minOrArray);
    }

    return Random.number(minOrArray, max);
}

export function generateMatrix() {
    Matrix.generate(20, 20, [
        { collection: Entities.grass, count: 25 },
        { collection: Entities.grassEater, count: 2 },
        { collection: Entities.predator, count: 2 },
        // { collection: Entities.human, count: 1 },
        { collection: Entities.rabbit, count: 10 },
    ]);
}
