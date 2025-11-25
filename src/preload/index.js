import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

const api = {
  authorizeUser: (user) => ipcRenderer.invoke('authorizeUser', user),
  // ??? А почему не так?
  // authorizeUser: () => ipcRenderer.invoke('authorizeUser'),

  getProducts: () => ipcRenderer.invoke('getProducts'),
  getOrders: () => ipcRenderer.invoke('getOrders')
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI);
    contextBridge.exposeInMainWorld('api', api);
  } catch (error) {
    console.error(error);
  }
} else {
  window.electron = electronAPI;
  window.api = api;
}
