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
