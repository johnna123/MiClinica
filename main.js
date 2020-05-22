const { app, BrowserWindow } = require('electron')
const url = require("url");
const path = require("path");
const electron=require("electron" );
const ipc = electron.ipcMain;

let win;

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    frame:false,
    backgroundColor: '#ffffff',
    icon: `file://${__dirname}/dist/assets/tooth.ico`,
    webPreferences:{
      nodeIntegration:true
    }
  })


  win.loadURL(`file://${__dirname}/dist/index.html`)
  win.setMenu(null)
  win.maximize()




  //// uncomment below to open the DevTools.
  //win.webContents.openDevTools()

  // Event when the window is closed.
  url.format({
    pathname: path.join(__dirname, `/dist/index.html`),
    protocol: "file:",
    slashes: true
  })
}

// Create window on electron intialization
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS specific close process
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // macOS specific close process
  if (win === null) {
    createWindow()
  }
})

ipc.on('custom_close', (event, arg) => {
  var fs = require('fs');
  try { fs.writeFileSync('myfile.json', arg, 'utf-8'); }
  catch (e) { alert('Failed to save the file !'); }
  app.quit()
})