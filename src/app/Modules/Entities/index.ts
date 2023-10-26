import {
    ANIMAL_INDEX,
    GRASS_ID,
    GROUND_INDEX,
    HUMAN_ID,
    WOLF_ID,
    RABBIT_ID,
    SHEEP_ID,
    THCIKGRASS_ID,
} from "../../../Constants/entities.js";
import Grass from "../../Entities/Grass/index.js";
import Rabbit from "../../Entities/Rabbit/index.js";
import CreatureCollection from "../../Services/Collection/CreatureCollection.js";
import Console from "../../Services/Console/index.js";
import Human from "../../Entities/Human/index.js";
import EntityCollection from "../../Services/Collection/EntityCollection.js";
import Sheep from "../../Entities/Sheep/index.js";
import Wolf from "../../Entities/Wolf/index.js";

class Entities {
    public static grass = new CreatureCollection<Grass>(
        "Grass",
        [GRASS_ID, THCIKGRASS_ID],
        Grass,
        GROUND_INDEX
    );
    public static sheep = new EntityCollection("Sheep", SHEEP_ID, Sheep, ANIMAL_INDEX);
    public static wolf = new EntityCollection("Wolf", WOLF_ID, Wolf, ANIMAL_INDEX);
    public static rabbit = new EntityCollection("Rabbit", RABBIT_ID, Rabbit, ANIMAL_INDEX);
    public static human = new EntityCollection("Human", HUMAN_ID, Human, ANIMAL_INDEX);

    static counts() {
        return {
            grass: this.grass.size,
            sheep: this.sheep.size,
            wolf: this.wolf.size,
            rabbit: this.rabbit.size,
            human: this.human.size,
        };
    }

    static run() {
        Console.debug("ENTITIES: run", "warning");

        this.grass.run((grass) => grass.mul());
        this.sheep.run((sheep) => sheep.do());
        this.human.run((human) => human.do());
        this.rabbit.run((rabbit) => rabbit.do());
        this.wolf.run((wolf) => wolf.do());
    }

    static reset() {
        this.grass = new CreatureCollection<Grass>("Grass", [GRASS_ID, THCIKGRASS_ID], Grass, GROUND_INDEX);
        this.sheep = new EntityCollection("Sheep", SHEEP_ID, Sheep, ANIMAL_INDEX);
        this.wolf = new EntityCollection("Wolf", WOLF_ID, Wolf, ANIMAL_INDEX);
        this.rabbit = new EntityCollection("Rabbit", RABBIT_ID, Rabbit, ANIMAL_INDEX);
        this.human = new EntityCollection("Human", HUMAN_ID, Human, ANIMAL_INDEX);
    }
}

export default Entities;
