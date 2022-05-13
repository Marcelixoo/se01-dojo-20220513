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

const ui = {
    header: () => console.log("You are playing LightsOut (Press Ctlr + C to exit)\n"),
    separator: () => console.log('----------\n'),
    board: (lights) => {
        for (const row of Object.values(lights)) {
            console.log(` ${Object.values(row).join(' ')}\n`)
        }
    },
    winnerMessage: () => console.log("You won! Congrats 🎉"),
    clear: () => console.clear(),

}

const displayBoard = (lights) => {
    ui.clear();
    ui.header();
    ui.separator();
    ui.board(lights);
    ui.separator();
}

const displayWinnerMessageAndExit = () => {
    displayBoard(lights);
    ui.winnerMessage();
    process.exit(0);
}

const toggle = (status) => status === "on" ? "off" : "on";

const adjacents = (x, y) => {
    const all = [
        `${x - 1},${y}`,
        `${x + 1},${y}`,
        `${x},${y + 1}`,
        `${x},${y - 1}`,
    ];

    const withoutOfflimits = all.filter((coordinate) => {
        const [x, y] = coordinate.split(',');

        const xAsInt = parseInt(x);
        const yAsInt = parseInt(y);

        return [xAsInt, yAsInt].every((value) => value >= 0 && value < BOARD_SIZE);
    });

    return withoutOfflimits;
}

const hasWon = () => {
    return Object.values(lights)
        .every((row) => Object.values(row)
        .every((status) => status === "off"));
}


const play = async () => {
    displayBoard(lights);

    await askForCoordinates();

    if (currentCoordinate) {
        const [x, y] = currentCoordinate.split(',');

        adjacents(parseInt(x), parseInt(y)).forEach((coordinate) => {
            const [x, y] = coordinate.split(',');
            lights[x][y] = toggle(lights[x][y]);
        })
        
        lights[x][y] = toggle(lights[x][y]);
    }

    if (hasWon()) {
        displayWinnerMessageAndExit();
    };

    play();
}

play();