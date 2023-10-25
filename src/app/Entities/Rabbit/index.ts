import { ANIMAL_INDEX, RABBIT_ID } from "../../../Constants/entities.js";
import Entities from "../../Modules/Entities/index.js";
import Age from "../../Services/Age/index.js";
import EntityCollection from "../../Services/Collection/EntityCollection.js";
import { EatableList } from "../Entity/types.js";
import Herbivorous from "../Herbivorous/index.js";

class Rabbit extends Herbivorous {
    public index: number = RABBIT_ID;
    public age: Age = new Age(3, 2, 1);
    public type: number = ANIMAL_INDEX;
    public collection: EntityCollection = Entities.rabbit;
    public radius: number = 2;
    public eatable: EatableList = [{ collection: Entities.grass, energy: 30 }];
}

export default Rabbit;
