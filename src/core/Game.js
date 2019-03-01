
/* globals document, window */
import { CoinType, dimensions, playerStartPositions, playerTrackStartPositions } from "../constants";
import Coin from "./Coin";
import Board from "./Board";
import Dice from "./Dice";
import { getDiceCanvas, getNextTrackSegment, getContext, getCellHeight, getCellWidth, disableThrowButton, addClickHandler, enableThrowButton, getClickLocation, listenToClick, getTrackIndexByLocation } from "../lib/utils";
import { generateTrack } from "../state";

const defaultGameOptions = {
    escapeOn: 6,
    playBeforeMultiDice: true,
    multiDiceAfterEating: false
};

const defaultPlayers = [CoinType.RED, CoinType.GREEN, CoinType.YELLOW, CoinType.BLUE];

/**
 * This function generates the coins for the players with the appropriate starting position
 * @param {Array<String>} players The players for the game in-order of play.
 * @param {HTMLCanvasElement} canvas The current rendering canvas
 * @returns {Object} An object containing the coins for each given player
 */
const generatePlayerCoins = (players, canvas) => {
    const coins = {};
    players.forEach((playerType) => {
        coins[playerType] = playerStartPositions[playerType].map(
            position => new Coin(canvas, playerType, position.row, position.col)
        );
    });
    return coins;
};

/**
 * This returns the coins available for play.
 * @param {String} player The current player.
 * @param {Object} coins The coins on the board.
 * @param {Array<Object>} track The track for the coins.
 * @param {Number} diceValue The current dice value.
 */
const getPlayableCoins = (player, coins, track, diceValue) => {
    // Not in terminal tracks
    const playerCoins = coins[player];

    // Returns the indexes of the coins IF they are in the track. If not in track the only legal location for them is the
    // Starting positions inside the start box, given dice value is 6.
    const trackIndexes = playerCoins.map(coin => getTrackIndexByLocation(track, coin.row, coin.col));

    // Holds the unplayable coins, which we can use to filter out the playable only coins
    const unplayableCoins = [];

    // Every coin maps to the index value in the track
    // So, either, they are in the starting position, and hence playable, if dice value is 6.
    // Or in some track position, which we need to verify and see if the current value makes them playable.
    trackIndexes.forEach((trackIndex, index) => {
        const currentCoin = playerCoins[index];
        // This coin is not in track and hence, is playable.
        if (trackIndex < 0 || trackIndex >= track.length) {
            if (diceValue !== 6) {
                unplayableCoins.push(currentCoin);
            }
            return;
        }

        // Get the track data.
        const position = track[trackIndex];

        // If in terminal, cannot play that coin any more.
        if (position.isTerminal) {
            unplayableCoins.push(currentCoin);
            return;
        }

        // If not in terminal, we need to figure out if the current location + dice value is a legal postion to move to.
        const nextTrackSegment = getNextTrackSegment(track, trackIndex, diceValue, player);
        if (!nextTrackSegment.length) {
            unplayableCoins.push(currentCoin);
        }
    });

    return playerCoins.filter((coin) => {
        return unplayableCoins.indexOf(coin) === -1;
    });
};

export default class Game {
    constructor(boardCanvas, players, gameOptions) {
        this.boardCanvas = boardCanvas;
        this.players = players || defaultPlayers;
        this.gameOptions = Object.assign({}, defaultGameOptions, gameOptions);
        this.currentPlayerIndex = 0;
        this.board = new Board(this.boardCanvas, dimensions.BOARD_WIDTH, dimensions.BOARD_HEIGHT);
        this.dice = new Dice(getDiceCanvas());
        this.playerCoins = generatePlayerCoins(this.players, boardCanvas);
        this.playerNameDiv = document.querySelector(".playerName");
        this.track = generateTrack();
        this.reRenderBoard = true;
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
    render(reRenderBoard = true) {
        this.playerNameDiv.textContent = [
            "Current player: Player",
            this.currentPlayerIndex + 1,
            `(${this.getCurrentPlayer()})`
        ].join(" ");

        if (reRenderBoard) {
            this.board.draw();
        }
        this.dice.draw();
        Object.keys(this.playerCoins).forEach(player => this.playerCoins[player].forEach(coin => coin.draw()));
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
            // this.render(false);

            // Remove throw button
            disableThrowButton();
            listenToClick().then((location) => {
                console.log(location);
                const targetCoin = this.playerCoins[currentPlayer].filter(coin => coin.row === location.row && coin.col === location.col)[0];
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
                this.reRenderBoard = true;
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
