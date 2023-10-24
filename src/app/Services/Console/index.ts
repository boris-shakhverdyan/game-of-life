import { Socket } from "socket.io";
import { TConsoleNode, TConsoleNodeType } from "./types.js";

class Console {
    private static _debugMode: boolean = false;
    private static _debugList: TConsoleNode[] = [];
    private static _list: TConsoleNode[] = [];

    public static get debugMode() {
        return this._debugMode;
    }

    public static debugModeOn() {
        this._debugMode = true;
    }

    public static debugModeOff() {
        this._debugMode = false;
    }

    public static changeDebugModeStatus(status: boolean) {
        this._debugMode = status;
    }

    public static debug(text: string, type: TConsoleNodeType = "default") {
        this._debugList.push({
            text: "(DEBUG) " + text,
            type,
        });
    }

    public static print(text: string, type: TConsoleNodeType = "default") {
        this._list.push({
            text,
            type,
        });
    }

    public static send(socket: Socket) {
        if (this._debugMode && this._debugList.length) {
            socket.emit("console", this._debugList);
            this._debugList = [];
        }

        if (this._list.length) {
            socket.emit("console", this._list);
            this._list = [];
        }
    }
}

export default Console;
