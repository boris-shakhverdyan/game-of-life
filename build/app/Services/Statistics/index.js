import fs from "fs";
import appRoot from "app-root-path";
import Console from "../Console/index.js";
class Statistics {
    static increaseEntitiesBirthCount(key) {
        if (this.entitiesBirthsCount[key]) {
            this.entitiesBirthsCount[key]++;
        }
        else {
            this.entitiesBirthsCount[key] = 1;
        }
        return this;
    }
    static increaseTotalEventsCount(key) {
        if (this.totalEventsCount[key]) {
            this.totalEventsCount[key]++;
        }
        else {
            this.totalEventsCount[key] = 1;
        }
        return this;
    }
    static reset() {
        this.entitiesBirthsCount = {};
    }
    static updateFile() {
        let filePath = `${appRoot}/src/assets/${this.fileName}`;
        let data = {
            entitiesBirthsCount: this.entitiesBirthsCount,
            totalEventsCount: this.totalEventsCount,
            totalTimesSeasonChanged: this.totalTimesSeasonChanged,
        };
        fs.writeFile(filePath, JSON.stringify(data), (err) => {
            if (err)
                return console.log(err);
            console.log(JSON.stringify(data));
            Console.print(`Statistics writing to: ${appRoot}/src/assets/${this.fileName}`);
        });
    }
}
Statistics.fileName = "statistics.json";
Statistics.entitiesBirthsCount = {};
Statistics.totalEventsCount = {};
Statistics.totalTimesSeasonChanged = 0;
export default Statistics;
//# sourceMappingURL=index.js.map