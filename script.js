function createPlayer(token) {
    return { 
        token: token}
}

const Gameboard = {
    gameboard: Array(9).fill(null),
    turnCount: 0,
    winCominbations: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ],
    init: function() {
        this.welcome();
        this.createPlayers();
        this.playerTurn();
    },
    welcome: function () {
        console.log("Welcome to Tic-Tac-Toe! Player X will move first!");
    },
    createPlayers: function() {
        this.player1 = createPlayer("X");
        this.player2 = createPlayer("O");
    },
    playerTurn: function() {
        console.log(`It is ${this.getCurrentPlayer().token}'s Turn. Choose your square.`);
        this.placeToken(prompt("Which square?"));
    },
    validatePosition: function (square) {
        if (this.gameboard[square] === null) {
            this.placeToken(square);
        } else {
            console.log("That square is already taken! That's cheating! Try again.");
            this.playerTurn();
        }
    },
    placeToken: function (square) {
        this.gameboard[square] = this.getCurrentPlayer().token;
        this.render();
        if (this.checkWin()){ 
            console.log(`${this.getCurrentPlayer().token} Wins!`);
        } else if (this.turnCount < 8) {
            this.turnCount++;
            this.playerTurn();
        } else {
            console.log("DRAW!");
        }
    },
    getCurrentPlayer: function () {
        if (this.turnCount % 2 == 0) {
            return this.player1;
        } else {
            return this.player2;
        }
    },
    checkWin: function() {
        for (let combination in this.winCominbations){
            let currentSequence = [];
            for (i = 0; i < 3; i++){
                currentSequence.push(this.gameboard[this.winCominbations[combination][i]]);
            }
            if (currentSequence[0] != null) {
                if (currentSequence[0] == currentSequence[1] && currentSequence[0] == currentSequence[2]){
                    return true;
                }
            }
            currentSequence = [];
        } return false;
    },
    render: function() {
        console.log(`${this.gameboard[0]} | ${this.gameboard[1]} | ${this.gameboard[2]}`);
        console.log(`${this.gameboard[3]} | ${this.gameboard[4]} | ${this.gameboard[5]}`);
        console.log(`${this.gameboard[6]} | ${this.gameboard[7]} | ${this.gameboard[8]}`);
    }
}

Gameboard.init();
