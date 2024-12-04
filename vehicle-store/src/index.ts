import { app, BrowserWindow, ipcMain } from 'electron';
import AuthController from './service/AuthService';
import PageController from './service/PageService';
import UserController from './service/UserService';
import Product from './entity/Product';
import ProductRepository from './repository/ProductRepository';
import prisma from './prisma';

declare const LOGIN_PRELOAD_WEBPACK_ENTRY: string;
declare const LOGIN_WEBPACK_ENTRY: string;
let mainWindow: BrowserWindow;

if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = (): void => {
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      preload: LOGIN_PRELOAD_WEBPACK_ENTRY,
      nodeIntegration: true
    },
    icon: './assets/logo.ico'
  });

  mainWindow.maximize();
  // mainWindow.setMenuBarVisibility(false);
  mainWindow.loadURL("http://localhost:3000/dashboard");
};

app.on('ready', () => {
  createWindow()
  new PageController(mainWindow);
  new AuthController();
  new UserController();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.handle("create_product", async (_: any, product: any) => {
  //const { name, category, manufacturer, amount } = product;
  //const newProduct = new Product(name, category, manufacturer, amount);
  //await new ProductRepository().save(newProduct);
try {
  prisma.usuario.create({
    data: {
      id: "123123",
      name: "Rosane",
      email: "rosanemaia3108@gmail.com",
      senha: '123'
    }
  })
} catch (err:any){
  console.log("errouu")
  console.log(err)
}

})

ipcMain.handle("find_all_product", async (_: any) => {
  return await new ProductRepository().findAll();
})

ipcMain.handle("find_amount_by_category", async (_: any) => {
  return await new ProductRepository().findAmountByCategory();
})