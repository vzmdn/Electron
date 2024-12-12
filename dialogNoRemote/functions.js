let button = document.getElementById('button');
let openFile = document.getElementById('openFile');

button.onclick = () => {
  window.electron.showDialog();
};

openFile.onclick = () => {
  window.electron.openFile();
};