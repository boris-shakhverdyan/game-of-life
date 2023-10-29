import { E_GAMEOVER_1, E_GAMEOVER_2, E_GAMEOVER_3, } from "../../../Constants/entities.js";
import Event from "../../Services/Event/index.js";
import Matrix from "../../Services/Matrix/index.js";
import Position from "../../Services/Position/index.js";
import Statistics from "../../Services/Statistics/index.js";
class GameOver extends Event {
    constructor() {
        super();
        this.name = "GameOver";
        this.gen = this.run();
    }
    do() {
        this.gen.next();
    }
    *run() {
        Matrix.setAllInRow(0, 99);
        Matrix.setAllInRow(Matrix.HEIGHT - 1, 99);
        Matrix.setAllInColumn(Matrix.WIDTH - 1, 99);
        Matrix.setAllInColumn(0, 99);
        yield;
        let letterG = Position.createFrom([
            [2, 2],
            [3, 2],
            [4, 2],
            [5, 2],
            [6, 2],
            [2, 3],
            [2, 4],
            [4, 4],
            [5, 4],
            [6, 4],
            [2, 5],
            [6, 5],
            [2, 6],
            [3, 6],
            [4, 6],
            [5, 6],
            [6, 6],
        ]);
        for (let pos of letterG) {
            Matrix.set(pos, E_GAMEOVER_1);
        }
        yield;
        let letterA = Position.createFrom([
            [2, 9],
            [2, 10],
            [2, 11],
            [3, 8],
            [4, 8],
            [5, 8],
            [3, 10],
            [4, 10],
            [5, 10],
            [6, 9],
            [6, 10],
            [6, 11],
        ]);
        for (let pos of letterA) {
            Matrix.set(pos, E_GAMEOVER_1);
        }
        yield;
        let letterM = Position.createFrom([
            [2, 13],
            [2, 14],
            [2, 15],
            [2, 16],
            [2, 17],
            [6, 13],
            [6, 14],
            [6, 15],
            [6, 16],
            [6, 17],
            [3, 14],
            [4, 15],
            [5, 14],
        ]);
        for (let pos of letterM) {
            Matrix.set(pos, E_GAMEOVER_1);
        }
        yield;
        let letterE = Position.createFrom([
            [8, 13],
            [8, 14],
            [8, 15],
            [8, 16],
            [8, 17],
            [9, 13],
            [10, 13],
            [11, 13],
            [9, 15],
            [10, 15],
            [11, 15],
            [9, 17],
            [10, 17],
            [11, 17],
        ]);
        for (let pos of letterE) {
            Matrix.set(pos, E_GAMEOVER_1);
        }
        yield;
        let letterO = Position.createFrom([
            [8, 3],
            [8, 4],
            [8, 5],
            [11, 3],
            [11, 4],
            [11, 5],
            [9, 2],
            [10, 2],
            [9, 6],
            [10, 6],
        ]);
        for (let pos of letterO) {
            Matrix.set(pos, E_GAMEOVER_1);
        }
        yield;
        let letterV = Position.createFrom([
            [8, 8],
            [8, 9],
            [8, 10],
            [11, 8],
            [11, 9],
            [11, 10],
            [9, 11],
            [10, 11],
        ]);
        for (let pos of letterV) {
            Matrix.set(pos, E_GAMEOVER_1);
        }
        yield;
        for (let pos of letterE) {
            Matrix.set(pos, E_GAMEOVER_2);
        }
        yield;
        let letterR = Position.createFrom([
            [13, 2],
            [13, 3],
            [13, 4],
            [13, 5],
            [13, 6],
            [13, 7],
            [13, 8],
            [13, 9],
            [13, 10],
            [13, 11],
            [13, 12],
            [13, 13],
            [13, 14],
            [13, 15],
            [13, 16],
            [13, 17],
            [14, 2],
            [14, 3],
            [14, 4],
            [14, 5],
            [14, 6],
            [14, 7],
            [14, 8],
            [14, 9],
            [14, 10],
            [14, 11],
            [14, 12],
            [14, 13],
            [14, 14],
            [14, 15],
            [14, 16],
            [14, 17],
            [15, 2],
            [16, 2],
            [16, 3],
            [16, 10],
            [15, 11],
            [16, 11],
            [15, 12],
            [15, 13],
            [16, 13],
            [16, 14],
            [16, 15],
            [16, 16],
            [16, 17],
            [17, 14],
            [17, 15],
            [17, 16],
            [17, 17],
            [17, 3],
            [17, 4],
            [17, 5],
            [17, 6],
            [17, 7],
            [17, 8],
            [17, 9],
            [17, 10],
        ]);
        for (let pos of letterR) {
            Matrix.set(pos, E_GAMEOVER_3);
        }
        yield;
        Statistics.updateFile();
        return this.resolve(true);
    }
}
export default GameOver;
//# sourceMappingURL=index.js.map