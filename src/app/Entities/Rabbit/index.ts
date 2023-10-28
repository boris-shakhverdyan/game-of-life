import { ANIMAL_INDEX, RABBIT_ID } from "../../../Constants/entities.js";
import Entities from "../../Modules/Entities/index.js";
import Age from "../../Services/Age/index.js";
import EntityCollection from "../../Services/Collection/EntityCollection.js";
import Position from "../../Services/Position/index.js";
import { WINTER } from "../../Services/Season/constants.js";
import Season from "../../Services/Season/index.js";
import Statistics from "../../Services/Statistics/index.js";
import { EatableList } from "../Entity/types.js";
import Herbivorous from "../Herbivorous/index.js";

class Rabbit extends Herbivorous {
    public index: number = RABBIT_ID;
    public age: Age = new Age(3, 2, 1);
    public type: number = ANIMAL_INDEX;
    public collection: EntityCollection = Entities.rabbit;
    public eatable: EatableList = [{ collection: Entities.grass, energy: 30 }];

    constructor(position: Position) {
        super(position);

        Statistics.increaseEntitiesBirthCount("Rabbit." + this.gender);
    }

    public get radius(): number {
        return Season.current === WINTER ? 1 : 2;
    }
}

export default Rabbit;
