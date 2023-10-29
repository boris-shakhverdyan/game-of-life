import { DEFAULT_PROGRAM_STATUS } from "../../../Constants/app.js";
import Events from "../../Events/index.js";
import { PROGRAM_STOP, PROGRAM_RUN, PROGRAM_GAMEOVER } from "./constant.js";
class Program {
    static set frame(value) {
        this._framesCount = value;
    }
    static get frame() {
        return this._framesCount;
    }
    static reset() {
        this.setStatus(DEFAULT_PROGRAM_STATUS !== null && DEFAULT_PROGRAM_STATUS !== void 0 ? DEFAULT_PROGRAM_STATUS : PROGRAM_RUN);
        this._framesCount = 0;
    }
    static setStatus(status) {
        this._status = status;
    }
    static get status() {
        return this._status;
    }
    static run() {
        this._status = PROGRAM_RUN;
    }
    static stop() {
        this._status = PROGRAM_STOP;
    }
    static gameOver() {
        this._status = PROGRAM_GAMEOVER;
        Events.gameOver();
    }
}
Program._status = PROGRAM_RUN;
Program._framesCount = 0;
export default Program;
//# sourceMappingURL=index.js.map