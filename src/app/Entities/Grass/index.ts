import Matrix from "../../Services/Matrix/index.js";
import { EMPTYCELL_ID, GRASS_ID } from "../../../Constants/entities.js";
import Entities from "../../Services/Entities/index.js";
import Creature from "../Creature/index.js";
import CreatureCollection from "../../Services/Collection/CreatureCollection.js";

class Grass extends Creature {
    public index: number = GRASS_ID;
    public collection: CreatureCollection<Grass> = Entities.grass;

    public mul() {
        this.multiply++;
        const newPos = this.chooseCell(EMPTYCELL_ID).random();

        if (newPos && this.multiply >= 4) {
            Entities.grass.add(newPos);

            Matrix.set(newPos, this.index);

            this.multiply = 0;
        }
    }
}

export default Grass;
