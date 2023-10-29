import { ANIMAL_INDEX, RABBIT_ID } from "../../../Constants/entities.js";
import Entities from "../../Modules/Entities/index.js";
import Age from "../../Services/Age/index.js";
import { WINTER } from "../../Services/Season/constants.js";
import Season from "../../Services/Season/index.js";
import Statistics from "../../Services/Statistics/index.js";
import Herbivorous from "../Herbivorous/index.js";
class Rabbit extends Herbivorous {
    constructor(position) {
        super(position);
        this.index = RABBIT_ID;
        this.age = new Age(3, 2, 1);
        this.type = ANIMAL_INDEX;
        this.collection = Entities.rabbit;
        this.eatable = [{ collection: Entities.grass, energy: 30 }];
        Statistics.increaseEntitiesBirthCount("Rabbit." + this.gender);
    }
    get radius() {
        return Season.current === WINTER ? 1 : 2;
    }
}
export default Rabbit;
//# sourceMappingURL=index.js.map