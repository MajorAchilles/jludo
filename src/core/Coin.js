import GameObject from "./GameObject";
import { getCoinColor, getCellHeight, getCellWidth } from "../lib/utils";
import { colors } from "../constants";

export default class Coin extends GameObject {
    constructor(canvas, coinType) {
        super(canvas);
        this.coinType = coinType;
        this.coinColor = getCoinColor(this.coinType);
        this.row = 0;
        this.col = 0;
    }

    move(row, column) {
        const left = (column * getCellWidth()) - (getCellWidth() / 2);
        const top = (row * getCellHeight()) - (getCellHeight() / 2);
        this.setRenderOrigin(left, top);
    }

    /**
     * @inherit
     */
    render() {
        const context = this.getContext();
        context.fillStyle = this.coinColor;
        context.strokeStyle = colors.BoundaryColor;
        context.beginPath();
        context.ellipse(
            this.left,
            this.top,
            getCellHeight() / 2,
            getCellWidth() / 2,
            0,
            0,
            2 * Math.PI,
            false
        );
        context.fill();
        context.lineWidth = 2;
        context.stroke();
        context.beginPath();
        context.ellipse(
            this.left,
            this.top,
            getCellHeight() / 3,
            getCellWidth() / 3,
            0,
            0,
            2 * Math.PI,
            false
        );
        context.lineWidth = 1;
        context.stroke();
    }
}
