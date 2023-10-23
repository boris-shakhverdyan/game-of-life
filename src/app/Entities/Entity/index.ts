import { EMPTYCELL_ID } from "../../../Constants/entities.js";
import Age from "../../Services/Age/index.js";
import Matrix from "../../Services/Matrix/index.js";
import Creature from "../Creature/index.js";
import Actions from "../../Services/Actions/index.js";
import Position from "../../Services/Position/index.js";
import { EatableList } from "./types.js";
import Console from "../../Services/Console/index.js";

abstract class Entity extends Creature {
    public abstract age: Age;
    public lastChildMakePeriod: number = 0;
    public actions: Actions<this> = new Actions(this);
    public abstract eatable: EatableList;

    constructor(position: Position) {
        super(position);

        this.registerActions();
    }

    public do() {
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
                entity.eat();

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

            if (entity.age.isDead || entity.energy <= 0 || Matrix.getByPos(this.position) !== this.index) {
                entity.die();
            }
        });
    }

    public move(
        newPos: Position = this.chooseRandomCell(EMPTYCELL_ID),
        energy: number = 3,
        action: string = "move"
    ) {
        if (newPos) {
            Matrix.set(this.position, EMPTYCELL_ID);
            Matrix.set(newPos, this.index, this.type);

            this.position.set(newPos);
            this.energy -= energy;
            Console.debug(`${this.collection.name}: ${action}`);
        }
    }

    public eat(radius: number = this.radius, action: string = "eat") {
        for (let { collection, energy } of this.eatable) {
            const newPos = this.chooseRandomCell(collection.index, collection.type, radius);

            if (newPos) {
                Matrix.set(this.position, EMPTYCELL_ID);
                Matrix.set(newPos, EMPTYCELL_ID);
                Matrix.set(newPos, this.index, this.type);

                collection.deleteByPos(newPos);

                this.position.set(newPos);
                this.energy += energy;
                Console.debug(`${this.collection.name}: ${action} to ${collection.name}`);
                break;
            }
        }
    }

    public hasFood(radius: number = this.radius): boolean {
        return !!this.eatable.filter((food) =>
            this.hasCell(food.collection.index, food.collection.type, radius)
        ).length;
    }

    public mul() {
        const newPos = this.chooseRandomCell(EMPTYCELL_ID);

        if (newPos) {
            this.collection.add(newPos);
            Matrix.set(newPos, this.index);
            this.energy = 15;
            this.lastChildMakePeriod = 0;
            Console.debug(`${this.collection.name}: mul`);
        }
    }

    public die() {
        Matrix.setEmpty(this.position);

        this.collection.deleteByPos(this.position);
        Console.debug(`${this.collection.name}: die`);
    }
}

export default Entity;
