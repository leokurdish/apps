const { NONAME } = require("dns");
const { app, BrowserWindow, Menu } = require("electron");
const isMac = process.platform === "darwin";
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webviewTag: true,
      nodeIntegrationInWorker: true,
      nodeIntegrationInSubFrames: true,
    },
    icon: `${__dirname}/build/icon.ico`,
  });

  win.loadFile("index.html");
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

const template = [
  // { role: 'appMenu' }
  ...(isMac
    ? [
        {
          label: app.name,
          submenu: [
            { role: "about" },
            { type: "separator" },
            { role: "services" },
            { type: "separator" },
            { role: "hide" },
            { role: "hideOthers" },
            { role: "unhide" },
            { type: "separator" },
            { role: "quit" },
          ],
        },
      ]
    : []),
  ,
  // { role: 'RELOAD' }
  {
    label: "RELOAD",
    role: "forceReload",
  },
];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
