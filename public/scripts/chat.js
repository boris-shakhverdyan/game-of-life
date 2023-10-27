const chatBody = $("chat-body");
const chatForm = $("chat-form");
const chatMutter = $("chat-mutter");
const chatMuteBtn = $("chat-mute");
const chatUnmuteBtn = $("chat-unmute");
const consoleHTML = $("console");

chatForm.addEventListener("submit", function (e) {
    e.preventDefault();

    let username = e.target.username.value.trim();
    let message = e.target.message.value.trim();

    if (username && message && username.length <= 20 && message.length <= 90) {
        socket.emit("chat", username, message);
        e.target.message.value = "";
    }
});

const addMessage = (username, message) => {
    let p = document.createElement("p");
    let span = document.createElement("span");
    span.classList.add("username");
    span.innerText = username;
    p.innerText = ": " + message;
    p.prepend(span);
    chatBody.prepend(p);
};

socket.on("chat", (username, message) => addMessage(username, message));

socket.on("chat-initial", (chat) => {
    chat.forEach(({ username, message }) => addMessage(username, message));
});

chatMuteBtn.addEventListener("click", () => {
    chatMutter.classList.remove("hide");

    $("chat-body").style.display = "none";
});

chatUnmuteBtn.addEventListener("click", () => {
    chatMutter.classList.add("hide");

    $("chat-body").style.display = "block";
});

const printToConsole = (node) => {
    let p = document.createElement("p");
    p.classList.add(node.type === "default" ? "row" : node.type);
    p.innerText = node.text;

    consoleHTML.prepend(p);
};
