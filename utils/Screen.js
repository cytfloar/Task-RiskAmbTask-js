class Screen {
    constructor() {
        this.keyListeners = []
        this.responses = {}
    }

    keydown(e) {
        for (var i in this.keyListeners) {
            this.keyListeners[i](e);
        }
    }

    waitTimer(time) {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve()
          }, time * 1000)
        })
    }      

    waitKey(listens, dataName = "", timeout = -1, type = "default") {
        var initialTime = Date.now();
        return new Promise((resolve) => {
            if (timeout > 0)
                setTimeout(() => resolve({
                    reactionTime: timeout,
                    code: null
                }), timeout * 1000);
            var ind = this.keyListeners.length;
            this.keyListeners.push((e) => {
                // console.log(e);
                var comparing = type === "default" ? e.key : e.code;
                if (comparing === listens || (listens.length && listens.includes(comparing))) {
                    var timeElapsed = (Date.now() - initialTime) / 1000;
                    this.keyListeners.splice(ind, 1);
                    let ans = {
                        reactionTime: timeElapsed,
                        code: comparing
                    };
                    if (dataName !== "") this.responses[dataName] = ans;
                    if (resolve) resolve(ans);
                }
            });
        });
    }

    async run() {
        let backgroundColor = this.backgroundColor || "white";
        document.body.style.backgroundColor = backgroundColor;
        document.body.innerHTML = "";
        document.body.style.width = "1vw";
        document.body.style.height = "1vh";
        document.body.style.position = "absolute";
        document.body.style.display = "block";

        window.addEventListener("keydown", (e) => {
            this.keydown(e)
        })
    }
}

export { Screen }