import { ANIMAL_INDEX, GRASSEATER_ID } from "../../../Constants/entities.js";
import CreatureCollection from "../../Services/Collection/CreatureCollection.js";
import Entities from "../../Modules/Entities/index.js";
import Age from "../../Services/Age/index.js";
import Herbivorous from "../Herbivorous/index.js";

class GrassEater extends Herbivorous {
    public index: number = GRASSEATER_ID;
    public age: Age = new Age(50, 35, 10, 1);
    public collection: CreatureCollection<GrassEater> = Entities.grassEater;
    public type: number = ANIMAL_INDEX;
    public eatable: { collection: CreatureCollection<any>; energy: number }[] = [
        { collection: Entities.grass, energy: 30 },
    ];
}

export default GrassEater;
