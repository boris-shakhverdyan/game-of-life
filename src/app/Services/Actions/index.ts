class Actions<T> {
    private _value: T;
    private _calls: ((value: T) => boolean)[] = [];
    private _lastOfAll: ((value: T) => boolean) | null = null;
    private _finally: ((value: T) => void) | null = null;

    constructor(value: T) {
        this._value = value;
    }

    public run() {
        if (this._lastOfAll) {
            this._calls.push(this._lastOfAll);
        }

        for (let callable of this._calls) {
            if (callable(this._value)) {
                break;
            }
        }

        if (this._finally) {
            this._finally(this._value);
        }
    }

    public register(callback: (value: T) => boolean) {
        this._calls.push(callback);
    }

    public lastOfAll(callback: (value: T) => boolean) {
        this._lastOfAll = callback;
    }

    public finally(callback: (value: T) => void) {
        this._finally = callback;
    }
}

export default Actions;
