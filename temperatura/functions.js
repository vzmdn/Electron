let celsius = document.getElementById("gradoCelsius");
let kelvin = document.getElementById("gradoKelvin");
let convertir = document.getElementById("convertir");
let limpiar = document.getElementById("limpiar");


convertir.addEventListener('click', () => {
    let celsiusValue = parseFloat(celsius.value);
        kelvin.value = celsiusValue + 273.15;
});

limpiar.addEventListener('click', () => {
    kelvin.value="";
    celsius.value="";
});

