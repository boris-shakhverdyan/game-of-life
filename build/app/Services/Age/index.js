class Age {
    constructor(max, old, adult, timesPerYear = 40) {
        this._value = 0;
        this.MAX = max;
        this.OLD = old;
        this.ADULT = adult;
        this.TIMES_PER_YEAR = timesPerYear;
    }
    get isAdult() {
        return this._value >= this.ADULT && this._value <= this.OLD;
    }
    get isDead() {
        return this._value >= this.MAX;
    }
    increase(value = 1 / this.TIMES_PER_YEAR) {
        this._value += value;
        return this;
    }
}
export default Age;
//# sourceMappingURL=index.js.map