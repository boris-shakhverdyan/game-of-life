import CreatureCollection from "../../Services/Collection/CreatureCollection.js";
import Collection from "../../Services/Collection/index.js";
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

        for (let pos of myDirections) {
            if (!targetAround.filter((item) => item.isEqual(pos)).length) {
                result.push(pos);
            }
        }

        return new Collection(result);
    }

    protected hasCell(index: number, type: number = this.type, radius: number = this.radius): boolean {
        const directions = this.getCoordinates(type, radius);

        for (let position of directions) {
            if (
                position.x >= 0 &&
                position.x < Matrix.WIDTH &&
                position.y >= 0 &&
                position.y < Matrix.HEIGHT
            ) {
                if (Matrix.isEqual(position, index)) {
                    if (
                        this.position.isEqual(position, false) ||
                        type === this.type ||
                        Matrix.isEmptyCell(position, this.type)
                    ) {
                        return true;
                    }
                }
            }
        }

        return false;
    }

    protected chooseCell(
        index: number,
        type: number = this.type,
        radius: number = this.radius
    ): Collection<Position> {
        const directions = this.getCoordinates(type, radius);
        const found: Position[] = [];

        for (let position of directions) {
            if (
                position.x >= 0 &&
                position.x < Matrix.WIDTH &&
                position.y >= 0 &&
                position.y < Matrix.HEIGHT
            ) {
                if (Matrix.isEqual(position, index)) {
                    if (
                        this.position.isEqual(position, false) ||
                        type === this.type ||
                        Matrix.isEmptyCell(position, this.type)
                    ) {
                        found.push(position);
                    }
                }
            }
        }

        return new Collection(found);
    }

    protected chooseRandomCell(
        index: number,
        type: number = this.type,
        radius: number = this.radius
    ): Position {
        return this.chooseCell(index, type, radius).random();
    }
}

export default Creature;
