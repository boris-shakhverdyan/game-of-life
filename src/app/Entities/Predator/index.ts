import { ANIMAL_INDEX, PREDATOR_ID } from "../../../Constants/entities.js";
import Entities from "../../Modules/Entities/index.js";
import Entity from "../Entity/index.js";
import Age from "../../Services/Age/index.js";
import CreatureCollection from "../../Services/Collection/CreatureCollection.js";
import { EatableList } from "../Entity/types.js";

class Predator extends Entity {
    public index: number = PREDATOR_ID;
    public age: Age = new Age(30, 25, 5);
    public collection: CreatureCollection<Predator> = Entities.predator;
    public type: number = ANIMAL_INDEX;
    public eatable: EatableList = [
        { collection: Entities.grassEater, energy: 70 },
        { collection: Entities.rabbit, energy: 25 },
    ];

    public registerActions(): void {
        super.registerActions();

        // ATTACK
        this.actions.register((entity) => {
            if (this.hasFood(2) && entity.energy <= 70) {
                this.attack();
                return true;
            }

            return false;
        });
    }

    public attack() {
        this.eat(2, "attack");
    }
}

export default Predator;
