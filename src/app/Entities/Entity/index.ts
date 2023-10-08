import { EMPTYCELL_ID } from "../../../Constants/entities.js";
import CreatureCollection from "../../Services/Collection/CreatureCollection.js";
import Matrix from "../../Services/Matrix/index.js";
import Position from "../../Services/Position/index.js";
import Creature from "../Creature/index.js";

abstract class Entity extends Creature {
    public energy: number;
    public age: number = 0;
    public abstract MAX_AGE: number;
    public abstract OLD_AGE: number;
    public abstract ADULT_AGE: number;
    public abstract collection: CreatureCollection<any>;

    constructor(position: Position) {
        super(position);
        this.energy = 50;
    }

    public get isAdult(): boolean {
        return this.age >= this.ADULT_AGE && this.age <= this.OLD_AGE;
    }

    public do(eatable: { collection: CreatureCollection<any>; energy: number }[]) {
        if (this.energy <= 80 && this.hasCell(eatable.map((food) => food.collection.index))) {
            eatable.map((food) => this.eat(food.collection, food.energy));
        } else if (this.isAdult && this.energy >= 80) {
            this.mul();
        } else {
            this.move();
        }

        this.age += 1 / 40;
        this.energy -= 2;

        if (this.age >= this.MAX_AGE || this.energy < 0) {
            return this.die();
        }
    }

    public move() {
        const newPos = this.chooseCell(EMPTYCELL_ID).random();

        if (newPos) {
            Matrix.set(this.position, EMPTYCELL_ID);
            Matrix.set(newPos, this.index);

            this.position = newPos;
            this.energy -= 3;
        }
    }

    public eat(entityCollection: CreatureCollection<any>, energy: number = 30) {
        const newPos = this.chooseCell(entityCollection.index).random();

        if (newPos) {
            Matrix.set(this.position, EMPTYCELL_ID);
            Matrix.set(newPos, this.index);

            entityCollection.deleteByPos(newPos);

            this.position = newPos;
            this.energy += energy;
        }
    }

    public mul() {
        const newPos = this.chooseCell(EMPTYCELL_ID).random();

        if (newPos) {
            this.collection.add(newPos);
            Matrix.set(newPos, this.index);
            this.energy = 15;
        }
    }

    public die() {
        Matrix.set(this.position, EMPTYCELL_ID);

        this.collection.deleteByPos(this.position);
    }
}

export default Entity;
