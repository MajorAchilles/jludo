/* globals document */
import GameObject from "./GameObject";
import { dimensions } from "../constants";
import { generateTrack } from "../state";

export default class Board extends GameObject {
    constructor(canvas, width, height) {
        super(canvas);
        this.width = width || dimensions.BOARD_WIDTH;
        this.height = height || dimensions.BOARD_HEIGHT;
        this.backgroundImage = document.getElementById("background");
        this.track = generateTrack();
    }

    /**
     * @inherit
     */
    render() {
        this.getContext().drawImage(
            this.backgroundImage,
            0,
            0,
            this.width,
            this.height
        );
    }
}
