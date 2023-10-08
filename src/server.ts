import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import Matrix from "./app/Services/Matrix/index.js";
import Entities from "./app/Services/Entities/index.js";
import Grass from "./app/Entities/Grass/index.js";
import Position from "./app/Services/Position/index.js";
import GrassEater from "./app/Entities/GrassEater/index.js";
import Predator from "./app/Entities/Predator/index.js";
import Human from "./app/Entities/Human/index.js";
import Rabbit from "./app/Entities/Rabbit/index.js";
import {
    GRASS_ID,
    GRASSEATER_ID,
    PREDATOR_ID,
    HUMAN_ID,
    RABBIT_ID,
} from "./Constants/entities.js";

const app = express();
const server = createServer(app);
const io = new Server(server);
const PORT = 3000;

app.use(express.static("public"));

// program start

Matrix.generate(20, 20, [
    { index: GRASS_ID, count: 10, collection: Entities.grass },
    { index: GRASSEATER_ID, count: 4, collection: Entities.grassEater },
    { index: PREDATOR_ID, count: 2, collection: Entities.predator },
    { index: HUMAN_ID, count: 1, collection: Entities.human },
    { index: RABBIT_ID, count: 5, collection: Entities.rabbit },
]);

io.on("connection", (socket: any) => {
    setInterval(() => {
        Entities.grass.run((grass) => grass.mul());
        Entities.grassEater.run((grassEater) => grassEater.do());
        Entities.predator.run((predator) => predator.do());
        Entities.human.run((human) => human.do());
        Entities.rabbit.run((rabbit) => rabbit.do());

        socket.emit("draw", {
            matrix: Matrix.get(),
            counts: Entities.counts(),
        });
    }, 3000);
});

// program end

server.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
