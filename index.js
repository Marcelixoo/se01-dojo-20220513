#! /usr/bin/env node

const inquirer = require('inquirer');

const BOARD_SIZE = 3;

const lights = {
    "0": {
        "0": "on",
        "1": "on",
        "2": "on",
    },
    "1": {
        "0": "on",
        "1": "on",
        "2": "on",
    },
    "2": {
        "0": "on",
        "1": "on",
        "2": "on",
    },
};

let currentCoordinate;
async function askForCoordinates() {
    const answer = await inquirer.prompt({
        name: 'coordinate',
        type: 'list',
        message: 'Pick a coordinate to toggle',
        choices: [
            '0,0',
            '0,1',
            '0,2',
            '1,0',
            '1,1',
            '1,2',
            '2,0',
            '2,1',
            '2,2',
        ],
    });

    currentCoordinate = answer.coordinate;
}

const displayHeader = () => console.log("You are playing LightsOut (Press Ctlr + C to exit)\n");

const displaySeparator = () => console.log('----------\n');

const renderRow = (row) => console.log(` ${Object.values(row).join(' ')}\n`);

const displayRows = () => {
    for (const row of Object.values(lights)) {
        renderRow(row);
    }
}

const displayWinnerMessage = () => console.log("You won! Congrats 🎉");

const clearDisplay = () => console.clear();

const display = (lights) => {
    clearDisplay();
    displayHeader();
    displaySeparator();
    displayRows(lights);
    displaySeparator();
}

const toggle = (status) => status === "on" ? "off" : "on";

const adjacents = (x, y) => {
    return [
        `${x - 1},${y}`,
        `${x + 1},${y}`,
        `${x},${y + 1}`,
        `${x},${y - 1}`,
    ];
}

const hasWon = () => {
    return Object.values(lights)
        .every((row) => Object.values(row)
        .every((status) => status === "off"));
}


const play = async () => {
    display(lights);

    await askForCoordinates();

    if (currentCoordinate) {
        const [x, y] = currentCoordinate.split(',');

        const adjancentsToToggle = adjacents(parseInt(x), parseInt(y)).filter((coordinate) => {
            const [x, y] = coordinate.split(',');

            const xAsInt = parseInt(x);
            const yAsInt = parseInt(y);

            return xAsInt >= 0 && yAsInt >= 0 && xAsInt < 3 && yAsInt < 3;
        });

        adjancentsToToggle.forEach((coordinate) => {
            const [x, y] = coordinate.split(',');
            lights[x][y] = toggle(lights[x][y]);
        })
        
        lights[x][y] = toggle(lights[x][y]);
    }

    if (hasWon()) {
        displayWinnerMessage();
        process.exit(0);
    };

    play();
}

play();