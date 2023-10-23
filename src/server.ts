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
import { DEFAULT_PROGRAM_STATUS, PORT } from "./Constants/app.js";
import Program from "./app/Services/Program/index.js";
import { TPROGRAM } from "./app/Services/Program/types.js";
import { PROGRAM_RUN, PROGRAM_STOP } from "./app/Services/Program/constant.js";

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.static("public"));

// program start

Program.setStatus(DEFAULT_PROGRAM_STATUS);

Matrix.generate(20, 20, [
    { collection: Entities.grass, count: 25 },
    { collection: Entities.grassEater, count: 2 },
    { collection: Entities.predator, count: 2 },
    // { collection: Entities.human, count: 1 },
    { collection: Entities.rabbit, count: 10 },
]);

const sendData = (socket: Socket<any>) => {
    const data = {
        program: Program.status,
        matrix: Matrix.get(),
        counts: Entities.counts(),
        entities: [
            { index: GRASS_ID, type: GROUND_INDEX, color: "green" },
            { index: GRASSEATER_ID, type: ANIMAL_INDEX, color: "yellow" },
            { index: PREDATOR_ID, type: ANIMAL_INDEX, color: "red" },
            { index: HUMAN_ID, type: ANIMAL_INDEX, color: "purple" },
            { index: RABBIT_ID, type: ANIMAL_INDEX, color: "blue" },
        ],
    };

    socket.emit("draw", data);
};

io.on("connection", (socket: any) => {
    sendData(socket);

    socket.on("program-status", function (status: TPROGRAM) {
        switch (status) {
            case PROGRAM_RUN:
                Program.run();
                break;
            case PROGRAM_STOP:
                Program.stop();
                break;
        }

        sendData(socket);
    });

    socket.on("game-event", function (args: any) {
        console.log(args);
    });

    setInterval(() => {
        if (Program.status === PROGRAM_RUN) {
            Entities.run();

            sendData(socket);
        }
    }, 1000);
});

// program end

server.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
