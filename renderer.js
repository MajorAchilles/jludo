const clearCanvas = (canvas) => {
    canvas.width = canvas.width;
    canvas.height = canvas.height;
}

const renderBoard = (context) => {
    const cellHeight = getCellHeight();
    const cellWidth  = getCellWidth();
    const boardMask = getBoardMask();

    let top = 0;
    for(let rowIndex = 0; rowIndex < ROW_COUNT; rowIndex++) {
        let left = 0;
        for(let colIndex = 0; colIndex < COLUMN_COUNT; colIndex++) {
            renderCell(context, left, top, cellWidth, cellHeight, getCellColor(boardMask[rowIndex][colIndex]));
            renderSafeCircle(context, left, top, cellWidth, cellHeight, getCellColor(boardMask[rowIndex][colIndex]));
            left += cellWidth;
        }
        top += cellHeight;
    }
}

const renderCell = (context, left, top, width, height, color) => {
    context.beginPath();
    context.fillStyle = color;
    context.fillRect(left, top, width, height);

    if (color === CellFillColorMap[CellType.EMPTY]) {
        return;
    }
    context.beginPath();
    context.lineWidth = 1;
    context.strokeStyle = BoundaryColor;
    context.strokeRect(left, top, width, height);
}

const renderSafeCircle = (context, left, top, width, height) => {
    const radius = width/2;
    const centerX = left + radius;
    const centerY = top + radius;
    context.beginPath();
    context.fillStyle = BoundaryColor;
    context.arc(centerX, centerY,  radius * 0.8, 0, 6);
    context.fill();
}

// const renderFrame = (frameState, forceDraw = false) => {
//     frameState.forEach((row, rowIndex) => {
//         row.forEach((blockType, columnIndex) => {
//             const position = positionMask[rowIndex][columnIndex];
//             if (blockType || forceDraw) {
//                 renderBoard(arenaContext, position.left, position.top, getBlockColor(blockType));
//             }
//         });
//     });
// }

const getCellColor = cellType => CellFillColorMap[cellType];

const Renderer = {
    clearCanvas,
    renderBoard
}