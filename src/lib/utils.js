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

/**
 * Gets the cell height
 * @returns {Number} The cell height
 */
const getCellHeight = () => BOARD_HEIGHT / ROW_COUNT;

/**
 * Gets the cell width
 * @returns {Number} The cell width
 */
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

/**
 * Gets an unique pseudorandom identifier string
 * @returns {String} A identifier strign
 */
const getUUID = () => {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)); // eslint-disable-line no-bitwise, no-mixed-operators, max-len
};

/**
 * Returns the color for the given cell type
 * @param {CellType} cellType The cell type
 * @returns {String} The color hex string
 */
const getCellColor = cellType => colors.CellFillColorMap[cellType];

/**
 * Returns the color for the given coin type
 * @param {CoinType} coinType The coin type
 * @returns {String} The color hex string
 */
const getCoinColor = coinType => colors.CoinFillColorMap[coinType];

/**
 * Converts the canvas to an image and rewrites the document
 */
const canvasToImage = () => document.write(`<img src="${getCanvas().toDataURL("image/png")}"/>`);

/**
 * Returns the location of the click in row and column indices
 * @param {Event} clickEvent The click event data
 * @returns {Object} An object cointaining the row and column index.
 */
const getClickLocation = (clickEvent) => {
    const left = clickEvent.pageX - getCanvas().offsetLeft;
    const top = clickEvent.pageY - getCanvas().offsetTop;
    const row = Math.floor(top / getCellHeight()) + 1;
    const col = Math.floor(left / getCellWidth()) + 1;

    return { row, col };
};

/**
 * Gets a random dice value between and including 1 and 6
 * @returns {Number} A number between and including 1 and 6
 */
const getDiceValue = () => Math.floor(Math.random() * 6) + 1;

export {
    canvasToImage,
    getCanvas,
    getCellColor,
    getCellHeight,
    getCellWidth,
    getClickLocation,
    getCoinColor,
    getContext,
    getDiceValue,
    getUUID
};
