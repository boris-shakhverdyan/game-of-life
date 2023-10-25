import { ANIMAL_INDEX, GRASSEATER_ID } from "../../../Constants/entities.js";
import Entities from "../../Modules/Entities/index.js";
import Age from "../../Services/Age/index.js";
import Herbivorous from "../Herbivorous/index.js";
import { EatableList } from "../Entity/types.js";
import EntityCollection from "../../Services/Collection/EntityCollection.js";

class GrassEater extends Herbivorous {
    public index: number = GRASSEATER_ID;
    public age: Age = new Age(4, 3, 1);
    public collection: EntityCollection = Entities.grassEater;
    public type: number = ANIMAL_INDEX;
    public eatable: EatableList = [{ collection: Entities.grass, energy: 30 }];
}

export default GrassEater;
