import { ANIMAL_INDEX, HUMAN_ID } from "../../../Constants/entities.js";
import CreatureCollection from "../../Services/Collection/CreatureCollection.js";
import Entities from "../../Modules/Entities/index.js";
import Entity from "../Entity/index.js";
import Age from "../../Services/Age/index.js";

class Human extends Entity {
    public index: number = HUMAN_ID;
    public age: Age = new Age(90, 50, 18);
    public collection: CreatureCollection<Human> = Entities.human;
    public type: number = ANIMAL_INDEX;

    public do() {
        super.do([
            { collection: Entities.grass, energy: 5 },
            { collection: Entities.grassEater, energy: 50 },
            { collection: Entities.predator, energy: 10 },
            { collection: Entities.rabbit, energy: 20 },
        ]);
    }

    public eat() {
        super.eat(Entities.grass, 5);
        super.eat(Entities.grassEater, 30);
        super.eat(Entities.predator, 10);
        super.eat(Entities.rabbit, 20);
    }
}

export default Human;
