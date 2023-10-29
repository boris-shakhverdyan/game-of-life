class Console {
    static get debugMode() {
        return this._debugMode;
    }
    static debugModeOn() {
        this._debugMode = true;
    }
    static debugModeOff() {
        this._debugMode = false;
    }
    static changeDebugModeStatus(status) {
        this._debugMode = status;
    }
    static debug(text, type = "default") {
        this._debugList.push({
            text: "(DEBUG) " + text,
            type,
        });
    }
    static print(text, type = "default") {
        console.log(text);
        this._list.push({
            text,
            type,
        });
    }
    static send(socket) {
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
Console._debugMode = false;
Console._debugList = [];
Console._list = [];
export default Console;
//# sourceMappingURL=index.js.map