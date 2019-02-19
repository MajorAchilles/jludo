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
    dimensions
} from "./constants";

const test = (background) => {
    const coin = new Coin(canvas, CoinType.YELLOW);
    let index = 0;

    const { track } = background;
    setInterval(() => {
        clearCanvas();
        background.render();
        coin.move(track[index].row, track[index].col);
        index++;
        if (index >= track.length) {
            index = 0;
        }

        coin.draw();
    }, timing.TIME_PER_FRAME);
};

window.onload = () => {
    const board = new Board(canvas, dimensions.BOARD_WIDTH, dimensions.BOARD_HEIGHT);
    test(board);
};
