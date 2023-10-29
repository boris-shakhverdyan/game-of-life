import { ANIMAL_INDEX, WOLF_ID } from "../../../Constants/entities.js";
import Entities from "../../Modules/Entities/index.js";
import Entity from "../Entity/index.js";
import Age from "../../Services/Age/index.js";
import Statistics from "../../Services/Statistics/index.js";
class Wolf extends Entity {
    constructor(position) {
        super(position);
        this.index = WOLF_ID;
        this.age = new Age(4, 3, 1);
        this.collection = Entities.wolf;
        this.type = ANIMAL_INDEX;
        this.eatable = [
            { collection: Entities.sheep, energy: 70 },
            { collection: Entities.rabbit, energy: 25 },
        ];
        this.attack = () => this.eat(2, "attack");
        Statistics.increaseEntitiesBirthCount("Wolf." + this.gender);
    }
    registerActions() {
        super.registerActions();
        this.actions.when(() => this.isHungry && this.hasFoodInRadius(2)).do(this.attack);
    }
}
export default Wolf;
//# sourceMappingURL=index.js.map