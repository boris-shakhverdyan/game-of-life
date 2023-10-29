import { ANIMAL_INDEX, HUMAN_ID } from "../../../Constants/entities.js";
import Entities from "../../Modules/Entities/index.js";
import Entity from "../Entity/index.js";
import Age from "../../Services/Age/index.js";
import Statistics from "../../Services/Statistics/index.js";
class Human extends Entity {
    constructor(position) {
        super(position);
        this.index = HUMAN_ID;
        this.age = new Age(6, 5, 2);
        this.collection = Entities.human;
        this.type = ANIMAL_INDEX;
        this.eatable = [
            { collection: Entities.grass, energy: 10 },
            { collection: Entities.sheep, energy: 50 },
            { collection: Entities.wolf, energy: 10 },
            { collection: Entities.rabbit, energy: 20 },
        ];
        Statistics.increaseEntitiesBirthCount("Human." + this.gender);
    }
}
export default Human;
//# sourceMappingURL=index.js.map