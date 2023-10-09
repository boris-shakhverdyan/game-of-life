import { ANIMAL_INDEX, GRASSEATER_ID, GRASS_ID } from "../../../Constants/entities.js";
import CreatureCollection from "../../Services/Collection/CreatureCollection.js";
import Entities from "../../Modules/Entities/index.js";
import Entity from "../Entity/index.js";
import Age from "../../Services/Age/index.js";

class GrassEater extends Entity {
    public index: number = GRASSEATER_ID;
    public age: Age = new Age(50, 35, 10, 1);
    public collection: CreatureCollection<GrassEater> = Entities.grassEater;
    public type: number = ANIMAL_INDEX;

    public do() {
        super.do([{ collection: Entities.grass, energy: 30 }]);
    }

    public eat() {
        super.eat(Entities.grass, 30);
    }
}

export default GrassEater;
