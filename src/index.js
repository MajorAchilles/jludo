/* global window */
import {
    clearCanvas,
    renderBoard
} from "./renderer";
import Coin from "./core/Coin";
import { canvas, CoinType, dimensions } from "./constants";

window.onload = () => {
    clearCanvas();
    renderBoard();
    const coin = new Coin(canvas, CoinType.BLUE);
    let col = 0;
    let row = 0;
    setInterval(() => {
        if (col > dimensions.COLUMN_COUNT) {
            col = 0;
            row++;
        } else {
            col ++;
        }
        coin.move(row, col)
        coin.draw();
    }, 100);
};