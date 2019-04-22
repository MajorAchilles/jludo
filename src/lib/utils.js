/* global crypto, document */
import {
    colors,
    dimensions,
    diceCanvas,
    boardCanvas,
    CoinType
} from "../constants";

const {
    ROW_COUNT,
    COLUMN_COUNT
} = dimensions;

/**
 * This function returns the dice canvas
 * @returns {HTMLCanvasElement} The dice canvas.
 */
const getDiceCanvas = () => diceCanvas;

/**
 * This function returns the board dice canvas
 * @returns {HTMLCanvasElement} The board canvas.
 */
const getBoardCanvas = () => boardCanvas;

/**
 * Gets the board height
 * @returns {Number} The board height
 */
const getBoardHeight = () => getBoardCanvas().height;

/**
 * Gets the board width
 * @returns {Number} The board width
 */
const getBoardWidth = () => getBoardCanvas().width;

/**
 * Gets the cell height
 * @returns {Number} The cell height
 */
const getCellHeight = () => getBoardHeight() / ROW_COUNT;

/**
 * Gets the cell width
 * @returns {Number} The cell width
 */
const getCellWidth = () => getBoardWidth() / COLUMN_COUNT;

/**
 * Adds the click handler function
 * @param {Function} clickHandler The function that handles the click location.
 * @returns {undefined} This function doesn't return anything.
 */
const addClickHandler = (clickHandler) => {
    getBoardCanvas().addEventListener("click", clickHandler);
};

/**
 * Removes the click handler function
 * @returns {undefined} This function doesn't return anything
 */
const removeClickHandler = (clickHandler) => {
    getBoardCanvas().removeEventListener("click", clickHandler);
};

/**
 * Returns the location of the click in row and column indices
 * @param {Event} clickEvent The click event data
 * @returns {Object} An object cointaining the row and column index.
 */
const getClickLocation = (clickEvent) => {
    const canvasRect = getBoardCanvas().getBoundingClientRect();
    const left = clickEvent.pageX - canvasRect.left;
    const top = clickEvent.pageY - canvasRect.top;
    const row = Math.floor(top / getCellHeight()) + 1;
    const col = Math.floor(left / getCellWidth()) + 1;

    return { row, col };
};

const listenToClick = () => {
    return new Promise((resolve) => {
        const handler = (event) => {
            removeClickHandler(handler);
            resolve(getClickLocation(event));
        };

        addClickHandler(handler);
    });
};

/**
 * Gets the next track index value
 * @param {Array<Object>} track The track array
 * @param {Number} currentTrackIndex The current index
 * @param {String} coinType The coin type for which calculation is being made.
 * @returns The next track index
 */
const getNextTrackIndex = (track, currentTrackIndex, coinType) => {
    // If this is the last position on the track, we need to reset the index to the beginning.
    if (currentTrackIndex + 1 === track.length) {
        return 0;
    }

    const nextIndex = currentTrackIndex + 1;
    const nextPosition = track[nextIndex];
    // If the next position is a valid one for the current coin type, or is allowed for all coin types, then return that index
    if (nextPosition.coinType === CoinType.ALL || nextPosition.coinType === coinType) {
        return nextIndex;
    }

    // If not valid, then return the next valid track index.
    return getNextTrackIndex(track, nextIndex, coinType);
};


/**
 * Returns the next track segment for the coin to move in
 * @param {Array<Object>} track The track array
 * @param {Number} currentTrackIndex  The current index
 * @param {Number} diceValue The value of the dice
 * @param {String} coinType The coin type
 * @returns {Array<object>} The array of positions for the coin to move in, in order.
 */
const getNextTrackSegment = (track, currentTrackIndex, diceValue, coinType) => {
    const trackPositions = [];
    let trackIndex = currentTrackIndex;
    for (let i = 0; i < diceValue; i++) {
        trackIndex = getNextTrackIndex(track, trackIndex, coinType);
        trackPositions.push(track[trackIndex]);
    }

    const isSegmentBeyondTerminal = trackPositions
        .filter((_, index) => { return index < trackPositions.length - 1; })
        .some(position => position.isTerminal);

    return isSegmentBeyondTerminal ? [] : trackPositions;
};

/**
 * This function gives the index of the track location
 * @param {Array<object>} track The track array
 * @param {Number} row  The row value
 * @param {Number} col The column value
 * @returns {Number} The index is found, else -1
 */
const getTrackIndexByLocation = (track, row, col) => {
    let trackIndex = -1;

    track.some((position, index) => {
        if (position.row === row && position.col === col) {
            trackIndex = index;
            return true;
        }
        return false;
    });

    return trackIndex;
};

/**
 * Converts the canvas to an image and rewrites the document
 */
const canvasToImage = () => document.write(`<img src="${getBoardCanvas().toDataURL("image/png")}"/>`);

/**
 * Disables the throw button
 * @returns {undefined} This function doesn't return anything.
 */
const disableThrowButton = () => document.querySelector("#throwDice").setAttribute("disabled", true);

/**
 * Enables the throw button
 * @returns {undefined} This function doesn't return anything.
 */
const enableThrowButton = () => document.querySelector("#throwDice").removeAttribute("disabled");

/**
 * This function returns the context of the given context
 * @param {HTMLCanvasElement} targetCanvas The canvas to get the context for.
 * @returns {CanvasRenderingContext2D} The canvas rendering context.
 */
const getContext = targetCanvas => targetCanvas.getContext("2d");

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
 * Gets a random dice value between and including 1 and 6
 * @returns {Number} A number between and including 1 and 6
 */
const getDiceValue = () => Math.floor(Math.random() * 6) + 1;

const showToast = (message, timeout = 3000) => {
    const toastDiv = document.createElement("div");
    toastDiv.innerText = message;
    toastDiv.setAttribute("class", "toast show");
    document.body.appendChild(toastDiv);

    setTimeout(() => {
        toastDiv.className = toastDiv.setAttribute("class", "toast");
        document.body.removeChild(toastDiv);
    }, timeout);
};

export {
    addClickHandler,
    canvasToImage,
    disableThrowButton,
    enableThrowButton,
    getBoardCanvas,
    getBoardHeight,
    getBoardWidth,
    getCellColor,
    getCellHeight,
    getCellWidth,
    getClickLocation,
    getCoinColor,
    getContext,
    getDiceCanvas,
    getDiceValue,
    getNextTrackIndex,
    getNextTrackSegment,
    getTrackIndexByLocation,
    getUUID,
    listenToClick,
    removeClickHandler,
    showToast
};
