// tutorial from https://www.twilio.com/blog/an-introduction-to-building-desktop-applications-with-electron

const {app, BrowserWindow} = require("electron");
const path = require("path");

const loadMainWindow = () => {
    const mainWindow = new BrowserWindow({
        width : 1200,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, "preload.js")
        }
    });

    mainWindow.loadFile(path.join(__dirname, "index.html"));
}

// run above load main window on launch
app.on("ready", loadMainWindow);

// non-macOS systems may not quit on all windows closed
// this will quit on all windows closed if not macOS
app.on("window-all-closed", () => {
    app.quit();
});

// launch app when icon is clicked
app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        loadMainWindow();
    }
});