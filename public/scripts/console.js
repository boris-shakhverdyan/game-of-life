const consoleDebugStatus = $("console-debug-status");
const consoleDebugOnBtn = $("console-debug-on");
const consoleDebugOffBtn = $("console-debug-off");

consoleDebugOnBtn.addEventListener("click", function () {
    consoleDebugOnBtn.setAttribute("disabled", true);
    consoleDebugOffBtn.removeAttribute("disabled");
    consoleDebugStatus.innerText = "On";

    for (let debuggable of document.getElementsByClassName("debuggable")) {
        debuggable.classList.remove("hide");
    }

    socket.emit("debug-mode", true);
});

consoleDebugOffBtn.addEventListener("click", function () {
    consoleDebugOffBtn.setAttribute("disabled", true);
    consoleDebugOnBtn.removeAttribute("disabled");
    consoleDebugStatus.innerText = "Off";

    for (let debuggable of document.getElementsByClassName("debuggable")) {
        debuggable.classList.add("hide");
    }

    socket.emit("debug-mode", false);
});

const consoleClearBtn = $("console-clear");

consoleClearBtn.addEventListener("click", function () {
    consoleHTML.innerHTML = "";
});

socket.on("console", (list) => {
    for (let message of list) {
        printToConsole(message);
    }
});
