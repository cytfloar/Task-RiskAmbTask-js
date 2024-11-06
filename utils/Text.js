import { Base } from "./Base.js"

class Text extends Base {
    constructor(text, options, styleOptions = {
        color: "white"
    }, parent = document.body) {
        super(options, styleOptions, parent);
        this.text = text;
        this.options = options;
        this.parent = parent;

        let DOM = document.createElement("span");
        DOM.innerHTML = text;

        this.DOM = DOM;
    }

    display(absolute = true, parent = document.body) {
        super.display(absolute, parent);
    }
}

export { Text }