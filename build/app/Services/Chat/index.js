import uniqid from "uniqid";
import Connections from "../../Core/Connections/index.js";
class Chat {
    static sendAll(socket) {
        socket.emit("chat-all", this._list);
        return this;
    }
    static getValid(value) {
        return value.trim();
    }
    static isValid(username, text) {
        username = this.getValid(username);
        text = this.getValid(text);
        return !!(username && text && username.length <= 20 && text.length <= 90);
    }
    static add(username, text) {
        if (this.isValid(username, text)) {
            let message = this.create(username, text);
            this._list.push(message);
            this.send(message);
        }
        return this;
    }
    static create(username, text) {
        return {
            id: uniqid(),
            username: this.getValid(username),
            text: this.getValid(text),
        };
    }
    static send(message) {
        Connections.send("chat", message);
        return this;
    }
}
Chat._list = [];
export default Chat;
//# sourceMappingURL=index.js.map