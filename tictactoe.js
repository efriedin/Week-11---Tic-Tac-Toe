//storing game status element
const statusDisplay = document.querySelector('.game--status');

//to pause the game
let gameActive = true;

//to track the current player
let currentPlayer ='X';

//store current game state
let gameState = ['', '', '', '', '', '', '', '', '']; 

//messages to display during the game
const winningMessage = () => `Player ${currentPlayer} has won!`
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

//set initial message to let players know whose turn it is
statusDisplay.innerHTML = currentPlayerTurn();

//set winnning conditions
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

function handleCellPlayed(clickedCell, clickedCellIndex) {
    //update internal game state and user interface
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}


function handleResultValidation() {
    let roundWon = false;
    //check each one and check whether the elements of our array  under those index's match to declare winner or keep game going
    for (let i = 0; i <= 7; i++) {  
        const winCondition = winningConditions[i]; 
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }
    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }

    //check for values still not populated with a player sign
    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    //continue if no one has won the game by changing handlePlayerChange
    handlePlayerChange();
}

function handleCellClick(clickedCellEvent) {
    //store clicked html element 
    const clickedCell = clickedCellEvent.target;
    //grab data-cell-index and return string
    const clickedCellIndex = parseInt (
        clickedCell.getAttribute('data-cell-index')
    );
    //check if cell has been clicked or game has been paused
    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }
    //proceeding with game play
    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

//sets variables back to their defaults
function handleResartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ['', '', '', '', '', '', '', '', ''];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}

//add event listeners to game cells and restart button
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleResartGame);