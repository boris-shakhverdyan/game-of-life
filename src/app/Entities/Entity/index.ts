import { EMPTYCELL_ID } from "../../../Constants/entities.js";
import Age from "../../Services/Age/index.js";
import CreatureCollection from "../../Services/Collection/CreatureCollection.js";
import Matrix from "../../Services/Matrix/index.js";
import Creature from "../Creature/index.js";

abstract class Entity extends Creature {
    public abstract age: Age;
    public lastChildMakePeriod: number = 0;

    public do(eatable: { collection: CreatureCollection<any>; energy: number }[]) {
        if (
            this.energy <= 80 &&
            eatable.filter(({ collection }) => this.hasCell(collection.index, collection.type)).length
        ) {
            eatable.map((food) => this.eat(food.collection, food.energy));
        } else if (this.age.isAdult && this.energy >= 80 && this.lastChildMakePeriod >= 10) {
            this.mul();
        } else {
            this.move();
        }

        this.age.increase();
        this.energy -= 2;
        this.lastChildMakePeriod++;

        if (this.age.isDead || this.energy <= 0) {
            return this.die();
        }
    }

    public move() {
        const newPos = this.chooseCell(EMPTYCELL_ID).random();

        if (newPos) {
            Matrix.set(this.position, EMPTYCELL_ID);
            Matrix.set(newPos, this.index);

            this.position.set(newPos);
            this.energy -= 3;
        }
    }

    public eat(entityCollection: CreatureCollection<any>, energy: number = 30) {
        const newPos = this.chooseCell(entityCollection.index, entityCollection.type).random();

        if (newPos) {
            Matrix.set(this.position, EMPTYCELL_ID);
            Matrix.set(newPos, EMPTYCELL_ID);
            Matrix.set(newPos, this.index, this.type);

            entityCollection.deleteByPos(newPos);

            this.position.set(newPos);
            this.energy += energy;
        }
    }

    public mul() {
        const newPos = this.chooseCell(EMPTYCELL_ID).random();

        if (newPos) {
            this.collection.add(newPos);
            Matrix.set(newPos, this.index);
            this.energy = 15;
            this.lastChildMakePeriod = 0;
        }
    }

    public die() {
        Matrix.setEmpty(this.position);

        this.collection.deleteByPos(this.position);
    }
}

export default Entity;
