import { Base } from "./Base.js"

class VGroup extends Base {
    constructor(elements, options, styleOptions) {
        super(options, styleOptions);

        let DOM = document.createElement("ul");
        DOM.style.listStyle = "None";
        DOM.style.margin = "0";
        DOM.style.padding = "0";

        for (var i in elements) {
            let li = document.createElement("li");
            DOM.appendChild(li);
            li.style.listStyle = "None";
            li.style.margin = "0";
            elements[i].display(false, li);
            if (options.margin) {
                elements[i].DOM.style.margin = options.margin;
            }
        }
        
        this.DOM = DOM;
    }
}

export { VGroup }