import Grass from "../../Entities/Grass/index.js";
import GrassEater from "../../Entities/GrassEater/index.js";
import Human from "../../Entities/Human/index.js";
import Predator from "../../Entities/Predator/index.js";
import Rabbit from "../../Entities/Rabbit/index.js";
import CreatureCollection from "../Collection/CreatureCollection.js";

class Entities {
    public static grass = new CreatureCollection<Grass>();
    public static grassEater = new CreatureCollection<GrassEater>();
    public static predator = new CreatureCollection<Predator>();
    public static rabbit = new CreatureCollection<Rabbit>();
    public static human = new CreatureCollection<Human>();

    public static counts() {
        return {
            grass: this.grass.length,
            grassEater: this.grassEater.length,
            predator: this.predator.length,
            rabbit: this.rabbit.length,
            human: this.human.length,
        };
    }
}

export default Entities;
