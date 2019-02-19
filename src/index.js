/* global window */
import {
    clearCanvas
} from "./renderer";
import Coin from "./core/Coin";
import Background from "./core/Background";
import {
    canvas,
    CoinType,
    context,
    timing,
    dimensions
} from "./constants";
import { generateTrack } from "./state";

window.onload = () => {
    clearCanvas();
    new Background(canvas, dimensions.BOARD_WIDTH, dimensions.BOARD_HEIGHT).render();

    const coin = new Coin(canvas, CoinType.YELLOW);
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
    }, timing.TIME_PER_FRAME);
};
