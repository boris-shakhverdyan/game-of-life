import Event from "../Services/Event/index.js";
import Position from "../Services/Position/index.js";
import Lightning from "./Lightning/index.js";
class Events {
    private static _stack: Event[] = [];

    public static lightning(position: Position) {
        this._stack.push(new Lightning(position));
    }

    public static run() {
        this._stack.map((e) => e.do());
    }

    public static delete(id: string) {
        this._stack = this._stack.filter((e) => e.id !== id);
    }

    public static clear() {
        this._stack = [];
    }
}

export default Events;
