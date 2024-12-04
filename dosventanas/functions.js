//para usar funciones del proceso principal:
const remote = require('electron').remote
const main = remote.require('./main.js')

//creamos un boton, lo añadimos a index y le damos un escuchador
let button = document.createElement('button')
button.textContent = "Open Window"
document.body.appendChild(button)

button.addEventListener('click', ()=>{
    main.openWindow()
})