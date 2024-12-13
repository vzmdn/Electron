let table = document.getElementById('table');
let tbody = table.getElementsByTagName('tbody')[0];
let openFile = document.getElementById('btnOpenFile');
let saveFile = document.getElementById('btnSaveFile');
let jsonData = null;

openFile.onclick = async () => {
    const datos = await window.electron.openFile();
    let filas = "";
    for (let i = 0; i < datos.length; i++) {
        filas += "<tr>";
        filas += `<td>${datos[i].grupo}</td>`;
        filas += `<td>${datos[i].nombre}</td>`;
        filas += `<td>${datos[i].nota}</td>`;
        filas += "</tr>";
    }
    tbody.innerHTML = filas
    
};

saveFile.onclick = async () => {
    let result = await window.electron.saveFile();
    console.log(result);
};