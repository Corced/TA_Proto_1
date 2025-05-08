const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  sendData: (data) => ipcRenderer.send('channel-name', data),
  onReceiveData: (callback) => ipcRenderer.on('channel-name', (event, data) => callback(data)),
  invokeSomething: async (args) => await ipcRenderer.invoke('some-ipc-event', args)
});
