import { ANIMAL_INDEX, PREDATOR_ID } from "../../../Constants/entities.js";
import Entity from "../Entity/index.js";

abstract class Herbivorous extends Entity {
    public registerActions(): void {
        super.registerActions();

        // ESCAPE FIXIT: is this entity escapes when it already eated?
        // this.actions.register((entity) => {
        //     if (entity.energy >= 20 && entity.hasCell(PREDATOR_ID, ANIMAL_INDEX)) {
        //         this.escape();

        //         return true;
        //     }

        //     return false;
        // });
    }

    public escape() {
        const predatorPos = this.chooseRandomCell(PREDATOR_ID, ANIMAL_INDEX);

        if (predatorPos) {
            const position = this.diffCoordinates(predatorPos).random();

            this.move(position, 5);
        }
    }
}

export default Herbivorous;
