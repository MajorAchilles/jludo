/* globals document */
import GameObject from "./GameObject";
import { generateTrack } from "../state";
import { getBoardWidth, getBoardHeight } from "../lib/utils";

export default class Board extends GameObject {
    constructor(canvas, width, height) {
        super(canvas);
        this.width = width || getBoardWidth();
        this.height = height || getBoardHeight();
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
