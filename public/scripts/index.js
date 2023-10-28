let canvas = null;
let isCanvasEventSetups = false;
let isMouseWantToSelect = false;
let action = null;

// actions
const lightningBtn = $("lightning");
lightningBtn.addEventListener("click", () => {
    isMouseWantToSelect = true;
    action = "lightning";
});

const tsunamiBtn = $("tsunami");
tsunamiBtn.addEventListener("click", () => {
    socket.emit("game-event", {
        action: "tsunami",
    });
});

const meteoriteFallBtn = $("meteorite-fall");
meteoriteFallBtn.addEventListener("click", () => {
    socket.emit("game-event", {
        action: "meteorite-fall",
    });
});

socket.on("event-going", (event) => {
    if (event === "active") {
        tsunamiBtn.setAttribute("disabled", "");
        lightningBtn.setAttribute("disabled", "");
        meteoriteFallBtn.setAttribute("disabled", "");
    } else {
        tsunamiBtn.removeAttribute("disabled");
        lightningBtn.removeAttribute("disabled");
        meteoriteFallBtn.removeAttribute("disabled");
    }
});

function setup() {
    socket.on(
        "draw",
        ({ matrix, counts, entities, season, options: { debugMode, program, framesCount } }) => {
            $("current-season").innerText = season;
            $("frames-count").innerText = framesCount;
            $("program-status").innerText = program;

            if (program === "RUN") {
                programStartBtn.click();
            } else if (program === "STOP") {
                programStopBtn.click();
            }

            for (let s of seasons) {
                if (s.innerText === season) {
                    s.click();
                }
            }

            if (!initialized) {
                if (consoleDebugStatus.innerText !== (debugMode ? "On" : "Off")) {
                    if (debugMode) {
                        consoleDebugOnBtn.click();
                    } else {
                        consoleDebugOffBtn.click();
                    }
                }

                initialized = true;
            }

            programStatusHTML.innerText = program;
            printCells(matrix);

            canvas = createCanvas(matrix[0].length * SIDE, matrix.length * SIDE);
            canvas.parent("canvas-wrapper");

            background(BACKGROUND_COLOR);

            if (!isCanvasEventSetups) {
                canvas.mouseClicked(function () {
                    if (action && isMouseWantToSelect) {
                        let x = Math.floor(mouseX / 20);
                        let y = Math.floor(mouseY / 20);

                        let data = { action, args: { x, y } };

                        socket.emit("game-event", data);
                        console.log("game-event", data);
                        action = null;
                        isMouseWantToSelect = false;
                    }
                });

                isCanvasEventSetups = true;
            }

            for (let y = 0; y < matrix.length; y++) {
                for (let x = 0; x < matrix[y].length; x++) {
                    entities.map((entity) => {
                        if (matrix[y][x][entity.type] === entity.index) {
                            strokeWeight(entity.type === 0 ? 1 : 0);
                            fill(
                                entity.color[$("current-season").innerText.toLowerCase()] ??
                                    entity.color.default
                            );

                            switch (entity.type) {
                                case 0:
                                    ellipse(SIDE * x + SIDE / 2, SIDE * y + SIDE / 2, SIDE_E, SIDE_E);
                                    break;
                                case 1:
                                    rect(x * SIDE, y * SIDE, SIDE, SIDE);
                            }
                        }
                    });

                    if (
                        isMouseWantToSelect &&
                        Math.floor(mouseX / 20) === x &&
                        Math.floor(mouseY / 20) === y
                    ) {
                        fill("orange");
                        rect(x * SIDE, y * SIDE, SIDE, SIDE);
                    }
                }
            }

            printInfo(matrix, counts);
        }
    );
}
