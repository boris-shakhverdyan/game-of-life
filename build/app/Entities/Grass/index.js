import Matrix from "../../Services/Matrix/index.js";
import { EMPTYCELL_ID, GRASS_ID, GROUND_INDEX, THCIKGRASS_ID } from "../../../Constants/entities.js";
import Entities from "../../Modules/Entities/index.js";
import Creature from "../Creature/index.js";
import Season from "../../Services/Season/index.js";
import { WINTER } from "../../Services/Season/constants.js";
import Statistics from "../../Services/Statistics/index.js";
class Grass extends Creature {
    constructor(position) {
        super(position);
        this.index = GRASS_ID;
        this.thickness = 0;
        this.collection = Entities.grass;
        this.type = GROUND_INDEX;
        this.energy = 0;
        Statistics.increaseEntitiesBirthCount("Grass");
    }
    mul() {
        this.energy += 25;
        this.thickness += 10;
        if (this.energy >= 100 && Season.current !== WINTER) {
            const newPos = this.chooseCell(EMPTYCELL_ID).random();
            if (newPos) {
                Entities.grass.add(newPos);
                Matrix.set(newPos, this.index);
                this.energy = 0;
            }
            if (this.thickness >= 100) {
                this.index = THCIKGRASS_ID;
                Matrix.set(this.position, this.index);
            }
        }
    }
    isThick() {
        return this.index === THCIKGRASS_ID;
    }
    beEaten() {
        if (this.isThick()) {
            this.index = GRASS_ID;
            Matrix.set(this.position, this.index);
            this.thickness = 0;
        }
        else {
            super.beEaten();
        }
    }
}
export default Grass;
//# sourceMappingURL=index.js.map