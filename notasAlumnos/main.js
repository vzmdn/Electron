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
  try {
    const result = await dialog.showOpenDialog({
      properties: ['openFile']
    });
    console.log('open-file result:', result);

    if (result.canceled || !result.filePaths || result.filePaths.length === 0) {
      throw new Error('No file selected');
    }

    const filepath = result.filePaths[0];
    const data = require(filepath);
    return data;
  } catch (error) {
    console.error('Error opening file:', error);
    throw error;
  }
});

ipcMain.handle('save-file', async (event, args) => {
  const result = dialog.showSaveDialogSync();
  console.log('result:', result);
  console.log('args:', args);

  if (result) {
    console.log('File path is provided:', result);
    try {
      console.log('Attempting to save file at:', result); // Log the file path
      fs.writeFileSync(result, JSON.stringify(args, null, 2));
      console.log('File saved at:', result); // Log the file path
      console.log('File save operation was successful'); // Log success
      return { success: true, filePath: result };
    } catch (error) {
      console.error('Error saving file:', error); // Log any errors
      console.log('File save operation failed'); // Log failure
      return { success: false, error: error.message };
    }
  } else {
    console.log('Save dialog was canceled or no file path provided');
    return { success: false };
  }
});
