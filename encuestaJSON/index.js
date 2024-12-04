const preguntas = require('./file/test.json');
//variables botones para escuchador
let btnComprobar = document.getElementById("comprobar");
//generar el DOM para el test:
let lista = document.getElementById("lista");
let contenidoLista = "";
//for (let alumno of preguntas){
for (let i = 0; i < preguntas.length; i++) {
	contenidoLista +=
		`<li class="list-group-item">
	<img class="img-circle media-object pull-left" src="./images/${i + 1}.png" width="32" height="32">
	<div class="media-body">
		<strong>
		${preguntas[i].pregunta}
		</strong>
		<div class="radio">
			<label>
				<input type="radio" name="r${i}" id="rA${i}" value="a">
				${preguntas[i].rA}
			</label>
		</div>
		<div class="radio">
			<label>
				<input type="radio" name="r${i}" id="rB${i}" value="b">
				${preguntas[i].rB}
			</label>
		</div>
		<div class="radio">
			<label>
				<input type="radio" name="r${i}" id="rC${i}" value="c">
				${preguntas[i].rC}
			</label>
		</div>
	</div>
	</li>`;
}
//asignamos la cadena generada en el bucle a la lista:
lista.innerHTML = contenidoLista;

//EVENTOS
btnComprobar.addEventListener('click', () => {
	let aciertos = 0;
	let fallos = 0;
	for (let i = 0; i < preguntas.length; i++) {
		let a = document.getElementById("rA" + i);
		let b = document.getElementById("rB" + i);
		let c = document.getElementById("rC" + i);
		if (a.checked) {
			if (preguntas[i].correcta == 'a') {
				aciertos++;
			} else {
				fallos++;
			}
		}
		if (b.checked) {
			if (preguntas[i].correcta == 'b') {
				aciertos++;
			} else {
				fallos++;
			}
		}
		if (c.checked) {
			if (preguntas[i].correcta == 'c') {
				aciertos++;
			} else {
				fallos++;
			}
		}

	}
	let muestra = document.getElementById("muestra");
	muestra.innerHTML = 'aciertos: ' + aciertos + '   ' + 'fallos :' + fallos;
	console.log('aciertos: ' + aciertos);
	console.log('fallos :' + fallos);
});