/* globals document */
import GameObject from "./GameObject";
import { dimensions } from "../constants";
import { getContext } from "../lib/utils";

export default class Board extends GameObject {
    constructor(canvas, width, height) {
        super(canvas);
        this.width = width || dimensions.BOARD_WIDTH;
        this.col = height || dimensions.BOARD_HEIGHT;
        this.backgroundImage = document.getElementById("background");
    }

    /**
     * @inherit
     */
    render() {
        getContext().drawImage(
            this.backgroundImage,
            0,
            0,
            this.width,
            this.height
        );
    }
}
