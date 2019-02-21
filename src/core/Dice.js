/* globals */
import GameObject from "./GameObject";
import { getDiceContext, getDiceValue } from "../lib/utils";

const RED = "#FF0000";
const BLACK = "#000000";

export default class Dice extends GameObject {
    constructor(canvas) {
        super(canvas);
        this.diceFace = 6;
    }

    /**
     * This sets the dice face value
     * @param {Number} diceFace The dice face value
     * @returns {undefined} This function doesn't return anything.
     */
    setDiceFace(diceFace) {
        this.diceFace = diceFace;
    }

    /**
     * Throws the dice value
     * @returns {undefined} This function doesn't return anything.
     */
    throw() {
        this.setDiceFace(getDiceValue());
    }

    /**
     * @inherit
     */
    preRender() {
        this.canvas.height = this.canvas.height;
    }

    /**
     * @inherit
     */
    render() {
        const context = getDiceContext();
        context.font = "40px Arial";
        context.fillStyle = this.diceFace === 6 ? RED : BLACK;
        context.fillText(this.diceFace, 40, 60);
    }
}
