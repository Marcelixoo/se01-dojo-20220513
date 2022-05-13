#! /usr/bin/env node

const inquirer = require('inquirer');

// could be passed in as a configuration value
const BOARD_SIZE = 5;
const INITIAL_STATUS = "red";

const rows = Object.assign({}, Array.from({ length: BOARD_SIZE }, () => INITIAL_STATUS));
const lights = Object.assign({}, Array.from({ length: BOARD_SIZE }, () => ({...rows})));

const choices = () => {
    const choicesAsMultiArray = Object.entries(lights).map((entry) => {
        const [i, row] = entry;
        return Object.keys(row).map(j => `${i},${j}`);
    });
    return choicesAsMultiArray.flat(1);
};

let currentCoordinate;
async function askForCoordinates() {
    const answer = await inquirer.prompt({
        name: 'coordinate',
        type: 'list',
        message: 'Pick a coordinate to toggle',
        choices: choices(),
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

const toggle = (status) => {
    const lifecycle = {
        "red": { "next": "green" },
        "green": { "next": "blue" },
        "blue": { "next": "off" },
        "off": { "next": "red" },
    }

    return lifecycle[status].next;
};

const adjacents = (x, y) => {
    const all = [
        [x - 1, y],
        [x + 1, y],
        [x, y + 1],
        [x, y - 1],
    ];

    const withoutOfflimits = all.filter((coordinates) => {
        const [x, y] = coordinates;

        return [x, y].every((value) => value >= 0 && value < BOARD_SIZE);
    });

    return withoutOfflimits;
}

const fromStringsToIntegers = (coordinates) => {
    const [x, y] = coordinates.split(',');

    const xAsInt = parseInt(x);
    const yAsInt = parseInt(y);

    return [xAsInt, yAsInt];
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
        const [x, y] = fromStringsToIntegers(currentCoordinate);

        
        adjacents(x, y).forEach((coordinates) => {
            const [adjX, adjY] = coordinates;
            lights[adjX][adjY] = toggle(lights[adjX][adjY]);
        })
        
        lights[x][y] = toggle(lights[x][y]);
    }

    if (hasWon()) {
        displayWinnerMessageAndExit();
    };

    play();
}

play();