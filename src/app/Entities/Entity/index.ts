import { EMPTYCELL_ID } from "../../../Constants/entities.js";
import Age from "../../Services/Age/index.js";
import Matrix from "../../Services/Matrix/index.js";
import Creature from "../Creature/index.js";
import Actions from "../../Services/Actions/index.js";
import Position from "../../Services/Position/index.js";
import { EatableList } from "./types.js";
import Console from "../../Services/Console/index.js";
import { FEMALE, TGender } from "../../Services/Gender/types.js";
import Gender from "../../Services/Gender/index.js";
import EntityCollection from "../../Services/Collection/EntityCollection.js";
import Season from "../../Services/Season/index.js";
import { SPRING } from "../../Services/Season/constants.js";

abstract class Entity extends Creature {
    public abstract age: Age;
    public lastChildMakePeriod: number = 0;
    protected _mulPerFrames: number = 10;
    public gender: TGender = Gender.random();
    public actions: Actions = new Actions();
    public abstract eatable: EatableList;
    public abstract collection: EntityCollection;

    protected get mulPerFrames(): number {
        return Season.current === SPRING ? this._mulPerFrames / 2 : this._mulPerFrames;
    }

    protected get isHungry(): boolean {
        return this.energy <= 70;
    }

    constructor(position: Position) {
        super(position);

        this.registerActions();
    }

    public do() {
        this.actions.run();

        this.age.increase();
        this.energy -= 2;
        this.lastChildMakePeriod++;
    }

    public registerActions() {
        this.actions
            // EAT
            .when(() => this.isHungry && this.hasFood())
            .do(this.eat)
            // MUL
            .when(this.canItMultiply)
            .do(this.mul)
            // MOVE
            .lastOfAll(this.move)
            // DIE
            .when(() => this.age.isDead || this.energy <= 0 || Matrix.getByPos(this.position) !== this.index)
            .doFinally(this.die);
    }

    protected canItMultiply = () => {
        let malePosList = this.chooseCell(this.index, this.type, 1);
        let isMaleAround: boolean = false;

        for (let malePos of malePosList) {
            if (this.collection.isMale(malePos)) {
                isMaleAround = true;
            }
        }

        return (
            this.gender === FEMALE &&
            this.age.isAdult &&
            this.energy >= 80 &&
            this.lastChildMakePeriod >= this.mulPerFrames &&
            isMaleAround
        );
    };

    public move = (
        newPos: Position = this.chooseRandomCell(EMPTYCELL_ID),
        energy: number = 3,
        action: string = "move"
    ) => {
        if (newPos) {
            Matrix.set(this.position, EMPTYCELL_ID);
            Matrix.set(newPos, this.index, this.type);

            this.position.set(newPos);
            this.energy -= energy;
            Console.debug(`${this.collection.name}: ${action}`);
        }
    };

    public eat = (radius: number = this.radius, action: string = "eat") => {
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

    public hasFood = (radius: number = this.radius): boolean => {
        return !!this.eatable.filter((food) =>
            this.hasCell(food.collection.index, food.collection.type, radius)
        ).length;
    };

    public hasFoodInRadius = (radius: number): boolean => {
        return this.hasFood(radius);
    };

    public mul = () => {
        const newPos = this.chooseRandomCell(EMPTYCELL_ID);

        if (newPos) {
            this.collection.add(newPos);
            Matrix.set(newPos, this.index);
            this.energy = 15;
            this.lastChildMakePeriod = 0;
            Console.debug(`${this.collection.name}: mul`);
        }
    };
}

export default Entity;
