import { ANIMAL_INDEX, SHEEP_ID } from "../../../Constants/entities.js";
import Entities from "../../Modules/Entities/index.js";
import Age from "../../Services/Age/index.js";
import Herbivorous from "../Herbivorous/index.js";
import Statistics from "../../Services/Statistics/index.js";
class Sheep extends Herbivorous {
    constructor(position) {
        super(position);
        this.index = SHEEP_ID;
        this.age = new Age(4, 3, 1);
        this.collection = Entities.sheep;
        this.type = ANIMAL_INDEX;
        this.eatable = [{ collection: Entities.grass, energy: 30 }];
        Statistics.increaseEntitiesBirthCount("Sheep." + this.gender);
    }
}
export default Sheep;
//# sourceMappingURL=index.js.map