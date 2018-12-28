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

const dimensions = {
    BOARD_HEIGHT: canvas.height,
    BOARD_WIDTH: canvas.width,
    ROW_COUNT: 15,
    COLUMN_COUNT: 15,
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
    BoundaryColor: "#000000"
};

export {
    canvas,
    CellType,
    colors,
    context,
    dimensions
};
