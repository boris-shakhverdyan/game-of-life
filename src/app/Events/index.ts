import Event from "../Services/Event/index.js";
import Position from "../Services/Position/index.js";
import GameOver from "./GameOver/index.js";
import Lightning from "./Lightning/index.js";
import MeteoriteFall from "./MeteoriteFall/index.js";
import Tsunami from "./Tsunami/index.js";
class Events {
    private static _stack: Event[] = [];
    public static active: boolean = false;

    public static lightning(position: Position) {
        this._stack.push(new Lightning(position));
    }

    public static tsunami() {
        this._stack.push(new Tsunami());

        this.active = true;
    }

    public static gameOver() {
        this._stack = [];
        this._stack.push(new GameOver());
        this.active = true;
    }

    public static meteoriteFall() {
        this._stack.push(new MeteoriteFall());
        this.active = true;
    }

    public static run() {
        this._stack.map((e) => e.do());
    }

    public static delete(id: string) {
        this._stack = this._stack.filter((e) => e.id !== id);
    }

    public static clear() {
        this._stack = [];
        this.active = false;
    }
}

export default Events;
