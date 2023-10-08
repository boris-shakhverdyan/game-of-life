class Human extends Entity {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 10;
    }

    move() {
        var newCell = random(this.chooseCell(0));

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 4;

            this.y = newY;
            this.x = newX;
            this.energy -= 2;
        }
    }

    eat() {
        var newCell = random(this.chooseCell(1));
        var newCell_1 = random(this.chooseCell(2));
        var newCell_2 = random(this.chooseCell(3));
        var newCell_3 = random(this.chooseCell(5));

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 4;

            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }

            this.y = newY;
            this.x = newX;
            this.energy += 3;
        }

        if (newCell_1) {
            var newX = newCell_1[0];
            var newY = newCell_1[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 4;

            for (var i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }

            this.y = newY;
            this.x = newX;
            this.energy += 5;
        }

        if (newCell_2) {
            var newX = newCell_2[0];
            var newY = newCell_2[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 4;

            for (var i in predatorArr) {
                if (newX == predatorArr[i].x && newY == predatorArr[i].y) {
                    predatorArr.splice(i, 1);
                    break;
                }
            }

            this.y = newY;
            this.x = newX;
            this.energy += 2;
        }

        if (newCell_3) {
            var newX = newCell_3[0];
            var newY = newCell_3[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 4;

            for (var i in rabbitArr) {
                if (newX == rabbitArr[i].x && newY == rabbitArr[i].y) {
                    rabbitArr.splice(i, 1);
                    break;
                }
            }

            this.y = newY;
            this.x = newX;
            this.energy += 3;
        }
    }

    mul() {
        var newCell = random(this.chooseCell(0));

        if (this.energy > 15 && newCell) {
            var newHuman = new Human(newCell[0], newCell[1], 4);
            humanArr.push(newHuman);
            matrix[newCell[1]][newCell[0]] = 4;
            this.energy = 5;
        }
    }

    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0;
            for (var i in humanArr) {
                if (this.x == humanArr[i].x && this.y == humanArr[i].y) {
                    humanArr.splice(i, 1);
                    break;
                }
            }
        }
    }
}