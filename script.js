function createPlayer(token) {
    return { token }
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
        this.createPlayers();
        DisplayController.init();
    },
    createPlayers: function() {
        this.player1 = createPlayer("X");
        this.player2 = createPlayer("O");
    },
    getCurrentPlayer: function () {
        if (this.turnCount % 2 == 0) {
            return this.player1;
        } else {
            return this.player2;
        }
    },
    getNextPlayer: function () {
        if (this.turnCount % 2 == 0){
            return this.player2;
        } else {
            return this.player1;
        }
    },
    validatePosition: function (square) {
        if (this.gameboard[square] === null) {
            this.placeToken(square);
        }
    },
    placeToken: function (square) {
        this.gameboard[square] = this.getCurrentPlayer().token;
        DisplayController.render(square);
        this.checkWin();
    },
    checkWin: function() {
        if (this.evaluateWinSequence()){ 
            DisplayController.displayResult(this.getCurrentPlayer().token);
        } else if (this.turnCount < 8) {
            this.turnCount++;
        } else {
            alert("DRAW!");
        }
    },
    evaluateWinSequence: function () {
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
    resetGameboard: function() {
        this.gameboard = Array(9).fill(null);
        this.turnCount = 0;
        DisplayController.reset();
    }
}


const DisplayController = {
    result: document.querySelector(".result-container"),
    resultText: document.querySelector(".result-output"),
    items: document.querySelectorAll(".grid-item"),
    selector: document.querySelector(".selector-token"),
    init: function () {
        this.selector.innerHTML = `${Gameboard.getCurrentPlayer().token}`;
    },
    render: function (square) {
        this.items[square].innerHTML = `${Gameboard.getCurrentPlayer().token}`;
        this.selector.innerHTML = `${Gameboard.getNextPlayer().token}`;
    },
    reset: function () {
        for (i in this.items) {
            this.items[i].innerHTML = "";
        }
    },
    displayResult: function (winner) {
        this.result.classList.add("active");
        if (winner === undefined){
            this.resultText.innerHTML = `Draw!`;
        } else {
            this.resultText.innerHTML = `Player ${winner} wins!`;
        }
    },
    playAgain: function () {
        this.result.classList.remove("active");
        Gameboard.resetGameboard();
    }
}

Gameboard.init();

