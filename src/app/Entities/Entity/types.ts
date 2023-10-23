import CreatureCollection from "../../Services/Collection/CreatureCollection.js";

export type EatableList = {
    collection: CreatureCollection<any>;
    energy: number;
}[];