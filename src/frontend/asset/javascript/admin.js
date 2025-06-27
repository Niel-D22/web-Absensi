


function loadPage(page) {
  fetch(`pages/${page}.html`)
    .then(res => res.text())
    .then(html => {
      document.getElementById('isi-web').innerHTML = html;

if (page === "jadwal") {
import('./fromJadwal.js').then(module => {
  module.default(); // Panggil fungsi initJadwalPage()
}).catch(err => console.error("Gagal load fromJadwal.js:", err));



      } else if (page === "mahasiswa") {
        import("./kelolaMahasiswa.js").catch(console.error);
      }
    })
    .catch(err => {
      document.getElementById('isi-web').innerHTML = '<p>Halaman tidak ditemukan.</p>';
      console.error(err);
    });
}

window.addEventListener("DOMContentLoaded", () => {
  loadPage("home"); // atau ganti "home" kalau nama file-nya home.html
});