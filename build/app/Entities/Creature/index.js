import Collection from "../../Services/Collection/index.js";
import Console from "../../Services/Console/index.js";
import Directions from "../../Services/Directions/index.js";
import Matrix from "../../Services/Matrix/index.js";
class Creature {
    get radius() {
        return this._radius;
    }
    constructor(position) {
        this.energy = 100;
        this._radius = 1;
        this.chooseRandomCell = (index, type = this.type, radius = this.radius) => {
            return this.chooseCell(index, type, radius).random();
        };
        this.die = () => {
            Matrix.setEmpty(this.position);
            this.collection.deleteByPos(this.position);
            Console.debug(`${this.collection.name}: die`);
        };
        this.position = position;
    }
    getCoordinates(type = this.type, radius = this.radius, position = this.position) {
        return Directions.get(position, radius, type);
    }
    diffCoordinates(targetPosition, radius = this.radius) {
        const targetAround = this.getCoordinates(targetPosition.type, radius, targetPosition);
        const myDirections = this.getCoordinates();
        const result = [];
        for (let position of myDirections) {
            if (Matrix.isWithin(position) &&
                !targetAround.filter((targetPosition) => targetPosition.isEqual(position)).length &&
                Matrix.isEmptyCell(position)) {
                result.push(position);
            }
        }
        return new Collection(result);
    }
    hasCell(index, type = this.type, radius = this.radius) {
        const directions = this.getCoordinates(type, radius);
        for (let position of directions) {
            if (Matrix.isWithin(position) && Matrix.isEqual(position, index)) {
                if (this.position.isEqual(position, false) ||
                    type === this.type ||
                    Matrix.isEmptyCell(position, this.type)) {
                    return true;
                }
            }
        }
        return false;
    }
    chooseCell(index, type = this.type, radius = this.radius) {
        const directions = this.getCoordinates(type, radius);
        const found = [];
        for (let position of directions) {
            if (Matrix.isWithin(position) && Matrix.isEqual(position, index)) {
                if (this.position.isEqual(position, false) ||
                    type === this.type ||
                    Matrix.isEmptyCell(position, this.type)) {
                    found.push(position);
                }
            }
        }
        return new Collection(found);
    }
    beEaten() {
        this.die();
    }
}
export default Creature;
//# sourceMappingURL=index.js.map