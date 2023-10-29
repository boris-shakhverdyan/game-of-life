import Console from "../Services/Console/index.js";
import Statistics from "../Services/Statistics/index.js";
import GameOver from "./GameOver/index.js";
import Lightning from "./Lightning/index.js";
import MeteoriteFall from "./MeteoriteFall/index.js";
import Tsunami from "./Tsunami/index.js";
class Events {
    static lightning(position) {
        this.fireEvent(new Lightning(position));
    }
    static fireEvent(e, active = false) {
        this._stack.push(e);
        Console.print("Event: " + e.name + " fired", "warning");
        Statistics.increaseTotalEventsCount(e.name);
        if (active) {
            this.active = true;
        }
    }
    static tsunami() {
        this.fireEvent(new Tsunami(), true);
    }
    static gameOver() {
        this._stack = [];
        this.fireEvent(new GameOver(), true);
    }
    static meteoriteFall() {
        this.fireEvent(new MeteoriteFall(), true);
    }
    static run() {
        this._stack.map((e) => e.do());
    }
    static delete(id) {
        let e = this._stack.find((e) => e.id === id);
        if (e) {
            Console.print("Event: " + e.name + " done", "success");
            this._stack = this._stack.filter((e) => e.id !== id);
        }
    }
    static clear() {
        this._stack = [];
        this.active = false;
    }
}
Events._stack = [];
Events.active = false;
export default Events;
//# sourceMappingURL=index.js.map