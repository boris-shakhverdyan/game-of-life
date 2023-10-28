import {
    E_METEORITE_FALL_COOLED_ID,
    E_METEORITE_FALL_HOT_ID,
    GROUND_INDEX,
} from "../../../Constants/entities.js";
import Entities from "../../Modules/Entities/index.js";
import Directions from "../../Services/Directions/index.js";
import Event from "../../Services/Event/index.js";
import Matrix from "../../Services/Matrix/index.js";
import Position from "../../Services/Position/index.js";
import Random from "../../Services/Random/index.js";

class MeteoriteFall extends Event {
    public name: string = "Meteorite Fall";
    public gen: Generator<undefined, void, unknown>;
    public count: number = Random.number(2, 5);
    public hotList: Position[] = [];
    public coldList: Position[] = [];

    constructor() {
        super();

        this.gen = this.run();
    }

    public do() {
        this.gen.next();
    }

    public *run() {
        let count = this.count;

        for (let i = 0; i < count || this.hotList.length; i++) {
            for (let item of this.hotList) {
                Entities.deleteByPos(item);
                Matrix.set(item, E_METEORITE_FALL_COOLED_ID);

                this.coldList.push(item);
            }

            this.hotList = [];

            if (count > 0) {
                let pos = Matrix.random(GROUND_INDEX);

                this.createMeteorite(pos);
                count--;
            }

            yield;
        }

        yield;

        for (let item of this.coldList) {
            Matrix.setEmptyAll(item);
        }

        this.coldList = [];

        return this.resolve(true);
    }

    private createMeteorite(pos: Position) {
        Matrix.setEmptyAll(pos);
        Entities.deleteByPos(pos);
        Matrix.set(pos, E_METEORITE_FALL_HOT_ID);
        this.hotList.push(pos);

        for (let position of Directions.get(pos, 2)) {
            Matrix.setEmptyAll(position);
            Entities.deleteByPos(position);
            Matrix.set(position, E_METEORITE_FALL_HOT_ID);
            this.hotList.push(position);
        }
    }
}

export default MeteoriteFall;
