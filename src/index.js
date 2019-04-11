/* global window */
import {
    clearCanvas
} from "./renderer";
import Coin from "./core/Coin";
import Board from "./core/Board";
import {
    CoinType,
    timing
} from "./constants";
import Game from "./core/Game";
import { getBoardCanvas, getBoardWidth, getBoardHeight } from "./lib/utils";

let game;
const boardCanvas = getBoardCanvas();
const startGame = () => {
    game = new Game(boardCanvas);
    game.render();
};

window.throwDice = () => {
    game.throwDice();
};

const test = () => {
    const board = new Board(boardCanvas, getBoardWidth(), getBoardHeight());

    const testCoin = new Coin(boardCanvas, CoinType.YELLOW);
    let index = 0;

    const { track } = board;

    return setInterval(() => {
        clearCanvas(boardCanvas);
        board.render();
        testCoin.move(track[index].row, track[index].col);
        index++;
        if (index >= track.length) {
            index = 0;
        }

        testCoin.draw();
    }, timing.TIME_PER_FRAME);
};

window.onload = () => {
    const testInterval = test();
    setTimeout(() => {
        clearInterval(testInterval);
        clearCanvas(boardCanvas);
        startGame();
    }, 2000);
};
