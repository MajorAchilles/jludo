/* global window */
import {
    clearCanvas
} from "./renderer";
import Coin from "./core/Coin";
import { canvas, CoinType, context } from "./constants";
import { generateTrack } from "./state";

window.onload = () => {
    clearCanvas(true);

    const coin = new Coin(canvas, CoinType.YELLOW);
    let col = 0;
    let row = 0;
    let index = 0;

    const track = generateTrack();

    setInterval(() => {
        clearCanvas(true);
        coin.move(track[index].row, track[index].col);
        index++;
        if (index >= track.length) {
            index = 0;
        }
        context.font = "20px Georgia";
        context.fillText(`ROW: ${track[index].row}, COL: ${track[index].col}`, 20, 20);
        coin.draw();
    }, 100);
};
