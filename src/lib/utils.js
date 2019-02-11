/* global crypto, document */
import {
    colors,
    dimensions,
    context,
    canvas
} from "../constants";

const {
    BOARD_HEIGHT,
    BOARD_WIDTH,
    ROW_COUNT,
    COLUMN_COUNT
} = dimensions;

const getCellHeight = () => BOARD_HEIGHT / ROW_COUNT;
const getCellWidth = () => BOARD_WIDTH / COLUMN_COUNT;

/**
 * This function returns the global context
 * @returns {CanvasRenderingContext2D} The global context.
 */
const getContext = () => context;

/**
 * This function returns the global canvas
 * @returns {HTMLCanvasElement} The global canvas.
 */
const getCanvas = () => canvas;

const getUUID = () => {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)); // eslint-disable-line no-bitwise, no-mixed-operators, max-len
};

const getCellColor = cellType => colors.CellFillColorMap[cellType];
const getCoinColor = coinType => colors.CoinFillColorMap[coinType];

/**
 * Converts the canvas to an image and rewrites the document
 */
const canvasToImage = () => document.write(`<img src="${getCanvas().toDataURL("image/png")}"/>`);

export {
    canvasToImage,
    getCanvas,
    getCellColor,
    getCellHeight,
    getCellWidth,
    getCoinColor,
    getContext,
    getUUID
};
