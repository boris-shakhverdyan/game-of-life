import { GRASSEATER_ID, GRASS_ID } from "../../../Constants/entities.js";
import CreatureCollection from "../../Services/Collection/CreatureCollection.js";
import Entities from "../../Services/Entities/index.js";
import Entity from "../Entity/index.js";

class GrassEater extends Entity {
    public index: number = GRASSEATER_ID;
    public MAX_AGE: number = 50;
    public OLD_AGE: number = 35;
    public ADULT_AGE: number = 10;
    public collection: CreatureCollection<GrassEater> = Entities.grassEater;

    public do() {
        super.do([{ collection: Entities.grass, energy: 30 }]);
    }

    public eat() {
        super.eat(Entities.grass, 30);
    }
}

export default GrassEater;
