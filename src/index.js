/* global window */
import {
    clearCanvas,
    renderBoard
} from "./renderer";
import Coin from "./core/Coin";
import { canvas, CoinType } from "./constants";

window.onload = () => {
    clearCanvas();
    renderBoard();
    const coin = new Coin(canvas, CoinType.BLUE);
    coin.setRenderOrigin(100, 100);
    coin.render();
};
