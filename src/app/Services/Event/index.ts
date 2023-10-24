abstract class Event {
    abstract name: string;

    abstract do(): void;
}

export default Event;
