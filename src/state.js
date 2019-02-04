import {
    CellType,
    dimensions
} from "./constants";

const {
    ROW_COUNT,
    COLUMN_COUNT
} = dimensions;

const drawHorizontalSection = (array, rowIndex, colStart, length, cellType) => {
    for(let index = colStart; index < colStart + length; index++) {
        array[rowIndex][index] = cellType;
    }
    return array;
};

const drawVerticalSection = (array, colIndex, rowStart, length, cellType) => {
    for(let index = rowStart; index < rowStart + length; index++) {
        array[index][colIndex] = cellType;
    }
    return array;
};

const getBoardMask = () => {
    const board = [];

    for (let rowIndex = 0; rowIndex < ROW_COUNT; rowIndex++) {
        const row = [];
        for (let colIndex = 0; colIndex < COLUMN_COUNT; colIndex++) {
            row.push(CellType.EMPTY);
        }
        board.push(row);
    }

    drawHorizontalSection(board, 1, 1, 6, CellType.RED);
    drawHorizontalSection(board, 6, 1, 6, CellType.RED);
    drawVerticalSection(board, 1, 1, 6, CellType.RED);
    drawVerticalSection(board, 6, 1, 6, CellType.RED);
    drawHorizontalSection(board, 8, 2, 5, CellType.RED);
    drawVerticalSection(board, 7, 7, 2, CellType.RED);
    board[7][2] = CellType.RED;

    drawHorizontalSection(board, 1, 10, 6, CellType.GREEN);
    drawHorizontalSection(board, 6, 10, 6, CellType.GREEN);
    drawVerticalSection(board, 10, 1, 6, CellType.GREEN);
    drawVerticalSection(board, 15, 1, 6, CellType.GREEN);
    drawVerticalSection(board, 8, 2, 5, CellType.GREEN);
    drawHorizontalSection(board, 7, 8, 2, CellType.GREEN);
    board[2][9] = CellType.GREEN;

    drawHorizontalSection(board, 10, 1, 6, CellType.BLUE);
    drawHorizontalSection(board, 15, 1, 6, CellType.BLUE);
    drawVerticalSection(board, 1, 10, 6, CellType.BLUE);
    drawVerticalSection(board, 6, 10, 6, CellType.BLUE);
    drawVerticalSection(board, 8, 10, 5, CellType.BLUE);
    drawHorizontalSection(board, 9, 7, 2, CellType.BLUE);
    board[14][7] = CellType.BLUE;
    
    drawHorizontalSection(board, 10, 10, 6, CellType.YELLOW);
    drawHorizontalSection(board, 15, 10, 6, CellType.YELLOW);
    drawVerticalSection(board, 10, 10, 6, CellType.YELLOW);
    drawVerticalSection(board, 15, 10, 6, CellType.YELLOW);
    drawHorizontalSection(board, 8, 10, 5, CellType.YELLOW);
    drawVerticalSection(board, 9, 8, 2, CellType.YELLOW);
    board[9][14] = CellType.YELLOW;
    return board;
};

const getSafeZoneMask = () => {
    const safeZoneMask = [];

    for (let rowIndex = 0; rowIndex < ROW_COUNT; rowIndex++) {
        const row = [];
        for (let colIndex = 0; colIndex < COLUMN_COUNT; colIndex++) {
            row.push(false);
        }
        safeZoneMask.push(row);
    }

    safeZoneMask[2][8] = true;
    safeZoneMask[3][8] = true;
    safeZoneMask[4][8] = true;
    safeZoneMask[5][8] = true;
    safeZoneMask[6][8] = true;
    safeZoneMask[2][9] = true;
    safeZoneMask[3][7] = true;

    safeZoneMask[8][2] = true;
    safeZoneMask[8][3] = true;
    safeZoneMask[8][4] = true;
    safeZoneMask[8][5] = true;
    safeZoneMask[8][6] = true;
    safeZoneMask[7][2] = true;
    safeZoneMask[9][3] = true;

    safeZoneMask[10][8] = true;
    safeZoneMask[11][8] = true;
    safeZoneMask[12][8] = true;
    safeZoneMask[13][8] = true;
    safeZoneMask[14][8] = true;
    safeZoneMask[14][7] = true;
    safeZoneMask[13][9] = true;

    safeZoneMask[8][10] = true;
    safeZoneMask[8][11] = true;
    safeZoneMask[8][12] = true;
    safeZoneMask[8][13] = true;
    safeZoneMask[8][14] = true;
    safeZoneMask[7][13] = true;
    safeZoneMask[9][14] = true;
    return safeZoneMask;
};

const createBlueTrack = () => {
    const track = [
        { coin: null, row: 13, cell: 7 },
        { coin: null, row: 12, cell: 7 },
        { coin: null, row: 11, cell: 7 },
        { coin: null, row: 10, cell: 7 },
        { coin: null, row: 9, cell: 6 },
        { coin: null, row: 9, cell: 5 },
        { coin: null, row: 9, cell: 4 },
        { coin: null, row: 9, cell: 3 },
        { coin: null, row: 9, cell: 2 },
        { coin: null, row: 9, cell: 1 },
        { coin: null, row: 8, cell: 1 },
        { coin: null, row: 7, cell: 1 },
        { coin: null, row: 7, cell: 2 },
        { coin: null, row: 7, cell: 3 },
        { coin: null, row: 7, cell: 4 },
        { coin: null, row: 7, cell: 5 },
        { coin: null, row: 7, cell: 6 },
        { coin: null, row: 6, cell: 7 },
        { coin: null, row: 5, cell: 7 },
        { coin: null, row: 4, cell: 7 },
        { coin: null, row: 3, cell: 7 },
        { coin: null, row: 2, cell: 7 },
        { coin: null, row: 1, cell: 7 },
        { coin: null, row: 1, cell: 8 },
        { coin: null, row: 1, cell: 9 },
        { coin: null, row: 2, cell: 9 },
        { coin: null, row: 3, cell: 9 },
        { coin: null, row: 4, cell: 9 },
        { coin: null, row: 5, cell: 9 },
        { coin: null, row: 6, cell: 9 },
        { coin: null, row: 7, cell: 10 },
        { coin: null, row: 7, cell: 11 },
        { coin: null, row: 7, cell: 12 },
        { coin: null, row: 7, cell: 13 },
        { coin: null, row: 7, cell: 14 },
        { coin: null, row: 7, cell: 15 },
        { coin: null, row: 8, cell: 15 },
        { coin: null, row: 9, cell: 15 },
        { coin: null, row: 9, cell: 14 },
        { coin: null, row: 9, cell: 13 },
        { coin: null, row: 9, cell: 12 },
        { coin: null, row: 9, cell: 11 },
        { coin: null, row: 9, cell: 10 },
        { coin: null, row: 10, cell: 9 },
        { coin: null, row: 11, cell: 9 },
        { coin: null, row: 12, cell: 9 },
        { coin: null, row: 13, cell: 9 },
        { coin: null, row: 14, cell: 9 },
        { coin: null, row: 15, cell: 9 },
        { coin: null, row: 16, cell: 9 },
        { coin: null, row: 16, cell: 8 },
        { coin: null, row: 15, cell: 8 },
        { coin: null, row: 14, cell: 8 },
        { coin: null, row: 13, cell: 8 },
        { coin: null, row: 12, cell: 8 },
        { coin: null, row: 11, cell: 8 }
    ];

    return track;
};

export {
    getBoardMask,
    getSafeZoneMask
};
