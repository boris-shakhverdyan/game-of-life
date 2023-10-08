import { HUMAN_ID } from "../../../Constants/entities.js";
import CreatureCollection from "../../Services/Collection/CreatureCollection.js";
import Entities from "../../Services/Entities/index.js";
import Entity from "../Entity/index.js";

class Human extends Entity {
    public index: number = HUMAN_ID;
    public MAX_AGE: number = 90;
    public OLD_AGE: number = 50;
    public ADULT_AGE: number = 18;
    public collection: CreatureCollection<Human> = Entities.human;

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
