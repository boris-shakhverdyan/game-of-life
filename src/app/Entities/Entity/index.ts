import { EMPTYCELL_ID } from "../../../Constants/entities.js";
import Age from "../../Services/Age/index.js";
import CreatureCollection from "../../Services/Collection/CreatureCollection.js";
import Matrix from "../../Services/Matrix/index.js";
import Creature from "../Creature/index.js";
import Actions from "../../Services/Actions/index.js";
import Position from "../../Services/Position/index.js";

abstract class Entity extends Creature {
    public abstract age: Age;
    public lastChildMakePeriod: number = 0;
    public actions: Actions<this> = new Actions(this);
    public abstract eatable: { collection: CreatureCollection<any>; energy: number }[];

    public do() {
        this.registerActions();

        this.actions.run();
    }

    public registerActions() {
        // EAT
        this.actions.register((entity) => {
            if (
                entity.energy <= 80 &&
                entity.eatable.filter(({ collection }) => entity.hasCell(collection.index, collection.type))
                    .length
            ) {
                entity.eatable.map((food) => entity.eat(food.collection, food.energy));

                return true;
            }

            return false;
        });

        // MUL
        this.actions.register((entity) => {
            if (entity.age.isAdult && entity.energy >= 80 && entity.lastChildMakePeriod >= 10) {
                entity.mul();

                return true;
            }

            return false;
        });

        // MOVE
        this.actions.lastOfAll((entity) => {
            entity.move();

            return true;
        });

        // DIE
        this.actions.finally((entity) => {
            entity.age.increase();
            entity.energy -= 2;
            entity.lastChildMakePeriod++;

            if (entity.age.isDead || entity.energy <= 0) {
                entity.die();
            }
        });
    }

    public move(newPos: Position = this.chooseCell(EMPTYCELL_ID).random(), energy: number = 3) {
        if (newPos) {
            Matrix.set(this.position, EMPTYCELL_ID);
            Matrix.set(newPos, this.index, this.type);

            this.position.set(newPos);
            this.energy -= energy;
        }
    }

    public eat(entityCollection: CreatureCollection<any>, energy: number = 30, radius: number = this.radius) {
        const newPos = this.chooseCell(entityCollection.index, entityCollection.type, radius).random();

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
