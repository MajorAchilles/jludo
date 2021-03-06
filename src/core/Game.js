
/* globals document */
import {
    CoinType, playerTrackStartPositions
} from "../constants";
import Board from "./Board";
import Dice from "./Dice";
import {
    generatePlayerCoins,
    getPlayableCoins
} from "./GameUtils";
import {
    getDiceCanvas,
    getNextTrackSegment,
    getContext,
    getCellHeight,
    getCellWidth,
    disableThrowButton,
    enableThrowButton,
    listenToClick,
    getTrackIndexByLocation,
    getBoardHeight,
    getBoardWidth,
    getCoinColor,
    showToast,
    getBoardCanvas
} from "../lib/utils";
import { generateTrack } from "../state";

const defaultGameOptions = {
    escapeOn: 6,
    playBeforeMultiDice: true,
    multiDiceAfterEating: false
};

const defaultPlayers = [CoinType.RED, CoinType.GREEN, CoinType.YELLOW, CoinType.BLUE];

const INPUT_TYPES = {
    DICE: "Game::InputType::Dice",
    COIN_SELECTION: "Game::InputType::CoinSelection"
};

/**
 * Returns the state object data structure
 * @returns {Object} The state object data structure
 */
const getStateObject = () => {
    return {
        inputType: "",
        hasMovement: false,
        hasSelection: false,
        hasToast: true,
        changePlayer: false,
        selection: {
            selectableCells: []
        },
        toast: {
            message: "",
            timeout: 0
        },
        movement: {
            coin: null,
            currentPosition: {
                row: 0,
                col: 0
            },
            nextPosition: {
                row: 0,
                col: 0
            },
            trackSegment: []
        }
    };
};

const getRenderOptionsObject = () => {
    return {
        board: false,
        coins: false,
        dice: false,
        selection: false,
        selectionData: {
            selectableCells: []
        },
        animateCoin: false,
        coinAnimationData: getStateObject().movement
    };
};

export default class Game {
    constructor(boardCanvas, players, gameOptions) {
        this.boardCanvas = boardCanvas;
        this.players = players || defaultPlayers;
        this.gameOptions = Object.assign({}, defaultGameOptions, gameOptions);
        this.currentPlayerIndex = 0;
        this.board = new Board(this.boardCanvas, getBoardWidth(), getBoardHeight());
        this.dice = new Dice(getDiceCanvas());
        this.playerCoins = generatePlayerCoins(this.players, boardCanvas);
        this.playerNameDiv = document.querySelector("#throwDice");
        this.track = generateTrack();
        this.runLoop = true;
        this.state = getStateObject();
        this.state.inputType = INPUT_TYPES.DICE;
        this.startGameLoop();
    }

    /**
     * Sets the current player to the next player in order of play.
     * @returns {undefined} This function doesn't return anything
     */
    setNextPlayer() {
        if (this.currentPlayerIndex === this.players.length - 1) {
            this.currentPlayerIndex = 0;
        } else {
            this.currentPlayerIndex++;
        }
    }

    /**
     * Gets the current player indentifier
     * @returns {String} The current player indentifier string
     */
    getCurrentPlayer() {
        return this.players[this.currentPlayerIndex];
    }

    /**
     * Starts the game loop
     * @returns {Undefined} This function doesn't return anything
     */
    async startGameLoop() {
        /* eslint-disable no-await-in-loop */
        while (this.runLoop) {
            // Get input
            const input = await this.getInput();

            // If the current input is from dice
            if (this.state.inputType === INPUT_TYPES.DICE) {
                // Set render options to render just the dice
                const renderDiceOnly = getRenderOptionsObject();
                renderDiceOnly.dice = true;
                await this.render(renderDiceOnly);
            }

            // Get next state
            const nextState = this.getNextState(input);
            const renderOptions = this.setNextState(nextState);

            await this.render(renderOptions);
        }
        /* eslint-enable no-await-in-loop */
    }

    /**
     * Gets the input from the user
     * @returns {Promise<Number|Array<Object>>} This function returns a promise that resolve once the input is received from the user.
     */
    getInput() {
        if (this.state.inputType === INPUT_TYPES.DICE) {
            return this.getDiceValue();
        }
        return this.getCoinSelection();
    }

    /**
     * Gets the selected coin.
     * @returns {Coin} The coin instance selected by the player.
     */
    async getCoinSelection() {
        let targetCoin;
        let runLoop = true;
        while (runLoop) {
            const input = await listenToClick(); // eslint-disable-line no-await-in-loop
            const currentPlayerCoins = this.playerCoins[this.getCurrentPlayer()];
            // eslint-disable-next-line prefer-destructuring
            targetCoin = currentPlayerCoins
                .filter(coin => coin.row === input.row && coin.col === input.col)[0];
            runLoop = !targetCoin;
        }

        return targetCoin;
    }

    /**
     * Gets the value of the thrown dice.
     * @returns {Promise<Number>} The value of the dice after it is thrown.
     */
    getDiceValue() {
        return new Promise((resolve) => {
            this.throwDice = () => {
                resolve(this.dice.throw());
            };
        });
    }

