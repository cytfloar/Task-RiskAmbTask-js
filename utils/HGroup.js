import { Base } from "./Base.js"

class HGroup extends Base {
    constructor(elements, options, styleOptions, parent = document.body) {
        super(options, styleOptions, parent);

        let DOM = document.createElement("div");
        for (var i in elements) {
            elements[i].display(false, DOM);
            if (options.margin) {
                elements[i].DOM.style.margin = options.margin;
            }
        }
        
        this.DOM = DOM;
    }
}

export { HGroup }