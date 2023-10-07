function Rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var matrix = [];
var CountOfMatrix = 40;
var grassArr = [];
var grassEaterArr = [];
var predatorArr = [];
var humanArr = [];
var rabbitArr = [];
var side = 10;

var grassId = document.getElementById('Grass');
var grassEaterId = document.getElementById('GrassEater');
var predatorId = document.getElementById('Predator');
var humanId = document.getElementById('Human');
var rabbitId = document.getElementById('Rabbit');

function setup() {
    for (var i = 0; i < CountOfMatrix; i++) {
        matrix.push([]);

        for (var j = 0; j < CountOfMatrix; j++) {
            var t = Rand(0, 1500);

            if (t <= 700) {
                matrix[i][j] = 1;
            } else if (t > 700 && t <= 800) {
                matrix[i][j] = 2;
            } else if (t > 800 && t <= 850) {
                matrix[i][j] = 3;
            } else if (t > 850 && t <= 860) {
                matrix[i][j] = 4;
            } else if (t >= 861 && t <= 870) {
                matrix[i][j] = 5;
            } else {
                matrix[i][j] = 0;
            }
        }
    }

    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y, 1);
                grassArr.push(gr);
            } else if (matrix[y][x] == 2) {
                var et = new GrassEater(x, y, 2);
                grassEaterArr.push(et);
            } else if (matrix[y][x] == 3) {
                var pr = new Predator(x, y, 3);
                predatorArr.push(pr);
            } else if (matrix[y][x] == 4) {
                var hm = new Human(x, y, 4);
                humanArr.push(hm);
            } else if (matrix[y][x] == 5) {
                var rab = new Rabbit(x, y, 5);
                rabbitArr.push(rab);
            }
        }
    }
}

function draw() {
    frameRate(5);

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                stroke(1);
                fill("green");
                rect(x * side, y * side, side, side);
            } else if (matrix[y][x] == 2) {
                stroke(1);
                fill("yellow");
                rect(x * side, y * side, side, side);
            } else if (matrix[y][x] == 0) {
                noStroke();
                fill("#acacac");
                rect(x * side, y * side, side, side);
            } else if (matrix[y][x] == 3) {
                stroke(1);
                fill("red");
                rect(x * side, y * side, side, side);
            } else if (matrix[y][x] == 4) {
                stroke(1);
                fill("purple");
                rect(x * side, y * side, side, side);
            } else if (matrix[y][x] == 5) {
                stroke(1);
                fill("blue");
                rect(x * side, y * side, side, side);
            }
        }
    }

    for (var i in grassArr) {
        grassArr[i].mul();
    }

    for (var i in grassEaterArr) {
        grassEaterArr[i].move();
        grassEaterArr[i].eat();
        grassEaterArr[i].mul();
        grassEaterArr[i].die();
    }

    for (var i in predatorArr) {
        predatorArr[i].move();
        predatorArr[i].eat();
        predatorArr[i].mul();
        predatorArr[i].die();
    }

    for (var i in humanArr) {
        humanArr[i].move();
        humanArr[i].eat();
        humanArr[i].mul();
        humanArr[i].die();
    }

    for (var i in rabbitArr) {
        rabbitArr[i].move();
        rabbitArr[i].eat();
        rabbitArr[i].mul();
        rabbitArr[i].die();
    }

    grassId.innerHTML = grassArr.length;
    grassEaterId.innerHTML = grassEaterArr.length;
    predatorId.innerHTML = predatorArr.length;
    humanId.innerHTML = humanArr.length;
    rabbitId.innerHTML = rabbitArr.length;
}
