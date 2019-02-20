import { CoinType } from "../constants";

const defaultGameOptions = {
    escapeOn: 6,
    playBeforeMultiDice: true,
    multiDiceAfterEating: false
};

const defaultPlayers = [CoinType.RED, CoinType.GREEN, CoinType.YELLOW, CoinType.BLUE];

export default class Game {
    constructor(players, gameOptions) {
        this.players = players || defaultPlayers;
        this.gameOptions = Object.assign({}, defaultGameOptions, gameOptions);
        this.currentPlayerIndex = 0;
    }

    /**
     * Sets the next player in order to the current player
     */
    setNextPlayer() {
        if (this.currentPlayerIndex === this.players.length - 1) {
            currentPlayerIndex = 0;
        } else {
            currentPlayerIndex++;
        }
    }

    throwDice() {
        
    }
};