    /**
     * Calculates the next game state
     * @param {Number|Object} targetCoin The input from the user, either a dice value or a value with selection row and column
     * @returns {Promise<INPUT_TYPES>} Returns the input type to be used for the next game loop.
     */
    getNextState(targetCoin) {
        const currentPlayer = this.getCurrentPlayer();
        const stateObject = getStateObject();

        if (this.state.inputType === INPUT_TYPES.DICE) {
            const playableCoins = getPlayableCoins(
                currentPlayer,
                this.playerCoins,
                this.track,
                this.dice.getDiceFace()
            );

            if (playableCoins.length) {
                stateObject.inputType = INPUT_TYPES.COIN_SELECTION;
                stateObject.hasSelection = true;
                stateObject.selection.selectableCells = playableCoins.map((coin) => {
                    return {
                        row: coin.row,
                        col: coin.col
                    };
                });
                return stateObject;
            }

            stateObject.inputType = INPUT_TYPES.DICE;
            stateObject.hasToast = true;
            stateObject.toast.message = "Sorry! No playable coins for you!";
            stateObject.toast.timeout = 2000;
            stateObject.changePlayer = true;
            return stateObject;
        }

        stateObject.inputType = INPUT_TYPES.DICE;
        stateObject.changePlayer = true;
        stateObject.hasMovement = true;
        stateObject.movement.coin = targetCoin;
        stateObject.movement.currentPosition.row = targetCoin.row;
        stateObject.movement.currentPosition.col = targetCoin.col;

        // If the target coin is still IN the starting square
        if (targetCoin.row === targetCoin.startRow && targetCoin.col === targetCoin.startCol) {
            const trackStartPosition = playerTrackStartPositions[currentPlayer];
            // Move it to the player's starting position on the track.
            stateObject.movement.nextPosition.row = trackStartPosition.row;
            stateObject.movement.nextPosition.col = trackStartPosition.col;
        } else {
            // Otherwise, get the next track segment
            const nextTrackSegment = getNextTrackSegment(
                this.track,
                getTrackIndexByLocation(this.track, targetCoin.row, targetCoin.col),
                this.dice.getDiceFace(),
                currentPlayer
            );
                // Move to the last position of the track segment.
            const lastLocation = nextTrackSegment[nextTrackSegment.length - 1];
            stateObject.movement.nextPosition.row = lastLocation.row;
            stateObject.movement.nextPosition.col = lastLocation.col;
            stateObject.movement.trackSegment = nextTrackSegment;
        }
        return stateObject;
    }

    /**
     * Sets the next game state
     * @param {Object} nextState The next state object
     */
    setNextState(nextState) {
        if (nextState.inputType === INPUT_TYPES.COIN_SELECTION) {
            disableThrowButton();
        } else {
            enableThrowButton();
        }

        if (nextState.changePlayer) {
            this.setNextPlayer();
        }

        if (nextState.hasToast) {
            showToast(nextState.toast.message, nextState.toast.timeout);
        }

        if (nextState.hasMovement) {
            nextState.movement.coin.move(nextState.movement.nextPosition.row, nextState.movement.nextPosition.col);
        }
        this.state = nextState;

        const renderOptions = getRenderOptionsObject();
        renderOptions.dice = false;
        renderOptions.board = true;
        renderOptions.coins = true;
        renderOptions.selection = nextState.hasSelection;
        renderOptions.selectionData.selectableCells = nextState.hasSelection
            ? nextState.selection.selectableCells
            : [];
        renderOptions.animateCoin = nextState.hasMovement;
        renderOptions.coinAnimationData = nextState.movement;
        return renderOptions;
    }

    /**
     * Renders the GameObjects of the game.
     * @returns {Undefined} This function doesn't return anything.
     */
    render(renderOptions) {
        return new Promise(async (resolve) => {
            if (renderOptions.dice) {
                await this.dice.render();
                resolve(true);
                return;
            }

            this.playerNameDiv.style.color = getCoinColor(this.getCurrentPlayer());
            if (renderOptions.board) {
                this.board.draw();
            }

            if (renderOptions.coins) {
                Object
                    .keys(this.playerCoins)
                    .forEach(
                        player => this.playerCoins[player]
                            .filter(coin => !(
                                renderOptions.animateCoin
                                && coin === renderOptions.coinAnimationData.coin
                            ))
                            .forEach(coin => coin.draw())
                    );
            }

            if (renderOptions.animateCoin && renderOptions.coinAnimationData.coin) {
                // Save current background to placeholder
                document.getElementById("canvasPlaceholder").setAttribute("src", getBoardCanvas().toDataURL());
                await renderOptions.coinAnimationData.coin.animateMove(
                    renderOptions.coinAnimationData.currentPosition,
                    renderOptions.coinAnimationData.nextPosition,
                    renderOptions.coinAnimationData.trackSegment,
                    this.boardCanvas.toDataURL()
                );
            }

            if (renderOptions.selection) {
                this.renderSelectionWindows(renderOptions.selectionData.selectableCells);
            }

            resolve(true);
        });
    }

    /**
     * Renders the selection window in the given cells.
     * @param {Array<Object>} cells The cells to render selection window for.
     * @returns {undefined} This function doesn't return anything.
     */
    renderSelectionWindows(cells) {
        if (!cells.length) {
            return;
        }

        const boardContext = getContext(this.boardCanvas);

        const width = getCellWidth();
        const height = getCellHeight();

        cells.forEach((cell) => {
            const left = (cell.col - 1) * width;
            const top = (cell.row - 1) * height;

            boardContext.beginPath();
            boardContext.strokeStyle = "#34AE33";
            boardContext.lineWidth = 2;
            boardContext.rect(left, top, width, height);
            boardContext.stroke();
            boardContext.closePath();
        });
    }
}
