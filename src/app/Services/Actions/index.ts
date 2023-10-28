import { TAction } from "./types.js";

class Actions {
    private _calls: TAction[] = [];
    private _lastOfAll: TAction[] = [];
    private _finally: TAction[] = [];

    public run() {
        this._calls = this._calls.concat(this._lastOfAll);

        for (let { condition, action } of this._calls) {
            if (condition() && action) {
                action();
                break;
            }
        }

        for (let { condition, action } of this._finally) {
            if (condition() && action) {
                action();
                break;
            }
        }
    }

    public when(condition: () => boolean) {
        return {
            do: (action: () => void) => this.register(condition, action),
            doFinally: (action: () => void) => this.finally(action, condition),
        };
    }

    public register = (condition: () => boolean, action: () => void) => {
        this._calls.push({ condition, action });

        return this;
    };

    public lastOfAll = (action: () => void, condition: () => boolean = () => true) => {
        this._lastOfAll.push({ condition, action });

        return this;
    };

    public finally = (action: () => void, condition: () => boolean = () => true) => {
        this._finally.push({ condition, action });

        return this;
    };
}

export default Actions;
