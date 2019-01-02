import GameObject from "./GameObject";

export default class Coin extends GameObject {
    constructor(canvas) {
        super(canvas);
    }

    setRenderOrigin(x, y) {
        this.x = x;
        this.y = y;
    }

    render(origin = { x: this.x, y: this.y }) { // eslint-disable-line class-methods-use-this
        const { x, y } = origin;
        this.setRenderOrigin(x, y);
        this.context.font = "15px Arial";
        this.context.fillStyle = "#ff0000";
        this.context.fillText("Error: Child class must override this function.", this.x, this.y);
    }
}
