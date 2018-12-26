import { getUUID } from "./utils";

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

    render(origin) { // eslint-disable-line class-methods-use-this
        this.setRenderOrigin(origin);
        this.context.font = "30px Arial";
        this.context.fillText("Child class must override this function.", this.x, this.y);
    }
}
