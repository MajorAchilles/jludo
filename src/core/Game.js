/* globals document */
import { CoinType, dimensions, playerStartPositions } from "../constants";
import Coin from "./Coin";
import Board from "./Board";

const defaultGameOptions = {
    escapeOn: 6,
    playBeforeMultiDice: true,
    multiDiceAfterEating: false
};

const defaultPlayers = [CoinType.RED, CoinType.GREEN, CoinType.YELLOW, CoinType.BLUE];


const generatePlayerCoins = (players, canvas) => {
    const coins = {};
    players.forEach((playerType) => {
        coins[playerType] = playerStartPositions[playerType].map(
            position => new Coin(canvas, playerType, position.row, position.col)
        );
    });
    return coins;
};

export default class Game {
    constructor(canvas, players, gameOptions) {
        this.players = players || defaultPlayers;
        this.gameOptions = Object.assign({}, defaultGameOptions, gameOptions);
        this.currentPlayerIndex = 0;
        this.board = new Board(canvas, dimensions.BOARD_WIDTH, dimensions.BOARD_HEIGHT);
        this.playerCoins = generatePlayerCoins(this.players, canvas);
        this.playerNameDiv = document.querySelector(".playerName");
    }

    /**
     * Sets the next player in order to the current player
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

    throwDice() {
        const player = this.getCurrentPlayer();
        const coins = this.playerCoins[player];
        const isAllIn = coins.every((coin, index) => {
            const startPosition = playerStartPositions[player][index];
            const location = coin.getLocation();
            return location.row === startPosition.row && location.col === startPosition.col;
        });

        console.log(isAllIn);
    };

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
        Object.keys(this.playerCoins).forEach(player => this.playerCoins[player].forEach(coin => coin.draw()));
    }
}
