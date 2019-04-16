
/* globals document, window */
import { playerStartPositions } from "../constants";
import Coin from "./Coin";
import {
    getNextTrackSegment,
    getTrackIndexByLocation,
} from "../lib/utils";

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

export {
    generatePlayerCoins,
    getPlayableCoins
};
