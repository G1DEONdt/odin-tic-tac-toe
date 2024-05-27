// IIFE (Immediately Invoked Function Execution) to create gameboard
const Gameboard = (function () {
    let gameboard = [];
    
    function drawGameboard() {
        
    }
})();


// Factory function to create player
function createPlayer(token) {
    return {
        token: token
    }
}

const playerOne = createPlayer("X");
const playerTwo = createPlayer("O");