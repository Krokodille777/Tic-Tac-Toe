let setParamsModal = document.getElementById("params");
let gameBoardModal = document.getElementById("gameBoard");
let startBtn = document.getElementById("start-button");
let setParamsBtn = document.getElementById("set-params");
let closeBoardBtn = document.getElementById("close-board");


 
let currentTurn = "X";
let playerSide = "X";
let botSide = "O";
let gameActive = false;
let cells = new Array(9).fill(null);

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

startBtn.onclick = function(){
    setParamsModal.style.display = "flex";
    setParamsModal.style.flexDirection = "column";
    setParamsModal.style.alignItems = "center";
    setParamsModal.style.justifyContent = "center";
    gameBoardModal.style.display = "none";
}

function collectParamsData(){
    let usernameinput = document.getElementById("player1").value;

    const playerData = {
        username: usernameinput,
    };
    
    localStorage.setItem("playerData", JSON.stringify(playerData));
    return playerData;
}

function drawGameBoard(){
    let gameBoardCanvas = document.getElementById("ticTacToeCanvas");
    let context = gameBoardCanvas.getContext("2d");
   
    context.clearRect(0, 0, gameBoardCanvas.width, gameBoardCanvas.height);
    
    context.beginPath();
    context.moveTo(100, 0);
    context.lineTo(100, 300);
    context.moveTo(200, 0);
    context.lineTo(200, 300);
    
    context.moveTo(0, 100);
    context.lineTo(300, 100);
    context.moveTo(0, 200);
    context.lineTo(300, 200);
    context.strokeStyle = "#000000";
    context.lineWidth = 5;
    context.stroke();
}

function closeGameBoard(){
    gameBoardModal.style.display = "none";
    startBtn.style.display = "block";
    gameActive = false; 
}

closeBoardBtn.onclick = function(){
    closeGameBoard();
}

setParamsBtn.onclick = function(){
    collectParamsData();
    setParamsModal.style.display = "none";
    startBtn.style.display = "none";
    
    gameBoardModal.style.display = "flex";
    gameBoardModal.style.flexDirection = "column";
    gameBoardModal.style.alignItems = "center";
    gameBoardModal.style.justifyContent = "center";
    
    resetGame(); 
}

function drawACross(x, y){
    let gameBoardCanvas = document.getElementById("ticTacToeCanvas");
    let context = gameBoardCanvas.getContext("2d");
    context.beginPath();
    context.moveTo(x + 20, y + 20);
    context.lineTo(x + 80, y + 80);
    context.moveTo(x + 80, y + 20);
    context.lineTo(x + 20, y + 80);
    context.strokeStyle = "#FF0000";
    context.lineWidth = 5;
    context.stroke();
}

function drawANought(x, y){
    let gameBoardCanvas = document.getElementById("ticTacToeCanvas");
    let context = gameBoardCanvas.getContext("2d");
    context.beginPath();
    context.arc(x + 50, y + 50, 30, 0, 2 * Math.PI);
    context.strokeStyle = "#0000FF";
    context.lineWidth = 5;
    context.stroke();
}

document.getElementById("ticTacToeCanvas").addEventListener("click", function(event){
    if (!gameActive || currentTurn !== playerSide) return;

    let rect = event.target.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;

    let col = Math.floor(x / 100); 
    let row = Math.floor(y / 100);
    let cellIndex = row * 3 + col;

    if (cells[cellIndex] !== null) return;

    let drawX = col * 100;
    let drawY = row * 100;

    if (playerSide === "X") {
        drawACross(drawX, drawY);
    } else {
        drawANought(drawX, drawY);
    }
    
    cells[cellIndex] = playerSide;
    
    checkResult();
    
    currentTurn = botSide;
});

function opponentMove(){
    if (!gameActive) return;

    let emptyCells = [];
    for (let i = 0; i < cells.length; i++){
        if (cells[i] === null){
            emptyCells.push(i);
        }
    }

    if (emptyCells.length === 0) return;

    let randomIndex = Math.floor(Math.random() * emptyCells.length);
    let cellIndex = emptyCells[randomIndex];
    
    let col = cellIndex % 3;
    let row = Math.floor(cellIndex / 3);
    
    let drawX = col * 100; 
    let drawY = row * 100;
    
    if (botSide === "X") {
        drawACross(drawX, drawY);
    } else {
        drawANought(drawX, drawY);
    }
    
    cells[cellIndex] = botSide;
    
    checkResult();
    currentTurn = playerSide; 
}

function checkResult() {
    let roundWon = false;
    let winner = null;

    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = cells[winCondition[0]];
        let b = cells[winCondition[1]];
        let c = cells[winCondition[2]];

        if (a === null || b === null || c === null) continue;
        if (a === b && b === c) {
            roundWon = true;
            winner = a;
            break;
        }
    }

    if (roundWon) {
        gameActive = false;
     
        setTimeout(() => {
            alert(winner === "X" ? "Победили Крестики!" : "Победили Нолики!");
            swapSides();
            resetGame();
        }, 100);
        return;
    }

    if (!cells.includes(null)) {
        gameActive = false;
        setTimeout(() => {
            alert("Ничья!");
            swapSides();
            resetGame();
        }, 100);
        return;
    }
}

function swapSides(){
    if (playerSide === "X"){
        playerSide = "O";
        botSide = "X";
        alert("You are now Noughts (O)");
    }
    else{
        playerSide = "X";
        botSide = "O";
        alert("You are now Crosses (X)");
    }
}

function resetGame(){
    cells.fill(null);        
    gameActive = true;       
    currentTurn = "X";       
    
    drawGameBoard();        
}


setInterval(function(){
   
    if (gameActive && currentTurn === botSide){
        opponentMove();
    }
}, 1000);