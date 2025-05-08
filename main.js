const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 600,
    minHeight: 400,
    show: false, // wait to show until ready-to-show for better UX
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // optional
      nodeIntegration: false,
      contextIsolation: true, // security best practice
      enableRemoteModule: false, // deprecated, do not use
    }
  });

  // Load your frontend entry point
  mainWindow.loadFile('index.html'); // or loadURL('http://localhost:3000') for React/Vite/etc.

  // Only show the window once it's ready to avoid flicker
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // Optional: Open DevTools (development only)
  // mainWindow.webContents.openDevTools();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// Initialize app
app.whenReady().then(() => {
  createWindow();

  // macOS: Reopen app when clicking dock icon if no windows are open
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed (except macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// Optional: IPC handlers setup
ipcMain.handle('some-ipc-event', async (event, args) => {
  // handle event
  return 'response';
});
