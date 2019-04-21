
/* globals document, window */
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
    listenToClick as getCoinSelection,
    getTrackIndexByLocation,
    getBoardHeight,
    getBoardWidth,
    getCoinColor
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

export default class Game {
    constructor(boardCanvas, players, gameOptions) {
        this.boardCanvas = boardCanvas;
        this.players = players || defaultPlayers;
        this.gameOptions = Object.assign({}, defaultGameOptions, gameOptions);
        this.currentPlayerIndex = 0;
        this.board = new Board(this.boardCanvas, getBoardWidth(), getBoardHeight());
        this.dice = new Dice(getDiceCanvas());
        this.playerCoins = generatePlayerCoins(this.players, boardCanvas);
        this.playableCells = [];
        this.playerNameDiv = document.querySelector("#throwDice");
        this.track = generateTrack();
        this.currentInputType = INPUT_TYPES.DICE;
        this.runLoop = true;
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
            const input = await this.getInput();
            if (this.currentInputType === INPUT_TYPES.DICE) {
                await this.dice.render();
            }
            this.currentInputType = await this.updateState(input);
            await this.render();
        }
        /* eslint-enable no-await-in-loop */
    }

    /**
     * Gets the input from the user
     * @returns {Promise<Number|Array<Object>>} This function returns a promise that resolve once the input is received from the user.
     */
    getInput() {
        if (this.currentInputType === INPUT_TYPES.DICE) {
            return this.getDiceValue();
        }
        return getCoinSelection();
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
     * Updates the current game state
     * @param {Number|Object} input The input from the user, either a dice value or a value with selection row and column
     * @returns {Promise<INPUT_TYPES>} Returns the input type to be used for the next game loop.
     */
    updateState(input) {
        return new Promise((resolve) => {
            const currentPlayer = this.getCurrentPlayer();
            this.playableCells = [];

            if (this.currentInputType === INPUT_TYPES.DICE) {
                const playableCoins = getPlayableCoins(
                    currentPlayer,
                    this.playerCoins,
                    this.track,
                    this.dice.getDiceFace()
                );

                if (playableCoins.length) {
                    // Show selectable windows
                    this.playableCells = playableCoins.map((coin) => {
                        return {
                            row: coin.row,
                            col: coin.col
                        };
                    });

                    // Remove throw button
                    disableThrowButton();
                    resolve(INPUT_TYPES.COIN_SELECTION);
                } else {
                    window.alert("Sorry! No playable coins for you!"); // eslint-disable-line no-alert
                    this.setNextPlayer();
                    resolve(INPUT_TYPES.DICE);
                }
            } else {
                const targetCoin = this.playerCoins[currentPlayer]
                    .filter(coin => coin.row === input.row && coin.col === input.col)[0];

                if (targetCoin.row === targetCoin.startRow && targetCoin.col === targetCoin.startCol) {
                    const trackStartPosition = playerTrackStartPositions[currentPlayer];
                    targetCoin.move(trackStartPosition.row, trackStartPosition.col);
                } else {
                    const nextTrackSegment = getNextTrackSegment(
                        this.track,
                        getTrackIndexByLocation(this.track, targetCoin.row, targetCoin.col),
                        this.dice.getDiceFace(),
                        currentPlayer
                    );
                    const lastLocation = nextTrackSegment.pop();
                    targetCoin.move(lastLocation.row, lastLocation.col);
                }
                this.setNextPlayer();
                enableThrowButton();
                resolve(INPUT_TYPES.DICE);
            }
        });
    }

    /**
     * Renders the GameObjects of the game.
     * @returns {Undefined} This function doesn't return anything.
     */
    render() {
        return new Promise((resolve) => {
            this.playerNameDiv.style.color = getCoinColor(this.getCurrentPlayer());
            this.board.draw();
            // this.dice.draw();
            Object
                .keys(this.playerCoins)
                .forEach(
                    player => this.playerCoins[player]
                        .forEach(coin => coin.draw())
                );
            this.renderSelectionWindows(this.playableCells);
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
