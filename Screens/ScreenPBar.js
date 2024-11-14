import { HGroup } from "../utils/HGroup.js";
import { VGroup } from "../utils/VGroup.js";
import { Screen } from "../utils/Screen.js";
import { Text } from "../utils/Text.js";
import { PBar } from "../utils/PBar.js";

class ScreenPBar extends Screen {
    constructor({
        reverse = false,
        barOptions,
        timer,
        refText = "$5"
    }) {
        super()
        this.backgroundColor = "black";
        this.reverse = reverse;
        this.barOptions = barOptions;
        this.timer = timer;
        this.refText = refText;
    }

    async run() {
        await super.run();
        let bar = new PBar({
            numberTop: this.barOptions.numberTop || "$0",
            numberBottom: this.barOptions.numberBottom || "$111",
            boxTop: this.barOptions.boxTop || 25,
            boxBottom: this.barOptions.boxBottom || 25,
        });

        let groupItems = [
            bar,
            new Text("or", {}, {
                display: "flex",
                color: "white",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "80px",
                fontFamily: "Arial"
            }),
            new Text(this.refText, {}, {
                display: "flex",
                color: "white",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "110px",
                fontFamily: "Arial"
            })
        ];

        if (this.reverse) groupItems = groupItems.reverse();

        let hgroup = new HGroup(groupItems, {
            left: 50,
            top: 50,
            margin: "100px",
        }, {
            display: "flex",
            flexDirection: "row"
        })
        hgroup.display();
        if (this.timer) {
            await this.waitTimer(this.timer);
            return;
        }
    }
}

export { ScreenPBar }