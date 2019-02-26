
/* globals document */
import { CoinType, dimensions, playerStartPositions } from "../constants";
import Coin from "./Coin";
import Board from "./Board";
import Dice from "./Dice";
import { getDiceCanvas } from "../lib/utils";
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
    // Starting positions.
    const trackIndexes = playerCoins.map((coin) => {
        let trackIndex;
        track.some((position, index) => {
            // If we find the track index, return that value.
            if (position.row === coin.row && position.col === coin.col) {
                trackIndex = index;
                return true;
            }
            return false;
        });
        return trackIndex || -1; // If in track, return index, else, -1.
    });

    // Holds the unplayable coins, which we can use to filter out the playable only coins
    const unplayableCoins = [];

    // Every coin maps to the index value in the track
    // So, either, they are in the starting position, and hence playable, if dice value is 6.
    // Or in some track position, which we need to verify and see if the current value makes them playable.
    trackIndexes.forEach((index) => {
        // This coin is not in track and hence, is playable.
        if (index < 0 || index >= track.length) {
            return;
        }

        // Get the track data.
        const position = track[index];

        // If in terminal, cannot play that coin any more.
        if (position.isTerminal) {
            unplayableCoins.push(playerCoins[index]);
            return;
        }

        // If not in terminal, we need to figure out if the current location + dice value is a legal postion to move to.
    });

    console.log({
        player,
        coins,
        track,
        diceValue,
        trackIndexes
    });

    return [];
};

export default class Game {
    constructor(boardCanvas, players, gameOptions) {
        this.players = players || defaultPlayers;
        this.gameOptions = Object.assign({}, defaultGameOptions, gameOptions);
        this.currentPlayerIndex = 0;
        this.board = new Board(boardCanvas, dimensions.BOARD_WIDTH, dimensions.BOARD_HEIGHT);
        this.dice = new Dice(getDiceCanvas());
        this.playerCoins = generatePlayerCoins(this.players, boardCanvas);
        this.playerNameDiv = document.querySelector(".playerName");
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
        this.playerNameDiv.textContent = [
            "Current player: Player",
            this.currentPlayerIndex + 1,
            `(${this.getCurrentPlayer()})`
        ].join(" ");

        this.board.draw();
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
            // Wait for player selection
        } else {
            this.setNextPlayer();
        }
        this.render();
    }
}
