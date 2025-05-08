document.getElementById('sendButton').addEventListener('click', () => {
    const userInput = document.getElementById('inputBox').value;
    window.electronAPI.sendData(userInput);
  });
  
  window.electronAPI.onReceiveData((response) => {
    document.getElementById('outputBox').innerText = `Response: ${response}`;
  });
  