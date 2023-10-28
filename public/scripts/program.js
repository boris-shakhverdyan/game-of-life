const programStatusHTML = $("program-status");
const programStartBtn = $("program-start");
const programStopBtn = $("program-stop");
const programRestartBtn = $("program-restart");

programStopBtn.addEventListener("click", function () {
    programStopBtn.setAttribute("disabled", true);
    programStartBtn.removeAttribute("disabled");

    socket.emit("program-status", "STOP");
});

programStartBtn.addEventListener("click", function () {
    programStartBtn.setAttribute("disabled", true);
    programStopBtn.removeAttribute("disabled");

    socket.emit("program-status", "RUN");
});

programRestartBtn.addEventListener("click", function () {
    programStartBtn.setAttribute("disabled", true);
    programStopBtn.removeAttribute("disabled");
    initialized = false;

    socket.emit("program-status", "RESTART");
});
