class Base {
    constructor(options, styleOptions) {    
        this.options = options;
        this.styleOptions = styleOptions;
    }

    display(absolute = true, parent = document.body) {
        parent.appendChild(this.DOM);
        if (absolute) {
            let {left, top} = this.options;
            this.DOM.style.left = `${left}vw`;
            this.DOM.style.top = `${top}vh`;
            this.DOM.style.position = "absolute";
            this.DOM.style.transform = "translate(-50%,-50%)";
        }
        // this.DOM.style.width = "100vw";
        for (var key in this.styleOptions) {
            this.DOM.style[key] = this.styleOptions[key];
        }
    }
}

export { Base }