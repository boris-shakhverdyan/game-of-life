import { ANIMAL_INDEX, WOLF_ID } from "../../../Constants/entities.js";
import Entities from "../../Modules/Entities/index.js";
import Entity from "../Entity/index.js";
import Age from "../../Services/Age/index.js";
import { EatableList } from "../Entity/types.js";
import EntityCollection from "../../Services/Collection/EntityCollection.js";

class Wolf extends Entity {
    public index: number = WOLF_ID;
    public age: Age = new Age(4, 3, 1);
    public collection: EntityCollection = Entities.wolf;
    public type: number = ANIMAL_INDEX;
    public eatable: EatableList = [
        { collection: Entities.sheep, energy: 70 },
        { collection: Entities.rabbit, energy: 25 },
    ];

    public registerActions(): void {
        super.registerActions();

        // ATTACK
        this.actions.when(() => this.isHungry && this.hasFoodInRadius(2)).do(this.attack);
    }

    public attack = () => this.eat(2, "attack");
}

export default Wolf;
