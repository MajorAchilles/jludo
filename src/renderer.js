import { canvas, colors, context, dimensions } from "./constants";
import { getCellHeight, getCellWidth, getCellColor } from "./lib/utils";
import { getBoardMask, getSafeZoneMask } from "./state";
import GameObject from "./lib/GameObject";

const {
    ROW_COUNT,
    COLUMN_COUNT
} = dimensions;

console.log(dimensions);

const clearCanvas = () => {
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
    const radius = width / 2;
    const centerX = left + radius;
    const centerY = top + radius;
    context.beginPath();
    context.fillStyle = colors.BoundaryColor;
    context.arc(centerX, centerY, radius * 0.8, 0, 6);
    context.fill();
};

const renderBoard = () => {
    // const cellHeight = getCellHeight();
    // const cellWidth = getCellWidth();
    // const boardMask = getBoardMask();
    // const safeZoneMask = getSafeZoneMask();

    const gameObject = new GameObject(canvas);
    gameObject.render({ x: 30, y: 30 });

    // let top = 0;
    // for (let rowIndex = 0; rowIndex < ROW_COUNT; rowIndex++) {
    //     let left = 0;
    //     for (let colIndex = 0; colIndex < COLUMN_COUNT; colIndex++) {
    //         renderCell(
    //             context,
    //             left,
    //             top,
    //             cellWidth,
    //             cellHeight,
    //             getCellColor(boardMask[rowIndex][colIndex])
    //         );
    //         if (safeZoneMask[rowIndex][colIndex]) {
    //             renderSafeCircle(
    //                 context,
    //                 left,
    //                 top,
    //                 cellWidth,
    //                 cellHeight,
    //                 getCellColor(boardMask[rowIndex][colIndex])
    //             );
    //         }
    //         left += cellWidth;
    //     }
    //     top += cellHeight;
    // }
};

export {
    clearCanvas,
    renderBoard
};
