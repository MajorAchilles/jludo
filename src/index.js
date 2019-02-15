/* global window */
import {
    clearCanvas
} from "./renderer";
import Coin from "./core/Coin";
import { canvas, CoinType, dimensions } from "./constants";

window.onload = () => {
    clearCanvas(true);

    const coin = new Coin(canvas, CoinType.YELLOW);
    let col = 0;
    let row = 0;

    setInterval(() => {
        if (col > dimensions.COLUMN_COUNT) {
            col = 0;
            row++;
        } else {
            col++;
        }

        clearCanvas(true);
        coin.move(row, col);
        coin.draw();
    }, 100);
};
