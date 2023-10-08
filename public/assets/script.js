const socket = io();

const grassId = document.getElementById("Grass");
const grassEaterId = document.getElementById("GrassEater");
const predatorId = document.getElementById("Predator");
const humanId = document.getElementById("Human");
const rabbitId = document.getElementById("Rabbit");

const countOfIndex = (matrix, index) => {
    let result = 0;

    for(let y = 0; y < matrix.length; y++) {
        for(let x = 0; x < matrix[0].length; x++) {
            if(matrix[y][x] == index) {
                result++;
            }
        }
    }

    return result;
}

function setup() {
    socket.on("draw", ({ matrix, counts }) => {
        console.log(matrix, counts);

        console.log(countOfIndex(matrix, 1));

        const SIDE = 20;
        const BACKGROUND_COLOR = "#acacac";

        createCanvas(matrix[0].length * SIDE + 1, matrix.length * SIDE + 1);
        strokeWeight(0);
        background(BACKGROUND_COLOR);

        for (let y = 0; y < matrix.length; y++) {
            for (let x = 0; x < matrix[y].length; x++) {
                switch (matrix[y][x]) {
                    case 1:
                        fill("green");
                        break;
                    case 2:
                        fill("yellow");
                        break;
                    case 3:
                        fill("red");
                        break;
                    case 4:
                        fill("purple");
                        break;
                    case 5:
                        fill("blue");
                        break;
                    default:
                        fill(BACKGROUND_COLOR);
                }

                rect(x * SIDE, y * SIDE, SIDE, SIDE);
            }
        }

        grassId.innerHTML = counts.grass;
        grassEaterId.innerHTML = counts.grassEater;
        predatorId.innerHTML = counts.predator;
        humanId.innerHTML = counts.human;
        rabbitId.innerHTML = counts.rabbit;
    });
}
