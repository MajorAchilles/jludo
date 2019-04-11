/* global document */
const boardCanvas = document.querySelector(".board");
const diceCanvas = document.querySelector(".dice");

const CellType = {
    GREEN: "CellType::Green",
    BLUE: "CellType::Blue",
    EMPTY: "CellType::Empty",
    RED: "CellType::Red",
    YELLOW: "CellType::Yellow"
};

const CoinType = {
    GREEN: "CoinType::Green",
    BLUE: "CoinType::Blue",
    RED: "CoinType::Red",
    YELLOW: "CoinType::Yellow",
    ALL: "CoinType::All"
};


const dimensions = {
    ROW_COUNT: 17,
    COLUMN_COUNT: 17,
    CELL_OFFSET: 0
};


const playerStartPositions = {
    [CoinType.RED]: [
        { row: 4, col: 4 },
        { row: 4, col: 5 },
        { row: 5, col: 4 },
        { row: 5, col: 5 }
    ],
    [CoinType.GREEN]: [
        { row: 4, col: 13 },
        { row: 4, col: 14 },
        { row: 5, col: 13 },
        { row: 5, col: 14 }
    ],
    [CoinType.YELLOW]: [
        { row: 13, col: 13 },
        { row: 13, col: 14 },
        { row: 14, col: 13 },
        { row: 14, col: 14 }
    ],
    [CoinType.BLUE]: [
        { row: 13, col: 4 },
        { row: 13, col: 5 },
        { row: 14, col: 4 },
        { row: 14, col: 5 }
    ]
};

const playerTrackStartPositions = {
    [CoinType.RED]: { row: 8, col: 3 },
    [CoinType.GREEN]: { row: 3, col: 10 },
    [CoinType.YELLOW]: { row: 10, col: 15 },
    [CoinType.BLUE]: { row: 15, col: 8 }
};

const colors = {
    CellFillColorMap: {
        [CellType.GREEN]: "#00FF00",
        [CellType.BLUE]: "#0000FF",
        [CellType.EMPTY]: "#FFFFFF",
        [CellType.RED]: "#FF0000",
        [CellType.YELLOW]: "#FFFF00"
    },
    CoinFillColorMap: {
        [CoinType.GREEN]: "#00FF99",
        [CoinType.BLUE]: "#4D94FF",
        [CoinType.RED]: "#FF5050",
        [CoinType.YELLOW]: "#FFFF66"
    },
    BoundaryColor: "#000000"
};

const FRAMES_PER_SECOND = 60;
const MILISECONDS_PER_SECOND = 1000;
const timing = {
    FRAMES_PER_SECOND,
    TIME_PER_FRAME: MILISECONDS_PER_SECOND / FRAMES_PER_SECOND
};

export {
    boardCanvas,
    CellType,
    CoinType,
    colors,
    diceCanvas,
    dimensions,
    playerStartPositions,
    playerTrackStartPositions,
    timing
};
