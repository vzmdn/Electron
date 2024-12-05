const { dialog } = require('electron');

const openFileButton = document.getElementById('openFileButton');

openFileButton.addEventListener('click', async () => {
    const result = await dialog.showOpenDialog({
        properties: ['openFile']
    });

    if (!result.canceled) {
        const filePath = result.filePaths[0];
        console.log(`Selected file: ${filePath}`);
        // You can add your file handling logic here
    }
});
