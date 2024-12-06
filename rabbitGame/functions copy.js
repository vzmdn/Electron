let table = document.getElementById("table");
let tries = 0;
let rowsNum = 17;
let rabbitCell;
let rabbitCellId;
let difficulty = 3; //lower -> harder
let currentArrows = [];
let slider = document.getElementById("slider");

startGame();

slider.addEventListener("input", (event) => {
    rowsNum = event.target.value;
    startGame();
});

function startGame() {
    tries = 0;
    document.getElementById("tries").innerHTML = `Tries: ${tries}`;
    createCells();
    startCells();
}

function createCells() {
    let rows = "";
    let cells = 0;
    for (let i = 0; i < rowsNum; i++) {
        rows += `<tr id=tr${i}>`;
        for (let n = 0; n < rowsNum; n++) {
            rows += `<td id=td${cells}></td>`;
            cells++;
        }
        rows += `</tr>`;
    }
    table.innerHTML = rows;
}

function startCells() {
    rabbitCellId = Math.floor(Math.random() * rowsNum * rowsNum);
    rabbitCell = document.getElementById(`td${rabbitCellId}`);

    for (let i = 0; i < rowsNum * rowsNum; i++) {
        let td = document.getElementById(`td${i}`);
        let row = Math.floor(i / rowsNum);
        let col = i % rowsNum;
        let color = (row + col) % 2 === 0 ? "rgb(170,215,81)" : "rgb(162,209,73)";
        td.style.backgroundColor = color;

        let tdId = td.id.slice(2);
        if (tdId == rabbitCellId) {
            td.innerHTML = "🐰";
            td.addEventListener("click", rabbitFound);
        } else {
            td.addEventListener("click", normalCell);
        }
    }
}

function normalCell(event) {
    let td = event.currentTarget;
    let tdId = parseInt(td.id.slice(2));
    let mcId = rabbitCellId;

    let tdTens = Math.floor(tdId / rowsNum);
    let tdUnits = tdId % rowsNum;
    let mcTens = Math.floor(mcId / rowsNum);
    let mcUnits = mcId % rowsNum;
    
    if (tdId == rabbitCellId) {
        gameOver();
    }
    rabbitCellMoves(td);

    if (tdTens === mcTens) {
        if (tdId > mcId) td.innerHTML = "⬅️";
        else td.innerHTML = "➡️";
    }
    if (tdUnits === mcUnits) {
        if (tdId > mcId) td.innerHTML = "⬆️";
        else td.innerHTML = "⬇️";
    }
    if (tdTens > mcTens) {
        if (tdUnits > mcUnits) td.innerHTML = "↖️";
        if (tdUnits < mcUnits) td.innerHTML = "↗️";
    }
    if (tdTens < mcTens) {
        if (tdUnits < mcUnits) td.innerHTML = "↘️";
        if (tdUnits > mcUnits) td.innerHTML = "↙️";
    }

    if (!currentArrows.includes(tdId)) {
        currentArrows.push(tdId);
        tries++;
        document.getElementById("tries").innerHTML = `Tries: ${tries}`;
    }

    if (currentArrows.length > difficulty) {
        let lastCell = document.getElementById(`td${currentArrows[0]}`);
        lastCell.innerHTML = "";
        currentArrows.shift();
    }

}

function rabbitCellMoves() {
    let currentRabbitCell = document.getElementById(`td${rabbitCellId}`);
    currentRabbitCell.innerHTML = "";
    currentRabbitCell.removeEventListener("click", rabbitFound);
    currentRabbitCell.addEventListener("click", normalCell);
    let newRabbitCellId;
    let direction = Math.floor(Math.random() * 8);
    switch (direction) {
        case 0:
            //↖️
            newRabbitCellId = rabbitCellId - rowsNum - 1;
            break;
        case 1:
            //⬆️
            newRabbitCellId = rabbitCellId - rowsNum;
            break;
        case 2:
            //↗️
            newRabbitCellId = rabbitCellId - rowsNum + 1;
            break;
        case 3:
            //⬅️
            newRabbitCellId = rabbitCellId - 1;
            break;
        case 4:
            //➡️
            newRabbitCellId = rabbitCellId + 1;
            break;
        case 5:
            //↙️
            newRabbitCellId = rabbitCellId + rowsNum - 1;
            break;
        case 6:
            //⬇️
            newRabbitCellId = rabbitCellId + rowsNum;
            break;
        case 7:
            //↘️
            newRabbitCellId = rabbitCellId + rowsNum + 1;
            break;
    }
    console.log(`newRabbitCellId: ${newRabbitCellId}`);
    if (newRabbitCellId >= 0 && newRabbitCellId < rowsNum * rowsNum) {
        rabbitCellId = newRabbitCellId;
        let newRabbitCell = document.getElementById(`td${rabbitCellId}`);
        if (newRabbitCell) {
            newRabbitCell.innerHTML = "🐰";
            newRabbitCell.addEventListener("click", rabbitFound);
        }
    }
}

function rabbitFound() {
}

function gameOver() {
    alert("Game Over");
    startGame();
}







