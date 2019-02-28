/* eslint-disable object-curly-newline */
import {
    CellType,
    dimensions,
    CoinType
} from "./constants";

const {
    ROW_COUNT,
    COLUMN_COUNT
} = dimensions;

const drawHorizontalSection = (array, rowIndex, colStart, length, cellType) => {
    for (let index = colStart; index < colStart + length; index++) {
        array[rowIndex][index] = cellType; // eslint-disable-line no-param-reassign
    }
    return array;
};

const drawVerticalSection = (array, colIndex, rowStart, length, cellType) => {
    for (let index = rowStart; index < rowStart + length; index++) {
        array[index][colIndex] = cellType; // eslint-disable-line no-param-reassign
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

const generateTrack = () => {
    const track = [
        { row: 2, col: 9, coinType: CoinType.ALL, isSafe: false, isTerminal: false },
        { row: 3, col: 9, coinType: CoinType.GREEN, isSafe: true, isTerminal: false },
        { row: 4, col: 9, coinType: CoinType.GREEN, isSafe: true, isTerminal: false },
        { row: 5, col: 9, coinType: CoinType.GREEN, isSafe: true, isTerminal: false },
        { row: 6, col: 9, coinType: CoinType.GREEN, isSafe: true, isTerminal: false },
        { row: 7, col: 9, coinType: CoinType.GREEN, isSafe: true, isTerminal: false },
        { row: 8, col: 9, coinType: CoinType.GREEN, isSafe: true, isTerminal: true },
        { row: 2, col: 10, coinType: CoinType.ALL, isSafe: false, isTerminal: false },
        { row: 3, col: 10, coinType: CoinType.ALL, isSafe: true, isTerminal: false },
        { row: 4, col: 10, coinType: CoinType.ALL, isSafe: false, isTerminal: false },
        { row: 5, col: 10, coinType: CoinType.ALL, isSafe: false, isTerminal: false },
        { row: 6, col: 10, coinType: CoinType.ALL, isSafe: false, isTerminal: false },
        { row: 7, col: 10, coinType: CoinType.ALL, isSafe: false, isTerminal: false },
        { row: 8, col: 11, coinType: CoinType.ALL, isSafe: false, isTerminal: false },
        { row: 8, col: 12, coinType: CoinType.ALL, isSafe: false, isTerminal: false },
        { row: 8, col: 13, coinType: CoinType.ALL, isSafe: false, isTerminal: false },
        { row: 8, col: 14, coinType: CoinType.ALL, isSafe: true, isTerminal: false },
        { row: 8, col: 15, coinType: CoinType.ALL, isSafe: false, isTerminal: false },
        { row: 8, col: 16, coinType: CoinType.ALL, isSafe: false, isTerminal: false },
        { row: 9, col: 16, coinType: CoinType.ALL, isSafe: false, isTerminal: false },
        { row: 9, col: 15, coinType: CoinType.YELLOW, isSafe: true, isTerminal: false },
        { row: 9, col: 14, coinType: CoinType.YELLOW, isSafe: true, isTerminal: false },
        { row: 9, col: 13, coinType: CoinType.YELLOW, isSafe: true, isTerminal: false },
        { row: 9, col: 12, coinType: CoinType.YELLOW, isSafe: true, isTerminal: false },
        { row: 9, col: 11, coinType: CoinType.YELLOW, isSafe: true, isTerminal: false },
        { row: 9, col: 10, coinType: CoinType.YELLOW, isSafe: true, isTerminal: true },
        { row: 10, col: 16, coinType: CoinType.ALL, isSafe: false, isTerminal: false },
        { row: 10, col: 15, coinType: CoinType.ALL, isSafe: true, isTerminal: false },
        { row: 10, col: 14, coinType: CoinType.ALL, isSafe: false, isTerminal: false },
        { row: 10, col: 13, coinType: CoinType.ALL, isSafe: false, isTerminal: false },
        { row: 10, col: 12, coinType: CoinType.ALL, isSafe: false, isTerminal: false },
        { row: 10, col: 11, coinType: CoinType.ALL, isSafe: false, isTerminal: false },
        { row: 11, col: 10, coinType: CoinType.ALL, isSafe: false, isTerminal: false },
        { row: 12, col: 10, coinType: CoinType.ALL, isSafe: false, isTerminal: false },
        { row: 13, col: 10, coinType: CoinType.ALL, isSafe: false, isTerminal: false },
        { row: 14, col: 10, coinType: CoinType.ALL, isSafe: true, isTerminal: false },
        { row: 15, col: 10, coinType: CoinType.ALL, isSafe: false, isTerminal: false },
        { row: 16, col: 10, coinType: CoinType.ALL, isSafe: false, isTerminal: false },
        { row: 16, col: 9, coinType: CoinType.ALL, isSafe: false, isTerminal: false },
        { row: 15, col: 9, coinType: CoinType.BLUE, isSafe: true, isTerminal: false },
        { row: 14, col: 9, coinType: CoinType.BLUE, isSafe: true, isTerminal: false },
        { row: 13, col: 9, coinType: CoinType.BLUE, isSafe: true, isTerminal: false },
        { row: 12, col: 9, coinType: CoinType.BLUE, isSafe: true, isTerminal: false },
        { row: 11, col: 9, coinType: CoinType.BLUE, isSafe: true, isTerminal: false },
        { row: 10, col: 9, coinType: CoinType.BLUE, isSafe: true, isTerminal: true },
        { row: 16, col: 8, coinType: CoinType.ALL, isSafe: false, isTerminal: false },
        { row: 15, col: 8, coinType: CoinType.ALL, isSafe: true, isTerminal: false },
        { row: 14, col: 8, coinType: CoinType.ALL, isSafe: false, isTerminal: false },
        { row: 13, col: 8, coinType: CoinType.ALL, isSafe: false, isTerminal: false },
        { row: 12, col: 8, coinType: CoinType.ALL, isSafe: false, isTerminal: false },
        { row: 11, col: 8, coinType: CoinType.ALL, isSafe: false, isTerminal: false },
        { row: 10, col: 7, coinType: CoinType.ALL, isSafe: false, isTerminal: false },
        { row: 10, col: 6, coinType: CoinType.ALL, isSafe: false, isTerminal: false },
        { row: 10, col: 5, coinType: CoinType.ALL, isSafe: false, isTerminal: false },
        { row: 10, col: 4, coinType: CoinType.ALL, isSafe: true, isTerminal: false },
        { row: 10, col: 3, coinType: CoinType.ALL, isSafe: false, isTerminal: false },
        { row: 10, col: 2, coinType: CoinType.ALL, isSafe: false, isTerminal: false },
        { row: 9, col: 2, coinType: CoinType.ALL, isSafe: false, isTerminal: false },
        { row: 9, col: 3, coinType: CoinType.RED, isSafe: true, isTerminal: false },
        { row: 9, col: 4, coinType: CoinType.RED, isSafe: true, isTerminal: false },
        { row: 9, col: 5, coinType: CoinType.RED, isSafe: true, isTerminal: false },
        { row: 9, col: 6, coinType: CoinType.RED, isSafe: true, isTerminal: false },
        { row: 9, col: 7, coinType: CoinType.RED, isSafe: true, isTerminal: false },
        { row: 9, col: 8, coinType: CoinType.RED, isSafe: true, isTerminal: true },
        { row: 8, col: 2, coinType: CoinType.ALL, isSafe: false, isTerminal: false },
        { row: 8, col: 3, coinType: CoinType.ALL, isSafe: true, isTerminal: false },
        { row: 8, col: 4, coinType: CoinType.ALL, isSafe: false, isTerminal: false },
        { row: 8, col: 5, coinType: CoinType.ALL, isSafe: false, isTerminal: false },
        { row: 8, col: 6, coinType: CoinType.ALL, isSafe: false, isTerminal: false },
        { row: 8, col: 7, coinType: CoinType.ALL, isSafe: false, isTerminal: false },
        { row: 7, col: 8, coinType: CoinType.ALL, isSafe: false, isTerminal: false },
        { row: 6, col: 8, coinType: CoinType.ALL, isSafe: false, isTerminal: false },
        { row: 5, col: 8, coinType: CoinType.ALL, isSafe: false, isTerminal: false },
        { row: 4, col: 8, coinType: CoinType.ALL, isSafe: true, isTerminal: false },
        { row: 3, col: 8, coinType: CoinType.ALL, isSafe: false, isTerminal: false },
        { row: 2, col: 8, coinType: CoinType.ALL, isSafe: false, isTerminal: false }
    ];

    return track;
};

export {
    generateTrack,
    getBoardMask,
    getSafeZoneMask
};
