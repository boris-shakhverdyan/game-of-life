import { PROGRAM_STOP, PROGRAM_RUN } from "./constant.js";
import { TPROGRAM } from "./types.js";

class Program {
    private static _status: TPROGRAM = PROGRAM_RUN;

    public static setStatus(status: TPROGRAM) {
        this._status = status;
    }

    public static get status() {
        return this._status;
    }

    public static run() {
        this._status = PROGRAM_RUN;
    }

    public static stop() {
        this._status = PROGRAM_STOP;
    }
}

export default Program;
