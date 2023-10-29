import { ANIMAL_INDEX, WOLF_ID } from "../../../Constants/entities.js";
import Matrix from "../../Services/Matrix/index.js";
import Entity from "../Entity/index.js";
class Herbivorous extends Entity {
    constructor() {
        super(...arguments);
        this.escape = () => {
            const wolfPos = this.chooseRandomCell(WOLF_ID);
            if (wolfPos) {
                const position = this.diffCoordinates(wolfPos).random();
                this.move(position, 5, "escape");
            }
        };
    }
    registerActions() {
        super.registerActions();
        this.actions
            .when(() => Matrix.getByPos(this.position) === this.index &&
            this.energy >= 20 &&
            this.hasCell(WOLF_ID, ANIMAL_INDEX))
            .do(this.escape);
    }
}
export default Herbivorous;
//# sourceMappingURL=index.js.map