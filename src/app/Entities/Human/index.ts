import { ANIMAL_INDEX, HUMAN_ID } from "../../../Constants/entities.js";
import Entities from "../../Modules/Entities/index.js";
import Entity from "../Entity/index.js";
import Age from "../../Services/Age/index.js";
import CreatureCollection from "../../Services/Collection/CreatureCollection.js";
import { EatableList } from "../Entity/types.js";

class Human extends Entity {
    public index: number = HUMAN_ID;
    public age: Age = new Age(90, 50, 18);
    public collection: CreatureCollection<Human> = Entities.human;
    public type: number = ANIMAL_INDEX;
    public eatable: EatableList = [
        { collection: Entities.grass, energy: 5 },
        { collection: Entities.grassEater, energy: 50 },
        { collection: Entities.predator, energy: 10 },
        { collection: Entities.rabbit, energy: 20 },
    ];
}

export default Human;
