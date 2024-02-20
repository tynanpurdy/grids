// tutorial from https://www.twilio.com/blog/an-introduction-to-building-desktop-applications-with-electron

const {app, BrowserWindow} = require("electron")
const path = require("path")
require('dotenv').config()

const loadMainWindow = () => {
    const mainWindow = new BrowserWindow({
        width : 1500,
        height: 950,
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true
        },
        show: false,
        frame: false,
        titleBarStyle: "hidden",
        trafficLightPosition: {x: 14, y: 12}
    });

    mainWindow.loadFile(path.join(__dirname, "index.html"))

    mainWindow.once('ready-to-show', mainWindow.show)

    // remove for prod
    mainWindow.webContents.openDevTools()
}

// run above load main window on launch
app.on("ready", loadMainWindow)

// non-macOS systems may not quit on all windows closed
// this will quit on all windows closed if not macOS
app.on("window-all-closed", () => {
    app.quit()
});

// launch app when icon is clicked
app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        loadMainWindow()
    }
});