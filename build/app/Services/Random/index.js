class Random {
    static number(min = 0, max = 1) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    static arrayItem(array) {
        return array[Random.number(0, array.length - 1)];
    }
    static matrixItem(matrix, type) {
        return matrix[Random.number(0, matrix.length - 1)][Random.number(0, matrix[0].length - 1)][type];
    }
}
export default Random;
//# sourceMappingURL=index.js.map