class Frame {
    private static _intervalCallback: (() => NodeJS.Timeout) | null = null;
    private static _interval: NodeJS.Timeout | null = null;

    public static set(intervalCallback: () => NodeJS.Timeout) {
        this._intervalCallback = intervalCallback;
    }

    public static clear() {
        if (this._interval) {
            clearInterval(this._interval);
            this._interval = null;
        }
    }

    public static run() {
        this.clear();
        this._interval = this._intervalCallback ? this._intervalCallback() : null;
    }
}

export default Frame;
