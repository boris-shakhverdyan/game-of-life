import { E_LIGHTNING_ID, GROUND_INDEX } from "../../../Constants/entities.js";
import Entities from "../../Modules/Entities/index.js";
import Directions from "../../Services/Directions/index.js";
import Event from "../../Services/Event/index.js";
import Matrix from "../../Services/Matrix/index.js";
import Position from "../../Services/Position/index.js";

class Lightning extends Event {
    public name: string = "Lightning";
    public position: Position;
    public gen: Generator<undefined, void, unknown>;

    constructor(position: Position) {
        super();

        this.position = position;
        this.gen = this.run();
    }

    public do() {
        this.gen.next();
    }

    public *run() {
        if (Matrix.isWithin(this.position)) {
            Entities.deleteByPos(this.position);
            Matrix.setEmptyAll(this.position);
            Matrix.set(this.position, E_LIGHTNING_ID, GROUND_INDEX);
        }

        yield;

        let directions = Directions.get(this.position, 1);

        for (let pos of directions) {
            if (Matrix.isWithin(pos)) {
                Entities.deleteByPos(pos);
                Matrix.setEmptyAll(pos);
                Matrix.set(pos, E_LIGHTNING_ID, GROUND_INDEX);
            }
        }

        yield;

        for (let pos of directions) {
            if (Matrix.isWithin(pos)) {
                Entities.deleteByPos(pos);
                Matrix.setEmptyAll(pos);
            }
        }

        yield;

        Entities.deleteByPos(this.position);
        Matrix.setEmptyAll(this.position);

        return this.resolve();
    }
}

export default Lightning;
