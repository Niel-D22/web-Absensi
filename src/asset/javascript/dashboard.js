const burger = document.getElementById("burger");
const menu = document.getElementById("burgerDown");

burger.addEventListener("click", () => {
  menu.classList.toggle("active");
});

document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("userAktif"));
  console.log("userAktif dari localStorage:", user);
  if (!user || user.role !== 'mahasiswa') {
    window.location.href = "index.html";
    return;
  }
  document.getElementById("nama-user").textContent = user.nama;

  const logOut = document.getElementById("logout-btn");
  logOut.addEventListener("click", () => {
    localStorage.removeItem("userAktif");
    window.location.href = "index.html";
  });
});

