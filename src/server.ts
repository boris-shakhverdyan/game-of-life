import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import Matrix from "./app/Services/Matrix/index.js";
import Entities from "./app/Modules/Entities/index.js";

const app = express();
const server = createServer(app);
const io = new Server(server);
const PORT = 3000;

app.use(express.static("public"));

// program start

Matrix.generate(20, 20, [
    { collection: Entities.grass, count: 10 },
    { collection: Entities.grassEater, count: 4 },
    { collection: Entities.predator, count: 2 },
    { collection: Entities.human, count: 1 },
    { collection: Entities.rabbit, count: 5 },
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
