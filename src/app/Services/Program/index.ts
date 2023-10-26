import { DEFAULT_PROGRAM_STATUS } from "../../../Constants/app.js";
import { PROGRAM_STOP, PROGRAM_RUN } from "./constant.js";
import { TPROGRAM } from "./types.js";

class Program {
    private static _status: TPROGRAM = PROGRAM_RUN;
    private static _framesCount: number = 0;

    public static set frame(value: number) {
        this._framesCount = value;
    }

    public static get frame() {
        return this._framesCount;
    }

    public static reset() {
        this.setStatus(DEFAULT_PROGRAM_STATUS ?? PROGRAM_RUN);
        this.frame = 0;
    }

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
