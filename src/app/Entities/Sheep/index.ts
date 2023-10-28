import { ANIMAL_INDEX, SHEEP_ID } from "../../../Constants/entities.js";
import Entities from "../../Modules/Entities/index.js";
import Age from "../../Services/Age/index.js";
import Herbivorous from "../Herbivorous/index.js";
import { EatableList } from "../Entity/types.js";
import EntityCollection from "../../Services/Collection/EntityCollection.js";
import Position from "../../Services/Position/index.js";
import Statistics from "../../Services/Statistics/index.js";

class Sheep extends Herbivorous {
    public index: number = SHEEP_ID;
    public age: Age = new Age(4, 3, 1);
    public collection: EntityCollection = Entities.sheep;
    public type: number = ANIMAL_INDEX;
    public eatable: EatableList = [{ collection: Entities.grass, energy: 30 }];

    constructor(position: Position) {
        super(position);

        Statistics.increaseEntitiesBirthCount("Sheep." + this.gender);
    }
}

export default Sheep;
