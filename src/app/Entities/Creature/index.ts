import Collection from "../../Services/Collection/index.js";
import Matrix from "../../Services/Matrix/index.js";
import Position from "../../Services/Position/index.js";

abstract class Creature {
    public position: Position;
    public abstract index: number;
    public multiply: number = 0;
    public directions: Position[] = [];

    constructor(position: Position) {
        this.position = position;
    }

    protected getNewCoordinates() {
        this.directions = [
            new Position(this.position.x - 1, this.position.y - 1),
            new Position(this.position.x, this.position.y - 1),
            new Position(this.position.x + 1, this.position.y - 1),
            new Position(this.position.x - 1, this.position.y),
            new Position(this.position.x + 1, this.position.y),
            new Position(this.position.x - 1, this.position.y + 1),
            new Position(this.position.x, this.position.y + 1),
            new Position(this.position.x + 1, this.position.y + 1),
        ];
    }

    protected chooseCell(character: number): Collection<Position> {
        this.getNewCoordinates();

        let found: Position[] = [];

        for (let position of this.directions) {
            if (
                position.x >= 0 &&
                position.x < Matrix.WIDTH &&
                position.y >= 0 &&
                position.y < Matrix.HEIGHT
            ) {
                if (Matrix.get()[position.y][position.x] == character) {
                    found.push(position);
                }
            }
        }

        return new Collection(found);
    }
}

export default Creature;
