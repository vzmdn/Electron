const ids = ['casa', 'habitacion1', 'habitacion2', 'salon', 'cocina', 'banyo', 'extras', 'garaje', 'trastero'];
let clicks = new Map();
let lista = "";

ids.forEach(id => {
    clicks.set(id, 0);
});

const elements = [];


ids.forEach(id => {
    elements.push(document.getElementById(id));
});


elements.forEach((element, index) => {
    element.onclick = () => {
        clicks.set(ids[index], clicks.get(ids[index]) + 1);
    }
}
);

let menuDescripcionCasa = document.getElementById('menuDescripcionCasa');

menuDescripcionCasa.onclick = () => {

    clicks.forEach((value, key) => {
        if (value > 0) lista += `${key}: ${value} veces\n`;
    });

    window.electronAPI.showMessageBox({
        title: "elementos clickeados",
        message: lista,
        buttons: ["OK"]
    }).then(() => {
        lista = "";
    });

}
