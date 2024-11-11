function getObserver() {
    var participantid = localStorage.getItem("participant");
    let observer = participantid.match(/(\d+)/);
    return observer.length > 0 ? observer[0] : null;
}

class DataRow {
    constructor(options) {
        this.options = options;
        this.options.observer = getObserver();
        this.options.date = new Date();
    }
}

export { DataRow }