import { MALE } from "../Gender/types.js";
import CreatureCollection from "./CreatureCollection.js";
class EntityCollection extends CreatureCollection {
    isMale(position) {
        let entity = this.getByPos(position);
        if (entity) {
            return entity.gender === MALE;
        }
        return false;
    }
}
export default EntityCollection;
//# sourceMappingURL=EntityCollection.js.map