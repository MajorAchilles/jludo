
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
    listenToClick,
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
     * @inheritdoc
     */
    render() {
        this.playerNameDiv.style.color = getCoinColor(this.getCurrentPlayer());
        this.board.draw();
        this.dice.draw();
        Object
            .keys(this.playerCoins).
            forEach(
                player => this.playerCoins[player]
                    .forEach(coin => coin.draw())
            );
    }

    /**
     * Throws the dice
     * @returns {undefined} This function doesn't return anything.
     */
    throwDice() {
        const currentPlayer = this.getCurrentPlayer();
        this.dice.throw();
        this.render();

        const playableCoins = getPlayableCoins(currentPlayer, this.playerCoins, this.track, this.dice.getDiceFace());

        if (playableCoins.length) {
            // Show selectable windows
            this.renderSelectionWindows(playableCoins.map((coin) => {
                return {
                    row: coin.row,
                    col: coin.col
                };
            }));

            // Remove throw button
            disableThrowButton();
            listenToClick().then((location) => {
                const targetCoin = this.playerCoins[currentPlayer]
                    .filter(coin => coin.row === location.row && coin.col === location.col)[0];

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
                this.render();
            });
        } else {
            window.alert("Sorry! No playable coins for you!"); // eslint-disable-line no-alert
            this.setNextPlayer();
            this.render();
        }
    }

    /**
     * Renders the selection window in the given cells.
     * @param {Array<Object>} cells The cells to render selection window for.
     * @returns {undefined} This function doesn't return anything.
     */
    renderSelectionWindows(cells) {
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
