/* globals */
import GameObject from "./GameObject";
import { diceCanvas } from "../constants";
import { getDiceContext } from "../lib/utils";

export default class Dice extends GameObject {
    constructor() {
        super(diceCanvas);
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
     * @inherit
     */
    render() {
        const context = getDiceContext();
        context.font = "40px Arial";
        context.fillText(this.diceFace, 40, 60);
    }
}
