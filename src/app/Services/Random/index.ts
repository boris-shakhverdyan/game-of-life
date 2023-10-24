import { TMatrix } from "../Matrix/types.js";

class Random {
    /**
     * Get random number from range.
     *
     * @param {Number} min Minimum number that can be returned.
     * @param {Number} max Maximum number that can be returned.
     *
     * @returns Random number from range.
     */
    public static number(min: number = 0, max: number = 1): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * Get random element from array.
     *
     * @param {Array} array The array itself.
     *
     * @returns Random element from array.
     */
    static arrayItem<T>(array: Array<T>): T {
        return array[Random.number(0, array.length - 1)];
    }

    /**
     * Get random element from matrix.
     *
     * @param {TMatrix} matrix The matrix itself.
     *
     * @returns Random element from matrix.
     */
    static matrixItem<T>(matrix: TMatrix<T>, type: number): T {
        return matrix[Random.number(0, matrix.length - 1)][Random.number(0, matrix[0].length - 1)][type];
    }
}

export default Random;
