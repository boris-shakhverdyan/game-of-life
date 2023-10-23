const socket = io();
let initialized = false;

const handleError = () => {
    $("troubleshootingAlert").classList.remove("hide");
    initialized = false;
};

const handleSuccess = () => {
    $("troubleshootingAlert").classList.add("hide");
    console.clear();
};

socket.on("connect", handleSuccess);
socket.on("connect_error", handleError);
socket.on("connect_failed", handleError);
socket.on("disconnect", handleError);

const MATRIX_WIDTH = 20;
const MATRIX_HEIGHT = MATRIX_WIDTH;
const CELLS_COUNT = MATRIX_HEIGHT * MATRIX_WIDTH;

const countOfIndex = (matrix, index, type = null) => {
    let result = 0;

    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (type === null) {
                for (let z = 0; z < matrix[y][x].length; z++) {
                    if (matrix[y][x][z] == index) {
                        result++;
                    } else if (type) {
                        matrix[y][x][z] == index;
                    }
                }
            } else {
                if (matrix[y][x][type] === index) {
                    result++;
                }
            }
        }
    }

    return result;
};

const $ = (id) => document.getElementById(id);

const programStartBtn = $("program-start");
const programStopBtn = $("program-stop");
const programRestartBtn = $("program-restart");

programStopBtn.addEventListener("click", function () {
    programStopBtn.setAttribute("disabled", true);
    programStartBtn.removeAttribute("disabled");

    socket.emit("program-status", "STOP");
});

programStartBtn.addEventListener("click", function () {
    programStartBtn.setAttribute("disabled", true);
    programStopBtn.removeAttribute("disabled");

    socket.emit("program-status", "RUN");
});

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

const entities = [
    { index: 1, name: "grass", title: "Grass" },
    { index: 2, name: "grassEater", title: "GrassEater" },
    { index: 3, name: "predator", title: "Predator" },
    { index: 4, name: "human", title: "Human" },
    { index: 5, name: "rabbit", title: "Rabbit" },
];

const printInfo = (matrix, counts) => {
    for (let entity of entities) {
        let countPrint = $("countOf" + entity.title);
        let matrixCountPrint = $("matrixCountOf" + entity.title);
        let differenceCountPrint = $("differenceCountOf" + entity.title);

        let realCount = counts[entity.name];
        let matrixCount = countOfIndex(matrix, entity.index);
        let diffCount = realCount - matrixCount;

        countPrint.innerText = realCount;
        matrixCountPrint.innerText = matrixCount;
        differenceCountPrint.innerText = diffCount;

        if (diffCount !== 0) {
            differenceCountPrint.classList.add("danger");
            console.log("DANGER: ", entity, { realCount, matrixCount, diffCount });

            programStopBtn.click();
        } else {
            differenceCountPrint.classList.remove("danger");
        }
    }
};
