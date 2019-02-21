/* global window */
import {
    clearCanvas
} from "./renderer";
import Coin from "./core/Coin";
import Board from "./core/Board";
import {
    canvas,
    CoinType,
    timing,
    dimensions,
    diceCanvas
} from "./constants";
import Dice from "./core/Dice";
import Game from "./core/Game";

let game;
const startGame = () => {
    game = new Game(canvas);
    game.render();
};

window.throwDice = () => {
    game.throwDice();
};

window.onload = () => {
    const board = new Board(canvas, dimensions.BOARD_WIDTH, dimensions.BOARD_HEIGHT);

    const testCoin = new Coin(canvas, CoinType.YELLOW);
    const dice = new Dice(diceCanvas);
    let index = 0;

    const { track } = board;

    const testInterval = setInterval(() => {
        clearCanvas();
        board.render();
        testCoin.move(track[index].row, track[index].col);
        index++;
        if (index >= track.length) {
            index = 0;
        }

        dice.draw();
        testCoin.draw();
    }, timing.TIME_PER_FRAME);

    setTimeout(() => {
        clearInterval(testInterval);
        clearCanvas();
        startGame();
    }, 2000);
};
