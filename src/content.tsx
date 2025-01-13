const highlightImages = () => {
  const images = document.querySelectorAll('img');
  images.forEach((img) => {
    const borderColor = Math.random() > 0.5 ? 'green' : 'red';
    img.style.border = `4px solid ${borderColor}`;
  });
};

highlightImages();

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'highlightImages') {
    highlightImages();
    sendResponse({ status: 'Images highlighted' });
  }
});