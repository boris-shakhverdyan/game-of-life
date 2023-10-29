import { EMPTYCELL_ID } from "../../../Constants/entities.js";
import Matrix from "../../Services/Matrix/index.js";
import Creature from "../Creature/index.js";
import Actions from "../../Services/Actions/index.js";
import Console from "../../Services/Console/index.js";
import { FEMALE } from "../../Services/Gender/types.js";
import Gender from "../../Services/Gender/index.js";
import Season from "../../Services/Season/index.js";
import { SPRING } from "../../Services/Season/constants.js";
class Entity extends Creature {
    get mulPerFrames() {
        return Season.current === SPRING ? this._mulPerFrames / 2 : this._mulPerFrames;
    }
    get isHungry() {
        return this.energy <= 70;
    }
    constructor(position) {
        super(position);
        this.lastChildMakePeriod = 0;
        this._mulPerFrames = 10;
        this.gender = Gender.random();
        this.actions = new Actions();
        this.canItMultiply = () => {
            let malePosList = this.chooseCell(this.index, this.type, 1);
            let isMaleAround = false;
            for (let malePos of malePosList) {
                if (this.collection.isMale(malePos)) {
                    isMaleAround = true;
                }
            }
            return (this.gender === FEMALE &&
                this.age.isAdult &&
                this.energy >= 80 &&
                this.lastChildMakePeriod >= this.mulPerFrames &&
                isMaleAround);
        };
        this.move = (newPos = this.chooseRandomCell(EMPTYCELL_ID), energy = 3, action = "move") => {
            if (newPos) {
                Matrix.set(this.position, EMPTYCELL_ID);
                Matrix.set(newPos, this.index, this.type);
                this.position.set(newPos);
                this.energy -= energy;
                Console.debug(`${this.collection.name}: ${action}`);
            }
        };
        this.eat = (radius = this.radius, action = "eat") => {
            for (let { collection, energy } of this.eatable) {
                const newPos = this.chooseRandomCell(collection.index, collection.type, radius);
                if (newPos) {
                    let food = collection.getByPos(newPos);
                    Matrix.set(this.position, EMPTYCELL_ID);
                    if (food) {
                        food.beEaten();
                    }
                    Matrix.set(newPos, this.index, this.type);
                    this.position.set(newPos);
                    this.energy += energy;
                    Console.debug(`${this.collection.name}: ${action} to ${collection.name}`);
                    break;
                }
            }
        };
        this.hasFood = (radius = this.radius) => {
            return !!this.eatable.filter((food) => this.hasCell(food.collection.index, food.collection.type, radius)).length;
        };
        this.hasFoodInRadius = (radius) => {
            return this.hasFood(radius);
        };
        this.mul = () => {
            const newPos = this.chooseRandomCell(EMPTYCELL_ID);
            if (newPos) {
                this.collection.add(newPos);
                Matrix.set(newPos, this.index);
                this.energy = 15;
                this.lastChildMakePeriod = 0;
                Console.debug(`${this.collection.name}: mul`);
            }
        };
        this.registerActions();
    }
    do() {
        this.actions.run();
        this.age.increase();
        this.energy -= 2;
        this.lastChildMakePeriod++;
    }
    registerActions() {
        this.actions
            .when(() => this.isHungry && this.hasFood())
            .do(this.eat)
            .when(this.canItMultiply)
            .do(this.mul)
            .lastOfAll(this.move)
            .when(() => this.age.isDead || this.energy <= 0 || Matrix.getByPos(this.position) !== this.index)
            .doFinally(this.die);
    }
}
export default Entity;
//# sourceMappingURL=index.js.map