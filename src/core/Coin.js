import GameObject from "./GameObject";
import { getCoinColor } from "../lib/utils";
import { colors, dimensions } from "../constants";

export default class Coin extends GameObject {
    constructor(canvas, coinType) {
        super(canvas);
        this.coinType = coinType;
        this.coinColor = getCoinColor(this.coinType);
    }

    move(x, y) {
        this.setRenderOrigin(x, y);
    }

    /**
     * @inherit
     */
    render() {
        const context = this.getContext();
        context.fillStyle = this.coinColor;
        context.strokeStyle = colors.BoundaryColor;
        // context.fillRect(10, 10, 100, 100);
        context.beginPath();
        context.ellipse(
            this.x,
            this.y,
            dimensions.CELL_HEIGHT / 2,
            dimensions.CELL_WIDTH / 2,
            0,
            0,
            2 * Math.PI,
            false
        );
        context.stroke();
    }
}
