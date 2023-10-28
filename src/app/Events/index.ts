import Console from "../Services/Console/index.js";
import Event from "../Services/Event/index.js";
import Position from "../Services/Position/index.js";
import Statistics from "../Services/Statistics/index.js";
import GameOver from "./GameOver/index.js";
import Lightning from "./Lightning/index.js";
import MeteoriteFall from "./MeteoriteFall/index.js";
import Tsunami from "./Tsunami/index.js";
class Events {
    private static _stack: Event[] = [];
    public static active: boolean = false;

    public static lightning(position: Position) {
        this.fireEvent(new Lightning(position));
    }

    public static fireEvent(e: Event, active: boolean = false) {
        this._stack.push(e);

        Console.print("Event: " + e.name + " fired", "warning");

        Statistics.increaseTotalEventsCount(e.name);

        if (active) {
            this.active = true;
        }
    }

    public static tsunami() {
        this.fireEvent(new Tsunami(), true);
    }

    public static gameOver() {
        this._stack = [];

        this.fireEvent(new GameOver(), true);
    }

    public static meteoriteFall() {
        this.fireEvent(new MeteoriteFall(), true);
    }

    public static run() {
        this._stack.map((e) => e.do());
    }

    public static delete(id: string) {
        let e = this._stack.find((e) => e.id === id);

        if (e) {
            Console.print("Event: " + e.name + " done", "success");

            this._stack = this._stack.filter((e) => e.id !== id);
        }
    }

    public static clear() {
        this._stack = [];
        this.active = false;
    }
}

export default Events;
