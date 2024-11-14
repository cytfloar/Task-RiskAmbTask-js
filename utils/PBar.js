import { VGroup } from "./VGroup.js";
import { Text } from './Text.js';
import { Base } from "./Base.js";

class Box extends Base {
    constructor({
        boxTop = 13,
        boxBottom = 13
    }) {
        super()
        let largeBox = document.createElement("div");
        largeBox.style.width = "100%";
        largeBox.style.height = "40vh";
        largeBox.style.backgroundColor = "grey";
        largeBox.style.display = "flex";
        largeBox.style.position = "relative";

        let upperBox = document.createElement("div");
        upperBox.style.width = "100%";
        upperBox.style.height = `${boxTop}%`;
        upperBox.style.backgroundColor = "red";
        upperBox.style.color = "white";
        upperBox.style.fontFamily = "Arial";
        upperBox.style.fontSize = "30px";
        upperBox.style.textAlign = "center";
        upperBox.style.display = "flex";
        upperBox.style.justifyContent = "center";
        upperBox.style.alignItems = "center";

        upperBox.innerHTML = boxTop;

        let lowerBox = document.createElement("div");
        lowerBox.style.width = "100%";
        lowerBox.style.height = `${boxBottom}%`;
        lowerBox.style.backgroundColor = "blue";
        lowerBox.style.verticalAlign = "middle";
        lowerBox.style.display = "flex";
        lowerBox.style.position = "absolute";
        lowerBox.style.bottom = "0";
        lowerBox.style.color = "white";
        lowerBox.style.fontFamily = "Arial";
        lowerBox.style.fontSize = "30px";
        lowerBox.style.textAlign = "center";
        lowerBox.style.justifyContent = "center";
        lowerBox.style.alignItems = "center";

        lowerBox.innerHTML = boxBottom;

        largeBox.appendChild(upperBox);
        largeBox.appendChild(lowerBox);

        this.DOM = largeBox;
    }
}

class PBar extends VGroup {
    constructor({
        numberTop = "$0",
        numberBottom = "$111",
        boxTop = 13,
        boxBottom = 13
    }, styleOptions) {
        var elements = [];
        elements.push(new Text(numberTop, {}, {
            fontSize: "85px",
            textAlign: "center",
            color: "white",
            width: "100%",
            display: "block",
            fontFamily: "Arial",
            minWidth: "200px"
        }));

        let largeBox = new Box({
            boxTop,
            boxBottom
        })

        elements.push(largeBox);

        elements.push(new Text(numberBottom, {}, {
            fontSize: "85px",
            textAlign: "center",
            color: "white",
            width: "100%",
            display: "block",
            fontFamily: "Arial"
        }));
        // console.log(elements);
        super(elements, {}, styleOptions);
    }

    display(absolute = true, parent = document.body) {
        super.display(absolute, parent);
    }
}

export { PBar }