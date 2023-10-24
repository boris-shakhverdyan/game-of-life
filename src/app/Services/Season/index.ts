import { TSeasons } from "./types.js";

class Season {
    private static _current: number = 0;
    private static _list: TSeasons[] = ["Summer", "Autumn", "Winter", "Spring"];
    private static _changeRate: number = 20;
    private static _currentRate: number = 0;
    private static _autoChangeMode: boolean = true;

    public static get autoChangeMode(): boolean {
        return this._autoChangeMode;
    }

    public static get current(): TSeasons {
        return this._list[this._current];
    }

    public static next() {
        if (this._autoChangeMode) {
            this._currentRate++;

            if (this._currentRate >= this._changeRate) {
                this.nextSeason();
            }
        }
    }

    private static nextSeason() {
        let result = this._current + 1;

        if (result >= this._list.length) {
            result = 0;
        }

        this._current = result;
        this._currentRate = 0;
    }

    public static set(value: TSeasons) {
        this._current = this._list.indexOf(value);
        this._currentRate = 0;
    }

    public static setChangeRate(value: number) {
        this._changeRate = value;
    }

    public static setAutoChangeMode(value: boolean) {
        this._autoChangeMode = value;
    }

    public static autoChangeModeOff() {
        this._autoChangeMode = false;
    }

    public static autoChangeModeOn() {
        this._autoChangeMode = true;
    }
}

export default Season;
