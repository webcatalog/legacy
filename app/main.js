/* eslint-disable import/no-extraneous-dependencies */

const electron = require('electron');
const argv = require('optimist').argv;

// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
  const appUrl = argv.url;

  // Create the browser window.
  const options = appUrl ? {
    width: 1280,
    height: 800,
    title: argv.name,
    webPreferences: {
      javascript: true,
      plugins: true,
      // node globals causes problems with sites like messenger.com
      nodeIntegration: false,
      webSecurity: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  } : {
    width: 800,
    height: 600,
    minWidth: 500,
    minHeight: 400,
    titleBarStyle: 'hidden',
  };

  mainWindow = new BrowserWindow(options);

  const windowUrl = appUrl || url.format({
    pathname: path.join(__dirname, 'www', 'index.html'),
    protocol: 'file:',
    slashes: true,
  });

  // and load the index.html of the app.
  mainWindow.loadURL(windowUrl);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});
