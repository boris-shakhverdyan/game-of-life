const handleError = () => {
    $("troubleshootingAlert").classList.remove("hide");
    initialized = false;
};

const handleSuccess = () => {
    $("troubleshootingAlert").classList.add("hide");
    consoleHTML.innerHTML = "";
    console.clear();
};

socket.on("connect", handleSuccess);
socket.on("connect_error", handleError);
socket.on("connect_failed", handleError);
socket.on("disconnect", handleError);
