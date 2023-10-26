import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import Matrix from "./app/Services/Matrix/index.js";
import Entities from "./app/Modules/Entities/index.js";
import {
    ANIMAL_INDEX,
    GRASS_ID,
    GROUND_INDEX,
    HUMAN_ID,
    WOLF_ID,
    RABBIT_ID,
    SHEEP_ID,
    THCIKGRASS_ID,
} from "./Constants/entities.js";
import { DEBUG_MODE, FRAME_DURATION, PORT } from "./Constants/app.js";
import Program from "./app/Services/Program/index.js";
import { TPROGRAM } from "./app/Services/Program/types.js";
import { PROGRAM_RUN, PROGRAM_STOP } from "./app/Services/Program/constant.js";
import Console from "./app/Services/Console/index.js";
import { generateMatrix } from "./helpers.js";
import Season from "./app/Services/Season/index.js";
import { TSeasons } from "./app/Services/Season/types.js";
import Frame from "./app/Services/Frame/index.js";

const app = express();
const server = createServer(app);
const io = new Server(server);
let connections: Socket[] = [];

app.use(express.static("public"));

// program start

const initGame = () => {
    Entities.reset();
    Program.reset();
    Console.changeDebugModeStatus(DEBUG_MODE);
    Season.reset();
    Frame.clear();
    generateMatrix();

    Frame.set(() =>
        setInterval(() => {
            if (Program.status === PROGRAM_RUN) {
                Program.frame++;
                Entities.run();

                Season.next();
            }
        }, FRAME_DURATION)
    );

    Frame.run();
};

initGame();

const sendData = (socket: Socket) => {
    const data = {
        matrix: Matrix.get(),
        counts: Entities.counts(),
        entities: [
            { index: GRASS_ID, type: GROUND_INDEX, color: { default: "forestgreen", winter: "white" } },
            {
                index: THCIKGRASS_ID,
                type: GROUND_INDEX,
                color: { default: "green", winter: "rgb(178, 194, 211)" },
            },
            { index: SHEEP_ID, type: ANIMAL_INDEX, color: { default: "yellow" } },
            { index: WOLF_ID, type: ANIMAL_INDEX, color: { default: "red" } },
            { index: HUMAN_ID, type: ANIMAL_INDEX, color: { default: "purple" } },
            { index: RABBIT_ID, type: ANIMAL_INDEX, color: { default: "royalblue" } },
        ],
        season: Season.current,
        options: {
            program: Program.status,
            framesCount: Program.frame,
            debugMode: Console.debugMode,
        },
    };

    Console.send(socket);

    socket.emit("draw", data);
};

io.on("connection", (socket: Socket) => {
    connections.push(socket);

    socket.data.consoleList = [];
    socket.data.username = null;
    socket.data.debugMode = false;

    sendData(socket);

    socket.on("disconnect", () => {
        connections = connections.filter((conn) => conn.id !== socket.id);
    });

    socket.on("program-status", function (status: TPROGRAM | "RESTART") {
        switch (status) {
            case PROGRAM_RUN:
                Program.run();
                break;
            case PROGRAM_STOP:
                Program.stop();
                break;
            case "RESTART":
                initGame();
                break;
        }

        Console.print(`Program: ${status}`, "danger");

        connections.map((conn) => sendData(conn));
    });

    socket.on("debug-mode", function (value: boolean) {
        socket.data.debugMode = value;
    });

    socket.on("season", function (value: TSeasons) {
        Season.set(value);

        Console.print(`Season: ${value}`, "warning");
    });

    socket.on("game-event", function (args: any) {
        console.log(args);
    });

    setInterval(() => {
        if (Program.status === PROGRAM_RUN) {
            sendData(socket);
        }
    }, FRAME_DURATION);
});

// program end

server.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
