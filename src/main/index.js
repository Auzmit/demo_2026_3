import { app, shell, BrowserWindow, ipcMain, dialog } from 'electron';
import { join } from 'path';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import icon from '../../resources/icon.png?asset';

import connectDB from './db';

async function authorize(event, loginFormData) {
  // const { enteredLogin, enteredPassword } = loginFormData;

  try {
    const response = await global.dbclient.query(`SELECT login, password,
        humans_roles.human_role as role,
        humans_full_names.full_name as fullname
      FROM user_import
      JOIN humans_roles ON user_import.id_human_role = humans_roles.id
      JOIN humans_full_names ON user_import.id_full_name = humans_full_names.id`);
    const user = response.rows.find((user) => user.login === loginFormData.login && user.password === loginFormData.password);

    if (user) {
      // console.log(333, {login: user.login, password: user.password, role: user.role, name: user.fullname});
      return {
        login: user.login,
        password: user.password,
        role: user.role,
        name: user.fullname
      };
    } else {
      // необязательно:
      dialog.showErrorBox('Такого пользователя нет', 'Попробуйте ввести другой логин и/или пароль');
    }
  
  } catch (e) {
    return ('error');
  }
}

async function getProducts(event) {
  try {
    const response = await global.dbclient.query(`SELECT products.id, article,
        products_names.product_name as product_name,
        unit_of_measurement, price,
        suppliers_names.suppliers_names as supplier_name,
        producers_names.producers_names as producer_name,
        products_categories.product_category as product_category,
        current_discount, quantity_in_stock, product_description, photo
      FROM products
      JOIN products_names ON products.id_product_name = products_names.id
      JOIN suppliers_names ON products.id_supplier_name = suppliers_names.id
      JOIN producers_names ON products.id_producer_name = producers_names.id
      JOIN products_categories ON products.id_product_category = products_categories.id`);
    return response.rows;
  } catch (e) {
    return ('error');
  }
}

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    icon: join(__dirname, '../../resources/icon.ico'),
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
  }
}

app.whenReady().then(async () => {
  electronApp.setAppUserModelId('com.electron');

  global.dbclient = await connectDB();

  ipcMain.handle('authorizeUser', authorize);
  ipcMain.handle('getProducts', getProducts);

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window);
  })

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
})
