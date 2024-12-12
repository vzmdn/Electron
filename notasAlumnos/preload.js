const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  showDialog: () => ipcRenderer.invoke('show-dialog'),
  openFile: () => ipcRenderer.invoke('open-file'),
  saveFile: () => ipcRenderer.invoke('save-file')
  
});
