let n = 1;
let numBotones = 1;
let mDiv = document.getElementById("datos");
mDiv.innerHTML = "<p> Contenido del div </p>";
mDiv.style.border = n + "px solid black";
mDiv.style.borderRadius = "10px"
//Crear un botón
let button = document.createElement("button");
let button2 = document.createElement("button")
//añadirle el atributo texto del botón
button.textContent="Botón";
button2.textContent="Botón creador " + numBotones
mDiv.appendChild(button);
//document.body.appendChild(button)
document.body.appendChild(button2)

function createButton(){
    numBotones++;
    let button = document.createElement("button");
    button.textContent="Botón creador " + numBotones;
    document.body.appendChild(button);
    button.addEventListener('click',createButton);
}

button2.addEventListener('click',createButton);


/*button.addEventListener('click',()=>{
    alert('Button Click!!!');
})
*/
function changeColor(){
    if(mDiv.style.color == "black")
        mDiv.style.color = "red";
    else mDiv.style.color = "black";
}
function changeSize(){
    n+=10;
    mDiv.style.border = n + "px solid black";
}

button.addEventListener('click',changeColor)
button.addEventListener('click',() => {
    n++;
    mDiv.style.border = n + "px solid black";
})