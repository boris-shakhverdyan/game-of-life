import CreatureCollection from "../../Services/Collection/CreatureCollection.js";
import Creature from "../Creature/index.js";

export type EatableList = {
    collection: CreatureCollection<Creature>;
    energy: number;
}[];
