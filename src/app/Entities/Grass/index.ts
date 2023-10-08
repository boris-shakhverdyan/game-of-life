import Matrix from "../../Services/Matrix/index.js";
import { EMPTYCELL_ID, GRASS_ID, GROUND_INDEX } from "../../../Constants/entities.js";
import Entities from "../../Modules/Entities/index.js";
import Creature from "../Creature/index.js";
import CreatureCollection from "../../Services/Collection/CreatureCollection.js";

class Grass extends Creature {
    public index: number = GRASS_ID;
    public collection: CreatureCollection<Grass> = Entities.grass;
    public type: number = GROUND_INDEX;

    public mul() {
        this.energy += 10;
        const newPos = this.chooseCell(EMPTYCELL_ID).random();

        if (newPos && this.energy >= 100) {
            Entities.grass.add(newPos);

            Matrix.set(newPos, this.index);

            this.energy = 50;
        }
    }
}

export default Grass;
