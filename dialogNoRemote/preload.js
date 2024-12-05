const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  showDialog: () => ipcRenderer.invoke('show-dialog')
});