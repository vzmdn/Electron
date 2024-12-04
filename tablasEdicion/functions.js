const datos = require('datos.json');
const { dialog } = require('electron').remote;
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
<td>${datos[i].Carbohidratos}</td><td></td>
</tr> `;
}
ctabla.innerHTML = filas;