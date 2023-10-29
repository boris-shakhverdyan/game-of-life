import Events from "../../Events/index.js";
import uniqid from "uniqid";
class Event {
    constructor() {
        this.id = uniqid();
    }
    resolve(setActive = false) {
        Events.delete(this.id);
        if (setActive) {
            Events.active = false;
        }
    }
}
export default Event;
//# sourceMappingURL=index.js.map