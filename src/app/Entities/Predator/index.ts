import { GRASSEATER_ID, PREDATOR_ID, RABBIT_ID } from "../../../Constants/entities.js";
import CreatureCollection from "../../Services/Collection/CreatureCollection.js";
import Entities from "../../Services/Entities/index.js";
import Entity from "../Entity/index.js";

class Predator extends Entity {
    public index: number = PREDATOR_ID;
    public MAX_AGE: number = 30;
    public OLD_AGE: number = 25;
    public ADULT_AGE: number = 5;
    public collection: CreatureCollection<Predator> = Entities.predator;

    public do() {
        super.do([
            { collection: Entities.grassEater, energy: 70 },
            { collection: Entities.rabbit, energy: 25 },
        ]);
    }

    public eat() {
        super.eat(Entities.grassEater);
        super.eat(Entities.rabbit);
    }
}

export default Predator;
