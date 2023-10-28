import { ANIMAL_INDEX, HUMAN_ID } from "../../../Constants/entities.js";
import Entities from "../../Modules/Entities/index.js";
import Entity from "../Entity/index.js";
import Age from "../../Services/Age/index.js";
import { EatableList } from "../Entity/types.js";
import EntityCollection from "../../Services/Collection/EntityCollection.js";
import Position from "../../Services/Position/index.js";
import Statistics from "../../Services/Statistics/index.js";

class Human extends Entity {
    public index: number = HUMAN_ID;
    public age: Age = new Age(6, 5, 2);
    public collection: EntityCollection = Entities.human;
    public type: number = ANIMAL_INDEX;
    public eatable: EatableList = [
        { collection: Entities.grass, energy: 10 },
        { collection: Entities.sheep, energy: 50 },
        { collection: Entities.wolf, energy: 10 },
        { collection: Entities.rabbit, energy: 20 },
    ];

    constructor(position: Position) {
        super(position);

        Statistics.increaseEntitiesBirthCount("Human." + this.gender);
    }
}

export default Human;
