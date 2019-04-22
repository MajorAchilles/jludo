import GameObject from "./GameObject";
import { getCoinColor, getCellHeight, getCellWidth } from "../lib/utils";
import { colors } from "../constants";

export default class Coin extends GameObject {
    constructor(canvas, coinType, startRow, startCol) {
        super(canvas);
        this.coinType = coinType;
        this.coinColor = getCoinColor(this.coinType);
        this.trackIndex = -1;
        this.startRow = startRow;
        this.startCol = startCol;
        this.move(startRow, startCol);
    }

    /**
     * Sets the row and column value of the coin
     * @param {Number} row The row to move to
     * @param {Number} column The column to move to.
     * @returns {undefined} This function doesn't return anything
     */
    move(row, column) {
        this.row = row;
        this.col = column;
        const left = (column * getCellWidth()) - (getCellWidth() / 2);
        const top = (row * getCellHeight()) - (getCellHeight() / 2);
        this.setRenderOrigin(left, top);
    }

    /**
     * Sets the track index
     * @param {Number} index The track index
     * @returns {undefined} This function doesn't return anything.
     */
    setTrackIndex(index) {
        this.trackIndex = index;
    }

    /**
     * Gets the current track index
     * @returns {Number} The current track index
     */
    getTrackIndex() {
        return this.trackIndex;
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
        const cellHeight = getCellHeight();
        const cellWidth = getCellWidth();

        const context = this.getContext();
        context.fillStyle = this.coinColor;
        context.strokeStyle = colors.BoundaryColor;

        context.beginPath();
        context.ellipse(
            this.left,
            this.top,
            (cellHeight / 2) - (cellHeight * 0.1),
            (cellWidth / 2) - (cellWidth * 0.1),
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
            (cellHeight / 3) - (cellHeight * 0.1),
            (cellWidth / 3) - (cellHeight * 0.1),
            0,
            0,
            2 * Math.PI,
            false
        );
        context.lineWidth = 1;
        context.stroke();
    }
}
