const { app, BrowserWindow } = require('electron')

function createWindow () {
  // Crea la ventana del navegador.
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    }
  })

  // y carga el  index.html de la aplicación.
  win.loadFile('index.html')
  //quita menú por defecto de chromium
  win.setMenu(null);
}

//Para utilizar funciones del proceso principal en la ventana de renderización hay que usar exports en el proceso principal:
exports.openWindow = () => {
    let newWin = new BrowserWindow({
        width:500,
        height:400,
        webPreferences: {
            nodeIntegration: true
          }
    })
    newWin.loadFile('ventanaSecundaria.html')
    
}
//cuando la app esté lista llama a la función createWindow definida arriba
app.on('ready', createWindow)