if (import.meta.hot) {
  import.meta.hot.on('vite:beforeUpdate', () => {
    chrome.runtime.reload();
  });
}
