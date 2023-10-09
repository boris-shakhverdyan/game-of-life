import CreatureCollection from "../../Services/Collection/CreatureCollection.js";
import Collection from "../../Services/Collection/index.js";
import Directions from "../../Services/Directions/index.js";
import Matrix from "../../Services/Matrix/index.js";
import Position from "../../Services/Position/index.js";

abstract class Creature {
    public position: Position;
    public abstract index: number;
    public energy: number = 50;
    public abstract type: number;
    public abstract collection: CreatureCollection<any>;

    constructor(position: Position) {
        this.position = position;
    }

    protected getCoordinates(type: number = this.type, radius: number = 1) {
        return Directions.get(this.position, radius, type);
    }

    protected hasCell(index: number, type: number = this.type): boolean {
        const directions = this.getCoordinates(type);

        for (let position of directions) {
            if (
                position.x >= 0 &&
                position.x < Matrix.WIDTH &&
                position.y >= 0 &&
                position.y < Matrix.HEIGHT
            ) {
                if (Matrix.isEqual(position, index)) {
                    if (this.position.isEqual(position, false) || Matrix.isEmptyCell(position, this.type)) {
                        return true;
                    }
                }
            }
        }

        return false;
    }

    protected chooseCell(index: number, type: number = this.type): Collection<Position> {
        const directions = this.getCoordinates(type);
        const found: Position[] = [];

        for (let position of directions) {
            if (
                position.x >= 0 &&
                position.x < Matrix.WIDTH &&
                position.y >= 0 &&
                position.y < Matrix.HEIGHT
            ) {
                if (Matrix.isEqual(position, index)) {
                    if (this.position.isEqual(position, false) || Matrix.isEmptyCell(position, this.type)) {
                        found.push(position);
                    }
                }
            }
        }

        return new Collection(found);
    }
}

export default Creature;
