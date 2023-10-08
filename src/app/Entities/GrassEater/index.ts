import {
    GRASSEATER_ID,
    GRASS_ID,
} from "../../Constants/entities.js";
import Entities from "../../Services/Entities/index.js";
import Entity from "../Entity/index.js";

class GrassEater extends Entity {
    public index: number = GRASSEATER_ID;

    public eat() {
        super.eat(Entities.grass);
    }

    public mul() {
        super.mul(Entities.grassEater, GrassEater);
    }

    public die() {
        super.die(Entities.grassEater);
    }
}

export default GrassEater;
