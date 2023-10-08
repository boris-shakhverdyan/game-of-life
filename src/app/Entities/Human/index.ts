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
        super.eat(GRASS_ID, Entities.grass);
        super.eat(GRASSEATER_ID, Entities.grassEater, 5);
        super.eat(PREDATOR_ID, Entities.predator, 2);
        super.eat(RABBIT_ID, Entities.rabbit);
    }

    public mul() {
        super.mul(Entities.human, Human);
    }

    public die() {
        super.die(Entities.human);
    }
}

export default Human;
