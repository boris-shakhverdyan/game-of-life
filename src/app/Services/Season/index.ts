import { AUTO_SEASON, START_SEASON } from "../../../Constants/app.js";
import { AUTUMN, SPRING, SUMMER, WINTER } from "./constants.js";
import { TSeasons } from "./types.js";

class Season {
    private static _current: number = 0;
    private static _list: TSeasons[] = [SUMMER, AUTUMN, WINTER, SPRING];
    private static _changeRate: number = 10;
    private static _currentRate: number = 0;
    private static _autoChangeMode: boolean = true;

    public static get autoChangeMode(): boolean {
        return this._autoChangeMode;
    }

    public static get current(): TSeasons {
        return this._list[this._current];
    }

    public static next() {
        this._currentRate++;

        if (this._autoChangeMode && this._currentRate >= this._changeRate) {
            this.nextSeason();
        }
    }

    public static reset() {
        this.set(START_SEASON);
        this.setAutoChangeMode(AUTO_SEASON);
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
