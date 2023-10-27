import { EMPTYCELL_ID, E_TSUNAMI_ID } from "../../../Constants/entities.js";
import Entities from "../../Modules/Entities/index.js";
import Event from "../../Services/Event/index.js";
import Matrix from "../../Services/Matrix/index.js";

class Tsunami extends Event {
    public name: string = "Tsunami";
    public gen: Generator<undefined, void, unknown>;

    constructor() {
        super();

        this.gen = this.run();
    }

    public do() {
        this.gen.next();
    }

    public *run() {
        yield;

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
