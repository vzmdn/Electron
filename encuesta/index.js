let btnComprobar = document.getElementById("comprobar");
let nPreguntas=4;
//EVENTOS
btnComprobar.addEventListener('click', () => {
    let aciertos = 0;
    let fallos = 0;
    for (let i = 0; i < nPreguntas; i++){
        let a = document.getElementById("rA" + i);
        let b = document.getElementById("rB" + i);
        let c = document.getElementById("rC" + i);
        if(a.checked){
            aciertos++;
        }
        if(b.checked){
            fallos++;
        }
        if(c.checked){
            fallos++;
        }
    }
    let muestra = document.getElementById("muestra");
    muestra.innerHTML = 'aciertos: ' + aciertos + ' ' + 'fallos: ' + fallos;
    console.log('aciertos: ' + aciertos);
    console.log('fallos: ' + fallos);
});