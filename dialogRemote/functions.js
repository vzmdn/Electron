/*However, starting with Electron 12,
the remote module has been deprecated
due to performance and security concerns,
encouraging developers to use IPC instead.*/

const { dialog } = require('@electron/remote');

let button = document.getElementById('button');

button.onclick = () => {
  dialog.showMessageBox({
    message: 'Hello, World!',
  });
}