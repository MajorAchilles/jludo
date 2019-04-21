/* globals document */
import GameObject from "./GameObject";
import { getDiceValue } from "../lib/utils";
import { timing } from "../constants";

const DICE_WIDTH = 98;
const TIMING_MULTIPLIERS = [1, 1, 2, 3, 5, 8, 13, 20, 25, 30];
const LAST_MULTIPLIER = 30;
const ROLL_ANIMATION_TIME = 1500;

export default class Dice extends GameObject {
    constructor(canvas) {
        super(canvas);
        this.diceFace = 6;
        this.diceSprite = document.getElementById("diceSprite");
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
        return new Promise(async (resolve) => {
            const context = this.getContext();

            let keepDrawing = true;
            let index = 0;
            let multiplier = 1;

            // This selects a new multiplier every time the function is called
            const multiplierInterval = setInterval(() => {
                multiplier = TIMING_MULTIPLIERS[index++] || LAST_MULTIPLIER;
            }, ROLL_ANIMATION_TIME / TIMING_MULTIPLIERS.length);
            // Call this function every n-th miliseconds, where n is the next interval between 0 and total rolling animation time

            // This clears all the timers and render loops after the animation time is over and draws the final frame
            setTimeout(async () => {
                clearInterval(multiplierInterval); // Stop the multiplier interval
                keepDrawing = false; // Stop the frame loop

                // Draw the final frame
                await this.drawDiceSprite(context, this.diceFace, timing.TIME_PER_FRAME * LAST_MULTIPLIER);
                setTimeout(resolve, 200); // Resolve the render promise after 200 miliseconds
            }, ROLL_ANIMATION_TIME); // Run after animation time is over

            // Start the loop
            while (keepDrawing) {
                // Draw the frame with the current frame interval multiplier timeout value
                await this.drawDiceSprite(context, getDiceValue(), timing.TIME_PER_FRAME * multiplier); // eslint-disable-line no-await-in-loop
            }
        });
    }

    /**
     * This function draws the appropriate sprite as per the dice value
     * @param {CanvasRenderingContext2D} context The rendering context
     * @param {Number} diceValue The current value to be displayed
     * @param {Number} frameTime The time after which this promise is to be resolved
     * @returns {undefined} This function doesn't return anything.
     */
    drawDiceSprite(context, diceValue, frameTime) {
        return new Promise((resolve) => {
            setTimeout(() => {
                context.drawImage(
                    this.diceSprite, // source image
                    (diceValue - 1) * DICE_WIDTH, // source left - x
                    0, // source top - y
                    DICE_WIDTH, // source width
                    DICE_WIDTH, // source height
                    0, // destination left - x
                    0, // destination top - y
                    DICE_WIDTH, // destination width
                    DICE_WIDTH // destination height
                );
                resolve();
            }, frameTime);
        });
    }
}
