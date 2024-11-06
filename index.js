import { ScreenCenterText } from "./Screens/ScreenCenterText.js";
import { ScreenPBar } from "./Screens/ScreenPBar.js";

function generateScreens({
    blockNumber = 1,
    numberTop = "$10",
    numberBottom = "$0",
    timer = 1
}) {
    var screens = [];
    screens.push(new ScreenCenterText({
        textName: `Block ${blockNumber}`,
        keyName: ["a", "5"]
    }));
    screens.push(new ScreenCenterText({
        textName: "\u{2022}",
        color: "white",
        fontSize: "200px",
        timer
    }));
    screens.push(new ScreenPBar({
        reverse: false,
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
    var res = await fetch("./ITIs_norm5SD75.json");
    const timers = (await res.json())["ITIs_norm5SD75"];

    var screens = generateScreens({
        blockNumber: 1
    });

    for (var i in screens) {
        await screens[i].run();
    }

    let lastResponse = screens[screens.length - 1].responses;
    let choice = lastResponse.keyChoice && lastResponse.keyChoice.code;
    let color = ["white", "white"];
    if (choice) color[choice-1] = "yellow";

    let presentChoiceScreen = new ScreenCenterText({
        textName: ["\u{25aa}", "\u{25aa}"],
        color,
        fontSize: "300px",
        timer: 0.5 //feedback window is set to 0.5s
    });

    await presentChoiceScreen.run();
}

main();
