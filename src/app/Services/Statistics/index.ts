import fs from "fs";
import appRoot from "app-root-path";
import Console from "../Console/index.js";

class Statistics {
    public static fileName: string = "statistics.json";
    public static entitiesBirthsCount: Record<string, number> = {};
    public static totalEventsCount: Record<string, number> = {};
    public static totalTimesSeasonChanged: number = 0;

    public static increaseEntitiesBirthCount(key: string) {
        if (this.entitiesBirthsCount[key]) {
            this.entitiesBirthsCount[key]++;
        } else {
            this.entitiesBirthsCount[key] = 1;
        }

        return this;
    }

    public static increaseTotalEventsCount(key: string) {
        if (this.totalEventsCount[key]) {
            this.totalEventsCount[key]++;
        } else {
            this.totalEventsCount[key] = 1;
        }

        return this;
    }

    public static reset() {
        this.entitiesBirthsCount = {};
    }

    public static updateFile() {
        let filePath = `${appRoot}/src/assets/${this.fileName}`;

        let data = {
            entitiesBirthsCount: this.entitiesBirthsCount,
            totalEventsCount: this.totalEventsCount,
            totalTimesSeasonChanged: this.totalTimesSeasonChanged,
        };

        fs.writeFile(filePath, JSON.stringify(data), (err) => {
            if (err) return console.log(err);

            console.log(JSON.stringify(data));

            Console.print(`Statistics writing to: ${appRoot}/src/assets/${this.fileName}`);
        });
    }
}

export default Statistics;
