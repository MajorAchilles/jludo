import {
    colors,
    dimensions
} from "../constants";

const {
    BOARD_HEIGHT,
    BOARD_WIDTH,
    ROW_COUNT,
    COLUMN_COUNT
} = dimensions;

const getCellHeight = () => BOARD_HEIGHT / ROW_COUNT;
const getCellWidth = () => BOARD_WIDTH / COLUMN_COUNT;
const getCanvas = () => document.querySelector(".board");
const getContext = canvas => canvas.getContext("2d");
const getUUID = () => {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16) // eslint-disable-line no-bitwise, no-mixed-operators
    );
};

const getCellColor = cellType => colors.CellFillColorMap[cellType];

export {
    getCanvas,
    getCellColor,
    getCellHeight,
    getCellWidth,
    getContext,
    getUUID
};
