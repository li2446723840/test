const { app, BrowserWindow } = require('electron');



function createWindow () {

  const win = new BrowserWindow({

    width: 800,

    height: 600

  })



  win.loadURL('https://www.baidu.com')

};



app.whenReady().then(() => {

  createWindow();

});