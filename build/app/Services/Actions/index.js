class Actions {
    constructor() {
        this._calls = [];
        this._lastOfAll = [];
        this._finally = [];
        this.register = (condition, action) => {
            this._calls.push({ condition, action });
            return this;
        };
        this.lastOfAll = (action, condition = () => true) => {
            this._lastOfAll.push({ condition, action });
            return this;
        };
        this.finally = (action, condition = () => true) => {
            this._finally.push({ condition, action });
            return this;
        };
    }
    run() {
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
    when(condition) {
        return {
            do: (action) => this.register(condition, action),
            doFinally: (action) => this.finally(action, condition),
        };
    }
}
export default Actions;
//# sourceMappingURL=index.js.map