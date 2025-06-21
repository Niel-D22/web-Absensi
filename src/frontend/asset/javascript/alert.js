window.showAlert = function (message, color = "#f44336") {
  let alertBox = document.getElementById("custom-alert");
  
  if (!alertBox) {
    alertBox = document.createElement("div");
    alertBox.id = "custom-alert";
    alertBox.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: ${color};
      color: white;
      padding: 12px 24px;
      border-radius: 6px;
      box-shadow: 0 4px 8px rgba(0,0,0,0.2);
      display: none;
      z-index: 9999;
      font-weight: bold;
      transition: opacity 0.3s ease;
    `;
    document.body.appendChild(alertBox);
  }

  alertBox.textContent = message;
  alertBox.style.background = color;
  alertBox.style.display = "block";
  alertBox.style.opacity = "1";

  setTimeout(() => {
    alertBox.style.opacity = "0";
    setTimeout(() => {
      alertBox.style.display = "none";
    }, 300);
  }, 3000);
};
