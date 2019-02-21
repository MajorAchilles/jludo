/* global document */
const canvas = document.querySelector(".board");
const context = canvas.getContext("2d");
const diceCanvas = document.querySelector(".dice");
const diceContext = diceCanvas.getContext("2d");

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
    BOARD_HEIGHT: canvas.height,
    BOARD_WIDTH: canvas.width,
    ROW_COUNT: 17,
    COLUMN_COUNT: 17,
    CELL_OFFSET: 0
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
    canvas,
    CellType,
    CoinType,
    colors,
    context,
    diceCanvas,
    diceContext,
    dimensions,
    timing
};
