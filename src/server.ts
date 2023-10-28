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
    E_LIGHTNING_ID,
    E_TSUNAMI_ID,
    E_GAMEOVER_1,
    E_GAMEOVER_2,
    E_GAMEOVER_3,
    E_METEORITE_FALL_HOT_ID,
    E_METEORITE_FALL_COOLED_ID,
} from "./Constants/entities.js";
import { DEBUG_MODE, FRAME_DURATION, PORT } from "./Constants/app.js";
import Program from "./app/Services/Program/index.js";
import { TPROGRAM } from "./app/Services/Program/types.js";
import { PROGRAM_GAMEOVER, PROGRAM_RUN, PROGRAM_STOP } from "./app/Services/Program/constant.js";
import Console from "./app/Services/Console/index.js";
import { generateMatrix } from "./helpers.js";
import Season from "./app/Services/Season/index.js";
import { TSeasons } from "./app/Services/Season/types.js";
import Connections from "./app/Core/Connections/index.js";
import Chat from "./app/Services/Chat/index.js";
import Events from "./app/Events/index.js";
import Position from "./app/Services/Position/index.js";

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.static("public"));

// program start

const initGame = () => {
    Entities.reset();
    Program.reset();
    Console.changeDebugModeStatus(DEBUG_MODE);
    Season.reset();
    generateMatrix();
    Events.clear();
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

            { index: E_LIGHTNING_ID, type: GROUND_INDEX, color: { default: "#ffff00" } },
            { index: E_TSUNAMI_ID, type: GROUND_INDEX, color: { default: "aqua" } },
            { index: E_METEORITE_FALL_HOT_ID, type: GROUND_INDEX, color: { default: "orangered" } },
            { index: E_METEORITE_FALL_COOLED_ID, type: GROUND_INDEX, color: { default: "#6e4f38" } },

            { index: E_GAMEOVER_1, type: GROUND_INDEX, color: { default: "darkred" } },
            { index: E_GAMEOVER_2, type: GROUND_INDEX, color: { default: "royalblue" } },
            { index: E_GAMEOVER_3, type: GROUND_INDEX, color: { default: "gold" } },
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

    socket.emit("event-going", Events.active ? "active" : "inactive");

    if (Entities.isEmpty() && !Events.active) {
        Program.gameOver();
        generateMatrix(false);
    }
};

setInterval(() => {
    if ([PROGRAM_RUN, PROGRAM_GAMEOVER].includes(Program.status)) {
        if (Program.status === PROGRAM_RUN) {
            Entities.run();
            Season.next();
        }

        Program.frame++;

        Events.run();

        Connections.map(sendData);
    }
}, FRAME_DURATION);

io.on("connection", (socket: Socket) => {
    Connections.connect(socket);

    socket.data.consoleList = [];
    socket.data.debugMode = false;

    sendData(socket);

    Chat.sendAll(socket);

    socket.on("disconnect", () => Connections.disconnect(socket));

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

        Connections.map(sendData);
    });

    socket.on("debug-mode", (value: boolean) => {
        socket.data.debugMode = value;
    });

    socket.on("season", function (value: TSeasons) {
        Season.set(value);

        Console.print(`Season: ${value}`, "warning");
    });

    socket.on("game-event", function ({ action, args }: { action: string; args: any }) {
        switch (action) {
            case "lightning":
                Events.lightning(new Position(args.x, args.y, GROUND_INDEX));
                return;
            case "tsunami":
                Events.tsunami();
                return;
            case "meteorite-fall":
                Events.meteoriteFall();
                return;
        }
    });

    socket.on("chat", (username: string, text: string) => Chat.add(username, text));
});

// program end

server.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
