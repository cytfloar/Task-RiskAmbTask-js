import { HGroup } from "../utils/HGroup.js";
import { VGroup } from "../utils/VGroup.js";
import { Screen } from "../utils/Screen.js";
import { Text } from "../utils/Text.js";

class ScreenCenterText extends Screen {
    constructor({
        textName,
        color = "white",
        fontSize = "100px",
        columnName = "",
        keyChoice,
        keyName = " ",
        timer
    }) {
        super()
        this.backgroundColor = "black";
        this.textName = textName;
        this.fontSize = fontSize;
        this.color = color;
        this.columnName = columnName;
        this.keyName = keyName;
        this.keyChoice = keyChoice;
        this.timer = timer;
        if (typeof(textName) !== "string" && textName.length !== color.length)
            throw new Error("(text, color) lengths disagree");
    }

    async run() {
        await super.run();
        switch (typeof(this.textName)) {
            case "string":
                let prompt = new Text(this.textName, {
                    left: 50,
                    top: 50
                }, {
                    width: "100vw",
                    color: this.color,
                    fontSize: this.fontSize,
                    textAlign: "center",
                    fontFamily: "Arial"
                });
                prompt.display();
                break;
            default:
                let texts = [];
                for (var i in this.textName) {
                    texts.push(new Text(this.textName[i], {}, {
                        color: this.color[i],
                        fontSize: this.fontSize,
                        textAlign: "center",
                        fontFamily: "Arial"
                    }));
                }
                let hgroup = new HGroup(texts, {
                    left: 50,
                    top: 50,
                    margin: "30px"
                }, {});
                hgroup.display();
        }
        if (this.keyChoice) {
            await this.waitKey(this.keyChoice, "keyChoice", this.timer);
            return;
        }
        if (this.timer) {
            await this.waitTimer(this.timer);
            return;
        }
        if (typeof(this.keyName) === "string")
            await this.waitKey(this.keyName, this.columnName);
        else
            for (var i in this.keyName)
                await this.waitKey(this.keyName[i]);
    }
}

export { ScreenCenterText }