const datos = require('./datos.json');
let editando = false; //variable que me dirá si estoy editando una fila
//FUNCIONES QUE COLOCAN EVENTOS
//1. función eventos span editar
const eventosSpanEditar = (i) => {
    document.getElementById(`spanEditar${i}`).addEventListener('click', () => {
        console.log(i);
        if (editando == false) {
            //cambiar los tr${i} a editables
            document.getElementById(`tr${i}`).innerHTML = `
    <td><input type="text" id="alimento" value="${datos[i].Alimento}" size="10"></td>
    <td><input type="text" id="calorias" value="${datos[i].Calorias}" size="5"></td>
    <td><input type="text" id="grasas" value="${datos[i].Grasas}" size="5"></td>
    <td><input type="text" name="proteina" id="proteina" value="${datos[i].Proteina}" size="5"></td>
    <td><input type="text" name="carbohidratos" id="carbohidratos" value="${datos[i].Carbohidratos}" size="
    5"></td>
    <td>En Edición/<span class="editar" id="spanGuardar${i}">Guardar</span></td>
    `;
            //como construido el spanGuardar debo ponerle su evento otra vez:
            eventosSpanGuardar(i);
            editando = true;
        } else {
            alert("Sólo se puede editar de uno en uno");
        }
    });
}

//2. función eventos span guardar
const eventosSpanGuardar = (i) => {
    document.getElementById(`spanGuardar${i}`).addEventListener('click', () => {
        if (editando == true) {
            //guardo los datos en el array
            datos[i].Alimento = document.getElementById("alimento").value;
            datos[i].Calorias = document.getElementById("calorias").value;
            datos[i].Grasas = document.getElementById("grasas").value;
            datos[i].Proteina = document.getElementById("proteina").value;
            datos[i].Carbohidratos = document.getElementById("carbohidratos").value;
            //cambiar los tr${i} a no editables
            document.getElementById(`tr${i}`).innerHTML = `
    <td>${datos[i].Alimento}</td>
    <td>${datos[i].Calorias}</td>
    <td>${datos[i].Grasas}</td>
    <td>${datos[i].Proteina}</td>
    <td>${datos[i].Carbohidratos}</td>
    <td><span class="editar" id="spanEditar${i}">Editar</span></td>
    `;
            //como he reconstruido el spanEditar debo ponerle su evento otra vez:
            eventosSpanEditar(i);
            editando = false;
            guardarDatosEnJson();
        } else {
            dialog.showErrorBox("ERROR", "Debería ser imposible llegar aquí");
        }
    });
    
}

//CONSTRUIR DOM DE LA TABLA
let ctabla = document.getElementById("ctabla");
let filas = "";
// recorro los datos
for (let i = 0; i < datos.length; i++) {
    filas += `
<tr id="tr${i}">
<td>${datos[i].Alimento}</td>
<td>${datos[i].Calorias}</td>
<td>${datos[i].Grasas}</td>
<td>${datos[i].Proteina}</td>
<td>${datos[i].Carbohidratos}</td>
<td><span class="editar" id="spanEditar${i}">Editar</span></td>
</tr> `;
}
ctabla.innerHTML = filas;
//una vez construido el DOM de la tabla, pongo los eventos de spanEditar:
for (let i = 0; i < datos.length; i++) {
    eventosSpanEditar(i);
}

function guardarDatosEnJson(){
    const fs = require('fs');
    fs.writeFileSync('./datos.json', JSON.stringify(datos));
}