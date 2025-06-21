function loadPage(page) {
  fetch(`pages/${page}.html`)
    .then(res => res.text())
    .then(html => {
      document.getElementById('isi-web').innerHTML = html;
      

      // Import JS berdasarkan halaman yang dibuka
      if (page === "mahasiswa") {
        import('./kelolaMahasiswa.js');
      } else if (page === "home") {
        // import('./asset/javascript/home.js'); // jika ada file untuk home
      }
    })
    .catch(err => {
      document.getElementById('isi-web').innerHTML = '<p>Halaman tidak ditemukan.</p>';
      console.error(err);
    });
}
window.onload = () => {
  loadPage("home");
};

