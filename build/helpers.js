import Entities from "./app/Modules/Entities/index.js";
import Matrix from "./app/Services/Matrix/index.js";
import Random from "./app/Services/Random/index.js";
export const repeat = (count, callback) => {
    for (let i = 0; i < count; i++) {
        callback();
    }
};
export function random(minOrArray, max) {
    if (Array.isArray(minOrArray)) {
        return Random.arrayItem(minOrArray);
    }
    return Random.number(minOrArray, max);
}
export function generateMatrix(withEntities = true) {
    if (withEntities) {
        Matrix.generate(20, 20, [
            { collection: Entities.grass, count: 25 },
            { collection: Entities.sheep, count: 10 },
            { collection: Entities.wolf, count: 4 },
            { collection: Entities.human, count: 4 },
            { collection: Entities.rabbit, count: 10 },
        ]);
    }
    else {
        Matrix.generate(20, 20);
    }
}
//# sourceMappingURL=helpers.js.map