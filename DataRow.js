function getObserver() {
    var participantid = localStorage.getItem("participant");
    let observer = participantid.match(/(\d+)/);
    return observer.length > 0 ? observer[0] : null;
}

class DataRow {
    constructor(options) {
        options.observer = getObserver();
        options.date = new Date();
        this.options = options;
    }
}

export { DataRow }