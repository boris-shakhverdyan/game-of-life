const socket = io();

const grassId = document.getElementById("Grass");
const grassEaterId = document.getElementById("GrassEater");
const predatorId = document.getElementById("Predator");
const humanId = document.getElementById("Human");
const rabbitId = document.getElementById("Rabbit");

const countOfIndex = (matrix, index) => {
    let result = 0;

    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[0].length; x++) {
            if (matrix[y][x] == index) {
                result++;
            }
        }
    }

    return result;
};

function setup() {
    socket.on("draw", ({ matrix, counts, entities }) => {
        console.log(matrix, counts, entities);

        const SIDE = 20;
        const BACKGROUND_COLOR = "#acacac";
        const SIDE_E = SIDE * 0.75;

        createCanvas(matrix[0].length * SIDE + 1, matrix.length * SIDE + 1);
        background(BACKGROUND_COLOR);

        for (let y = 0; y < matrix.length; y++) {
            for (let x = 0; x < matrix[y].length; x++) {
                entities.map((entity) => {
                    if (matrix[y][x][entity.type] === entity.index) {
                        strokeWeight(entity.type === 0 ? 1 : 0);
                        fill(entity.color);

                        switch (entity.type) {
                            case 0:
                                ellipse(SIDE * x + SIDE / 2, SIDE * y + SIDE / 2, SIDE_E, SIDE_E);
                                break;
                            case 1:
                                rect(x * SIDE, y * SIDE, SIDE, SIDE);
                        }
                    }
                });
            }
        }

        grassId.innerHTML = counts.grass;
        grassEaterId.innerHTML = counts.grassEater;
        predatorId.innerHTML = counts.predator;
        humanId.innerHTML = counts.human;
        rabbitId.innerHTML = counts.rabbit;
    });
}
