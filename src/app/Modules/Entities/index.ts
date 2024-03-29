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
import Position from "../../Services/Position/index.js";
import Entity from "../../Entities/Entity/index.js";
import Creature from "../../Entities/Creature/index.js";

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

    static deleteByPos(position: Position) {
        this.grass.deleteByPos(position, false);
        this.sheep.deleteByPos(position, false);
        this.wolf.deleteByPos(position, false);
        this.rabbit.deleteByPos(position, false);
        this.human.deleteByPos(position, false);

        return this;
    }

    static filterForAll(callbackfn: (value: Creature, index: number, array: Creature[]) => boolean) {
        this.grass.filter(callbackfn);
        this.sheep.filter(callbackfn);
        this.wolf.filter(callbackfn);
        this.rabbit.filter(callbackfn);
        this.human.filter(callbackfn);

        return this;
    }

    static isEmpty(): boolean {
        return (
            this.grass.size === 0 &&
            this.sheep.size === 0 &&
            this.wolf.size === 0 &&
            this.rabbit.size === 0 &&
            this.human.size === 0
        );
    }
}

export default Entities;
