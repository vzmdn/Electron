import fetch from 'node-fetch';
const recurso = 'http://localhost:8080';

//GET para bienvenida
fetch(recurso + '/bienvenida')
    .then(res => res.text())
    .then(body => console.log(body));

//GET para obtener todos los clientes
fetch(recurso + '/clientes')
    .then(res => res.json())
    .then(body => console.log(body));


//POST para agregar un cliente
let nuevo = {
    dni: '12345678A',
    name: 'Pepe',
    phone: '666666666'
}
fetch(recurso + '/inserta', {
    method: 'POST',
    body: JSON.stringify(nuevo),
    headers: { 'Content-Type': 'application/json' }
})
    .then(res => res.json())
    .then(body => console.log(body));
