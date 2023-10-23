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
import Rabbit from "../../Entities/Rabbit/index.js";
import Predator from "../../Entities/Predator/index.js";
// import Human from "../../Entities/Human/index.js";
// import Rabbit from "../../Entities/Rabbit/index.js";
import CreatureCollection from "../../Services/Collection/CreatureCollection.js";
import Console from "../../Services/Console/index.js";

class Entities {
    public static grass = new CreatureCollection<Grass>("Grass", GRASS_ID, Grass, GROUND_INDEX);
    public static grassEater = new CreatureCollection<GrassEater>(
        "GrassEater",
        GRASSEATER_ID,
        GrassEater,
        ANIMAL_INDEX
    );
    public static predator = new CreatureCollection<Predator>(
        "Predator",
        PREDATOR_ID,
        Predator,
        ANIMAL_INDEX
    );
    public static rabbit = new CreatureCollection<Rabbit>("Rabbit", RABBIT_ID, Rabbit, ANIMAL_INDEX);
    // public static human = new CreatureCollection<Human>(HUMAN_ID, Human, ANIMAL_INDEX);

    static counts() {
        return {
            grass: this.grass.size,
            grassEater: this.grassEater.size,
            predator: this.predator.size,
            rabbit: this.rabbit.size,
            human: 0,
        };
    }

    static run() {
        Console.debug("ENTITIES: run", "warning");
        this.grass.run((grass) => grass.mul());
        this.grassEater.run((grassEater) => grassEater.do());
        // this.human.run((human) => human.do());
        this.rabbit.run((rabbit) => rabbit.do());
        this.predator.run((predator) => predator.do());
    }

    static reset() {
        this.grass = new CreatureCollection<Grass>("Grass", GRASS_ID, Grass, GROUND_INDEX);
        this.grassEater = new CreatureCollection<GrassEater>(
            "GrassEater",
            GRASSEATER_ID,
            GrassEater,
            ANIMAL_INDEX
        );
        this.predator = new CreatureCollection<Predator>("Predator", PREDATOR_ID, Predator, ANIMAL_INDEX);
        this.rabbit = new CreatureCollection<Rabbit>("Rabbit", RABBIT_ID, Rabbit, ANIMAL_INDEX);
        //  this.human = new CreatureCollection<Human>(HUMAN_ID, Human, ANIMAL_INDEX);
    }
}

export default Entities;
