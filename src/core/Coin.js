import GameObject from "./GameObject";
import { getCoinColor, getCellHeight, getCellWidth } from "../lib/utils";
import { colors } from "../constants";

export default class Coin extends GameObject {
    constructor(canvas, coinType, startRow, startCol) {
        super(canvas);
        this.coinType = coinType;
        this.coinColor = getCoinColor(this.coinType);
        this.move(startRow, startCol);
    }

    move(row, column) {
        this.row = row;
        this.col = column;
        const left = (column * getCellWidth()) - (getCellWidth() / 2);
        const top = (row * getCellHeight()) - (getCellHeight() / 2);
        this.setRenderOrigin(left, top);
    }

    /**
     * Gets the current location of the coin
     * @returns {Object} An object containing the current row and column of the coin
     */
    getLocation() {
        return {
            row: this.row,
            col: this.col
        };
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
            (getCellHeight() / 2) - 5,
            (getCellWidth() / 2) - 5,
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
            (getCellHeight() / 3) - 5,
            (getCellWidth() / 3) - 5,
            0,
            0,
            2 * Math.PI,
            false
        );
        context.lineWidth = 1;
        context.stroke();
    }
}
