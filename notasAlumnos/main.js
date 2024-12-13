const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false
    }
  });

  win.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.handle('show-dialog', async (event, args) => {
  const result = await dialog.showMessageBox({
    type: 'info',
    title: '',
    message: ''
  });
  return result;
});

ipcMain.handle('open-file', async (event, args) => {
  const result = await dialog.showOpenDialog({
    properties: ['openFile']
  });
  const filepath = result.filePaths[0]
  const data = require(filepath)
  return data;
});

ipcMain.handle('save-file', async (event, args) => {
  const result = await dialog.showSaveDialog();
  return result;
});
