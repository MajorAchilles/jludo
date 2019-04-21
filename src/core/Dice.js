/* globals document */
import GameObject from "./GameObject";
import { getDiceValue } from "../lib/utils";
import { timing } from "../constants";


const DICE_WIDTH = 98;

export default class Dice extends GameObject {
    constructor(canvas) {
        super(canvas);
        this.diceFace = 6;
        this.diceSprite = document.getElementById("diceSprite")
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
     * This gets the dice face value
     * @returns {Number} The dice face value
     */
    getDiceFace() {
        return this.diceFace;
    }

    /**
     * Throws the dice value
     * @returns {undefined} This function doesn't return anything.
     */
    throw() {
        this.setDiceFace(getDiceValue());
        return this.getDiceFace();
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
    async render() {
        return new Promise((resolve) => {
            const context = this.getContext();

            const frameInterval = setInterval(() => {
                this.drawDiceSprite(context, getDiceValue());
            }, timing.TIME_PER_FRAME);

            setTimeout(() => {
                clearInterval(frameInterval);
                this.drawDiceSprite(context, this.diceFace);
                setTimeout(resolve, 200);
            }, 1000);
        });
    }

    drawDiceSprite(context, diceValue) {
        context.drawImage(
            this.diceSprite,
            (diceValue - 1) * DICE_WIDTH,
            0,
            DICE_WIDTH,
            DICE_WIDTH,
            0,
            0,
            DICE_WIDTH,
            DICE_WIDTH
        );
    }
}
