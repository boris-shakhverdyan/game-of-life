class Age {
    private _value: number = 0;
    public MAX: number;
    public OLD: number;
    public ADULT: number;
    public TIMES_PER_YEAR: number;

    constructor(max: number, old: number, adult: number, tymesPerYear: number = 40) {
        this.MAX = max;
        this.OLD = old;
        this.ADULT = adult;
        this.TIMES_PER_YEAR = tymesPerYear;
    }

    get isAdult(): boolean {
        return this._value >= this.ADULT && this._value <= this.OLD;
    }

    get isDead(): boolean {
        return this._value >= this.MAX;
    }

    increase(value: number = 1 / this.TIMES_PER_YEAR): Age {
        this._value += value;

        return this;
    }
}

export default Age;
