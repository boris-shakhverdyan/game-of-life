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
        console.log(text);

        this._list.push({
            text,
            type,
        });
    }

    public static send(socket: Socket) {
        let initialLength = socket.data.consoleList.length;

        if (socket.data.debugMode) {
            let debugList = this._debugList.filter((item) => socket.data.consoleList.indexOf(item) === -1);

            if (debugList.length) {
                socket.data.consoleList = socket.data.consoleList.concat(debugList);
            }
        }

        let newList = this._list.filter((item) => socket.data.consoleList.indexOf(item) === -1);

        if (newList.length) {
            socket.data.consoleList = socket.data.consoleList.concat(newList);
        }

        if (initialLength !== socket.data.consoleList.length) {
            socket.emit("console", socket.data.consoleList);
        }
    }
}

export default Console;
