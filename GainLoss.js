import { ScreenCenterText } from "./Screens/ScreenCenterText.js";
import { ScreenPBar } from "./Screens/ScreenPBar.js";
import { Data } from "./utils/Parameters.js";
import { DataRow } from './DataRow.js';

function downloadBlob(content, filename, contentType) {
    // Create a blob
    var blob = new Blob([content], { type: contentType });
    var url = URL.createObjectURL(blob);
  
    // Create a link to download it
    var pom = document.createElement('a');
    pom.href = url;
    pom.setAttribute('download', filename);
    pom.click();
  }

var lossStartDigits = [1,2,5,6,9];
var dataRows = [];

function getObserver() {
    var participantid = localStorage.getItem("participant");
    let observer = participantid.match(/(\d+)/);
    // return observer.length > 0 ? observer[0] : null;
    return observer.length > 0 ? observer[0] : null
}

function generateScreens({
    numberTop = "$10",
    numberBottom = "$0",
    boxTop = .25,
    boxBottom = .25,
    timer = 1,
    flip = false
}) {
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
        reverse: observer % 2 === 0, //true:refSide=1 ($5 on the left);false: refSide=2(right)
        refText: flip ^ lossStartDigits.includes(lastDigit) ? "-$5" : "$5",
        barOptions: {
            numberTop: (flip ^ lossStartDigits.includes(lastDigit)) && numberTop != "$0" ? "-"+numberTop : numberTop,
            numberBottom: (flip ^ lossStartDigits.includes(lastDigit)) && numberBottom != "$0" ? "-"+numberBottom : numberBottom,
            boxTop: boxTop * 100,
            boxBottom: boxBottom * 100
        },
        timer: 4 //lottery display duration is 4s
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
    var csvOutput = "";
    for (var blockNumber = 1; blockNumber < 5; ++ blockNumber) {
        //Block Num screen
        let blockIntroScreen = new ScreenCenterText({
            textName: `Block ${blockNumber}`,
            keyName: ["a", "5"]
        });
        await blockIntroScreen.run();
        //Trials begin here
        for (var trialNumber = 1; trialNumber < 32; ++ trialNumber) {
            let idx = (blockNumber - 1) * 31 + trialNumber - 1;
            let val = Data.vals[idx];
            let prob = Data.probs[idx];
            let ambig = Data.ambigs[idx];
            let color = Data.colors[idx];
            let ITI = Data.ITIs[idx];

            var numberTop = "";
            var numberBottom = "";
            var boxTop = 25;
            var boxBottom = 25;

            if (color == 1) { // blue
                numberTop = `$${val}`;
                numberBottom = "$0";
                boxTop = 1-prob;
                boxBottom = prob;
            } else { // red
                numberTop = "$0";
                numberBottom = `$${val}`;
                boxTop = prob;
                boxBottom = 1-prob;
            }

            if (ambig > 0.0) {
                boxTop *= 1 - ambig;
                boxBottom *= 1 - ambig;
            }

            var screens = generateScreens({
                numberTop,
                numberBottom,
                boxTop,
                boxBottom,
                timer: ITI,
                flip: blockNumber > 2
            });

            var ITIStartTime, trialStartTime, respStartTime, feedbackStartTime, trialEndTime;

            for (var i in screens) {
                switch (i) {
                    case "0":
                        ITIStartTime = new Date();
                        break;
                    case "1":
                        trialStartTime = new Date();
                        break;
                    case "2":
                        respStartTime = new Date();
                        break;
                    default:
                        break;
                }
                await screens[i].run();
            };
            let lastResponse = screens[screens.length - 1].responses;
            let choice = lastResponse.keyChoice && lastResponse.keyChoice.code;
            let colorChoices = ["white", "white"];
            if (choice) colorChoices[choice-1] = "yellow";
            var presentChoiceScreen = new ScreenCenterText({
                textName: ["\u{25aa}", "\u{25aa}"],
                color: colorChoices,
                fontSize: "300px",
                timer: 0.5 //feedback window is set to 0.5s
            });
            feedbackStartTime = new Date();
            await presentChoiceScreen.run();
            trialEndTime = new Date();
            var bagNumber;
            var lastDigit = getObserver() % 10;
            var blockType = (blockNumber>2) ^ (lossStartDigits.includes(lastDigit)) ? "loss": "gain"
            if (blockType == "gain"){
                switch (ambig) {
                    case .24:
                        bagNumber = 10;
                        break;
                    case .5:
                        bagNumber = 11;
                        break;
                    case .74:
                        bagNumber = 12;
                        break;
                    default:
                        bagNumber = prob == 0.5 ? 4 : ((color == 1) ^ (prob == 0.25) ? 5 : 3);
            }}

            var choiceType;
            var refSide = getObserver() % 2 === 0 ? 1 : 2;

            if (choice) {
                choiceType = (choice == 1) ^ (refSide == 1) ? "Lottery" : "Reference";
            } else {
                choiceType = "None";
            }

            let resultRow = new DataRow({
                refSide,
                trialNum: idx + 1,
                blockType,
                val,
                prob,
                ambig,
                color,
                ITI,
                redValue: numberTop,
                blueValue: numberBottom,
                ITIStartTime,
                trialStartTime,
                respStartTime,
                feedbackStartTime,
                trialEndTime,
                choice,
                choiceType,
                rt: lastResponse.keyChoice && lastResponse.keyChoice.reactionTime,
                bagNumber
            });
            dataRows.push(resultRow);
            if (csvOutput === "") csvOutput += Object.keys(resultRow.options).join(',') + "\n";
            csvOutput += Object.values(resultRow.options).map(e => {
                if (e instanceof Date) {
                    return e.toLocaleString().replace(",", "");
                }
                return e;
            }).join(",") + "\n";
            localStorage.setItem("lastrun", csvOutput);
        };
    }
    let endScreen = new ScreenCenterText({
        textName: `Finished!`,
        timer: 2
    });
    await endScreen.run();
    downloadBlob(csvOutput, "data"+localStorage.getItem("participant")+"_"+new Date().toLocaleDateString().replaceAll("/", "")+".csv", "text/csv;charset=utf-8;");
}

document.forms[0].onsubmit = (e) => {
    e.preventDefault();
    var formData = new FormData(document.forms[0]);
    var obj = Object.fromEntries(Array.from(formData.keys()).map(key => [key, formData.getAll(key).length > 1 ? formData.getAll(key) : formData.get(key)]));
    localStorage.setItem("participant", obj.participant);
    // console.log(localStorage.getItem("participant"));
    document.querySelector('body').requestFullscreen();
    main();
};