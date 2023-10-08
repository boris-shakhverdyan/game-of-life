let socket = io();

var grassId = document.getElementById("Grass");
var grassEaterId = document.getElementById("GrassEater");
var predatorId = document.getElementById("Predator");
var humanId = document.getElementById("Human");
var rabbitId = document.getElementById("Rabbit");

function setup() {
    socket.on("draw", ({ matrix, counts }) => {
        console.log(matrix, counts);
        const SIDE = 20;
        const BACKGROUND_COLOR = "#acacac";

        createCanvas(matrix[0].length * SIDE + 1, matrix.length * SIDE + 1);
        strokeWeight(1);
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
