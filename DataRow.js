function getObserver() {
    var participantid = localStorage.getItem("participant");
    let observer = participantid.match(/(\d+)/);
    return observer.length > 0 ? observer[0] : null;
}

function getExpInfo(){
    var blockStart = localStorage.getItem("gainorloss");
    return blockStart;
}

class DataRow {
    constructor(options) {
        options.observer = getObserver();
        options.getExpInfo = getExpInfo();
        options.date = new Date();
        this.options = options;
    }
}

export { DataRow }