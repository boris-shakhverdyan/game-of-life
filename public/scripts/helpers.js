const socket = io();
let initialized = false;

const $ = (id) => document.getElementById(id);

const countOfIndex = (matrix, index, type = null) => {
    let result = 0;

    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (type === null) {
                for (let z = 0; z < matrix[y][x].length; z++) {
                    if (Array.isArray(index) ? index.includes(matrix[y][x][z]) : matrix[y][x][z] == index) {
                        result++;
                    }
                }
            } else {
                if (
                    Array.isArray(index) ? index.includes(matrix[y][x][type]) : matrix[y][x][type] === index
                ) {
                    result++;
                }
            }
        }
    }

    return result;
};

const printCells = (matrix) => {
    const types = [
        { name: "ground", index: 1 },
        { name: "animal", index: 0 },
    ];

    for (let { name, index } of types) {
        let countOfEmpty = countOfIndex(matrix, 0, index);
        let countOfBusy = CELLS_COUNT - countOfEmpty;
        let differenceCount = CELLS_COUNT - (countOfEmpty + countOfBusy);

        let differenceHTML = $(name + "Difference");

        $(name + "Empty").innerText = countOfEmpty;
        $(name + "Busy").innerText = countOfBusy;
        differenceHTML.innerText = differenceCount;

        if (differenceCount !== 0) {
            differenceHTML.classList.add("danger");
            console.log("DANGER-DIFFERENCE_CELLS: ", {
                name,
                index,
                countOfEmpty,
                countOfBusy,
                differenceCount,
            });
        } else {
            differenceHTML.classList.remove("danger");
        }
    }
};

const printInfo = (matrix, counts) => {
    for (let entity of entities) {
        let countPrint = $("countOf" + entity.title);
        let matrixCountPrint = $("matrixCountOf" + entity.title);
        let differenceCountPrint = $("differenceCountOf" + entity.title);

        let realCount = counts[entity.name];
        let matrixCount = countOfIndex(matrix, entity.sum ? [entity.sum, entity.index] : entity.index);
        let diffCount = realCount - matrixCount;

        countPrint.innerText = realCount;
        matrixCountPrint.innerText = matrixCount;
        differenceCountPrint.innerText = diffCount;

        if (diffCount !== 0) {
            differenceCountPrint.classList.add("danger");
            console.warn("DANGER: ", entity, { realCount, matrixCount, diffCount });
        } else {
            differenceCountPrint.classList.remove("danger");
        }
    }
};
