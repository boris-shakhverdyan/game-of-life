import Events from "../../Events/index.js";
import uniqid from "uniqid";

abstract class Event {
    public id: string = uniqid();
    abstract name: string;

    abstract do(): void;

    protected resolve(setActive: boolean = false) {
        Events.delete(this.id);

        if (setActive) {
            Events.active = false;
        }
    }
}

export default Event;
