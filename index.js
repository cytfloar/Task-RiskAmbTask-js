import { ScreenCenterText } from "./Screens/ScreenCenterText.js";
import { ScreenPBar } from "./Screens/ScreenPBar.js";

var lossStartDigits = [1,2,5,6,9];
//ITIs
var iti = await fetch("./ITIs_norm5SD75.json");
const ITIs = (await iti.json())["ITIs_norm5SD75"];


function getObserver() {
    var participantid = localStorage.getItem("participant");
    let observer = participantid.match(/(\d+)/);
    return observer.length > 0 ? observer[0] : null;
}

function generateScreens({
    numberTop = "$10",
    numberBottom = "$0",
    timer = 1
}) {
    //Order Gain and Loss block
    let observer = getObserver();
    var lastDigit = observer%10;
    var screens = [];
    screens.push(new ScreenCenterText({
        textName: "\u{2022}",
        color: "white",
        fontSize: "200px",
        timer: timer
    }));
    screens.push(new ScreenPBar({
        reverse: observer %2 === 0, //true:refSide=1 ($5 on the left);false: refSide=2(right)
        lossStart: lossStartDigits.includes(lastDigit), //false: Gain,Loss; true: Loss, Gain
        barOptions: {
            numberTop,
            numberBottom,
        },
        timer: 2 //lottery display duration is 4s
    }));
    screens.push(new ScreenCenterText({
        textName: "\u{2022}",
        color: "#00FF00",
        fontSize: "200px",
        keyChoice: ["1", "2"],
        timer: 2 //response Window is 2s
    }));
    return screens
}

async function main() {
    for (var blockNumber = 1; blockNumber < 5; ++ blockNumber) {
        //Block Num screen
        let blockIntroScreen = new ScreenCenterText({
            textName: `Block ${blockNumber}`,
            keyName: ["a", "5"]
        });
        await blockIntroScreen.run();
        
        //Trials begin here
        for (var trialNumber = 1; trialNumber < 32; ++ trialNumber) {
            var screens = generateScreens({
                // numberTop: "$10",
                // numberBottom: "$0",
                // timer: 1
                // refSide: participant id //import the participant id as refSide??
            });
            for (var i in screens) {
                await screens[i].run();
            //check the response and present choice
                let lastResponse = screens[screens.length - 1].responses;
                let choice = lastResponse.keyChoice && lastResponse.keyChoice.code;
                let color = ["white", "white"];
                if (choice) color[choice-1] = "yellow";
                var presentChoiceScreen = new ScreenCenterText({
                    textName: ["\u{25aa}", "\u{25aa}"],
                    color,
                    fontSize: "300px",
                    timer: 0.5 //feedback window is set to 0.5s
                });
            };
            await presentChoiceScreen.run();
        };
    }
}

document.forms[0].onsubmit = (e) => {
    e.preventDefault();
    var formData = new FormData(document.forms[0]);
    var obj = Object.fromEntries(Array.from(formData.keys()).map(key => [key, formData.getAll(key).length > 1 ? formData.getAll(key) : formData.get(key)]));
    localStorage.setItem("participant", obj.participant);
    // console.log(localStorage.getItem("participant"));
    main();
};