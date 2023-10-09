import {
    ANIMAL_INDEX,
    GRASSEATER_ID,
    GRASS_ID,
    GROUND_INDEX,
    HUMAN_ID,
    PREDATOR_ID,
    RABBIT_ID,
} from "../../../Constants/entities.js";
import Grass from "../../Entities/Grass/index.js";
import GrassEater from "../../Entities/GrassEater/index.js";
// import Human from "../../Entities/Human/index.js";
// import Predator from "../../Entities/Predator/index.js";
// import Rabbit from "../../Entities/Rabbit/index.js";
import CreatureCollection from "../../Services/Collection/CreatureCollection.js";

class Entities {
    public static grass = new CreatureCollection<Grass>(GRASS_ID, Grass, GROUND_INDEX);
    public static grassEater = new CreatureCollection<GrassEater>(GRASSEATER_ID, GrassEater, ANIMAL_INDEX);
    // public static predator = new CreatureCollection<Predator>(PREDATOR_ID, Predator, ANIMAL_INDEX);
    // public static rabbit = new CreatureCollection<Rabbit>(RABBIT_ID, Rabbit, ANIMAL_INDEX);
    // public static human = new CreatureCollection<Human>(HUMAN_ID, Human, ANIMAL_INDEX);

    static counts() {
        return {
            grass: this.grass.size,
            grassEater: this.grassEater.size,
            // predator: this.predator.size,
            // rabbit: this.rabbit.size,
            // human: this.human.size,
        };
    }
}

export default Entities;
