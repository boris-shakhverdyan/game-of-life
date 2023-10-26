import Matrix from "../../Services/Matrix/index.js";
import { EMPTYCELL_ID, GRASS_ID, GROUND_INDEX, THCIKGRASS_ID } from "../../../Constants/entities.js";
import Entities from "../../Modules/Entities/index.js";
import Creature from "../Creature/index.js";
import CreatureCollection from "../../Services/Collection/CreatureCollection.js";
import Season from "../../Services/Season/index.js";
import { WINTER } from "../../Services/Season/constants.js";

class Grass extends Creature {
    public index: number = GRASS_ID;
    public thickness: number = 0;
    public collection: CreatureCollection<Grass> = Entities.grass;
    public type: number = GROUND_INDEX;
    public energy: number = 0;

    public mul() {
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

    private isThick(): boolean {
        return this.index === THCIKGRASS_ID;
    }

    public beEaten(): void {
        if (this.isThick()) {
            this.index = GRASS_ID;
            Matrix.set(this.position, this.index);
            this.thickness = 0;
        } else {
            super.beEaten();
        }
    }
}

export default Grass;
