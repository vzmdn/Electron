let electrodomesticos = require('./file/electrodomesticos.json');
let opciones = document.getElementById("opciones");
let introducirProducto = document.getElementById("introducirProducto");
let eliminarProducto = document.getElementById("eliminarProducto");
let generarLista = document.getElementById("generarLista");

rellenarLista();
rellenarTabla(0);
rellenarTotales();

generarLista.addEventListener("click", function () {
    sinNombre.style.display = "none";
    sinProductos.style.display = "none";
    electrodomesticos = require('./file/listaCompleta.json');
    let electrodomesticos2 = [];
    for (let i = 0; i < 5; i++) {
        const n = Math.floor(Math.random() * electrodomesticos.length);
        electrodomesticos2.push(electrodomesticos[n]);
    }
    electrodomesticos = electrodomesticos2;
    rellenarLista();
    rellenarTabla(0);
    rellenarTotales();
    actualizarJSON();

})

eliminarProducto.addEventListener("click", function () {
    sinNombre.style.display = "none";
    electrodomesticos = require('./file/electrodomesticos.json');
    if (electrodomesticos.length <= 1) {
        const sinProductos = document.getElementById("sinProductos");
        sinProductos.style.display = "inline";
        return;
    }
    electrodomesticos.splice(opciones.value, 1);
    sinProductos.style.display = "none";
    rellenarLista();
    rellenarTabla(0);
    rellenarTotales();
    actualizarJSON();

})

introducirProducto.addEventListener("click", function () {
    sinProductos.style.display = "none";
    const sinNombre = document.getElementById("sinNombre");
    const nombre = document.getElementById("input-Descripción:").value;
    const precioCoste = document.getElementById("input-Precio coste:").value;
    const precioVenta = document.getElementById("input-Precio venta:").value;
    const stockActual = document.getElementById("input-Stock actual:").value;
    const stockMin = document.getElementById("input-Stock mínimo:").value;
    if (nombre.trim() === "") {
        sinNombre.style.display = "inline";
        return;
    }
    producto = {
        nombre: nombre,
        precioCoste: precioCoste,
        precioVenta: precioVenta,
        stockActual: stockActual,
        stockMin: stockMin
    }
    electrodomesticos.push(producto);
    sinNombre.style.display = "none";
    rellenarLista();
    rellenarTabla(electrodomesticos.length-1);
    rellenarTotales();
    actualizarJSON();
})

opciones.addEventListener("change", function (event) {
    const seleccionado = event.target.value;
    rellenarTabla(seleccionado);
});

function actualizarJSON() {
    const fs = require('fs');
    fs.writeFileSync('./file/electrodomesticos.json', JSON.stringify(electrodomesticos));
    electrodomesticos = require('./file/electrodomesticos.json');
}

function rellenarLista() {
    opciones.innerHTML = "";
    let lista = "";
    for (let i = 0; i < electrodomesticos.length; i++) {
        let nombre = electrodomesticos[i].nombre;
        lista += `<option value="${i}">${nombre}</option>`;
    }
    opciones.innerHTML = lista;
}

function rellenarTabla(index) {
    let tabla = document.getElementById("caracteristicas");
    const articulo = electrodomesticos[index];
    tabla.innerHTML = "";

    let fila = crearFila("Descripción:", articulo.nombre);
    tabla.appendChild(fila);
    fila = crearFila("Precio coste:", articulo.precioCoste);
    tabla.appendChild(fila);
    fila = crearFila("Precio venta:", articulo.precioVenta);
    tabla.appendChild(fila);
    fila = crearFila("Stock actual:", articulo.stockActual);
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
    const n = document.createElement("td");
    const input = document.createElement("input");
    input.type = "text";
    input.name = caracteristica;
    input.id = `input-${caracteristica}`;
    n.appendChild(input);

    fila.appendChild(c);
    fila.appendChild(v);
    fila.appendChild(n);
    return fila;
}

function rellenarTotales() {
    let totales = document.getElementById("totales");
    let totalProductos = 0;
    let stockAnual = 0;
    let deficitStock = [];
    for (let i = 0; i < electrodomesticos.length; i++) {
        totalProductos++;
        stockAnual += electrodomesticos[i].stockActual;
        if ((electrodomesticos[i].stockActual < electrodomesticos[i].stockMin))
            deficitStock.push(electrodomesticos[i].nombre);
    }
    deficitElect = "";
    for (let i = 0; i < deficitStock.length; i++) {
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
