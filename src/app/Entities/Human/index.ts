import {
    GRASSEATER_ID,
    GRASS_ID,
    HUMAN_ID,
    PREDATOR_ID,
    RABBIT_ID,
} from "../../Constants/entities.js";
import Entities from "../../Services/Entities/index.js";
import Entity from "../Entity/index.js";

class Human extends Entity {
    public index: number = HUMAN_ID;

    public eat() {
        super.eat(Entities.grass);
        super.eat(Entities.grassEater, 5);
        super.eat(Entities.predator, 2);
        super.eat(Entities.rabbit);
    }

    public mul() {
        super.mul(Entities.human, Human);
    }

    public die() {
        super.die(Entities.human);
    }
}

export default Human;
