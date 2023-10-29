class Connections {
    static connect(socket) {
        this._list.push(socket);
        return this;
    }
    static disconnect(socket) {
        this._list = this._list.filter((conn) => conn.id !== socket.id);
        return this;
    }
    static map(callback) {
        this._list.map((connection) => callback(connection));
        return this;
    }
    static send(event, ...args) {
        this.map((conn) => conn.emit(event, ...args));
        return this;
    }
}
Connections._list = [];
export default Connections;
//# sourceMappingURL=index.js.map