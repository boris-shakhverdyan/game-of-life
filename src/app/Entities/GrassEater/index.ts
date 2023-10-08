import {
    EMPTYCELL_ID,
    GRASSEATER_ID,
    GRASS_ID,
} from "../../Constants/entities.js";
import Entities from "../../Services/Entities/index.js";
import Matrix from "../../Services/Matrix/index.js";
import Entity from "../Entity/index.js";

class GrassEater extends Entity {
    public index: number = GRASSEATER_ID;

    public eat() {
        const newPos = this.chooseCell(GRASS_ID).random();

        if (newPos) {
            Matrix.set(this.position, EMPTYCELL_ID);
            Matrix.set(newPos, this.index);

            Entities.grassEater.deleteByPos(newPos);

            this.position = newPos;
            this.energy += 2;
        }
    }

    public mul() {
        super.mul(Entities.grassEater, GrassEater);
    }

    public die() {
        super.die(Entities.grassEater);
    }
}

export default GrassEater;
