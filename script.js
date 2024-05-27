function createPlayer(name, token, score) {
    if (name == "") {
        name = `Player ${token}`;
    }
    return { name, token, score}
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
    startGame: function() {
        this.createPlayers();
        DisplayController.init();
    },
    createPlayers: function() {
        this.player1 = createPlayer(document.querySelector("#player1").value, "X", 0);
        this.player2 = createPlayer(document.querySelector("#player2").value, "O", 0);
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
            DisplayController.displayResult(this.getCurrentPlayer().name);
            this.incrementScore(this.getCurrentPlayer());
            DisplayController.updateScore();
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
    incrementScore: function(player) {
        player.score++
    },
    resetGameboard: function() {
        this.gameboard = Array(9).fill(null);
        this.turnCount = 0;
        DisplayController.reset();
    }
}


const DisplayController = {
    start: document.querySelector(".start-container"),
    result: document.querySelector(".result-container"),
    resultText: document.querySelector(".result-output"),
    items: document.querySelectorAll(".grid-item"),
    selector: document.querySelector(".selector-token"),
    score1: document.querySelector(".score1"),
    score2: document.querySelector(".score2"),
    init: function () {
        this.start.classList.remove("active");
        this.selector.innerHTML = `${Gameboard.getCurrentPlayer().token}`;
    },
    render: function (square) {
        this.items[square].innerHTML = `${Gameboard.getCurrentPlayer().token}`;
        this.selector.innerHTML = `${Gameboard.getNextPlayer().token}`;
    },
    updateScore: function () {
        this.score1.innerHTML = `X : ${Gameboard.player1.score}`;
        this.score2.innerHTML = `O: ${Gameboard.player2.score}`;
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
            this.resultText.innerHTML = `${winner} wins!`;
        }
    },
    playAgain: function () {
        this.result.classList.remove("active");
        Gameboard.resetGameboard();
    }
}

