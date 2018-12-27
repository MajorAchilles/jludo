import { getUUID } from "../lib/utils";

export default class GameObject {
    constructor(canvas) {
        this.uuid = getUUID();
        this.isRenderable = true;
        this.canvas = canvas;
        this.context = this.canvas.getContext("2d");
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
