/* global document */
import {
    colors,
    dimensions
} from "./constants";

import {
    getCellHeight,
    getCellWidth,
    getCellColor,
    getContext,
    getBoardCanvas
} from "./lib/utils";

import { getBoardMask, getSafeZoneMask } from "./state";

const {
    ROW_COUNT,
    COLUMN_COUNT,
    BOARD_HEIGHT,
    BOARD_WIDTH
} = dimensions;

const boardContext = getContext(getBoardCanvas());

/**
 * This function clears the given canvas
 * @param {HTMLCanvasElement} canvas The canvas to be cleared
 * @returns {undefined} This function doesn't return anything
 */
const clearCanvas = (canvas) => {
    canvas.width = canvas.width; // eslint-disable-line no-param-reassign
    canvas.height = canvas.height; // eslint-disable-line no-param-reassign
};

const renderCell = (left, top, width, height, color) => {
    boardContext.beginPath();
    boardContext.lineWidth = 1;
    boardContext.strokeStyle = colors.BoundaryColor;
    boardContext.strokeRect(left, top, width, height);

    boardContext.beginPath();
    boardContext.fillStyle = color;
    boardContext.fillRect(left, top, width, height);
};

const renderSafeCircle = (left, top, width) => {
    boardContext.drawImage(
        document.getElementById("safeStar"),
        left + 5,
        top + 5,
        width - 10,
        width - 10
    );
};

const renderBoard = () => {
    const cellHeight = getCellHeight();
    const cellWidth = getCellWidth();
    const boardMask = getBoardMask();
    const safeZoneMask = getSafeZoneMask();

    let top = 0;
    for (let rowIndex = 0; rowIndex < ROW_COUNT; rowIndex++) {
        let left = 0;
        for (let colIndex = 0; colIndex < COLUMN_COUNT; colIndex++) {
            renderCell(
                left,
                top,
                cellWidth,
                cellHeight,
                getCellColor(boardMask[rowIndex][colIndex])
            );
            if (safeZoneMask[rowIndex][colIndex]) {
                renderSafeCircle(
                    left,
                    top,
                    cellWidth,
                    cellHeight,
                    getCellColor(boardMask[rowIndex][colIndex])
                );
            }
            left += cellWidth;
        }
        top += cellHeight;
    }

    boardContext.beginPath();
    boardContext.lineWidth = 10;
    boardContext.strokeStyle = colors.BoundaryColor;
    boardContext.strokeRect(
        0,
        0,
        BOARD_WIDTH,
        BOARD_HEIGHT
    );

    boardContext.beginPath();
    boardContext.lineWidth = 5;
    boardContext.strokeStyle = colors.BoundaryColor;
    boardContext.strokeRect(
        cellHeight * 1,
        cellWidth * 1,
        BOARD_WIDTH - (cellWidth * 2),
        BOARD_HEIGHT - (cellHeight * 2)
    );
};

export {
    clearCanvas,
    renderBoard
};
