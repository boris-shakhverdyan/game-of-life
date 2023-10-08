import CreatureCollection from "../../Services/Collection/CreatureCollection.js";
import Collection from "../../Services/Collection/index.js";
import Directions from "../../Services/Directions/index.js";
import Matrix from "../../Services/Matrix/index.js";
import Position from "../../Services/Position/index.js";

abstract class Creature {
    public position: Position;
    public abstract index: number;
    public energy: number = 50;
    public directions: Position[] = [];
    public abstract type: number;
    public abstract collection: CreatureCollection<any>;

    constructor(position: Position) {
        this.position = position;
    }

    protected getNewCoordinates() {
        this.directions = Directions.small(this.position);
    }

    protected hasCell(character: number): boolean;
    protected hasCell(characters: Array<number>): boolean;
    protected hasCell(characters: number | Array<number>): boolean {
        this.getNewCoordinates();

        for (let position of this.directions) {
            if (
                position.x >= 0 &&
                position.x < Matrix.WIDTH &&
                position.y >= 0 &&
                position.y < Matrix.HEIGHT
            ) {
                if (
                    (Array.isArray(characters) && characters.includes(Matrix.getByPos(position))) ||
                    (typeof characters === "number" && Matrix.isEqual(position, characters))
                ) {
                    return true;
                }
            }
        }

        return false;
    }

    protected chooseCell(character: number): Collection<Position> {
        this.getNewCoordinates();
        const found: Position[] = [];

        for (let position of this.directions) {
            if (
                position.x >= 0 &&
                position.x < Matrix.WIDTH &&
                position.y >= 0 &&
                position.y < Matrix.HEIGHT
            ) {
                if (Matrix.isEqual(position, character)) {
                    found.push(position);
                }
            }
        }

        return new Collection(found);
    }
}

export default Creature;
