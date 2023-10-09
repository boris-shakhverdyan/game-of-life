import { ANIMAL_INDEX, GRASSEATER_ID, PREDATOR_ID, RABBIT_ID } from "../../../Constants/entities.js";
import Entities from "../../Modules/Entities/index.js";
import Entity from "../Entity/index.js";
import Age from "../../Services/Age/index.js";
import CreatureCollection from "../../Services/Collection/CreatureCollection.js";

class Predator extends Entity {
    public index: number = PREDATOR_ID;
    public age: Age = new Age(30, 25, 5);
    public collection: CreatureCollection<Predator> = Entities.predator;
    public type: number = ANIMAL_INDEX;
    public eatable: { collection: CreatureCollection<any>; energy: number }[] = [
        { collection: Entities.grassEater, energy: 70 },
        { collection: Entities.rabbit, energy: 25 },
    ];
}

export default Predator;
