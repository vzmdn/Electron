const { app, BrowserWindow } = require('electron');
const electron = require('electron');
const Menu = electron.Menu;
const dialog = electron.dialog;

let elementos = [];

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 300,
        height: 300,
        webPreferences: {
            nodeIntegration: true
        }
    });

    mainWindow.loadFile('index.html');
}

app.on('ready', function () {
    createWindow();
    const template = [
        {
            label: 'Menu Casa',
            submenu: [
                {
                    label: 'Habitaciones',
                    submenu: [
                        { label: 'Habitación 1', click: () => { elementos.push('Habitación 1'); } },
                        { label: 'Habitación 2', click: () => { elementos.push('Habitación 2'); } },
                    ]
                },
                { label: 'Salón Ctrl + S', click: () => { elementos.push('Salón'); } },
                { type: 'separator', },
                { label: 'Cocina Ctrl + C', click: () => { elementos.push('Cocina'); } },
                { label: 'Baño Ctrl + B', click: () => { elementos.push('Baño'); } },
            ]
        },
        {
            label: 'Menu Extras',
            submenu: [
                { label: 'Garaje Alt+G', click: () => { elementos.push('Garaje'); } },
                { label: 'Trastero Alt+T', click: () => { elementos.push('Trastero'); } },
            ]
        },
        {
            label: 'Menu Descripción Casa',
            click: () => {
                message = 'Elementos seleccionados: ';
                for (let i = 0; i < elementos.length; i++) {
                    message += elementos[i];
                    if (i != elementos.length - 1) {
                        message += ', ';
                    }
                }
                dialog.showMessageBox({
                    type: 'info',
                    title: 'Descripción Casa',
                    message: message
                });
            }
        }
    ];
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
});

