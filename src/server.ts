import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import Matrix from "./app/Services/Matrix/index.js";
import Entities from "./app/Modules/Entities/index.js";
import {
    ANIMAL_INDEX,
    GRASSEATER_ID,
    GRASS_ID,
    GROUND_INDEX,
    HUMAN_ID,
    PREDATOR_ID,
    RABBIT_ID,
} from "./Constants/entities.js";
import { AUTO_SEASON, DEBUG_MODE, DEFAULT_PROGRAM_STATUS, PORT, START_SEASON } from "./Constants/app.js";
import Program from "./app/Services/Program/index.js";
import { TPROGRAM } from "./app/Services/Program/types.js";
import { PROGRAM_RUN, PROGRAM_STOP } from "./app/Services/Program/constant.js";
import Console from "./app/Services/Console/index.js";
import { generateMatrix } from "./helpers.js";
import Season from "./app/Services/Season/index.js";
import { TSeasons } from "./app/Services/Season/types.js";

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.static("public"));

// program start

Program.setStatus(DEFAULT_PROGRAM_STATUS);
Console.changeDebugModeStatus(DEBUG_MODE);
Season.set(START_SEASON);
Season.setAutoChangeMode(AUTO_SEASON);

generateMatrix();

const sendData = (socket: Socket<any>) => {
    const data = {
        matrix: Matrix.get(),
        counts: Entities.counts(),
        entities: [
            { index: GRASS_ID, type: GROUND_INDEX, color: { default: "green", winter: "white" } },
            { index: GRASSEATER_ID, type: ANIMAL_INDEX, color: { default: "yellow" } },
            { index: PREDATOR_ID, type: ANIMAL_INDEX, color: { default: "red" } },
            { index: HUMAN_ID, type: ANIMAL_INDEX, color: { default: "purple" } },
            { index: RABBIT_ID, type: ANIMAL_INDEX, color: { default: "blue" } },
        ],
        season: {
            current: Season.current,
            auto: Season.autoChangeMode,
        },
        options: {
            program: Program.status,
            debugMode: Console.debugMode,
        },
    };

    socket.emit("draw", data);

    Console.send(socket);
};

io.on("connection", (socket: any) => {
    sendData(socket);

    socket.on("program-status", function (status: TPROGRAM | "RESTART") {
        switch (status) {
            case PROGRAM_RUN:
                Program.run();
                break;
            case PROGRAM_STOP:
                Program.stop();
                break;
            case "RESTART":
                Entities.reset();
                generateMatrix();
                Program.run();
                break;
        }

        Console.print(`Program: ${status}`, "danger");

        sendData(socket);
    });

    socket.on("debug-mode", function (value: boolean) {
        Console.changeDebugModeStatus(value);
    });

    socket.on("season", function (value: TSeasons | "Auto") {
        if (value === "Auto") {
            Season.autoChangeModeOn();
        } else {
            Season.set(value);
            Season.autoChangeModeOff();
        }

        Console.print(`Season: ${value}`, "warning");
    });

    socket.on("game-event", function (args: any) {
        console.log(args);
    });

    setInterval(() => {
        if (Program.status === PROGRAM_RUN) {
            Entities.run();

            Season.next();

            sendData(socket);
        }
    }, 1000);
});

// program end

server.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
