import {
    CellType,
    dimensions
} from "./constants";

const {
    ROW_COUNT,
    COLUMN_COUNT
} = dimensions;

const getBoardMask = () => {
    const state = [];

    for (let rowIndex = 0; rowIndex < ROW_COUNT; rowIndex++) {
        const row = [];
        for (let colIndex = 0; colIndex < COLUMN_COUNT; colIndex++) {
            row.push(CellType.EMPTY);
        }
        state.push(row);
    }

    let rowIndex = 0;
    let colIndex = 0;

    // Row 1
    rowIndex += 2;
    state[rowIndex][colIndex += 2] = CellType.GREEN;
    state[rowIndex][colIndex += 1] = CellType.GREEN;
    state[rowIndex][colIndex += 1] = CellType.GREEN;
    state[rowIndex][colIndex += 1] = CellType.GREEN;
    state[rowIndex][colIndex += 2] = CellType.BLUE;
    state[rowIndex][colIndex += 1] = CellType.BLUE;
    state[rowIndex][colIndex += 1] = CellType.BLUE;
    state[rowIndex][colIndex += 1] = CellType.BLUE;
    state[rowIndex][colIndex += 1] = CellType.BLUE;
    state[rowIndex][colIndex += 1] = CellType.BLUE;

    // Row 2
    rowIndex += 1;
    colIndex = 0;
    state[rowIndex][colIndex += 2] = CellType.GREEN;
    state[rowIndex][colIndex += 1] = CellType.GREEN;
    state[rowIndex][colIndex += 1] = CellType.GREEN;
    state[rowIndex][colIndex += 1] = CellType.GREEN;
    state[rowIndex][colIndex += 2] = CellType.BLUE;
    state[rowIndex][colIndex += 2] = CellType.BLUE;
    state[rowIndex][colIndex += 1] = CellType.BLUE;
    state[rowIndex][colIndex += 1] = CellType.BLUE;
    state[rowIndex][colIndex += 1] = CellType.BLUE;

    // Row 3
    rowIndex += 1;
    colIndex = 0;
    state[rowIndex][colIndex += 2] = CellType.GREEN;
    state[rowIndex][colIndex += 1] = CellType.GREEN;
    state[rowIndex][colIndex += 1] = CellType.GREEN;
    state[rowIndex][colIndex += 1] = CellType.GREEN;
    state[rowIndex][colIndex += 2] = CellType.BLUE;
    state[rowIndex][colIndex += 2] = CellType.BLUE;
    state[rowIndex][colIndex += 1] = CellType.BLUE;
    state[rowIndex][colIndex += 1] = CellType.BLUE;
    state[rowIndex][colIndex += 1] = CellType.BLUE;

    // Row 4
    rowIndex += 1;
    colIndex = 0;
    state[rowIndex][colIndex += 2] = CellType.GREEN;
    state[rowIndex][colIndex += 1] = CellType.GREEN;
    state[rowIndex][colIndex += 1] = CellType.GREEN;
    state[rowIndex][colIndex += 1] = CellType.GREEN;
    state[rowIndex][colIndex += 2] = CellType.BLUE;
    state[rowIndex][colIndex += 2] = CellType.BLUE;
    state[rowIndex][colIndex += 1] = CellType.BLUE;
    state[rowIndex][colIndex += 1] = CellType.BLUE;
    state[rowIndex][colIndex += 1] = CellType.BLUE;

    // Row 5
    rowIndex += 1;
    colIndex = 0;
    state[rowIndex][colIndex += 2] = CellType.GREEN;
    state[rowIndex][colIndex += 5] = CellType.BLUE;

    // Row 6
    rowIndex += 1;
    colIndex = 0;
    state[rowIndex][colIndex += 2] = CellType.GREEN;
    state[rowIndex][colIndex += 1] = CellType.GREEN;
    state[rowIndex][colIndex += 1] = CellType.GREEN;
    state[rowIndex][colIndex += 1] = CellType.GREEN;
    state[rowIndex][colIndex += 1] = CellType.GREEN;
    state[rowIndex][colIndex += 2] = CellType.YELLOW;
    state[rowIndex][colIndex += 1] = CellType.YELLOW;
    state[rowIndex][colIndex += 1] = CellType.YELLOW;
    state[rowIndex][colIndex += 1] = CellType.YELLOW;
    state[rowIndex][colIndex += 1] = CellType.YELLOW;

    rowIndex += 1;
    colIndex = 0;
    state[rowIndex][colIndex += 7] = CellType.RED;
    state[rowIndex][colIndex += 5] = CellType.YELLOW;

    // Row 8
    rowIndex += 1;
    colIndex = 0;
    state[rowIndex][colIndex += 2] = CellType.RED;
    state[rowIndex][colIndex += 1] = CellType.RED;
    state[rowIndex][colIndex += 1] = CellType.RED;
    state[rowIndex][colIndex += 1] = CellType.RED;
    state[rowIndex][colIndex += 2] = CellType.RED;
    state[rowIndex][colIndex += 2] = CellType.YELLOW;
    state[rowIndex][colIndex += 1] = CellType.YELLOW;
    state[rowIndex][colIndex += 1] = CellType.YELLOW;
    state[rowIndex][colIndex += 1] = CellType.YELLOW;

    // Row 9
    rowIndex += 1;
    colIndex = 0;
    state[rowIndex][colIndex += 2] = CellType.RED;
    state[rowIndex][colIndex += 1] = CellType.RED;
    state[rowIndex][colIndex += 1] = CellType.RED;
    state[rowIndex][colIndex += 1] = CellType.RED;
    state[rowIndex][colIndex += 2] = CellType.RED;
    state[rowIndex][colIndex += 2] = CellType.YELLOW;
    state[rowIndex][colIndex += 1] = CellType.YELLOW;
    state[rowIndex][colIndex += 1] = CellType.YELLOW;
    state[rowIndex][colIndex += 1] = CellType.YELLOW;

    // Row 10
    rowIndex += 1;
    colIndex = 0;
    state[rowIndex][colIndex += 2] = CellType.RED;
    state[rowIndex][colIndex += 1] = CellType.RED;
    state[rowIndex][colIndex += 1] = CellType.RED;
    state[rowIndex][colIndex += 1] = CellType.RED;
    state[rowIndex][colIndex += 2] = CellType.RED;
    state[rowIndex][colIndex += 2] = CellType.YELLOW;
    state[rowIndex][colIndex += 1] = CellType.YELLOW;
    state[rowIndex][colIndex += 1] = CellType.YELLOW;
    state[rowIndex][colIndex += 1] = CellType.YELLOW;

    rowIndex += 1;
    colIndex = 0;
    state[rowIndex][colIndex += 2] = CellType.RED;
    state[rowIndex][colIndex += 1] = CellType.RED;
    state[rowIndex][colIndex += 1] = CellType.RED;
    state[rowIndex][colIndex += 1] = CellType.RED;
    state[rowIndex][colIndex += 1] = CellType.RED;
    state[rowIndex][colIndex += 1] = CellType.RED;
    state[rowIndex][colIndex += 2] = CellType.YELLOW;
    state[rowIndex][colIndex += 1] = CellType.YELLOW;
    state[rowIndex][colIndex += 1] = CellType.YELLOW;
    state[rowIndex][colIndex += 1] = CellType.YELLOW;


    return state;
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

    let rowIndex = 0;
    let colIndex = 0;

    // Row 1
    rowIndex += 2;
    safeZoneMask[rowIndex][colIndex += 7] = true;
    safeZoneMask[rowIndex][colIndex += 1] = true;

    // Row 2
    rowIndex += 1;
    colIndex = 0;
    safeZoneMask[rowIndex][colIndex += 3] = true;
    safeZoneMask[rowIndex][colIndex += 1] = true;
    safeZoneMask[rowIndex][colIndex += 3] = true;
    safeZoneMask[rowIndex][colIndex += 3] = true;
    safeZoneMask[rowIndex][colIndex += 1] = true;

    // Row 3
    colIndex = 0;
    rowIndex += 1;
    safeZoneMask[rowIndex][colIndex += 3] = true;
    safeZoneMask[rowIndex][colIndex += 1] = true;
    safeZoneMask[rowIndex][colIndex += 2] = true;
    safeZoneMask[rowIndex][colIndex += 1] = true;
    safeZoneMask[rowIndex][colIndex += 3] = true;
    safeZoneMask[rowIndex][colIndex += 1] = true;

    // Row 4
    colIndex = 0;
    rowIndex += 1;
    safeZoneMask[rowIndex][colIndex += 7] = true;

    // Row 5
    colIndex = 0;
    rowIndex += 1;
    safeZoneMask[rowIndex][colIndex += 2] = true;
    safeZoneMask[rowIndex][colIndex += 5] = true;
    safeZoneMask[rowIndex][colIndex += 3] = true;

    // Row 6
    colIndex = 0;
    rowIndex += 1;
    safeZoneMask[rowIndex][colIndex += 2] = true;
    safeZoneMask[rowIndex][colIndex += 1] = true;
    safeZoneMask[rowIndex][colIndex += 1] = true;
    safeZoneMask[rowIndex][colIndex += 1] = true;
    safeZoneMask[rowIndex][colIndex += 1] = true;
    safeZoneMask[rowIndex][colIndex += 2] = true;
    safeZoneMask[rowIndex][colIndex += 1] = true;
    safeZoneMask[rowIndex][colIndex += 1] = true;
    safeZoneMask[rowIndex][colIndex += 1] = true;
    safeZoneMask[rowIndex][colIndex += 1] = true;

    // Row 7
    colIndex = 0;
    rowIndex += 1;
    safeZoneMask[rowIndex][colIndex += 4] = true;
    safeZoneMask[rowIndex][colIndex += 3] = true;
    safeZoneMask[rowIndex][colIndex += 5] = true;

    // Row 8
    colIndex = 0;
    rowIndex += 1;
    safeZoneMask[rowIndex][colIndex += 7] = true;

    // Row 9
    colIndex = 0;
    rowIndex += 1;
    safeZoneMask[rowIndex][colIndex += 3] = true;
    safeZoneMask[rowIndex][colIndex += 1] = true;
    safeZoneMask[rowIndex][colIndex += 3] = true;
    safeZoneMask[rowIndex][colIndex += 1] = true;
    safeZoneMask[rowIndex][colIndex += 2] = true;
    safeZoneMask[rowIndex][colIndex += 1] = true;

    // Row 10
    colIndex = 0;
    rowIndex += 1;
    safeZoneMask[rowIndex][colIndex += 3] = true;
    safeZoneMask[rowIndex][colIndex += 1] = true;
    safeZoneMask[rowIndex][colIndex += 3] = true;
    safeZoneMask[rowIndex][colIndex += 3] = true;
    safeZoneMask[rowIndex][colIndex += 1] = true;

    // Row 11
    colIndex = 0;
    rowIndex += 1;
    safeZoneMask[rowIndex][colIndex += 6] = true;
    safeZoneMask[rowIndex][colIndex += 1] = true;

    return safeZoneMask;
};

export {
    getBoardMask,
    getSafeZoneMask
};
