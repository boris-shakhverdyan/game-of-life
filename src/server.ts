import express, { Express, Request, Response } from "express";
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

const app: Express = express();
const server = createServer(app);
const io = new Server(server);
const PORT = 3000;

app.use(express.static("public"));

// program start

Matrix.generate(20, 20, [
    { index: 1, count: 10 },
    { index: 2, count: 4 },
    { index: 3, count: 2 },
    { index: 4, count: 1 },
    { index: 5, count: 5 },
]);

for (let y = 0; y < Matrix.HEIGHT; y++) {
    for (let x = 0; x < Matrix.WIDTH; x++) {
        switch (Matrix.get()[y][x]) {
            case 1:
                Entities.grass.push(new Grass(new Position(x, y)));
                break;
            case 2:
                Entities.grassEater.push(new GrassEater(new Position(x, y)));
                break;
            case 3:
                Entities.predator.push(new Predator(new Position(x, y)));
                break;
            case 4:
                Entities.human.push(new Human(new Position(x, y)));
                break;
            case 5:
                Entities.rabbit.push(new Rabbit(new Position(x, y)));
                break;
        }
    }
}

io.on("connection", (socket) => {
    setInterval(() => {
        Entities.grass.run((grass) => {
            grass.mul();
        });

        Entities.grassEater.run((grassEater) => {
            grassEater.move();
            grassEater.eat();
            grassEater.mul();
            grassEater.die();
        });

        Entities.predator.run((predator) => {
            predator.move();
            predator.eat();
            predator.mul();
            predator.die();
        });

        Entities.human.run((human) => {
            human.move();
            human.eat();
            human.mul();
            human.die();
        });

        Entities.rabbit.run((rabbit) => {
            rabbit.move();
            rabbit.eat();
            rabbit.mul();
            rabbit.die();
        });

        socket.emit("draw", {
            matrix: Matrix.get(),
            counts: Entities.counts(),
        });
    }, 1000);
});

// program end

server.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
