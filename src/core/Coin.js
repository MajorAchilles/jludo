/* globals document */
import GameObject from "./GameObject";
import { getCoinColor, getCellHeight, getCellWidth } from "../lib/utils";
import { colors, timing } from "../constants";

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

    /* eslint-disable class-methods-use-this */
    /**
     * Animates the movement of the coins
     * @param {Object} start The starting cell position
     * @param {Object} end The ending cell position
     * @param {Array<Object>} trackSegment The next track segment
     * @param {Image} image The background image.
     * @return {Promise<Boolean>} A promise that resolves once the render operation is done.
     */
    async animateMove(start, end, trackSegment, image) {
        const sourceImage = document.createElement("img");
        sourceImage.src = image;
        return new Promise((resolve) => {
            const context = this.getContext();
            let currentPosition = start;

            const renderInterval = setInterval(() => {
                console.log({
                    start,
                    end,
                    currentPosition
                });
                const nextPosition = this.getNextPosition(currentPosition, end, trackSegment);
                this.move(nextPosition.row, nextPosition.col); // Improve this logic to use track segment OR starting position logic
                currentPosition = nextPosition;

                console.log("Rendering");
                context.drawImage(sourceImage, 0, 0);
                this.render();

                if (this.row === end.row && this.col === end.col) {
                    console.log("reached end. clearing interval");
                    clearInterval(renderInterval);
                    resolve(true);
                }
            }, timing.TIME_PER_FRAME);
        });
    }

    /**
     * Get the next position for this coin.
     * @param {Object} start The starting cell position
     * @param {Object} end The ending cell position
     * @param {Array<Object>} trackSegment The next track segment
     * @param {Object} The next position to go to.
     * @returns {Object} The next position
     */
    getNextPosition(start, end, trackSegment) {
        if (start.row === end.row && start.col === end.col) {
            return end;
        }

        if (trackSegment.length) {
            const currentPositionIndex = trackSegment.findIndex(
                position => position.row === start.row && position.col === start.col
            );
            return trackSegment[currentPositionIndex + 1] || trackSegment[0];
        }

        const nextPostion = {};

        if (start.row < end.row) {
            nextPostion.row = start.row + 1;
        } else if (start.row > end.row) {
            nextPostion.row = start.row - 1;
        } else {
            nextPostion.row = start.row;
        }

        if (start.col < end.col) {
            nextPostion.col = start.col + 1;
        } else if (start.col > end.col) {
            nextPostion.col = start.col - 1;
        } else {
            nextPostion.col = start.col;
        }

        return nextPostion;
    }
}
