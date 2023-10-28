import { Socket } from "socket.io";

class Connections {
    private static _list: Socket[] = [];

    public static connect(socket: Socket) {
        this._list.push(socket);

        return this;
    }

    public static disconnect(socket: Socket) {
        this._list = this._list.filter((conn) => conn.id !== socket.id);

        return this;
    }

    public static map(callback: (connection: Socket) => void) {
        this._list.map((connection) => callback(connection));

        return this;
    }

    public static send(event: string, ...args: any[]) {
        this.map((conn) => conn.emit(event, ...args));

        return this;
    }
}

export default Connections;
