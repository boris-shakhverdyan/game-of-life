import { ANIMAL_INDEX, RABBIT_ID } from "../../../Constants/entities.js";
import Directions from "../../Services/Directions/index.js";
import Entities from "../../Modules/Entities/index.js";
import Entity from "../Entity/index.js";
import Age from "../../Services/Age/index.js";
import CreatureCollection from "../../Services/Collection/CreatureCollection.js";

class Rabbit extends Entity {
    public index: number = RABBIT_ID;
    public age: Age = new Age(10, 8, 2);
    public type: number = ANIMAL_INDEX;
    public collection: CreatureCollection<Rabbit> = Entities.rabbit;
    public eatable: { collection: CreatureCollection<any>; energy: number }[] = [
        { collection: Entities.grass, energy: 30 },
    ];

    public getCoordinates(type: number = this.type, radius: number = 2) {
        return super.getCoordinates(type, radius);
    }
}

export default Rabbit;
