let setParamsModal = document.getElementById("params");
let gameBoardModal = document.getElementById("gameBoard");
let startBtn = document.getElementById("start-button");
let setParamsBtn = document.getElementById("set-params");
let closeBoardBtn = document.getElementById("close-board");


startBtn.onclick = function(){
    setParamsModal.style.display = "flex";
    setParamsModal.style.flexDirection = "column";
    setParamsModal.style.alignItems = "center";
    setParamsModal.style.justifyContent = "center";
    gameBoardModal.style.display = "none";
}

function collectParamsData(){
    let usernameinput = document.getElementById("player1").value;
    let crossinput = document.getElementById("Cross").value;
    let noughtinput = document.getElementById("Nought").value;

    if (usernameinput == "" || crossinput == "" || noughtinput == ""){
        alert("Please fill in all fields.");
    }
    else{
        const playerData = {
            username: usernameinput,
            cross: crossinput,
            nought: noughtinput
        }
        console.log(playerData);
        localStorage.setItem("playerData", JSON.stringify(playerData));
    }
}


setParamsBtn.onclick = function(){
    collectParamsData();
    setParamsModal.style.display = "none";
    gameBoardModal.style.display = "flex";
    gameBoardModal.style.flexDirection = "column";
    gameBoardModal.style.alignItems = "center";
    gameBoardModal.style.justifyContent = "center";
}