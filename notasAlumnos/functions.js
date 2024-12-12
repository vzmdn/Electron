let table = document.getElementById('table');
let tbody = table.getElementsByTagName('tbody')[0];
let openFile = document.getElementById('btnOpenFile');
let saveFile = document.getElementById('btnSaveFile');


let filas = "";

/*for (let i = 0; i < 10; i++) {
    filas += "<tr>";
    filas += "<td>" + i + "</td>";
    filas += "<td>" + i + "</td>";
    filas += "<td>" + i + "</td>";
    filas += "</tr>";
}

tbody.innerHTML = filas;
*/
openFile.onclick = () => {
    window.electron.openFile();
};

saveFile.onclick = () => {
    window.electron.saveFile();
};

