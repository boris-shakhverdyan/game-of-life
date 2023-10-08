import { EMPTYCELL_ID } from "../../Constants/entities.js";
import CreatureCollection from "../../Services/Collection/CreatureCollection.js";
import Matrix from "../../Services/Matrix/index.js";
import Position from "../../Services/Position/index.js";
import Creature from "../Creature/index.js";
import Collection from "../../Services/Collection/index.js";

abstract class Entity extends Creature {
    public energy: number;

    constructor(position: Position) {
        super(position);
        this.energy = 5;
    }

    public chooseCell(character: number): Collection<Position> {
        this.getNewCoordinates();
        return super.chooseCell(character);
    }

    public move() {
        const newPos = this.chooseCell(EMPTYCELL_ID).random();

        if (newPos) {
            Matrix.set(this.position, EMPTYCELL_ID);
            Matrix.set(newPos, this.index);

            this.position = newPos;
            this.energy--;
        }
    }

    public eat(index: number, entityCollection: CreatureCollection<any>, energy: number = 3) {
        const newPos = this.chooseCell(index).random();

        if (newPos) {
            Matrix.set(this.position, EMPTYCELL_ID);
            Matrix.set(newPos, this.index);

            entityCollection.deleteByPos(newPos);

            this.position = newPos;
            this.energy += energy;
        }
    }

    protected mul(entityCollection: CreatureCollection<any>, obj: any) {
        const newPos = this.chooseCell(EMPTYCELL_ID).random();

        if (this.energy >= 10 && newPos) {
            entityCollection.push(new obj(newPos));
            Matrix.set(newPos, this.index);
            this.energy = 5;
        }
    }

    protected die(entityCollection: CreatureCollection<any>) {
        if (this.energy <= 0) {
            Matrix.set(this.position, EMPTYCELL_ID);

            entityCollection.deleteByPos(this.position);
        }
    }
}

export default Entity;
