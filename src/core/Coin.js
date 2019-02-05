import GameObject from "./GameObject";
import { getCoinColor } from "../lib/utils";
import { colors, dimensions } from "../constants";

export default class Coin extends GameObject {
    constructor(canvas, coinType) {
        super(canvas);
        this.coinType = coinType;
        this.coinColor = getCoinColor(this.coinType);
        this.row = 0;
        this.col = 0;
    }

    move(row, column) {
        const x = (column * dimensions.CELL_WIDTH) - (dimensions.CELL_WIDTH / 2);
        const y = (row * dimensions.CELL_HEIGHT) - (dimensions.CELL_HEIGHT / 2);
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
        context.fill();
        context.lineWidth = 2;
        context.stroke();
        context.beginPath();
        context.ellipse(
            this.x,
            this.y,
            dimensions.CELL_HEIGHT / 3,
            dimensions.CELL_WIDTH / 3,
            0,
            0,
            2 * Math.PI,
            false
        );
        context.lineWidth = 1;
        context.stroke();
    }
}
