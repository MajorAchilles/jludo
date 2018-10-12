getBoardMask = () => {
    const state = [];

    for(let rowIndex = 0; rowIndex < ROW_COUNT; rowIndex++) {
        let row = [];
        for(let colIndex = 0; colIndex < COLUMN_COUNT; colIndex++) {
            row.push(CellType.EMPTY);
        }
        state.push(row);
    }

    let rowIndex = 0;
    let colIndex = 0;
    rowIndex += 2;
    state[rowIndex][colIndex += 2] = CellType.GREEN;
    state[rowIndex][colIndex += 1] = CellType.GREEN;
    state[rowIndex][colIndex += 1] = CellType.GREEN;
    state[rowIndex][colIndex += 1] = CellType.GREEN;
    state[rowIndex][colIndex += 3] = CellType.BLUE;
    state[rowIndex][colIndex += 1] = CellType.BLUE;
    state[rowIndex][colIndex += 1] = CellType.BLUE;
    state[rowIndex][colIndex += 1] = CellType.BLUE;
    state[rowIndex][colIndex += 1] = CellType.BLUE;

    rowIndex += 1;
    colIndex = 0;
    state[rowIndex][colIndex += 2] = CellType.GREEN;
    state[rowIndex][colIndex += 1] = CellType.GREEN;
    state[rowIndex][colIndex += 1] = CellType.GREEN;
    state[rowIndex][colIndex += 1] = CellType.GREEN;
    state[rowIndex][colIndex += 4] = CellType.BLUE;
    state[rowIndex][colIndex += 1] = CellType.BLUE;
    state[rowIndex][colIndex += 1] = CellType.BLUE;
    state[rowIndex][colIndex += 1] = CellType.BLUE;

    rowIndex += 1;
    colIndex = 0;
    state[rowIndex][colIndex += 2] = CellType.GREEN;
    state[rowIndex][colIndex += 1] = CellType.GREEN;
    state[rowIndex][colIndex += 1] = CellType.GREEN;
    state[rowIndex][colIndex += 1] = CellType.GREEN;
    state[rowIndex][colIndex += 4] = CellType.BLUE;
    state[rowIndex][colIndex += 1] = CellType.BLUE;
    state[rowIndex][colIndex += 1] = CellType.BLUE;
    state[rowIndex][colIndex += 1] = CellType.BLUE;
    
    rowIndex += 1;
    colIndex = 0;
    state[rowIndex][colIndex += 2] = CellType.GREEN;
    state[rowIndex][colIndex += 1] = CellType.GREEN;
    state[rowIndex][colIndex += 1] = CellType.GREEN;
    state[rowIndex][colIndex += 1] = CellType.GREEN;
    state[rowIndex][colIndex += 4] = CellType.BLUE;
    state[rowIndex][colIndex += 1] = CellType.BLUE;
    state[rowIndex][colIndex += 1] = CellType.BLUE;
    state[rowIndex][colIndex += 1] = CellType.BLUE;
    rowIndex += 1;
    col
    rowIndex += 4;
    colIndex = 0;
    state[rowIndex][colIndex += 2] = CellType.RED;
    state[rowIndex][colIndex += 1] = CellType.RED;
    state[rowIndex][colIndex += 1] = CellType.RED;
    state[rowIndex][colIndex += 1] = CellType.RED;
    state[rowIndex][colIndex += 4] = CellType.YELLOW;
    state[rowIndex][colIndex += 1] = CellType.YELLOW;
    state[rowIndex][colIndex += 1] = CellType.YELLOW;
    state[rowIndex][colIndex += 1] = CellType.YELLOW;

    rowIndex += 1;
    colIndex = 0;
    state[rowIndex][colIndex += 2] = CellType.RED;
    state[rowIndex][colIndex += 1] = CellType.RED;
    state[rowIndex][colIndex += 1] = CellType.RED;
    state[rowIndex][colIndex += 1] = CellType.RED;
    state[rowIndex][colIndex += 4] = CellType.YELLOW;
    state[rowIndex][colIndex += 1] = CellType.YELLOW;
    state[rowIndex][colIndex += 1] = CellType.YELLOW;
    state[rowIndex][colIndex += 1] = CellType.YELLOW;

    rowIndex += 1;
    colIndex = 0;
    state[rowIndex][colIndex += 2] = CellType.RED;
    state[rowIndex][colIndex += 1] = CellType.RED;
    state[rowIndex][colIndex += 1] = CellType.RED;
    state[rowIndex][colIndex += 1] = CellType.RED;
    state[rowIndex][colIndex += 4] = CellType.YELLOW;
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
    state[rowIndex][colIndex += 3] = CellType.YELLOW;
    state[rowIndex][colIndex += 1] = CellType.YELLOW;
    state[rowIndex][colIndex += 1] = CellType.YELLOW;
    state[rowIndex][colIndex += 1] = CellType.YELLOW;

    return state;
}

const State = {
    getBoardMask
};
