import { EMPTYCELL_ID, E_TSUNAMI_ID } from "../../../Constants/entities.js";
import Entities from "../../Modules/Entities/index.js";
import Event from "../../Services/Event/index.js";
import Matrix from "../../Services/Matrix/index.js";
class Tsunami extends Event {
    constructor() {
        super();
        this.name = "Tsunami";
        this.gen = this.run();
    }
    do() {
        this.gen.next();
    }
    *run() {
        for (let y = 0; y < Matrix.HEIGHT; y++) {
            for (let i = 0; i <= y; i++) {
                Matrix.setAllInRow(i, E_TSUNAMI_ID);
                Entities.filterForAll((entity) => !entity.position.isInRow(i));
            }
            yield;
        }
        for (let y = 0; y < Matrix.HEIGHT; y++) {
            Matrix.setAllInRow(y, EMPTYCELL_ID);
            yield;
        }
        return this.resolve(true);
    }
}
export default Tsunami;
//# sourceMappingURL=index.js.map