const BOARD_HEIGHT = 600;
const BOARD_WIDTH = 600;
const ROW_COUNT = 15;
const COLUMN_COUNT = 15;
const getCellHeight = () => BOARD_HEIGHT/ROW_COUNT;
const getCellWidth = () => BOARD_WIDTH/COLUMN_COUNT;
const cellOffset = 0;
const canvas = document.querySelector(".board");
const context = canvas.getContext("2d");

const CellType = {
    GREEN: "CellType::Green",
    BLUE: "CellType::Blue",
    EMPTY: "CellType::Empty",
    RED: "CellType::Red",
    YELLOW: "CellType::Yellow",
};

const CellFillColorMap = {
    [CellType.GREEN]: "#00FF00",
    [CellType.BLUE]: "#0000FF",
    [CellType.EMPTY]: "#FFFFFF",
    [CellType.RED]: "#FF0000",
    [CellType.YELLOW]: "#FFFF00"
}

const BoundaryColor = "#000000";