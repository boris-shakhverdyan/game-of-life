import { GRASS_ID, RABBIT_ID } from "../../../Constants/entities.js";
import CreatureCollection from "../../Services/Collection/CreatureCollection.js";
import Entities from "../../Services/Entities/index.js";
import Position from "../../Services/Position/index.js";
import Entity from "../Entity/index.js";

class Rabbit extends Entity {
    public index: number = RABBIT_ID;
    public MAX_AGE: number = 10;
    public OLD_AGE: number = 8;
    public ADULT_AGE: number = 2;
    public collection: CreatureCollection<Rabbit> = Entities.rabbit;

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

    public do() {
        super.do([{ collection: Entities.grass, energy: 30 }]);
    }

    public eat() {
        super.eat(Entities.grass);
    }
}

export default Rabbit;
