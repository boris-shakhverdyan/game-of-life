import { Socket } from "socket.io";
import { TMessage } from "./types.js";
import uniqid from "uniqid";
import Connections from "../../Core/Connections/index.js";

class Chat {
    private static _list: TMessage[] = [];

    public static sendAll(socket: Socket) {
        socket.emit("chat-all", this._list);

        return this;
    }

    public static getValid(value: string) {
        return value.trim();
    }

    public static isValid(username: string, text: string): boolean {
        username = this.getValid(username);
        text = this.getValid(text);

        return !!(username && text && username.length <= 20 && text.length <= 90);
    }

    public static add(username: string, text: string) {
        if (this.isValid(username, text)) {
            let message = this.create(username, text);

            this._list.push(message);

            this.send(message);
        }

        return this;
    }

    private static create(username: string, text: string) {
        return {
            id: uniqid(),
            username: this.getValid(username),
            text: this.getValid(text),
        };
    }

    private static send(message: TMessage) {
        Connections.send("chat", message);

        return this;
    }
}

export default Chat;
