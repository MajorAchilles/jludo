/* global document */
const canvas = document.querySelector(".board");
const context = canvas.getContext("2d");

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
    YELLOW: "CoinType::Yellow"
};


const dimensions = {
    BOARD_HEIGHT: canvas.height,
    BOARD_WIDTH: canvas.width,
    ROW_COUNT: 17,
    COLUMN_COUNT: 17,
    cellOffset: 0
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
        [CoinType.GREEN]: "#00FF00",
        [CoinType.BLUE]: "#0000FF",
        [CoinType.RED]: "#FF0000",
        [CoinType.YELLOW]: "#FFFF00"
    },
    BoundaryColor: "#000000"
};

export {
    canvas,
    CellType,
    CoinType,
    colors,
    context,
    dimensions
};
