import {
    GRASSEATER_ID,
    GRASS_ID,
    HUMAN_ID,
    PREDATOR_ID,
    RABBIT_ID,
} from "../../Constants/entities.js";
import Grass from "../../Entities/Grass/index.js";
import GrassEater from "../../Entities/GrassEater/index.js";
import Human from "../../Entities/Human/index.js";
import Predator from "../../Entities/Predator/index.js";
import Rabbit from "../../Entities/Rabbit/index.js";
import CreatureCollection from "../Collection/CreatureCollection.js";

class Entities {
    public static grass = new CreatureCollection<Grass>(GRASS_ID);
    public static grassEater = new CreatureCollection<GrassEater>(
        GRASSEATER_ID
    );
    public static predator = new CreatureCollection<Predator>(PREDATOR_ID);
    public static rabbit = new CreatureCollection<Rabbit>(RABBIT_ID);
    public static human = new CreatureCollection<Human>(HUMAN_ID);

    public static counts() {
        return {
            grass: this.grass.size,
            grassEater: this.grassEater.size,
            predator: this.predator.size,
            rabbit: this.rabbit.size,
            human: this.human.size,
        };
    }
}

export default Entities;
