import CreatureCollection from "../../Services/Collection/CreatureCollection.js";
import Collection from "../../Services/Collection/index.js";
import Console from "../../Services/Console/index.js";
import Directions from "../../Services/Directions/index.js";
import Matrix from "../../Services/Matrix/index.js";
import Position from "../../Services/Position/index.js";

abstract class Creature {
    public position: Position;
    public abstract index: number;
    public energy: number = 100;
    public abstract type: number;
    public abstract collection: CreatureCollection<any>;
    public radius: number = 1;

    constructor(position: Position) {
        this.position = position;
    }

    protected getCoordinates(
        type: number = this.type,
        radius: number = this.radius,
        position: Position = this.position
    ) {
        return Directions.get(position, radius, type);
    }

    protected diffCoordinates(targetPosition: Position, radius: number = this.radius): Collection<Position> {
        const targetAround = this.getCoordinates(targetPosition.type, radius, targetPosition);
        const myDirections = this.getCoordinates();
        const result: Position[] = [];

        for (let position of myDirections) {
            if (
                Matrix.isWithin(position) &&
                !targetAround.filter((targetPosition) => targetPosition.isEqual(position)).length &&
                Matrix.isEmptyCell(position)
            ) {
                result.push(position);
            }
        }

        return new Collection(result);
    }

    protected hasCell(
        index: number | number[],
        type: number = this.type,
        radius: number = this.radius
    ): boolean {
        const directions = this.getCoordinates(type, radius);

        for (let position of directions) {
            if (Matrix.isWithin(position) && Matrix.isEqual(position, index)) {
                if (
                    this.position.isEqual(position, false) ||
                    type === this.type ||
                    Matrix.isEmptyCell(position, this.type)
                ) {
                    return true;
                }
            }
        }

        return false;
    }

    protected chooseCell(
        index: number | number[],
        type: number = this.type,
        radius: number = this.radius
    ): Collection<Position> {
        const directions = this.getCoordinates(type, radius);
        const found: Position[] = [];

        for (let position of directions) {
            if (Matrix.isWithin(position) && Matrix.isEqual(position, index)) {
                if (
                    this.position.isEqual(position, false) ||
                    type === this.type ||
                    Matrix.isEmptyCell(position, this.type)
                ) {
                    found.push(position);
                }
            }
        }

        return new Collection(found);
    }

    protected chooseRandomCell = (
        index: number | number[],
        type: number = this.type,
        radius: number = this.radius
    ): Position => {
        return this.chooseCell(index, type, radius).random();
    };

    public die = () => {
        Matrix.setEmpty(this.position);

        this.collection.deleteByPos(this.position);
        Console.debug(`${this.collection.name}: die`);
    };

    public beEaten() {
        this.die();
    }
}

export default Creature;
