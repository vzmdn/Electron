let table = document.getElementById('table');
let tbody = table.getElementsByTagName('tbody')[0];
let openFile = document.getElementById('btnOpenFile');
let saveFile = document.getElementById('btnSaveFile');
let datos;

openFile.onclick = async () => {
    datos = await window.electron.openFile();
    rellenarTabla(datos);
};

saveFile.onclick = async () => {
    let result = await window.electron.saveFile(datos);
    console.log('result al guardar', result);
    console.log('datos al guardar:', datos);
};

function addEventListeners() {
    let filas = tbody.getElementsByTagName('tr');
    for (let i = 0; i < filas.length; i++) {
        let celdaGrupo = document.getElementById(`grupo${i}`);
        let celdaNombre = document.getElementById(`nombre${i}`);
        let celdaNota = document.getElementById(`nota${i}`);

        celdaGrupo.contentEditable = true;
        celdaNombre.contentEditable = true;
        celdaNota.contentEditable = true;

        celdaGrupo.addEventListener('blur', () => {
            datos[i].grupo = celdaGrupo.innerText;
        });

        celdaNombre.addEventListener('blur', () => {
            datos[i].nombre = celdaNombre.innerText;
        });

        celdaNota.addEventListener('blur', () => {
            datos[i].nota = celdaNota.innerText;
        });
    }
    console.log('datos al añadir eventos:', datos);
}

function rellenarTabla(datos) {
    let filas = "";
    for (let i = 0; i < datos.length; i++) {
        filas += `<tr id=tr${i}>`;
        filas += `<td id=grupo${i}>${datos[i].grupo}</td>`;
        filas += `<td id=nombre${i}>${datos[i].nombre}</td>`;
        filas += `<td id=nota${i}>${datos[i].nota}</td>`;
        filas += "</tr>";
    }
    tbody.innerHTML = filas
    addEventListeners();
    console.log('datos al rellenar:', datos);
}