let seasons = document.getElementsByClassName("season");

for (let season of seasons) {
    season.addEventListener("click", function () {
        for (let s of seasons) {
            s.removeAttribute("disabled");
        }

        this.setAttribute("disabled", true);

        socket.emit("season", this.innerText);
    });
}
