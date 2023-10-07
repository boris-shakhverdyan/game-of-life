class Grass{
    constructor(x, y, index) {
       this.x = x;
       this.y = y;
       this.index = index;
       this.multiply = 0;

       this.directions = [
	        [this.x - 1, this.y - 1],
	        [this.x    , this.y - 1],
	        [this.x + 1, this.y - 1],
	        [this.x - 1, this.y    ],
	        [this.x + 1, this.y    ],
	        [this.x - 1, this.y + 1],
	        [this.x    , this.y + 1],
	        [this.x + 1, this.y + 1]
	    ];
    }
    chooseCell(character) {
	   	var found = [];
	   	for (var i in this.directions) {
	       	var x = this.directions[i][0];
	       	var y = this.directions[i][1];
	       	if(x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length){
		       	if (matrix[y][x] == character) {
		           	found.push(this.directions[i]);
		       	}
		      }
	   	}
	   	return found;
	}
	mul () {
       this.multiply++;
       var emptyCells = this.chooseCell(0);
       var newCell = random(emptyCells);

       if(newCell && this.multiply >= 4){
           var newX = newCell[0];
           var newY = newCell[1];
           matrix[newY][newX] = 1;

           var newGrass = new Grass(newX, newY, 1);
           grassArr.push(newGrass);
           this.multiply = 0;
       }
   }
}
class GrassEater {
    constructor(x,y,index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.energy = 5;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    move() {
        var newCell = random(this.chooseCell(0));

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;


            this.y = newY;
            this.x = newX;
            this.energy--;

        }

    }
    eat() {
   

        var newCell = random(this.chooseCell(1));

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;

            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }


            this.y = newY;
            this.x = newX;
            this.energy += 2;

        }
    }
    mul() {
        
        var newCell = random(this.chooseCell(0));

        if (this.energy >= 10 && newCell) {
            var newGrassEater = new GrassEater(newCell[0], newCell[1], 2);
            grassEaterArr.push(newGrassEater);
            matrix[newCell[1]][newCell[0]] = 2;
            this.energy = 5;
        }
    }
    die(){
	    if(this.energy <= 0){
	      matrix[this.y][this.x] = 0;
	      for(var i in grassEaterArr){
	        if(this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y){
	          grassEaterArr.splice(i,1);
	          break;
	        }
	      }
	    }
  	}
}
class Predator{
	constructor(x,y,index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.energy = 5;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    move() {
        var newCell = random(this.chooseCell(0));

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;


            this.y = newY;
            this.x = newX;
            this.energy--;

        }

    }
    eat() {
   

        var newCell = random(this.chooseCell(2));
        var newCell_1 = random(this.chooseCell(5));

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;

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
        if(newCell_1){
            var newX = newCell_1[0];
            var newY = newCell_1[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 3;

            for (var i in rabbitArr) {
                if (newX == rabbitArr[i].x && newY == rabbitArr[i].y) {
                    rabbitArr.splice(i, 1);
                    break;
                }
            }


            this.y = newY;
            this.x = newX;
            this.energy += 5;
        }
    }
    mul() {
        
        var newCell = random(this.chooseCell(0));

        if (this.energy >= 15 && newCell) {
            var newPredator = new Predator(newCell[0], newCell[1], 3);
            predatorArr.push(newPredator);
            matrix[newCell[1]][newCell[0]] = 3;
            this.energy = 5;
        }
    }
    die(){
	    if(this.energy <= 0){
	      	matrix[this.y][this.x] = 0;
	      	for(var i in predatorArr){
	        	if(this.x == predatorArr[i].x && this.y == predatorArr[i].y){
	          		predatorArr.splice(i,1);
	          		break;
	        	}
	      	}
	    }
  	}
    
}
class Human{
	constructor(x,y,index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.energy = 10;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
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
            this.energy-=2;

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
        if(newCell_3){
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
    die(){
	    if(this.energy <= 0 ){
	      	matrix[this.y][this.x] = 0;
	      	for(var i in humanArr){
	        	if(this.x == humanArr[i].x && this.y == humanArr[i].y){
	          		humanArr.splice(i,1);
	          		break;
	        	}
	      	}
	    }
  	}
}
class Rabbit{
    constructor(x,y,index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.energy = 3;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x    , this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y    ],
            [this.x + 1, this.y    ],
            [this.x - 1, this.y + 1],
            [this.x    , this.y + 1],
            [this.x + 1, this.y + 1],

            [this.x - 2, this.y - 2],
            [this.x - 1, this.y - 2],
            [this.x    , this.y - 2],
            [this.x + 1, this.y - 2],
            [this.x + 2, this.y - 2],

            [this.x - 2, this.y - 1],
            [this.x - 1, this.y - 1],
            [this.x    , this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x + 2, this.y - 1],

            [this.x - 2, this.y    ],
            [this.x - 1, this.y    ],
            [this.x + 1, this.y    ],
            [this.x + 2, this.y    ],

            [this.x - 2, this.y + 1],
            [this.x - 1, this.y + 1],
            [this.x    , this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x + 2, this.y + 1],

            [this.x - 2, this.y + 2],
            [this.x - 1, this.y + 2],
            [this.x    , this.y + 2],
            [this.x + 1, this.y + 2],
            [this.x + 2, this.y + 2],



        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    move() {
        var newCell = random(this.chooseCell(0));

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 5;


            this.y = newY;
            this.x = newX;
            this.energy--;

        }

    }
    eat() {
   

        var newCell = random(this.chooseCell(1));

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 5;

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
    }
    mul() {
        
        var newCell = random(this.chooseCell(0));

        if (this.energy > 15 && newCell) {
            var newRab = new Rabbit(newCell[0], newCell[1], 5);
            rabbitArr.push(newRab);
            matrix[newCell[1]][newCell[0]] = 5;
            this.energy = 3;
        }
    }
    die(){
        if(this.energy <= 0 ){
            matrix[this.y][this.x] = 0;
            for(var i in rabbitArr){
                if(this.x == rabbitArr[i].x && this.y == rabbitArr[i].y){
                    rabbitArr.splice(i,1);
                    break;
                }
            }
        }
    }
}





















