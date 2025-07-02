document.addEventListener("DOMContentLoaded", () => {
  // Tampilkan nama user dari localStorage (jika disimpan saat login)
  const namaUser = localStorage.getItem("nama") || "Mahasiswa";
  document.getElementById("nama-user").textContent = namaUser;

  // Tombol navigasi SPA
  const navLinks = {
    home: document.getElementById("nav-home"),
    profil: document.getElementById("nav-profil"),
    jadwal: document.getElementById("nav-jadwal"),
    history: document.getElementById("nav-history"),
  };

  // Pasang event listener untuk setiap nav
  for (const [key, el] of Object.entries(navLinks)) {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      tampilkanHalaman(key);
    });
  }

  // Tampilkan halaman default saat pertama buka
  tampilkanHalaman("home");

  // Fungsi untuk load HTML ke konten utama
  function tampilkanHalaman(namaHalaman) {
    const target = document.getElementById("konten-utama");

    fetch(`pages/user/${namaHalaman}.html`)
      .then((res) => {
        if (!res.ok) throw new Error("Halaman tidak ditemukan");
        return res.text();
      })
      .then((html) => {
        target.innerHTML = html;
        window.scrollTo(0, 0); // scroll ke atas saat pindah halaman
      })
      .catch((err) => {
        target.innerHTML = "<p>Halaman gagal dimuat.</p>";
        console.error(err);
      });
  }

  // Fungsi logout
  const logoutBtn = document.getElementById("logout-btn");
  logoutBtn.addEventListener("click", () => {
    localStorage.clear(); // hapus semua data session
    window.location.href = "index.html"; // kembali ke login
  });

  // Burger menu (jika digunakan di mobile)
  const burger = document.getElementById("burger");
  const burgerDown = document.getElementById("burgerDown");

  burger.addEventListener("click", () => {
    burgerDown.classList.toggle("show"); // toggle tampilan dropdown
  });
});
