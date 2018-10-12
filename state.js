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
    colIndex  = 0;
    state[rowIndex][colIndex += 2] = CellType.GREEN;
    state[rowIndex][colIndex += 5] = CellType.BLUE;

    // Row 6
    rowIndex += 1;
    colIndex  = 0;
    state[rowIndex][colIndex += 2] = CellType.GREEN
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
}

const State = {
    getBoardMask
};
