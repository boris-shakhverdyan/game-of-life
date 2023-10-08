import { EMPTYCELL_ID, GRASS_ID, RABBIT_ID } from "../../Constants/entities.js";
import Entities from "../../Services/Entities/index.js";
import Matrix from "../../Services/Matrix/index.js";
import Position from "../../Services/Position/index.js";
import Entity from "../Entity/index.js";

class Rabbit extends Entity {
    public index: number = RABBIT_ID;

    public getNewCoordinates() {
        this.directions = [
            new Position(this.position.x - 1, this.position.y - 1),
            new Position(this.position.x, this.position.y - 1),
            new Position(this.position.x + 1, this.position.y - 1),
            new Position(this.position.x - 1, this.position.y),
            new Position(this.position.x + 1, this.position.y),
            new Position(this.position.x - 1, this.position.y + 1),
            new Position(this.position.x, this.position.y + 1),
            new Position(this.position.x + 1, this.position.y + 1),

            new Position(this.position.x - 2, this.position.y - 2),
            new Position(this.position.x - 1, this.position.y - 2),
            new Position(this.position.x, this.position.y - 2),
            new Position(this.position.x + 1, this.position.y - 2),
            new Position(this.position.x + 2, this.position.y - 2),

            new Position(this.position.x - 2, this.position.y - 1),
            new Position(this.position.x - 1, this.position.y - 1),
            new Position(this.position.x, this.position.y - 1),
            new Position(this.position.x + 1, this.position.y - 1),
            new Position(this.position.x + 2, this.position.y - 1),

            new Position(this.position.x - 2, this.position.y),
            new Position(this.position.x - 1, this.position.y),
            new Position(this.position.x + 1, this.position.y),
            new Position(this.position.x + 2, this.position.y),

            new Position(this.position.x - 2, this.position.y + 1),
            new Position(this.position.x - 1, this.position.y + 1),
            new Position(this.position.x, this.position.y + 1),
            new Position(this.position.x + 1, this.position.y + 1),
            new Position(this.position.x + 2, this.position.y + 1),

            new Position(this.position.x - 2, this.position.y + 2),
            new Position(this.position.x - 1, this.position.y + 2),
            new Position(this.position.x, this.position.y + 2),
            new Position(this.position.x + 1, this.position.y + 2),
            new Position(this.position.x + 2, this.position.y + 2),
        ];
    }

    public eat() {
        super.eat(GRASS_ID, Entities.grass);
    }

    public mul() {
        super.mul(Entities.rabbit, Rabbit);
    }

    public die() {
        super.die(Entities.rabbit);
    }
}

export default Rabbit;
