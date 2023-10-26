const wrapper = $("wrapper");
const programStatusHTML = $("program-status");

const SIDE = 20;
const BACKGROUND_COLOR = "#5d3d25";
const SIDE_E = SIDE * 0.75;
let canvas = null;
let isCanvasEventSetups = false;
let isMouseWantToSelect = false;
let action = null;

// actions
const lightningBtn = document.getElementById("lightning");
lightningBtn.addEventListener("click", function () {
    isMouseWantToSelect = true;
    action = "lightning";
});

socket.on("console", (list) => {
    for (let message of list) {
        printToConsole(message);
    }
});

function setup() {
    socket.on(
        "draw",
        ({
            matrix,
            counts,
            entities,
            season: { current, auto },
            options: { debugMode, program, framesCount },
        }) => {
            $("current-season").innerText = current;
            $("frames-count").innerText = framesCount;

            if (!initialized) {
                if ($("program-status").innerText !== program) {
                    if (program === "RUN") {
                        programStartBtn.click();
                    } else {
                        programStopBtn.click();
                    }
                }

                if (consoleDebugStatus.innerText !== (debugMode ? "On" : "Off")) {
                    if (debugMode) {
                        consoleDebugOnBtn.click();
                    } else {
                        consoleDebugOffBtn.click();
                    }
                }

                if (auto) {
                    $("season-auto").click();
                } else {
                    for (let s of seasons) {
                        if (s.innerText === current) {
                            s.click();
                        }
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
                        socket.emit("game-event", {
                            action,
                            x: Math.floor(mouseX / 20),
                            y: Math.floor(mouseY / 20),
                        });
                        console.log("game-event", {
                            action,
                            x: Math.floor(mouseX / 20),
                            y: Math.floor(mouseY / 20),
                        });
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
