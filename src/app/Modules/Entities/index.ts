import {
    ANIMAL_INDEX,
    GRASSEATER_ID,
    GRASS_ID,
    GROUND_INDEX,
    HUMAN_ID,
    PREDATOR_ID,
    RABBIT_ID,
    THCIKGRASS_ID,
} from "../../../Constants/entities.js";
import Grass from "../../Entities/Grass/index.js";
import GrassEater from "../../Entities/GrassEater/index.js";
import Rabbit from "../../Entities/Rabbit/index.js";
import Predator from "../../Entities/Predator/index.js";
import CreatureCollection from "../../Services/Collection/CreatureCollection.js";
import Console from "../../Services/Console/index.js";
import Human from "../../Entities/Human/index.js";
import EntityCollection from "../../Services/Collection/EntityCollection.js";

class Entities {
    public static grass = new CreatureCollection<Grass>(
        "Grass",
        [GRASS_ID, THCIKGRASS_ID],
        Grass,
        GROUND_INDEX
    );
    public static grassEater = new EntityCollection("GrassEater", GRASSEATER_ID, GrassEater, ANIMAL_INDEX);
    public static predator = new EntityCollection("Predator", PREDATOR_ID, Predator, ANIMAL_INDEX);
    public static rabbit = new EntityCollection("Rabbit", RABBIT_ID, Rabbit, ANIMAL_INDEX);
    public static human = new EntityCollection("Human", HUMAN_ID, Human, ANIMAL_INDEX);

    static counts() {
        return {
            grass: this.grass.size,
            grassEater: this.grassEater.size,
            predator: this.predator.size,
            rabbit: this.rabbit.size,
            human: this.human.size,
        };
    }

    static run() {
        Console.debug("ENTITIES: run", "warning");

        this.grass.run((grass) => grass.mul());
        this.grassEater.run((grassEater) => grassEater.do());
        this.human.run((human) => human.do());
        this.rabbit.run((rabbit) => rabbit.do());
        this.predator.run((predator) => predator.do());
    }

    static reset() {
        this.grass = new CreatureCollection<Grass>("Grass", [GRASS_ID, THCIKGRASS_ID], Grass, GROUND_INDEX);
        this.grassEater = new EntityCollection("GrassEater", GRASSEATER_ID, GrassEater, ANIMAL_INDEX);
        this.predator = new EntityCollection("Predator", PREDATOR_ID, Predator, ANIMAL_INDEX);
        this.rabbit = new EntityCollection("Rabbit", RABBIT_ID, Rabbit, ANIMAL_INDEX);
        this.human = new EntityCollection("Human", HUMAN_ID, Human, ANIMAL_INDEX);
    }
}

export default Entities;
