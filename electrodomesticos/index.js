const electrodomesticos = require('./file/electrodomesticos2.json');
let opciones = document.getElementById("opciones");
let tabla = document.getElementById("caracteristicas");
let lista = "";

for (let i = 0; i < electrodomesticos.length; i++) {
    let nombre = electrodomesticos[i].nombre;
    lista += `<option value="${i}">${nombre}</option>`;
}
opciones.innerHTML = lista;
rellenarTabla(0);
rellenarTotales();

opciones.addEventListener("change", function (event) {
    const seleccionado = event.target.value;
    rellenarTabla(seleccionado);
});

function rellenarTabla(index) {
    const articulo = electrodomesticos[index]; // Obtener el objeto correspondiente

    // Limpiar la tabla antes de llenarla
    tabla.innerHTML = "";

    // Llenar la tabla con las propiedades del artículo
    let fila = crearFila("Descripción:", articulo.nombre);
    tabla.appendChild(fila);
    fila = crearFila("Precio coste:", articulo.precioCoste);
    tabla.appendChild(fila);
    fila = crearFila("Precio venta:", articulo.precioVenta);
    tabla.appendChild(fila);
    fila = crearFila("Stock actual:", articulo.stockActual); // Corrected stockActual
    tabla.appendChild(fila);
    fila = crearFila("Stock mínimo:", articulo.stockMin);
    tabla.appendChild(fila);
}

function crearFila(caracteristica, valor) {
    const fila = document.createElement("tr");
    const c = document.createElement("td");
    c.textContent = caracteristica;
    const v = document.createElement("td");
    v.textContent = valor;
    fila.appendChild(c);
    fila.appendChild(v);
    return fila;
}

function rellenarTotales(){
    let totales = document.getElementById("totales");
    let totalProductos = 0;
    let stockAnual = 0;
    let deficitStock = [];
    for(let i = 0; i<electrodomesticos.length;i++){
        totalProductos++;
        stockAnual += electrodomesticos[i].stockActual;
        if((electrodomesticos[i].stockActual < electrodomesticos[i].stockMin))
            deficitStock.push(electrodomesticos[i].nombre);
    }
    deficitElect = "";
    for(let i = 0; i < deficitStock.length; i++){
        deficitElect += `<li>${deficitStock[i]}</li>`
    }


    totalesTexto =
        `<ul>
            <li>Total Productos: ${totalProductos}</li>
            <li>Total Stock Anual: ${stockAnual}</li>
            <li>Productos con stock por debajo del mínimo:</li>
                <ol>${deficitElect}</ol>                
        </ul>`

    totales.innerHTML = totalesTexto;
}
