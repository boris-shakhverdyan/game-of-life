import { ANIMAL_INDEX, RABBIT_ID } from "../../../Constants/entities.js";
import CreatureCollection from "../../Services/Collection/CreatureCollection.js";
import Directions from "../../Services/Directions/index.js";
import Entities from "../../Modules/Entities/index.js";
import Entity from "../Entity/index.js";
import Age from "../../Services/Age/index.js";

class Rabbit extends Entity {
    public index: number = RABBIT_ID;
    public age: Age = new Age(10, 8, 2);
    public collection: CreatureCollection<Rabbit> = Entities.rabbit;
    public type: number = ANIMAL_INDEX;

    public getNewCoordinates() {
        this.directions = Directions.medium(this.position);
    }

    public do() {
        super.do([{ collection: Entities.grass, energy: 30 }]);
    }

    public eat() {
        super.eat(Entities.grass);
    }
}

export default Rabbit;
