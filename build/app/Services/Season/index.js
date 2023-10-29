import { AUTO_SEASON, START_SEASON } from "../../../Constants/app.js";
import Console from "../Console/index.js";
import Statistics from "../Statistics/index.js";
import { AUTUMN, SPRING, SUMMER, WINTER } from "./constants.js";
class Season {
    static get autoChangeMode() {
        return this._autoChangeMode;
    }
    static get current() {
        return this._list[this._current];
    }
    static next() {
        this._currentRate++;
        if (this._autoChangeMode && this._currentRate >= this._changeRate) {
            this.nextSeason();
        }
    }
    static reset() {
        this.set(START_SEASON);
        this.setAutoChangeMode(AUTO_SEASON);
    }
    static nextSeason() {
        let result = this._current + 1;
        if (result >= this._list.length) {
            result = 0;
        }
        this._current = result;
        this._currentRate = 0;
        Statistics.totalTimesSeasonChanged++;
        Console.print(`Season: ${this._list[this._current]}`, "warning");
    }
    static set(value) {
        this._current = this._list.indexOf(value);
        this._currentRate = 0;
        Statistics.totalTimesSeasonChanged++;
        Console.print(`Season: ${value}`, "warning");
    }
    static setChangeRate(value) {
        this._changeRate = value;
    }
    static setAutoChangeMode(value) {
        this._autoChangeMode = value;
    }
    static autoChangeModeOff() {
        this._autoChangeMode = false;
    }
    static autoChangeModeOn() {
        this._autoChangeMode = true;
    }
}
Season._current = 0;
Season._list = [SUMMER, AUTUMN, WINTER, SPRING];
Season._changeRate = 10;
Season._currentRate = 0;
Season._autoChangeMode = true;
export default Season;
//# sourceMappingURL=index.js.map