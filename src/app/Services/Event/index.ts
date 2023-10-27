import Events from "../../Events/index.js";

abstract class Event {
    abstract id: string;
    abstract name: string;

    abstract do(): void;

    protected resolve() {
        Events.delete(this.id);
    }
}

export default Event;
