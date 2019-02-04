import GameObject from "./GameObject";
import { getCoinColor } from "../lib/utils";

export default class Coin extends GameObject {
    constructor(canvas, coinType) {
        super(canvas);
        this.coinType = coinType;
        this.coinColor = getCoinColor(this.coinType);
    }

    move(x, y) {
        this.setRenderOrigin(x, y);
    }

    render() {
        this.context.fillStyle = this.coinColor;

        // Draw coin here.
    }
}
