/* global document */
import {
    colors,
    context,
    dimensions
} from "./constants";

import {
    getCanvas,
    getCellHeight,
    getCellWidth,
    getCellColor
} from "./lib/utils";

import { getBoardMask, getSafeZoneMask } from "./state";

const {
    ROW_COUNT,
    COLUMN_COUNT,
    BOARD_HEIGHT,
    BOARD_WIDTH
} = dimensions;

const clearCanvas = () => {
    const canvas = getCanvas();
    canvas.width = canvas.width;
    canvas.height = canvas.height;
};

const renderCell = (left, top, width, height, color) => {
    context.beginPath();
    context.lineWidth = 1;
    context.strokeStyle = colors.BoundaryColor;
    context.strokeRect(left, top, width, height);

    context.beginPath();
    context.fillStyle = color;
    context.fillRect(left, top, width, height);
};

const renderSafeCircle = (left, top, width) => {
    context.drawImage(
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

    context.beginPath();
    context.lineWidth = 10;
    context.strokeStyle = colors.BoundaryColor;
    context.strokeRect(
        0,
        0,
        BOARD_WIDTH,
        BOARD_HEIGHT
    );

    context.beginPath();
    context.lineWidth = 5;
    context.strokeStyle = colors.BoundaryColor;
    context.strokeRect(
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
