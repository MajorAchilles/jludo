import { getUUID, getContext } from "../lib/utils";
import { dimensions } from "../constants";

export default class GameObject {
    /**
     * This function initialize the instance of GameObject class.
     * @param {HTMLCanvasElement} canvas The HTMLCanvasElement instance.
     * @returns {GameObject} This function returns a GameObject instance.
     */
    constructor(canvas) {
        this.uuid = getUUID();
        this.isRenderable = true;
        this.canvas = canvas;
        this.context = getContext(canvas);
        this.top = 0;
        this.left = 0;
    }

    /**
     * Gets the context
     * @returns {CanvasRenderingContext2D} The CanvasRenderingContext2D instance of the current canvas
     */
    getContext() {
        return this.context;
    }

    /**
     * Gets the canvas
     * @returns {HTMLCanvasElement} The HTMLCanvasElement instance
     */
    getCanvas() {
        return this.canvas;
    }

    /**
     * Sets the origins for the render function
     * @param {Number} left The x co-ordinate
     * @param {Number} top The y co-ordinate
     * @returns {undefined} This function doesn't return anything.
     */
    setRenderOrigin(left, top) {
        this.left = left;
        this.top = top;
    }

    /**
     * Moves the render origins by the given offset value.
     * @param {Number} topOffset The amount by which we want to move the x coordinate
     * @param {Number} leftOffset The amount by which we want to move the y coordinate
     * @returns {undefined} This function doesn't return anything.
     */
    move(topOffset, leftOffset) {
        this.setRenderOrigin(this.top + topOffset, this.left + leftOffset);
    }

    /**
     * This function starts the rendering process of the current GameObject
     * @returns {undefined} This function doesn't return anything.
     */
    draw() {
        this.preRender();
        if (this.top <= dimensions.BOARD_HEIGHT && this.left <= dimensions.BOARD_WIDTH) {
            this.render();
        }
        this.postRender();
    }

    /**
     * This function is executed before render is started
     * @returns {Undefined} This function doesn't return anything
     */
    preRender() { // eslint-disable-line class-methods-use-this
    }

    /**
     * Renders the current GameObject
     * @returns {undefined} This function doesn't return anything.
     */
    render() {
        this.context.font = "15px Arial";
        this.context.fillStyle = "#ff0000";
        this.context.fillText("Error: Child class must override this function.", this.top, this.left);
    }

    /**
     * This function is executed after render is done.
     * @returns {Undefined} This function doesn't return anything
     */
    postRender() { // eslint-disable-line class-methods-use-this
    }
}
