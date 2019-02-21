import { CoinType, dimensions } from "../constants";
import Coin from "./Coin";
import Board from "./Board";

const defaultGameOptions = {
    escapeOn: 6,
    playBeforeMultiDice: true,
    multiDiceAfterEating: false
};

const defaultPlayers = [CoinType.RED, CoinType.GREEN, CoinType.YELLOW, CoinType.BLUE];

const playerStartPositions = {
    [CoinType.RED]: { row: 4, col: 4 },
    [CoinType.GREEN]: { row: 4, col: 13 },
    [CoinType.YELLOW]: { row: 13, col: 13 },
    [CoinType.BLUE]: { row: 13, col: 4 }
};

const playerTrackStartPositions = {
    [CoinType.RED]: { row: 8, col: 3 },
    [CoinType.GREEN]: { row: 3, col: 10 },
    [CoinType.YELLOW]: { row: 10, col: 15 },
    [CoinType.BLUE]: { row: 15, col: 8 }
};

const generatePlayerCoins = (players, canvas) => {
    const coins = {};
    players.forEach((playerType) => {
        const {
            row,
            col
        } = playerStartPositions[playerType];

        coins[playerType] = [
            new Coin(canvas, playerType, row, col),
            new Coin(canvas, playerType, row, col + 1),
            new Coin(canvas, playerType, row + 1, col),
            new Coin(canvas, playerType, row + 1, col + 1)
        ];
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

    render() {
        this.board.draw();
        Object.keys(this.playerCoins).forEach(player => this.playerCoins[player].forEach(coin => coin.draw()));
    }
}
