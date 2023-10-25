import Entity from "../../Entities/Entity/index.js";
import { MALE } from "../Gender/types.js";
import Position from "../Position/index.js";
import CreatureCollection from "./CreatureCollection.js";

class EntityCollection extends CreatureCollection<Entity> {
    public isMale(position: Position): boolean {
        let entity = this.getByPos(position);

        if (entity) {
            return entity.gender === MALE;
        }

        return false;
    }
}

export default EntityCollection;
